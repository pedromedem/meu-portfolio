<script setup>
import { computed, ref } from 'vue'
import GithubIcon from './GithubIcon.vue'
import { useI18n } from '../i18n'
import { projectCopy } from '../content/projects'
import { safeHttpUrl, screenshotFor } from '../lib/url'

const { locale, t } = useI18n()

const props = defineProps({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  language: { type: String, default: '' },
  html_url: { type: String, default: '' },
  homepage: { type: String, default: '' },
  topics: { type: Array, default: () => [] },
  to: { type: [String, Object], default: '' },
  size: { type: String, default: 'tile' },
})

const imageFailed = ref(false)

const liveUrl = computed(() => safeHttpUrl(props.homepage))
const repoUrl = computed(() => safeHttpUrl(props.html_url))
const title = computed(() => String(props.name || '').replace(/[-_]/g, ' '))
const initial = computed(() => title.value.charAt(0).toUpperCase())
const topicList = computed(() => (Array.isArray(props.topics) ? props.topics : []))
const note = computed(() => projectCopy(props.name, locale.value))
const screenshot = computed(() => screenshotFor(props.homepage))
const isHero = computed(() => props.size === 'hero')
const isWide = computed(() => props.size === 'wide')
</script>

<template>
  <article
    :id="name"
    class="flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_24px_50px_-36px_rgba(40,10,60,0.45)] transition duration-300 hover:-translate-y-1 dark:border-white/15 dark:bg-[#2a2a2a] dark:shadow-[0_24px_50px_-32px_rgba(0,0,0,0.85)]"
  >
    <div
      class="relative w-full shrink-0 overflow-hidden bg-neutral-200 dark:bg-neutral-900"
      :class="isHero
        ? 'min-h-[14rem] flex-1 lg:min-h-[18rem]'
        : isWide
          ? 'aspect-[2/1]'
          : 'aspect-[16/10]'"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-pink-500 via-violet-600 to-neutral-950" />
      <img
        v-if="screenshot && !imageFailed"
        class="absolute inset-0 h-full w-full object-cover"
        :src="screenshot"
        alt=""
        @error="imageFailed = true"
      />
      <div v-if="!screenshot || imageFailed" class="absolute inset-0 grid place-items-center">
        <span class="font-black text-white/80" :class="isHero ? 'text-7xl' : 'text-6xl'">{{ initial }}</span>
      </div>
      <a
        v-if="liveUrl"
        class="absolute inset-0"
        :href="liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${t('card.open')} ${title}`"
      />
    </div>

    <div class="flex min-w-0 flex-1 flex-col px-5 pb-5 pt-4" :class="isHero ? 'lg:px-7 lg:py-6' : ''">
      <div class="flex items-start justify-between gap-3">
        <h2
          class="font-bold capitalize tracking-tight text-neutral-950 dark:text-neutral-50"
          :class="isHero ? 'text-2xl md:text-3xl' : 'text-lg'"
        >{{ title }}</h2>
        <span
          v-if="language"
          class="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-200"
        >{{ language }}</span>
      </div>
      <p v-if="note" class="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300" :class="isHero ? 'md:text-base' : 'line-clamp-4'">
        {{ note }}
      </p>
      <p v-else-if="description" class="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300" :class="isWide ? 'line-clamp-4' : 'line-clamp-3'">
        {{ description }}
      </p>
      <div v-if="topicList.length" class="mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="topic in topicList"
          :key="topic"
          class="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium capitalize text-neutral-700 dark:bg-white/10 dark:text-neutral-200"
        >{{ String(topic).replaceAll('-', ' ') }}</span>
      </div>
      <div class="mt-auto flex items-center gap-2 pt-5" :class="to ? 'justify-between' : 'justify-end'">
        <router-link
          v-if="to"
          :to="to"
          class="text-sm font-bold text-neutral-950 underline decoration-pink-400/70 underline-offset-4 dark:text-neutral-50"
        >{{ t('projects.details') }}</router-link>
        <div class="flex gap-2">
        <a
          v-if="repoUrl"
          class="icon-btn"
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="t('card.repo')"
        >
          <GithubIcon :size="18" />
        </a>
        <a
          v-if="liveUrl"
          class="icon-btn"
          :href="liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="t('card.live')"
        >
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
            stroke-linejoin="round" height="18" width="18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        </div>
      </div>
    </div>
  </article>
</template>
