import { defineStore } from 'pinia'
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
  onSnapshot,
  query,
  where,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuthStore } from './auth'
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
    _unsubscribe: null as Unsubscribe | null,
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
    subscribe(accountIds?: string[]) {
      const auth = useAuthStore()
      if (!auth.user) return

      this.loading = true
      const q = query(
        collection(db, 'transactions'),
        where('uid', '==', auth.user.uid),
      )

      this._unsubscribe = onSnapshot(q, (snapshot) => {
        this.transactions = snapshot.docs.map((d) => d.data() as Transaction)
        this.loading = false
      })
    },

    unsubscribe() {
      this._unsubscribe?.()
      this._unsubscribe = null
    },

    async addTransactions(txs: Transaction[]) {
      const auth = useAuthStore()
      if (!auth.user) return

      const batch = writeBatch(db)
      for (const tx of txs) {
        batch.set(doc(db, 'transactions', tx.id), { ...tx, uid: auth.user.uid })
      }
      await batch.commit()
    },

    async updateTransaction(id: string, updates: Partial<Transaction>) {
      await setDoc(doc(db, 'transactions', id), updates, { merge: true })
    },

    async deleteTransaction(id: string) {
      await deleteDoc(doc(db, 'transactions', id))
    },

    async deleteByFileId(fileId: string) {
      const batch = writeBatch(db)
      const toDelete = this.transactions.filter((t) => t.fileId === fileId)
      for (const tx of toDelete) {
        batch.delete(doc(db, 'transactions', tx.id))
      }
      if (toDelete.length > 0) await batch.commit()
    },

    async updateCategory(id: string, category: string) {
      await this.updateTransaction(id, { category })
    },

    async setIgnore(id: string, ignore: boolean) {
      await this.updateTransaction(id, { ignore })
    },
  },
})
