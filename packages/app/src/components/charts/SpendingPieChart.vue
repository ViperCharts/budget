<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-heading font-semibold text-gray-900 dark:text-white">
        Spending by Category
      </h3>
      <span class="text-xs text-gray-500 font-body">{{ period }}</span>
    </div>

    <div v-if="!hasData" class="py-8 text-center text-gray-400 text-sm font-body">
      No spending data yet
    </div>

    <div v-show="hasData" ref="chartEl" style="height: 260px;" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { PieChart } from '@viper/viper.js'
import { useCategoriesStore } from '@/stores/categories'
import { useThemeStore } from '@/stores/theme'
import { formatCurrency, formatPeriod } from '@/lib/currency'

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

  setup() {
    const categoriesStore = useCategoriesStore()
    const themeStore = useThemeStore()
    return { categoriesStore, themeStore }
  },

  data() {
    return {
      pieChart: null as InstanceType<typeof PieChart> | null,
    }
  },

  computed: {
    isDark(): boolean {
      return (
        this.themeStore.mode === 'dark' ||
        (this.themeStore.mode === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      )
    },
    period(): string {
      return formatPeriod(this.activePeriod)
    },
    hasData(): boolean {
      return Object.values(this.byCategory).some((v) => v > 0)
    },
    total(): number {
      return Object.values(this.byCategory).reduce((s, v) => s + v, 0)
    },
    slices() {
      if (this.total === 0) return []
      return Object.entries(this.byCategory)
        .filter(([, v]) => v > 0)
        .sort(([, a], [, b]) => b - a)
        .map(([name, amount]) => ({
          label: `${name} · ${formatCurrency(amount)}`,
          value: (amount / this.total) * 100,
          color: this.categoriesStore.colorFor(name),
        }))
    },
  },

  watch: {
    slices(slices) {
      if (this.pieChart) {
        this.pieChart.state.slices = slices
        this.pieChart.state.centerValue = formatCurrency(this.total)
      }
    },
    isDark(dark: boolean) {
      if (this.pieChart) {
        this.pieChart.settings.darkMode = dark
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },

  beforeUnmount() {
    this.pieChart?.unmount()
    this.pieChart = null
  },

  methods: {
    initChart() {
      const el = this.$refs.chartEl as HTMLElement
      if (!el) return
      this.pieChart = new PieChart({
        el,
        state: {
          slices: this.slices,
          centerLabel: 'Total',
          centerValue: formatCurrency(this.total),
        },
        settings: {
          innerRadiusRatio: 0.6,
          showLegend: true,
          darkMode: this.isDark,
        },
      })
    },
  },
})
</script>
