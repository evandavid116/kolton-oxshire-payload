# What this project is
Rebuild of koltonoxshire.com (Kolton Oxshire Ministries) on the official Payload Website Template. NOT live yet — the live site is `../sanity-site`. See `../CLAUDE.md` for the client picture.

# Stack
- Next.js (App Router), TypeScript, Tailwind + shadcn-style ui components
- Payload CMS 3 + Vercel Postgres (Neon) — note: Postgres, not MongoDB
- Vercel (Vercel Blob for media)

# Commands
- Run locally: the `kolton-payload-site` launch config (parent `haus320 Websites/.claude/launch.json`, port 3360), or `pnpm dev` (:3000, admin at /admin) — this repo uses pnpm, not npm
- Test: `pnpm test` (vitest integration + playwright e2e; `pnpm test:int` / `pnpm test:e2e` individually)
- Build: `pnpm build` (`pnpm ci` = migrate + build, what Vercel runs)
- Lint: `pnpm lint` / `pnpm lint:fix`
- After schema changes: `pnpm payload migrate:create` AND `pnpm generate:types`

# Rules for this repo
- Page content lives in `src/globals/` — one global per site section, mirroring the Sanity schemas one-for-one (HeroSection, AboutSection, TeachingSection, PreachingVideos, BookingSection, GivingSection, PartnerPage, SiteFooter, ParallaxDividers).
- Each global has a matching section component in `src/components/` (HeroSection.tsx, etc.). Adding/changing a section touches: the global, the component, a migration, regenerated types.
- `src/collections/` holds only Media, Users, FormSubmissions — don't put page content in collections.
- Template infrastructure (`fields/`, `access/`, `utilities/`, plugins: form-builder, seo, search, redirects, nested-docs) — use it, don't rebuild it.
- Never edit `src/payload-types.ts` or the admin importMap — generated.
- Secrets stay in env vars — never write a real key into any file.

# Design
- The public site uses the Revival Handbill system: read `DESIGN.md` before any UI work. Classes are `hb-*` in `src/app/(frontend)/handbill.css`; tokens are in `globals.css`. Don't reintroduce Inter or the old stock-photo dividers.
- The rebuild is tracked in `PLAN.md` (stages, what's done, what's next) and `CONTENT-TODO.md` (what copy and assets exist vs. are still needed from the client).

# Gotchas
- Local `.env.local` has an invalid `BLOB_READ_WRITE_TOKEN`, so Payload can't initialise and `pnpm build` fails while generating pages until a real token is put there.
- `pnpm dev` lets Payload push schema changes straight to the database in `POSTGRES_URL` — know which database that is before running it.
- Postgres requires migrations for every schema change (unlike the MongoDB projects) — forgetting `migrate:create` breaks the Vercel build.
- Content parity with the live Sanity site is the goal; check `../sanity-site` before inventing new content structure.
