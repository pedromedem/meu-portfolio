<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <main class="page">
    <section class="surface surface-pad text-center">
      <p class="eyebrow">404</p>
      <h1 class="page-title">
        {{ t('missing.title') }}
      </h1>
      <router-link to="/" class="btn-primary mt-8">{{ t('missing.back') }}</router-link>
    </section>
  </main>
</template>
