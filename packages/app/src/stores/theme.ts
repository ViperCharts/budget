import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'system' as ThemeMode,
  }),

  actions: {
    setMode(mode: ThemeMode) {
      this.mode = mode
      this.apply()
    },

    apply() {
      const isDark =
        this.mode === 'dark' ||
        (this.mode === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)

      document.documentElement.classList.toggle('dark', isDark)
    },

    init() {
      this.apply()
      // Listen for system changes
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          if (this.mode === 'system') this.apply()
        })
    },
  },

  persist: {
    key: 'budget-theme',
    storage: localStorage,
  },
})
