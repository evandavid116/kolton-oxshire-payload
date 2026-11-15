# Content inventory — Kolton Oxshire rebuild

Last updated 2026-11-14. "Have" is content that already exists and was ported word for word. "Need" is what the new site requires that does not exist yet. Nothing in "Need" may be invented by an agent.

## Have

| Content | Where it comes from | Used on |
|---|---|---|
| Hero line "That's what I do — I talk about Jesus." and description | `hero-section` global (fallback copy in `../sanity-site/src/components/HeroSection.tsx`) | `/` hero |
| About heading and three-paragraph bio | `about-section` global | `/` about |
| Portrait photo | `about-section.portrait`, fallback `public/assets/kolton-portrait.jpg` | `/` hero and about |
| Preaching videos (YouTube IDs `yQ2ISH7yqss`, `23gsPRcLwqE`) | `preaching-videos` global | `/` watch |
| New Believers video (`mRovCJ8PVaU`) | hard-coded in `/i-just-got-saved` | `/i-just-got-saved` |
| New Believer's Guide PDF | `public/new-believers-guide.pdf` (copied from the live site) | `/` guide section |
| Two Scripture lines and their highlight words | `parallax-dividers` global | `/` Scripture break, footer |
| Books: 30 Day Devotional, The Full Armor of God | `src/lib/books.ts` (copied from the live site) | `/` books |
| Partner lines "It's More Than a Transaction. You Are Family." and giving copy | `partner-page`, `giving-section` globals | `/` partner, `/partner` |
| Invite copy "Join Kolton at live speaking engagements…" | `teaching-section` fallback card "Live Events" | `/` invite |
| 16 statements of belief | hard-coded in `/what-we-believe` | `/what-we-believe` |
| Booking questions (12 fields) | `src/components/BookingForm.tsx` | `/book-to-speak` |
| Contact heading, subtext, email | `site-footer` global | footer |
| Donorbox and Venmo links | `partner-page` global | `/partner` |
| Flodesk form ID for the guide | `../sanity-site/src/components/NewsletterForm.tsx` | not wired in this codebase yet |

## Need (from Kolton / Evan)

| Needed | For | Status |
|---|---|---|
| Wording of the four Gospel beats and the prayer | `/` Gospel chapter, `/the-gospel` | Romans 3:23, 6:23, 5:8, 10:9 (KJV) are standing in. He uses NKJV in his devotional, so confirm the translation too. |
| Approval of new lines written for the rebuild | `/` | "Where are you today?", the four path-card lines, "Ready to give your life to Jesus?", "I just prayed that prayer", "Talk about Jesus and watch God move." shown as a quote under his portrait |
| YouTube channel URL | "More messages" card, footer | Card currently links to his first video |
| Real titles for the videos | `/` watch | Still "Preaching Short #1/#2" |
| More photos or video of Kolton preaching | hero, about, invite | Only the one portrait exists; YouTube frames have captions burned in and are not reliably flattering |
| Decision on lion / eagle / flag imagery | brand | Appears only as the backdrop of his portrait |
| Real numbers (followers, views, churches) | impact band | Band is not built until supplied |
| Upcoming dates | `/events` | Page not built until supplied |
| Whether the live-streaming question on the booking form is still wanted | `/book-to-speak` | Unchanged for now |
| Welcome email sequence for new believers | Flodesk | Outline to be drafted in Stage 5 for Kolton to rewrite |

## Known gaps in the code (not content)

- `/i-just-got-saved` in this codebase has a form that only pretends to subscribe: it validates the email, shows a thank-you and a download link that points nowhere, and stores nothing. The live site uses the real Flodesk form. Fix in Stage 5.1; until then the home page sends people to that page and also offers the direct PDF download.
- The `hero-section` global still has `eyebrow`, `name`, `buttons` and `backgroundImage` fields that the new hero does not use. Clean up in Stage 1.1.
