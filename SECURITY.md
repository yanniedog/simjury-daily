# Security posture

## What ships

SimJury Daily builds to **static files** (`dist/`) served from a CDN. There is
no server, no database, and no runtime backend in production. The production
attack surface is therefore just static HTML/CSS/JS.

## `npm audit`

`npm audit` currently reports findings, and they are **all dev-server-only**
advisories in the build toolchain (Vite's local dev server, `esbuild`,
`launch-editor`). They affect `npm run dev` on a developer's machine — not the
built artifact and not the deployed site.

Decisions:

- **`esbuild` is pinned to `^0.25.0`** via `overrides` (patches
  GHSA-67mh-4wv8-2f99).
- The remaining Vite/`launch-editor` dev-server advisories are **accepted**: the
  only fixes are major toolchain bumps that (as tested) do not clear the
  findings and do break the config, and none of the advisories can affect a
  static site that ships no server. We stay on the proven Vite 5.4 line.

We do **not** run `npm audit fix --force`, which would pull breaking major
versions for zero production-security benefit.

## Review trigger

Re-evaluate this posture if we ever add a backend, server-side rendering, or
any runtime that serves requests — at that point the advisories stop being
dev-only and must be cleared.
