<template>
  <aside
    :class="[
      'flex flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-200 shrink-0',
      collapsed ? 'w-16' : 'w-56',
    ]"
  >
    <!-- Logo -->
    <div
      :class="['flex items-center h-16 px-4 border-b border-[var(--color-border)]', collapsed ? 'justify-center' : 'gap-3']"
    >
      <div class="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
        <TrendingUp class="w-4 h-4 text-white" />
      </div>
      <span v-if="!collapsed" class="font-heading font-bold text-gray-900 dark:text-white text-lg">
        Budget
      </span>
    </div>

    <!-- Nav links -->
    <nav class="flex-1 py-4 px-2 space-y-1">
      <NavItem
        v-for="item in navItems"
        :key="item.name"
        :item="item"
        :collapsed="collapsed"
      />
    </nav>

    <!-- Bottom: collapse toggle -->
    <div class="p-2 border-t border-[var(--color-border)]">
      <button
        @click="$emit('toggle')"
        class="w-full flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
        :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <ChevronLeft v-if="!collapsed" class="w-4 h-4" />
        <ChevronRight v-else class="w-4 h-4" />
      </button>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import {
  LayoutDashboard,
  FolderOpen,
  ArrowLeftRight,
  Target,
  Settings,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'
import NavItem from './NavItem.vue'

export interface NavItemDef {
  name: string
  label: string
  icon: unknown
  to: string
}

export default defineComponent({
  name: 'SideNav',
  components: { NavItem, TrendingUp, ChevronLeft, ChevronRight },
  emits: ['toggle'],

  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  data() {
    return {
      navItems: [
        { name: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/' },
        { name: 'files', label: 'Files', icon: FolderOpen, to: '/files' },
        { name: 'transactions', label: 'Transactions', icon: ArrowLeftRight, to: '/transactions' },
        { name: 'budget', label: 'Budget', icon: Target, to: '/budget' },
        { name: 'settings', label: 'Settings', icon: Settings, to: '/settings' },
      ] as NavItemDef[],
    }
  },
})
</script>
