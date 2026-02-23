<template>
  <div class="space-y-4 md:space-y-6 max-w-4xl">
    <div>
      <h2 class="font-heading font-bold text-lg md:text-xl text-gray-900 dark:text-white">Budget</h2>
      <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-body">
        Plan and track your monthly spending goals
      </p>
    </div>

    <!-- Unbudgeted categories alert -->
    <div
      v-if="unbudgetedCount > 0"
      class="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 md:p-4 dark:border-amber-800/40 dark:bg-amber-900/10"
    >
      <AlertTriangle class="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div>
        <p class="text-sm font-heading font-medium text-amber-800 dark:text-amber-300">
          {{ unbudgetedCount }} {{ unbudgetedCount === 1 ? 'category has' : 'categories have' }} no budget set
        </p>
        <p class="text-xs text-amber-700 dark:text-amber-400 font-body mt-0.5 hidden sm:block">
          You have spending in {{ unbudgetedCount === 1 ? 'a category' : 'categories' }} without a budget limit.
          Click the edit icon on any highlighted item below to set a limit.
        </p>
      </div>
    </div>

    <!-- Summary bar -->
    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <div>
          <p class="text-[10px] md:text-xs text-gray-500 font-body uppercase tracking-wider">
            Budget used
          </p>
          <p class="font-heading font-bold text-xl md:text-2xl text-gray-900 dark:text-white">
            {{ formatCurrency(totalSpent) }}
            <span class="text-xs md:text-sm text-gray-400 font-normal">/ {{ formatCurrency(budgetStore.totalBudgeted) }}</span>
          </p>
        </div>
        <div class="text-right">
          <p class="text-[10px] md:text-xs text-gray-500 font-body">Remaining</p>
          <p :class="['font-heading font-bold text-base md:text-lg', remaining >= 0 ? 'text-emerald-600' : 'text-red-500']">
            {{ formatCurrency(Math.abs(remaining)) }}
            {{ remaining < 0 ? 'over' : 'left' }}
          </p>
        </div>
      </div>
      <!-- Overall progress bar -->
      <div class="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          :class="['h-full rounded-full transition-all duration-300', overallPct > 100 ? 'bg-red-500' : overallPct > 80 ? 'bg-amber-500' : 'bg-brand-500']"
          :style="{ width: `${Math.min(overallPct, 100)}%` }"
        />
      </div>
    </div>

    <!-- Budget items -->
    <div class="space-y-3">
      <div
        v-for="item in budgetStore.progress"
        :key="item.categoryId"
        :class="['card', item.unbudgeted && 'border border-amber-200 dark:border-amber-800/40']"
      >
        <div class="flex items-start sm:items-center justify-between mb-2 gap-2">
          <div class="flex items-center gap-2 min-w-0 flex-wrap">
            <div class="w-3 h-3 rounded-full shrink-0" :style="{ backgroundColor: item.color }" />
            <span class="font-heading font-medium text-sm text-gray-900 dark:text-white truncate">
              {{ item.categoryName }}
            </span>
            <span v-if="item.over" class="badge bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-heading text-[10px] md:text-xs">
              Over
            </span>
            <span v-if="item.unbudgeted" class="badge bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 font-heading text-[10px] md:text-xs">
              No limit
            </span>
          </div>
          <div class="flex items-center gap-1 md:gap-2 shrink-0">
            <span class="text-xs md:text-sm font-heading text-gray-700 dark:text-gray-300">
              {{ formatCurrency(item.spent) }}
            </span>
            <span v-if="!item.unbudgeted" class="text-[10px] md:text-xs text-gray-400 font-body hidden sm:inline">/ {{ formatCurrency(item.limit) }}</span>
            <button
              class="btn-ghost p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              @click="openEdit(item.categoryId, item.categoryName, item.limit)"
              :title="item.unbudgeted ? 'Set budget' : 'Edit budget'"
            >
              <Pencil class="w-3.5 h-3.5" />
            </button>
            <button
              v-if="!item.unbudgeted"
              class="btn-ghost p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-red-400 hover:text-red-600"
              @click="budgetStore.removeItem(item.id)"
              title="Remove budget"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div class="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            v-if="!item.unbudgeted"
            :class="['h-full rounded-full transition-all duration-300', item.over ? 'bg-red-500' : item.percent > 80 ? 'bg-amber-500' : 'bg-brand-500']"
            :style="{ width: `${item.percent}%`, backgroundColor: !item.over && item.percent <= 80 ? item.color : undefined }"
          />
        </div>
        <p v-if="!item.unbudgeted" class="text-xs text-gray-400 mt-1 font-body">{{ item.percent.toFixed(0) }}% used</p>
        <p v-else class="text-xs text-amber-600 dark:text-amber-400 mt-1 font-body">
          Set a budget limit to track this spending
        </p>
      </div>

      <!-- Add category button -->
      <button class="btn-secondary w-full justify-center min-h-[44px]" @click="showAddModal = true">
        <Plus class="w-4 h-4" /> Add Budget Category
      </button>
    </div>

    <!-- Add/Edit modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-all duration-200"
        leave-to-class="opacity-0"
      >
        <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal" />
          <div class="relative card shadow-xl w-full max-w-sm z-10 rounded-b-none md:rounded-b-xl">
            <h3 class="font-heading font-semibold text-gray-900 dark:text-white mb-4">
              {{ editingId ? 'Edit Budget' : 'Add Budget' }}
            </h3>

            <div class="space-y-4">
              <div v-if="!editingId">
                <label class="label">Category</label>
                <select v-model="modalCategory" class="input min-h-[44px]">
                  <option v-for="cat in availableCategories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div v-else>
                <label class="label">Category</label>
                <p class="text-sm text-gray-700 dark:text-gray-300 font-body">{{ editingName }}</p>
              </div>

              <div>
                <label class="label">Monthly Limit</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    v-model.number="modalAmount"
                    type="number"
                    min="0"
                    step="10"
                    class="input pl-7 min-h-[44px]"
                    placeholder="500"
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-end gap-2 mt-6">
              <button class="btn-secondary min-h-[44px]" @click="closeModal">Cancel</button>
              <button class="btn-primary min-h-[44px]" @click="saveModal" :disabled="!modalAmount">
                Save
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-vue-next'
import { useBudgetStore } from '@/stores/budget'
import { useCategoriesStore } from '@/stores/categories'
import { formatCurrency } from '@/lib/currency'

export default defineComponent({
  name: 'BudgetView',
  components: { Plus, Pencil, Trash2, AlertTriangle },

  setup() {
    const budgetStore = useBudgetStore()
    const catStore = useCategoriesStore()
    return { budgetStore, catStore }
  },

  data() {
    return {
      showAddModal: false,
      editingId: '',
      editingName: '',
      modalCategory: '',
      modalAmount: 0,
    }
  },

  computed: {
    totalSpent(): number {
      return this.budgetStore.progress.reduce((s, i) => s + i.spent, 0)
    },
    remaining(): number {
      return this.budgetStore.totalBudgeted - this.totalSpent
    },
    overallPct(): number {
      if (!this.budgetStore.totalBudgeted) return 0
      return (this.totalSpent / this.budgetStore.totalBudgeted) * 100
    },
    unbudgetedCount(): number {
      return this.budgetStore.progress.filter((p) => p.unbudgeted).length
    },
    availableCategories() {
      // Exclude categories already in progress (budgeted or unbudgeted) and internal transfers
      const inProgress = new Set(this.budgetStore.progress.map((p) => p.categoryId))
      return this.catStore.categories.filter((c) => !inProgress.has(c.id) && !c.isInternalTransfer)
    },
  },

  methods: {
    formatCurrency,

    openEdit(categoryId: string, name: string, limit: number) {
      this.editingId = categoryId
      this.editingName = name
      this.modalAmount = limit
      this.showAddModal = true
    },

    closeModal() {
      this.showAddModal = false
      this.editingId = ''
      this.editingName = ''
      this.modalCategory = ''
      this.modalAmount = 0
    },

    saveModal() {
      const catId = this.editingId || this.modalCategory
      if (!catId || !this.modalAmount) return
      this.budgetStore.upsertItem(catId, this.modalAmount)
      this.closeModal()
    },
  },
})
</script>
