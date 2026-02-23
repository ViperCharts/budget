<template>
  <div class="space-y-4 md:space-y-6 max-w-4xl">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="font-heading font-bold text-lg md:text-xl text-gray-900 dark:text-white">
          Statements
        </h2>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-body mt-0.5">
          {{ filesStore.files.length }} file{{ filesStore.files.length !== 1 ? 's' : '' }} imported
        </p>
      </div>
    </div>

    <!-- Upload zone -->
    <FileUpload @uploaded="onUploaded" />

    <!-- File tree -->
    <div v-if="filesStore.loading" class="flex justify-center py-12">
      <LoadingSpinner message="Loading files..." :show-tip="true" />
    </div>

    <EmptyState
      v-else-if="!filesStore.files.length"
      :icon="FolderOpen"
      title="No statements yet"
      description="Upload your first bank or credit card statement above to get started."
    />

    <FileTree
      v-else
      :tree="filesStore.tree"
      @delete="confirmDelete"
      @preview="openPreview"
    />

    <!-- Confirm delete -->
    <ConfirmModal
      v-model="showDeleteModal"
      title="Delete Statement"
      message="This will permanently delete the file and all its associated transactions. This cannot be undone."
      confirm-label="Delete"
      :danger="true"
      @confirm="deleteFile"
    />

    <!-- PDF preview (already-uploaded) -->
    <PdfPreviewModal
      v-model="showPdfPreview"
      :src="previewSrc"
      :name="previewFileName"
      :size="previewFileSize"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FolderOpen } from 'lucide-vue-next'
import FileUpload from '@/components/files/FileUpload.vue'
import FileTree from '@/components/files/FileTree.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import PdfPreviewModal from '@/components/files/PdfPreviewModal.vue'
import { useFilesStore } from '@/stores/files'

export default defineComponent({
  name: 'FilesView',
  components: { FileUpload, FileTree, LoadingSpinner, EmptyState, ConfirmModal, PdfPreviewModal },

  data() {
    return {
      FolderOpen,
      showDeleteModal: false,
      pendingDeleteId: '',
      showPdfPreview: false,
      previewSrc: null as string | null,
      previewFileName: null as string | null,
      previewFileSize: null as number | null,
    }
  },

  computed: {
    filesStore() {
      return useFilesStore()
    },
  },

  methods: {
    onUploaded() {
      // File tree auto-updates via Firestore listener
    },

    confirmDelete(fileId: string) {
      this.pendingDeleteId = fileId
      this.showDeleteModal = true
    },

    async deleteFile() {
      if (!this.pendingDeleteId) return
      await useFilesStore().deleteFile(this.pendingDeleteId)
      this.pendingDeleteId = ''
    },

    async openPreview(fileId: string) {
      const store = useFilesStore()
      const file = store.byId[fileId]
      if (!file) return

      this.previewSrc = null
      this.previewFileName = file.name
      this.previewFileSize = file.size
      this.showPdfPreview = true

      try {
        this.previewSrc = await store.getDownloadUrl(fileId)
      } catch (err) {
        console.error('[FilesView] Failed to load PDF preview:', err)
        this.showPdfPreview = false
      }
    },
  },
})
</script>
