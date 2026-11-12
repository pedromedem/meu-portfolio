import { readdirSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { bentoSpans, filterCatalog, languageLabel, languagesIn } from './catalog'
import { mailHref } from './mail'
import { findFeatured, projectPath } from '../content/projects'
import { screenshotFor } from './url'

const sample = [
  { name: 'Github-card', language: 'Vue', topics: ['vue', 'pinia'], description: '' },
  { name: 'pomodoro', language: 'JavaScript', topics: ['html'], description: 'A timer for focus' },
  { name: 'dots', language: '', description: 'Linux settings' },
]

describe('filterCatalog', () => {
  it('matches language and search together', () => {
    expect(filterCatalog(sample, { language: 'javascript', query: 'timer' }).map((project) => project.name)).toEqual(['pomodoro'])
    expect(filterCatalog(sample, { query: 'pinia' }).map((project) => project.name)).toEqual(['Github-card'])
    expect(filterCatalog(sample, { query: 'linux' }).map((project) => project.name)).toEqual(['dots'])
    expect(filterCatalog(sample, { language: 'vue', query: 'timer' })).toEqual([])
  })

  it('lists languages that actually appear', () => {
    expect(languagesIn(sample)).toEqual([
      { id: 'javascript', label: 'JavaScript', count: 1 },
      { id: 'vue', label: 'Vue', count: 1 },
    ])
    expect(languageLabel('CSS')).toBe('CSS')
  })
})

describe('bentoSpans', () => {
  it('fills each row of the project grid', () => {
    expect(bentoSpans(0)).toEqual([])
    expect(bentoSpans(1)).toEqual([6])
    expect(bentoSpans(2)).toEqual([3, 3])
    expect(bentoSpans(3)).toEqual([4, 2, 6])
    expect(bentoSpans(4)).toEqual([4, 2, 2, 4])
    for (const total of [3, 4, 5, 7]) {
      const spans = bentoSpans(total)
      let used = 0
      for (const span of spans) {
        expect(used + span).toBeLessThanOrEqual(6)
        used = (used + span) % 6
      }
      expect(used).toBe(0)
    }
  })
})

describe('mailHref', () => {
  it('puts the name in the subject and keeps an empty message out of the body', () => {
    const href = mailHref({ to: 'a@b.co', name: 'Ana', message: '  ', subject: 'Portfolio' })
    const params = new URLSearchParams(href.split('?')[1])
    expect(href.startsWith('mailto:a@b.co?')).toBe(true)
    expect(params.get('subject')).toBe('Portfolio - Ana')
    expect(params.get('body')).toBeNull()
  })

  it('includes the written message', () => {
    const href = mailHref({ to: 'a@b.co', name: '', message: 'Hello there', subject: 'Portfolio' })
    const params = new URLSearchParams(href.split('?')[1])
    expect(params.get('subject')).toBe('Portfolio')
    expect(params.get('body')).toBe('Hello there')
  })
})

describe('featured pages', () => {
  it('builds a path and finds the project regardless of case', () => {
    expect(projectPath('Github-card')).toBe('/projects/github-card')
    expect(findFeatured('POMODORO')?.name).toBe('pomodoro')
    expect(findFeatured('missing')).toBeNull()
    expect(screenshotFor('https://lucas-pomodoro.vercel.app')).toBe('/screenshots/lucas-pomodoro.vercel.app/lucas-pomodoro.vercel.app_desktop.jpeg')
    expect(screenshotFor('https://example.com')).toBe('')
    expect(screenshotFor('javascript:alert(1)')).toBe('')
    const hosts = readdirSync(new URL('../../public/screenshots/', import.meta.url))
    expect(hosts.length).toBeGreaterThan(0)
    for (const host of hosts) {
      expect(screenshotFor(`https://${host}`)).toBe(`/screenshots/${host}/${host}_desktop.jpeg`)
    }
  })
})
