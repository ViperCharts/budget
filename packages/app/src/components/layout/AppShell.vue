<template>
  <div class="flex h-screen overflow-hidden bg-[var(--color-bg)]">
    <!-- Sidebar -->
    <SideNav :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />

    <!-- Main content -->
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <TopBar @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />
      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import SideNav from './SideNav.vue'
import TopBar from './TopBar.vue'
import { useFilesStore } from '@/stores/files'
import { useTransactionsStore } from '@/stores/transactions'
import { useAccountsStore } from '@/stores/accounts'
import { useCategoriesStore } from '@/stores/categories'

export default defineComponent({
  name: 'AppShell',
  components: { RouterView, SideNav, TopBar },

  setup() {
    const categoriesStore = useCategoriesStore()
    return { categoriesStore }
  },

  data() {
    return {
      sidebarCollapsed: false,
    }
  },

  mounted() {
    const filesStore = useFilesStore()
    const txStore = useTransactionsStore()
    const accountsStore = useAccountsStore()

    filesStore.subscribe()
    txStore.subscribe()
    accountsStore.subscribe()
    this.categoriesStore.subscribe()
  },

  unmounted() {
    useFilesStore().unsubscribe()
    useTransactionsStore().unsubscribe()
    useAccountsStore().unsubscribe()
    this.categoriesStore.unsubscribe()
  },
})
</script>
