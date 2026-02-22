import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp()

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
  const collections = ['files', 'transactions', 'accounts']
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
