<template>
  <span
    class="badge font-heading"
    :style="{ backgroundColor: color + '22', color }"
  >
    <span v-if="emoji" class="mr-1">{{ emoji }}</span>{{ category }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { hashColor } from '@/stores/categories'

export default defineComponent({
  name: 'CategoryBadge',
  props: {
    category: {
      type: String,
      required: true,
    },
  },

  setup() {
    const categoriesStore = useCategoriesStore()
    return { categoriesStore }
  },

  computed: {
    color(): string {
      return this.categoriesStore.colorFor(this.category)
    },

    emoji(): string | undefined {
      return this.categoriesStore.emojiFor(this.category)
    },
  },
})
</script>
