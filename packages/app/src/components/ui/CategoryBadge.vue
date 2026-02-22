<template>
  <span
    class="badge font-heading"
    :style="{ backgroundColor: color + '22', color }"
  >
    {{ name }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCategoriesStore } from '@/stores/categories'

export default defineComponent({
  name: 'CategoryBadge',
  props: {
    category: {
      type: String,
      required: true,
    },
  },

  computed: {
    color(): string {
      return useCategoriesStore().colorFor(this.category)
    },
    name(): string {
      return this.category
    },
  },
})
</script>
