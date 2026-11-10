import { ref } from 'vue'

function readStoredLocale() {
  try {
    return localStorage.getItem('locale')
  } catch {
    return null
  }
}

export const locale = ref(readStoredLocale() === 'pt' ? 'pt' : 'en')

export const messages = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'theme.light': 'Switch to light theme',
    'theme.dark': 'Switch to dark theme',
    'lang.label': 'Language',
    'lang.en': 'English',
    'lang.pt': 'Portuguese',
    'home.role': 'Front-end developer',
    'home.hello': 'Hi, my name is Lucas.',
    'home.before': 'I study',
    'home.em': 'JavaScript, Vue and Tailwind',
    'home.after': 'and practice by shipping small interfaces. The projects on this site are that practice.',
    'home.enjoy': 'About me',
    'home.portrait': 'Portrait of Lucas',
    'meta.description': 'Lucas studies JavaScript, Vue and Tailwind. The projects on this site are that practice.',
    'about.kicker': 'About',
    'about.title': 'About Me',
    'about.p1': 'I\'m Lucas. I study JavaScript, Vue and Tailwind, and I practice by publishing small interfaces.',
    'about.p2': 'Github Card looks up a GitHub profile. Link Tree gathers personal links. Pomodoro is a 25-minute timer. Those three have a written note on the projects page.',
    'about.stack': 'Stack',
    'about.skills': 'My Skills',
    'about.work': 'Work',
    'about.workBody': 'The projects page keeps those three at the top. Everything else comes from the GitHub API.',
    'contact.kicker': 'Contact',
    'contact.lead': 'Write a short message',
    'contact.body': 'It opens in your email app with the text filled in.',
    'contact.need': 'Write a message before opening the email.',
    'contact.name': 'Name',
    'contact.message': 'Message',
    'contact.open': 'Open in email',
    'contact.copy': 'Copy email',
    'contact.copied': 'Copied',
    'contact.subject': 'Portfolio',
    'projects.kicker': 'Work',
    'projects.title': 'Main Projects',
    'projects.before': 'Search by name or filter by language. Three projects have a short note. The others stay in sync with the',
    'projects.api': 'GitHub API',
    'projects.more': 'Also on GitHub',
    'projects.search': 'Search projects',
    'projects.all': 'All',
    'projects.clear': 'Clear',
    'projects.one': 'project',
    'projects.many': 'projects',
    'projects.loading': 'Loading the list',
    'projects.none': 'Nothing matches this search.',
    'projects.details': 'Read',
    'projects.back': 'All projects',
    'projects.missing': 'This project is not in the short list.',
    'projects.error': 'Sorry, no data available at the moment.',
    'projects.empty': 'No projects to show yet.',
    'card.repo': 'Open GitHub repository',
    'card.live': 'Open live site',
    'card.open': 'Open',
    'missing.title': 'This page does not exist.',
    'missing.back': 'Back home',
    'top': 'Back to top',
    'resume.nav': 'Resume',
    'resume.title': 'Resume',
    'resume.print': 'Print or save as PDF',
    'resume.projects': 'Projects',
    'resume.skills': 'Skills shown in public projects',
  },
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'theme.light': 'Mudar para o tema claro',
    'theme.dark': 'Mudar para o tema escuro',
    'lang.label': 'Idioma',
    'lang.en': 'Inglês',
    'lang.pt': 'Português',
    'home.role': 'Desenvolvedor front-end',
    'home.hello': 'Olá, meu nome é Lucas.',
    'home.before': 'Estudo',
    'home.em': 'JavaScript, Vue e Tailwind',
    'home.after': 'e pratico publicando interfaces pequenas. Os projetos deste site são essa prática.',
    'home.enjoy': 'Sobre mim',
    'home.portrait': 'Retrato de Lucas',
    'meta.description': 'Lucas estuda JavaScript, Vue e Tailwind. Os projetos deste site são essa prática.',
    'about.kicker': 'Sobre',
    'about.title': 'Sobre mim',
    'about.p1': 'Sou o Lucas. Estudo JavaScript, Vue e Tailwind e pratico publicando interfaces pequenas.',
    'about.p2': 'Github Card busca um perfil do GitHub. Link Tree reúne links pessoais. Pomodoro é um timer de 25 minutos. Esses três têm uma nota na página de projetos.',
    'about.stack': 'Stack',
    'about.skills': 'Minhas habilidades',
    'about.work': 'Trabalho',
    'about.workBody': 'A página de projetos deixa esses três no topo. O restante vem da API do GitHub.',
    'contact.kicker': 'Contato',
    'contact.lead': 'Escreva uma mensagem curta',
    'contact.body': 'Ela abre no seu e-mail, com o texto preenchido.',
    'contact.need': 'Escreva uma mensagem antes de abrir o e-mail.',
    'contact.name': 'Nome',
    'contact.message': 'Mensagem',
    'contact.open': 'Abrir no e-mail',
    'contact.copy': 'Copiar e-mail',
    'contact.copied': 'Copiado',
    'contact.subject': 'Portfólio',
    'projects.kicker': 'Trabalho',
    'projects.title': 'Principais projetos',
    'projects.before': 'Busque pelo nome ou filtre pela linguagem. Três projetos têm uma nota curta. Os outros continuam sincronizados com a',
    'projects.api': 'API do GitHub',
    'projects.more': 'Também no GitHub',
    'projects.search': 'Buscar projetos',
    'projects.all': 'Todos',
    'projects.clear': 'Limpar',
    'projects.one': 'projeto',
    'projects.many': 'projetos',
    'projects.loading': 'Carregando a lista',
    'projects.none': 'Nada combina com esta busca.',
    'projects.details': 'Ler',
    'projects.back': 'Todos os projetos',
    'projects.missing': 'Este projeto não está na lista curta.',
    'projects.error': 'Desculpe, não há dados disponíveis no momento.',
    'projects.empty': 'Nenhum projeto para mostrar ainda.',
    'card.repo': 'Abrir repositório no GitHub',
    'card.live': 'Abrir o site',
    'card.open': 'Abrir',
    'missing.title': 'Esta página não existe.',
    'missing.back': 'Voltar ao início',
    'top': 'Voltar ao topo',
    'resume.nav': 'Currículo',
    'resume.title': 'Currículo',
    'resume.print': 'Imprimir ou salvar em PDF',
    'resume.projects': 'Projetos',
    'resume.skills': 'Habilidades usadas em projetos públicos',
  },
}

export function useI18n() {
  const t = (key) => messages[locale.value][key] ?? messages.en[key] ?? key

  const setLocale = (next) => {
    locale.value = next === 'pt' ? 'pt' : 'en'
    localStorage.setItem('locale', locale.value)
    document.documentElement.lang = locale.value === 'pt' ? 'pt-BR' : 'en'
  }

  return { locale, t, setLocale }
}

if (typeof document !== 'undefined') {
  document.documentElement.lang = locale.value === 'pt' ? 'pt-BR' : 'en'
}
