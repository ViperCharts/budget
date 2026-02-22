import { defineStore } from 'pinia'
import type { Category } from '@/types'
import { nanoid } from '@/lib/nanoid'

// Default category palette
const DEFAULT_CATEGORIES: Category[] = [
  { id: 'food', name: 'Food & Dining', color: '#f59e0b' },
  { id: 'transport', name: 'Transportation', color: '#3b82f6' },
  { id: 'housing', name: 'Housing & Utilities', color: '#8b5cf6' },
  { id: 'entertainment', name: 'Entertainment', color: '#ec4899' },
  { id: 'healthcare', name: 'Healthcare', color: '#ef4444' },
  { id: 'shopping', name: 'Shopping', color: '#06b6d4' },
  { id: 'income', name: 'Income', color: '#22c55e' },
  { id: 'transfer', name: 'Transfer', color: '#6b7280' },
  { id: 'savings', name: 'Savings', color: '#10b981' },
  { id: 'fees', name: 'Fees & Interest', color: '#f97316' },
  { id: 'other', name: 'Other', color: '#94a3b8' },
]

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [...DEFAULT_CATEGORIES] as Category[],
  }),

  getters: {
    byName(): Record<string, Category> {
      const map: Record<string, Category> = {}
      for (const c of this.categories) {
        map[c.name.toLowerCase()] = c
        map[c.id] = c
      }
      return map
    },

    colorFor(): (name: string) => string {
      return (name: string) => {
        const lower = name.toLowerCase()
        for (const cat of this.categories) {
          if (
            cat.name.toLowerCase() === lower ||
            cat.id === lower ||
            lower.includes(cat.id)
          ) {
            return cat.color
          }
        }
        // Deterministic color from name
        return hashColor(name)
      }
    },

    names(): string[] {
      return this.categories.map((c) => c.name)
    },
  },

  actions: {
    addCategory(name: string, color: string) {
      this.categories.push({ id: nanoid(), name, color })
    },

    updateCategory(id: string, updates: Partial<Category>) {
      const idx = this.categories.findIndex((c) => c.id === id)
      if (idx !== -1) {
        this.categories[idx] = { ...this.categories[idx], ...updates }
      }
    },

    removeCategory(id: string) {
      this.categories = this.categories.filter((c) => c.id !== id)
    },

    setBudget(id: string, limit: number) {
      const cat = this.categories.find((c) => c.id === id)
      if (cat) cat.budgetLimit = limit
    },
  },

  persist: {
    key: 'budget-categories',
    storage: localStorage,
  },
})

function hashColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const h = Math.abs(hash) % 360
  return `hsl(${h}, 65%, 55%)`
}
