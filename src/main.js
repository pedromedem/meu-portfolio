import { createApp, watch } from 'vue'

import App from './App.vue'
import router from './router'
import { locale } from './i18n'
import { applyDocumentTitle } from './lib/title'
import './input.css'

const app = createApp(App)

app.use(router)

watch(
  [() => router.currentRoute.value.fullPath, locale],
  () => applyDocumentTitle(router.currentRoute.value, locale.value),
  { immediate: true }
)

app.mount('#app')
