# Deploying SimJury Daily

This is a **static SPA** (`npm run build` → `dist/`). It hosts on **Cloudflare
Pages, free tier** — no Workers, no server, nothing billable. Read
[docs/COST-GUARDRAILS.md](docs/COST-GUARDRAILS.md) before enabling any Cloudflare
feature.

There are two ways to ship it. Both end at the same place; pick one.

## Option A — Dashboard connect (no credentials, hands-off after setup)

Cloudflare builds on every push to `main`.

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Pick `yanniedog/simjury-daily`.
3. Build command `npm run build`, output directory `dist`, framework preset
   "None"/"Vite".
4. Deploy. Every push to `main` rebuilds automatically.

Nothing lands in this repo and no token is stored anywhere.

## Option B — Wrangler CLI (token-based, scriptable)

This mirrors how the `australianrates` repo talks to Cloudflare: an **API token**
in the environment, used by `wrangler`. Config lives in
[`wrangler.jsonc`](wrangler.jsonc).

**Credentials (never commit these):**

```sh
export CLOUDFLARE_ACCOUNT_ID=<account id>
export CLOUDFLARE_API_TOKEN=<token with "Cloudflare Pages: Edit">
```

A suitable token already exists in `c:\code\australianrates\.env`
(`CLOUDFLARE_API_TOKEN`, account `f3250f7113cfd8c7f747a09f942ca6d0`) if you
deploy onto that same account — see the account note below.

**One-time, create the Pages project:**

```sh
npm run deploy:create      # wrangler pages project create simjury-daily
```

**Deploy (builds first, then uploads dist/):**

```sh
npm run deploy             # npm run build && wrangler pages deploy
```

## Which account?

- **A separate, no-payment-method account** keeps the guardrail intact: spend is
  *impossible*, not just unlikely. Best for a throwaway funnel repo. Recommended
  default.
- **Reusing the `australianrates` account** is faster (token already exists) and
  static Pages is free even there — but that account has billing attached for its
  Workers/D1/etc., so you lose the "can't possibly bill" guarantee and mix this
  repo into a production account.

Static Pages hosting itself adds no cost either way; the choice is about blast
radius, not the hosting bill.

## Guardrail

Whatever the path: **static only.** Do not add Workers, Functions, D1, KV, R2,
Queues, or Images to this project. If a feature seems to need a server, it
belongs in a different repo, not here.
