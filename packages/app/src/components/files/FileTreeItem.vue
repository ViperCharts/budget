<template>
  <div
    class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors group"
  >
    <!-- Icon -->
    <div :class="['w-8 h-8 rounded-lg flex items-center justify-center shrink-0', iconBg]">
      <component :is="fileIcon" :class="['w-4 h-4', iconColor]" />
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <p class="text-sm font-heading font-medium text-gray-900 dark:text-white truncate">
        {{ file.name }}
      </p>
      <div class="flex items-center gap-2 mt-0.5">
        <span :class="['text-xs font-body', statusColor]">{{ statusLabel }}</span>
        <span class="text-xs text-gray-400">{{ formatBytes(file.size) }}</span>
        <span v-if="txCount" class="text-xs text-gray-400">{{ txCount }} transactions</span>
      </div>
    </div>

    <!-- Status indicator -->
    <div v-if="file.status === 'processing'" class="shrink-0">
      <Loader2 class="w-4 h-4 text-brand-600 animate-spin" />
    </div>
    <div v-else-if="file.status === 'error'" class="shrink-0">
      <AlertCircle class="w-4 h-4 text-red-500" title="Error processing file" />
    </div>

    <!-- Delete button (hover) -->
    <button
      @click.stop="$emit('delete')"
      class="shrink-0 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
      title="Delete file"
    >
      <Trash2 class="w-3.5 h-3.5" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { FileText, FileSpreadsheet, Loader2, AlertCircle, Trash2 } from 'lucide-vue-next'
import { formatBytes } from '@/lib/csv'
import { useTransactionsStore } from '@/stores/transactions'
import type { BudgetFile } from '@/types'

export default defineComponent({
  name: 'FileTreeItem',
  components: { Loader2, AlertCircle, Trash2 },
  emits: ['delete'],

  props: {
    file: {
      type: Object as PropType<BudgetFile>,
      required: true,
    },
  },

  computed: {
    fileIcon() {
      return this.file.format === 'pdf' ? FileText : FileSpreadsheet
    },
    iconBg(): string {
      return this.file.format === 'pdf'
        ? 'bg-red-50 dark:bg-red-900/20'
        : 'bg-green-50 dark:bg-green-900/20'
    },
    iconColor(): string {
      return this.file.format === 'pdf'
        ? 'text-red-500'
        : 'text-green-600'
    },
    statusLabel(): string {
      return {
        uploading: 'Uploading...',
        processing: 'Processing...',
        ready: 'Ready',
        error: 'Error',
      }[this.file.status]
    },
    statusColor(): string {
      return {
        uploading: 'text-blue-500',
        processing: 'text-amber-500',
        ready: 'text-green-600 dark:text-green-400',
        error: 'text-red-500',
      }[this.file.status]
    },
    txCount(): number {
      return useTransactionsStore().transactions.filter(
        (t) => t.fileId === this.file.id,
      ).length
    },
  },

  methods: { formatBytes },
})
</script>
