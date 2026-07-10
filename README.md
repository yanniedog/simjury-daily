# SimJury Daily

**A 3-minute verdict. One case a day. Could you have caught it?**

A free, install-free, web daily game: read a short trial, weigh the evidence,
lock a verdict, and find out what really happened — often that the "obvious"
read was a trap. It's the free top-of-funnel for the SimJury project (the deep
jury-simulation game lives in a separate repo).

## The one rule that governs everything

**Daily cases are fiction built from real trial patterns, and they say so.**
An LLM cannot safely generate *true* history on a schedule — that path invents
plausible-but-false claims about real people. So every daily case is labelled
fiction (the `label` field is pinned to `"fiction"` in the schema and enforced
in CI), and *real* historical cases only ever ship through the separate,
human-cleared harness in the pilot repo — never through this pipeline.

## Status

**M1 — playable loop.** The full daily loop is live: read the evidence beat by
beat, move the conviction slider, deliver a verdict, then get the reveal (what
each piece was *actually* worth) and a spoiler-safe share card. One play per
day, persisted locally. Cases load from `cases/*.json`; `d-0001` is the first
hand-authored fiction seed. Next: M2 (calibration / streaks) and M3 (the
generation pipeline that fills the daily queue).

## Develop

```sh
npm install
npm run dev          # local dev server
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run test         # vitest
npm run validate:cases  # schema-check every case in cases/
npm run build        # typecheck + production build to dist/
```

Node ≥ 20.

## Layout

```text
src/
  App.tsx            # phase state machine: intro -> beats -> verdict -> reveal
  components/        # IntroCard, BeatView, ConvictionSlider, VerdictView,
                     #   RevealView, ShareCard
  lib/
    daily.ts         # deterministic date -> day index (Wordle-style)
    cases.ts         # bundles + validates cases/, picks the day's case
    caseSchema.ts    # zod schema + the fiction-only invariant
    game.ts          # pure scoring: conviction bands + trap analysis
    share.ts         # spoiler-safe share-text builder
    storage.ts       # one-play-per-day persistence (localStorage)
scripts/
  validate-cases.ts  # CI gate over cases/
cases/               # the daily case queue (JSON); d-0001 is the seed case
docs/
  COST-GUARDRAILS.md # how hosting stays on the free tier
.github/workflows/
  ci.yml             # lint, typecheck, test, validate:cases, build
```

## Deploy

Hosting is **Cloudflare Pages, free tier, static only.** Deployment is done once
via the Cloudflare dashboard (connect this GitHub repo; build command
`npm run build`, output `dist/`) — no secrets in CI, no server, nothing
billable. See [docs/COST-GUARDRAILS.md](docs/COST-GUARDRAILS.md) before enabling
any Cloudflare feature.

## Process

Every change is a PR; CI (lint · typecheck · test · validate:cases · build)
must be green before merge. Content lands as reviewed PRs of case JSON — nothing
reaches players that a human hasn't read.

### Bot reviews

- **Sourcery** auto-reviews every PR (installed org-wide).
- **Codex** needs the GitHub App **plus** a one-time ChatGPT-side setup, and it
  authenticates the *commenter*. Verified behaviour on PRs #2–#3:
  - A `@codex review` posted by **`github-actions[bot]`** (i.e. from a workflow)
    is **refused** — Codex replies "To use Codex here, create a Codex account and
    connect…", because the bot identity has no connected Codex account. So there
    is **no workflow** that auto-requests Codex; it would only add that noise.
  - A `@codex review` from a **human** account whose Codex is connected **works**
    — Codex reacts 👀 and posts a review.

  One-time setup, using the exact links Codex returns:
  1. **Install the GitHub App** — *ChatGPT Codex Connector*
     (GitHub → Settings → GitHub Apps). ✅ Done (account-wide, "All repositories").
  2. **Connect GitHub to the Codex account** —
     <https://chatgpt.com/codex/cloud/settings/connectors> ✅
  3. **Create a Codex environment for this repo** —
     <https://chatgpt.com/codex/cloud/settings/environments> ✅
  4. **Enable Automatic reviews** (recommended, still to do) —
     <https://chatgpt.com/codex/settings/code-review> — turn on **Code review**
     and **Automatic reviews** for `simjury-daily`. This reviews every new PR via
     the app itself (no commenter needed), which is the only reliable hands-off
     path. Until then, a human must comment `@codex review` on each PR.
- **Gemini Code Assist** is optional; install its GitHub App on the repo if you
  want its reviews too.

---

© 2026. All rights reserved. Licensing intentionally undecided while the
commercial model is settled — do not treat this as open source yet.
