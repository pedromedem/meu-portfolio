<script setup>
import contact from '../components/contact.vue'
import scrollComponent from '../components/scrollComponent.vue'

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
  <main class="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 py-6 sm:px-6 md:py-10">
    <section class="surface px-6 py-8 sm:px-10 sm:py-12">
      <p class="eyebrow">About</p>
      <h1 class="mt-3 text-3xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl md:text-5xl">
        About Me
      </h1>
      <div class="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
        <p>I'm Lucas, an aspiring programmer on a <strong class="font-semibold text-neutral-950 dark:text-neutral-50">continuous learning journey</strong>.
          Currently, I'm dedicated to honing my skills in programming and exploring the diverse realms of software
          development.</p>
        <p>I am investing my time in studies, acquiring knowledge in <strong class="font-semibold text-neutral-950 dark:text-neutral-50">JavaScript, Vue and
            Tailwind</strong>. My passion for problem-solving and creating innovative solutions drives me to delve deep into
          the programming universe.</p>
      </div>
    </section>

    <section>
      <div class="mb-5">
        <p class="eyebrow">Stack</p>
        <h2 class="mt-3 text-3xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 md:text-4xl">My Skills</h2>
      </div>
      <div class="scroller-mask -mx-4 overflow-hidden sm:-mx-6">
        <div class="scroller_inner flex w-max gap-3 px-4 py-3 sm:px-6">
          <scrollComponent v-for="tech in techs" :key="tech.name" :name="tech.name" :label="tech.label" />
          <scrollComponent v-for="tech in techs" :key="`${tech.name}-copy`" :name="tech.name" :label="tech.label" duplicate />
        </div>
      </div>
    </section>

    <section class="grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div class="surface flex flex-col justify-between px-6 py-8 sm:px-10">
        <div>
          <p class="eyebrow">Work</p>
          <p class="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
            Throughout my learning journey, I have developed projects. Each project represents a
            significant step in my evolution as a programmer, showcasing my ability to apply learned concepts in
            <strong class="font-semibold text-neutral-950 dark:text-neutral-50">practical scenarios.</strong>
          </p>
          <p class="mt-4 italic text-neutral-500 dark:text-neutral-400">To see my projects click here!</p>
        </div>
        <router-link to="/projects" class="btn-primary mt-8 self-start">Projects</router-link>
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
