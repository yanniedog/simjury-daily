import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadPlay, savePlay } from './storage'

function memoryStorage() {
  const m = new Map<string, string>()
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
    clear: () => m.clear(),
    key: (i: number) => [...m.keys()][i] ?? null,
    get length() {
      return m.size
    },
  }
}

const KEY = 'simjury-daily:v1:5'

afterEach(() => vi.unstubAllGlobals())

describe('storage', () => {
  it('round-trips a valid play', () => {
    vi.stubGlobal('localStorage', memoryStorage())
    savePlay({ day: 5, convictions: [60, 40], verdict: 'Not Guilty' })
    expect(loadPlay(5)).toEqual({
      day: 5,
      convictions: [60, 40],
      verdict: 'Not Guilty',
    })
  })

  it('returns null when there is no play for that day', () => {
    vi.stubGlobal('localStorage', memoryStorage())
    savePlay({ day: 5, convictions: [60], verdict: 'Guilty' })
    expect(loadPlay(6)).toBeNull()
  })

  it('rejects corrupted JSON rather than throwing', () => {
    const store = memoryStorage()
    store.setItem(KEY, '{ not valid json')
    vi.stubGlobal('localStorage', store)
    expect(loadPlay(5)).toBeNull()
  })

  it('rejects a structurally invalid play', () => {
    const store = memoryStorage()
    store.setItem(
      KEY,
      JSON.stringify({ day: 5, convictions: 'nope', verdict: 'Guilty' }),
    )
    vi.stubGlobal('localStorage', store)
    expect(loadPlay(5)).toBeNull()
  })
})
