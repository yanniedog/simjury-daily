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

**M0 — scaffold.** Toolchain, CI, the deterministic day→case selector, the case
schema + validator, and a placeholder shell. The playable loop (evidence beats,
conviction slider, verdict, reveal, spoiler-safe share card) is M1.

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
  App.tsx            # scaffold shell (M1 replaces this with the loop)
  lib/
    daily.ts         # deterministic date -> case selection (Wordle-style)
    caseSchema.ts    # zod schema + the fiction-only invariant
scripts/
  validate-cases.ts  # CI gate over cases/
cases/               # the daily case queue (JSON); d-0001 is a scaffold sample
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
- **Codex** needs the GitHub App **plus** a one-time ChatGPT-side setup — the app
  alone is not enough. When it's not fully wired, `@codex review` replies with
  "To use Codex here, create a Codex account and connect…" instead of reviewing
  (and on PR #1 it stayed silent entirely). The three operator steps, using the
  exact links Codex returns:
  1. **Install the GitHub App** — *ChatGPT Codex Connector*
     (GitHub → Settings → GitHub Apps). ✅ Done (account-wide, "All repositories").
  2. **Connect GitHub to the Codex account** —
     <https://chatgpt.com/codex/cloud/settings/connectors>
  3. **Create a Codex environment for this repo** —
     <https://chatgpt.com/codex/cloud/settings/environments>
  4. **Enable Code review for the repo** —
     <https://chatgpt.com/codex/settings/code-review> — turn on **Code review**
     and **Automatic reviews** so every new PR is reviewed with no comment needed.

  With Automatic reviews on, no workflow is required — Codex reviews every PR by
  itself. The `pr-request-bot-reviews` workflow is a fallback that posts
  `@codex review`; Codex *does* act on that bot-authored mention (verified on
  PR #2), but Automatic reviews is the cleaner primary path. Manual on-demand
  trigger: comment `@codex review` on any PR.
- **Gemini Code Assist** is optional; install its GitHub App on the repo if you
  want its reviews too.

---

© 2026. All rights reserved. Licensing intentionally undecided while the
commercial model is settled — do not treat this as open source yet.
