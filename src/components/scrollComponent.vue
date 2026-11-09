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

const tones = {
  HTML5: 'text-[#e34f26] dark:text-[#ff9a76]',
  CSS3: 'text-[#1572b6] dark:text-[#79c0ff]',
  JavaScript: 'text-[#c6a000] dark:text-[#f7df1e]',
  vue: 'text-[#3aa776] dark:text-[#6eebc0]',
  react: 'text-[#087ea4] dark:text-[#61dafb]',
  tailwind: 'text-[#0ea5e9] dark:text-[#7dd3fc]',
  mySQL: 'text-[#00758f] dark:text-[#5ed0ea]',
  git: 'text-[#e24329] dark:text-[#ff8f73]',
}

const tone = computed(() => tones[props.name] || 'text-neutral-900 dark:text-neutral-100')
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
    <span
      class="tech-icon"
      :class="tone"
      :style="{ maskImage: `url(/${name}.svg)`, WebkitMaskImage: `url(/${name}.svg)` }"
      aria-hidden="true"
    />
    <span class="text-sm font-semibold">{{ label || name }}</span>
  </a>
</template>

<style scoped>
.tech-icon {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background-color: currentColor;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
}

@media (prefers-reduced-motion: reduce) {
  .tech-chip--clone {
    display: none;
  }
}
</style>
