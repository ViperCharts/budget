<template>
  <header class="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
    <!-- Left: breadcrumb / page title -->
    <div class="flex items-center gap-3">
      <button
        @click="$emit('toggle-sidebar')"
        class="lg:hidden btn-ghost p-2 rounded-lg"
      >
        <Menu class="w-5 h-5" />
      </button>
      <h1 class="font-heading font-semibold text-gray-900 dark:text-white text-lg">
        {{ pageTitle }}
      </h1>
    </div>

    <!-- Right: actions -->
    <div class="flex items-center gap-2">
      <!-- AI tip -->
      <div
        v-if="financialTip"
        class="hidden md:flex items-center gap-2 max-w-sm px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs font-body"
      >
        <Sparkles class="w-3.5 h-3.5 shrink-0" />
        <span class="line-clamp-1">{{ financialTip }}</span>
      </div>

      <!-- Global month picker -->
      <div class="flex items-center gap-0.5 border border-[var(--color-border)] rounded-lg px-1">
        <button class="btn-ghost p-1.5" title="Previous month" @click="monthStore.prevPeriod()">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <span class="font-heading font-semibold text-sm text-gray-900 dark:text-white w-32 text-center select-none">
          {{ formatPeriod(monthStore.activePeriod) }}
        </span>
        <button
          class="btn-ghost p-1.5"
          title="Next month"
          :disabled="monthStore.isCurrentPeriod"
          @click="monthStore.nextPeriod()"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Theme toggle -->
      <button @click="cycleTheme" class="btn-ghost p-2">
        <Sun v-if="themeMode === 'light'" class="w-4 h-4" />
        <Moon v-else-if="themeMode === 'dark'" class="w-4 h-4" />
        <Monitor v-else class="w-4 h-4" />
      </button>

      <!-- User avatar -->
      <div class="relative">
        <button @click="showUserMenu = !showUserMenu" class="flex items-center gap-2 btn-ghost px-2 py-1.5">
          <div class="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-heading font-semibold">
            {{ userInitial }}
          </div>
          <ChevronDown class="w-3 h-3 text-gray-400" />
        </button>

        <!-- Dropdown -->
        <div
          v-if="showUserMenu"
          class="absolute right-0 top-full mt-1 w-48 card shadow-lg z-50 py-1"
        >
          <p class="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-[var(--color-border)]">
            {{ userEmail }}
          </p>
          <RouterLink
            to="/settings"
            class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            @click="showUserMenu = false"
          >
            <Settings class="w-4 h-4" />
            Settings
          </RouterLink>
          <button
            @click="logout"
            class="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut class="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>

    <!-- Click outside overlay -->
    <div
      v-if="showUserMenu"
      class="fixed inset-0 z-40"
      @click="showUserMenu = false"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  Menu,
  Sun,
  Moon,
  Monitor,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useTransactionsStore } from '@/stores/transactions'
import { useAIStore } from '@/stores/ai'
import { useMonthStore } from '@/stores/month'
import { getFinancialTip } from '@/lib/ai'
import { formatPeriod } from '@/lib/currency'

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/files': 'Files',
  '/transactions': 'Transactions',
  '/budget': 'Budget',
  '/settings': 'Settings',
}

export default defineComponent({
  name: 'TopBar',
  components: { RouterLink, Menu, Sun, Moon, Monitor, ChevronLeft, ChevronRight, ChevronDown, Settings, LogOut, Sparkles },
  emits: ['toggle-sidebar'],

  setup() {
    const auth = useAuthStore()
    const themeStore = useThemeStore()
    const aiStore = useAIStore()
    const txStore = useTransactionsStore()
    const monthStore = useMonthStore()
    const router = useRouter()
    return { auth, themeStore, aiStore, txStore, monthStore, router }
  },

  data() {
    return {
      showUserMenu: false,
      financialTip: '',
    }
  },

  computed: {
    pageTitle(): string {
      return PAGE_TITLES[this.$route.path] ?? 'Budget'
    },
    userInitial(): string {
      return (this.auth.user?.displayName?.[0] ?? this.auth.user?.email?.[0] ?? 'U').toUpperCase()
    },
    userEmail(): string {
      return this.auth.user?.email ?? ''
    },
    themeMode() {
      return this.themeStore.mode
    },
  },

  mounted() {
    this.loadTip()
  },

  methods: {
    formatPeriod,

    cycleTheme() {
      const modes = ['light', 'dark', 'system'] as const
      const idx = modes.indexOf(this.themeStore.mode)
      this.themeStore.setMode(modes[(idx + 1) % modes.length])
    },

    async logout() {
      await this.auth.logout()
      this.router.push('/auth')
    },

    async loadTip() {
      if (!this.aiStore.hasApiKey) return

      try {
        this.financialTip = await getFinancialTip(
          {
            totalSpending: this.txStore.totalSpentThisMonth,
            topCategory: this.txStore.topCategoryThisMonth,
          },
          this.aiStore.settings,
        )
      } catch {
        // Silently fail - tips are nice to have
      }
    },
  },
})
</script>
