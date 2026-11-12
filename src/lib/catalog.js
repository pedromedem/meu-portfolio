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

export function bentoLayout(total) {
  const count = Number(total) || 0
  if (count <= 0) return []
  if (count === 1) return [{ span: 4, rows: 2, role: 'hero' }]
  if (count === 2) {
    return [
      { span: 2, rows: 1, role: 'cell' },
      { span: 2, rows: 1, role: 'cell' },
    ]
  }

  const items = [
    { span: 2, rows: 2, role: 'hero' },
    { span: 2, rows: 1, role: 'cell' },
    { span: 2, rows: 1, role: 'cell' },
  ]
  const rest = count - 3
  for (let index = 0; index < rest; index += 1) {
    const last = index === rest - 1
    const atRowStart = index % 2 === 0
    items.push({ span: last && atRowStart ? 4 : 2, rows: 1, role: 'cell' })
  }
  return items
}
