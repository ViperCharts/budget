<template>
  <button
    class="card text-left hover:shadow-md hover:border-brand-300 dark:hover:border-brand-700 transition-all group cursor-pointer w-full"
    @click="$emit('click')"
  >
    <div class="flex items-center gap-4">
      <div :class="['w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', iconBg]">
        <component :is="icon" :class="['w-5 h-5', iconColor]" />
      </div>
      <div class="min-w-0">
        <p class="font-heading font-semibold text-gray-900 dark:text-white text-sm">{{ label }}</p>
        <p class="font-body text-xs text-gray-500 dark:text-gray-400 truncate">{{ tagline }}</p>
      </div>
      <ChevronRight class="w-4 h-4 text-gray-300 dark:text-gray-600 ml-auto flex-shrink-0 group-hover:text-brand-500 transition-colors" />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

export default defineComponent({
  name: 'AccountTypeCard',
  components: { ChevronRight },
  emits: ['click'],
  props: {
    icon: { type: Object, required: true },
    iconBg: { type: String, required: true },
    iconColor: { type: String, required: true },
    label: { type: String, required: true },
    tagline: { type: String, required: true },
    type: { type: String, required: true },
  },
})
</script>
