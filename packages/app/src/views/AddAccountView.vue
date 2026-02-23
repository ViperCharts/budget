<template>
  <div class="max-w-4xl space-y-8">
    <!-- Header -->
    <div>
      <button class="btn-ghost mb-4 -ml-2" @click="router.back()">
        <ArrowLeft class="w-4 h-4" /> Back
      </button>
      <h1 class="font-heading font-bold text-2xl text-gray-900 dark:text-white">Add an Account</h1>
      <p class="text-gray-500 dark:text-gray-400 font-body mt-1">
        Choose the type of account you'd like to track.
      </p>
    </div>

    <!-- Section: Everyday Banking -->
    <div>
      <h2 class="font-heading font-semibold text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Everyday Banking
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AccountTypeCard
          v-for="t in bankingTypes"
          :key="t.type"
          v-bind="t"
          @click="router.push({ name: 'account-setup', params: { type: t.type } })"
        />
      </div>
    </div>

    <!-- Section: Loans & Debt -->
    <div>
      <h2 class="font-heading font-semibold text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Loans &amp; Debt
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AccountTypeCard
          v-for="t in loanTypes"
          :key="t.type"
          v-bind="t"
          @click="router.push({ name: 'account-setup', params: { type: t.type } })"
        />
      </div>
    </div>

    <!-- Section: Investments & Retirement -->
    <div>
      <h2 class="font-heading font-semibold text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Investments &amp; Retirement
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AccountTypeCard
          v-for="t in investmentTypes"
          :key="t.type"
          v-bind="t"
          @click="router.push({ name: 'account-setup', params: { type: t.type } })"
        />
      </div>
    </div>

    <!-- Section: Crypto -->
    <div>
      <h2 class="font-heading font-semibold text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Crypto
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AccountTypeCard
          v-for="t in cryptoTypes"
          :key="t.type"
          v-bind="t"
          @click="router.push({ name: 'account-setup', params: { type: t.type } })"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'
import { useRouter } from 'vue-router'
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
import AccountTypeCard from '@/components/accounts/AccountTypeCard.vue'

export default defineComponent({
  name: 'AddAccountView',
  components: { ArrowLeft, AccountTypeCard },

  setup() {
    const router = useRouter()
    return { router }
  },

  data() {
    return {
      ArrowLeft,
      bankingTypes: [
        {
          type: 'checking',
          icon: markRaw(Landmark),
          iconBg: 'bg-brand-50 dark:bg-brand-900/20',
          iconColor: 'text-brand-600 dark:text-brand-400',
          label: 'Checking',
          tagline: 'Your everyday spending account',
        },
        {
          type: 'savings',
          icon: markRaw(PiggyBank),
          iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          label: 'Savings',
          tagline: 'Grow your money with interest',
        },
      ],
      loanTypes: [
        {
          type: 'auto_loan',
          icon: markRaw(Car),
          iconBg: 'bg-red-50 dark:bg-red-900/20',
          iconColor: 'text-red-500',
          label: 'Auto Loan',
          tagline: 'Vehicle financing and payments',
        },
        {
          type: 'mortgage',
          icon: markRaw(Home),
          iconBg: 'bg-amber-50 dark:bg-amber-900/20',
          iconColor: 'text-amber-600',
          label: 'Mortgage',
          tagline: 'Home loan balance and equity',
        },
        {
          type: 'personal_loan',
          icon: markRaw(HandCoins),
          iconBg: 'bg-red-50 dark:bg-red-900/20',
          iconColor: 'text-red-500',
          label: 'Personal Loan',
          tagline: 'Debt consolidation or personal financing',
        },
      ],
      investmentTypes: [
        {
          type: 'investment',
          icon: markRaw(BarChart3),
          iconBg: 'bg-blue-50 dark:bg-blue-900/20',
          iconColor: 'text-blue-500',
          label: 'Investment Account',
          tagline: 'Stocks, ETFs, and brokerage accounts',
        },
        {
          type: 'roth_ira',
          icon: markRaw(ShieldCheck),
          iconBg: 'bg-violet-50 dark:bg-violet-900/20',
          iconColor: 'text-violet-600 dark:text-violet-400',
          label: 'Roth IRA',
          tagline: 'Tax-free retirement growth',
        },
        {
          type: 'traditional_ira',
          icon: markRaw(ShieldCheck),
          iconBg: 'bg-violet-50 dark:bg-violet-900/20',
          iconColor: 'text-violet-600 dark:text-violet-400',
          label: 'Traditional IRA',
          tagline: 'Pre-tax retirement savings',
        },
        {
          type: 'roth_401k',
          icon: markRaw(Briefcase),
          iconBg: 'bg-indigo-50 dark:bg-indigo-900/20',
          iconColor: 'text-indigo-600 dark:text-indigo-400',
          label: 'Roth 401(k)',
          tagline: 'After-tax employer retirement plan',
        },
        {
          type: 'traditional_401k',
          icon: markRaw(Briefcase),
          iconBg: 'bg-indigo-50 dark:bg-indigo-900/20',
          iconColor: 'text-indigo-600 dark:text-indigo-400',
          label: 'Traditional 401(k)',
          tagline: 'Pre-tax employer retirement plan',
        },
      ],
      cryptoTypes: [
        {
          type: 'crypto',
          icon: markRaw(Bitcoin),
          iconBg: 'bg-orange-50 dark:bg-orange-900/20',
          iconColor: 'text-orange-500',
          label: 'Crypto Wallet',
          tagline: 'Bitcoin, Ethereum, Solana, and more',
        },
      ],
    }
  },
})
</script>
