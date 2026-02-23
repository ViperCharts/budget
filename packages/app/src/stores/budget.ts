import { defineStore } from 'pinia'
import { useTransactionsStore } from './transactions'
import { useCategoriesStore } from './categories'
import { useMonthStore } from './month'
import { filterTransactions } from '@/lib/calculator'
import type { BudgetItem } from '@/types'
import { nanoid } from '@/lib/nanoid'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    items: [] as BudgetItem[],
  }),

  getters: {
    /**
     * Deduplicated global budget items — one per category.
     * Handles legacy data that was stored per-period by keeping the first
     * occurrence of each categoryId.
     */
    globalItems(): BudgetItem[] {
      const seen = new Map<string, BudgetItem>()
      for (const item of this.items) {
        if (!seen.has(item.categoryId)) {
          seen.set(item.categoryId, item)
        }
      }
      return [...seen.values()]
    },

    /**
     * Spending vs budget for the active period.
     * Includes both budgeted categories and any unbudgeted categories that
     * have debit transactions in the active period.
     */
    progress(): {
      id: string
      categoryId: string
      categoryName: string
      color: string
      limit: number
      spent: number
      percent: number
      over: boolean
      /** True when the category has spending but no budget limit set */
      unbudgeted: boolean
    }[] {
      const monthStore = useMonthStore()
      const txStore = useTransactionsStore()
      const catStore = useCategoriesStore()

      const periodTxs = filterTransactions(
        txStore.byPeriod[monthStore.activePeriod] ?? [],
        catStore.byName,
        { period: monthStore.activePeriod, type: 'debit' },
      )

      // Aggregate debit spending by category id for the active period
      const spentById: Record<string, number> = {}
      for (const t of periodTxs) {
        const tCat = catStore.byName[t.category.toLowerCase()]
        if (!tCat) continue
        spentById[tCat.id] = (spentById[tCat.id] ?? 0) + t.amount
      }

      const budgetedIds = new Set(this.globalItems.map((i) => i.categoryId))

      // Budgeted categories
      const budgeted = this.globalItems.map((item) => {
        const cat = catStore.categories.find((c) => c.id === item.categoryId)
        const spent = spentById[item.categoryId] ?? 0
        const percent = item.monthlyLimit > 0 ? (spent / item.monthlyLimit) * 100 : 0
        return {
          id: item.id,
          categoryId: item.categoryId,
          categoryName: cat?.name ?? 'Unknown',
          color: cat?.color ?? '#94a3b8',
          limit: item.monthlyLimit,
          spent,
          percent: Math.min(percent, 100),
          over: spent > item.monthlyLimit,
          unbudgeted: false,
        }
      })

      // Unbudgeted categories that have spending in the active period
      const unbudgeted = Object.entries(spentById)
        .filter(([catId]) => !budgetedIds.has(catId))
        .map(([catId, spent]) => {
          const cat = catStore.categories.find((c) => c.id === catId)
          return {
            id: '',
            categoryId: catId,
            categoryName: cat?.name ?? catId,
            color: cat?.color ?? '#94a3b8',
            limit: 0,
            spent,
            percent: 0,
            over: false,
            unbudgeted: true,
          }
        })

      return [...budgeted, ...unbudgeted]
    },

    totalBudgeted(): number {
      return this.globalItems.reduce((sum, i) => sum + i.monthlyLimit, 0)
    },
  },

  actions: {
    /**
     * Create or update a global budget for a category.
     * Removes any legacy period-scoped duplicates for the same category.
     */
    upsertItem(categoryId: string, monthlyLimit: number) {
      const existing = this.items.find((i) => i.categoryId === categoryId)
      // Remove all items for this category (cleans up legacy period-based duplicates)
      this.items = this.items.filter((i) => i.categoryId !== categoryId)
      this.items.push({
        id: existing?.id ?? nanoid(),
        categoryId,
        monthlyLimit,
      })
    },

    removeItem(id: string) {
      this.items = this.items.filter((i) => i.id !== id)
    },
  },

  persist: {
    key: 'budget-items',
    storage: localStorage,
  },
})
