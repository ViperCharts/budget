import { defineStore } from 'pinia'
import { currentPeriod } from '@/lib/currency'

export const useMonthStore = defineStore('month', {
  state: () => ({
    activePeriod: currentPeriod(),
  }),

  getters: {
    isCurrentPeriod(): boolean {
      return this.activePeriod === currentPeriod()
    },
  },

  actions: {
    setPeriod(period: string) {
      this.activePeriod = period
    },

    prevPeriod() {
      const [year, month] = this.activePeriod.split('-').map(Number)
      const d = new Date(year, month - 2, 1)
      this.activePeriod = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    },

    nextPeriod() {
      const [year, month] = this.activePeriod.split('-').map(Number)
      const d = new Date(year, month, 1)
      this.activePeriod = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    },
  },

  persist: {
    key: 'active-month',
    storage: localStorage,
  },
})
