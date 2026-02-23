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
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('update:modelValue', false)" />

        <!-- Dialog -->
        <div class="relative card shadow-xl max-w-md w-full z-10 rounded-b-none md:rounded-b-xl">
          <h3 class="font-heading font-semibold text-gray-900 dark:text-white text-lg mb-2">
            {{ title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 font-body mb-6">
            {{ message }}
          </p>
          <div class="flex items-center justify-end gap-3">
            <button class="btn-secondary min-h-[44px]" @click="$emit('update:modelValue', false)">
              Cancel
            </button>
            <button :class="[dangerClass, 'min-h-[44px]']" @click="confirm">
              {{ confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfirmModal',
  emits: ['update:modelValue', 'confirm'],
  props: {
    modelValue: { type: Boolean, required: true },
    title: { type: String, default: 'Are you sure?' },
    message: { type: String, default: 'This action cannot be undone.' },
    confirmLabel: { type: String, default: 'Confirm' },
    danger: { type: Boolean, default: false },
  },

  computed: {
    dangerClass(): string {
      return this.danger ? 'btn-danger' : 'btn-primary'
    },
  },

  methods: {
    confirm() {
      this.$emit('confirm')
      this.$emit('update:modelValue', false)
    },
  },
})
</script>
