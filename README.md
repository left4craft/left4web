# left4web

The [left4craft.org](https://www.left4craft.org) website: [Next.js](https://nextjs.org/) (pages router), deployed to
**Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare).

## Architecture

- **Hosting**: Cloudflare Workers (`@opennextjs/cloudflare` + `wrangler`). ISR pages (`/shop`, `/punishments/*`)
  are cached in the `left4web-inc-cache` R2 bucket.
- **Database**: PlanetScale Postgres, reached through pgbouncer via a **Hyperdrive** binding. Holds
  better-auth tables, Stripe customer/trial/event tables, the `job_queue` table, and the LiteBans data.
- **Auth**: [better-auth](https://better-auth.com) — Discord OAuth + email magic links (sent with SES v2 over
  HTTP via `aws4fetch`). Routes live under `/api/auth/*`.
- **Shop**: Stripe Checkout. The webhook (`/api/stripe/webhook`) records events idempotently in
  `stripe_events` and enqueues rank commands into `job_queue`, which the Left4Hub plugin polls with
  `FOR UPDATE SKIP LOCKED`.
- **Punishments**: LiteBans tables queried directly (`utils/litebans.js`); `/api/punishments/check`
  serves the client-side ban search.

## Development

```bash
cp .dev.vars.example .dev.vars   # fill in secrets
npm install
npm run dev                      # next dev with wrangler's local binding proxy
```

`next build` needs `DATABASE_URL`, `STRIPE_SECRET_KEY`, and `NEXT_PUBLIC_*` set to fully pre-render;
without them the ISR pages build empty and self-heal at runtime.

## Deploy

```bash
npm run preview   # build + run the real worker locally
npm run deploy    # build + deploy to Cloudflare
```

One-time setup: create the R2 bucket (`npx wrangler r2 bucket create left4web-inc-cache`), apply
`migrations/*.sql` to Postgres, and set secrets with `npx wrangler secret put` (see `.dev.vars.example`
for the list).

## Linting

[Biome](https://biomejs.dev) handles linting and formatting: `npm run lint` / `npm run lint:fix`.
