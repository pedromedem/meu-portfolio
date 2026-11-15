<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="border-t border-black/10 px-5 py-8 text-sm text-neutral-700 print:hidden dark:border-white/10 dark:text-neutral-200">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 pr-16 sm:flex-row sm:items-center sm:justify-between sm:pr-24">
      <p class="font-semibold text-neutral-950 dark:text-neutral-50">Lucas · {{ t('home.role') }}</p>
      <nav class="flex flex-wrap gap-x-5 gap-y-2" :aria-label="t('footer.label')">
        <a class="font-semibold underline decoration-pink-400/70 underline-offset-4" href="mailto:ssilvalucas2004@gmail.com">{{ t('home.write') }}</a>
        <a class="font-semibold underline decoration-pink-400/70 underline-offset-4" href="https://github.com/pedromedem" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a class="font-semibold underline decoration-pink-400/70 underline-offset-4" href="https://linkedin.com/in/pedro-lucas-santos-silva" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <router-link class="font-semibold underline decoration-pink-400/70 underline-offset-4" to="/resume">{{ t('resume.nav') }}</router-link>
      </nav>
    </div>
  </footer>
</template>
