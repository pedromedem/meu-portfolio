<script setup>
import { computed, onMounted, reactive } from 'vue'
import projectCard from '../components/projectCard.vue'
import skeleton from '../components/skeleton.vue'

const state = reactive({
  projects: [],
  loading: true,
  erro: false,
})

const projects = computed(() =>
  state.projects
    .filter((repo) => !repo.fork && repo.name !== 'meu-portfolio' && repo.name !== 'vanicce')
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

onMounted(loadProjects)
</script>

<template>
  <main class="flex flex-col px-4 dark:text-neutral-300 md:px-14">
    <div class="mb-10 flex flex-col justify-center">
      <h1 class="p-4 text-center text-xl font-black md:text-4xl">Main Projects</h1>
      <p class="self-center italic md:text-lg">All projects listed here are updated via the <a
          href="https://docs.github.com/pt/rest/quickstart?apiVersion=2022-11-28" class="underline" target="_blank"
          rel="noopener noreferrer">GitHub
          API</a>.</p>
    </div>
    <section>
      <div v-if="state.erro">
        <p class="text-center">Sorry, no data available at the moment.
        </p>
      </div>
      <div v-else-if="state.loading">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <skeleton />
          <skeleton />
          <skeleton />
        </div>
      </div>
      <div v-else-if="projects.length > 0" class="columns-1 gap-8 sm:columns-2 lg:columns-3">
        <projectCard class="mb-6 break-inside-avoid" v-for="repo in projects" :key="repo.id" :name="repo.name"
          :description="repo.description" :language="repo.language" :homepage="repo.homepage" :html_url="repo.html_url"
          :topics="repo.topics" />
      </div>
      <div v-else>
        <p class="text-center">No projects to show yet.</p>
      </div>
    </section>
  </main>
</template>
