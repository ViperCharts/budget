import { defineStore } from 'pinia'
import { trpc } from '@/lib/trpc'
import { useMonthStore } from './month'
import { useCategoriesStore } from './categories'
import { dateToPeriod } from '@/lib/currency'
import {
  filterTransactions,
  calculateCategorySpending,
  sumCategorySpending,
} from '@/lib/calculator'
import type { Transaction, MonthlySpending } from '@/types'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as Transaction[],
    loading: false,
  }),

  getters: {
    /** Sorted most-recent first */
    sorted(): Transaction[] {
      return [...this.transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
    },

    byPeriod(): Record<string, Transaction[]> {
      const map: Record<string, Transaction[]> = {}
      for (const t of this.transactions) {
        const period = dateToPeriod(t.date)
        if (!map[period]) map[period] = []
        map[period].push(t)
      }
      return map
    },

    monthlySpending(): MonthlySpending[] {
      const catStore = useCategoriesStore()
      const periods = Object.keys(this.byPeriod).sort()
      return periods.map((period) => {
        const periodTxs = filterTransactions(this.byPeriod[period], catStore.byName, { period })
        const byCategory = calculateCategorySpending(periodTxs)
        const total = sumCategorySpending(byCategory)
        return { period, total, byCategory }
      })
    },

    categories(): string[] {
      const catStore = useCategoriesStore()
      const cats = new Set(
        filterTransactions(this.transactions, catStore.byName).map((t) => t.category),
      )
      return [...cats].sort()
    },

    lastTransactionDateByAccount(): Record<string, string> {
      const map: Record<string, string> = {}
      for (const t of this.transactions) {
        if (!map[t.accountId] || t.date > map[t.accountId]) {
          map[t.accountId] = t.date
        }
      }
      return map
    },

    totalSpentThisMonth(): number {
      const monthStore = useMonthStore()
      const spending = this.monthlySpending.find((s) => s.period === monthStore.activePeriod)
      return spending?.total ?? 0
    },

    topCategoryThisMonth(): string {
      const monthStore = useMonthStore()
      const spending = this.monthlySpending.find((s) => s.period === monthStore.activePeriod)
      if (!spending) return ''
      let top = ''
      let topAmt = 0
      for (const [cat, amt] of Object.entries(spending.byCategory)) {
        if (amt > topAmt) {
          topAmt = amt
          top = cat
        }
      }
      return top
    },
  },

  actions: {
    async fetch() {
      this.loading = true
      try {
        const rows = await trpc.transactions.list.query()
        this.transactions = rows.map(mapRowToTransaction)
      } finally {
        this.loading = false
      }
    },

    async addTransactions(txs: Transaction[]) {
      await trpc.transactions.addBatch.mutate(
        txs.map((tx) => ({
          id: tx.id,
          accountId: tx.accountId,
          fileId: tx.fileId,
          date: tx.date,
          description: tx.description,
          amount: tx.amount,
          type: tx.type,
          category: tx.category,
          notes: tx.notes ?? null,
          pending: tx.pending ?? false,
          ignore: tx.ignore ?? false,
          plaidTransactionId: tx.plaidTransactionId ?? null,
          source: tx.source ?? 'manual',
        })),
      )

      // Optimistic update
      for (const tx of txs) {
        if (!this.transactions.find((t) => t.id === tx.id)) {
          this.transactions.push(tx)
        }
      }
    },

    async updateTransaction(id: string, updates: Partial<Transaction>) {
      await trpc.transactions.update.mutate({ id, ...updates })

      // Optimistic update
      const idx = this.transactions.findIndex((t) => t.id === id)
      if (idx >= 0) {
        this.transactions[idx] = { ...this.transactions[idx], ...updates }
      }
    },

    async deleteTransaction(id: string) {
      await trpc.transactions.delete.mutate({ id })
      this.transactions = this.transactions.filter((t) => t.id !== id)
    },

    async deleteByFileId(fileId: string) {
      await trpc.transactions.deleteByFileId.mutate({ fileId })
      this.transactions = this.transactions.filter((t) => t.fileId !== fileId)
    },

    async updateCategory(id: string, category: string) {
      await this.updateTransaction(id, { category })
    },

    async setIgnore(id: string, ignore: boolean) {
      await this.updateTransaction(id, { ignore })
    },
  },
})

function mapRowToTransaction(row: Record<string, unknown>): Transaction {
  return {
    id: row.id as string,
    accountId: row.accountId as string,
    fileId: row.fileId as string,
    date: row.date as string,
    description: row.description as string,
    amount: row.amount as number,
    type: row.type as 'debit' | 'credit',
    category: row.category as string,
    ...(row.notes != null && { notes: row.notes as string }),
    ...(row.pending != null && { pending: row.pending as boolean }),
    ...(row.ignore != null && { ignore: row.ignore as boolean }),
    ...(row.plaidTransactionId != null && { plaidTransactionId: row.plaidTransactionId as string }),
    ...(row.source != null && { source: row.source as 'manual' | 'plaid' }),
  }
}
