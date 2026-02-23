const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function nanoid(size = 21): string {
  let id = ''
  const bytes = crypto.getRandomValues(new Uint8Array(size))
  for (const byte of bytes) {
    id += alphabet[byte % alphabet.length]
  }
  return id
}

/**
 * Generates a deterministic transaction ID from account ID, date, and description.
 * Re-uploading the same statement will produce the same IDs, preventing duplicates.
 * Uses two FNV-1a 32-bit hashes combined for a ~64-bit collision space.
 */
export function makeTransactionId(accountId: string, date: string, description: string): string {
  const key = `${accountId}|${date}|${description.trim().toLowerCase()}`
  let h1 = 0x811c9dc5
  let h2 = 0x5a8a4c1d
  for (let i = 0; i < key.length; i++) {
    const c = key.charCodeAt(i)
    h1 ^= c
    h1 = Math.imul(h1, 0x01000193) >>> 0
    h2 ^= c ^ (i & 0xff)
    h2 = Math.imul(h2, 0x01000193) >>> 0
  }
  return `tx_${h1.toString(36)}${h2.toString(36)}`
}
