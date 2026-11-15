# Kolton Oxshire Ministries — whole-site rebuild plan

Rewritten 2026-11-14 after the home page design was approved by Evan and built. This file is the single source of truth. Update the Status line and tick steps as they finish. Do not revise it silently.

---

## Handoff block (paste this first into any fresh session)

You are rebuilding **koltonoxshire.com** for Kolton Oxshire Ministries in `Kolton Oxshire/payload-site/` (Next.js 16 App Router, React 19, Tailwind 4, Payload CMS 3.82, Vercel Postgres, pnpm). The live site is `Kolton Oxshire/sanity-site/`; read its copy, never edit it.

The design is settled: **Revival Handbill**. Read `DESIGN.md` before any UI work. Classes are `hb-*` in `src/app/(redesign)/handbill.css`, tokens are in `globals.css`, the finished reference is the home page in `src/components/redesign/home/`. The job now is to carry that design through every other page, add the content types and pages the site is missing, then add scroll animation, search visibility, working email and giving funnels, and launch.

The site's purpose: a visitor arriving from a 30-second clip can hear the gospel, respond to it, get the free New Believer's Guide, watch more, invite Kolton to preach, or become a partner, each in two clicks or fewer.

Rules that never bend:
- **Kolton's words stay Kolton's.** The 16 beliefs, his bio, his quotes, the 12 booking questions and the partner copy are ported verbatim. New copy is written only where this plan names it, and each new line is added to `CONTENT-TODO.md` for approval.
- **Nothing invented.** No made-up numbers, testimonies, events, endorsements or video titles. If the real thing isn't supplied, that section does not render.
- **The Sanity production dataset (`roz05b4r`) is read-only.**
- **Database:** every schema change needs `pnpm payload migrate:create` and `pnpm generate:types`. `pnpm dev` pushes schema straight to the database in `POSTGRES_URL`, so do not run `pnpm dev` until prerequisite P2 is answered. Verify with a production build instead (see "How to verify").
- **No agent touches** DNS, Vercel project or security settings, Flodesk segments/forms/subscribers, or Donorbox. Those are Evan's.
- **Design guardrails:** load the `impeccable:impeccable` skill before UI work and `cinematic-scroll` before motion work. One red word per headline. No Inter, no stock photos, no gradients, no rounded corners.
- A step is done only when its Verify line has been run and passed.

**Status (2026-11-15):** Stage 0 done. The redesign now lives beside the current build instead of replacing it (decision D8): the current site is untouched at `/`, the redesign is served at `/redesign`. The Gospel section is already built as the pinned tent film (Evan approved the film on 2026-11-15), ahead of Stage 4. Awaiting Kolton's sign-off. **Next action: Step 1.0.** Stage 1 needs no database changes.

**Where the redesign lives:** routes in `src/app/(redesign)/redesign/` (own root layout, `redesign.css`, `handbill.css`), components in `src/components/redesign/`, media in `public/redesign/`. Every route in this plan is built under `/redesign` (so `/i-just-got-saved` in the site map means `/redesign/i-just-got-saved`) until cutover. Links between redesign pages go through `src/components/redesign/paths.ts`. Do not edit anything under `src/app/(frontend)/` or the top-level files in `src/components/`: that is the current build.

---

## Prerequisites (Evan)

| # | Needed | Blocks |
|---|---|---|
| P1 | A real `BLOB_READ_WRITE_TOKEN` in `.env.local` (the current value is malformed, so Payload cannot start locally) | Running the site locally; Stage 2 onward |
| P2 | Confirm whether the Neon database in `.env.local` is a development copy or the one the launched site will use | Stage 2 (schema changes) |
| P3 | Kolton's approval of the home page direction | Nothing technically, but stop after Stage 1 if he wants changes |
| P4 | The items in `CONTENT-TODO.md` "Need" (Gospel beat wording, YouTube channel URL, real video titles, photos, numbers, dates) | The specific sections that use them |
| P5 | Vercel: make previews viewable (shareable link or protection off) and remove or fix the duplicate `kolton-oxshire-payload` project that fails every build for lack of `PAYLOAD_SECRET` | Client review links |
| P6 | Flodesk form IDs for the footer signup and per-resource forms; which service sends form notification emails; which analytics provider | Stage 6 |

## How to verify (used by every step)

- **Build:** `pnpm build`. Until P1 is fixed, run `BLOB_READ_WRITE_TOKEN=vercel_blob_rw_localcheck_notarealtoken pnpm exec next build` (the dummy value only passes the format check; never write it to a file).
- **Look at it:** `pnpm build && PORT=3360 pnpm start` (a production server does not push schema), then open the route at 1440px and 390px wide. Never judge a page from code alone.
- **Lint and types:** `pnpm lint`, and `pnpm exec tsc --noEmit` filtered to the files you touched.
- **Design check:** `impeccable detect <files>`; fix real findings, and record any false positive with `impeccable hooks ignore-value` plus the reason.
- **Tests:** `pnpm test:int` after schema or query changes; `pnpm test:e2e` at the end of each stage.

## Subagent brief template

Each step below is one subagent's whole job. Give it: the Handoff block, the "How to verify" section, and its one step. It reports back the Verify output, the files it changed, and anything it was unsure about. It does not commit.

---

## Decisions already made (do not reopen)

- **D1.** Build in `payload-site`. Not a restyle of the Vite site (client-rendered, invisible to search) and not a fresh template clone (discards the Postgres setup and ported content).
- **D2.** Repeating content (messages, resources, books, events, testimonies) lives in collections so each item gets a URL. One-off content stays in globals.
- **D3.** Motion: GSAP ScrollTrigger + Lenis. Check current package names and licence on gsap.com and npm before installing.
- **D4.** Email stays on Flodesk; giving stays on Donorbox and Venmo.
- **D5.** URLs: keep `/what-we-believe`, `/partner`, `/i-just-got-saved`, add `/books`. `/book-to-speak` becomes `/invite` with a permanent redirect. Every URL in the live site's sitemap must still resolve.
- **D6.** Design: Revival Handbill, Archivo + Instrument Serif (Evan chose to keep Instrument Serif on 2026-11-14).
- **D8.** Both designs are kept in one repo and one deploy: the current build at `/`, the redesign at `/redesign` with its own root layout and styles (Evan, 2026-11-15). Rejected: a second standalone app folder (two dependency sets, two Vercel projects, every CMS change made twice). At launch (Step 7.3) the redesign moves to the root by setting `REDESIGN_BASE` to `''` and moving its routes into the root group; the old pages are deleted then, not before.
- **D9.** The Gospel chapter uses the tent film, scrubbed by scroll. The clip in `public/redesign/tent-film.mp4` is the 480p AI-generated draft; replace it with a full-resolution render before launch, and never present it as footage of a real meeting.
- **D7.** Order of work: restyle what exists first (no database risk, quickly reviewable), then the content model, then new pages. Rejected: content model first, because it is blocked on P1/P2 and shows nothing to the client for days.

---

## Site map when finished

Nav: **Start Here · Watch · Resources · About · Invite Kolton** and a red **Partner** button. (Today's nav carries Books and What We Believe; they move to About's sub-links and the footer once `/about` and `/resources` exist.)

| Route | Exists today | Built in | Purpose and primary action |
|---|---|---|---|
| `/` | New design | Stage 0 | Hub. Varies by section. |
| `/i-just-got-saved` | Old layout | 1.1 | New-believer funnel. Get the guide. |
| `/what-we-believe` | Old layout | 1.2 | The 16 beliefs. Read. |
| `/invite` (from `/book-to-speak`) | Old layout | 1.3 | Booking. Submit an invitation. |
| `/partner` | Old layout | 1.4 | Giving. Give monthly. |
| not-found | Old layout | 1.5 | Send people back to the four paths. |
| `/watch`, `/watch/[slug]` | No | 3.1 | Message library by topic. Watch, then subscribe. |
| `/resources`, `/resources/[slug]` | No | 3.2 | Free downloads, each with its own landing page. Download. |
| `/books`, `/books/[slug]` | No | 3.3 | Books. Buy on Amazon. |
| `/about` | No | 3.4 | Kolton's story. Watch or invite. |
| `/the-gospel` | No | 3.5 | The Gospel chapter as a shareable page. "I just prayed that prayer." |
| `/prayer`, `/contact` | No | 3.6 | Prayer request and contact forms. |
| `/links` | No | 3.7 | Link-in-bio page for his social profiles. |
| `/events` | No | 3.8 | Schedule. Only if P4 supplies dates. |

---

## Stage 1 — Carry the design through the existing pages

Visible result: every page that exists today is in the new design on a preview link. No database changes. Step 1.0 first, then 1.1–1.5 in parallel (each owns one route folder), then 1.6.

**1.0 Shared kit**
- Goal: pull the pieces the inner pages will all need out of the home components so nobody rebuilds them five ways.
- Build: `PageHeader` (number slug, condensed title with optional serif phrase, optional intro), `SectionHead` (the `.hb-sec-head` pattern, currently repeated inline), `Button`/`ButtonLink` wrappers for `.hb-btn` variants, `VideoPoster` (duotone poster with play mark that swaps to the YouTube iframe on click), form primitives `Field`, `TextArea`, `Checkbox`, `FormError`, `FormSuccess` styled as handbill fields (2px ink border, square, visible focus), and a `/styleguide` route showing all of it.
- Where: `src/components/redesign/hb/`, additions to `handbill.css`, `src/app/(redesign)/redesign/styleguide/page.tsx`. Refactor home components to use `SectionHead` only where it is a pure swap.
- Verify: `/styleguide` renders every piece at both widths; home page screenshots before and after are visually identical; build and lint pass.
- Fence: no new visual ideas, only what the home page already established plus form fields. `/styleguide` is `noindex` and excluded from the sitemap.

**1.1 I Just Got Saved**
- Design: ink header band, "Welcome to the family" slug, title "I just got saved!" with "saved" in red, the existing congratulations paragraph in serif. Then "Watch this first" with `VideoPoster` for `mRovCJ8PVaU`. Then the red guide band from the home page as the main event. Then the four path cards as "What's next".
- The form: remove the fake subscribe form (`NewBelieverForm.tsx` stores nothing and links nowhere). Until Stage 6 wires Flodesk, the guide band shows one honest button, "Download the guide", pointing at `/new-believers-guide.pdf`.
- Where: `src/app/(redesign)/redesign/i-just-got-saved/`, `src/components/redesign/saved/`. Delete `NewBelieverForm.tsx`.
- Verify: the PDF downloads from the button; no element on the page claims to subscribe anyone; video iframe is not requested until the poster is clicked (check the network panel).
- Fence: existing copy verbatim. "What's next" reuses the home path cards; no new discipleship copy.

**1.2 What We Believe**
- Design: `PageHeader` "What we believe" ("believe" red) with the existing intro line. The 16 statements as a numbered handbill list: large condensed red numeral 01–16, "We believe" as a slug, the statement in body text at a readable measure, hairline rule between. Two columns from 1100px up, one below. Closing band: Scripture line and a button to `/i-just-got-saved`.
- Where: `src/app/(redesign)/redesign/what-we-believe/`.
- Verify: a script diffs the 16 strings against `../sanity-site/src/pages/WhatWeBelieve.tsx` and reports zero differences; page reads top to bottom with CSS disabled.
- Fence: not one word of doctrine changes, including capitalisation ("HOLY", "The Inspired Word of God"). Remove the faint lion/flag background image.

**1.3 Invite Kolton**
- Design: left column on ink, "Invite Kolton to preach", the booking global's description, and three ticket-stub facts (Churches / Events / Revivals). Right column on cream, the form as three steps with a progress rail like the Gospel rail: 1 "You and your church" (name, email, phone, website, address), 2 "The service" (service type, seats, the checkbox, denomination, two like-minded churches), 3 "Details" (live-streaming question, anything additional). Success state is a full-width stamp-style confirmation.
- Route: move to `/invite`, add a permanent redirect from `/book-to-speak` in `redirects.ts`, update every internal link.
- Where: `src/app/(redesign)/redesign/invite/`, `src/components/redesign/invite/`, `redirects.ts`. Keep posting to `/api/form-submissions`.
- Verify: all 12 questions present with identical wording and required flags (script-diff the labels against the current `BookingForm.tsx`); submitting on a preview deployment creates a record visible in `/admin`; each step is completable by keyboard; an invalid step cannot be skipped; `/book-to-speak` returns 308 to `/invite`.
- Fence: no questions added, dropped or reworded (the live-streaming question stays until Kolton says otherwise). No change to the `form-submissions` collection.

**1.4 Partner**
- Design: header with the sublines as the headline ("It's more than a transaction. **You are family.**"). Mission statement in two columns. The giving verse as a Scripture break. "Where it goes": the three impact areas from the giving global as numbered cards. Then the giving block: Donorbox embed in a cream panel with a 2px ink border and a hard offset shadow, Venmo and any additional giving links as buttons beside it.
- Where: `src/app/(redesign)/redesign/partner/`, `src/components/redesign/partner/`.
- Verify: Donorbox iframe loads and its amount buttons respond; Venmo link opens; page works with every `partner-page` field empty (falls back to the live site's copy).
- Fence: do not change the Donorbox URL or its parameters. No giving amounts or "monthly" defaults invented on our side; that is configured in Donorbox.

**1.5 Not found**
- Design: "404" as a huge condensed numeral, the line "This page isn't here." and the four path cards.
- Where: `src/app/(redesign)/redesign/[...missing]/page.tsx` (a catch-all under `/redesign`; the current build keeps its own not-found).
- Verify: `/nope` returns status 404 and renders the cards.
- Fence: no jokes about being lost.

**1.6 Stage review**
- Goal: one pass over all pages together.
- Do: screenshots of every route at 1440 and 390 into `docs/build/`; keyboard pass on every page; `impeccable detect` on the built HTML of each route; remove the old unused section components (`HeroSection`, `AboutSection`, `TeachingSection`, `PreachingVideos`, `GivingSection`, `ParallaxDivider`, `lib/stockPhotos.ts`) once grep shows nothing imports them.
- Verify: build passes after the deletions; `pnpm test:e2e` passes (update `frontend.e2e.spec.ts` if it asserts old text).
- Then: commit, push, and give Evan the preview link. **Gate: Evan and Kolton review before Stage 2.**

---

## Stage 2 — Content model

Visible result: `/admin` shows the new content types with real content in them. Blocked on P1 and P2. One agent, in order; never parallelise schema work.

**2.1 Collections and globals**
- Add collections: `messages` (title, slug, youtubeId, format short/full, topics relation, scripture reference, summary, publishedAt, featured), `topics` (title, slug), `resources` (title, slug, description, file upload, cover, flodeskFormId, gated), `books` (the fields in `src/lib/books.ts`), `events` (title, date, venue, city, link), `testimonies` (name, city, body, approved), `prayer-requests` and `contact-messages` (create-only for the public, like `form-submissions`).
- Add globals: `site-settings` (nav links, social URLs, YouTube channel URL, impact numbers, Donorbox and Venmo URLs), `beliefs` (ordered list of 16), `gospel` (four beats: headline, accent word, verse, reference; plus the closing line).
- Trim the `hero-section` global to the fields the new hero uses (quote, description, portrait).
- Where: `src/collections/`, `src/globals/`, `payload.config.ts`, one migration, regenerated types. Update the "Rules for this repo" in `CLAUDE.md`: it still says page content never goes in collections and lists plugins that are not installed.
- Verify: `pnpm payload migrate` succeeds on a fresh local database; `pnpm generate:types` leaves no diff; every collection appears in `/admin`; an anonymous `GET /api/prayer-requests` returns 403; `pnpm test:int` passes.
- Fence: do not hand-edit `payload-types.ts` or the importMap. Do not delete existing globals' data.

**2.2 Seed**
- Goal: load what already exists: 2 books, the 3 videos (with their current titles), 16 beliefs, the New Believer's Guide PDF as the first resource, the four placeholder Gospel beats, footer and partner text.
- Where: `scripts/seed-rebuild.ts`.
- Verify: run twice; the second run creates nothing new; counts in `/admin` are 2, 3, 16, 1, 4.
- Fence: local or preview database only. Never production without Evan saying so in chat.

**2.3 Query layer and rewiring**
- Goal: one typed data layer, `src/lib/queries/`, and the pages from Stages 0–1 read from it (beliefs, books, gospel beats, messages, settings).
- Verify: `grep -rn "getPayload(" src` matches only `src/lib/queries/` and `scripts/`; every page renders with an empty database (sections hide, nothing crashes); a failing query throws rather than rendering blank.
- Fence: no visual changes in this step.

---

## Stage 3 — New pages

Visible result: the full site map is clickable on a preview. Steps run in parallel after 2.3; each owns its route folder and a matching `src/components/redesign/<area>/` folder and may not edit `src/components/redesign/hb/`.

- **3.1 Watch.** Library: `PageHeader`, topic chips that filter, a text search over titles and summaries, message cards from the home reel in a responsive grid. Message page: `VideoPoster` at full width, title, Scripture reference, summary, topic chips, three related messages, then the guide band. Verify: filter and search work without a page reload and with the back button; a message page with no summary still renders.
- **3.2 Resources.** Library of cards with the "Free" stamp. Landing page per resource: cover on the left as a printed object, what's inside, download. Gated resources show their Flodesk form (wired in Stage 6; until then the direct download). Verify: the guide's landing page downloads the PDF.
- **3.3 Books.** List and detail pages from the collection; detail shows the full description paragraphs and the Amazon button. Home section links through. Verify: both books render; cover images are served from our own media, not hot-linked from Amazon.
- **3.4 About.** Kolton's story at length: portrait, the three bio paragraphs, pull quotes in serif, links to beliefs, messages and invite. Only uses copy that exists; if P4 supplies a longer story it goes here. Verify: no paragraph on the page is absent from `CONTENT-TODO.md` "Have".
- **3.5 The Gospel.** The home chapter as its own page, reading from the `gospel` global, ending on "I just prayed that prayer". Verify: fully readable with JavaScript off.
- **3.6 Prayer and Contact.** Two short forms using the kit, stored in their collections. Prayer: name (optional), request, "may we share this?" checkbox. Contact: name, email, message. Verify: submissions appear in `/admin`; a honeypot field blocks a scripted submit.
- **3.7 Links.** Phone-first single column: wordmark, his line, the four paths as full-width buttons, latest message, socials. Verify: looks right at 360px; no horizontal scroll.
- **3.8 Events.** Ticket-stub cards by date. Skip entirely if P4 has no dates.
- **3.9 Shell update.** Final nav and footer from `site-settings`; sticky action bar on phones ("Hear the Gospel" / "Partner"). Runs last.
- Fence for the stage: no scroll animation, no copy beyond what each step names, placeholders listed in `CONTENT-TODO.md`.

---

## Stage 4 — Motion

Visible result: a screen recording of the scroll experience. One agent, in order, `cinematic-scroll` skill loaded. Animation code lives in `src/components/redesign/motion/` and thin wrappers only.

- **4.1 Foundation.** Lenis + ScrollTrigger provider, a reduced-motion switch, shared easing and duration tokens. Verify: with reduced motion on, nothing pins and nothing is hidden; no hydration warnings.
- **4.2 Hero.** The headline's width axis opens as you scroll and "Jesus." lands in red; ticker drifts. No video here; the film belongs to the Gospel chapter. Verify: Largest Contentful Paint under 2.5s on a throttled mobile Lighthouse run.
- **4.3 Gospel chapter.** Already pinned and film-scrubbed on the home page (`GospelFilm.tsx`). Remaining: port its loop onto the shared Lenis/ScrollTrigger foundation, reuse it on `/the-gospel`, swap in the full-resolution film, and test scrubbing on a real iPhone (untested). Verify: all four beats and the button reachable by keyboard; works at 390px.
- **4.4 The rest.** Scripture lines reveal word by word; the "Free" stamp thumps onto guide and resource cards; impact numbers count up (only if real numbers exist); the invite form's rail animates between steps; page-to-page transitions with the View Transitions API where supported. Verify: cumulative layout shift under 0.1 on every route.
- Fence: no content, schema or layout changes. If a section must be restructured to animate, stop and report.

---

## Stage 5 — Findability and quality

- **5.1 Metadata and structured data** [parallel]. Per-page titles and descriptions; generated Open Graph images in the handbill style; JSON-LD for Person and Organization sitewide, VideoObject on message pages, Book on book pages, Event on events, breadcrumbs. Check Google Search Central for each type's current required properties before writing. Verify: Rich Results Test passes for each template.
- **5.2 Sitemap, robots, redirects** [parallel]. Verify: a script requests every URL in `../sanity-site/public/sitemap.xml` against the preview and prints 200 or 308 for each.
- **5.3 Performance and accessibility.** Lighthouse mobile on `/`, `/watch`, `/i-just-got-saved`, `/partner`: 90+ performance, 95+ accessibility. Run the `design:accessibility-review` skill and fix every blocker.
- Fence: no redesign.

## Stage 6 — Funnels live

- **6.1 Flodesk.** Embed the existing guide form (ID is in `../sanity-site/src/components/NewsletterForm.tsx`) on `/i-just-got-saved`, the home guide band and the guide's resource page; footer and per-resource forms use IDs from P6. Style the forms inside Flodesk's builder to match. Verify: a test address lands in the right Flodesk segment and receives the guide email.
- **6.2 Form delivery.** Invite, prayer and contact submissions also email the ministry (provider from P6). Verify: one test of each arrives.
- **6.3 Analytics.** Events for guide download, invite submit, give click, message play (provider from P6). Verify: visible in the provider's live view.
- **6.4 Welcome sequence.** A five-email outline for new believers in `docs/welcome-sequence.md` for Kolton to rewrite in his voice. Draft only; nothing loaded into Flodesk.

## Stage 7 — Launch

- **7.1** `security-sweep` skill and `/code-review` on the branch; fix findings.
- **7.2** Final content load into the production database; Kolton reviews the preview.
- **7.3** Cutover: domain to this Vercel project, remove the `/admin` redirect to Sanity Studio, keep the old project 30 days as rollback. **Evan does or explicitly approves this step.**
- **7.4** Update `Kolton Oxshire/CLAUDE.md` to say this implementation is live; fix `sanity-site/CLAUDE.md`'s reference to a launch config location that is wrong.
- Later, not in scope: a quiz as a second lead magnet, Spanish pages, a partner portal, on-site transcripts.

---

## Risks and tripwires

| Risk | You'll know when | Fallback |
|---|---|---|
| Kolton wants a different direction | His reply to the home page proof | Stop after Stage 1.0; tokens and the kit make a restyle cheap, the page structure survives |
| Schema work hits the real database | Step 2.1 is about to run and P2 is still unanswered | Do not run it. Create a separate Neon branch for development first |
| Only one photo of Kolton | Step 1.3 or 3.4 needs a second image | Type-only layouts and the portrait in a second treatment (red duotone); ask again for photos |
| Parallel agents collide on shared files | Two agents both edit `handbill.css` or `src/components/redesign/hb/` | Step 1.0 owns the kit; later steps add CSS only in their own section block and never edit the kit |
| New copy drifts from his voice or doctrine | Any text not in `CONTENT-TODO.md` "Have" appears on a page | Remove it, log the gap in "Need", ask Kolton |
| Scroll effects hurt phones | Step 4.2 misses 2.5s | Shorten or drop pins on small screens; the static page already works |
| Flodesk embed clashes with the design | Step 6.1 | Style it in Flodesk's builder; do not proxy or scrape the form |

## Open questions for Kolton

Tracked in `CONTENT-TODO.md`. The ones that change what gets built: his wording for the four Gospel beats and the translation he wants, whether the lion/eagle/flag imagery stays, whether he has upcoming dates, real numbers for an impact band, and whether the live-streaming question still belongs on the booking form.
