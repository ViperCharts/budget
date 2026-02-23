import { defineStore } from 'pinia'
import type { Category } from '@/types'
import { nanoid } from '@/lib/nanoid'

// Default category palette (built-in, never written to Firestore)
const DEFAULT_CATEGORIES: Category[] = [
  // Food & Drink
  { id: 'groceries', name: 'Groceries', color: '#f59e0b', emoji: '🛒' },
  { id: 'restaurants', name: 'Restaurants & Bars', color: '#fb923c', emoji: '🍽️' },
  { id: 'coffee', name: 'Coffee & Tea', color: '#d97706', emoji: '☕' },
  { id: 'fast-food', name: 'Fast Food', color: '#fbbf24', emoji: '🍔' },
  { id: 'food-delivery', name: 'Food Delivery', color: '#f97316', emoji: '🚗' },
  // Transportation
  { id: 'gas', name: 'Gas & Fuel', color: '#3b82f6', emoji: '⛽' },
  { id: 'transit', name: 'Public Transit', color: '#60a5fa', emoji: '🚌' },
  { id: 'rideshare', name: 'Rideshare & Taxi', color: '#2563eb', emoji: '🚕' },
  { id: 'parking', name: 'Parking & Tolls', color: '#93c5fd', emoji: '🅿️' },
  { id: 'car-maintenance', name: 'Car Maintenance', color: '#1d4ed8', emoji: '🔧' },
  { id: 'car-insurance', name: 'Car Insurance', color: '#3730a3', emoji: '🚗' },
  // Travel
  { id: 'flights', name: 'Flights', color: '#6366f1', emoji: '✈️' },
  { id: 'hotels', name: 'Hotels & Lodging', color: '#818cf8', emoji: '🏨' },
  { id: 'car-rental', name: 'Car Rental', color: '#7c3aed', emoji: '🚙' },
  { id: 'travel', name: 'Travel & Vacation', color: '#a78bfa', emoji: '🌴' },
  // Housing
  { id: 'rent', name: 'Rent & Mortgage', color: '#8b5cf6', emoji: '🏠' },
  { id: 'utilities', name: 'Home Utilities', color: '#c084fc', emoji: '💡' },
  { id: 'internet', name: 'Internet & Phone', color: '#a855f7', emoji: '📱' },
  { id: 'home-maintenance', name: 'Home Maintenance', color: '#d8b4fe', emoji: '🔨' },
  { id: 'home-improvement', name: 'Home Improvement', color: '#9333ea', emoji: '🏗️' },
  // Shopping
  { id: 'clothing', name: 'Clothing & Apparel', color: '#06b6d4', emoji: '👗' },
  { id: 'electronics', name: 'Electronics & Tech', color: '#0891b2', emoji: '💻' },
  { id: 'online-shopping', name: 'Online Shopping', color: '#22d3ee', emoji: '📦' },
  { id: 'home-garden', name: 'Home & Garden', color: '#0e7490', emoji: '🌱' },
  { id: 'gifts', name: 'Gifts', color: '#67e8f9', emoji: '🎁' },
  // Entertainment
  { id: 'streaming', name: 'Streaming Services', color: '#ec4899', emoji: '🎬' },
  { id: 'movies', name: 'Movies & Events', color: '#f472b6', emoji: '🎭' },
  { id: 'gaming', name: 'Gaming', color: '#be185d', emoji: '🎮' },
  { id: 'sports', name: 'Sports & Recreation', color: '#db2777', emoji: '⚽' },
  { id: 'books-magazines', name: 'Books & Magazines', color: '#fbcfe8', emoji: '📚' },
  { id: 'hobbies', name: 'Hobbies', color: '#e879f9', emoji: '🎨' },
  // Healthcare
  { id: 'medical', name: 'Doctor & Medical', color: '#ef4444', emoji: '🏥' },
  { id: 'dental', name: 'Dental & Vision', color: '#f87171', emoji: '🦷' },
  { id: 'pharmacy', name: 'Pharmacy', color: '#dc2626', emoji: '💊' },
  { id: 'fitness', name: 'Fitness & Gym', color: '#fca5a5', emoji: '🏋️' },
  { id: 'mental-health', name: 'Mental Health', color: '#b91c1c', emoji: '🧠' },
  // Personal Care
  { id: 'hair-beauty', name: 'Hair & Beauty', color: '#f43f5e', emoji: '💅' },
  { id: 'personal-care', name: 'Personal Care', color: '#fb7185', emoji: '🧴' },
  // Education
  { id: 'tuition', name: 'Tuition & Fees', color: '#eab308', emoji: '🎓' },
  { id: 'school-supplies', name: 'Books & Supplies', color: '#facc15', emoji: '✏️' },
  { id: 'courses', name: 'Courses & Training', color: '#ca8a04', emoji: '📖' },
  { id: 'childcare', name: 'Childcare', color: '#fde047', emoji: '👶' },
  // Finance
  { id: 'income', name: 'Income', color: '#22c55e', emoji: '💰' },
  { id: 'investment-income', name: 'Investment Income', color: '#16a34a', emoji: '📈' },
  { id: 'freelance', name: 'Freelance Income', color: '#4ade80', emoji: '💼' },
  { id: 'transfer', name: 'Transfer', color: '#6b7280', emoji: '🔄' },
  { id: 'savings', name: 'Savings & Investments', color: '#10b981', emoji: '🏦' },
  { id: 'atm', name: 'ATM & Cash', color: '#9ca3af', emoji: '💵' },
  { id: 'fees', name: 'Fees & Interest', color: '#f97316', emoji: '📋' },
  { id: 'taxes', name: 'Taxes', color: '#78716c', emoji: '🧾' },
  { id: 'insurance', name: 'Insurance', color: '#57534e', emoji: '🛡️' },
  // Other
  { id: 'pets', name: 'Pets', color: '#a3e635', emoji: '🐾' },
  { id: 'charity', name: 'Charity & Donations', color: '#34d399', emoji: '❤️' },
  { id: 'business', name: 'Business Expenses', color: '#64748b', emoji: '📊' },
  { id: 'other', name: 'Other', color: '#94a3b8', emoji: '📌' },
]

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    /** All categories: defaults merged with user's custom ones */
    categories: [...DEFAULT_CATEGORIES] as Category[],
    _unsubscribe: null as (() => void) | null,
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
        return hashColor(name)
      }
    },

    emojiFor(): (name: string) => string | undefined {
      return (name: string) => {
        const lower = name.toLowerCase()
        for (const cat of this.categories) {
          if (cat.name.toLowerCase() === lower || cat.id === lower) {
            return cat.emoji
          }
        }
        return undefined
      }
    },

    names(): string[] {
      return this.categories.map((c) => c.name)
    },

    customCategories(): Category[] {
      return this.categories.filter((c) => c.isCustom)
    },
  },

  actions: {
    async subscribe() {
      const { db } = await import('@/lib/firebase')
      const { useAuthStore } = await import('@/stores/auth')
      const { collection, query, where, onSnapshot } = await import('firebase/firestore')

      const auth = useAuthStore()
      if (!auth.user) return

      const q = query(
        collection(db, 'userCategories'),
        where('uid', '==', auth.user.uid),
      )

      this._unsubscribe = onSnapshot(q, (snap) => {
        const custom: Category[] = snap.docs.map((doc) => {
          const d = doc.data()
          const cat: Category = {
            id: doc.id,
            name: d.name,
            color: d.color,
            isCustom: true,
          }
          if (d.emoji) cat.emoji = d.emoji
          return cat
        })

        // Merge: defaults first, then user's custom categories
        this.categories = [...DEFAULT_CATEGORIES, ...custom]
      })
    },

    unsubscribe() {
      this._unsubscribe?.()
      this._unsubscribe = null
    },

    async addCategory(name: string, color: string, emoji?: string): Promise<Category> {
      const { db } = await import('@/lib/firebase')
      const { useAuthStore } = await import('@/stores/auth')
      const { collection, addDoc } = await import('firebase/firestore')

      const auth = useAuthStore()
      if (!auth.user) throw new Error('Not authenticated')

      const data: Record<string, unknown> = {
        uid: auth.user.uid,
        name,
        color,
      }
      if (emoji) data.emoji = emoji

      const ref = await addDoc(collection(db, 'userCategories'), data)

      const cat: Category = { id: ref.id, name, color, isCustom: true }
      if (emoji) cat.emoji = emoji

      // Optimistically add (snapshot will also fire, but this feels snappier)
      this.categories.push(cat)
      return cat
    },

    async updateCategory(id: string, updates: Partial<Category>) {
      const { db } = await import('@/lib/firebase')
      const { doc, updateDoc } = await import('firebase/firestore')

      const idx = this.categories.findIndex((c) => c.id === id)
      if (idx !== -1) {
        this.categories[idx] = { ...this.categories[idx], ...updates }
      }

      // Only persist to Firestore if it's a custom category
      const cat = this.categories[idx]
      if (cat?.isCustom) {
        const data: Record<string, unknown> = {}
        if (updates.name !== undefined) data.name = updates.name
        if (updates.color !== undefined) data.color = updates.color
        if (updates.emoji !== undefined) data.emoji = updates.emoji
        if (Object.keys(data).length) {
          await updateDoc(doc(db, 'userCategories', id), data)
        }
      }
    },

    async removeCategory(id: string) {
      const { db } = await import('@/lib/firebase')
      const { doc, deleteDoc } = await import('firebase/firestore')

      const cat = this.categories.find((c) => c.id === id)
      this.categories = this.categories.filter((c) => c.id !== id)

      if (cat?.isCustom) {
        await deleteDoc(doc(db, 'userCategories', id))
      }
    },

    setBudget(id: string, limit: number) {
      const cat = this.categories.find((c) => c.id === id)
      if (cat) cat.budgetLimit = limit
    },
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
