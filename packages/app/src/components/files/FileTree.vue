<template>
  <div class="space-y-4">
    <div v-for="yearNode in tree" :key="yearNode.year" class="card">
      <!-- Year header -->
      <button
        class="w-full flex items-center justify-between font-heading font-semibold text-gray-900 dark:text-white mb-3"
        @click="toggleYear(yearNode.year)"
      >
        <span class="flex items-center gap-2">
          <Calendar class="w-4 h-4 text-brand-600" />
          {{ yearNode.year }}
        </span>
        <ChevronDown
          :class="['w-4 h-4 transition-transform', expandedYears.includes(yearNode.year) ? '' : '-rotate-90']"
        />
      </button>

      <div v-if="expandedYears.includes(yearNode.year)" class="space-y-3">
        <!-- Month groups -->
        <div v-for="monthNode in yearNode.months" :key="monthNode.month">
          <p class="text-xs font-heading font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 ml-1">
            {{ monthName(monthNode.month) }}
          </p>
          <div class="space-y-1">
            <FileTreeItem
              v-for="file in monthNode.files"
              :key="file.id"
              :file="file"
              @delete="$emit('delete', file.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Calendar, ChevronDown } from 'lucide-vue-next'
import FileTreeItem from './FileTreeItem.vue'
import type { FileTreeNode } from '@/stores/files'

const MONTH_NAMES = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default defineComponent({
  name: 'FileTree',
  components: { Calendar, ChevronDown, FileTreeItem },
  emits: ['delete'],

  props: {
    tree: {
      type: Array as PropType<FileTreeNode[]>,
      required: true,
    },
  },

  data() {
    return {
      expandedYears: [] as number[],
    }
  },

  mounted() {
    // Auto-expand current year
    const currentYear = new Date().getFullYear()
    if (this.tree.some((n) => n.year === currentYear)) {
      this.expandedYears = [currentYear]
    } else if (this.tree.length > 0) {
      this.expandedYears = [this.tree[0].year]
    }
  },

  methods: {
    toggleYear(year: number) {
      const idx = this.expandedYears.indexOf(year)
      if (idx === -1) {
        this.expandedYears.push(year)
      } else {
        this.expandedYears.splice(idx, 1)
      }
    },
    monthName(m: number): string {
      return MONTH_NAMES[m] ?? String(m)
    },
  },
})
</script>
