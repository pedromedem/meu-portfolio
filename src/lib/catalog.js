function normalize(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').trim()
}

const languageLabels = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  html: 'HTML',
  css: 'CSS',
  vue: 'Vue',
  python: 'Python',
  go: 'Go',
}

export function languageLabel(language) {
  const id = normalize(language)
  if (!id) return ''
  return languageLabels[id] || id.charAt(0).toUpperCase() + id.slice(1)
}

export function filterCatalog(projects, { query = '', language = '' } = {}) {
  const q = normalize(query)
  const lang = normalize(language)

  return projects.filter((project) => {
    if (lang && normalize(project.language) !== lang) return false
    if (!q) return true

    const haystack = [project.name, project.description, project.language, ...(project.topics || [])]
      .map(normalize)
      .join(' ')

    return haystack.includes(q)
  })
}

export function languagesIn(projects) {
  const counts = new Map()

  for (const project of projects) {
    const id = normalize(project.language)
    if (!id) continue
    counts.set(id, (counts.get(id) || 0) + 1)
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([id, count]) => ({ id, label: languageLabel(id), count }))
}

const bentoPattern = [4, 2, 2, 4]

export function bentoSpans(total) {
  const count = Number(total) || 0
  if (count <= 0) return []
  if (count === 1) return [6]
  if (count === 2) return [3, 3]

  const spans = []
  let used = 0
  for (let index = 0; index < count; index += 1) {
    let span = bentoPattern[index % bentoPattern.length]
    if (used + span > 6) span = 6 - used
    if (index === count - 1 && used + span < 6) span = 6 - used
    spans.push(span)
    used = (used + span) % 6
  }
  return spans
}
