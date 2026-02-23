"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUserDeleted = exports.onFileDeleted = exports.removePlaidItem = exports.syncPlaidItem = exports.exchangePlaidPublicToken = exports.createPlaidLinkToken = void 0;
const admin = __importStar(require("firebase-admin"));
const firestore_1 = require("firebase-admin/firestore");
const functions = __importStar(require("firebase-functions"));
const plaid_1 = require("plaid");
admin.initializeApp();
// ── Plaid client ──────────────────────────────────────────────────────────────
function getPlaidClient() {
    var _a;
    const clientId = process.env.PLAID_CLIENT_ID;
    const secret = process.env.PLAID_SECRET;
    const env = ((_a = process.env.PLAID_ENV) !== null && _a !== void 0 ? _a : 'sandbox');
    if (!clientId || !secret) {
        throw new functions.https.HttpsError('failed-precondition', 'Plaid credentials are not configured. Set PLAID_CLIENT_ID and PLAID_SECRET in Firebase Functions config.');
    }
    const config = new plaid_1.Configuration({
        basePath: plaid_1.PlaidEnvironments[env],
        baseOptions: {
            headers: {
                'PLAID-CLIENT-ID': clientId,
                'PLAID-SECRET': secret,
            },
        },
    });
    return new plaid_1.PlaidApi(config);
}
// ── Plaid callable functions ───────────────────────────────────────────────────
/**
 * Creates a Plaid Link token for the frontend to open the Plaid Link UI.
 */
exports.createPlaidLinkToken = functions.https.onCall(async (_data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
    }
    const plaid = getPlaidClient();
    const response = await plaid.linkTokenCreate({
        user: { client_user_id: context.auth.uid },
        client_name: 'Budget',
        products: [plaid_1.Products.Transactions],
        country_codes: [plaid_1.CountryCode.Us],
        language: 'en',
    });
    return { linkToken: response.data.link_token };
});
/**
 * Exchanges a public token from Plaid Link for an access token,
 * saves the item metadata, and performs an initial data sync.
 */
exports.exchangePlaidPublicToken = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
    }
    const { publicToken, institutionId, institutionName } = data;
    if (!publicToken) {
        throw new functions.https.HttpsError('invalid-argument', 'publicToken is required');
    }
    const plaid = getPlaidClient();
    const db = admin.firestore();
    const uid = context.auth.uid;
    // Exchange public token for access token
    const exchangeResponse = await plaid.itemPublicTokenExchange({ public_token: publicToken });
    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;
    // Store access token separately — never returned to the client
    await db.collection('plaidSecrets').doc(itemId).set({ uid, accessToken });
    // Save item metadata (safe for client reads)
    await db.collection('plaidItems').doc(itemId).set({
        uid,
        institutionId: institutionId !== null && institutionId !== void 0 ? institutionId : '',
        institutionName: institutionName !== null && institutionName !== void 0 ? institutionName : 'Unknown Bank',
        lastSync: null,
        status: 'pending',
    });
    // Sync initial accounts and transactions in the background
    await _syncPlaidItemData(uid, itemId, accessToken);
    return { itemId };
});
/**
 * Re-syncs accounts and transactions for an existing Plaid item.
 */
exports.syncPlaidItem = functions.https.onCall(async (data, context) => {
    var _a;
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
    }
    const { itemId } = data;
    if (!itemId) {
        throw new functions.https.HttpsError('invalid-argument', 'itemId is required');
    }
    const db = admin.firestore();
    const uid = context.auth.uid;
    // Verify ownership
    const itemDoc = await db.collection('plaidItems').doc(itemId).get();
    if (!itemDoc.exists || ((_a = itemDoc.data()) === null || _a === void 0 ? void 0 : _a.uid) !== uid) {
        throw new functions.https.HttpsError('not-found', 'Plaid item not found');
    }
    // Retrieve access token
    const secretDoc = await db.collection('plaidSecrets').doc(itemId).get();
    if (!secretDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'Plaid item credentials not found');
    }
    const accessToken = secretDoc.data().accessToken;
    await _syncPlaidItemData(uid, itemId, accessToken);
    return { ok: true };
});
/**
 * Removes a Plaid item from Firestore (and revokes its access token at Plaid).
 */
exports.removePlaidItem = functions.https.onCall(async (data, context) => {
    var _a;
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
    }
    const { itemId } = data;
    if (!itemId) {
        throw new functions.https.HttpsError('invalid-argument', 'itemId is required');
    }
    const db = admin.firestore();
    const uid = context.auth.uid;
    // Verify ownership
    const itemDoc = await db.collection('plaidItems').doc(itemId).get();
    if (!itemDoc.exists || ((_a = itemDoc.data()) === null || _a === void 0 ? void 0 : _a.uid) !== uid) {
        throw new functions.https.HttpsError('not-found', 'Plaid item not found');
    }
    // Revoke the access token at Plaid
    try {
        const secretDoc = await db.collection('plaidSecrets').doc(itemId).get();
        if (secretDoc.exists) {
            const plaid = getPlaidClient();
            await plaid.itemRemove({ access_token: secretDoc.data().accessToken });
        }
    }
    catch (_b) {
        // Continue cleanup even if Plaid revocation fails
        functions.logger.warn(`Failed to revoke Plaid access token for item ${itemId}`);
    }
    // Delete Firestore documents
    const batch = db.batch();
    batch.delete(db.collection('plaidItems').doc(itemId));
    batch.delete(db.collection('plaidSecrets').doc(itemId));
    await batch.commit();
    return { ok: true };
});
// ── Internal sync helper ───────────────────────────────────────────────────────
async function _syncPlaidItemData(uid, itemId, accessToken) {
    var _a, _b, _c, _d, _e, _f, _g;
    const plaid = getPlaidClient();
    const db = admin.firestore();
    try {
        // Fetch accounts and balances
        const accountsResponse = await plaid.accountsGet({ access_token: accessToken });
        const plaidAccounts = accountsResponse.data.accounts;
        // Upsert accounts into the accounts collection
        const accountsBatch = db.batch();
        const plaidAccountIdToFirestoreId = {};
        for (const pa of plaidAccounts) {
            // Look for an existing account with this plaid account ID
            const existing = await db
                .collection('accounts')
                .where('uid', '==', uid)
                .where('plaidAccountId', '==', pa.account_id)
                .limit(1)
                .get();
            const firestoreId = existing.empty
                ? db.collection('accounts').doc().id
                : existing.docs[0].id;
            plaidAccountIdToFirestoreId[pa.account_id] = firestoreId;
            const balance = (_b = (_a = pa.balances.current) !== null && _a !== void 0 ? _a : pa.balances.available) !== null && _b !== void 0 ? _b : 0;
            const accountType = _mapPlaidAccountType(pa.type, (_c = pa.subtype) !== null && _c !== void 0 ? _c : '');
            const accountData = Object.assign({ id: firestoreId, uid, name: pa.name, type: accountType, balance, currency: ((_d = pa.balances.iso_currency_code) !== null && _d !== void 0 ? _d : 'USD').toUpperCase(), lastUpdated: new Date().toISOString(), fileIds: existing.empty ? [] : ((_e = existing.docs[0].data().fileIds) !== null && _e !== void 0 ? _e : []), plaidAccountId: pa.account_id, plaidItemId: itemId, source: 'plaid' }, (pa.mask !== null && pa.mask !== undefined && { accountNumber: pa.mask }));
            accountsBatch.set(db.collection('accounts').doc(firestoreId), accountData);
        }
        await accountsBatch.commit();
        // Fetch up to 24 months of transactions
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 730 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0];
        const txResponse = await plaid.transactionsGet({
            access_token: accessToken,
            start_date: startDate,
            end_date: endDate,
            options: { count: 500, offset: 0 },
        });
        const plaidTxs = txResponse.data.transactions;
        if (plaidTxs.length > 0) {
            // Batch upsert transactions — skip duplicates by plaidTransactionId
            const existingTxSnapshot = await db
                .collection('transactions')
                .where('uid', '==', uid)
                .where('plaidItemId', '==', itemId)
                .get();
            const existingPlaidTxIds = new Set(existingTxSnapshot.docs.map((d) => d.data().plaidTransactionId));
            const newTxs = plaidTxs.filter((t) => !existingPlaidTxIds.has(t.transaction_id));
            if (newTxs.length > 0) {
                const txBatch = db.batch();
                for (const pt of newTxs) {
                    const accountFirestoreId = plaidAccountIdToFirestoreId[pt.account_id];
                    if (!accountFirestoreId)
                        continue;
                    const txId = db.collection('transactions').doc().id;
                    const amount = Math.abs(pt.amount);
                    // In Plaid: positive amount = debit (money out), negative = credit (money in)
                    const type = pt.amount > 0 ? 'debit' : 'credit';
                    const txData = {
                        id: txId,
                        uid,
                        accountId: accountFirestoreId,
                        fileId: `plaid:${itemId}`,
                        date: pt.date,
                        description: pt.name,
                        amount,
                        type,
                        category: _mapPlaidCategory((_g = (_f = pt.personal_finance_category) === null || _f === void 0 ? void 0 : _f.primary) !== null && _g !== void 0 ? _g : ''),
                        pending: pt.pending,
                        plaidTransactionId: pt.transaction_id,
                        plaidItemId: itemId,
                        source: 'plaid',
                    };
                    txBatch.set(db.collection('transactions').doc(txId), txData);
                }
                await txBatch.commit();
                functions.logger.info(`Synced ${newTxs.length} new transactions for item ${itemId}`);
            }
        }
        // Mark item as active with sync timestamp
        await db.collection('plaidItems').doc(itemId).update({
            status: 'active',
            lastSync: new Date().toISOString(),
            error: firestore_1.FieldValue.delete(),
        });
    }
    catch (err) {
        functions.logger.error(`Plaid sync failed for item ${itemId}:`, err);
        await db.collection('plaidItems').doc(itemId).update({
            status: 'error',
            error: err instanceof Error ? err.message : 'Sync failed',
        });
        throw err;
    }
}
function _mapPlaidAccountType(type, subtype) {
    if (type === 'credit')
        return 'credit_card';
    if (type === 'loan') {
        if (subtype === 'mortgage')
            return 'mortgage';
        return 'loan';
    }
    if (type === 'investment')
        return 'investment';
    if (subtype === 'savings')
        return 'savings';
    return 'checking';
}
function _mapPlaidCategory(plaidCategory) {
    var _a;
    const map = {
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
    };
    return (_a = map[plaidCategory]) !== null && _a !== void 0 ? _a : 'Other';
}
// ── Firestore triggers ────────────────────────────────────────────────────────
/**
 * When a file is deleted, clean up its associated transactions.
 * This is a safety net in addition to the client-side cleanup.
 */
exports.onFileDeleted = functions.firestore
    .document('files/{fileId}')
    .onDelete(async (snap, context) => {
    const fileId = context.params.fileId;
    const db = admin.firestore();
    const txsQuery = await db
        .collection('transactions')
        .where('fileId', '==', fileId)
        .get();
    if (txsQuery.empty)
        return;
    const batch = db.batch();
    txsQuery.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    functions.logger.info(`Deleted ${txsQuery.size} transactions for file ${fileId}`);
});
/**
 * When a user is deleted from Firebase Auth, clean up all their data.
 */
exports.onUserDeleted = functions.auth.user().onDelete(async (user) => {
    const db = admin.firestore();
    const storage = admin.storage();
    const uid = user.uid;
    // Delete all collections
    const collections = ['files', 'transactions', 'accounts', 'plaidItems', 'plaidSecrets'];
    for (const col of collections) {
        const snapshot = await db.collection(col).where('uid', '==', uid).get();
        const batch = db.batch();
        snapshot.docs.forEach((doc) => batch.delete(doc.ref));
        if (!snapshot.empty)
            await batch.commit();
    }
    // Delete storage files
    try {
        await storage.bucket().deleteFiles({ prefix: `users/${uid}/` });
    }
    catch (_a) {
        // Ignore if no files
    }
    functions.logger.info(`Cleaned up data for deleted user ${uid}`);
});
//# sourceMappingURL=index.js.map