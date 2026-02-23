<template>
  <span
    class="badge font-heading"
    :style="{ backgroundColor: color + '22', color }"
  >
    {{ category }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { hashColor } from '@/stores/categories'

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
      return hashColor(this.category)
    },
  },
})
</script>
