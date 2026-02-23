import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from 'plaid'

admin.initializeApp()

// ── Plaid client ──────────────────────────────────────────────────────────────

function getPlaidClient(): PlaidApi {
  const clientId = process.env.PLAID_CLIENT_ID
  const secret = process.env.PLAID_SECRET
  const env = (process.env.PLAID_ENV ?? 'sandbox') as keyof typeof PlaidEnvironments

  if (!clientId || !secret) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Plaid credentials are not configured. Set PLAID_CLIENT_ID and PLAID_SECRET in Firebase Functions config.',
    )
  }

  const config = new Configuration({
    basePath: PlaidEnvironments[env],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': clientId,
        'PLAID-SECRET': secret,
      },
    },
  })

  return new PlaidApi(config)
}

// ── Plaid callable functions ───────────────────────────────────────────────────

/**
 * Creates a Plaid Link token for the frontend to open the Plaid Link UI.
 */
export const createPlaidLinkToken = functions.https.onCall(async (_data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated')
  }

  const plaid = getPlaidClient()
  const response = await plaid.linkTokenCreate({
    user: { client_user_id: context.auth.uid },
    client_name: 'Budget',
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: 'en',
  })

  return { linkToken: response.data.link_token }
})

/**
 * Exchanges a public token from Plaid Link for an access token,
 * saves the item metadata, and performs an initial data sync.
 */
export const exchangePlaidPublicToken = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated')
  }

  const { publicToken, institutionId, institutionName } = data as {
    publicToken: string
    institutionId: string
    institutionName: string
  }

  if (!publicToken) {
    throw new functions.https.HttpsError('invalid-argument', 'publicToken is required')
  }

  const plaid = getPlaidClient()
  const db = admin.firestore()
  const uid = context.auth.uid

  // Exchange public token for access token
  const exchangeResponse = await plaid.itemPublicTokenExchange({ public_token: publicToken })
  const accessToken = exchangeResponse.data.access_token
  const itemId = exchangeResponse.data.item_id

  // Store access token separately — never returned to the client
  await db.collection('plaidSecrets').doc(itemId).set({ uid, accessToken })

  // Save item metadata (safe for client reads)
  await db.collection('plaidItems').doc(itemId).set({
    uid,
    institutionId: institutionId ?? '',
    institutionName: institutionName ?? 'Unknown Bank',
    lastSync: null,
    status: 'pending',
  })

  // Sync initial accounts and transactions in the background
  await _syncPlaidItemData(uid, itemId, accessToken)

  return { itemId }
})

/**
 * Re-syncs accounts and transactions for an existing Plaid item.
 */
export const syncPlaidItem = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated')
  }

  const { itemId } = data as { itemId: string }
  if (!itemId) {
    throw new functions.https.HttpsError('invalid-argument', 'itemId is required')
  }

  const db = admin.firestore()
  const uid = context.auth.uid

  // Verify ownership
  const itemDoc = await db.collection('plaidItems').doc(itemId).get()
  if (!itemDoc.exists || itemDoc.data()?.uid !== uid) {
    throw new functions.https.HttpsError('not-found', 'Plaid item not found')
  }

  // Retrieve access token
  const secretDoc = await db.collection('plaidSecrets').doc(itemId).get()
  if (!secretDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'Plaid item credentials not found')
  }

  const accessToken = secretDoc.data()!.accessToken as string
  await _syncPlaidItemData(uid, itemId, accessToken)

  return { ok: true }
})

/**
 * Removes a Plaid item from Firestore (and revokes its access token at Plaid).
 */
export const removePlaidItem = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated')
  }

  const { itemId } = data as { itemId: string }
  if (!itemId) {
    throw new functions.https.HttpsError('invalid-argument', 'itemId is required')
  }

  const db = admin.firestore()
  const uid = context.auth.uid

  // Verify ownership
  const itemDoc = await db.collection('plaidItems').doc(itemId).get()
  if (!itemDoc.exists || itemDoc.data()?.uid !== uid) {
    throw new functions.https.HttpsError('not-found', 'Plaid item not found')
  }

  // Revoke the access token at Plaid
  try {
    const secretDoc = await db.collection('plaidSecrets').doc(itemId).get()
    if (secretDoc.exists) {
      const plaid = getPlaidClient()
      await plaid.itemRemove({ access_token: secretDoc.data()!.accessToken as string })
    }
  } catch {
    // Continue cleanup even if Plaid revocation fails
    functions.logger.warn(`Failed to revoke Plaid access token for item ${itemId}`)
  }

  // Delete Firestore documents
  const batch = db.batch()
  batch.delete(db.collection('plaidItems').doc(itemId))
  batch.delete(db.collection('plaidSecrets').doc(itemId))
  await batch.commit()

  return { ok: true }
})

// ── Internal sync helper ───────────────────────────────────────────────────────

async function _syncPlaidItemData(
  uid: string,
  itemId: string,
  accessToken: string,
): Promise<void> {
  const plaid = getPlaidClient()
  const db = admin.firestore()

  try {
    // Fetch accounts and balances
    const accountsResponse = await plaid.accountsGet({ access_token: accessToken })
    const plaidAccounts = accountsResponse.data.accounts

    // Upsert accounts into the accounts collection
    const accountsBatch = db.batch()
    const plaidAccountIdToFirestoreId: Record<string, string> = {}

    for (const pa of plaidAccounts) {
      // Look for an existing account with this plaid account ID
      const existing = await db
        .collection('accounts')
        .where('uid', '==', uid)
        .where('plaidAccountId', '==', pa.account_id)
        .limit(1)
        .get()

      const firestoreId = existing.empty
        ? db.collection('accounts').doc().id
        : existing.docs[0].id

      plaidAccountIdToFirestoreId[pa.account_id] = firestoreId

      const balance = pa.balances.current ?? pa.balances.available ?? 0
      const accountType = _mapPlaidAccountType(pa.type, pa.subtype ?? '')

      const accountData: Record<string, unknown> = {
        id: firestoreId,
        uid,
        name: pa.name,
        type: accountType,
        balance,
        currency: (pa.balances.iso_currency_code ?? 'USD').toUpperCase(),
        lastUpdated: new Date().toISOString(),
        fileIds: existing.empty ? [] : (existing.docs[0].data().fileIds ?? []),
        plaidAccountId: pa.account_id,
        plaidItemId: itemId,
        source: 'plaid',
        ...(pa.mask !== null && pa.mask !== undefined && { accountNumber: pa.mask }),
      }

      accountsBatch.set(db.collection('accounts').doc(firestoreId), accountData)
    }
    await accountsBatch.commit()

    // Fetch up to 24 months of transactions
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(Date.now() - 730 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]

    const txResponse = await plaid.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
      options: { count: 500, offset: 0 },
    })

    const plaidTxs = txResponse.data.transactions

    if (plaidTxs.length > 0) {
      // Batch upsert transactions — skip duplicates by plaidTransactionId
      const existingTxSnapshot = await db
        .collection('transactions')
        .where('uid', '==', uid)
        .where('plaidItemId', '==', itemId)
        .get()

      const existingPlaidTxIds = new Set(
        existingTxSnapshot.docs.map((d) => d.data().plaidTransactionId as string),
      )

      const newTxs = plaidTxs.filter((t) => !existingPlaidTxIds.has(t.transaction_id))

      if (newTxs.length > 0) {
        const txBatch = db.batch()
        for (const pt of newTxs) {
          const accountFirestoreId = plaidAccountIdToFirestoreId[pt.account_id]
          if (!accountFirestoreId) continue

          const txId = db.collection('transactions').doc().id
          const amount = Math.abs(pt.amount)
          // In Plaid: positive amount = debit (money out), negative = credit (money in)
          const type = pt.amount > 0 ? 'debit' : 'credit'

          const txData: Record<string, unknown> = {
            id: txId,
            uid,
            accountId: accountFirestoreId,
            fileId: `plaid:${itemId}`,
            date: pt.date,
            description: pt.name,
            amount,
            type,
            category: _mapPlaidCategory(pt.personal_finance_category?.primary ?? ''),
            pending: pt.pending,
            plaidTransactionId: pt.transaction_id,
            plaidItemId: itemId,
            source: 'plaid',
          }

          txBatch.set(db.collection('transactions').doc(txId), txData)
        }
        await txBatch.commit()
        functions.logger.info(`Synced ${newTxs.length} new transactions for item ${itemId}`)
      }
    }

    // Mark item as active with sync timestamp
    await db.collection('plaidItems').doc(itemId).update({
      status: 'active',
      lastSync: new Date().toISOString(),
      error: admin.firestore.FieldValue.delete(),
    })
  } catch (err) {
    functions.logger.error(`Plaid sync failed for item ${itemId}:`, err)
    await db.collection('plaidItems').doc(itemId).update({
      status: 'error',
      error: err instanceof Error ? err.message : 'Sync failed',
    })
    throw err
  }
}

function _mapPlaidAccountType(type: string, subtype: string): string {
  if (type === 'credit') return 'credit_card'
  if (type === 'loan') {
    if (subtype === 'mortgage') return 'mortgage'
    return 'loan'
  }
  if (type === 'investment') return 'investment'
  if (subtype === 'savings') return 'savings'
  return 'checking'
}

function _mapPlaidCategory(plaidCategory: string): string {
  const map: Record<string, string> = {
    FOOD_AND_DRINK: 'Food & Dining',
    TRAVEL: 'Travel',
    TRANSPORTATION: 'Transportation',
    RENT_AND_UTILITIES: 'Housing',
    ENTERTAINMENT: 'Entertainment',
    GENERAL_MERCHANDISE: 'Shopping',
    PERSONAL_CARE: 'Health & Wellness',
    MEDICAL: 'Healthcare',
    LOAN_PAYMENTS: 'Debt Payments',
    BANK_FEES: 'Fees & Charges',
    GENERAL_SERVICES: 'Services',
    GOVERNMENT_AND_NON_PROFIT: 'Other',
    HOME_IMPROVEMENT: 'Home',
    INCOME: 'Income',
    TRANSFER_IN: 'Internal Transfer',
    TRANSFER_OUT: 'Internal Transfer',
  }
  return map[plaidCategory] ?? 'Other'
}

// ── Firestore triggers ────────────────────────────────────────────────────────

/**
 * When a file is deleted, clean up its associated transactions.
 * This is a safety net in addition to the client-side cleanup.
 */
export const onFileDeleted = functions.firestore
  .document('files/{fileId}')
  .onDelete(async (snap, context) => {
    const fileId = context.params.fileId
    const db = admin.firestore()

    const txsQuery = await db
      .collection('transactions')
      .where('fileId', '==', fileId)
      .get()

    if (txsQuery.empty) return

    const batch = db.batch()
    txsQuery.docs.forEach((doc) => batch.delete(doc.ref))
    await batch.commit()

    functions.logger.info(`Deleted ${txsQuery.size} transactions for file ${fileId}`)
  })

/**
 * When a user is deleted from Firebase Auth, clean up all their data.
 */
export const onUserDeleted = functions.auth.user().onDelete(async (user) => {
  const db = admin.firestore()
  const storage = admin.storage()
  const uid = user.uid

  // Delete all collections
  const collections = ['files', 'transactions', 'accounts', 'plaidItems', 'plaidSecrets']
  for (const col of collections) {
    const snapshot = await db.collection(col).where('uid', '==', uid).get()
    const batch = db.batch()
    snapshot.docs.forEach((doc) => batch.delete(doc.ref))
    if (!snapshot.empty) await batch.commit()
  }

  // Delete storage files
  try {
    await storage.bucket().deleteFiles({ prefix: `users/${uid}/` })
  } catch {
    // Ignore if no files
  }

  functions.logger.info(`Cleaned up data for deleted user ${uid}`)
})
