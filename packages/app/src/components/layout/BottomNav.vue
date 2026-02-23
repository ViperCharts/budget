<template>
  <nav class="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
    <div class="flex items-stretch justify-around">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.to"
        :class="[
          'flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-w-[64px] min-h-[56px] text-center transition-colors',
          isActive(item.to)
            ? 'text-brand-600 dark:text-brand-400'
            : 'text-gray-400 dark:text-gray-500',
        ]"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="text-[10px] font-heading font-medium leading-tight">{{ item.label }}</span>
      </RouterLink>
    </div>
    <!-- Safe area spacer for notched devices -->
    <div class="h-[env(safe-area-inset-bottom)]" />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  FolderOpen,
  ArrowLeftRight,
  Target,
  Settings,
} from 'lucide-vue-next'

export default defineComponent({
  name: 'BottomNav',
  components: { RouterLink },

  setup() {
    const route = useRoute()
    return { route }
  },

  data() {
    return {
      navItems: [
        { name: 'dashboard', label: 'Home', icon: LayoutDashboard, to: '/' },
        { name: 'files', label: 'Files', icon: FolderOpen, to: '/files' },
        { name: 'transactions', label: 'Txns', icon: ArrowLeftRight, to: '/transactions' },
        { name: 'budget', label: 'Budget', icon: Target, to: '/budget' },
        { name: 'settings', label: 'Settings', icon: Settings, to: '/settings' },
      ],
    }
  },

  methods: {
    isActive(to: string): boolean {
      if (to === '/') return this.route.path === '/'
      return this.route.path.startsWith(to)
    },
  },
})
</script>
