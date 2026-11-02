<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isDark = ref(document.documentElement.classList.contains('dark'))
const media = window.matchMedia('(prefers-color-scheme: dark)')

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const onSchemeChange = (event) => {
  if (localStorage.getItem('theme')) return
  isDark.value = event.matches
  document.documentElement.classList.toggle('dark', event.matches)
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  media.addEventListener('change', onSchemeChange)
})

onBeforeUnmount(() => {
  media.removeEventListener('change', onSchemeChange)
})
</script>

<template>
  <div>
    <div class="flex h-full items-center gap-4 rounded-full border border-black/10 bg-white/70 px-4 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/50 dark:text-neutral-100">
      <router-link class="element relative after:bg-[#333] dark:after:bg-neutral-50" to="/">Home</router-link>
      <router-link class="element relative after:bg-[#333] dark:after:bg-neutral-50" to="/about">About</router-link>
      <router-link class="element relative after:bg-[#333] dark:after:bg-neutral-50" to="/projects">Projects</router-link>
      <button
        type="button"
        class="border-l border-neutral-300 pl-3 transition dark:border-white/20"
        :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
        :aria-pressed="isDark"
        @click="toggleTheme"
      >
        <img width="19" height="19" :src="isDark ? '/sun.svg' : '/moon.svg'" alt="">
      </button>
    </div>
  </div>
</template>

<style scoped>
.element::after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.element:hover::after,
a.router-link-active::after {
  transform: scaleX(1);
}
</style>
