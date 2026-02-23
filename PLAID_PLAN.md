# Plaid Integration Plan

## 1. Getting a Plaid Account

### Sign Up
1. Go to https://dashboard.plaid.com/signup
2. Create a free developer account
3. Complete the onboarding questionnaire — select **Personal Finance** as your use case

### Sandbox Credentials
Sandbox is available immediately after signup — no approval required.

1. In the Plaid Dashboard, go to **Team Settings → Keys**
2. Copy your `client_id` and `sandbox` secret
3. Sandbox lets you test with fake banks using:
   - Username: `user_good`
   - Password: `pass_good`
   - Test banks: "First Platypus Bank", "Tartan Bank", "Huntington Bank"

### Production Access
Production requires a manual review:
1. Complete identity verification in the Dashboard
2. Submit a **Production Access Request** describing your app
3. Wait for Plaid review (typically 1–5 business days)
4. Accept Plaid's Developer Policy and Data Agreement

---

## 2. Environment Variable Setup

### Firebase Functions (backend)
Plaid credentials only live on the server — they are **never exposed to the browser**.

Set them via Firebase CLI:
```bash
firebase functions:config:set \
  plaid.client_id="YOUR_CLIENT_ID" \
  plaid.secret="YOUR_SANDBOX_SECRET" \
  plaid.env="sandbox"
```

For local emulator development, create `packages/functions/.env`:
```
PLAID_CLIENT_ID=your_client_id_here
PLAID_SECRET=your_sandbox_secret_here
PLAID_ENV=sandbox
```

### Frontend (app)
No Plaid credentials go in the frontend `.env`. All sensitive calls are proxied through Firebase callable functions.

---

## 3. Architecture Overview

```
Browser                    Firebase Functions              Plaid API
  │                              │                            │
  │── createPlaidLinkToken() ───>│── linkTokenCreate() ──────>│
  │<── linkToken ────────────────│<── link_token ─────────────│
  │                              │                            │
  │── [Plaid Link modal opens] ──────────────────────────────>│
  │<── publicToken + metadata ───────────────────────────────│
  │                              │                            │
  │── exchangePlaidPublicToken() >│── itemPublicTokenExchange >│
  │                              │── accountsGet() ──────────>│
  │                              │── transactionsGet() ───────>│
  │<── item saved + txns synced ─│                            │
  │                              │                            │
  │── syncPlaidItem(itemId) ────>│── accountsGet() ──────────>│
  │                              │── transactionsGet() ───────>│
  │<── updated balances + txns ──│                            │
```

---

## 4. Plaid Products Used

| Product       | Purpose                                         |
|---------------|-------------------------------------------------|
| Transactions  | Full transaction history (up to 24 months)      |
| Auth          | Verify account + routing numbers (optional)     |
| Balance       | Real-time available balance checks (optional)   |

---

## 5. Firestore Data Model

### `plaidItems/{itemId}` — client-readable
Stores non-sensitive metadata about a linked bank connection.

```ts
{
  uid: string            // Firebase Auth UID
  institutionId: string  // Plaid institution ID (e.g. "ins_3")
  institutionName: string
  lastSync: string | null  // ISO timestamp of last successful sync
  status: 'active' | 'error' | 'pending'
  error?: string           // Set when status === 'error'
}
```

### `plaidSecrets/{itemId}` — server-only, never client-readable
Stores the sensitive access token. Firestore rules must block all client access.

```ts
{
  uid: string
  accessToken: string  // NEVER expose to the browser
}
```

> **Security**: Update `firestore.rules` to block client reads on `plaidSecrets` (see section 7).

---

## 6. Extended Types

Add these to `src/types/index.ts`:

```ts
export interface PlaidItem {
  id: string            // Plaid item_id
  uid: string
  institutionId: string
  institutionName: string
  lastSync: string | null
  status: 'active' | 'error' | 'pending'
  error?: string
}

export interface PlaidLinkedAccount {
  plaidAccountId: string    // Plaid account_id
  plaidItemId: string
  name: string
  officialName?: string
  subtype: string           // e.g. "checking", "savings", "credit card"
  mask?: string             // last 4 digits
  balanceCurrent?: number
  balanceAvailable?: number
  currency: string
}
```

Additions to existing `Account` type:
```ts
plaidAccountId?: string   // links to Plaid account_id for dedup
plaidItemId?: string      // which Plaid item this came from
source?: 'manual' | 'plaid'
```

Additions to existing `Transaction` type:
```ts
plaidTransactionId?: string  // for deduplication on re-sync
source?: 'manual' | 'plaid'
```

---

## 7. Firestore Rules

Add to `firestore.rules`:

```
// Plaid access tokens — server-only, zero client access
match /plaidSecrets/{itemId} {
  allow read, write: if false;
}

// Plaid item metadata — read/delete by owning user, write by server only
match /plaidItems/{itemId} {
  allow read, delete: if request.auth != null && request.auth.uid == resource.data.uid;
  allow create, update: if false;
}
```

---

## 8. Firebase Cloud Functions

Four callable functions (all require Firebase Auth):

| Function                    | What it does                                                   |
|-----------------------------|----------------------------------------------------------------|
| `createPlaidLinkToken`      | Generates a short-lived token to open Plaid Link UI            |
| `exchangePlaidPublicToken`  | Swaps public_token for access_token, saves item, syncs initial data |
| `syncPlaidItem`             | Re-syncs accounts + transactions for an existing item          |
| `removePlaidItem`           | Deletes item from Firestore (and optionally revokes at Plaid)  |

---

## 9. Frontend Integration

Plaid Link is loaded via a `<script>` tag from Plaid's CDN:
```html
<script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
```

The flow in Vue:
1. Call `createPlaidLinkToken` function → get `linkToken`
2. `window.Plaid.create({ token: linkToken, onSuccess, onExit })` and `.open()`
3. On `onSuccess(publicToken, metadata)` → call `exchangePlaidPublicToken`
4. Plaid store subscribes to `plaidItems` collection for live updates

---

## 10. Implementation Checklist

- [ ] Sign up at dashboard.plaid.com
- [ ] Copy sandbox `client_id` and `secret`
- [ ] Set Firebase Functions config: `plaid.client_id`, `plaid.secret`, `plaid.env`
- [ ] `cd packages/functions && bun add plaid`
- [ ] Deploy functions: `firebase deploy --only functions`
- [ ] Update `firestore.rules` with `plaidSecrets` and `plaidItems` rules
- [ ] Test with sandbox credentials (`user_good` / `pass_good`)
- [ ] Apply for production access when ready to go live

---

## 11. Costs

| Environment | Cost                                       |
|-------------|--------------------------------------------|
| Sandbox     | Free                                       |
| Development | Free (up to 100 items)                     |
| Production  | Free up to 200 Items/month, then pay-per-use |

See https://plaid.com/pricing/ for current pricing details.
