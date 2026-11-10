<script setup>
import { featured, projectCopy } from '../content/projects'
import { useI18n } from '../i18n'

const { locale, t } = useI18n()

const skills = ['HTML', 'CSS', 'JavaScript', 'Vue', 'React', 'Tailwind', 'Git']

const printResume = () => window.print()
</script>

<template>
  <main class="sheet">
    <article class="rounded-2xl border border-black/10 bg-white px-6 py-8 text-neutral-800 shadow-sm dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-100 sm:px-10 sm:py-10">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">Lucas</h1>
          <p class="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">{{ t('home.role') }}</p>
        </div>
        <button type="button" class="btn-ghost print:hidden" @click="printResume">{{ t('resume.print') }}</button>
      </div>
      <p class="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {{ t('home.before') }} {{ t('home.em') }} {{ t('home.after') }}
      </p>
      <ul class="mt-4 flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-200 sm:flex-row sm:flex-wrap sm:gap-x-5">
        <li><a href="mailto:ssilvalucas2004@gmail.com">ssilvalucas2004@gmail.com</a></li>
        <li><a href="https://github.com/pedromedem" target="_blank" rel="noopener noreferrer">github.com/pedromedem</a></li>
        <li><a href="https://linkedin.com/in/pedro-lucas-santos-silva" target="_blank" rel="noopener noreferrer">linkedin.com/in/pedro-lucas-santos-silva</a></li>
      </ul>

      <h2 class="mt-8 border-t border-black/10 pt-6 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:border-white/10 dark:text-neutral-400">{{ t('resume.skills') }}</h2>
      <p class="mt-3 text-sm text-neutral-800 dark:text-neutral-100">{{ skills.join(' · ') }}</p>

      <h2 class="mt-8 border-t border-black/10 pt-6 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:border-white/10 dark:text-neutral-400">{{ t('resume.projects') }}</h2>
      <div class="mt-4 space-y-4">
        <section v-for="project in featured" :key="project.name">
          <h3 class="text-sm font-bold text-neutral-950 dark:text-neutral-50">{{ project.name.replaceAll('-', ' ') }}</h3>
          <p class="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{{ projectCopy(project.name, locale) }}</p>
          <a class="mt-1 inline-block text-sm underline decoration-pink-400/70 underline-offset-4" :href="project.homepage">{{ project.homepage }}</a>
        </section>
      </div>
    </article>
  </main>
</template>
