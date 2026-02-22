<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
      <component :is="icon" class="w-8 h-8 text-gray-400" />
    </div>
    <h3 class="font-heading font-semibold text-gray-900 dark:text-white text-lg mb-2">
      {{ title }}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm font-body">
      {{ description }}
    </p>
    <div v-if="$slots.action" class="mt-6">
      <slot name="action" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { FolderOpen } from 'lucide-vue-next'

export default defineComponent({
  name: 'EmptyState',
  props: {
    icon: {
      type: [Object, Function] as PropType<unknown>,
      default: () => FolderOpen,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
})
</script>
