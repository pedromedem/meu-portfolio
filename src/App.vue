<script setup>
import Header from './components/header.vue'
import siteFooter from './components/siteFooter.vue'
import floatingbutton from './components/floatingbutton.vue'
import { useI18n } from './i18n'

const { t } = useI18n()
</script>

<template>
  <a class="skip-link" href="#content">{{ t('skip') }}</a>
  <Header class="fixed inset-x-0 top-0 z-50 mt-3 flex h-auto min-h-12 justify-center px-3 py-1 sm:mt-4 sm:px-6" />
  <div id="content" tabindex="-1">
    <router-view class="h-full min-h-[100dvh] bg-stone-100 pt-28 pb-16 selection:bg-neutral-800 selection:text-neutral-200 dark:bg-neutral-900 dark:selection:bg-neutral-100 dark:selection:text-neutral-800" />
  </div>
  <siteFooter />
  <floatingbutton />
</template>
