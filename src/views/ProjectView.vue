<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import projectCard from '../components/projectCard.vue'
import skeleton from '../components/skeleton.vue'
import { featured, featuredNames, projectPath } from '../content/projects'
import { useI18n } from '../i18n'
import { bentoSpans, filterCatalog, languagesIn } from '../lib/catalog'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
const language = ref(typeof route.query.lang === 'string' ? route.query.lang.toLowerCase() : '')

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

const catalog = computed(() => [...featured, ...projects.value])
const languageOptions = computed(() => languagesIn(catalog.value))
const visible = computed(() => filterCatalog(catalog.value, { query: query.value, language: language.value }))
const visibleFeatured = computed(() => visible.value.filter((project) => featuredNames.has(project.name)))
const visibleRest = computed(() => visible.value.filter((project) => !featuredNames.has(project.name)))
const filtering = computed(() => query.value.trim() !== '' || language.value !== '')
const shownCount = computed(() => visibleFeatured.value.length + visibleRest.value.length)
const listQuery = computed(() => {
  const next = {}
  const q = query.value.trim()
  if (q) next.q = q
  if (language.value) next.lang = language.value
  return next
})

const clearFilters = () => {
  query.value = ''
  language.value = ''
}

const pickLanguage = (id) => {
  language.value = language.value === id ? '' : id
}

const spanClass = {
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  6: 'lg:col-span-6',
}

const featuredCell = (index, total) => {
  if (total <= 1) return 'md:col-span-2 lg:col-span-6'
  if (total === 2) return 'lg:col-span-3'
  if (index === 0) return 'md:col-span-2 lg:col-span-4 lg:row-span-2'
  return 'lg:col-span-2'
}

const featuredSize = (index, total) => {
  if (total >= 3 && index === 0) return 'hero'
  if (total === 1) return 'wide'
  return 'tile'
}

const restCell = (index, total) => {
  const span = bentoSpans(total)[index]
  const tablet = span >= 4 ? 'md:col-span-2' : ''
  return [tablet, spanClass[span]].filter(Boolean).join(' ')
}

const restSize = (index, total) => (bentoSpans(total)[index] >= 4 ? 'wide' : 'tile')

watch([query, language], () => {
  const next = {}
  const q = query.value.trim()
  if (q) next.q = q
  if (language.value) next.lang = language.value
  const same = String(route.query.q || '') === (next.q || '') && String(route.query.lang || '') === (next.lang || '')
  if (same) return
  router.replace({ query: next, hash: route.hash })
})

watch(
  () => [String(route.query.q || ''), String(route.query.lang || '').toLowerCase()],
  ([q, lang]) => {
    const typing = document.activeElement?.id === 'project-search'
    if (!typing && query.value.trim() !== q) query.value = q
    if (language.value !== lang) language.value = lang
  }
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

    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label class="sr-only" for="project-search">{{ t('projects.search') }}</label>
        <input
          id="project-search"
          v-model="query"
          class="field w-full rounded-full sm:max-w-xs"
          type="search"
          :placeholder="t('projects.search')"
        />
        <p class="text-sm text-neutral-500 dark:text-neutral-400" aria-live="polite">
          {{ state.loading ? t('projects.loading') : `${shownCount} ${shownCount === 1 ? t('projects.one') : t('projects.many')}` }}
        </p>
      </div>
      <div class="flex flex-wrap gap-2" role="group" :aria-label="t('projects.all')">
        <button type="button" class="chip" :class="{ 'is-on': language === '' }" :aria-pressed="language === ''" @click="language = ''">{{ t('projects.all') }}</button>
        <button
          v-for="option in languageOptions"
          :key="option.id"
          type="button"
          class="chip"
          :class="{ 'is-on': language === option.id }"
          :aria-pressed="language === option.id"
          @click="pickLanguage(option.id)"
        >{{ option.label }}</button>
        <button v-if="filtering" type="button" class="chip" @click="clearFilters">{{ t('projects.clear') }}</button>
      </div>
    </div>

    <p
      v-if="!state.loading && !state.erro && filtering && !visibleFeatured.length && !visibleRest.length"
      class="text-neutral-600 dark:text-neutral-300"
    >{{ t('projects.none') }}</p>

    <section v-if="visibleFeatured.length" class="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
      <projectCard
        v-for="(repo, index) in visibleFeatured"
        :key="repo.name"
        :class="featuredCell(index, visibleFeatured.length)"
        :name="repo.name"
        :language="repo.language"
        :homepage="repo.homepage"
        :html_url="repo.html_url"
        :topics="repo.topics"
        :size="featuredSize(index, visibleFeatured.length)"
        :to="{ path: projectPath(repo.name), query: listQuery }"
      />
    </section>

    <section v-if="state.erro || state.loading || visibleRest.length || !filtering" class="flex flex-col gap-6 md:gap-8">
      <h2 class="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">{{ t('projects.more') }}</h2>

      <div v-if="state.erro" class="surface mx-auto max-w-xl px-6 py-10 text-center">
        <p class="text-neutral-600 dark:text-neutral-300">{{ t('projects.error') }}</p>
      </div>
      <div v-else-if="state.loading" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        <skeleton class="md:col-span-2 lg:col-span-4" />
        <skeleton class="lg:col-span-2" />
        <skeleton class="lg:col-span-2" />
        <skeleton class="md:col-span-2 lg:col-span-4" />
      </div>
      <div v-else-if="visibleRest.length" class="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        <projectCard
          v-for="(repo, index) in visibleRest"
          :key="repo.id"
          :class="restCell(index, visibleRest.length)"
          :name="repo.name"
          :description="repo.description"
          :language="repo.language"
          :homepage="repo.homepage"
          :html_url="repo.html_url"
          :topics="repo.topics"
          :size="restSize(index, visibleRest.length)"
        />
      </div>
      <div v-else-if="!filtering" class="surface mx-auto max-w-xl px-6 py-10 text-center">
        <p class="text-neutral-600 dark:text-neutral-300">{{ t('projects.empty') }}</p>
      </div>
    </section>
  </main>
</template>
