<script setup>
import contact from '../components/contact.vue'
import scrollComponent from '../components/scrollComponent.vue'

const techs = ['HTML5', 'CSS3', 'JavaScript', 'vue', 'react', 'tailwind', 'mySQL', 'git']
</script>

<template>
  <main class="flex flex-col dark:text-[#BBBBBB] lg:px-20">
    <section class="flex flex-col items-center justify-center gap-4 p-3">
      <h1 class="text-xl font-bold text-shark dark:text-[#BBBBBB] md:text-4xl">About Me</h1>
      <p class="md:w-full md:text-xl">I'm Lucas, an aspiring programmer on a <strong>continuous learning journey</strong>.
        Currently, I'm dedicated to honing my skills in programming and exploring the diverse realms of software
        development.</p>

      <p class="md:text-xl">I am investing my time in studies, acquiring knowledge in <strong>JavaScript, Vue and
          Tailwind</strong>. My passion for problem-solving and creating innovative solutions drives me to delve deep into
        the programming universe.</p>
    </section>

    <section class="flex flex-col items-center gap-4">
      <h2 class="text-xl font-bold text-shark dark:text-[#BBBBBB] md:text-4xl">My Skills</h2>
      <div class="w-full overflow-hidden md:w-2/4">
        <div class="scroller_inner flex w-fit flex-nowrap gap-10 p-4 px-4">
          <scrollComponent v-for="tech in techs" :key="tech" :tech="tech" />
          <scrollComponent v-for="tech in techs" :key="`${tech}-copy`" :tech="tech" duplicate />
        </div>
      </div>
    </section>

    <section class="flex flex-col items-center">
      <p class="p-3 md:text-xl">Throughout my learning journey, I have developed projects. Each project represents a
        significant step in my evolution as a programmer, showcasing my ability to apply learned concepts in
        <strong>practical scenarios.</strong>
      </p>

      <p class="self-center p-1 italic md:text-xl">To see my projects click here!</p>
      <router-link to="/projects"
        class="m-3 rounded-md border border-black p-2 text-center font-bold transition dark:border-[#BBBBBB] md:self-center md:text-xl md:hover:scale-110">Projects</router-link>

      <contact />
    </section>
  </main>
</template>

<style scoped>
.scroller_inner {
  animation: scroll 30s linear infinite;
}

.scroller_inner:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  from {
    transform: translate(0%);
  }

  to {
    transform: translate(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroller_inner {
    animation: none;
  }
}
</style>
