<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../i18n'
import { projectCopy } from '../content/projects'
import { safeHttpUrl, screenshotFor } from '../lib/url'

const { locale } = useI18n()

const props = defineProps({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  language: { type: String, default: '' },
  html_url: { type: String, default: '' },
  homepage: { type: String, default: '' },
  topics: { type: Array, default: () => [] },
  to: { type: [String, Object], default: '' },
  size: { type: String, default: 'cell' },
})

const imageFailed = ref(false)

const liveUrl = computed(() => safeHttpUrl(props.homepage))
const repoUrl = computed(() => safeHttpUrl(props.html_url))
const title = computed(() => String(props.name || '').replace(/[-_]/g, ' '))
const initial = computed(() => title.value.charAt(0).toUpperCase())
const note = computed(() => projectCopy(props.name, locale.value) || props.description)
const screenshot = computed(() => (imageFailed.value ? '' : screenshotFor(props.homepage)))
const isHero = computed(() => props.size === 'hero')
const href = computed(() => (props.to ? '' : liveUrl.value || repoUrl.value))
const label = computed(() => `${title.value}. ${props.language || ''}`.trim())
</script>

<template>
  <router-link
    v-if="to"
    :id="name"
    :to="to"
    class="project-tile"
    :class="isHero ? 'project-tile--hero' : ''"
    :aria-label="label"
  >
    <span class="project-tile__media" aria-hidden="true">
      <span v-if="!screenshot" class="project-tile__letter">{{ initial }}</span>
      <img v-else :src="screenshot" alt="" @error="imageFailed = true" />
    </span>
    <span class="project-tile__copy">
      <span v-if="language" class="project-tile__lang">{{ language }}</span>
      <span class="project-tile__title">{{ title }}</span>
      <span v-if="isHero && note" class="project-tile__note">{{ note }}</span>
    </span>
  </router-link>
  <a
    v-else
    :id="name"
    class="project-tile"
    :class="isHero ? 'project-tile--hero' : ''"
    :href="href || undefined"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    :aria-label="label"
  >
    <span class="project-tile__media" aria-hidden="true">
      <span v-if="!screenshot" class="project-tile__letter">{{ initial }}</span>
      <img v-else :src="screenshot" alt="" @error="imageFailed = true" />
    </span>
    <span class="project-tile__copy">
      <span v-if="language" class="project-tile__lang">{{ language }}</span>
      <span class="project-tile__title">{{ title }}</span>
      <span v-if="isHero && note" class="project-tile__note">{{ note }}</span>
    </span>
  </a>
</template>

<style scoped>
.project-tile {
  position: relative;
  display: flex;
  min-height: 220px;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #171717;
  color: #fafaf9;
  isolation: isolate;
}

.project-tile:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 3px;
}

.project-tile__media,
.project-tile__media img,
.project-tile__letter {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.project-tile__media {
  background: linear-gradient(145deg, #ec4899, #7c3aed 55%, #171717);
}

.project-tile__media img {
  object-fit: cover;
  object-position: center;
}

.project-tile__letter {
  display: grid;
  place-items: center;
  font-size: 5.5rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.28);
}

.project-tile__copy {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.35rem;
  width: 100%;
  margin-top: auto;
  padding: 1.15rem 1.25rem 1.2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.28) 62%, transparent 100%);
}

.project-tile__lang {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}

.project-tile__title {
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-transform: capitalize;
}

.project-tile--hero {
  min-height: 320px;
}

.project-tile--hero .project-tile__title {
  font-size: 1.85rem;
}

.project-tile__note {
  max-width: 36rem;
  font-size: 0.92rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.82);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .project-tile,
  .project-tile--hero {
    min-height: 0;
    height: 100%;
  }
}
</style>
