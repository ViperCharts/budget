<template>
  <div class="card hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', accountBg]">
          <component :is="accountIcon" :class="['w-5 h-5', accountIconColor]" />
        </div>
        <div>
          <p class="font-heading font-semibold text-gray-900 dark:text-white text-sm">
            {{ formattedName }}
          </p>
          <p v-if="account.cryptoSymbol" class="text-xs text-gray-400 font-body">
            {{ account.cryptoSymbol }}
          </p>
        </div>
      </div>

      <span v-if="rateLabel" :class="['badge font-heading', rateBadgeClass]">
        {{ rateLabel }}
      </span>
    </div>

    <!-- Balance -->
    <p :class="['font-heading font-bold text-2xl', balanceColor]">
      {{ formattedBalance }}
    </p>

    <!-- Credit card details -->
    <div v-if="account.type === 'credit_card' && account.creditLimit" class="mt-3">
      <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1 font-body">
        <span>Used</span>
        <span>{{ formattedUsed }} / {{ formattedLimit }}</span>
      </div>
      <div class="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          :class="['h-full rounded-full transition-all', utilizationColor]"
          :style="{ width: `${utilization}%` }"
        />
      </div>
      <p class="text-xs text-gray-400 mt-1 font-body">{{ utilization.toFixed(0) }}% utilization</p>
    </div>

    <p class="text-xs text-gray-400 mt-3 font-body">
      Last transaction {{ lastUpdated }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import {
  Landmark,
  CreditCard,
  PiggyBank,
  TrendingDown,
  Home,
  BarChart3,
  Car,
  HandCoins,
  ShieldCheck,
  Briefcase,
  Bitcoin,
} from 'lucide-vue-next'
import type { Account } from '@/types'
import { formatCurrency, formatDate } from '@/lib/currency'
import { formatAccountName } from '@/lib/account'
import { useTransactionsStore } from '@/stores/transactions'

export default defineComponent({
  name: 'AccountCard',
  props: {
    account: {
      type: Object as PropType<Account>,
      required: true,
    },
  },

  setup() {
    const transactionsStore = useTransactionsStore()
    return { transactionsStore }
  },

  computed: {
    accountIcon() {
      const icons: Record<string, unknown> = {
        checking: Landmark,
        savings: PiggyBank,
        credit_card: CreditCard,
        auto_loan: Car,
        mortgage: Home,
        personal_loan: HandCoins,
        investment: BarChart3,
        roth_ira: ShieldCheck,
        traditional_ira: ShieldCheck,
        roth_401k: Briefcase,
        traditional_401k: Briefcase,
        crypto: Bitcoin,
        loan: TrendingDown,
        other: Landmark,
      }
      return icons[this.account.type] ?? Landmark
    },
    accountBg(): string {
      const bgs: Record<string, string> = {
        checking: 'bg-brand-50 dark:bg-brand-900/20',
        savings: 'bg-emerald-50 dark:bg-emerald-900/20',
        credit_card: 'bg-purple-50 dark:bg-purple-900/20',
        auto_loan: 'bg-red-50 dark:bg-red-900/20',
        mortgage: 'bg-amber-50 dark:bg-amber-900/20',
        personal_loan: 'bg-red-50 dark:bg-red-900/20',
        investment: 'bg-blue-50 dark:bg-blue-900/20',
        roth_ira: 'bg-violet-50 dark:bg-violet-900/20',
        traditional_ira: 'bg-violet-50 dark:bg-violet-900/20',
        roth_401k: 'bg-indigo-50 dark:bg-indigo-900/20',
        traditional_401k: 'bg-indigo-50 dark:bg-indigo-900/20',
        crypto: 'bg-orange-50 dark:bg-orange-900/20',
        loan: 'bg-red-50 dark:bg-red-900/20',
        other: 'bg-gray-50 dark:bg-gray-800',
      }
      return bgs[this.account.type] ?? bgs.other
    },
    accountIconColor(): string {
      const colors: Record<string, string> = {
        checking: 'text-brand-600 dark:text-brand-400',
        savings: 'text-emerald-600 dark:text-emerald-400',
        credit_card: 'text-purple-600 dark:text-purple-400',
        auto_loan: 'text-red-500',
        mortgage: 'text-amber-600',
        personal_loan: 'text-red-500',
        investment: 'text-blue-500',
        roth_ira: 'text-violet-600 dark:text-violet-400',
        traditional_ira: 'text-violet-600 dark:text-violet-400',
        roth_401k: 'text-indigo-600 dark:text-indigo-400',
        traditional_401k: 'text-indigo-600 dark:text-indigo-400',
        crypto: 'text-orange-500',
        loan: 'text-red-500',
        other: 'text-gray-500',
      }
      return colors[this.account.type] ?? colors.other
    },
    rateLabel(): string | null {
      if (this.account.apy != null) return `${this.account.apy}% APY`
      if (this.account.apr != null) return `${this.account.apr}% APR`
      if (this.account.interestRate != null) return `${this.account.interestRate}% APR`
      return null
    },
    rateBadgeClass(): string {
      if (this.account.apy != null) return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
      return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
    },
    formattedName(): string {
      return formatAccountName(this.account)
    },
    formattedBalance(): string {
      return formatCurrency(this.account.balance, this.account.currency)
    },
    balanceColor(): string {
      if (['credit_card', 'loan', 'auto_loan', 'mortgage', 'personal_loan'].includes(this.account.type)) {
        return 'text-red-600 dark:text-red-400'
      }
      return 'text-gray-900 dark:text-white'
    },
    formattedUsed(): string {
      return formatCurrency(Math.abs(this.account.balance))
    },
    formattedLimit(): string {
      return formatCurrency(this.account.creditLimit ?? 0)
    },
    utilization(): number {
      if (!this.account.creditLimit) return 0
      return (Math.abs(this.account.balance) / this.account.creditLimit) * 100
    },
    utilizationColor(): string {
      if (this.utilization > 90) return 'bg-red-500'
      if (this.utilization > 70) return 'bg-amber-500'
      return 'bg-brand-500'
    },
    lastUpdated(): string {
      const lastTx = this.transactionsStore.lastTransactionDateByAccount[this.account.id]
      return formatDate(lastTx ?? this.account.lastUpdated)
    },
  },
})
</script>
