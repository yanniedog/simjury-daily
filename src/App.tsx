import { type ReactNode, useLayoutEffect, useMemo, useState } from 'react'
import { caseForDate } from './lib/cases'
import { dayIndex } from './lib/daily'
import { START_CONVICTION, analyzePlay, type Phase, type Verdict } from './lib/game'
import { loadPlay, savePlay } from './lib/storage'
import { IntroCard } from './components/IntroCard'
import { BeatView } from './components/BeatView'
import { VerdictView } from './components/VerdictView'
import { RevealView } from './components/RevealView'

function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-10 text-neutral-100">
      <div className="mx-auto w-full max-w-md">{children}</div>
    </main>
  )
}

export default function App() {
  const today = useMemo(() => new Date(), [])
  const day = useMemo(() => dayIndex(today), [today])
  const trial = useMemo(() => caseForDate(today), [today])
  const stored = useMemo(() => loadPlay(day), [day])

  // Only restore a completed play whose length matches today's case; otherwise
  // it can't be scored cleanly, so we start fresh.
  const validStored = useMemo(() => {
    if (!stored || !trial) return null
    return stored.convictions.length === trial.beats.length ? stored : null
  }, [stored, trial])

  const beatCount = trial ? trial.beats.length : 0

  const [phase, setPhase] = useState<Phase>(validStored ? 'reveal' : 'intro')
  const [convictions, setConvictions] = useState<number[]>(
    validStored?.convictions ?? [],
  )
  const [conviction, setConviction] = useState(START_CONVICTION)
  const [verdict, setVerdict] = useState<Verdict | null>(
    validStored?.verdict ?? null,
  )

  // Once every beat has a recorded conviction, move to the verdict. Deriving the
  // current beat from convictions.length (rather than a second index state)
  // removes any stale-closure risk on rapid submissions.
  useLayoutEffect(() => {
    if (phase === 'beats' && beatCount > 0 && convictions.length >= beatCount) {
      setPhase('verdict')
    }
  }, [phase, convictions, beatCount])

  if (!trial) {
    return (
      <Shell>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">⚖️ SimJury Daily</h1>
          <p className="text-neutral-400">
            No case is queued for today. Check back soon.
          </p>
        </div>
      </Shell>
    )
  }

  const dayNumber = day + 1
  const currentBeat = Math.min(convictions.length, beatCount - 1)

  function begin() {
    setConvictions([])
    setConviction(START_CONVICTION)
    setPhase('beats')
  }

  function submitBeat() {
    // Guarded append: a double-fire can't push past the last beat.
    setConvictions((prev) =>
      prev.length >= beatCount ? prev : [...prev, conviction],
    )
    // conviction carries over as the running belief into the next beat.
  }

  function chooseVerdict(chosen: Verdict) {
    setVerdict(chosen)
    savePlay({ day, convictions, verdict: chosen })
    setPhase('reveal')
  }

  return (
    <Shell>
      {phase === 'intro' && (
        <IntroCard trial={trial} dayNumber={dayNumber} onBegin={begin} />
      )}
      {phase === 'beats' && (
        <BeatView
          trial={trial}
          beatIndex={currentBeat}
          value={conviction}
          onChange={setConviction}
          onSubmit={submitBeat}
        />
      )}
      {phase === 'verdict' && (
        <VerdictView
          trial={trial}
          conviction={conviction}
          onChoose={chooseVerdict}
        />
      )}
      {phase === 'reveal' && verdict && (
        <RevealView
          trial={trial}
          analysis={analyzePlay(trial, convictions, verdict)}
          verdict={verdict}
          dayNumber={dayNumber}
        />
      )}
    </Shell>
  )
}
