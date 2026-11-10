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
    'about.kicker': 'About',
    'about.title': 'About Me',
    'about.p1a': "I'm Lucas, an aspiring programmer on a",
    'about.p1b': 'continuous learning journey',
    'about.p1c': "Currently, I'm dedicated to honing my skills in programming and exploring the diverse realms of software development.",
    'about.p2a': 'I am investing my time in studies, acquiring knowledge in',
    'about.p2b': 'JavaScript, Vue and Tailwind',
    'about.p2c': 'My passion for problem-solving and creating innovative solutions drives me to delve deep into the programming universe.',
    'about.stack': 'Stack',
    'about.skills': 'My Skills',
    'about.work': 'Work',
    'about.workBody': 'Throughout my learning journey, I have developed projects. Each project represents a significant step in my evolution as a programmer, showcasing my ability to apply learned concepts in',
    'about.workEm': 'practical scenarios.',
    'about.hint': 'To see my projects click here!',
    'contact.kicker': 'Contact',
    'contact.lead': 'I am open to collaboration, learning opportunities, and sharing experiences',
    'contact.body': 'Feel free to reach out to me through GitHub or Linkedin. Thank you for visiting my portfolio, and I look forward to sharing my programming journey with you!',
    'contact.name': 'Name',
    'contact.message': 'Message',
    'contact.open': 'Open in email',
    'contact.copy': 'Copy email',
    'contact.copied': 'Copied',
    'contact.subject': 'Portfolio',
    'projects.kicker': 'Work',
    'projects.title': 'Main Projects',
    'projects.before': 'Three projects have a short note taken from their repositories. The others stay in sync with the',
    'projects.api': 'GitHub API',
    'projects.more': 'Also on GitHub',
    'projects.search': 'Search projects',
    'projects.all': 'All',
    'projects.clear': 'Clear',
    'projects.shown': 'shown',
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
    'about.kicker': 'Sobre',
    'about.title': 'Sobre mim',
    'about.p1a': 'Sou o Lucas, um programador em formação numa',
    'about.p1b': 'jornada contínua de aprendizado',
    'about.p1c': 'Hoje me dedico a aprimorar minhas habilidades em programação e a explorar as várias áreas do desenvolvimento de software.',
    'about.p2a': 'Estou investindo meu tempo nos estudos, adquirindo conhecimento em',
    'about.p2b': 'JavaScript, Vue e Tailwind',
    'about.p2c': 'Minha vontade de resolver problemas e criar soluções me leva a ir mais fundo no universo da programação.',
    'about.stack': 'Stack',
    'about.skills': 'Minhas habilidades',
    'about.work': 'Trabalho',
    'about.workBody': 'Ao longo da minha jornada de aprendizado, desenvolvi projetos. Cada projeto representa um passo na minha evolução como programador e mostra como aplico o que aprendi em',
    'about.workEm': 'situações práticas.',
    'about.hint': 'Para ver meus projetos, clique aqui!',
    'contact.kicker': 'Contato',
    'contact.lead': 'Estou aberto a colaborações, oportunidades de aprendizado e troca de experiências',
    'contact.body': 'Fique à vontade para falar comigo pelo GitHub ou pelo LinkedIn. Obrigado por visitar meu portfólio. Quero compartilhar essa jornada de programação com você!',
    'contact.name': 'Nome',
    'contact.message': 'Mensagem',
    'contact.open': 'Abrir no e-mail',
    'contact.copy': 'Copiar e-mail',
    'contact.copied': 'Copiado',
    'contact.subject': 'Portfólio',
    'projects.kicker': 'Trabalho',
    'projects.title': 'Principais projetos',
    'projects.before': 'Três projetos têm uma nota curta tirada dos repositórios. Os outros continuam sincronizados com a',
    'projects.api': 'API do GitHub',
    'projects.more': 'Também no GitHub',
    'projects.search': 'Buscar projetos',
    'projects.all': 'Todos',
    'projects.clear': 'Limpar',
    'projects.shown': 'em vista',
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
