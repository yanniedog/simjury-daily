import type { Verdict } from './game'

/**
 * A finished day's play, persisted so a refresh (or coming back later the same
 * day) shows the result instead of letting the juror re-run the case — the
 * one-verdict-a-day rule that makes it a daily.
 */
export interface StoredPlay {
  day: number
  convictions: number[]
  verdict: Verdict
}

const KEY_PREFIX = 'simjury-daily:v1:'

function storage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage
  } catch {
    // Access can throw in privacy modes / sandboxed frames.
    return null
  }
}

export function loadPlay(day: number): StoredPlay | null {
  const store = storage()
  if (!store) return null
  try {
    const raw = store.getItem(KEY_PREFIX + day)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredPlay
    return parsed.day === day ? parsed : null
  } catch {
    return null
  }
}

export function savePlay(play: StoredPlay): void {
  const store = storage()
  if (!store) return
  try {
    store.setItem(KEY_PREFIX + play.day, JSON.stringify(play))
  } catch {
    // Full/blocked storage is non-fatal; the play just won't persist.
  }
}
