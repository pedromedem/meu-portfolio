<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findFeatured, projectCopy } from '../content/projects'
import { useI18n } from '../i18n'
import { safeHttpUrl, screenshotFor } from '../lib/url'

const { locale, t } = useI18n()
const route = useRoute()
const imageFailed = ref(false)

const project = computed(() => findFeatured(route.params.slug))
const title = computed(() => (project.value ? project.value.name.replace(/[-_]/g, ' ') : ''))
const note = computed(() => (project.value ? projectCopy(project.value.name, locale.value) : ''))
const live = computed(() => safeHttpUrl(project.value?.homepage))
const repo = computed(() => safeHttpUrl(project.value?.html_url))
const shot = computed(() => screenshotFor(project.value?.homepage))
const initial = computed(() => title.value.charAt(0).toUpperCase())

watch(() => route.params.slug, () => {
  imageFailed.value = false
})
</script>

<template>
  <main v-if="project" class="page max-w-3xl gap-8 md:gap-10">
    <router-link
      :to="{ path: '/projects', query: route.query }"
      class="w-fit text-sm font-bold text-neutral-950 underline decoration-pink-400/70 underline-offset-4 dark:text-neutral-50"
    >{{ t('projects.back') }}</router-link>

    <header>
      <p class="eyebrow">{{ project.language }}</p>
      <h1 class="mt-3 text-4xl font-black capitalize tracking-tight text-neutral-950 dark:text-neutral-50 md:text-5xl">
        {{ title }}
      </h1>
      <p class="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
        {{ note }}
      </p>
    </header>

    <figure class="overflow-hidden rounded-[28px] border border-black/10 bg-neutral-200 dark:border-white/10 dark:bg-neutral-900">
      <img
        v-if="shot && !imageFailed"
        class="aspect-[16/10] w-full object-cover"
        :src="shot"
        :alt="title"
        @error="imageFailed = true"
      />
      <div v-else class="grid aspect-[16/10] place-items-center bg-gradient-to-br from-pink-500 via-violet-600 to-neutral-950">
        <span class="text-7xl font-black text-white/80">{{ initial }}</span>
      </div>
    </figure>

    <div class="flex flex-wrap gap-3">
      <a v-if="live" class="btn-primary" :href="live" target="_blank" rel="noopener noreferrer">{{ t('card.live') }}</a>
      <a v-if="repo" class="btn-ghost" :href="repo" target="_blank" rel="noopener noreferrer">{{ t('card.repo') }}</a>
    </div>

    <ul v-if="project.topics?.length" class="flex flex-wrap gap-2">
      <li v-for="topic in project.topics" :key="topic" class="rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium capitalize text-neutral-700 dark:border-white/20 dark:text-neutral-200">{{ String(topic).replaceAll('-', ' ') }}</li>
    </ul>
  </main>

  <main v-else class="stage">
    <section class="flex w-full max-w-md flex-col items-center text-center">
      <h1 class="text-3xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
        {{ t('projects.missing') }}
      </h1>
      <router-link to="/projects" class="btn-primary mt-8">{{ t('projects.back') }}</router-link>
    </section>
  </main>
</template>
