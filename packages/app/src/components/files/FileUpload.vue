<template>
  <div>
    <!-- Drop zone -->
    <div
      :class="[
        'relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-150 cursor-pointer',
        isDragging
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-brand-400 hover:bg-gray-50 dark:hover:bg-gray-800/50',
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      @click="($refs.fileInput as HTMLInputElement).click()"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        accept=".csv,.pdf"
        class="hidden"
        @change="onFileChange"
      />

      <div v-if="!uploading" class="space-y-3">
        <div class="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mx-auto">
          <Upload class="w-7 h-7 text-brand-600 dark:text-brand-400" />
        </div>
        <div>
          <p class="font-heading font-semibold text-gray-900 dark:text-white">
            Drop your statements here
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 font-body">
            CSV or PDF bank / credit card statements
          </p>
        </div>
        <p v-if="!aiConfigured" class="text-xs text-amber-600 dark:text-amber-400 font-body">
          ⚠️ Set up your AI key in Settings to auto-extract transactions
        </p>
      </div>

      <div v-else class="space-y-3">
        <div class="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mx-auto">
          <Loader2 class="w-7 h-7 text-brand-600 animate-spin" />
        </div>
        <p class="font-heading font-semibold text-gray-900 dark:text-white">
          Processing your statement...
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-body italic">
          💡 {{ processingTip }}
        </p>
      </div>
    </div>

    <!-- Error -->
    <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-400 font-body">
      {{ error }}
    </p>

    <!-- PDF Preview Modal -->
    <PdfPreviewModal
      v-model="showPreview"
      :file="previewFile"
      @confirm="onConfirmPdf"
      @cancel="onCancelPdf"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Upload, Loader2 } from 'lucide-vue-next'
import { useFilesStore } from '@/stores/files'
import { useAIStore } from '@/stores/ai'
import PdfPreviewModal from './PdfPreviewModal.vue'

const PROCESSING_TIPS = [
  'AI is reading your statement and extracting transactions...',
  'Categorizing your spending automatically...',
  'Identifying your account details...',
  'Almost there — building your financial picture...',
]

export default defineComponent({
  name: 'FileUpload',
  components: { Upload, Loader2, PdfPreviewModal },
  emits: ['uploaded'],

  setup() {
    const filesStore = useFilesStore()
    const aiStore = useAIStore()
    return { filesStore, aiStore }
  },

  data() {
    return {
      isDragging: false,
      uploading: false,
      error: '',
      processingTip: PROCESSING_TIPS[0],
      pendingPdfs: [] as File[],
      showPreview: false,
      previewFile: null as File | null,
    }
  },

  computed: {
    aiConfigured(): boolean {
      return this.aiStore.hasApiKey
    },
  },

  methods: {
    onDrop(e: DragEvent) {
      this.isDragging = false
      const files = Array.from(e.dataTransfer?.files ?? [])
      this.upload(files)
    },

    onFileChange(e: Event) {
      const input = e.target as HTMLInputElement
      const files = Array.from(input.files ?? [])
      this.upload(files)
      input.value = ''
    },

    upload(files: File[]) {
      const valid = files.filter((f) => f.name.match(/\.(csv|pdf)$/i))
      if (!valid.length) {
        this.error = 'Only CSV and PDF files are supported.'
        return
      }

      this.error = ''

      const csvFiles = valid.filter((f) => f.name.match(/\.csv$/i))
      const pdfFiles = valid.filter((f) => f.name.match(/\.pdf$/i))

      if (csvFiles.length) {
        this.uploadFiles(csvFiles)
      }

      if (pdfFiles.length) {
        this.pendingPdfs = [...this.pendingPdfs, ...pdfFiles]
        if (!this.showPreview) {
          this.showNextPdf()
        }
      }
    },

    showNextPdf() {
      if (!this.pendingPdfs.length) return
      const [next, ...rest] = this.pendingPdfs
      this.pendingPdfs = rest
      this.previewFile = next
      this.showPreview = true
    },

    async onConfirmPdf() {
      const file = this.previewFile
      this.previewFile = null
      if (file) {
        await this.uploadFiles([file])
      }
      this.showNextPdf()
    },

    onCancelPdf() {
      this.previewFile = null
      this.showNextPdf()
    },

    async uploadFiles(files: File[]) {
      this.uploading = true

      let tipIdx = 0
      const tipInterval = setInterval(() => {
        tipIdx = (tipIdx + 1) % PROCESSING_TIPS.length
        this.processingTip = PROCESSING_TIPS[tipIdx]
      }, 3000)

      try {
        await Promise.all(files.map((f) => this.filesStore.uploadFile(f)))
        this.$emit('uploaded')
      } catch (err) {
        console.error('[FileUpload] Upload failed:', err)
        this.error =
          err instanceof Error ? err.message : 'Upload failed. Please try again.'
      } finally {
        clearInterval(tipInterval)
        this.uploading = false
      }
    },
  },
})
</script>
