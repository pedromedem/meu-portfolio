<script setup>
import contact from '../components/contact.vue'
import scrollComponent from '../components/scrollComponent.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const techs = [
  { name: 'HTML5', label: 'HTML' },
  { name: 'CSS3', label: 'CSS' },
  { name: 'JavaScript', label: 'JavaScript' },
  { name: 'vue', label: 'Vue' },
  { name: 'react', label: 'React' },
  { name: 'tailwind', label: 'Tailwind' },
  { name: 'mySQL', label: 'MySQL' },
  { name: 'git', label: 'Git' },
]
</script>

<template>
  <main class="mx-auto mb-6 mt-6 flex w-full max-w-5xl flex-col gap-12 px-5 sm:px-8 md:mb-10 md:mt-8 md:gap-16 md:px-10">
    <section class="surface px-6 py-8 sm:px-10 sm:py-11 lg:px-12">
      <p class="eyebrow">{{ t('about.kicker') }}</p>
      <h1 class="mt-4 text-3xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl md:text-5xl">
        {{ t('about.title') }}
      </h1>
      <div class="mt-7 max-w-3xl space-y-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
        <p>{{ t('about.p1a') }} <strong class="font-semibold text-neutral-950 dark:text-neutral-50">{{ t('about.p1b') }}</strong>.
          {{ t('about.p1c') }}</p>
        <p>{{ t('about.p2a') }} <strong class="font-semibold text-neutral-950 dark:text-neutral-50">{{ t('about.p2b') }}</strong>.
          {{ t('about.p2c') }}</p>
      </div>
    </section>

    <section class="flex flex-col gap-6 md:gap-8">
      <div>
        <p class="eyebrow">{{ t('about.stack') }}</p>
        <h2 class="mt-4 text-3xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 md:text-4xl">{{ t('about.skills') }}</h2>
      </div>
      <div class="scroller-mask -mx-5 overflow-hidden sm:-mx-8 md:-mx-10">
        <div class="scroller_inner flex w-max gap-3.5 px-5 py-4 sm:px-8 md:px-10">
          <scrollComponent v-for="tech in techs" :key="tech.name" :name="tech.name" :label="tech.label" />
          <scrollComponent v-for="tech in techs" :key="`${tech.name}-copy`" :name="tech.name" :label="tech.label" duplicate />
        </div>
      </div>
    </section>

    <section class="grid items-stretch gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
      <div class="surface flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
        <div>
          <p class="eyebrow">{{ t('about.work') }}</p>
          <p class="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
            {{ t('about.workBody') }}
            <strong class="font-semibold text-neutral-950 dark:text-neutral-50">{{ t('about.workEm') }}</strong>
          </p>
          <p class="mt-5 italic text-neutral-500 dark:text-neutral-400">{{ t('about.hint') }}</p>
        </div>
        <router-link to="/projects" class="btn-primary mt-10 self-start">{{ t('nav.projects') }}</router-link>
      </div>
      <contact />
    </section>
  </main>
</template>

<style scoped>
.scroller-mask {
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.scroller_inner {
  animation: scroll 32s linear infinite;
}

.scroller-mask:hover .scroller_inner {
  animation-play-state: paused;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroller_inner {
    animation: none;
    width: auto;
    max-width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
