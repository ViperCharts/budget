import { defineStore } from 'pinia'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import type { UserProfile } from '@/types'

const cookieStorage = {
  getItem(key: string): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${encodeURIComponent(key)}=([^;]*)`))
    return match ? decodeURIComponent(match[1]) : null
  },
  setItem(key: string, value: string): void {
    const maxAge = 60 * 60 * 24 * 365 // 1 year
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Strict`
  },
  removeItem(key: string): void {
    document.cookie = `${encodeURIComponent(key)}=;path=/;max-age=0`
  },
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserProfile | null,
    loading: true,
    error: null as string | null,
  }),

  persist: {
    key: 'budget-auth',
    storage: cookieStorage,
    pick: ['user'],
  },

  getters: {
    isAuthenticated(): boolean {
      return !!this.user
    },
  },

  actions: {
    init() {
      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, (firebaseUser: User | null) => {
          if (firebaseUser) {
            this.user = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            }
          } else {
            this.user = null
          }
          this.loading = false
          resolve()
        })
      })
    },

    async signIn(email: string, password: string) {
      this.error = null
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (e: unknown) {
        this.error = getAuthError(e)
        throw e
      }
    },

    async signInWithGoogle() {
      this.error = null
      try {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
      } catch (e: unknown) {
        this.error = getAuthError(e)
        throw e
      }
    },

    async signUp(email: string, password: string) {
      this.error = null
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (e: unknown) {
        this.error = getAuthError(e)
        throw e
      }
    },

    async logout() {
      await signOut(auth)
      this.user = null
    },
  },
})

function getAuthError(e: unknown): string {
  if (e && typeof e === 'object' && 'code' in e) {
    const code = (e as { code: string }).code
    const messages: Record<string, string> = {
      'auth/invalid-credential': 'Invalid email or password.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/popup-closed-by-user': 'Sign-in was cancelled.',
    }
    return messages[code] ?? 'An error occurred. Please try again.'
  }
  return 'An error occurred. Please try again.'
}
