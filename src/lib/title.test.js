import { describe, expect, it } from 'vitest'
import { documentTitle } from './title'

describe('documentTitle', () => {
  it('names the page and follows the language', () => {
    expect(documentTitle({ name: 'home' }, 'en')).toBe('Lucas — Front-end developer')
    expect(documentTitle({ name: 'home' }, 'pt')).toBe('Lucas — Desenvolvedor front-end')
    expect(documentTitle({ name: 'about' }, 'pt')).toBe('Sobre mim — Lucas')
    expect(documentTitle({ name: 'projects' }, 'en')).toBe('Main Projects — Lucas')
    expect(documentTitle({ name: 'resume' }, 'en')).toBe('Resume — Lucas')
    expect(documentTitle({ name: 'not-found' }, 'en')).toBe('This page does not exist. — Lucas')
  })

  it('uses the project name on a featured page', () => {
    expect(documentTitle({ name: 'project', params: { slug: 'github-card' } }, 'en')).toBe('Github Card — Lucas')
    expect(documentTitle({ name: 'project', params: { slug: 'missing' } }, 'pt')).toBe('Este projeto não está na lista curta. — Lucas')
  })
})