<template>
  <div class="space-y-6 max-w-7xl">
    <!-- Welcome banner -->
    <div class="card bg-gradient-to-br from-brand-600 to-brand-700 text-white border-0">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-heading font-bold text-xl mb-1">
            {{ greeting }}, {{ firstName }}! 👋
          </h2>
          <p class="text-brand-100 font-body text-sm">
            Here's your financial picture for {{ currentMonthLabel }}.
          </p>
        </div>
        <div class="text-5xl opacity-20 select-none">💰</div>
      </div>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Net Worth"
        :value="formatCurrency(accountsStore.netWorth)"
        :icon="TrendingUp"
        icon-bg="bg-emerald-50 dark:bg-emerald-900/20"
        icon-color="text-emerald-600"
        :value-color="accountsStore.netWorth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'"
        sub="Assets minus liabilities"
      />
      <StatCard
        label="Total Assets"
        :value="formatCurrency(accountsStore.totalAssets)"
        :icon="Wallet"
        sub="Checking + savings"
      />
      <StatCard
        label="Total Debt"
        :value="formatCurrency(accountsStore.totalLiabilities)"
        :icon="CreditCard"
        icon-bg="bg-red-50 dark:bg-red-900/20"
        icon-color="text-red-500"
        value-color="text-red-600 dark:text-red-400"
        sub="Credit cards + loans"
      />
      <StatCard
        label="Spent"
        :value="formatCurrency(txStore.totalSpentThisMonth)"
        :icon="ArrowUpRight"
        icon-bg="bg-amber-50 dark:bg-amber-900/20"
        icon-color="text-amber-600"
        :sub="txStore.topCategoryThisMonth ? `Top: ${txStore.topCategoryThisMonth}` : 'No transactions yet'"
      />
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SpendingLineChart :points="txStore.monthlySpending" />
      <SpendingPieChart
        :by-category="currentMonthSpending"
        :active-period="monthStore.activePeriod"
      />
    </div>

    <!-- Accounts -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-heading font-semibold text-gray-900 dark:text-white">Accounts</h2>
        <div class="flex items-center gap-3">
          <RouterLink to="/accounts/add" class="btn-secondary text-xs px-3 py-1.5">
            <Plus class="w-3.5 h-3.5" /> Add Account
          </RouterLink>
          <RouterLink to="/files" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-heading">
            Import statement →
          </RouterLink>
        </div>
      </div>

      <EmptyState
        v-if="!accountsStore.accounts.length"
        :icon="Wallet"
        title="No accounts yet"
        description="Add an account manually or upload a bank statement to automatically import your accounts and transactions."
      >
        <template #action>
          <RouterLink to="/accounts/add" class="btn-primary">
            <Plus class="w-4 h-4" /> Add Account
          </RouterLink>
          <RouterLink to="/files" class="btn-secondary">
            <Upload class="w-4 h-4" /> Import Statement
          </RouterLink>
        </template>
      </EmptyState>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AccountCard
          v-for="account in accountsStore.accounts"
          :key="account.id"
          :account="account"
        />
      </div>
    </div>

    <!-- Recent Transactions -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-heading font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
        <RouterLink to="/transactions" class="text-sm text-brand-600 dark:text-brand-400 hover:underline font-heading">
          View all →
        </RouterLink>
      </div>

      <div class="card divide-y divide-[var(--color-border)]">
        <EmptyState
          v-if="!recentTransactions.length"
          :icon="ArrowLeftRight"
          title="No transactions yet"
          description="Import a statement to see your transactions here."
        />
        <TransactionRow
          v-for="tx in recentTransactions"
          :key="tx.id"
          :transaction="tx"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import {
  TrendingUp,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowLeftRight,
  Upload,
  Plus,
} from 'lucide-vue-next'
import StatCard from '@/components/ui/StatCard.vue'
import AccountCard from '@/components/accounts/AccountCard.vue'
import SpendingLineChart from '@/components/charts/SpendingLineChart.vue'
import SpendingPieChart from '@/components/charts/SpendingPieChart.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import TransactionRow from '@/components/transactions/TransactionRow.vue'
import { useAccountsStore } from '@/stores/accounts'
import { useTransactionsStore } from '@/stores/transactions'
import { useMonthStore } from '@/stores/month'
import { formatCurrency, formatPeriod } from '@/lib/currency'
import type { Transaction } from '@/types'

export default defineComponent({
  name: 'DashboardView',
  components: {
    RouterLink,
    StatCard,
    AccountCard,
    SpendingLineChart,
    SpendingPieChart,
    EmptyState,
    TransactionRow,
  },

  setup() {
    const accountsStore = useAccountsStore()
    const txStore = useTransactionsStore()
    const monthStore = useMonthStore()
    return { accountsStore, txStore, monthStore }
  },

  data() {
    return {
      TrendingUp,
      Wallet,
      CreditCard,
      ArrowUpRight,
      ArrowLeftRight,
      Upload,
      Plus,
    }
  },

  computed: {
    greeting(): string {
      const h = new Date().getHours()
      if (h < 12) return 'Good morning'
      if (h < 17) return 'Good afternoon'
      return 'Good evening'
    },
    firstName(): string {
      return 'there'
    },
    currentMonthLabel(): string {
      return formatPeriod(this.monthStore.activePeriod)
    },
    currentMonthSpending(): Record<string, number> {
      const data = this.txStore.monthlySpending.find(
        (m) => m.period === this.monthStore.activePeriod,
      )
      return data?.byCategory ?? {}
    },
    recentTransactions(): Transaction[] {
      return this.txStore.sorted.slice(0, 8)
    },
  },

  methods: { formatCurrency },
})
</script>
