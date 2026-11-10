<script setup>
import Header from './components/header.vue';
import floatingbutton from './components/floatingbutton.vue'

</script>

<template>
  <Header class="fixed inset-x-0 top-0 z-50 mt-3 flex h-auto min-h-12 justify-center px-3 py-1 sm:mt-4 sm:px-6" />
  <router-view class="h-full min-h-[100dvh] bg-stone-100 pt-28 pb-16 selection:bg-neutral-800 selection:text-neutral-200 dark:bg-neutral-900 dark:selection:bg-neutral-100 dark:selection:text-neutral-800 sm:py-16" />
  <floatingbutton />
</template>
