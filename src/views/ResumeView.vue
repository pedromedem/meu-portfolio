<script setup>
import { featured, projectCopy } from '../content/projects'
import { useI18n } from '../i18n'

const { locale, t } = useI18n()

const skills = ['HTML', 'CSS', 'JavaScript', 'Vue', 'React', 'Tailwind', 'Git']

const printResume = () => window.print()
</script>

<template>
  <main class="resume mx-auto w-full max-w-3xl px-5 py-6 sm:px-8">
    <article class="surface px-6 py-8 sm:px-10 sm:py-11">
      <p class="eyebrow">{{ t('resume.nav') }}</p>
      <h1 class="mt-3 text-4xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">Lucas</h1>
      <p class="mt-2 text-lg text-neutral-600 dark:text-neutral-300">{{ t('home.role') }}</p>
      <p class="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
        {{ t('home.before') }} {{ t('home.em') }} {{ t('home.after') }}
      </p>
      <ul class="mt-4 space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
        <li><a href="mailto:ssilvalucas2004@gmail.com">ssilvalucas2004@gmail.com</a></li>
        <li><a href="https://github.com/pedromedem" target="_blank" rel="noopener noreferrer">github.com/pedromedem</a></li>
        <li><a href="https://linkedin.com/in/pedro-lucas-santos-silva" target="_blank" rel="noopener noreferrer">linkedin.com/in/pedro-lucas-santos-silva</a></li>
      </ul>

      <h2 class="mt-10 text-xl font-black text-neutral-950 dark:text-neutral-50">{{ t('resume.skills') }}</h2>
      <p class="mt-3 text-neutral-700 dark:text-neutral-200">{{ skills.join(' · ') }}</p>

      <h2 class="mt-10 text-xl font-black text-neutral-950 dark:text-neutral-50">{{ t('resume.projects') }}</h2>
      <div class="mt-4 space-y-5">
        <section v-for="project in featured" :key="project.name">
          <h3 class="font-bold text-neutral-950 dark:text-neutral-50">{{ project.name.replaceAll('-', ' ') }}</h3>
          <p class="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{{ projectCopy(project.name, locale) }}</p>
          <a class="mt-1 inline-block text-sm font-semibold underline decoration-pink-400/70 underline-offset-4" :href="project.homepage">{{ project.homepage }}</a>
        </section>
      </div>

      <button type="button" class="btn-primary mt-10 print:hidden" @click="printResume">{{ t('resume.print') }}</button>
    </article>
  </main>
</template>
