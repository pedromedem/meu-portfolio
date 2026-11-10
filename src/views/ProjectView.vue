<script setup>
import { computed, nextTick, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import projectCard from '../components/projectCard.vue'
import skeleton from '../components/skeleton.vue'
import { featured, featuredNames } from '../content/projects'
import { useI18n } from '../i18n'

const { t } = useI18n()
const route = useRoute()

const state = reactive({
  projects: [],
  loading: true,
  erro: false,
})

const projects = computed(() =>
  state.projects
    .filter((repo) => !repo.fork && repo.name !== 'meu-portfolio' && repo.name !== 'vanicce' && !featuredNames.has(repo.name))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
)

const loadProjects = async () => {
  state.loading = true
  state.erro = false

  try {
    const response = await fetch(
      'https://api.github.com/users/pedromedem/repos?sort=updated&per_page=100&type=owner',
      { headers: { Accept: 'application/vnd.github+json' } }
    )
    const data = await response.json()

    if (!response.ok || !Array.isArray(data)) {
      state.erro = true
      state.projects = []
      return
    }

    state.projects = data
  } catch (error) {
    console.error('An error occurred while loading repositories:', error)
    state.erro = true
  } finally {
    state.loading = false
  }
}

onMounted(async () => {
  await loadProjects()
  const id = decodeURIComponent(route.hash.replace('#', ''))
  if (!id) return
  await nextTick()
  document.getElementById(id)?.scrollIntoView({ block: 'center' })
})
</script>

<template>
  <main class="page page-wide">
    <header class="max-w-2xl">
      <p class="eyebrow">{{ t('projects.kicker') }}</p>
      <h1 class="mt-3 text-3xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 md:text-4xl">
        {{ t('projects.title') }}
      </h1>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
        {{ t('projects.before') }}
        <a
          href="https://docs.github.com/pt/rest/quickstart?apiVersion=2022-11-28"
          class="font-semibold text-neutral-950 underline decoration-pink-400/70 underline-offset-4 dark:text-neutral-50"
          target="_blank"
          rel="noopener noreferrer"
        >{{ t('projects.api') }}</a>.
      </p>
    </header>

    <section class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <projectCard
        v-for="repo in featured"
        :key="repo.name"
        :name="repo.name"
        :language="repo.language"
        :homepage="repo.homepage"
        :html_url="repo.html_url"
        :topics="repo.topics"
      />
    </section>

    <section class="flex flex-col gap-6 md:gap-8">
      <h2 class="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">{{ t('projects.more') }}</h2>

      <div v-if="state.erro" class="surface mx-auto max-w-xl px-6 py-10 text-center">
        <p class="text-neutral-600 dark:text-neutral-300">{{ t('projects.error') }}</p>
      </div>
      <div v-else-if="state.loading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <skeleton />
        <skeleton />
        <skeleton />
      </div>
      <div v-else-if="projects.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <projectCard
          v-for="repo in projects"
          :key="repo.id"
          :name="repo.name"
          :description="repo.description"
          :language="repo.language"
          :homepage="repo.homepage"
          :html_url="repo.html_url"
          :topics="repo.topics"
        />
      </div>
      <div v-else class="surface mx-auto max-w-xl px-6 py-10 text-center">
        <p class="text-neutral-600 dark:text-neutral-300">{{ t('projects.empty') }}</p>
      </div>
    </section>
  </main>
</template>
