import { defineStore } from 'pinia'
import {
  collection,
  onSnapshot,
  query,
  where,
  type Unsubscribe,
} from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { db, fns } from '@/lib/firebase'
import { useAuthStore } from './auth'
import type { PlaidItem } from '@/types'

export interface PlaidLinkMetadata {
  institution?: { institution_id: string; name: string }
}

export const usePlaidStore = defineStore('plaid', {
  state: () => ({
    items: [] as PlaidItem[],
    loading: false,
    syncing: false,
    connectingItemId: null as string | null,
    _unsubscribe: null as Unsubscribe | null,
  }),

  getters: {
    hasItems(): boolean {
      return this.items.length > 0
    },
    byId(): Record<string, PlaidItem> {
      return Object.fromEntries(this.items.map((i) => [i.id, i]))
    },
  },

  actions: {
    subscribe() {
      const auth = useAuthStore()
      if (!auth.user) return

      this.loading = true
      const q = query(
        collection(db, 'plaidItems'),
        where('uid', '==', auth.user.uid),
      )

      this._unsubscribe = onSnapshot(q, (snapshot) => {
        this.items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as PlaidItem))
        this.loading = false
      })
    },

    unsubscribe() {
      this._unsubscribe?.()
      this._unsubscribe = null
    },

    async createLinkToken(): Promise<string> {
      const fn = httpsCallable<void, { linkToken: string }>(fns, 'createPlaidLinkToken')
      const result = await fn()
      return result.data.linkToken
    },

    async exchangePublicToken(
      publicToken: string,
      metadata: PlaidLinkMetadata,
    ): Promise<void> {
      const fn = httpsCallable<
        { publicToken: string; institutionId: string; institutionName: string },
        { itemId: string }
      >(fns, 'exchangePlaidPublicToken')

      const result = await fn({
        publicToken,
        institutionId: metadata.institution?.institution_id ?? '',
        institutionName: metadata.institution?.name ?? 'Unknown Bank',
      })

      this.connectingItemId = result.data.itemId
    },

    async syncItem(itemId: string): Promise<void> {
      this.syncing = true
      try {
        const fn = httpsCallable<{ itemId: string }, { ok: boolean }>(fns, 'syncPlaidItem')
        await fn({ itemId })
      } finally {
        this.syncing = false
      }
    },

    async removeItem(itemId: string): Promise<void> {
      const fn = httpsCallable<{ itemId: string }, { ok: boolean }>(fns, 'removePlaidItem')
      await fn({ itemId })
    },
  },
})
