# Kolton Oxshire Ministries — full site rebuild plan

Written 2026-11-14. This file is the single source of truth for the rebuild. Update it at every stage boundary (tick the stage, note what changed). Do not revise it silently.

---

## Handoff block (paste this first into any fresh session)

You are working on the rebuild of **koltonoxshire.com** for Kolton Oxshire Ministries, an evangelist whose audience finds him through short-form preaching video on social media. The rebuild lives in `Kolton Oxshire/payload-site/` (Next.js 16 App Router, React 19, Tailwind 4, Payload CMS 3.82, Vercel Postgres, pnpm). The live site is `Kolton Oxshire/sanity-site/` (Vite SPA + Sanity) and must not be touched except to read its copy.

The current design (all-Inter, cream/ink/crimson, stock eagle and wheat photos, one long home page) is being thrown out. The new site is a **personal-brand hub**: a visitor arriving from a 30-second clip should be able to hear the gospel, respond to it, download something free, binge more messages, invite Kolton to preach, or become a monthly partner, each in two clicks or fewer.

Approach chosen: extend `payload-site` with real content collections (messages, resources, books, events, testimonies), a new design system, and scroll-driven storytelling built on GSAP ScrollTrigger + Lenis. Rejected alternatives and reasons are in "Decisions" below.

Rules that never bend:
- Kolton's words stay Kolton's. Doctrine (the 16 beliefs), his bio, his quotes, his booking questions and the partner copy are ported verbatim from `../sanity-site`. New copy is written only where this plan names a new section, and every new line is listed in `CONTENT-TODO.md` for Evan and Kolton to approve.
- No invented numbers, testimonies, events or endorsements. If the real thing isn't supplied, the section does not render.
- The Sanity production dataset (`roz05b4r`) is read-only for this project.
- Postgres: every schema change needs `pnpm payload migrate:create` and `pnpm generate:types`, or the Vercel build breaks.
- Each step below has a Verify line. A step is not done until its Verify has been run and passed.

Status (2026-11-14): **Stage 0 done** on branch `rebuild/revival-handbill`, uncommitted. The comp was approved, then built for real: design system (`handbill.css`, tokens, `next/font`), new home page (`src/components/home/`), new nav and footer, `CONTENT-TODO.md`, `DESIGN.md`. `next build` passes (9 pages). Differences from the comp, all deliberate: the Gospel chapter shows all four beats stacked (this is its no-motion form), the guide section has two buttons instead of an email field (Flodesk is Stage 5), topic filters and giving amounts were left out because nothing backs them yet, and the About photo is the portrait rather than a video frame. Not done from Step 0.2: the `/styleguide` route. Next action: Step 1.1.

Local environment warning: `BLOB_READ_WRITE_TOKEN` in `.env.local` is not a valid Vercel Blob token, so Payload cannot start locally and a plain `pnpm build` fails at page generation. Builds were verified with a dummy token passed on the command line. Also note `pnpm dev` makes Payload push schema changes to whatever database `POSTGRES_URL` points at; confirm that database is safe to change before running dev in Stage 1.

---

## What the research found

Eight ministry and evangelist sites were reviewed on 2026-11-14 (pastorvlad.org, isaiahsaldivar.com, davidhernandezministries.com, mariomurillo.org, livingwaters.com, harvest.org, jonathanpokluda.com, danielkolenda.com). What they do well, and what almost all of them miss:

| Pattern | Who does it | Take it? |
|---|---|---|
| "How can we serve you?" path cards right under the hero (Need prayer / Watch / Events / Contact) | Mario Murillo | Yes. Becomes "Where are you today?" |
| Free resource library with "Free Download" buttons and a stated promise that resources are free | Vladimir Savchuk | Yes. Becomes `/resources` |
| Impact numbers band (subscribers, downloads, nations) | Savchuk, Saldivar | Yes, but only with real numbers. Murillo's counters currently show 0 and it reads as broken. |
| Nav grouped into About / Watch / Resources / Connect | David Diga Hernandez | Yes |
| Self-assessment quiz as the email hook | Jonathan Pokluda | Later (Stage 6 option) |
| "Know God" salvation entry in main nav | Harvest (Greg Laurie) | Yes, and go much further |
| Prayer request with "our team will pray with you" | Murillo, Hernandez | Yes |
| Featured book as hero | Savchuk, Pokluda | No. Kolton's hero is the message, not a product. |

The gap: **six of the eight have no clear path for someone who wants to respond to the gospel or who just got saved, and seven of the eight have no named lead magnet.** Their email capture is "sign up for updates." Kolton already has both pieces (the `/i-just-got-saved` page and the New Believer's Guide PDF wired to Flodesk). The rebuild makes that the spine of the site instead of a link in the nav. That is what puts this site in its own category: the website itself preaches and then follows up.

Secondary findings: most of these sites organise video by format, not by topic, and have no on-site search. Sermon pages with their own URL, summary text and VideoObject markup are an open SEO lane. Giving pages that keep the donor on the ministry's own domain build trust faster than sending them to a third-party portal.

---

## Decisions (with reasons, so nobody relitigates them)

**D1. Build in `payload-site`, not a fresh clone of `haus320-site-template`, and not a restyle of the live Vite site.**
- Restyling `sanity-site` was rejected: it is a client-rendered SPA, so message and resource pages would be invisible to search and to link previews, which defeats the SEO goal.
- A fresh template clone was rejected: it would discard the Postgres/Vercel setup, the Sanity migration script and nine ported globals, and the template's block builder is more CMS than a one-person ministry needs.
- `payload-site` already runs Next 16 + Payload 3 on Vercel Postgres with content ported. Cost: it is the one Postgres project in the agency, so migrations are mandatory.

**D2. Content model becomes collections + globals.** The existing rule "don't put page content in collections" was written for a one-page site. Repeating content (messages, resources, books, events, testimonies) moves to collections so each item gets a URL. Singleton content (hero, about, partner page, footer, beliefs) stays in globals. `CLAUDE.md` is updated in Step 1.1 to say so.

**D3. Motion stack: GSAP (ScrollTrigger, SplitText) + Lenis.** Rejected: Motion/Framer Motion alone, because pinned, scrubbed chapters are ScrollTrigger's home ground. Before installing, the executing agent must check the current GSAP licence and package names on gsap.com and the Lenis package name on npm rather than trusting this file.

**D4. Email stays on Flodesk; giving stays on Donorbox + Venmo.** Both are already the client's accounts. No new vendors.

**D5. URLs.** Keep `/what-we-believe`, `/partner`, `/books`, `/i-just-got-saved`. Rename `/book-to-speak` to `/invite` with a permanent redirect. All old URLs must resolve after cutover.

**D6. Design direction: "Revival Handbill."** See next section. Rejected: dark cinematic "worship night" look (every large church site already has it) and soft pastel devotional look (wrong for a preacher whose line is "That's what I do — I talk about Jesus").

---

## Design direction: Revival Handbill

The reference is the printed tent-revival and crusade handbill: huge condensed headlines, a single spot colour, tight rules and columns, a date and a city. It is native to what Kolton does, nobody in the research set uses it, and it photographs well as social link previews.

- **Type.** Three roles, none of them Inter. (1) Display: a variable grotesque with a width axis, set very condensed and very heavy for headlines, so headline width can animate on scroll. Candidate: Archivo (variable, width + weight axes). (2) Voice: Instrument Serif italic for Scripture and Kolton's quotes (decided by Evan 2026-11-14 after seeing the comp; the design checker's "overused font" flag is a known, accepted exception). (3) Text: a quiet grotesque for body and UI. Candidate: Archivo at normal width, or Geist. The Step 0.2 agent must confirm each family and its axes exist in `next/font/google` before committing; if Archivo's width axis is not available there, self-host the variable file.
- **Colour.** Keep the brand's equity, sharpen it. Newsprint cream ground, ink black, one signal red used sparingly (CTAs, one word per headline, the cross mark). Gold survives only as hairline rules. Add a full-ink inverse theme for the Gospel chapter and the footer. No gradients, no glassmorphism, no drop shadows.
- **Imagery.** Real photos and video of Kolton preaching, treated in high-contrast duotone (ink + cream) with halftone grain so mixed-quality phone footage looks deliberate. The stock eagle, wheat field and worship-hands photos and the AI lion/eagle/flag collage are removed from page backgrounds. If Kolton wants the lion-and-eagle identity kept, it becomes a small engraved-style mark, not a hero image. (Open question Q2.)
- **Layout.** A visible 12-column grid with hairline rules, numbered sections ("No. 01"), oversized folios, handbill furniture (city/date slugs, "FREE" stamps on resources, ticket-stub event cards). Corners stay square.
- **Standing rule for executing agents.** Load the `impeccable:impeccable` skill before any UI work and the `cinematic-scroll` skill before any motion work, and follow them where this file is silent.

### Scroll and motion (the things that make it stand out)

1. **Hero: the quote that fills in.** Kolton's line "That's what I do — I talk about Jesus." is set enormous over a muted, looping preaching clip. As the visitor scrolls, the headline's width axis opens from condensed to wide and the word "Jesus" turns red. Pinned for about one viewport.
2. **The Gospel in sixty seconds (signature piece).** A pinned, scrubbed chapter on the home page and at `/the-gospel`: four full-screen beats on the ink theme, each one sentence plus a Scripture reference, driven by scroll. It ends on a single button: "I just prayed that prayer" which goes to `/i-just-got-saved`. Copy for the four beats must come from Kolton (Q4). No competitor's site presents the gospel itself; this one does it before asking for anything.
3. **Message reel.** Horizontal, drag-and-scroll strip of vertical 9:16 message cards that plays as the section pins. Posters load first; the YouTube player loads only on click.
4. **Scripture breaks.** The stock-photo parallax dividers are replaced by word-by-word text reveals of the same two verses on flat colour, the highlighted word landing in red.
5. **Handbill details.** Ticker of cities and churches preached at (real ones only), count-up numbers in the impact band, "FREE" stamp that thumps onto resource cards as they enter, page-to-page transitions using the browser's View Transitions API.
6. **Fallbacks, not optional.** With `prefers-reduced-motion`, every pinned chapter renders as normal stacked sections with all content visible. On touch devices, pin lengths are shortened and nothing hijacks native scrolling. No animation may gate content or delay the largest paint.

---

## Site map and funnels

Nav: **Start Here · Watch · Resources · About · Invite Kolton** and a red **Partner** button. Footer carries Books, What We Believe, Prayer, Contact, socials, email signup.

| Route | Purpose | Primary action |
|---|---|---|
| `/` | Home: hero, path cards, Gospel chapter, message reel, free guide, about, books, proof, invite, partner, signup | Varies by section |
| `/the-gospel` | The Gospel chapter as its own shareable page | "I just prayed that prayer" |
| `/i-just-got-saved` | New-believer funnel: welcome video, free New Believer's Guide (Flodesk form + instant download), next steps, "tell us" form | Get the guide |
| `/watch`, `/watch/[slug]` | Message library, filter by topic, one page per message with summary and embed | Watch, then subscribe |
| `/resources`, `/resources/[slug]` | Free downloads, each with its own landing page and email form | Download |
| `/books`, `/books/[slug]` | Books with Amazon links | Buy on Amazon |
| `/about` | Kolton's story | Watch / Invite |
| `/what-we-believe` | The 16 beliefs, verbatim | none |
| `/invite` | Booking: what a visit looks like, then the existing questions as a multi-step form | Submit invite |
| `/events` | Schedule. Only built if Q5 says he has dates | Details |
| `/partner` | Giving: why, where it goes, Donorbox embed, Venmo | Give monthly |
| `/prayer` | Prayer request form | Submit |
| `/links` | Link-in-bio page for Instagram/TikTok/YouTube profiles | The path cards |
| `/contact` | Contact form and email | Send |

**Funnel A, the seeker (the main one).** Social clip → `/links` or `/` → Gospel chapter → `/i-just-got-saved` → email for the guide → Flodesk welcome sequence. Sequence content is drafted in Step 5.4 for Kolton's approval; it is built in Flodesk by Evan, not by an agent.
**Funnel B, the believer.** `/watch/[slug]` → related resource → email → weekly message email.
**Funnel C, the pastor.** `/invite` → multi-step form → submission stored in Payload and emailed to the ministry.
**Funnel D, the partner.** Any page → `/partner` → Donorbox with monthly preselected.

---

## Stages

Each stage ends with something Evan can open and look at. Steps inside a stage marked **[parallel]** touch separate files and can be given to separate subagents at the same time; everything else runs in order. Every subagent brief must include the Handoff block above plus the one step it owns.

### Stage 0 — Direction locked (visible result: one approved home-page comp running locally)

**0.1 Content and asset inventory**
- Goal: one file listing every piece of existing copy, image, video ID, link and form field, and every piece the new site needs that does not exist yet.
- Where: read `../sanity-site/src/**`, `../sanity-studio/schemas/**`, `../sanity-site/public/`. Write `payload-site/CONTENT-TODO.md`.
- Verify: `CONTENT-TODO.md` exists with two tables (Have / Need) and every route in the site map appears in one of them.
- Fence: read-only outside `CONTENT-TODO.md`. Do not query or write the Sanity dataset.

**0.2 Design system**
- Goal: implement the Revival Handbill tokens and fonts, replacing Inter and the old palette.
- Where: `src/app/(frontend)/globals.css`, `tailwind.config.mjs`, `src/app/(frontend)/layout.tsx` (switch the Google Fonts `@import` to `next/font`), new `DESIGN.md`, new route `src/app/(frontend)/styleguide/page.tsx` showing type scale, colours, buttons, form fields, cards, stamps, rules.
- Verify: `pnpm dev`, open `/styleguide`; no element computes to Inter (check `getComputedStyle` on h1, p, button); `pnpm build` passes.
- Fence: no page redesign yet. `/styleguide` must be excluded from the sitemap and set to noindex.

**0.3 Home-page comp**
- Goal: build the new home page top to bottom with real existing copy and placeholder blocks clearly labelled where assets are missing; static, no CMS wiring, no scroll effects beyond CSS.
- Where: `src/app/(frontend)/page.tsx`, new components under `src/components/home/`.
- Verify: screenshots at 375px and 1440px saved to `payload-site/docs/comp/`; no horizontal scroll at 375px; `pnpm build` passes.
- Fence: do not delete the old section components yet. Do not write new marketing copy beyond what `CONTENT-TODO.md` lists as needed.

**Gate: Evan approves the comp before Stage 1.** Revisions happen here, where they are cheap.

### Stage 1 — Content model (visible result: admin shows the new collections with real content in them)

**1.1 Collections and globals**
- Goal: add collections `messages` (title, slug, youtubeId, format short/full, topics, scripture, summary, date, featured), `topics`, `resources` (title, slug, description, file, cover, flodeskFormId, gated yes/no), `books` (fields from `../sanity-site/src/lib/books.ts`), `events`, `testimonies`, `prayer-requests`; add globals `site-settings` (nav, socials, impact numbers, Donorbox/Venmo URLs) and `beliefs`. Update `CLAUDE.md` to reflect decision D2 and to remove its claim that the form-builder, seo, search, redirects and nested-docs plugins are installed (they are not in `payload.config.ts`).
- Where: `src/collections/`, `src/globals/`, `src/payload.config.ts`, a new migration, regenerated `src/payload-types.ts`.
- Verify: `pnpm payload migrate` succeeds on a fresh local database; `pnpm generate:types` produces no diff afterwards; `/admin` lists every new collection; `pnpm test:int` passes.
- Fence: do not hand-edit `payload-types.ts` or the importMap. Do not drop existing globals in this step.

**1.2 Seed**
- Goal: a script that loads existing content: both books, the two preaching video IDs and the New Believers video, the 16 beliefs, the New Believer's Guide PDF as the first resource, partner and footer text.
- Where: `scripts/seed-rebuild.ts`. Source is the fallback copy in `../sanity-site/src`.
- Verify: run it twice against local; second run creates no duplicates; admin shows 2 books, 3 messages, 16 beliefs, 1 resource.
- Fence: local and preview databases only. Never point it at production without Evan saying so in chat.

**1.3 Query layer**
- Goal: one typed data layer; pages never call Payload directly.
- Where: `src/lib/queries/*.ts`.
- Verify: `pnpm lint` passes with a rule or grep check showing `getPayload(` appears only under `src/lib/queries/` and `scripts/`.
- Fence: errors are thrown, not swallowed. An empty collection returns an empty list and the section hides; a failed query fails loudly.

### Stage 2 — Every page exists (visible result: full site clickable on a Vercel preview URL)

All steps **[parallel]**, one subagent each, after 1.3. Each owns only its own route folder and its own `src/components/<area>/` folder; shared pieces come from `src/components/ui/` and may not be edited in these steps.

- **2.1 Home** wired to queries (`src/app/(frontend)/page.tsx`, `src/components/home/`).
- **2.2 Watch**: library with topic filter and search box, plus `/watch/[slug]` (`src/app/(frontend)/watch/`).
- **2.3 Resources**: library plus `/resources/[slug]` landing pages (`.../resources/`).
- **2.4 Books**: list plus `/books/[slug]` (`.../books/`).
- **2.5 About and What We Believe** (`.../about/`, `.../what-we-believe/`). Beliefs text verbatim.
- **2.6 Invite**: the existing booking questions, same wording and order, as a multi-step form posting to `/api/form-submissions`; add permanent redirect from `/book-to-speak` in `redirects.ts`.
- **2.7 Partner**: Donorbox embed, Venmo, where-it-goes cards from the existing giving copy.
- **2.8 I Just Got Saved, Prayer, Contact, Links, 404**.
- **2.9 Shell**: nav, mobile menu, footer, sticky mobile action bar (`src/components/shell/`, `layout.tsx`). Runs first or alone, since every page sits inside it.

For every step in this stage:
- Verify: route returns 200 locally; page renders with an empty database without crashing; form steps submit and the record appears in admin; keyboard-only pass reaches every control; `pnpm build` passes.
- Fence: no scroll animation yet, no copy rewrites, no edits outside the step's folders.

### Stage 3 — Motion (visible result: the scroll experience, recorded as a screen capture)

Sequential, one agent, `cinematic-scroll` skill loaded.

- **3.1 Foundation**: Lenis + ScrollTrigger provider, reduced-motion switch, shared easing and duration tokens. Where: `src/components/motion/`. Verify: toggling reduced motion in dev tools removes all pinning; no hydration warnings in console.
- **3.2 Hero** quote and video. Verify: Largest Contentful Paint under 2.5s on a throttled mobile Lighthouse run; video does not autoplay with sound; poster shows if video is blocked.
- **3.3 Gospel chapter** on home and `/the-gospel`. Verify: all four beats readable with JavaScript disabled; final button reachable by keyboard; works on a 375px touch viewport.
- **3.4 Message reel, Scripture breaks, stamps, counters, page transitions.** Verify: no layout shift above 0.1 on any page; counters show the final number when motion is reduced.
- Fence for the whole stage: animation code lives only in `src/components/motion/` and thin wrappers; no content, schema or layout changes. If a section needs restructuring to animate, stop and report rather than rewrite it.

### Stage 4 — Findability (visible result: rich-result test passing, link previews correct)

- **4.1 Metadata and structured data** [parallel]: per-page titles and descriptions, generated Open Graph images in the handbill style, JSON-LD for Person and Organization sitewide, VideoObject on message pages, Book on book pages, Event on events, breadcrumbs. Check Google's current required properties for each type in its Search Central docs before writing them. Verify: every template passes Google's Rich Results Test with no errors.
- **4.2 Sitemap, robots, redirects** [parallel]: every old URL in `../sanity-site/public/sitemap.xml` resolves with 200 or 301. Verify: a script curls each old URL against the preview and prints the status table.
- **4.3 Performance and accessibility pass**: Verify: Lighthouse mobile on `/`, `/watch`, `/i-just-got-saved`, `/partner` scores 90+ for performance and 95+ for accessibility; run the `design:accessibility-review` skill and fix every blocker.
- Fence: no visual redesign in this stage.

### Stage 5 — Funnels live (visible result: a test email address goes through every funnel end to end on preview)

- **5.1 Flodesk forms**: embed the existing New Believer's Guide form; add per-resource and footer forms using form IDs Evan supplies. Verify: a test signup appears in the correct Flodesk segment. Fence: agents do not create or edit Flodesk segments, forms or subscribers; they only embed IDs they are given.
- **5.2 Form delivery**: invite, prayer and contact submissions are stored and emailed to the ministry address. The email provider is not chosen yet (Q7). Verify: one test submission per form arrives.
- **5.3 Analytics events** for guide download, invite submit, give click, watch click. Provider per Q8. Verify: events visible in the provider's live view.
- **5.4 Welcome sequence draft**: a five-email outline for new believers, written to `docs/welcome-sequence.md` for Kolton to rewrite in his own voice. Fence: draft only, nothing sent or loaded into Flodesk.

### Stage 6 — Launch (visible result: koltonoxshire.com serves the new site)

- **6.1** Run the `security-sweep` skill and `/code-review` on the branch; fix findings.
- **6.2** Production content load and client review on the preview URL.
- **6.3** Cutover: domain moved to the `payload-site` Vercel project, `/admin` redirect to Sanity Studio removed, old Vercel project kept for 30 days as rollback. **Evan performs or explicitly approves this step; no agent changes DNS or production settings on its own.**
- **6.4** Update `Kolton Oxshire/CLAUDE.md` to flip which implementation is live, and correct `sanity-site/CLAUDE.md` (it refers to a `kolton-sanity-site` launch config that does not exist in the parent folder). Add `.claude/launch.json` for `payload-site`.
- Later options, not in scope: on-site quiz as a second lead magnet, Spanish versions, a partner portal, on-site message transcripts.

---

## Risks and tripwires

| Risk | You'll know when | Fallback |
|---|---|---|
| No usable photo or video of Kolton, so the design falls back to stock | Step 0.1 lists fewer than about 10 usable stills and 1 clip | Type-only hero and duotone frames pulled from his existing YouTube uploads; ask for a half-day shoot |
| Postgres migrations drift between parallel agents in Stage 1 | Two migration files created in the same hour, or `migrate` fails on preview | Stage 1.1 is deliberately one agent; never parallelise schema work |
| Scroll effects hurt mobile performance | Step 3.2 Lighthouse run misses 2.5s | Drop hero video on mobile for a still; shorten pins; the content already works without motion |
| New copy drifts from Kolton's voice or doctrine | Any agent writes theology not found in `../sanity-site` | Revert the text, add the gap to `CONTENT-TODO.md`, ask Kolton |
| Variable font width axis unavailable through `next/font` | Step 0.2 font check | Self-host the variable font file, or fall back to weight-only animation |
| Flodesk embed fights the design | Step 5.1, form renders with Flodesk's own styling | Style inside Flodesk's builder to match, as the live site already does; do not scrape or proxy the form |

---

## Open questions for Evan and Kolton (none block Stage 0.1 or 0.2)

- **Q1.** Has Kolton agreed to a full visual change, or does he think this is a platform migration? The current Payload work was scoped as content parity.
- **Q2.** Lion / eagle / flag imagery: keep as a small mark, or retire?
- **Q3.** What photo and video does he have of himself preaching? Raw phone footage is fine.
- **Q4.** The four Gospel beats and the prayer: his wording.
- **Q5.** Does he have upcoming dates? If not, `/events` is skipped.
- **Q6.** Real numbers for the impact band (followers, views, churches, salvations reported). If none, the band is dropped.
- **Q7.** Which service sends form notification emails?
- **Q8.** Which analytics provider?
- **Q9.** The booking form asks pastors to "describe what you use currently for live-streaming services." Is that still wanted, or left over from another form?
