import { defineStore } from 'pinia'
import type { AISettings } from '@/types'

export const useAIStore = defineStore('ai', {
  state: () => ({
    settings: {
      provider: 'anthropic' as AISettings['provider'],
      apiKey: '',
      model: 'claude-3-5-haiku-20241022',
    } as AISettings,
    isConfigured: false,
  }),

  getters: {
    hasApiKey(): boolean {
      return !!this.settings.apiKey
    },
    modelOptions(): { label: string; value: string }[] {
      if (this.settings.provider === 'anthropic') {
        return [
          { label: 'Claude 3.5 Haiku (Fast)', value: 'claude-3-5-haiku-20241022' },
          { label: 'Claude 3.5 Sonnet (Smart)', value: 'claude-3-5-sonnet-20241022' },
          { label: 'Claude 3 Opus (Powerful)', value: 'claude-3-opus-20240229' },
        ]
      }
      return [
        { label: 'GPT-4o Mini (Fast)', value: 'gpt-4o-mini' },
        { label: 'GPT-4o (Smart)', value: 'gpt-4o' },
      ]
    },
  },

  actions: {
    updateSettings(settings: Partial<AISettings>) {
      this.settings = { ...this.settings, ...settings }
      // Reset model when switching providers
      if (settings.provider) {
        this.settings.model =
          settings.provider === 'anthropic'
            ? 'claude-3-5-haiku-20241022'
            : 'gpt-4o-mini'
      }
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
