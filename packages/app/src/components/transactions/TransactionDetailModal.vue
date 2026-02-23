<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue && transaction"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="$emit('update:modelValue', false)"
        />

        <!-- Dialog -->
        <div class="relative card shadow-xl max-w-sm w-full z-10">
          <!-- Header -->
          <div class="flex items-start justify-between gap-3 mb-5">
            <div class="flex items-center gap-3 min-w-0">
              <div
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                  transaction.type === 'credit'
                    ? 'bg-emerald-50 dark:bg-emerald-900/20'
                    : 'bg-red-50 dark:bg-red-900/20',
                ]"
              >
                <ArrowDownLeft
                  v-if="transaction.type === 'credit'"
                  class="w-5 h-5 text-emerald-600"
                />
                <ArrowUpRight v-else class="w-5 h-5 text-red-500" />
              </div>
              <div class="min-w-0">
                <h3
                  class="font-heading font-semibold text-gray-900 dark:text-white leading-snug"
                >
                  {{ transaction.description }}
                </h3>
                <p class="text-xs text-gray-500 font-body mt-0.5">
                  {{ formatDate(transaction.date) }}
                </p>
              </div>
            </div>
            <button
              class="btn-ghost p-1 -mt-1 -mr-1 shrink-0"
              @click="$emit('update:modelValue', false)"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Amount -->
          <div
            class="text-center py-5 mb-5 rounded-lg bg-gray-50 dark:bg-gray-800/40"
          >
            <p
              class="text-xs font-body text-gray-500 uppercase tracking-wider mb-1"
            >
              {{ transaction.type === 'credit' ? 'Income' : 'Expense' }}
            </p>
            <p
              :class="[
                'font-heading font-bold text-3xl',
                transaction.type === 'credit'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-500',
              ]"
            >
              {{ transaction.type === 'credit' ? '+' : '-'
              }}{{ formatCurrency(transaction.amount) }}
            </p>
          </div>

          <!-- Metadata rows -->
          <dl class="space-y-3 mb-5">
            <div class="flex items-center justify-between">
              <dt class="text-sm font-body text-gray-500">Category</dt>
              <dd>
                <CategoryBadge :category="transaction.category" />
              </dd>
            </div>

            <div
              v-if="transaction.pending"
              class="flex items-center justify-between"
            >
              <dt class="text-sm font-body text-gray-500">Status</dt>
              <dd>
                <span
                  class="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-heading"
                >
                  Pending
                </span>
              </dd>
            </div>

            <div
              v-if="transaction.notes"
              class="flex items-start justify-between gap-4"
            >
              <dt class="text-sm font-body text-gray-500 shrink-0">Notes</dt>
              <dd
                class="text-sm font-body text-gray-700 dark:text-gray-300 text-right"
              >
                {{ transaction.notes }}
              </dd>
            </div>

            <div class="flex items-center justify-between">
              <dt class="text-sm font-body text-gray-500">Account</dt>
              <dd
                class="text-sm font-body text-gray-700 dark:text-gray-300 truncate max-w-[180px] text-right"
              >
                {{ accountName }}
              </dd>
            </div>
          </dl>

          <div class="flex justify-end">
            <button
              class="btn-secondary"
              @click="$emit('update:modelValue', false)"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { ArrowUpRight, ArrowDownLeft, X } from 'lucide-vue-next'
import CategoryBadge from '@/components/ui/CategoryBadge.vue'
import { formatCurrency, formatDate } from '@/lib/currency'
import { formatAccountName } from '@/lib/account'
import { useAccountsStore } from '@/stores/accounts'
import type { Transaction } from '@/types'

export default defineComponent({
  name: 'TransactionDetailModal',
  components: { ArrowUpRight, ArrowDownLeft, X, CategoryBadge },
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Boolean, required: true },
    transaction: {
      type: Object as PropType<Transaction | null>,
      default: null,
    },
  },

  setup() {
    const accountsStore = useAccountsStore()
    return { accountsStore }
  },

  computed: {
    accountName(): string {
      if (!this.transaction) return ''
      const account = this.accountsStore.byId[this.transaction.accountId]
      return account ? formatAccountName(account) : this.transaction.accountId
    },
  },

  methods: { formatCurrency, formatDate },
})
</script>
