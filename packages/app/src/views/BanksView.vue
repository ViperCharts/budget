<template>
  <div class="p-6 max-w-3xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-heading font-bold text-[var(--color-text)]">
          Connected Banks
        </h1>
        <p class="text-sm text-[var(--color-muted)] mt-1">
          Link your bank accounts to automatically import transactions.
        </p>
      </div>
      <button
        class="btn-primary flex items-center gap-2"
        :disabled="connecting"
        @click="openPlaidLink"
      >
        <Plus v-if="!connecting" class="w-4 h-4" />
        <Loader2 v-else class="w-4 h-4 animate-spin" />
        {{ connecting ? 'Connecting…' : 'Connect Bank' }}
      </button>
    </div>

    <!-- Error banner -->
    <div
      v-if="error"
      class="card border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm"
    >
      {{ error }}
    </div>

    <!-- Loading skeleton -->
    <div v-if="plaid.loading" class="space-y-3">
      <div
        v-for="n in 2"
        :key="n"
        class="card animate-pulse h-20 bg-[var(--color-surface)]"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!plaid.hasItems"
      class="card flex flex-col items-center justify-center py-16 text-center gap-4"
    >
      <div class="w-14 h-14 rounded-full bg-[var(--color-border)] flex items-center justify-center">
        <Building2 class="w-7 h-7 text-[var(--color-muted)]" />
      </div>
      <div>
        <p class="font-medium text-[var(--color-text)]">No banks connected yet</p>
        <p class="text-sm text-[var(--color-muted)] mt-1">
          Connect a bank account to automatically import transactions and balances.
        </p>
      </div>
      <button class="btn-primary" :disabled="connecting" @click="openPlaidLink">
        Connect your first bank
      </button>
    </div>

    <!-- Connected items list -->
    <div v-else class="space-y-3">
      <div
        v-for="item in plaid.items"
        :key="item.id"
        class="card flex items-center gap-4"
      >
        <!-- Institution icon placeholder -->
        <div class="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
          <Building2 class="w-5 h-5 text-brand-600" />
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-medium text-[var(--color-text)] truncate">
              {{ item.institutionName }}
            </span>
            <span
              :class="[
                'badge text-xs',
                item.status === 'active' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                item.status === 'error' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                item.status === 'pending' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
              ]"
            >
              {{ item.status }}
            </span>
          </div>
          <p class="text-sm text-[var(--color-muted)]">
            <span v-if="item.lastSync">
              Last synced {{ formatRelative(item.lastSync) }}
            </span>
            <span v-else>Never synced</span>
          </p>
          <p v-if="item.error" class="text-xs text-red-500 mt-0.5">{{ item.error }}</p>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            class="btn-secondary flex items-center gap-1.5 text-sm px-3 py-1.5"
            :disabled="plaid.syncing"
            @click="sync(item.id)"
            title="Sync latest transactions"
          >
            <RefreshCw
              class="w-3.5 h-3.5"
              :class="{ 'animate-spin': plaid.syncing && syncingId === item.id }"
            />
            Sync
          </button>
          <button
            class="btn-ghost text-red-500 hover:text-red-600 p-1.5"
            title="Disconnect bank"
            @click="confirmRemove(item)"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Disconnect confirmation modal -->
    <Teleport to="body">
      <div
        v-if="removingItem"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @click.self="removingItem = null"
      >
        <div class="card w-full max-w-sm mx-4 space-y-4">
          <h2 class="font-heading font-semibold text-[var(--color-text)]">
            Disconnect {{ removingItem.institutionName }}?
          </h2>
          <p class="text-sm text-[var(--color-muted)]">
            This will remove the bank connection. Transactions already imported will remain.
          </p>
          <div class="flex justify-end gap-2">
            <button class="btn-ghost" @click="removingItem = null">Cancel</button>
            <button class="btn-danger" :disabled="removing" @click="remove">
              <Loader2 v-if="removing" class="w-4 h-4 animate-spin inline mr-1" />
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Building2, Plus, RefreshCw, Trash2, Loader2 } from 'lucide-vue-next'
import { usePlaidStore, type PlaidLinkMetadata } from '@/stores/plaid'
import type { PlaidItem } from '@/types'

// Plaid Link is loaded from CDN — declare global type
declare global {
  interface Window {
    Plaid?: {
      create(config: {
        token: string
        onSuccess: (publicToken: string, metadata: PlaidLinkMetadata) => void
        onExit: (err: unknown) => void
        onLoad?: () => void
      }): { open(): void; destroy(): void }
    }
  }
}

export default defineComponent({
  name: 'BanksView',
  components: { Building2, Plus, RefreshCw, Trash2, Loader2 },

  setup() {
    const plaid = usePlaidStore()
    return { plaid }
  },

  data() {
    return {
      connecting: false,
      error: null as string | null,
      removingItem: null as PlaidItem | null,
      removing: false,
      syncingId: null as string | null,
    }
  },

  mounted() {
    this.plaid.subscribe()
    this.loadPlaidScript()
  },

  beforeUnmount() {
    this.plaid.unsubscribe()
  },

  methods: {
    loadPlaidScript() {
      if (window.Plaid) return
      const script = document.createElement('script')
      script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js'
      script.async = true
      document.head.appendChild(script)
    },

    async openPlaidLink() {
      if (!window.Plaid) {
        this.error = 'Plaid Link script is still loading — please try again in a moment.'
        return
      }

      this.connecting = true
      this.error = null

      try {
        const linkToken = await this.plaid.createLinkToken()

        const handler = window.Plaid.create({
          token: linkToken,
          onSuccess: async (publicToken, metadata) => {
            try {
              await this.plaid.exchangePublicToken(publicToken, metadata)
            } catch (err) {
              this.error = 'Failed to connect bank account. Please try again.'
              console.error(err)
            } finally {
              this.connecting = false
            }
          },
          onExit: (err) => {
            this.connecting = false
            if (err) {
              console.error('Plaid Link exited with error:', err)
            }
          },
        })

        handler.open()
      } catch (err) {
        this.connecting = false
        this.error =
          err instanceof Error
            ? err.message
            : 'Could not open bank connection. Ensure Plaid is configured.'
        console.error(err)
      }
    },

    async sync(itemId: string) {
      this.syncingId = itemId
      this.error = null
      try {
        await this.plaid.syncItem(itemId)
      } catch (err) {
        this.error = 'Sync failed. Please try again.'
        console.error(err)
      } finally {
        this.syncingId = null
      }
    },

    confirmRemove(item: PlaidItem) {
      this.removingItem = item
    },

    async remove() {
      if (!this.removingItem) return
      this.removing = true
      this.error = null
      try {
        await this.plaid.removeItem(this.removingItem.id)
        this.removingItem = null
      } catch (err) {
        this.error = 'Failed to disconnect bank. Please try again.'
        console.error(err)
      } finally {
        this.removing = false
      }
    },

    formatRelative(iso: string): string {
      const diff = Date.now() - new Date(iso).getTime()
      const minutes = Math.floor(diff / 60_000)
      if (minutes < 1) return 'just now'
      if (minutes < 60) return `${minutes}m ago`
      const hours = Math.floor(minutes / 60)
      if (hours < 24) return `${hours}h ago`
      const days = Math.floor(hours / 24)
      return `${days}d ago`
    },
  },
})
</script>
