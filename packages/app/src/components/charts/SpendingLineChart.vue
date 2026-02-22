<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-heading font-semibold text-gray-900 dark:text-white">
        Monthly Spending
      </h3>
    </div>

    <div v-if="points.length < 2" class="py-8 text-center text-gray-400 text-sm font-body">
      Upload at least 2 months of statements to see trends
    </div>

    <div v-else>
      <svg
        :viewBox="`0 0 ${width} ${height}`"
        class="w-full"
        :style="{ height: `${height}px` }"
        @mousemove="onMouseMove"
        @mouseleave="hoveredIdx = null"
      >
        <!-- Grid lines -->
        <line
          v-for="(label, i) in yLabels"
          :key="i"
          :x1="paddingLeft"
          :y1="yScale(label.value)"
          :x2="width - paddingRight"
          :y2="yScale(label.value)"
          stroke="currentColor"
          class="text-gray-100 dark:text-gray-800"
          stroke-width="1"
        />

        <!-- Y labels -->
        <text
          v-for="(label, i) in yLabels"
          :key="`yl-${i}`"
          :x="paddingLeft - 8"
          :y="yScale(label.value) + 4"
          text-anchor="end"
          class="text-gray-400 fill-current"
          font-size="10"
          font-family="Montserrat, sans-serif"
        >
          {{ label.text }}
        </text>

        <!-- Area fill -->
        <path
          :d="areaPath"
          fill="url(#spendGrad)"
          opacity="0.3"
        />

        <!-- Line -->
        <path
          :d="linePath"
          fill="none"
          stroke="#22c55e"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Gradient def -->
        <defs>
          <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#22c55e" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#22c55e" stop-opacity="0" />
          </linearGradient>
        </defs>

        <!-- Dots -->
        <g v-for="(p, i) in plotPoints" :key="`dot-${i}`">
          <circle
            :cx="p.x"
            :cy="p.y"
            r="4"
            fill="#22c55e"
            :opacity="hoveredIdx === i ? 1 : 0.7"
            @mouseenter="hoveredIdx = i"
          />
        </g>

        <!-- X labels -->
        <text
          v-for="(p, i) in plotPoints"
          :key="`xl-${i}`"
          :x="p.x"
          :y="height - 4"
          text-anchor="middle"
          class="text-gray-400 fill-current"
          font-size="9"
          font-family="Montserrat, sans-serif"
        >
          {{ p.label }}
        </text>
      </svg>

      <!-- Tooltip -->
      <div v-if="hoveredIdx !== null" class="mt-2 text-center">
        <p class="text-xs text-gray-500 font-body">{{ points[hoveredIdx].period }}</p>
        <p class="font-heading font-semibold text-gray-900 dark:text-white">
          {{ formatCurrency(points[hoveredIdx].total) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { MonthlySpending } from '@/types'
import { formatCurrency, formatPeriod } from '@/lib/currency'

interface PlotPoint {
  x: number
  y: number
  label: string
}

export default defineComponent({
  name: 'SpendingLineChart',
  props: {
    points: {
      type: Array as PropType<MonthlySpending[]>,
      required: true,
    },
  },

  data() {
    return {
      width: 600,
      height: 200,
      paddingLeft: 60,
      paddingRight: 20,
      paddingTop: 16,
      paddingBottom: 28,
      hoveredIdx: null as number | null,
    }
  },

  computed: {
    maxVal(): number {
      return Math.max(...this.points.map((p) => p.total), 1)
    },
    plotPoints(): PlotPoint[] {
      const n = this.points.length
      return this.points.map((p, i) => ({
        x: this.paddingLeft + (i / (n - 1 || 1)) * (this.width - this.paddingLeft - this.paddingRight),
        y: this.yScale(p.total),
        label: formatPeriod(p.period).split(' ')[0].slice(0, 3),
      }))
    },
    linePath(): string {
      return this.plotPoints
        .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
        .join(' ')
    },
    areaPath(): string {
      const bottom = this.height - this.paddingBottom
      const pts = this.plotPoints
      const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
      return `${line} L${pts[pts.length - 1]?.x ?? 0},${bottom} L${pts[0]?.x ?? 0},${bottom} Z`
    },
    yLabels(): { value: number; text: string }[] {
      const steps = 4
      return Array.from({ length: steps + 1 }, (_, i) => {
        const v = (this.maxVal / steps) * i
        return { value: v, text: formatCurrency(v, 'USD', true) }
      })
    },
  },

  methods: {
    yScale(val: number): number {
      const range = this.height - this.paddingTop - this.paddingBottom
      return this.height - this.paddingBottom - (val / (this.maxVal || 1)) * range
    },
    onMouseMove(e: MouseEvent) {
      const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      let closest = 0
      let minDist = Infinity
      this.plotPoints.forEach((p, i) => {
        const dist = Math.abs(p.x - x)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })
      this.hoveredIdx = closest
    },
    formatCurrency,
  },
})
</script>
