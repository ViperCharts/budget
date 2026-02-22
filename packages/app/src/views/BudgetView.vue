<template>
  <div class="space-y-6 max-w-4xl">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="font-heading font-bold text-xl text-gray-900 dark:text-white">Budget</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-body">
          Plan and track your monthly spending goals
        </p>
      </div>

      <!-- Period picker -->
      <div class="flex items-center gap-2">
        <button class="btn-ghost p-1.5" @click="prevPeriod">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <span class="font-heading font-semibold text-sm text-gray-900 dark:text-white w-36 text-center">
          {{ formatPeriod(budgetStore.activePeriod) }}
        </span>
        <button class="btn-ghost p-1.5" @click="nextPeriod" :disabled="isCurrentPeriod">
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Summary bar -->
    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <div>
          <p class="text-xs text-gray-500 font-body uppercase tracking-wider">
            Budget used
          </p>
          <p class="font-heading font-bold text-2xl text-gray-900 dark:text-white">
            {{ formatCurrency(totalSpent) }}
            <span class="text-sm text-gray-400 font-normal">/ {{ formatCurrency(budgetStore.totalBudgeted) }}</span>
          </p>
        </div>
        <div class="text-right">
          <p class="text-xs text-gray-500 font-body">Remaining</p>
          <p :class="['font-heading font-bold text-lg', remaining >= 0 ? 'text-emerald-600' : 'text-red-500']">
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
        class="card"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: item.color }" />
            <span class="font-heading font-medium text-sm text-gray-900 dark:text-white">
              {{ item.categoryName }}
            </span>
            <span v-if="item.over" class="badge bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-heading text-xs">
              Over budget
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-heading text-gray-700 dark:text-gray-300">
              {{ formatCurrency(item.spent) }}
            </span>
            <span class="text-xs text-gray-400 font-body">/ {{ formatCurrency(item.limit) }}</span>
            <button
              class="btn-ghost p-1 ml-1"
              @click="openEdit(item.categoryId, item.categoryName, item.limit)"
              title="Edit budget"
            >
              <Pencil class="w-3.5 h-3.5" />
            </button>
            <button
              class="btn-ghost p-1 text-red-400 hover:text-red-600"
              @click="budgetStore.removeItem(budgetStore.activeItems.find(i => i.categoryId === item.categoryId)?.id ?? '')"
              title="Remove budget"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div class="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            :class="['h-full rounded-full transition-all duration-300', item.over ? 'bg-red-500' : item.percent > 80 ? 'bg-amber-500' : 'bg-brand-500']"
            :style="{ width: `${item.percent}%`, backgroundColor: !item.over && item.percent <= 80 ? item.color : undefined }"
          />
        </div>
        <p class="text-xs text-gray-400 mt-1 font-body">{{ item.percent.toFixed(0) }}% used</p>
      </div>

      <!-- Add category button -->
      <button class="btn-secondary w-full justify-center" @click="showAddModal = true">
        <Plus class="w-4 h-4" /> Add Budget Category
      </button>
    </div>

    <!-- Add/Edit modal -->
    <Teleport to="body">
      <Transition enter-active-class="transition-opacity duration-150" enter-from-class="opacity-0" leave-active-class="transition-opacity duration-150" leave-to-class="opacity-0">
        <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal" />
          <div class="relative card shadow-xl w-full max-w-sm z-10">
            <h3 class="font-heading font-semibold text-gray-900 dark:text-white mb-4">
              {{ editingId ? 'Edit Budget' : 'Add Budget' }}
            </h3>

            <div class="space-y-4">
              <div v-if="!editingId">
                <label class="label">Category</label>
                <select v-model="modalCategory" class="input">
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
                    class="input pl-7"
                    placeholder="500"
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-end gap-2 mt-6">
              <button class="btn-secondary" @click="closeModal">Cancel</button>
              <button class="btn-primary" @click="saveModal" :disabled="!modalAmount">
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
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2 } from 'lucide-vue-next'
import { useBudgetStore } from '@/stores/budget'
import { useCategoriesStore } from '@/stores/categories'
import { formatCurrency, formatPeriod, currentPeriod } from '@/lib/currency'

export default defineComponent({
  name: 'BudgetView',
  components: { ChevronLeft, ChevronRight, Plus, Pencil, Trash2 },

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
    budgetStore() {
      return useBudgetStore()
    },
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
    isCurrentPeriod(): boolean {
      return this.budgetStore.activePeriod === currentPeriod()
    },
    availableCategories() {
      const catStore = useCategoriesStore()
      const existingIds = new Set(
        this.budgetStore.activeItems.map((i) => i.categoryId),
      )
      return catStore.categories.filter((c) => !existingIds.has(c.id))
    },
  },

  methods: {
    formatCurrency,
    formatPeriod,

    prevPeriod() {
      const [year, month] = this.budgetStore.activePeriod.split('-').map(Number)
      const d = new Date(year, month - 2, 1)
      this.budgetStore.setPeriod(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      )
    },

    nextPeriod() {
      const [year, month] = this.budgetStore.activePeriod.split('-').map(Number)
      const d = new Date(year, month, 1)
      this.budgetStore.setPeriod(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      )
    },

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
