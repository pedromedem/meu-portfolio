<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '' },
  label: { type: String, default: '' },
  duplicate: { type: Boolean, default: false },
})

const searchUrl = computed(
  () => `https://www.google.com/search?q=${encodeURIComponent(props.label || props.name)}`
)
</script>

<template>
  <a
    class="tech-chip inline-flex shrink-0 items-center gap-2.5 rounded-full border border-black/10 bg-white px-4 py-2.5 text-neutral-900 shadow-sm transition hover:border-violet-400 dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:border-violet-300"
    :class="{ 'tech-chip--clone': duplicate }"
    :href="searchUrl"
    target="_blank"
    rel="noopener noreferrer"
    :tabindex="duplicate ? -1 : undefined"
    :aria-hidden="duplicate ? 'true' : undefined"
  >
    <img class="h-5 w-5" :src="`/${name}.svg`" :alt="duplicate ? '' : `${label || name} logo`">
    <span class="text-sm font-semibold">{{ label || name }}</span>
  </a>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .tech-chip--clone {
    display: none;
  }
}
</style>
