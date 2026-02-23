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
        <span
          v-if="accountName"
          class="text-xs text-gray-400 font-body opacity-0 group-hover:opacity-100 transition-opacity"
        >
          · {{ accountName }}
        </span>
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

    <!-- Category selector -->
    <div class="shrink-0">
      <select
        :value="transaction.category"
        class="text-xs border border-[var(--color-border)] bg-[var(--color-surface)] text-gray-700 dark:text-gray-200 cursor-pointer rounded px-1.5 py-1 focus:ring-1 focus:ring-brand-500 focus:outline-none max-w-[160px]"
        title="Change category"
        @change="onSelectChange"
      >
        <optgroup label="Categories">
          <option v-for="cat in allCategoryNames" :key="cat" :value="cat">{{ categoryLabel(cat) }}</option>
        </optgroup>
        <optgroup label="Custom">
          <option value="__custom__">+ Add custom category…</option>
        </optgroup>
      </select>
    </div>

    <!-- Custom category modal -->
    <CustomCategoryModal
      v-model="showCustomModal"
      @created="onCategoryCreated"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-vue-next'
import CategoryBadge from '@/components/ui/CategoryBadge.vue'
import CustomCategoryModal from '@/components/ui/CustomCategoryModal.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { useCategoriesStore } from '@/stores/categories'
import { useAccountsStore } from '@/stores/accounts'
import { formatCurrency, formatDate } from '@/lib/currency'
import { formatAccountName } from '@/lib/account'
import type { Transaction, Category } from '@/types'

export default defineComponent({
  name: 'TransactionRow',
  components: { ArrowUpRight, ArrowDownLeft, CategoryBadge, CustomCategoryModal },
  props: {
    transaction: {
      type: Object as PropType<Transaction>,
      required: true,
    },
  },

  setup() {
    const transactionsStore = useTransactionsStore()
    const categoriesStore = useCategoriesStore()
    const accountsStore = useAccountsStore()
    return { transactionsStore, categoriesStore, accountsStore }
  },

  data() {
    return {
      showCustomModal: false,
    }
  },

  computed: {
    allCategoryNames(): string[] {
      return this.categoriesStore.names
    },
    accountName(): string {
      const account = this.accountsStore.byId[this.transaction.accountId]
      return account ? formatAccountName(account) : ''
    },
  },

  methods: {
    formatCurrency,
    formatDate,

    categoryLabel(name: string): string {
      const emoji = this.categoriesStore.emojiFor(name)
      return emoji ? `${emoji} ${name}` : name
    },

    onSelectChange(e: Event) {
      const select = e.target as HTMLSelectElement
      const val = select.value

      if (val === '__custom__') {
        // Reset the select to current transaction category so it doesn't display __custom__
        select.value = this.transaction.category
        this.showCustomModal = true
      } else {
        this.transactionsStore.updateCategory(this.transaction.id, val)
      }
    },

    onCategoryCreated(cat: Category) {
      this.transactionsStore.updateCategory(this.transaction.id, cat.name)
    },
  },
})
</script>
