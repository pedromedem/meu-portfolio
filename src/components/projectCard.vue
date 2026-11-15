<script setup>
import { computed, ref } from 'vue'
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
})

const imageFailed = ref(false)

const liveUrl = computed(() => safeHttpUrl(props.homepage))
const repoUrl = computed(() => safeHttpUrl(props.html_url))
const title = computed(() => String(props.name || '').replace(/[-_]/g, ' '))
const initial = computed(() => title.value.charAt(0).toUpperCase())
const topicList = computed(() => (Array.isArray(props.topics) ? props.topics : []))
const note = computed(() => projectCopy(props.name, locale.value))
const screenshot = computed(() => screenshotFor(props.homepage))
</script>

<template>
  <article :id="name" class="flex h-full flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_24px_50px_-36px_rgba(40,10,60,0.45)] transition duration-300 hover:-translate-y-1 dark:border-white/15 dark:bg-[#2a2a2a] dark:shadow-[0_24px_50px_-32px_rgba(0,0,0,0.85)]">
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
        <span class="text-6xl font-black text-white/80">{{ initial }}</span>
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

    <div class="flex flex-1 flex-col px-5 pb-5 pt-4">
      <div class="flex items-start justify-between gap-3">
        <h2 class="text-lg font-bold capitalize tracking-tight text-neutral-950 dark:text-neutral-50">{{ title }}</h2>
        <span
          v-if="language"
          class="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:bg-white/10 dark:text-neutral-200"
        >{{ language }}</span>
      </div>
      <p v-if="note" class="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {{ note }}
      </p>
      <p v-else-if="description" class="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
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
        <div class="flex flex-wrap justify-end gap-2">
        <a
          v-if="liveUrl"
          class="text-sm font-bold text-neutral-950 underline decoration-pink-400/70 underline-offset-4 dark:text-neutral-50"
          :href="liveUrl"
          target="_blank"
          rel="noopener noreferrer"
        >{{ t('card.site') }}</a>
        <a
          v-if="repoUrl"
          class="text-sm font-bold text-neutral-950 underline decoration-pink-400/70 underline-offset-4 dark:text-neutral-50"
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >{{ t('card.code') }}</a>
        </div>
      </div>
    </div>
  </article>
</template>
