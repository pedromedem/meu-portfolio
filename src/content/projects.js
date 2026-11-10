export const featured = [
  {
    name: 'Github-card',
    language: 'Vue',
    homepage: 'https://github-card.vercel.app',
    html_url: 'https://github.com/pedromedem/Github-card',
    topics: ['vue', 'pinia', 'tailwindcss'],
  },
  {
    name: 'link-tree',
    language: 'JavaScript',
    homepage: 'https://link-tree-lucwx.vercel.app',
    html_url: 'https://github.com/pedromedem/link-tree',
    topics: ['react', 'tailwind'],
  },
  {
    name: 'pomodoro',
    language: 'JavaScript',
    homepage: 'https://lucas-pomodoro.vercel.app',
    html_url: 'https://github.com/pedromedem/pomodoro',
    topics: ['html', 'css', 'javascript'],
  },
]

const copy = {
  'Github-card': {
    en: 'Looks up a GitHub username and renders a custom card. Built with Vue, Pinia and Tailwind, using async requests to the GitHub API.',
    pt: 'Busca um usuário do GitHub e monta um card. Feito com Vue, Pinia e Tailwind, com requisições assíncronas à API do GitHub.',
  },
  'link-tree': {
    en: 'A page that gathers personal links, such as social profiles and other sites. Built with React and Tailwind.',
    pt: 'Uma página que reúne links pessoais, como redes e outros sites. Feita com React e Tailwind.',
  },
  pomodoro: {
    en: 'A timer based on the Pomodoro technique: 25-minute blocks and short breaks. Built with HTML, CSS and JavaScript, using localStorage and the browser notification API.',
    pt: 'Um timer da técnica Pomodoro: blocos de 25 minutos e intervalos curtos. Feito com HTML, CSS e JavaScript, com localStorage e a API de notificação do navegador.',
  },
  'repo-screenshot': {
    en: 'Uses Puppeteer to capture a page on desktop and on mobile.',
    pt: 'Usa o Puppeteer para capturar uma página no desktop e no celular.',
  },
  'indie-dev': {
    en: 'A dark color theme for VS Code.',
    pt: 'Um tema de cores escuro para o VS Code.',
  },
  dots: {
    en: 'Personal Linux settings, including i3, Polybar, Alacritty and bash.',
    pt: 'Configurações pessoais de Linux, incluindo i3, Polybar, Alacritty e bash.',
  },
}

export const featuredNames = new Set(featured.map((project) => project.name))

export function projectPath(name) {
  return `/projects/${String(name || '').toLowerCase()}`
}

export function findFeatured(slug) {
  const key = String(slug || '').toLowerCase()
  return featured.find((project) => project.name.toLowerCase() === key) || null
}

export function projectCopy(name, locale) {
  const entry = copy[name]
  if (!entry) return ''
  return entry[locale] || entry.en
}
