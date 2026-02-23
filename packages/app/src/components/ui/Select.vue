<template>
  <div ref="container" class="relative inline-block">
    <!-- Trigger button -->
    <button
      type="button"
      class="flex items-center gap-1.5 text-xs rounded px-2 py-1.5 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors w-full"
      @click="toggle"
    >
      <span
        v-if="selectedOption?.color"
        class="w-2 h-2 rounded-full shrink-0"
        :style="{ backgroundColor: selectedOption.color }"
      />
      <span class="truncate flex-1 text-left text-gray-700 dark:text-gray-200">
        {{ selectedOption?.text ?? placeholder }}
      </span>
      <ChevronDown
        class="w-3 h-3 shrink-0 text-gray-400 transition-transform duration-150"
        :class="open ? 'rotate-180' : ''"
      />
    </button>

    <!-- Dropdown -->
    <Teleport to="body">
      <div
        v-if="open"
        ref="dropdown"
        class="fixed z-[200] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-xl overflow-hidden"
        :style="dropdownStyle"
      >
        <!-- Search input -->
        <div class="p-2 border-b border-[var(--color-border)]">
          <div class="relative">
            <Search class="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              ref="searchInput"
              v-model="search"
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full pl-6 pr-2 py-1 text-xs rounded border border-[var(--color-border)] bg-[var(--color-bg)] text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-brand-500"
              @keydown.esc.stop="close"
              @keydown.enter.prevent="selectFirst"
            />
          </div>
        </div>

        <!-- Options list -->
        <div class="max-h-60 overflow-y-auto">
          <template v-for="(opt, id) in filteredOptions" :key="id">
            <!-- Divider option -->
            <div
              v-if="opt.divider"
              class="h-px bg-[var(--color-border)] my-1"
            />
            <!-- Regular option -->
            <button
              v-else
              type="button"
              class="flex items-center gap-2 w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer"
              :class="getOptionClass(String(id), opt)"
              :style="getOptionStyle(String(id), opt)"
              @click="select(String(id))"
            >
              <Check
                v-if="String(id) === modelValue"
                class="w-3 h-3 shrink-0 opacity-70"
              />
              <span v-else class="w-3 h-3 shrink-0" />
              <span class="truncate">{{ opt.text }}</span>
            </button>
          </template>

          <p
            v-if="filteredCount === 0"
            class="px-3 py-3 text-xs text-gray-400 text-center"
          >
            No results
          </p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, type CSSProperties } from 'vue'
import { ChevronDown, Search, Check } from 'lucide-vue-next'

export interface SelectOption {
  text: string
  color?: string
  divider?: boolean
}

/** Returns '#ffffff' or '#000000' depending on which is more readable on the given hex color */
function getContrastColor(hex: string): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  // Perceived luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55 ? '#000000' : '#ffffff'
}

export default defineComponent({
  name: 'SelectMenu',
  components: { ChevronDown, Search, Check },

  props: {
    options: {
      type: Object as PropType<Record<string, SelectOption>>,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Select…',
    },
    searchPlaceholder: {
      type: String,
      default: 'Search…',
    },
  },

  emits: ['selected', 'update:modelValue'],

  data() {
    return {
      open: false,
      search: '',
      dropdownStyle: {} as CSSProperties,
    }
  },

  computed: {
    selectedOption(): SelectOption | null {
      if (!this.modelValue) return null
      return this.options[this.modelValue] ?? null
    },

    filteredOptions(): Record<string, SelectOption> {
      const q = this.search.trim().toLowerCase()
      if (!q) return this.options
      const result: Record<string, SelectOption> = {}
      for (const [id, opt] of Object.entries(this.options)) {
        if (opt.divider) continue
        if (opt.text.toLowerCase().includes(q)) {
          result[id] = opt
        }
      }
      return result
    },

    filteredCount(): number {
      return Object.values(this.filteredOptions).filter((o) => !o.divider).length
    },
  },

  mounted() {
    document.addEventListener('mousedown', this.onOutsideClick)
  },

  beforeUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick)
  },

  methods: {
    toggle() {
      if (this.open) {
        this.close()
      } else {
        this.openDropdown()
      }
    },

    openDropdown() {
      this.open = true
      this.search = ''
      this.$nextTick(() => {
        this.positionDropdown()
        ;(this.$refs.searchInput as HTMLInputElement | undefined)?.focus()
      })
    },

    close() {
      this.open = false
      this.search = ''
    },

    positionDropdown() {
      const container = this.$refs.container as HTMLElement | undefined
      if (!container) return
      const rect = container.getBoundingClientRect()
      const dropdownEl = this.$refs.dropdown as HTMLElement | undefined
      const dropdownHeight = dropdownEl?.offsetHeight ?? 280
      const spaceBelow = window.innerHeight - rect.bottom - 8
      const spaceAbove = rect.top - 8

      let top: number
      if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
        top = rect.bottom + 4
      } else {
        top = rect.top - dropdownHeight - 4
      }

      this.dropdownStyle = {
        top: `${top}px`,
        left: `${rect.left}px`,
        minWidth: `${Math.max(rect.width, 200)}px`,
        maxWidth: '300px',
      }
    },

    select(id: string) {
      this.$emit('selected', id)
      this.$emit('update:modelValue', id)
      this.close()
    },

    selectFirst() {
      const first = Object.keys(this.filteredOptions).find(
        (k) => !this.filteredOptions[k].divider,
      )
      if (first) this.select(first)
    },

    onOutsideClick(e: MouseEvent) {
      if (!this.open) return
      const container = this.$refs.container as HTMLElement | undefined
      const dropdown = this.$refs.dropdown as HTMLElement | undefined
      const target = e.target as Node
      if (!container?.contains(target) && !dropdown?.contains(target)) {
        this.close()
      }
    },

    getOptionClass(id: string, opt: SelectOption): Record<string, boolean> {
      const isSelected = id === this.modelValue
      const hasColor = !!opt.color
      return {
        'font-medium': isSelected,
        'text-gray-700 dark:text-gray-200': !hasColor && !isSelected,
        'text-gray-900 dark:text-white': !hasColor && isSelected,
        'bg-gray-100 dark:bg-gray-800': !hasColor && isSelected,
        'hover:bg-gray-50 dark:hover:bg-gray-800': !hasColor && !isSelected,
      }
    },

    getOptionStyle(id: string, opt: SelectOption): CSSProperties {
      if (!opt.color) return {}
      const isSelected = id === this.modelValue
      if (isSelected) {
        return {
          backgroundColor: opt.color,
          color: getContrastColor(opt.color),
        }
      }
      return {
        backgroundColor: `${opt.color}26`,
        color: opt.color,
      }
    },
  },
})
</script>
