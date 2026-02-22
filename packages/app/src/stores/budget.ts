import { defineStore } from 'pinia'
import { currentPeriod } from '@/lib/currency'
import { useTransactionsStore } from './transactions'
import { useCategoriesStore } from './categories'
import type { BudgetItem } from '@/types'
import { nanoid } from '@/lib/nanoid'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    items: [] as BudgetItem[],
    activePeriod: currentPeriod(),
  }),

  getters: {
    /** Budget items for the active period */
    activeItems(): BudgetItem[] {
      return this.items.filter((i) => i.period === this.activePeriod)
    },

    /** Spending vs budget for active period */
    progress(): {
      categoryId: string
      categoryName: string
      color: string
      limit: number
      spent: number
      percent: number
      over: boolean
    }[] {
      const txStore = useTransactionsStore()
      const catStore = useCategoriesStore()
      const txs = (txStore.byPeriod[this.activePeriod] ?? []).filter(
        (t) => t.type === 'debit',
      )

      return this.activeItems.map((item) => {
        const cat = catStore.categories.find((c) => c.id === item.categoryId)
        const spent = txs
          .filter((t) => {
            const tCat = catStore.byName[t.category.toLowerCase()]
            return tCat?.id === item.categoryId
          })
          .reduce((sum, t) => sum + t.amount, 0)

        const percent = item.monthlyLimit > 0 ? (spent / item.monthlyLimit) * 100 : 0
        return {
          categoryId: item.categoryId,
          categoryName: cat?.name ?? 'Unknown',
          color: cat?.color ?? '#94a3b8',
          limit: item.monthlyLimit,
          spent,
          percent: Math.min(percent, 100),
          over: spent > item.monthlyLimit,
        }
      })
    },

    totalBudgeted(): number {
      return this.activeItems.reduce((sum, i) => sum + i.monthlyLimit, 0)
    },
  },

  actions: {
    upsertItem(categoryId: string, monthlyLimit: number) {
      const existing = this.items.find(
        (i) => i.categoryId === categoryId && i.period === this.activePeriod,
      )
      if (existing) {
        existing.monthlyLimit = monthlyLimit
      } else {
        this.items.push({
          id: nanoid(),
          categoryId,
          monthlyLimit,
          period: this.activePeriod,
        })
      }
    },

    removeItem(id: string) {
      this.items = this.items.filter((i) => i.id !== id)
    },

    setPeriod(period: string) {
      this.activePeriod = period
    },
  },

  persist: {
    key: 'budget-items',
    storage: localStorage,
  },
})
