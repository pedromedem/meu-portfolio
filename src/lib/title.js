import { findFeatured } from '../content/projects'
import { messages } from '../i18n'

function label(name) {
  return String(name || '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function documentTitle(route, locale) {
  const lang = locale === 'pt' ? 'pt' : 'en'
  const t = (key) => messages[lang][key] ?? messages.en[key] ?? key

  if (route?.name === 'home') return `Lucas — ${t('home.role')}`

  if (route?.name === 'project') {
    const project = findFeatured(route.params?.slug)
    const name = project ? label(project.name) : t('projects.missing')
    return `${name} — Lucas`
  }

  const keys = {
    about: 'about.title',
    projects: 'projects.title',
    resume: 'resume.title',
    'not-found': 'missing.title',
  }

  return `${t(keys[route?.name] || 'missing.title')} — Lucas`
}

export function applyDocumentTitle(route, locale) {
  const title = documentTitle(route, locale)
  document.title = title

  const description = messages[locale === 'pt' ? 'pt' : 'en']['meta.description']
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  return title
}
