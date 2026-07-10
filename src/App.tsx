import { caseIndexForDate, dayIndex } from './lib/daily'

/**
 * M0 scaffold shell. The playable daily loop (evidence beats, conviction
 * slider, verdict, reveal, share card) lands in M1 — see docs/BUILD-PLAN.
 */
export default function App() {
  const today = new Date()
  const dayNumber = dayIndex(today)
  // With no case queue yet, this is just a placeholder index of 0.
  const caseIndex = caseIndexForDate(today, 0)

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 p-6 text-neutral-100">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">⚖️ SimJury Daily</h1>
        <p className="text-neutral-400">
          A 3-minute verdict. One case a day. Could you have caught it?
        </p>
        <p className="text-sm text-neutral-500">
          Day #{dayNumber + 1} · queue slot {caseIndex} · scaffold (M0). The game
          arrives in M1.
        </p>
      </div>
    </main>
  )
}
