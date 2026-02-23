<template>
  <div
    class="flex items-center gap-4 py-3 px-4 transition-colors group"
    :class="[
      transaction.ignore
        ? 'opacity-50 bg-gray-50 dark:bg-gray-800/20'
        : !categoryColor
          ? 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
          : '',
    ]"
    :style="rowStyle"
  >
    <!-- Type indicator -->
    <div
      :class="[
        'w-9 h-9 rounded-full flex items-center justify-center shrink-0',
        transaction.ignore
          ? 'bg-gray-100 dark:bg-gray-800'
          : transaction.type === 'credit'
            ? 'bg-emerald-50 dark:bg-emerald-900/20'
            : 'bg-red-50 dark:bg-red-900/20',
      ]"
    >
      <EyeOff v-if="transaction.ignore" class="w-4 h-4 text-gray-400" />
      <ArrowDownLeft
        v-else-if="transaction.type === 'credit'"
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
        <span
          v-if="transaction.ignore"
          class="badge text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800"
        >
          Ignored
        </span>
        <CategoryBadge v-else :category="transaction.category" />
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
        transaction.ignore
          ? 'text-gray-400'
          : transaction.type === 'credit'
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-gray-900 dark:text-white',
      ]"
    >
      {{ transaction.type === 'credit' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
    </p>

    <!-- Category selector -->
    <div class="shrink-0 w-44">
      <SelectMenu
        :options="categoryOptions"
        :model-value="transaction.ignore ? '__ignore__' : transaction.category"
        placeholder="Set category…"
        search-placeholder="Search categories…"
        @selected="onCategorySelected"
      />
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
import { ArrowUpRight, ArrowDownLeft, EyeOff } from 'lucide-vue-next'
import CategoryBadge from '@/components/ui/CategoryBadge.vue'
import CustomCategoryModal from '@/components/ui/CustomCategoryModal.vue'
import SelectMenu from '@/components/ui/Select.vue'
import type { SelectOption } from '@/components/ui/Select.vue'
import { useTransactionsStore } from '@/stores/transactions'
import { useCategoriesStore } from '@/stores/categories'
import { useAccountsStore } from '@/stores/accounts'
import { formatCurrency, formatDate } from '@/lib/currency'
import { formatAccountName } from '@/lib/account'
import type { Transaction, Category } from '@/types'

const IGNORE_ID = '__ignore__'
const ADD_CATEGORY_ID = '__add_category__'

export default defineComponent({
  name: 'TransactionRow',
  components: { ArrowUpRight, ArrowDownLeft, EyeOff, CategoryBadge, CustomCategoryModal, SelectMenu },
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
    accountName(): string {
      const account = this.accountsStore.byId[this.transaction.accountId]
      return account ? formatAccountName(account) : ''
    },

    categoryColor(): string {
      if (this.transaction.ignore) return ''
      return this.categoriesStore.colorFor(this.transaction.category)
    },

    rowStyle(): Record<string, string> {
      if (!this.categoryColor) return {}
      return { backgroundColor: `${this.categoryColor}26` }
    },

    categoryOptions(): Record<string, SelectOption> {
      const opts: Record<string, SelectOption> = {}

      // All categories with colors
      for (const cat of this.categoriesStore.categories) {
        opts[cat.name] = {
          text: cat.emoji ? `${cat.emoji} ${cat.name}` : cat.name,
          color: cat.color,
        }
      }

      // Divider before special actions
      opts['__divider_1__'] = { text: '', divider: true }

      // Ignore option
      opts[IGNORE_ID] = { text: '🚫 Ignore this transaction' }

      // Add category option
      opts[ADD_CATEGORY_ID] = { text: '+ Add custom category…' }

      return opts
    },
  },

  methods: {
    formatCurrency,
    formatDate,

    onCategorySelected(id: string) {
      if (id === IGNORE_ID) {
        this.transactionsStore.setIgnore(this.transaction.id, true)
      } else if (id === ADD_CATEGORY_ID) {
        this.showCustomModal = true
      } else {
        // Un-ignore if the transaction was previously ignored
        if (this.transaction.ignore) {
          this.transactionsStore.updateTransaction(this.transaction.id, {
            category: id,
            ignore: false,
          })
        } else {
          this.transactionsStore.updateCategory(this.transaction.id, id)
        }
      }
    },

    onCategoryCreated(cat: Category) {
      this.transactionsStore.updateTransaction(this.transaction.id, {
        category: cat.name,
        ignore: false,
      })
    },
  },
})
</script>
