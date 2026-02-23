<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4"
        @keydown.esc="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close" />

        <!-- Dialog -->
        <div class="relative card shadow-xl w-full max-w-md z-10 rounded-b-none md:rounded-b-xl max-h-[85vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-heading font-semibold text-gray-900 dark:text-white text-lg">
              New Category
            </h3>
            <button class="btn-ghost p-1.5 rounded-lg" @click="close">
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Preview badge -->
          <div class="flex justify-center mb-5">
            <span
              class="badge font-heading text-base px-4 py-1.5"
              :style="{ backgroundColor: form.color + '22', color: form.color }"
            >
              <span v-if="form.emoji" class="mr-1.5">{{ form.emoji }}</span>
              {{ form.name || 'Preview' }}
            </span>
          </div>

          <!-- Form -->
          <div class="space-y-4">
            <!-- Name -->
            <div>
              <label class="label" for="cat-name">Name</label>
              <input
                id="cat-name"
                v-model="form.name"
                type="text"
                class="input"
                placeholder="e.g. Side Hustle"
                maxlength="40"
                autofocus
                @keydown.enter="save"
              />
            </div>

            <!-- Color -->
            <div>
              <label class="label">Color</label>
              <div class="flex items-center gap-3">
                <!-- Preset swatches -->
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="swatch in COLOR_SWATCHES"
                    :key="swatch"
                    class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                    :style="{
                      backgroundColor: swatch,
                      borderColor: form.color === swatch ? swatch : 'transparent',
                      outlineOffset: '2px',
                      outline: form.color === swatch ? `2px solid ${swatch}` : 'none',
                    }"
                    :title="swatch"
                    @click="form.color = swatch"
                  />
                </div>
                <!-- Custom color picker -->
                <label class="relative cursor-pointer" title="Custom color">
                  <span
                    class="flex items-center justify-center w-6 h-6 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 transition-colors"
                    :style="isCustomColor ? { backgroundColor: form.color, borderColor: form.color } : {}"
                  >
                    <Pipette class="w-3 h-3 text-gray-400" v-if="!isCustomColor" />
                  </span>
                  <input
                    type="color"
                    class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    :value="form.color"
                    @input="form.color = ($event.target as HTMLInputElement).value"
                  />
                </label>
              </div>
            </div>

            <!-- Emoji -->
            <div>
              <label class="label">Emoji <span class="font-body font-normal text-gray-400 text-xs">(optional)</span></label>

              <!-- Quick-pick grid -->
              <div class="flex flex-wrap gap-1 mb-2">
                <button
                  v-for="e in EMOJI_SUGGESTIONS"
                  :key="e"
                  class="w-10 h-10 flex items-center justify-center text-lg rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  :class="form.emoji === e ? 'bg-gray-100 dark:bg-gray-700 ring-1 ring-brand-500' : ''"
                  :title="e"
                  @click="form.emoji = form.emoji === e ? '' : e"
                >
                  {{ e }}
                </button>
              </div>

              <!-- Manual input -->
              <input
                v-model="form.emoji"
                type="text"
                class="input w-24 text-center text-lg"
                placeholder="or type…"
                maxlength="4"
              />
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 mt-6">
            <button class="btn-secondary min-h-[44px]" @click="close">Cancel</button>
            <button
              class="btn-primary min-h-[44px]"
              :disabled="!form.name.trim() || saving"
              @click="save"
            >
              <span v-if="saving">Saving…</span>
              <span v-else>Create Category</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { X, Pipette } from 'lucide-vue-next'
import { useCategoriesStore } from '@/stores/categories'
import type { Category } from '@/types'

const COLOR_SWATCHES = [
  '#f59e0b', '#ef4444', '#ec4899', '#a855f7',
  '#6366f1', '#3b82f6', '#06b6d4', '#10b981',
  '#22c55e', '#84cc16', '#f97316', '#64748b',
]

const EMOJI_SUGGESTIONS = [
  '🛒', '🍔', '☕', '🍕', '🥗',
  '🚗', '✈️', '🏠', '💡', '📱',
  '👗', '💻', '📦', '🎁', '🎮',
  '🎬', '🎨', '🏋️', '💊', '🏥',
  '💰', '📈', '💼', '🏦', '💵',
  '🐾', '❤️', '📊', '🎓', '🔧',
]

export default defineComponent({
  name: 'CustomCategoryModal',
  components: { X, Pipette },

  emits: ['update:modelValue', 'created'],

  props: {
    modelValue: { type: Boolean, required: true },
  },

  setup() {
    const categoriesStore = useCategoriesStore()
    return { categoriesStore }
  },

  data() {
    return {
      COLOR_SWATCHES,
      EMOJI_SUGGESTIONS,
      form: {
        name: '',
        color: '#6366f1',
        emoji: '',
      },
      saving: false,
    }
  },

  computed: {
    isCustomColor(): boolean {
      return !COLOR_SWATCHES.includes(this.form.color)
    },
  },

  watch: {
    modelValue(open: boolean) {
      if (open) {
        this.form = { name: '', color: '#6366f1', emoji: '' }
        this.saving = false
      }
    },
  },

  methods: {
    close() {
      this.$emit('update:modelValue', false)
    },

    async save() {
      const name = this.form.name.trim()
      if (!name || this.saving) return

      this.saving = true
      try {
        const cat: Category = await this.categoriesStore.addCategory(
          name,
          this.form.color,
          this.form.emoji || undefined,
        )
        this.$emit('created', cat)
        this.close()
      } finally {
        this.saving = false
      }
    },
  },
})
</script>
