export function mailHref({ to, name = '', message = '', subject = 'Portfolio' }) {
  const who = String(name).trim()
  const text = String(message).trim()
  const params = new URLSearchParams()

  params.set('subject', who ? `${subject} - ${who}` : subject)
  if (text) params.set('body', text)

  return `mailto:${to}?${params.toString()}`
}
