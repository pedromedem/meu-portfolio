<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <main class="stage">
    <section class="surface w-full max-w-md px-8 py-10 text-center">
      <p class="eyebrow">404</p>
      <h1 class="mt-3 text-3xl font-black tracking-tight text-neutral-950 dark:text-neutral-50">
        {{ t('missing.title') }}
      </h1>
      <router-link to="/" class="btn-primary mt-8">{{ t('missing.back') }}</router-link>
    </section>
  </main>
</template>
