<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue && displayName"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close" />

        <!-- Dialog -->
        <div class="relative card shadow-2xl w-full max-w-3xl z-10 flex flex-col" style="max-height: 90vh">
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                <FileText class="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 class="font-heading font-semibold text-gray-900 dark:text-white leading-tight">
                  {{ displayName }}
                </h3>
                <p v-if="displaySize" class="text-xs text-gray-500 dark:text-gray-400 font-body mt-0.5">
                  {{ displaySize }} · PDF Document
                </p>
                <p v-else class="text-xs text-gray-500 dark:text-gray-400 font-body mt-0.5">
                  PDF Document
                </p>
              </div>
            </div>
            <button class="btn-ghost p-1.5 -mr-1 -mt-1" @click="close">
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- PDF Preview -->
          <div class="flex-1 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <iframe
              v-if="iframeSrc"
              :src="iframeSrc"
              class="w-full border-0 block"
              style="height: 58vh"
              title="PDF Preview"
            />
            <div v-else class="flex items-center justify-center" style="height: 58vh">
              <Loader2 class="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          </div>

          <!-- Footer: pre-upload confirmation vs. post-upload view -->
          <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <p class="text-sm text-gray-500 dark:text-gray-400 font-body">
              {{ isPreUpload ? 'Does this look right?' : 'Statement preview' }}
            </p>
            <div class="flex items-center gap-3">
              <template v-if="isPreUpload">
                <button class="btn-secondary" @click="cancel">Cancel</button>
                <button class="btn-primary" @click="confirm">
                  <Upload class="w-4 h-4 mr-1.5" />
                  Upload
                </button>
              </template>
              <button v-else class="btn-secondary" @click="close">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { FileText, X, Upload, Loader2 } from 'lucide-vue-next'

export default defineComponent({
  name: 'PdfPreviewModal',
  components: { FileText, X, Upload, Loader2 },
  emits: ['update:modelValue', 'confirm', 'cancel'],

  props: {
    modelValue: { type: Boolean, required: true },
    /** Raw File object — used for pre-upload preview. Triggers blob URL creation. */
    file: { type: Object as PropType<File | null>, default: null },
    /** Firebase Storage download URL — used for viewing an already-uploaded PDF. */
    src: { type: String as PropType<string | null>, default: null },
    /** Override display name (used when `file` is not provided). */
    name: { type: String as PropType<string | null>, default: null },
    /** Override display size in bytes (used when `file` is not provided). */
    size: { type: Number as PropType<number | null>, default: null },
  },

  data() {
    return {
      blobUrl: null as string | null,
    }
  },

  computed: {
    isPreUpload(): boolean {
      return this.file !== null
    },
    displayName(): string {
      return this.file?.name ?? this.name ?? ''
    },
    displaySize(): string {
      const bytes = this.file?.size ?? this.size
      if (!bytes) return ''
      if (bytes < 1024) return `${bytes} B`
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    },
    iframeSrc(): string | null {
      return this.blobUrl ?? this.src ?? null
    },
  },

  watch: {
    file: {
      immediate: true,
      handler(newFile: File | null) {
        this.revokeBlobUrl()
        if (newFile) {
          this.blobUrl = URL.createObjectURL(newFile)
        }
      },
    },
    modelValue(open: boolean) {
      if (!open) {
        this.revokeBlobUrl()
      }
    },
  },

  beforeUnmount() {
    this.revokeBlobUrl()
  },

  methods: {
    revokeBlobUrl() {
      if (this.blobUrl) {
        URL.revokeObjectURL(this.blobUrl)
        this.blobUrl = null
      }
    },

    confirm() {
      this.$emit('confirm')
      this.$emit('update:modelValue', false)
    },

    cancel() {
      this.$emit('cancel')
      this.$emit('update:modelValue', false)
    },

    close() {
      this.$emit('update:modelValue', false)
    },
  },
})
</script>
