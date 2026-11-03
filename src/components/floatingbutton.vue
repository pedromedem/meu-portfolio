<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const scroll = ref(false)

const scrolling = () => {
  scroll.value = document.documentElement.scrollTop > 20 || document.body.scrollTop > 20
}

const toTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
  scrolling()
  window.addEventListener('scroll', scrolling, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrolling)
})
</script>

<template>
  <button
    type="button"
    aria-label="Back to top"
    :aria-hidden="scroll ? undefined : true"
    :tabindex="scroll ? 0 : -1"
    class="icon-btn fixed bottom-10 right-6 z-40 h-12 w-12 bg-white/80 shadow-[0_16px_40px_-24px_rgba(40,10,60,0.8)] backdrop-blur-md transition duration-500 ease-in-out dark:bg-neutral-900/80 md:right-10"
    :class="scroll ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'"
    @click="toTop"
  >
    <svg class="mx-auto h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="#333" class="dark:stroke-neutral-300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
</template>
