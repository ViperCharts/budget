<template>
  <div>
    <!-- Month navigator -->
    <div class="flex items-center justify-between mb-4">
      <h3
        class="font-heading font-semibold text-lg text-gray-900 dark:text-white"
      >
        {{ monthLabel }}
      </h3>
      <div class="flex items-center gap-1">
        <button class="btn-ghost px-2 py-1.5" title="Previous month" @click="prevMonth">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <button class="btn-secondary px-3 py-1.5 text-sm" @click="goToToday">
          Today
        </button>
        <button class="btn-ghost px-2 py-1.5" title="Next month" @click="nextMonth">
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Day-of-week header row -->
    <div
      class="grid grid-cols-7 border-l border-t border-[var(--color-border)] rounded-tl-lg rounded-tr-lg overflow-hidden"
    >
      <div
        v-for="label in DAY_LABELS"
        :key="label"
        class="border-r border-b border-[var(--color-border)] bg-gray-50 dark:bg-gray-800/60 py-2 text-center text-xs font-heading font-semibold text-gray-400 uppercase tracking-wider"
      >
        {{ label }}
      </div>
    </div>

    <!-- Calendar grid -->
    <div
      class="grid grid-cols-7 border-l border-[var(--color-border)] rounded-bl-lg rounded-br-lg overflow-hidden"
    >
      <div
        v-for="(cell, i) in calendarDays"
        :key="i"
        :class="[
          'min-h-[108px] border-r border-b border-[var(--color-border)] p-1.5',
          cell.date === null
            ? 'bg-gray-50/60 dark:bg-gray-900/30'
            : 'bg-[var(--color-surface)]',
        ]"
      >
        <!-- Day number -->
        <div v-if="cell.date !== null" class="flex justify-end mb-1">
          <span
            :class="[
              'w-6 h-6 flex items-center justify-center text-xs font-heading font-medium rounded-full',
              cell.isToday
                ? 'bg-brand-600 text-white'
                : 'text-gray-600 dark:text-gray-400',
            ]"
          >
            {{ cell.date }}
          </span>
        </div>

        <!-- Transaction chips -->
        <div v-if="cell.date !== null" class="space-y-0.5">
          <button
            v-for="tx in cell.visible"
            :key="tx.id"
            :class="[
              'w-full text-left text-xs px-1.5 rounded truncate font-body leading-5 transition-opacity hover:opacity-70 cursor-pointer',
              tx.type === 'credit'
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300',
            ]"
            @click="$emit('transaction-click', tx)"
          >
            {{ tx.description }}
          </button>
          <p
            v-if="cell.overflow > 0"
            class="text-xs px-1.5 font-body text-gray-400 leading-5"
          >
            +{{ cell.overflow }} more
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Transaction } from '@/types'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
const MAX_VISIBLE = 3

interface CalendarCell {
  date: number | null
  dateStr: string | null
  transactions: Transaction[]
  visible: Transaction[]
  overflow: number
  isToday: boolean
}

export default defineComponent({
  name: 'TransactionCalendar',
  components: { ChevronLeft, ChevronRight },
  emits: ['transaction-click'],

  props: {
    transactions: {
      type: Array as PropType<Transaction[]>,
      required: true,
    },
  },

  data() {
    const now = new Date()
    return {
      DAY_LABELS,
      calendarYear: now.getFullYear(),
      calendarMonth: now.getMonth() + 1, // 1-12
    }
  },

  computed: {
    monthLabel(): string {
      const d = new Date(this.calendarYear, this.calendarMonth - 1, 1)
      return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    },

    todayStr(): string {
      const now = new Date()
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    },

    transactionsByDate(): Record<string, Transaction[]> {
      const map: Record<string, Transaction[]> = {}
      for (const tx of this.transactions) {
        // Use first 10 chars of the stored date string (YYYY-MM-DD) to avoid timezone ambiguity
        const key = tx.date.slice(0, 10)
        if (!map[key]) map[key] = []
        map[key].push(tx)
      }
      return map
    },

    calendarDays(): CalendarCell[] {
      const year = this.calendarYear
      const month = this.calendarMonth
      const firstDay = new Date(year, month - 1, 1)
      const daysInMonth = new Date(year, month, 0).getDate()
      const startDow = firstDay.getDay() // 0 = Sunday

      const cells: CalendarCell[] = []

      // Leading empty cells to align the first day correctly
      for (let i = 0; i < startDow; i++) {
        cells.push({
          date: null,
          dateStr: null,
          transactions: [],
          visible: [],
          overflow: 0,
          isToday: false,
        })
      }

      // One cell per day of the month
      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
        const txs = this.transactionsByDate[dateStr] ?? []
        const visible = txs.slice(0, MAX_VISIBLE)
        cells.push({
          date: d,
          dateStr,
          transactions: txs,
          visible,
          overflow: txs.length - visible.length,
          isToday: dateStr === this.todayStr,
        })
      }

      // Trailing empty cells to complete the last row
      const remainder = cells.length % 7
      if (remainder !== 0) {
        for (let i = 0; i < 7 - remainder; i++) {
          cells.push({
            date: null,
            dateStr: null,
            transactions: [],
            visible: [],
            overflow: 0,
            isToday: false,
          })
        }
      }

      return cells
    },
  },

  methods: {
    prevMonth() {
      if (this.calendarMonth === 1) {
        this.calendarMonth = 12
        this.calendarYear--
      } else {
        this.calendarMonth--
      }
    },

    nextMonth() {
      if (this.calendarMonth === 12) {
        this.calendarMonth = 1
        this.calendarYear++
      } else {
        this.calendarMonth++
      }
    },

    goToToday() {
      const now = new Date()
      this.calendarYear = now.getFullYear()
      this.calendarMonth = now.getMonth() + 1
    },
  },
})
</script>
