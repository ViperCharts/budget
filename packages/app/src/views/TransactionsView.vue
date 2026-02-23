<template>
  <div class="space-y-5 max-w-5xl">
    <!-- Header + filters -->
    <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div>
        <h2 class="font-heading font-bold text-xl text-gray-900 dark:text-white">Transactions</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-body mt-0.5">
          {{ filtered.length }} of {{ txStore.transactions.length }} transactions
        </p>
      </div>

      <div class="flex flex-wrap gap-2 items-center">
        <!-- View toggle -->
        <div class="flex rounded-lg border border-[var(--color-border)] overflow-hidden shrink-0">
          <button
            :class="[
              'px-3 py-2 transition-colors',
              viewMode === 'list'
                ? 'bg-brand-600 text-white'
                : 'bg-[var(--color-surface)] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
            ]"
            title="List view"
            @click="viewMode = 'list'"
          >
            <List class="w-4 h-4" />
          </button>
          <button
            :class="[
              'px-3 py-2 transition-colors border-l border-[var(--color-border)]',
              viewMode === 'calendar'
                ? 'bg-brand-600 text-white'
                : 'bg-[var(--color-surface)] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
            ]"
            title="Calendar view"
            @click="viewMode = 'calendar'"
          >
            <CalendarDays class="w-4 h-4" />
          </button>
        </div>

        <!-- Search -->
        <div class="relative">
          <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="search"
            type="text"
            placeholder="Search..."
            class="input pl-9 w-48"
          />
        </div>

        <!-- Category filter -->
        <select v-model="categoryFilter" class="input w-44">
          <option value="">All categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <!-- Type filter -->
        <select v-model="typeFilter" class="input w-36">
          <option value="">All types</option>
          <option value="debit">Expenses</option>
          <option value="credit">Income</option>
        </select>

        <!-- Period filter -->
        <select v-model="periodFilter" class="input w-40">
          <option value="">All periods</option>
          <option v-for="p in availablePeriods" :key="p" :value="p">{{ formatPeriod(p) }}</option>
        </select>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="txStore.loading" class="flex justify-center py-12">
      <LoadingSpinner message="Loading transactions..." :show-tip="true" />
    </div>

    <!-- No transactions at all -->
    <EmptyState
      v-else-if="!txStore.transactions.length"
      :icon="ArrowLeftRight"
      title="No transactions yet"
      description="Upload a bank statement to import your transactions automatically."
    >
      <template #action>
        <RouterLink to="/files" class="btn-primary">
          <Upload class="w-4 h-4" /> Upload Statement
        </RouterLink>
      </template>
    </EmptyState>

    <!-- Data loaded — show totals + views -->
    <template v-else>
      <!-- Totals bar -->
      <div class="flex items-center gap-6 p-4 card">
        <div>
          <p class="text-xs text-gray-500 font-body uppercase tracking-wider">Income</p>
          <p class="font-heading font-bold text-emerald-600 dark:text-emerald-400">
            +{{ formatCurrency(totalIncome) }}
          </p>
        </div>
        <div class="h-8 w-px bg-[var(--color-border)]" />
        <div>
          <p class="text-xs text-gray-500 font-body uppercase tracking-wider">Expenses</p>
          <p class="font-heading font-bold text-red-500">
            -{{ formatCurrency(totalExpenses) }}
          </p>
        </div>
        <div class="h-8 w-px bg-[var(--color-border)]" />
        <div>
          <p class="text-xs text-gray-500 font-body uppercase tracking-wider">Net</p>
          <p :class="['font-heading font-bold', net >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-500']">
            {{ net >= 0 ? '+' : '' }}{{ formatCurrency(net) }}
          </p>
        </div>
      </div>

      <!-- List view -->
      <template v-if="viewMode === 'list'">
        <EmptyState
          v-if="!filtered.length"
          :icon="Search"
          title="No matches"
          description="Try adjusting your search or filters."
        />

        <div
          v-else
          class="card p-0 overflow-hidden divide-y divide-[var(--color-border)]"
        >
          <TransactionRow
            v-for="tx in paginated"
            :key="tx.id"
            :transaction="tx"
          />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-2">
          <button
            class="btn-secondary px-3 py-1.5"
            :disabled="page === 1"
            @click="page--"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <span class="text-sm text-gray-500 font-body">
            Page {{ page }} of {{ totalPages }}
          </span>
          <button
            class="btn-secondary px-3 py-1.5"
            :disabled="page === totalPages"
            @click="page++"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </template>

      <!-- Calendar view -->
      <div v-if="viewMode === 'calendar'" class="card">
        <TransactionCalendar
          :transactions="filtered"
          @transaction-click="openDetail"
        />
      </div>
    </template>

    <!-- Transaction detail modal -->
    <TransactionDetailModal
      v-model="showDetailModal"
      :transaction="selectedTransaction"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import {
  Search,
  ArrowLeftRight,
  Upload,
  ChevronLeft,
  ChevronRight,
  List,
  CalendarDays,
} from 'lucide-vue-next'
import TransactionRow from '@/components/transactions/TransactionRow.vue'
import TransactionCalendar from '@/components/transactions/TransactionCalendar.vue'
import TransactionDetailModal from '@/components/transactions/TransactionDetailModal.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { formatCurrency, formatPeriod, dateToPeriod } from '@/lib/currency'
import type { Transaction } from '@/types'

const PAGE_SIZE = 50

export default defineComponent({
  name: 'TransactionsView',
  components: {
    RouterLink,
    TransactionRow,
    TransactionCalendar,
    TransactionDetailModal,
    LoadingSpinner,
    EmptyState,
    Search,
    ArrowLeftRight,
    Upload,
    ChevronLeft,
    ChevronRight,
    List,
    CalendarDays,
  },

  setup() {
    const txStore = useTransactionsStore()
    return { txStore }
  },

  data() {
    return {
      Search,
      ArrowLeftRight,
      viewMode: 'list' as 'list' | 'calendar',
      search: '',
      categoryFilter: '',
      typeFilter: '',
      periodFilter: '',
      page: 1,
      showDetailModal: false,
      selectedTransaction: null as Transaction | null,
    }
  },

  computed: {
    categories(): string[] {
      return this.txStore.categories
    },
    availablePeriods(): string[] {
      return Object.keys(this.txStore.byPeriod).sort().reverse()
    },
    filtered(): Transaction[] {
      const s = this.search.toLowerCase()
      return this.txStore.sorted.filter((t) => {
        if (
          s &&
          !t.description.toLowerCase().includes(s) &&
          !t.category.toLowerCase().includes(s)
        )
          return false
        if (this.categoryFilter && t.category !== this.categoryFilter) return false
        if (this.typeFilter && t.type !== this.typeFilter) return false
        if (this.periodFilter && dateToPeriod(t.date) !== this.periodFilter) return false
        return true
      })
    },
    paginated(): Transaction[] {
      const start = (this.page - 1) * PAGE_SIZE
      return this.filtered.slice(start, start + PAGE_SIZE)
    },
    totalPages(): number {
      return Math.max(1, Math.ceil(this.filtered.length / PAGE_SIZE))
    },
    totalIncome(): number {
      return this.filtered
        .filter((t) => t.type === 'credit')
        .reduce((s, t) => s + t.amount, 0)
    },
    totalExpenses(): number {
      return this.filtered
        .filter((t) => t.type === 'debit')
        .reduce((s, t) => s + t.amount, 0)
    },
    net(): number {
      return this.totalIncome - this.totalExpenses
    },
  },

  watch: {
    search() {
      this.page = 1
    },
    categoryFilter() {
      this.page = 1
    },
    typeFilter() {
      this.page = 1
    },
    periodFilter() {
      this.page = 1
    },
  },

  methods: {
    formatCurrency,
    formatPeriod,
    openDetail(tx: Transaction) {
      this.selectedTransaction = tx
      this.showDetailModal = true
    },
  },
})
</script>
