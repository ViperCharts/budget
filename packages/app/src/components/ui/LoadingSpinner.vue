<template>
  <div :class="['flex items-center justify-center', fullScreen ? 'h-full' : '']">
    <div :class="['flex flex-col items-center gap-4', centerText ? 'text-center' : '']">
      <div
        :class="[
          'rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin',
          sizeClasses,
        ]"
      />
      <div v-if="message || tip" class="space-y-1 max-w-xs">
        <p v-if="message" class="text-sm font-heading font-medium text-gray-700 dark:text-gray-300">
          {{ message }}
        </p>
        <p v-if="tip" class="text-xs text-gray-500 dark:text-gray-400 font-body italic">
          💡 {{ tip }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const TIPS = [
  'You\'ve got this! Small steps lead to big financial wins.',
  'The average person saves $300/month by tracking their spending.',
  'Paying yourself first is the #1 habit of great savers.',
  'Credit card interest compounds daily — paying early saves money.',
  'Even $25/month invested grows to $30,000+ over 30 years.',
  'Reviewing your budget monthly takes less than 10 minutes.',
]

export default defineComponent({
  name: 'LoadingSpinner',
  props: {
    message: String,
    showTip: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as () => 'sm' | 'md' | 'lg',
      default: 'md',
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
    centerText: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    tip(): string | undefined {
      if (!this.showTip) return undefined
      return TIPS[Math.floor(Math.random() * TIPS.length)]
    },
    sizeClasses(): string {
      return {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
      }[this.size]
    },
  },
})
</script>
