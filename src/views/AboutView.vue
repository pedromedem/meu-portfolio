<script setup>
import contact from '../components/contact.vue'
import scrollComponent from '../components/scrollComponent.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const techs = [
  { name: 'HTML5', label: 'HTML', to: '/projects/pomodoro' },
  { name: 'CSS3', label: 'CSS', to: '/projects/pomodoro' },
  { name: 'JavaScript', label: 'JavaScript', to: '/projects/pomodoro' },
  { name: 'vue', label: 'Vue', to: '/projects/github-card' },
  { name: 'react', label: 'React', to: '/projects/link-tree' },
  { name: 'tailwind', label: 'Tailwind', to: '/projects/github-card' },
  { name: 'git', label: 'Git', href: 'https://github.com/pedromedem' },
]
</script>

<template>
  <main class="page">
    <section class="surface surface-pad">
      <p class="eyebrow">{{ t('about.kicker') }}</p>
      <h1 class="page-title">
        {{ t('about.title') }}
      </h1>
      <div class="page-lead space-y-5">
        <p>{{ t('about.p1') }}</p>
        <p>{{ t('about.p2') }}</p>
      </div>
    </section>

    <section class="flex flex-col gap-6 md:gap-8">
      <div>
        <p class="eyebrow">{{ t('about.stack') }}</p>
        <h2 class="block-title mt-4">{{ t('about.skills') }}</h2>
      </div>
      <div class="scroller-mask -mx-5 overflow-hidden sm:-mx-8 md:-mx-10">
        <div class="scroller_inner flex w-max gap-3.5 px-5 py-4 sm:px-8 md:px-10">
          <scrollComponent v-for="tech in techs" :key="tech.name" :name="tech.name" :label="tech.label" :to="tech.to" :href="tech.href" />
          <scrollComponent v-for="tech in techs" :key="`${tech.name}-copy`" :name="tech.name" :label="tech.label" :to="tech.to" :href="tech.href" duplicate />
        </div>
      </div>
    </section>

    <section class="grid items-start gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
      <div class="surface surface-pad flex flex-col">
        <div>
          <p class="eyebrow">{{ t('about.work') }}</p>
          <p class="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
            {{ t('about.workBody') }}
          </p>
        </div>
        <div class="mt-8 flex flex-wrap gap-3">
          <router-link to="/projects" class="btn-primary">{{ t('nav.projects') }}</router-link>
          <router-link to="/resume" class="btn-ghost">{{ t('resume.nav') }}</router-link>
        </div>
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
