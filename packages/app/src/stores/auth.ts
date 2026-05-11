import { defineStore } from 'pinia'
import { authClient } from '@/lib/auth-client'
import type { UserProfile } from '@/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserProfile | null,
    loading: true,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.user
    },
  },

  actions: {
    async init() {
      try {
        const { data: session } = await authClient.getSession()
        if (session?.user) {
          this.user = {
            uid: session.user.id,
            email: session.user.email ?? null,
            displayName: session.user.name ?? null,
            photoURL: session.user.image ?? null,
          }
        } else {
          this.user = null
        }
      } catch {
        this.user = null
      }
      this.loading = false
    },

    async signIn(email: string, password: string) {
      this.error = null
      try {
        const { data, error } = await authClient.signIn.email({ email, password })
        if (error) {
          this.error = error.message ?? 'Invalid email or password.'
          throw new Error(this.error!)
        }
        if (data?.user) {
          this.user = {
            uid: data.user.id,
            email: data.user.email ?? null,
            displayName: data.user.name ?? null,
            photoURL: data.user.image ?? null,
          }
        }
      } catch (e: unknown) {
        if (!this.error) {
          this.error = getAuthError(e)
        }
        throw e
      }
    },

    async signInWithGoogle() {
      this.error = null
      try {
        const { error } = await authClient.signIn.social({ provider: 'google' })
        if (error) {
          this.error = error.message ?? 'Google sign-in failed.'
          throw new Error(this.error!)
        }
        // After redirect, init() will pick up the session
      } catch (e: unknown) {
        if (!this.error) {
          this.error = getAuthError(e)
        }
        throw e
      }
    },

    async signUp(email: string, password: string) {
      this.error = null
      try {
        const { data, error } = await authClient.signUp.email({
          email,
          password,
          name: email.split('@')[0],
        })
        if (error) {
          this.error = error.message ?? 'Sign-up failed.'
          throw new Error(this.error!)
        }
        if (data?.user) {
          this.user = {
            uid: data.user.id,
            email: data.user.email ?? null,
            displayName: data.user.name ?? null,
            photoURL: data.user.image ?? null,
          }
        }
      } catch (e: unknown) {
        if (!this.error) {
          this.error = getAuthError(e)
        }
        throw e
      }
    },

    async logout() {
      await authClient.signOut()
      this.user = null
    },
  },
})

function getAuthError(e: unknown): string {
  if (e instanceof Error) {
    return e.message
  }
  return 'An error occurred. Please try again.'
}
