<script setup>
import { computed } from 'vue'

const props = defineProps({
  tech: { type: String, default: '' },
  duplicate: { type: Boolean, default: false },
})

const searchUrl = computed(
  () => `https://www.google.com/search?q=${encodeURIComponent(props.tech)}`
)
</script>

<template>
  <a
    class="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-zinc-400 px-5 text-[#333] shadow-md transition hover:scale-110 hover:border-blue-500 dark:border-[#333] dark:bg-neutral-200"
    :href="searchUrl"
    target="_blank"
    rel="noopener noreferrer"
    :tabindex="duplicate ? -1 : undefined"
    :aria-hidden="duplicate ? 'true' : undefined"
  >
    <img class="w-5" :src="`/${tech}.svg`" :alt="duplicate ? '' : `${tech} logo`">
    <p class="text-lg font-medium capitalize">{{ tech }}</p>
  </a>
</template>
