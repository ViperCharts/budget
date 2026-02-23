import { defineStore } from "pinia";
import type { Category } from "@/types";

// Default category palette (built-in, never written to Firestore)
export const DEFAULT_CATEGORIES: Category[] = [
  // Food
  {
    id: "eating-out",
    name: "Eating Out",
    color: "#fb923c",
    emoji: "🍽️",
    description:
      "Restaurants, fast food, coffee shops, bars, and food delivery",
  },
  {
    id: "groceries",
    name: "Groceries",
    color: "#f59e0b",
    emoji: "🛒",
    description: "Supermarkets, grocery stores, and food markets",
  },
  // Transportation
  {
    id: "transportation",
    name: "Transportation",
    color: "#3b82f6",
    emoji: "🚗",
    description:
      "Gas, public transit, rideshare, parking, tolls, car maintenance, and car insurance",
  },
  // Travel
  {
    id: "travel",
    name: "Travel",
    color: "#6366f1",
    emoji: "✈️",
    description: "Flights, hotels, car rentals, and vacation expenses",
  },
  // Housing
  {
    id: "housing",
    name: "Housing",
    color: "#8b5cf6",
    emoji: "🏠",
    description:
      "Rent, mortgage, utilities, internet, phone bills, and home repairs",
  },
  // Shopping
  {
    id: "shopping",
    name: "Shopping",
    color: "#06b6d4",
    emoji: "🛍️",
    description:
      "Clothing, electronics, online orders, household goods, and gifts",
  },
  // Entertainment
  {
    id: "entertainment",
    name: "Entertainment",
    color: "#ec4899",
    emoji: "🎬",
    description:
      "Streaming services, movies, gaming, sports, books, and hobbies",
  },
  // Health
  {
    id: "health",
    name: "Health & Wellness",
    color: "#ef4444",
    emoji: "💊",
    description:
      "Doctor visits, dental, pharmacy, gym memberships, and mental health",
  },
  // Personal Care
  {
    id: "personal-care",
    name: "Personal Care",
    color: "#f43f5e",
    emoji: "💅",
    description: "Haircuts, beauty products, and grooming",
  },
  // Education
  {
    id: "education",
    name: "Education",
    color: "#eab308",
    emoji: "🎓",
    description: "Tuition, school supplies, courses, and childcare",
  },
  // Finance
  {
    id: "income",
    name: "Income",
    color: "#22c55e",
    emoji: "💰",
    description:
      "All income: wages, investment returns, freelance, and refunds",
  },
  {
    id: "savings",
    name: "Savings",
    color: "#10b981",
    emoji: "🏦",
    description: "Transfers into savings or investment accounts",
  },
  {
    id: "internal-transfer",
    name: "Internal Transfer",
    color: "#6b7280",
    emoji: "🔄",
    isInternalTransfer: true,
    description:
      "ANY transaction that moves money between the user's own accounts. Includes transfers between checking/savings accounts, credit card payments (e.g. 'AUTOPAY', 'ONLINE PAYMENT', 'PAYMENT - THANK YOU'), balance transfers, loan payments made from a checking account to a loan account held at the same or different institution. Do NOT use for payments to external parties.",
  },
  {
    id: "atm",
    name: "ATM & Cash",
    color: "#9ca3af",
    emoji: "💵",
    description: "ATM withdrawals and cash transactions",
  },
  {
    id: "fees",
    name: "Fees & Charges",
    color: "#f97316",
    emoji: "📋",
    description: "Bank fees, interest charges, taxes, and insurance premiums",
  },
  // Other
  {
    id: "pets",
    name: "Pets",
    color: "#a3e635",
    emoji: "🐾",
    description: "Pet expenses",
  },
  {
    id: "charity",
    name: "Charity",
    color: "#34d399",
    emoji: "❤️",
    description: "Charitable donations and giving",
  },
  {
    id: "business",
    name: "Business",
    color: "#64748b",
    emoji: "📊",
    description: "Business expenses",
  },
  {
    id: "other",
    name: "Other",
    color: "#94a3b8",
    emoji: "📌",
    description: "Other or uncategorized expenses",
  },
];

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    /** All categories: defaults merged with user's custom ones */
    categories: [...DEFAULT_CATEGORIES] as Category[],
    _unsubscribe: null as (() => void) | null,
  }),

  getters: {
    byName(): Record<string, Category> {
      const map: Record<string, Category> = {};
      for (const c of this.categories) {
        map[c.name.toLowerCase()] = c;
        map[c.id] = c;
      }
      return map;
    },

    colorFor(): (name: string) => string {
      return (name: string) => {
        const lower = name.toLowerCase();
        for (const cat of this.categories) {
          if (
            cat.name.toLowerCase() === lower ||
            cat.id === lower ||
            lower.includes(cat.id)
          ) {
            return cat.color;
          }
        }
        return hashColor(name);
      };
    },

    emojiFor(): (name: string) => string | undefined {
      return (name: string) => {
        const lower = name.toLowerCase();
        for (const cat of this.categories) {
          if (cat.name.toLowerCase() === lower || cat.id === lower) {
            return cat.emoji;
          }
        }
        return undefined;
      };
    },

    names(): string[] {
      return this.categories.map((c) => c.name);
    },

    customCategories(): Category[] {
      return this.categories.filter((c) => c.isCustom);
    },
  },

  actions: {
    async subscribe() {
      const { db } = await import("@/lib/firebase");
      const { useAuthStore } = await import("@/stores/auth");
      const { collection, query, where, onSnapshot } = await import(
        "firebase/firestore"
      );

      const auth = useAuthStore();
      if (!auth.user) return;

      const q = query(
        collection(db, "userCategories"),
        where("uid", "==", auth.user.uid)
      );

      this._unsubscribe = onSnapshot(q, (snap) => {
        const custom: Category[] = snap.docs.map((doc) => {
          const d = doc.data();
          const cat: Category = {
            id: doc.id,
            name: d.name,
            color: d.color,
            isCustom: true,
          };
          if (d.emoji) cat.emoji = d.emoji;
          return cat;
        });

        // Merge: defaults first, then user's custom categories
        this.categories = [...DEFAULT_CATEGORIES, ...custom];
      });
    },

    unsubscribe() {
      this._unsubscribe?.();
      this._unsubscribe = null;
    },

    async addCategory(
      name: string,
      color: string,
      emoji?: string
    ): Promise<Category> {
      const { db } = await import("@/lib/firebase");
      const { useAuthStore } = await import("@/stores/auth");
      const { collection, addDoc } = await import("firebase/firestore");

      const auth = useAuthStore();
      if (!auth.user) throw new Error("Not authenticated");

      const data: Record<string, unknown> = {
        uid: auth.user.uid,
        name,
        color,
      };
      if (emoji) data.emoji = emoji;

      const ref = await addDoc(collection(db, "userCategories"), data);

      const cat: Category = { id: ref.id, name, color, isCustom: true };
      if (emoji) cat.emoji = emoji;

      // Optimistically add (snapshot will also fire, but this feels snappier)
      this.categories.push(cat);
      return cat;
    },

    async updateCategory(id: string, updates: Partial<Category>) {
      const { db } = await import("@/lib/firebase");
      const { doc, updateDoc } = await import("firebase/firestore");

      const idx = this.categories.findIndex((c) => c.id === id);
      if (idx !== -1) {
        this.categories[idx] = { ...this.categories[idx], ...updates };
      }

      // Only persist to Firestore if it's a custom category
      const cat = this.categories[idx];
      if (cat?.isCustom) {
        const data: Record<string, unknown> = {};
        if (updates.name !== undefined) data.name = updates.name;
        if (updates.color !== undefined) data.color = updates.color;
        if (updates.emoji !== undefined) data.emoji = updates.emoji;
        if (Object.keys(data).length) {
          await updateDoc(doc(db, "userCategories", id), data);
        }
      }
    },

    async removeCategory(id: string) {
      const { db } = await import("@/lib/firebase");
      const { doc, deleteDoc } = await import("firebase/firestore");

      const cat = this.categories.find((c) => c.id === id);
      this.categories = this.categories.filter((c) => c.id !== id);

      if (cat?.isCustom) {
        await deleteDoc(doc(db, "userCategories", id));
      }
    },

    setBudget(id: string, limit: number) {
      const cat = this.categories.find((c) => c.id === id);
      if (cat) cat.budgetLimit = limit;
    },
  },
});

export function hashColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 65%, 55%)`;
}
