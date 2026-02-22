<template>
  <div class="space-y-6 max-w-2xl">
    <h2 class="font-heading font-bold text-xl text-gray-900 dark:text-white">Settings</h2>

    <!-- AI Configuration -->
    <div class="card space-y-5">
      <div class="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
        <div class="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
          <Sparkles class="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 class="font-heading font-semibold text-gray-900 dark:text-white">AI Settings</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 font-body">
            Used to extract transactions from statements
          </p>
        </div>
      </div>

      <!-- Provider -->
      <div>
        <label class="label">AI Provider</label>
        <div class="flex gap-2">
          <button
            v-for="provider in ['anthropic', 'openai']"
            :key="provider"
            :class="[
              'flex-1 py-2.5 px-4 rounded-lg border-2 text-sm font-heading font-medium transition-all',
              aiStore.settings.provider === provider
                ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300',
            ]"
            @click="aiStore.updateSettings({ provider: provider as 'anthropic' | 'openai' })"
          >
            {{ provider === 'anthropic' ? '🧡 Anthropic' : '🤖 OpenAI' }}
          </button>
        </div>
      </div>

      <!-- API Key -->
      <div>
        <label class="label">
          {{ aiStore.settings.provider === 'anthropic' ? 'Anthropic' : 'OpenAI' }} API Key
        </label>
        <div class="relative">
          <input
            :value="aiStore.settings.apiKey"
            :type="showKey ? 'text' : 'password'"
            class="input pr-20"
            :placeholder="aiStore.settings.provider === 'anthropic' ? 'sk-ant-...' : 'sk-...'"
            @input="aiStore.setApiKey(($event.target as HTMLInputElement).value)"
          />
          <button
            class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-heading"
            @click="showKey = !showKey"
          >
            {{ showKey ? 'Hide' : 'Show' }}
          </button>
        </div>
        <p class="text-xs text-gray-400 mt-1.5 font-body">
          Your key is stored locally in your browser and never sent to our servers.
        </p>
      </div>

      <!-- Model -->
      <div>
        <label class="label">Model</label>
        <select
          :value="aiStore.settings.model"
          class="input"
          @change="aiStore.updateSettings({ model: ($event.target as HTMLSelectElement).value })"
        >
          <option
            v-for="m in aiStore.modelOptions"
            :key="m.value"
            :value="m.value"
          >
            {{ m.label }}
          </option>
        </select>
      </div>

      <!-- Test connection -->
      <div class="flex items-center gap-3">
        <button
          class="btn-primary"
          :disabled="!aiStore.hasApiKey || testing"
          @click="testConnection"
        >
          <Loader2 v-if="testing" class="w-4 h-4 animate-spin" />
          <Zap v-else class="w-4 h-4" />
          Test Connection
        </button>
        <span v-if="testResult" :class="['text-sm font-body', testResult.ok ? 'text-emerald-600' : 'text-red-500']">
          {{ testResult.message }}
        </span>
      </div>
    </div>

    <!-- Appearance -->
    <div class="card space-y-4">
      <div class="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
        <div class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          <Palette class="w-5 h-5 text-blue-500" />
        </div>
        <h3 class="font-heading font-semibold text-gray-900 dark:text-white">Appearance</h3>
      </div>

      <div>
        <label class="label">Theme</label>
        <div class="flex gap-2">
          <button
            v-for="mode in themes"
            :key="mode.value"
            :class="[
              'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border-2 text-sm font-heading font-medium transition-all',
              themeStore.mode === mode.value
                ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300',
            ]"
            @click="themeStore.setMode(mode.value as 'light' | 'dark' | 'system')"
          >
            <component :is="mode.icon" class="w-4 h-4" />
            {{ mode.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Account -->
    <div class="card space-y-4">
      <div class="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
        <div class="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <UserCircle class="w-5 h-5 text-gray-500" />
        </div>
        <h3 class="font-heading font-semibold text-gray-900 dark:text-white">Account</h3>
      </div>

      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-heading font-medium text-gray-900 dark:text-white">
            {{ authStore.user?.email }}
          </p>
          <p class="text-xs text-gray-500 font-body">Signed in</p>
        </div>
        <button class="btn-danger" @click="logout">
          <LogOut class="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>

    <!-- Firebase config note -->
    <div class="card bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800">
      <div class="flex gap-3">
        <AlertCircle class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p class="font-heading font-medium text-amber-800 dark:text-amber-300 text-sm">
            Firebase Configuration
          </p>
          <p class="text-xs text-amber-700 dark:text-amber-400 font-body mt-0.5">
            Set your Firebase credentials in <code class="font-mono bg-amber-100 dark:bg-amber-900/30 px-1 rounded">.env.local</code> to enable cloud sync and storage.
            See <code class="font-mono bg-amber-100 dark:bg-amber-900/30 px-1 rounded">.env.example</code> for required variables.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import {
  Sparkles,
  Loader2,
  Zap,
  Palette,
  UserCircle,
  LogOut,
  AlertCircle,
  Sun,
  Moon,
  Monitor,
} from 'lucide-vue-next'
import { useAIStore } from '@/stores/ai'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { getFinancialTip } from '@/lib/ai'

export default defineComponent({
  name: 'SettingsView',
  components: {
    Sparkles, Loader2, Zap, Palette, UserCircle, LogOut, AlertCircle,
  },

  setup() {
    const aiStore = useAIStore()
    const themeStore = useThemeStore()
    const authStore = useAuthStore()
    const router = useRouter()
    return { aiStore, themeStore, authStore, router }
  },

  data() {
    return {
      showKey: false,
      testing: false,
      testResult: null as { ok: boolean; message: string } | null,
      themes: [
        { value: 'light', label: 'Light', icon: Sun },
        { value: 'dark', label: 'Dark', icon: Moon },
        { value: 'system', label: 'System', icon: Monitor },
      ],
    }
  },

  methods: {
    async testConnection() {
      this.testing = true
      this.testResult = null
      try {
        const tip = await getFinancialTip({}, this.aiStore.settings)
        this.testResult = { ok: true, message: `Connected! "${tip.slice(0, 60)}..."` }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Connection failed'
        this.testResult = { ok: false, message: msg }
      } finally {
        this.testing = false
      }
    },

    async logout() {
      await this.authStore.logout()
      this.router.push('/auth')
    },
  },
})
</script>
