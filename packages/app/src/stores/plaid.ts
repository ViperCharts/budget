import { defineStore } from 'pinia'
import { trpc } from '@/lib/trpc'
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
    async fetch() {
      this.loading = true
      try {
        const rows = await trpc.plaid.listItems.query()
        this.items = rows.map((row) => ({
          id: row.id,
          uid: row.userId,
          institutionId: row.institutionId,
          institutionName: row.institutionName,
          lastSync: row.lastSync ?? null,
          status: row.status as PlaidItem['status'],
          ...(row.error != null && { error: row.error as string }),
        }))
      } finally {
        this.loading = false
      }
    },

    async createLinkToken(): Promise<string> {
      const result = await trpc.plaid.createLinkToken.mutate()
      return result.linkToken
    },

    async exchangePublicToken(
      publicToken: string,
      metadata: PlaidLinkMetadata,
    ): Promise<void> {
      const result = await trpc.plaid.exchangePublicToken.mutate({
        publicToken,
        institutionId: metadata.institution?.institution_id ?? '',
        institutionName: metadata.institution?.name ?? 'Unknown Bank',
      })

      this.connectingItemId = result.itemId
    },

    async syncItem(itemId: string): Promise<void> {
      this.syncing = true
      try {
        await trpc.plaid.syncItem.mutate({ itemId })
      } finally {
        this.syncing = false
      }
    },

    async removeItem(itemId: string): Promise<void> {
      await trpc.plaid.removeItem.mutate({ itemId })
      this.items = this.items.filter((i) => i.id !== itemId)
    },
  },
})
