import { defineStore } from 'pinia'
import type { AISettings } from '@/types'

export const useAIStore = defineStore('ai', {
  state: () => ({
    settings: {
      provider: 'openai' as AISettings['provider'],
      apiKey: '',
      model: 'gpt-4o',
    } as AISettings,
    isConfigured: false,
  }),

  getters: {
    hasApiKey(): boolean {
      return !!this.settings.apiKey
    },
  },

  actions: {
    updateSettings(settings: Partial<AISettings>) {
      this.settings = { ...this.settings, ...settings, provider: 'openai', model: 'gpt-4o' }
    },
    setApiKey(key: string) {
      this.settings.apiKey = key
    },
  },

  persist: {
    key: 'budget-ai',
    storage: localStorage,
  },
})
