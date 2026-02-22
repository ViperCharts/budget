<template>
  <div class="card">
    <div class="flex items-center justify-between mb-3">
      <p class="text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {{ label }}
      </p>
      <div
        :class="[
          'w-8 h-8 rounded-lg flex items-center justify-center',
          iconBg,
        ]"
      >
        <component :is="icon" class="w-4 h-4" :class="iconColor" />
      </div>
    </div>
    <p
      :class="[
        'font-heading font-bold text-2xl',
        valueColor || 'text-gray-900 dark:text-white',
      ]"
    >
      {{ value }}
    </p>
    <p v-if="sub" class="text-xs text-gray-500 dark:text-gray-400 mt-1 font-body">
      {{ sub }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'StatCard',
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    sub: String,
    icon: { type: [Object, Function] as PropType<unknown>, required: true },
    iconBg: { type: String, default: 'bg-brand-50 dark:bg-brand-900/20' },
    iconColor: { type: String, default: 'text-brand-600 dark:text-brand-400' },
    valueColor: String,
  },
})
</script>
