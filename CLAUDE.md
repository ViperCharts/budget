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

## Database Rules

**Use `null` instead of `undefined` for optional database fields.** PostgreSQL columns accept `null` but not `undefined`.

For optional fields, pass `null` explicitly when the value is absent:

```ts
// ✅ Correct
const data = {
  name: account.name,
  creditLimit: account.creditLimit ?? null,
  interestRate: account.interestRate ?? null,
}
```

This applies to all Drizzle ORM insert/update operations.

## Tech Stack

- **Runtime:** Bun
- **Frontend:** Vue 3 (Options API), Vite, TypeScript
- **Styling:** Tailwind CSS — use utility classes, no custom CSS unless unavoidable
- **State:** Pinia with `pinia-plugin-persistedstate` for local persistence
- **Icons:** `lucide-vue-next`
- **Charts:** `./viper` (local library) — ask user before using anything not already in it
- **AI:** Vercel AI SDK (`ai`, `@ai-sdk/anthropic`, `@ai-sdk/openai`)
- **Backend:** PostgreSQL (Neon) + Drizzle ORM + tRPC + better-auth
- **Server:** Bun + Hono (packages/server)
- **Fonts:** Montserrat (`font-heading`) for headers, Roboto (`font-body`) for body

## Project Structure

```
packages/
  app/          # Vue 3 frontend (bun dev)
  server/       # Bun + Hono + tRPC + Drizzle + better-auth (bun dev:server)
```

## Style Guide

- Options API preferred over Composition API for consistency
- `setup()` is fine alongside Options API for composables only
- Tailwind classes over inline styles
- Use `card`, `btn-primary`, `btn-secondary`, `btn-ghost`, `input`, `label`, `badge` utility classes defined in `src/assets/main.css`
- Loading states should show a helpful financial tip (see `LoadingSpinner` component)
