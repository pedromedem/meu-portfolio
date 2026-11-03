<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const card = ref(null)
let frame = 0

const isMobile = () => /Mobi|Android/i.test(navigator.userAgent)

const handleMouse = (event) => {
  const el = card.value
  if (!el) return

  const mouseX = event.clientX
  const mouseY = event.clientY
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  const deltaX = mouseX - centerX
  const deltaY = mouseY - centerY
  const angleX = (deltaY / centerY) * 22
  const angleY = (-deltaX / centerX) * 22

  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    el.style.transform = `rotate3d(1, 0, 0, ${angleX}deg) rotate3d(0, 1, 0, ${angleY}deg)`
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((mouseX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--my', `${((mouseY - rect.top) / rect.height) * 100}%`)
  })
}

onMounted(() => {
  if (isMobile() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  window.addEventListener('mousemove', handleMouse)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouse)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <main class="flex items-center justify-center px-4 py-6 sm:px-8">
    <div class="scene w-full max-w-3xl">
      <article ref="card" class="profile-card">
        <div class="profile-card__glow profile-card__glow--pink" aria-hidden="true" />
        <div class="profile-card__glow profile-card__glow--violet" aria-hidden="true" />
        <div class="profile-card__glare" aria-hidden="true" />

        <div class="relative z-[1] flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-11">
          <div class="avatar-ring shrink-0">
            <img
              class="avatar-ring__photo"
              src="https://avatars.githubusercontent.com/u/103083001?v=4"
              alt="Portrait of Lucas"
              width="156"
              height="156"
            />
          </div>

          <div class="flex min-w-0 flex-col items-center text-center md:items-start md:text-left">
            <p class="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
              Front-end developer
            </p>
            <h1 class="mt-3 text-3xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl md:text-5xl">
              Hi, my name is Lucas.
            </h1>
            <p class="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-lg">
              Passionate about
              <span class="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-semibold text-transparent">creating intuitive user experiences</span>.
              Always seeking new challenges and ways to improve my skills. Here you will find some projects and learn a little about me.
            </p>
            <p class="mt-4 text-sm font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
              JavaScript · Vue · Tailwind
            </p>
            <div class="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <router-link to="/about" class="btn-primary">Enjoy</router-link>
              <router-link to="/projects" class="btn-ghost">Projects</router-link>
            </div>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.scene {
  perspective: 1400px;
}

.profile-card {
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  padding: 1.75rem;
  transform-style: preserve-3d;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(250, 250, 249, 0.9));
  border: 1px solid rgba(15, 15, 15, 0.08);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.75) inset,
    0 30px 70px -36px rgba(40, 10, 60, 0.45);
}

.profile-card__glow {
  position: absolute;
  width: 16rem;
  height: 16rem;
  border-radius: 9999px;
  filter: blur(50px);
  pointer-events: none;
}

.profile-card__glow--pink {
  top: -5.5rem;
  right: -3rem;
  background: rgba(236, 72, 153, 0.34);
}

.profile-card__glow--violet {
  bottom: -6.5rem;
  left: -3rem;
  background: rgba(139, 92, 246, 0.3);
}

.profile-card__glare {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(255, 255, 255, 0.42), transparent 42%);
}

.avatar-ring {
  width: 148px;
  height: 148px;
  padding: 3px;
  border-radius: 9999px;
  background: conic-gradient(from var(--angle), #fb7185, #a78bfa, #e879f9, #fb7185);
  animation: spin-ring 12s linear infinite;
  box-shadow: 0 18px 40px -22px rgba(139, 92, 246, 0.9);
}

.avatar-ring__photo {
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  object-fit: cover;
  background: #171717;
  border: 3px solid #fafaf9;
}

@keyframes spin-ring {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@media (min-width: 768px) {
  .profile-card {
    padding: 2.75rem;
  }

  .avatar-ring {
    width: 164px;
    height: 164px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .avatar-ring,
  .profile-card,
  .profile-card__glare {
    animation: none;
    transition: none;
  }

  .profile-card__glare {
    display: none;
  }
}
</style>

<style>
.dark .profile-card.profile-card {
  background: linear-gradient(180deg, rgba(32, 32, 32, 0.96), rgba(18, 18, 18, 0.94));
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    0 30px 80px -36px rgba(0, 0, 0, 0.75);
}

.dark .profile-card__glare {
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(255, 255, 255, 0.14), transparent 42%);
}

.dark .avatar-ring__photo {
  border-color: #171717;
}
</style>
