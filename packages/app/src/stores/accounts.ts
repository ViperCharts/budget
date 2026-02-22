import { defineStore } from 'pinia'
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuthStore } from './auth'
import type { Account, AccountType } from '@/types'
import { nanoid } from '@/lib/nanoid'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
    loading: false,
    _unsubscribe: null as Unsubscribe | null,
  }),

  getters: {
    totalAssets(): number {
      return this.accounts
        .filter((a) => !['credit_card', 'loan', 'mortgage'].includes(a.type))
        .reduce((sum, a) => sum + a.balance, 0)
    },
    totalLiabilities(): number {
      return this.accounts
        .filter((a) => ['credit_card', 'loan', 'mortgage'].includes(a.type))
        .reduce((sum, a) => sum + Math.abs(a.balance), 0)
    },
    netWorth(): number {
      return this.totalAssets - this.totalLiabilities
    },
    byId(): Record<string, Account> {
      return Object.fromEntries(this.accounts.map((a) => [a.id, a]))
    },
  },

  actions: {
    subscribe() {
      const auth = useAuthStore()
      if (!auth.user) return

      this.loading = true
      const q = query(
        collection(db, 'accounts'),
        where('uid', '==', auth.user.uid),
      )

      this._unsubscribe = onSnapshot(q, (snapshot) => {
        this.accounts = snapshot.docs.map((d) => d.data() as Account)
        this.loading = false
      })
    },

    unsubscribe() {
      this._unsubscribe?.()
      this._unsubscribe = null
    },

    async upsertAccount(account: Partial<Account> & { type: AccountType; name: string; balance: number }) {
      const auth = useAuthStore()
      if (!auth.user) return

      const id = account.id ?? nanoid()
      const data: Account = {
        id,
        name: account.name,
        type: account.type,
        balance: account.balance,
        currency: account.currency ?? 'USD',
        lastUpdated: new Date().toISOString(),
        fileIds: account.fileIds ?? [],
        ...(account.interestRate !== undefined && { interestRate: account.interestRate }),
        ...(account.creditLimit !== undefined && { creditLimit: account.creditLimit }),
      }

      await setDoc(doc(db, 'accounts', id), { ...data, uid: auth.user.uid })
      return data
    },

    async deleteAccount(id: string) {
      await deleteDoc(doc(db, 'accounts', id))
    },

    async updateBalance(id: string, balance: number) {
      const account = this.accounts.find((a) => a.id === id)
      if (!account) return
      await this.upsertAccount({ ...account, balance })
    },
  },
})
