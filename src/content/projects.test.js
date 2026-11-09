import { describe, expect, it } from 'vitest'
import { featured, featuredNames, projectCopy } from './projects'
import { messages } from '../i18n'
import { safeHttpUrl } from '../lib/url'

describe('project copy', () => {
  it('covers every featured project in both languages', () => {
    for (const project of featured) {
      expect(featuredNames.has(project.name)).toBe(true)
      expect(projectCopy(project.name, 'en').length).toBeGreaterThan(20)
      expect(projectCopy(project.name, 'pt')).not.toBe(projectCopy(project.name, 'en'))
    }
  })

  it('falls back to English and then to an empty string', () => {
    expect(projectCopy('pomodoro', 'fr')).toBe(projectCopy('pomodoro', 'en'))
    expect(projectCopy('projeto-inicial-spotify', 'pt')).toBe('')
  })
})

describe('safeHttpUrl', () => {
  it('keeps http links and drops everything else', () => {
    expect(safeHttpUrl('https://lucas-pomodoro.vercel.app')).toBe('https://lucas-pomodoro.vercel.app/')
    expect(safeHttpUrl('javascript:alert(1)')).toBe('')
    expect(safeHttpUrl('not a url')).toBe('')
    expect(safeHttpUrl('')).toBe('')
  })
})

describe('messages', () => {
  it('uses the same keys in English and Portuguese', () => {
    expect(Object.keys(messages.pt).sort()).toEqual(Object.keys(messages.en).sort())
  })
})
