import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout/AppShell.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'files',
          name: 'files',
          component: () => import('@/views/FilesView.vue'),
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: () => import('@/views/TransactionsView.vue'),
        },
        {
          path: 'budget',
          name: 'budget',
          component: () => import('@/views/BudgetView.vue'),
        },
        {
          path: 'banks',
          name: 'banks',
          component: () => import('@/views/BanksView.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/SettingsView.vue'),
        },
        {
          path: 'accounts/add',
          name: 'add-account',
          component: () => import('@/views/AddAccountView.vue'),
        },
        {
          path: 'accounts/add/:type',
          name: 'account-setup',
          component: () => import('@/views/AccountSetupView.vue'),
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
      meta: { guest: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'auth' }
  }
  if (to.meta.guest && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
