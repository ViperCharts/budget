<template>
  <div class="card !p-3 md:!p-5">
    <div class="flex items-center justify-between mb-2 md:mb-3">
      <p class="text-[10px] md:text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 truncate">
        {{ label }}
      </p>
      <div
        :class="[
          'w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shrink-0',
          iconBg,
        ]"
      >
        <component :is="icon" class="w-3.5 h-3.5 md:w-4 md:h-4" :class="iconColor" />
      </div>
    </div>
    <p
      :class="[
        'font-heading font-bold text-lg md:text-2xl truncate',
        valueColor || 'text-gray-900 dark:text-white',
      ]"
    >
      {{ value }}
    </p>
    <p v-if="sub" class="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-1 font-body truncate">
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
