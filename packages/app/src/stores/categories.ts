import { defineStore } from 'pinia'
import type { Category } from '@/types'
import { nanoid } from '@/lib/nanoid'

// Default category palette
const DEFAULT_CATEGORIES: Category[] = [
  // Food & Drink
  { id: 'groceries', name: 'Groceries', color: '#f59e0b' },
  { id: 'restaurants', name: 'Restaurants & Bars', color: '#fb923c' },
  { id: 'coffee', name: 'Coffee & Tea', color: '#d97706' },
  { id: 'fast-food', name: 'Fast Food', color: '#fbbf24' },
  { id: 'food-delivery', name: 'Food Delivery', color: '#f97316' },
  // Transportation
  { id: 'gas', name: 'Gas & Fuel', color: '#3b82f6' },
  { id: 'transit', name: 'Public Transit', color: '#60a5fa' },
  { id: 'rideshare', name: 'Rideshare & Taxi', color: '#2563eb' },
  { id: 'parking', name: 'Parking & Tolls', color: '#93c5fd' },
  { id: 'car-maintenance', name: 'Car Maintenance', color: '#1d4ed8' },
  { id: 'car-insurance', name: 'Car Insurance', color: '#3730a3' },
  // Travel
  { id: 'flights', name: 'Flights', color: '#6366f1' },
  { id: 'hotels', name: 'Hotels & Lodging', color: '#818cf8' },
  { id: 'car-rental', name: 'Car Rental', color: '#7c3aed' },
  { id: 'travel', name: 'Travel & Vacation', color: '#a78bfa' },
  // Housing
  { id: 'rent', name: 'Rent & Mortgage', color: '#8b5cf6' },
  { id: 'utilities', name: 'Home Utilities', color: '#c084fc' },
  { id: 'internet', name: 'Internet & Phone', color: '#a855f7' },
  { id: 'home-maintenance', name: 'Home Maintenance', color: '#d8b4fe' },
  { id: 'home-improvement', name: 'Home Improvement', color: '#9333ea' },
  // Shopping
  { id: 'clothing', name: 'Clothing & Apparel', color: '#06b6d4' },
  { id: 'electronics', name: 'Electronics & Tech', color: '#0891b2' },
  { id: 'online-shopping', name: 'Online Shopping', color: '#22d3ee' },
  { id: 'home-garden', name: 'Home & Garden', color: '#0e7490' },
  { id: 'gifts', name: 'Gifts', color: '#67e8f9' },
  // Entertainment
  { id: 'streaming', name: 'Streaming Services', color: '#ec4899' },
  { id: 'movies', name: 'Movies & Events', color: '#f472b6' },
  { id: 'gaming', name: 'Gaming', color: '#be185d' },
  { id: 'sports', name: 'Sports & Recreation', color: '#db2777' },
  { id: 'books-magazines', name: 'Books & Magazines', color: '#fbcfe8' },
  { id: 'hobbies', name: 'Hobbies', color: '#e879f9' },
  // Healthcare
  { id: 'medical', name: 'Doctor & Medical', color: '#ef4444' },
  { id: 'dental', name: 'Dental & Vision', color: '#f87171' },
  { id: 'pharmacy', name: 'Pharmacy', color: '#dc2626' },
  { id: 'fitness', name: 'Fitness & Gym', color: '#fca5a5' },
  { id: 'mental-health', name: 'Mental Health', color: '#b91c1c' },
  // Personal Care
  { id: 'hair-beauty', name: 'Hair & Beauty', color: '#f43f5e' },
  { id: 'personal-care', name: 'Personal Care', color: '#fb7185' },
  // Education
  { id: 'tuition', name: 'Tuition & Fees', color: '#eab308' },
  { id: 'school-supplies', name: 'Books & Supplies', color: '#facc15' },
  { id: 'courses', name: 'Courses & Training', color: '#ca8a04' },
  { id: 'childcare', name: 'Childcare', color: '#fde047' },
  // Finance
  { id: 'income', name: 'Income', color: '#22c55e' },
  { id: 'investment-income', name: 'Investment Income', color: '#16a34a' },
  { id: 'freelance', name: 'Freelance Income', color: '#4ade80' },
  { id: 'transfer', name: 'Transfer', color: '#6b7280' },
  { id: 'savings', name: 'Savings & Investments', color: '#10b981' },
  { id: 'atm', name: 'ATM & Cash', color: '#9ca3af' },
  { id: 'fees', name: 'Fees & Interest', color: '#f97316' },
  { id: 'taxes', name: 'Taxes', color: '#78716c' },
  { id: 'insurance', name: 'Insurance', color: '#57534e' },
  // Other
  { id: 'pets', name: 'Pets', color: '#a3e635' },
  { id: 'charity', name: 'Charity & Donations', color: '#34d399' },
  { id: 'business', name: 'Business Expenses', color: '#64748b' },
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

export function hashColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const h = Math.abs(hash) % 360
  return `hsl(${h}, 65%, 55%)`
}
