import { z } from 'zod'

/**
 * A finished day's play, persisted so a refresh (or coming back later the same
 * day) shows the result instead of letting the juror re-run the case — the
 * one-verdict-a-day rule that makes it a daily.
 */
const storedPlaySchema = z.object({
  day: z.number(),
  convictions: z.array(z.number()),
  verdict: z.enum(['Guilty', 'Not Guilty']),
})

export type StoredPlay = z.infer<typeof storedPlaySchema>

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
    // Validate the shape: a schema change or corrupted entry must not crash the
    // game — a failed parse just means "not played today", so we start fresh.
    const parsed = storedPlaySchema.safeParse(JSON.parse(raw))
    return parsed.success && parsed.data.day === day ? parsed.data : null
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
