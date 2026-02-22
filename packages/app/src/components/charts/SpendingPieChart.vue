<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-heading font-semibold text-gray-900 dark:text-white">
        Spending by Category
      </h3>
      <span class="text-xs text-gray-500 font-body">{{ period }}</span>
    </div>

    <div v-if="slices.length === 0" class="py-8 text-center text-gray-400 text-sm font-body">
      No spending data yet
    </div>

    <div v-else class="flex flex-col md:flex-row gap-6 items-center">
      <!-- SVG Pie -->
      <div class="relative shrink-0" style="width: 180px; height: 180px;">
        <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
          <circle
            v-for="(slice, i) in svgSlices"
            :key="i"
            r="40"
            cx="50"
            cy="50"
            fill="transparent"
            :stroke="slice.color"
            stroke-width="20"
            :stroke-dasharray="`${slice.dash} ${circumference}`"
            :stroke-dashoffset="-slice.offset"
            class="transition-all duration-300"
            @mouseenter="hoveredIdx = i"
            @mouseleave="hoveredIdx = null"
          />
        </svg>
        <!-- Center label -->
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p v-if="hoveredIdx !== null" class="text-xs font-heading font-semibold text-gray-900 dark:text-white leading-tight px-2">
            {{ slices[hoveredIdx]?.name }}
          </p>
          <p v-if="hoveredIdx !== null" class="text-sm font-heading font-bold text-gray-900 dark:text-white">
            {{ formatCurrency(slices[hoveredIdx]?.amount ?? 0) }}
          </p>
          <p v-if="hoveredIdx === null" class="text-xs text-gray-500 font-body">Total</p>
          <p v-if="hoveredIdx === null" class="text-sm font-heading font-bold text-gray-900 dark:text-white">
            {{ formatCurrency(total) }}
          </p>
        </div>
      </div>

      <!-- Legend -->
      <div class="flex-1 space-y-2 min-w-0">
        <div
          v-for="(slice, i) in slices"
          :key="slice.name"
          :class="['flex items-center gap-2 cursor-default', hoveredIdx === i ? 'opacity-100' : 'opacity-80']"
          @mouseenter="hoveredIdx = i"
          @mouseleave="hoveredIdx = null"
        >
          <div class="w-3 h-3 rounded-full shrink-0" :style="{ backgroundColor: slice.color }" />
          <span class="text-xs text-gray-700 dark:text-gray-300 flex-1 truncate font-body">{{ slice.name }}</span>
          <span class="text-xs font-heading font-semibold text-gray-900 dark:text-white shrink-0">
            {{ formatCurrency(slice.amount) }}
          </span>
          <span class="text-xs text-gray-400 shrink-0 w-10 text-right font-body">
            {{ slice.percent.toFixed(0) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { formatCurrency, formatPeriod } from '@/lib/currency'

interface SpendingSlice {
  name: string
  amount: number
  color: string
  percent: number
}

export default defineComponent({
  name: 'SpendingPieChart',
  props: {
    byCategory: {
      type: Object as PropType<Record<string, number>>,
      required: true,
    },
    activePeriod: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      hoveredIdx: null as number | null,
    }
  },

  computed: {
    period(): string {
      return formatPeriod(this.activePeriod)
    },
    circumference(): number {
      return 2 * Math.PI * 40
    },
    total(): number {
      return Object.values(this.byCategory).reduce((s, v) => s + v, 0)
    },
    slices(): SpendingSlice[] {
      const catStore = useCategoriesStore()
      return Object.entries(this.byCategory)
        .filter(([, v]) => v > 0)
        .sort(([, a], [, b]) => b - a)
        .map(([name, amount]) => ({
          name,
          amount,
          color: catStore.colorFor(name),
          percent: this.total > 0 ? (amount / this.total) * 100 : 0,
        }))
    },
    svgSlices() {
      let offset = 0
      return this.slices.map((s) => {
        const dash = (s.percent / 100) * this.circumference
        const result = { color: s.color, dash, offset }
        offset += dash
        return result
      })
    },
  },

  methods: { formatCurrency },
})
</script>
