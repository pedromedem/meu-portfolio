export function safeHttpUrl(value) {
  if (!value) return ''
  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return ''
    return url.href
  } catch {
    return ''
  }
}

const screenshotHosts = new Set([
  'github-card.vercel.app',
  'link-tree-lucwx.vercel.app',
  'lucas-pomodoro.vercel.app',
  'lucas-portfolio-navy.vercel.app',
  'projeto-inicial-spotify.vercel.app',
])

export function screenshotFor(homepage) {
  const live = safeHttpUrl(homepage)
  if (!live) return ''
  const host = new URL(live).hostname.replace(/\.$/, '')
  if (!screenshotHosts.has(host)) return ''
  return `/screenshots/${host}/${host}_desktop.jpeg`
}
