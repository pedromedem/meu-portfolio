<script setup>
import { computed, ref } from 'vue'
import GithubIcon from './GithubIcon.vue'

const props = defineProps({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  language: { type: String, default: '' },
  html_url: { type: String, default: '' },
  homepage: { type: String, default: '' },
  topics: { type: Array, default: () => [] },
})

const imageFailed = ref(false)

function safeHttpUrl(value) {
  if (!value) return ''
  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return ''
    return url.href
  } catch {
    return ''
  }
}

const liveUrl = computed(() => safeHttpUrl(props.homepage))
const repoUrl = computed(() => safeHttpUrl(props.html_url))
const title = computed(() => String(props.name || '').replace(/[-_]/g, ' '))
const initial = computed(() => title.value.charAt(0).toUpperCase())
const topicList = computed(() => (Array.isArray(props.topics) ? props.topics : []))
const screenshot = computed(() => {
  if (!liveUrl.value) return ''
  const host = new URL(liveUrl.value).hostname
  return `https://raw.githubusercontent.com/lucwx/web-screenshot/main/screenshots/${host}/${host}_desktop.jpeg`
})
</script>

<template>
  <article class="flex flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-md duration-300 dark:bg-neutral-800 md:hover:-translate-y-1">
    <div class="relative aspect-[16/10] overflow-hidden bg-neutral-200 dark:bg-neutral-900">
      <div class="absolute inset-0 bg-gradient-to-br from-pink-500 via-violet-600 to-neutral-950" />
      <img
        v-if="screenshot && !imageFailed"
        class="absolute inset-0 h-full w-full object-cover"
        :src="screenshot"
        alt=""
        @error="imageFailed = true"
      />
      <div v-if="!screenshot || imageFailed" class="absolute inset-0 grid place-items-center">
        <span class="text-6xl font-black text-white/85">{{ initial }}</span>
      </div>
      <a
        v-if="liveUrl"
        class="absolute inset-0"
        :href="liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Open ${title}`"
      />
    </div>

    <div class="flex flex-col items-center px-4 py-4">
      <h2 class="p-1 text-center text-lg font-bold capitalize">{{ title }}</h2>
      <p v-if="description" class="text-center">{{ description }}</p>
      <div v-if="topicList.length" class="flex flex-wrap justify-center py-2 text-sm text-stone-900 dark:text-stone-100">
        <p
          v-for="topic in topicList"
          :key="topic"
          class="m-1 rounded-2xl border border-neutral-900 px-3 py-1 capitalize dark:border-neutral-200"
        >{{ topic }}</p>
      </div>
      <p v-if="language" class="text-stone-500 dark:text-stone-400">{{ language }}</p>
    </div>

    <div class="flex items-center justify-end gap-2 px-4 pb-4">
      <a
        v-if="repoUrl"
        class="text-black transition hover:scale-110 dark:text-neutral-300"
        :href="repoUrl"
        target="_blank"
        rel="noopener noreferrer"
        title="Open GitHub repository"
      >
        <GithubIcon :size="28" />
      </a>
      <a
        v-if="liveUrl"
        class="transition hover:scale-110"
        :href="liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        title="Open live site"
      >
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
          stroke-linejoin="round" height="30" width="30" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    </div>
  </article>
</template>
