<template>
  <div class="flex items-center gap-4 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
    <!-- Type indicator -->
    <div
      :class="[
        'w-9 h-9 rounded-full flex items-center justify-center shrink-0',
        transaction.type === 'credit'
          ? 'bg-emerald-50 dark:bg-emerald-900/20'
          : 'bg-red-50 dark:bg-red-900/20',
      ]"
    >
      <ArrowDownLeft
        v-if="transaction.type === 'credit'"
        class="w-4 h-4 text-emerald-600"
      />
      <ArrowUpRight v-else class="w-4 h-4 text-red-500" />
    </div>

    <!-- Description + category -->
    <div class="flex-1 min-w-0">
      <p class="text-sm font-heading font-medium text-gray-900 dark:text-white truncate">
        {{ transaction.description }}
      </p>
      <div class="flex items-center gap-2 mt-0.5">
        <CategoryBadge :category="transaction.category" />
        <span class="text-xs text-gray-400 font-body">{{ formatDate(transaction.date) }}</span>
      </div>
    </div>

    <!-- Amount -->
    <p
      :class="[
        'font-heading font-semibold text-sm shrink-0',
        transaction.type === 'credit'
          ? 'text-emerald-600 dark:text-emerald-400'
          : 'text-gray-900 dark:text-white',
      ]"
    >
      {{ transaction.type === 'credit' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
    </p>

    <!-- Edit category (hover) -->
    <div class="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
      <select
        :value="transaction.category"
        class="text-xs border-0 bg-transparent text-gray-400 cursor-pointer focus:ring-1 focus:ring-brand-500 rounded"
        @change="updateCategory"
        title="Change category"
      >
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-vue-next'
import CategoryBadge from '@/components/ui/CategoryBadge.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { useCategoriesStore } from '@/stores/categories'
import { formatCurrency, formatDate } from '@/lib/currency'
import type { Transaction } from '@/types'

export default defineComponent({
  name: 'TransactionRow',
  components: { ArrowUpRight, ArrowDownLeft, CategoryBadge },
  props: {
    transaction: {
      type: Object as PropType<Transaction>,
      required: true,
    },
  },

  computed: {
    categories(): string[] {
      return useCategoriesStore().names
    },
  },

  methods: {
    formatCurrency,
    formatDate,
    async updateCategory(e: Event) {
      const cat = (e.target as HTMLSelectElement).value
      await useTransactionsStore().updateCategory(this.transaction.id, cat)
    },
  },
})
</script>
