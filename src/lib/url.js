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

export function screenshotFor(homepage) {
  const live = safeHttpUrl(homepage)
  if (!live) return ''
  const host = new URL(live).hostname
  return `https://raw.githubusercontent.com/lucwx/web-screenshot/main/screenshots/${host}/${host}_desktop.jpeg`
}
