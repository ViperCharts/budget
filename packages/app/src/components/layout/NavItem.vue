<template>
  <RouterLink
    :to="item.to"
    :class="[
      'flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-heading font-medium transition-colors',
      isActive
        ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800',
      collapsed ? 'justify-center' : '',
    ]"
    :title="collapsed ? item.label : undefined"
  >
    <component :is="item.icon" class="w-5 h-5 shrink-0" />
    <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { NavItemDef } from './SideNav.vue'

export default defineComponent({
  name: 'NavItem',
  components: { RouterLink },

  props: {
    item: {
      type: Object as PropType<NavItemDef>,
      required: true,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const route = useRoute()
    const isActive = computed(() => {
      if (props.item.to === '/') return route.path === '/'
      return route.path.startsWith(props.item.to)
    })
    return { isActive }
  },
})
</script>
