# Goals

## 1. Mobile-First UI

Convert the existing desktop-oriented layout to a responsive, mobile-first design.

### Context

The current `AppShell.vue` uses a persistent sidebar (`SideNav`) that takes up horizontal space and collapses to a 16px icon strip. On phones this is unusable. The main content has `p-6` padding and assumes wide viewports. `DashboardView`, `TransactionsView`, `BudgetView`, etc. use multi-column grids and tables that overflow on small screens.

### What needs to change

- **Navigation:** Replace the sidebar with a bottom tab bar on mobile (≤ 768px). Keep the sidebar for md+ breakpoints. The bottom tab bar should mirror the current nav items: Dashboard, Files, Transactions, Budget, Settings.
- **AppShell layout:** Swap from `flex h-screen` with a side-by-side arrangement to a stacked layout on mobile — full-width content with the bottom nav pinned to the bottom.
- **Views:** Audit every view for horizontal overflow. Replace fixed-column grids with single-column stacks that expand at `md:`. Replace wide data tables with card-list alternatives on mobile (the table still shows at `md:`).
- **Touch targets:** Ensure all interactive elements are at least 44×44px on mobile. Add adequate tap spacing between list items and buttons.
- **Modals and drawers:** Modals should slide up from the bottom (drawer style) on mobile rather than centering as a dialog.
- **Typography and spacing:** Reduce padding from `p-6` to `p-4` on mobile. Use `text-sm` / `text-base` scales that are readable without zooming.
- **TopBar:** The `TopBar` component may become redundant on mobile if a bottom nav exists — evaluate whether to keep it, hide it, or repurpose it as a page-title bar.

---

## 2. Capacitor App (iOS & Android)

Wrap the Vue 3 / Vite app in a Capacitor native shell so it can be submitted to the App Store and Google Play.

### Context

The app is already a standard Vite SPA (`packages/app`). Capacitor works by building the web app and embedding it in a native WebView. Firebase Auth, Firestore, and Storage all work inside a Capacitor WebView with minimal changes. The main friction points are:

- Firebase Auth's `signInWithPopup` (Google OAuth) does not work in a WebView — it must be replaced with `signInWithRedirect` or the Capacitor Google Auth plugin (`@codetrix-studio/capacitor-google-auth`).
- File upload from the device camera or file system needs the Capacitor `Filesystem` and `Camera` plugins instead of (or alongside) the browser `<input type="file">`.
- Push notifications for the reminder system (Goal 3) require `@capacitor/push-notifications`.

### What needs to change

1. **Install Capacitor** into `packages/app`:
   ```
   bun add @capacitor/core
   bun add -d @capacitor/cli
   bunx cap init "Budget" "com.yourcompany.budget" --web-dir dist
   bun add @capacitor/ios @capacitor/android
   ```
2. **Build pipeline:** Add a `cap:build` script — `vite build && cap sync` — and document it in the README.
3. **Google Sign-In:** Swap `signInWithPopup` in `AuthView.vue` and `auth.ts` for the Capacitor Google Auth plugin on native, falling back to redirect on web. Use `Capacitor.isNativePlatform()` to branch.
4. **File import:** On native, add `@capacitor/filesystem` and present a native file picker via `FilePicker` plugin. The existing `<input type="file">` flow should remain for web.
5. **Status bar / safe areas:** Add `@capacitor/status-bar` and apply `env(safe-area-inset-*)` CSS variables to avoid content being hidden behind notches and the bottom home indicator.
6. **App icons and splash screens:** Generate assets with `@capacitor/assets` using the existing brand color (`brand-600` = the teal/green used in the logo).
7. **Native builds:** Add `packages/ios` and `packages/android` (or keep them at repo root) via `cap add ios` / `cap add android`. Add these to `.gitignore` or commit them depending on team preference — document the decision.

---

## 3. Weekly / Daily Custom Reminder System

Let users create personal financial reminders with flexible schedules — e.g., "Pay rent 2 days before the end of the month", "Check credit card balance every Monday".

### Context

There is currently no notification or reminder infrastructure. The app has Firebase (Auth + Firestore + Functions) and will have Capacitor (Goal 2). This goal sits at the intersection of both: reminders are stored in Firestore, evaluated server-side by a Cloud Function (or client-side cron), and delivered via push notification on mobile or browser notification on web.

### Data model

Add a `reminders` subcollection under each user document in Firestore:

```ts
interface Reminder {
  id: string
  userId: string
  title: string          // e.g. "Pay rent"
  body?: string          // optional detail
  schedule: ReminderSchedule
  enabled: boolean
  createdAt: Timestamp
  lastFiredAt?: Timestamp
}

type ReminderSchedule =
  | { type: 'daily'; time: string }                         // "09:00"
  | { type: 'weekly'; dayOfWeek: 0-6; time: string }        // 0 = Sunday
  | { type: 'monthly'; dayOfMonth: number; time: string }   // 1–28
  | { type: 'days-before-month-end'; daysBefore: number; time: string }
  // e.g. daysBefore: 2 fires on the 29th of a 31-day month
```

### Architecture

- **Firestore:** `users/{uid}/reminders/{reminderId}` — a new Pinia store (`useRemindersStore`) handles CRUD with real-time subscription.
- **Cloud Function (scheduled):** A Firebase `pubsub.schedule` function runs every hour (or every 15 minutes), queries all enabled reminders whose next fire time has passed, sends a push notification via FCM, and updates `lastFiredAt`. This handles both mobile (FCM token via Capacitor) and web (FCM web push token).
- **Client-side FCM token:** On app load, request notification permission and save the FCM token to `users/{uid}/fcmTokens/{tokenId}` in Firestore. The Cloud Function reads all tokens for the user when firing.
- **UI — Reminders settings page:** Add a `/reminders` route (or a section within `/settings`). The UI should let users:
  - View a list of their reminders
  - Create a new reminder (title, schedule type, time, days-before value)
  - Toggle enabled/disabled
  - Delete a reminder
- **Example reminder:** "Pay rent — 2 days before end of month at 8:00 AM" maps to `{ type: 'days-before-month-end', daysBefore: 2, time: '08:00' }`.

### Implementation notes

- For web (non-Capacitor), use the Firebase JS SDK's `getMessaging` / `getToken` for browser push. This requires a VAPID key and a `firebase-messaging-sw.js` service worker.
- For Capacitor, use `@capacitor/push-notifications` to register with FCM and retrieve the device token.
- The Cloud Function needs the Firebase Admin SDK and should be added to `packages/functions`.

---

## 4. Onboarding Flow

Guide new users through setup immediately after account creation so the app feels useful from the first session.

### Context

Currently, after sign-up the user lands on an empty `DashboardView` with no data and no guidance. There is no way to know what to do next. The onboarding flow should run once and be skippable, but should surface the core value loop: upload a file → AI extracts transactions → see your spending.

### Flow steps

1. **Welcome screen** — Brief hero message ("Let's set up your budget") with the app logo. Single CTA: "Get started".
2. **Upload your first statement** — Prompt the user to upload a bank or credit card CSV/PDF. Re-use the existing file upload component. Show what the app will extract (balances, transactions, categories). Allow "Skip for now".
3. **Review extracted data** — If a file was uploaded, show a preview of the AI-detected transactions and account info before confirming. This mirrors what happens in the normal `FilesView` flow but surfaced inline during onboarding.
4. **Set up your budget categories** — Show a list of default categories (Food, Transport, Housing, etc.) and let the user adjust limits. Pre-populate from the existing `useCategoriesStore` defaults. Allow "Skip for now".
5. **Enable reminders (optional)** — If Goal 3 is done, offer to set up the first reminder here ("Remind me to check my balance every week"). Allow "Skip for now".
6. **Done** — Celebrate with a simple completion screen. Navigate to the Dashboard.

### Implementation

- **Onboarding state:** Track progress in `users/{uid}` Firestore doc with a field `onboardingCompletedAt: Timestamp | null`. If null (or missing), show onboarding on next app load. A Pinia store (`useOnboardingStore`) manages the local step state.
- **Routing:** Add an `/onboarding` route outside the authenticated `AppShell` (so it gets a full-screen layout, no sidebar/bottom-nav distraction). After account creation in `auth.ts`, check `onboardingCompletedAt` and redirect to `/onboarding` if unset.
- **Component structure:** A top-level `OnboardingView.vue` with a step indicator (dots or numbered steps at the top). Each step is a child component: `OnboardingWelcome.vue`, `OnboardingUpload.vue`, `OnboardingReview.vue`, `OnboardingCategories.vue`, `OnboardingReminders.vue`, `OnboardingDone.vue`.
- **Progress persistence:** Save the current step index to Firestore so a user who closes the app mid-onboarding resumes where they left off rather than starting over.
- **Skip behavior:** Skipping any step marks that step complete and advances. Skipping from the final optional step marks onboarding as fully complete.
- **Re-entry:** Add a "Restart onboarding" option in Settings for users who want to re-run it (e.g., after deleting all their data).
