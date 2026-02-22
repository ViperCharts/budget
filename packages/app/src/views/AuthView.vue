<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center mx-auto mb-4">
          <TrendingUp class="w-7 h-7 text-white" />
        </div>
        <h1 class="font-heading font-bold text-3xl text-gray-900 dark:text-white">Budget</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1 font-body">
          Simple, private, AI-powered budgeting
        </p>
      </div>

      <div class="card shadow-xl">
        <!-- Tab switcher -->
        <div class="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
          <button
            v-for="tab in ['sign-in', 'sign-up']"
            :key="tab"
            :class="[
              'flex-1 py-2 px-4 rounded-md text-sm font-heading font-medium transition-all',
              activeTab === tab
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
            ]"
            @click="activeTab = tab as 'sign-in' | 'sign-up'; error = ''"
          >
            {{ tab === 'sign-in' ? 'Sign In' : 'Create Account' }}
          </button>
        </div>

        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="label">Email</label>
            <input
              v-model="email"
              type="email"
              class="input"
              placeholder="you@example.com"
              required
              autocomplete="email"
            />
          </div>

          <div>
            <label class="label">Password</label>
            <input
              v-model="password"
              type="password"
              class="input"
              :placeholder="activeTab === 'sign-up' ? 'At least 6 characters' : 'Your password'"
              required
              autocomplete="current-password"
            />
          </div>

          <p v-if="error" class="text-sm text-red-600 dark:text-red-400 font-body">
            {{ error }}
          </p>

          <button type="submit" class="btn-primary w-full justify-center" :disabled="loading">
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            {{ activeTab === 'sign-in' ? 'Sign In' : 'Create Account' }}
          </button>
        </form>

        <div class="flex items-center gap-3 my-4">
          <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span class="text-xs text-gray-400 font-body">or</span>
          <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        <button
          @click="signInWithGoogle"
          class="btn-secondary w-full justify-center"
          :disabled="loading"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>

      <p class="text-center text-xs text-gray-400 mt-6 font-body">
        Your data is encrypted and stored securely. We never sell your information.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TrendingUp, Loader2 } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AuthView',
  components: { TrendingUp, Loader2 },

  data() {
    return {
      activeTab: 'sign-in' as 'sign-in' | 'sign-up',
      email: '',
      password: '',
      loading: false,
      error: '',
    }
  },

  methods: {
    async submit() {
      this.loading = true
      this.error = ''
      const auth = useAuthStore()
      const router = useRouter()

      try {
        if (this.activeTab === 'sign-in') {
          await auth.signIn(this.email, this.password)
        } else {
          await auth.signUp(this.email, this.password)
        }
        router.push('/')
      } catch {
        this.error = auth.error ?? 'Something went wrong.'
      } finally {
        this.loading = false
      }
    },

    async signInWithGoogle() {
      this.loading = true
      this.error = ''
      const auth = useAuthStore()
      const router = useRouter()

      try {
        await auth.signInWithGoogle()
        router.push('/')
      } catch {
        this.error = auth.error ?? 'Google sign-in failed.'
      } finally {
        this.loading = false
      }
    },
  },
})
</script>
