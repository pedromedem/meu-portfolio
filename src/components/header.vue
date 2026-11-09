<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '../i18n'

const { locale, t, setLocale } = useI18n()

const isDark = ref(document.documentElement.classList.contains('dark'))
const media = window.matchMedia('(prefers-color-scheme: dark)')

const applyTheme = (dark) => {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
  return nextTick()
}

const toggleTheme = (event) => {
  const next = !isDark.value
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const reveal = !reduce && typeof document.startViewTransition === 'function'

  if (!reveal) {
    applyTheme(next)
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  const transition = document.startViewTransition(() => applyTheme(next))
  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 560,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }).catch(() => {})
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
    <div class="flex h-full items-center gap-3 rounded-full border border-black/10 bg-white/70 px-3 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/50 dark:text-neutral-100 sm:gap-4 sm:px-4">
      <router-link class="element relative after:bg-[#333] dark:after:bg-neutral-50" to="/">{{ t('nav.home') }}</router-link>
      <router-link class="element relative after:bg-[#333] dark:after:bg-neutral-50" to="/about">{{ t('nav.about') }}</router-link>
      <router-link class="element relative after:bg-[#333] dark:after:bg-neutral-50" to="/projects">{{ t('nav.projects') }}</router-link>
      <div class="lang" role="group" :aria-label="t('lang.label')">
        <button type="button" :aria-pressed="locale === 'en'" :aria-label="t('lang.en')" @click="setLocale('en')">
          <svg class="flag" viewBox="0 0 60 30" aria-hidden="true">
            <rect width="60" height="30" fill="#012169" />
            <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" stroke-width="8" />
            <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" stroke-width="4" />
            <path d="M30 0 V30 M0 15 H60" stroke="#fff" stroke-width="14" />
            <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" stroke-width="8" />
          </svg>
          EN
        </button>
        <button type="button" :aria-pressed="locale === 'pt'" :aria-label="t('lang.pt')" @click="setLocale('pt')">
          <svg class="flag" viewBox="0 0 20 14" aria-hidden="true">
            <rect width="20" height="14" fill="#009B3A" />
            <polygon points="10,1.3 18.4,7 10,12.7 1.6,7" fill="#FEDD00" />
            <circle cx="10" cy="7" r="2.35" fill="#002776" />
          </svg>
          BR
        </button>
      </div>
      <button
        type="button"
        class="theme-toggle"
        :aria-label="isDark ? t('theme.light') : t('theme.dark')"
        :aria-pressed="isDark"
        @click="toggleTheme"
      >
        <span class="theme-toggle__icons" :class="{ 'is-dark': isDark }" aria-hidden="true">
          <svg class="theme-toggle__moon" viewBox="0 0 24 24" fill="none">
            <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
          </svg>
          <svg class="theme-toggle__sun" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8" />
            <path d="M12 3v1.8M12 19.2V21M3 12h1.8M19.2 12H21M5.6 5.6l1.3 1.3M17.1 17.1l1.3 1.3M18.4 5.6l-1.3 1.3M6.9 17.1l-1.3 1.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </span>
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

.lang {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.lang button {
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  border-radius: 9999px;
  padding: 0.2rem 0.4rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  opacity: 0.55;
}

.lang button[aria-pressed='true'] {
  opacity: 1;
  background: rgba(23, 23, 23, 0.06);
}

.flag {
  width: 1.05rem;
  height: 0.72rem;
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
}

.lang button:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}

.theme-toggle {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  margin-left: 0.15rem;
  border-radius: 9999px;
  border: 1px solid rgba(23, 23, 23, 0.12);
  background: rgba(255, 255, 255, 0.72);
  color: #171717;
  transition: background-color 0.45s ease, border-color 0.45s ease, color 0.45s ease, transform 0.2s ease;
}

.theme-toggle:hover {
  transform: translateY(-1px);
}

.theme-toggle:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 3px;
}

.theme-toggle__icons {
  display: grid;
  width: 1.05rem;
  height: 1.05rem;
}

.theme-toggle__icons svg {
  grid-area: 1 / 1;
  width: 1.05rem;
  height: 1.05rem;
  transition: opacity 0.45s ease, transform 0.5s ease;
}

.theme-toggle__sun {
  opacity: 0;
  transform: rotate(-70deg) scale(0.7);
}

.theme-toggle__icons.is-dark .theme-toggle__moon {
  opacity: 0;
  transform: rotate(70deg) scale(0.7);
}

.theme-toggle__icons.is-dark .theme-toggle__sun {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .theme-toggle__icons svg {
    transition: none;
  }
}
</style>

<style>
.dark .theme-toggle {
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
  color: #fafaf9;
}

.dark .lang button[aria-pressed='true'] {
  background: rgba(255, 255, 255, 0.12);
}
</style>
