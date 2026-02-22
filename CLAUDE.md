# Budget — Claude Instructions

## Vue 3 Composable Rules

**Always call `use*` hooks in `setup()`, never inside methods, computed, or lifecycle hooks.**

This applies to:
- Pinia stores (`useAuthStore`, `useFilesStore`, `useTransactionsStore`, etc.)
- Vue Router (`useRouter`, `useRoute`)
- Any other Vue composable (`useI18n`, `useMeta`, etc.)

Composables rely on `getCurrentInstance()` which is only available synchronously during component setup. Calling them inside a method — even before any `await` — is unreliable and will break in production.

### Correct pattern (Options API with setup)

```ts
export default defineComponent({
  setup() {
    const auth = useAuthStore()
    const router = useRouter()
    return { auth, router }
  },

  methods: {
    async submit() {
      // Use this.auth and this.router — captured once at setup time
      await this.auth.signIn(this.email, this.password)
      this.router.push('/')
    },
  },
})
```

### Wrong pattern — do not do this

```ts
methods: {
  async submit() {
    const auth = useAuthStore()   // ❌ called outside setup
    const router = useRouter()    // ❌ called outside setup
    await auth.signIn(...)
    router.push('/')
  },
},
```

## Firestore Rules

**Never write `undefined` values to Firestore.** Firestore throws a runtime error if any field in a document is `undefined`.

For optional fields, omit them entirely from the object rather than setting them to `undefined`:

```ts
// ✅ Correct — omit the field when the value is absent
const data = {
  name: account.name,
  ...(account.creditLimit !== undefined && { creditLimit: account.creditLimit }),
  ...(account.interestRate !== undefined && { interestRate: account.interestRate }),
}

// ❌ Wrong — Firestore will throw
const data = {
  name: account.name,
  creditLimit: account.creditLimit,   // may be undefined
  interestRate: account.interestRate, // may be undefined
}
```

This applies everywhere: `setDoc`, `updateDoc`, `addDoc`, batch writes, and transactions.

## Tech Stack

- **Runtime:** Bun
- **Frontend:** Vue 3 (Options API), Vite, TypeScript
- **Styling:** Tailwind CSS — use utility classes, no custom CSS unless unavoidable
- **State:** Pinia with `pinia-plugin-persistedstate` for local persistence
- **Icons:** `lucide-vue-next`
- **Charts:** `./viper` (local library) — ask user before using anything not already in it
- **AI:** Vercel AI SDK (`ai`, `@ai-sdk/anthropic`, `@ai-sdk/openai`)
- **Backend:** Firebase (Auth, Firestore, Storage) via env vars
- **Fonts:** Montserrat (`font-heading`) for headers, Merriweather (`font-body`) for body

## Project Structure

```
packages/
  app/          # Vue 3 frontend (bun dev)
  functions/    # Firebase Cloud Functions
```

## Style Guide

- Options API preferred over Composition API for consistency
- `setup()` is fine alongside Options API for composables only
- Tailwind classes over inline styles
- Use `card`, `btn-primary`, `btn-secondary`, `btn-ghost`, `input`, `label`, `badge` utility classes defined in `src/assets/main.css`
- Loading states should show a helpful financial tip (see `LoadingSpinner` component)
