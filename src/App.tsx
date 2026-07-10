import { type ReactNode, useMemo, useState } from 'react'
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

  const [phase, setPhase] = useState<Phase>(stored ? 'reveal' : 'intro')
  const [beatIndex, setBeatIndex] = useState(0)
  const [convictions, setConvictions] = useState<number[]>(
    stored?.convictions ?? [],
  )
  const [conviction, setConviction] = useState(START_CONVICTION)
  const [verdict, setVerdict] = useState<Verdict | null>(stored?.verdict ?? null)

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
  const beatCount = trial.beats.length

  function begin() {
    setConvictions([])
    setBeatIndex(0)
    setConviction(START_CONVICTION)
    setPhase('beats')
  }

  function submitBeat() {
    setConvictions((prev) => [...prev, conviction])
    if (beatIndex + 1 < beatCount) {
      setBeatIndex(beatIndex + 1)
      // conviction carries over as the running belief into the next beat
    } else {
      setPhase('verdict')
    }
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
          beatIndex={beatIndex}
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
