<template>
  <div v-if="config" class="max-w-2xl">
    <!-- Back -->
    <button class="btn-ghost mb-6 -ml-2" @click="router.back()">
      <ArrowLeft class="w-4 h-4" /> Back
    </button>

    <!-- Hero card -->
    <div :class="['rounded-2xl p-8 mb-8 border', heroBg]">
      <div class="flex flex-col items-center text-center gap-4">
        <div :class="['w-20 h-20 rounded-2xl flex items-center justify-center', config.iconBg]">
          <component :is="config.icon" :class="['w-10 h-10', config.iconColor]" />
        </div>
        <div>
          <h1 class="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">
            {{ config.label }}
          </h1>
          <p class="font-body text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-sm">
            {{ config.description }}
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="tag in config.tags"
            :key="tag"
            class="badge bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="card space-y-5">
      <h2 class="font-heading font-semibold text-gray-900 dark:text-white">Account Details</h2>

      <!-- Account Name -->
      <div>
        <label class="label">Account Name</label>
        <input
          v-model="form.name"
          class="input"
          :placeholder="config.namePlaceholder"
          autocomplete="off"
        />
      </div>

      <!-- Current Balance -->
      <div>
        <label class="label">
          {{ isLiabilityType ? 'Current Balance Owed' : 'Current Balance' }}
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-body text-sm">$</span>
          <input
            v-model="form.balance"
            class="input pl-7"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
        <p v-if="isLiabilityType" class="text-xs text-gray-400 font-body mt-1">
          Enter the amount you currently owe (e.g. 15000).
        </p>
      </div>

      <!-- APY — Savings -->
      <div v-if="config.showApy">
        <label class="label">APY (Annual Percentage Yield) <span class="text-gray-400 font-normal">— optional</span></label>
        <div class="relative">
          <input
            v-model="form.apy"
            class="input pr-10"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 4.75"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-body text-sm">%</span>
        </div>
      </div>

      <!-- APR — Loans / Mortgage -->
      <div v-if="config.showApr">
        <label class="label">APR (Annual Percentage Rate) <span class="text-gray-400 font-normal">— optional</span></label>
        <div class="relative">
          <input
            v-model="form.apr"
            class="input pr-10"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 6.50"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-body text-sm">%</span>
        </div>
      </div>

      <!-- Crypto symbol -->
      <div v-if="config.showCrypto">
        <label class="label">Cryptocurrency <span class="text-gray-400 font-normal">— optional</span></label>
        <div class="flex flex-wrap gap-2 mb-2">
          <button
            v-for="coin in cryptoOptions"
            :key="coin"
            :class="[
              'btn text-xs px-3 py-1.5',
              form.cryptoSymbol === coin
                ? 'btn-primary'
                : 'btn-secondary',
            ]"
            @click="form.cryptoSymbol = form.cryptoSymbol === coin ? '' : coin"
          >
            {{ coin }}
          </button>
        </div>
        <input
          v-model="form.cryptoSymbol"
          class="input"
          placeholder="Or enter a ticker, e.g. DOGE"
          autocomplete="off"
        />
      </div>

      <!-- Error -->
      <p v-if="error" class="text-sm text-red-600 dark:text-red-400 font-body">{{ error }}</p>

      <!-- Submit -->
      <button
        class="btn-primary w-full justify-center py-3 text-base"
        :disabled="saving || !form.name.trim()"
        @click="submit"
      >
        <component :is="config.icon" class="w-5 h-5" />
        {{ saving ? 'Adding Account…' : `Add ${config.label}` }}
      </button>
    </div>
  </div>

  <!-- Unknown type fallback -->
  <div v-else class="max-w-md text-center py-20">
    <p class="font-heading text-gray-500 dark:text-gray-400">Unknown account type.</p>
    <RouterLink to="/accounts/add" class="btn-primary mt-4">
      Choose Account Type
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import {
  ArrowLeft,
  Landmark,
  PiggyBank,
  Car,
  Home,
  HandCoins,
  BarChart3,
  ShieldCheck,
  Briefcase,
  Bitcoin,
} from 'lucide-vue-next'
import { useAccountsStore } from '@/stores/accounts'
import type { AccountType } from '@/types'

interface TypeConfig {
  label: string
  description: string
  tags: string[]
  namePlaceholder: string
  icon: object
  iconBg: string
  iconColor: string
  heroBg?: string
  showApy?: boolean
  showApr?: boolean
  showCrypto?: boolean
}

const TYPE_CONFIGS: Record<string, TypeConfig> = {
  checking: {
    label: 'Checking Account',
    description:
      'Your primary hub for daily spending. Link your paycheck via direct deposit, pay bills, and use your debit card with confidence knowing your money is FDIC-insured.',
    tags: ['FDIC Insured', 'Direct Deposit', 'Debit Card', 'Bill Pay'],
    namePlaceholder: 'e.g. Chase Checking',
    icon: markRaw(Landmark),
    iconBg: 'bg-brand-50 dark:bg-brand-900/30',
    iconColor: 'text-brand-600 dark:text-brand-400',
  },
  savings: {
    label: 'Savings Account',
    description:
      'Build your emergency fund or save for a goal. High-yield savings accounts offer competitive APY so your money grows while it waits — FDIC insured up to $250,000.',
    tags: ['FDIC Insured', 'Earns Interest', 'Emergency Fund', 'Goals'],
    namePlaceholder: 'e.g. Marcus High-Yield Savings',
    icon: markRaw(PiggyBank),
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    showApy: true,
  },
  auto_loan: {
    label: 'Auto Loan',
    description:
      'Track your vehicle financing. See your remaining balance shrink with each payment and understand how your interest rate affects your total cost of ownership.',
    tags: ['Vehicle Financing', 'Fixed Payments', 'Depreciating Asset'],
    namePlaceholder: 'e.g. Toyota Financial Auto Loan',
    icon: markRaw(Car),
    iconBg: 'bg-red-50 dark:bg-red-900/30',
    iconColor: 'text-red-500',
    showApr: true,
  },
  mortgage: {
    label: 'Mortgage',
    description:
      'Your path to homeownership. Track your outstanding loan balance as you build equity with every payment. Most of your early payments go toward interest — stay informed.',
    tags: ['Home Loan', 'Builds Equity', 'Tax Deductible Interest'],
    namePlaceholder: 'e.g. Wells Fargo Mortgage',
    icon: markRaw(Home),
    iconBg: 'bg-amber-50 dark:bg-amber-900/30',
    iconColor: 'text-amber-600',
    showApr: true,
  },
  personal_loan: {
    label: 'Personal Loan',
    description:
      'A flexible financing tool for debt consolidation, home improvements, medical expenses, or major purchases. Fixed rates and fixed terms make budgeting straightforward.',
    tags: ['Debt Consolidation', 'Fixed Rate', 'Fixed Term'],
    namePlaceholder: 'e.g. SoFi Personal Loan',
    icon: markRaw(HandCoins),
    iconBg: 'bg-red-50 dark:bg-red-900/30',
    iconColor: 'text-red-500',
    showApr: true,
  },
  investment: {
    label: 'Investment Account',
    description:
      'A taxable brokerage account for investing in stocks, ETFs, bonds, and mutual funds. Grow your wealth over time and access your money whenever you need it.',
    tags: ['Stocks & ETFs', 'Taxable Account', 'No Contribution Limit'],
    namePlaceholder: 'e.g. Fidelity Brokerage',
    icon: markRaw(BarChart3),
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-blue-500',
  },
  roth_ira: {
    label: 'Roth IRA',
    description:
      "Contribute after-tax dollars today and enjoy completely tax-free growth and withdrawals in retirement. Ideal if you expect to be in a higher tax bracket later. 2024 contribution limit: $7,000 ($8,000 if 50+).",
    tags: ['Tax-Free Growth', 'After-Tax Contributions', 'No RMDs', '$7,000 Limit'],
    namePlaceholder: 'e.g. Vanguard Roth IRA',
    icon: markRaw(ShieldCheck),
    iconBg: 'bg-violet-50 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  traditional_ira: {
    label: 'Traditional IRA',
    description:
      'Contribute pre-tax dollars to reduce your taxable income today. Your investments grow tax-deferred and you pay ordinary income tax on withdrawals in retirement.',
    tags: ['Tax-Deferred Growth', 'Pre-Tax Contributions', 'RMDs at 73', '$7,000 Limit'],
    namePlaceholder: 'e.g. Schwab Traditional IRA',
    icon: markRaw(ShieldCheck),
    iconBg: 'bg-violet-50 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  roth_401k: {
    label: 'Roth 401(k)',
    description:
      'An employer-sponsored retirement plan funded with after-tax dollars. Your money grows tax-free and qualified withdrawals in retirement are completely tax-free — even employer matches.',
    tags: ['Employer-Sponsored', 'After-Tax', 'Tax-Free Withdrawals', '$23,000 Limit'],
    namePlaceholder: 'e.g. Fidelity Roth 401(k)',
    icon: markRaw(Briefcase),
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/30',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  traditional_401k: {
    label: 'Traditional 401(k)',
    description:
      'The classic employer-sponsored retirement savings plan. Pre-tax contributions reduce your taxable income now, your investments grow tax-deferred, and you pay taxes only when you withdraw.',
    tags: ['Employer-Sponsored', 'Pre-Tax', 'Employer Match', '$23,000 Limit'],
    namePlaceholder: 'e.g. Vanguard 401(k)',
    icon: markRaw(Briefcase),
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/30',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  crypto: {
    label: 'Crypto Wallet',
    description:
      'Track your cryptocurrency holdings in one place. Whether you hold Bitcoin, Ethereum, Solana, or any other digital asset, keep tabs on your portfolio value alongside your traditional accounts.',
    tags: ['Bitcoin', 'Ethereum', 'Solana', 'DeFi', 'Self-Custody'],
    namePlaceholder: 'e.g. Coinbase Wallet',
    icon: markRaw(Bitcoin),
    iconBg: 'bg-orange-50 dark:bg-orange-900/30',
    iconColor: 'text-orange-500',
    showCrypto: true,
  },
}

const HERO_BG: Record<string, string> = {
  checking: 'bg-brand-50 dark:bg-brand-950/40 border-brand-100 dark:border-brand-900',
  savings: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900',
  auto_loan: 'bg-red-50 dark:bg-red-950/40 border-red-100 dark:border-red-900',
  mortgage: 'bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900',
  personal_loan: 'bg-red-50 dark:bg-red-950/40 border-red-100 dark:border-red-900',
  investment: 'bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900',
  roth_ira: 'bg-violet-50 dark:bg-violet-950/40 border-violet-100 dark:border-violet-900',
  traditional_ira: 'bg-violet-50 dark:bg-violet-950/40 border-violet-100 dark:border-violet-900',
  roth_401k: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900',
  traditional_401k: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900',
  crypto: 'bg-orange-50 dark:bg-orange-950/40 border-orange-100 dark:border-orange-900',
}

const LIABILITY_TYPES = ['credit_card', 'loan', 'auto_loan', 'mortgage', 'personal_loan']

export default defineComponent({
  name: 'AccountSetupView',
  components: { ArrowLeft, RouterLink },

  setup() {
    const router = useRouter()
    const route = useRoute()
    const accountsStore = useAccountsStore()
    return { router, route, accountsStore }
  },

  data() {
    return {
      ArrowLeft,
      saving: false,
      error: '',
      form: {
        name: '',
        balance: '' as string | number,
        apy: '' as string | number,
        apr: '' as string | number,
        cryptoSymbol: '',
      },
      cryptoOptions: ['BTC', 'ETH', 'SOL', 'USDC', 'BNB', 'XRP'],
    }
  },

  computed: {
    accountType(): string {
      return this.route.params.type as string
    },
    config(): TypeConfig | null {
      return TYPE_CONFIGS[this.accountType] ?? null
    },
    heroBg(): string {
      return HERO_BG[this.accountType] ?? 'bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800'
    },
    isLiabilityType(): boolean {
      return LIABILITY_TYPES.includes(this.accountType)
    },
  },

  methods: {
    async submit() {
      if (!this.form.name.trim()) {
        this.error = 'Please enter an account name.'
        return
      }

      this.error = ''
      this.saving = true

      try {
        const rawBalance = parseFloat(String(this.form.balance)) || 0
        // Liabilities are stored as negative balances
        const balance = this.isLiabilityType ? -Math.abs(rawBalance) : rawBalance

        const payload: Record<string, unknown> = {
          name: this.form.name.trim(),
          type: this.accountType as AccountType,
          balance,
        }

        if (this.config?.showApy && this.form.apy !== '') {
          payload.apy = parseFloat(String(this.form.apy))
        }
        if (this.config?.showApr && this.form.apr !== '') {
          payload.apr = parseFloat(String(this.form.apr))
        }
        if (this.config?.showCrypto && this.form.cryptoSymbol.trim()) {
          payload.cryptoSymbol = this.form.cryptoSymbol.trim().toUpperCase()
        }

        await this.accountsStore.upsertAccount(payload as Parameters<typeof this.accountsStore.upsertAccount>[0])

        this.router.push('/')
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      } finally {
        this.saving = false
      }
    },
  },
})
</script>
