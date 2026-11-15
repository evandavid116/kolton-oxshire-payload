# Design system — Revival Handbill

The public site is styled after printed tent-revival handbills: very large condensed headlines, one spot colour, hairline rules, numbered sections, square corners. Approved by Evan on 2026-11-14 from the comp in `docs/comp/`.

## Where things live
- Tokens (colours, `--gut`, rules): `:root` in `src/app/(frontend)/globals.css`.
- Component classes: `src/app/(frontend)/handbill.css`. Every class is prefixed `hb-`.
- Fonts: loaded with `next/font` in `src/app/(frontend)/layout.tsx`, exposed as `--font-archivo` and `--font-instrument`.
- Home sections: `src/components/home/`. Shell: `src/components/Navbar.tsx`, `src/components/FooterSection.tsx`.

## Type
| Role | Face | How |
|---|---|---|
| Display | Archivo, width 62%, weight 900, uppercase | `.hb-cond` (all `h1`–`h6` default to this) |
| Display, accent word | Archivo, width 125%, weight 900 | `.hb-wide` (the red "JESUS." in the hero) |
| Voice (Scripture, Kolton's quotes) | Instrument Serif italic | `.hb-serif` |
| Text and UI | Archivo, normal width | body default |
| Labels | Archivo 12px, tracked, uppercase | `.hb-slug` |

Body copy is 17px at 1.5 line height. Display type runs at 0.86–0.95 line height on purpose.

## Colour
| Token | Value | Use |
|---|---|---|
| `--cream` | `#f1eadb` | page ground (the client's existing brand colour) |
| `--paper` | `#e8dfcc` | secondary ground |
| `--ink` | `#141312` | text, inverse sections |
| `--red` | `#c8251a` | CTAs, one accent word per headline; 4.6:1 on cream |
| `--red-on-ink` | `#f0483a` | red text on ink sections; 4.9:1 on ink |

`.hb-red` switches to `--red-on-ink` automatically inside ink sections. No gradients, no blur, no rounded corners. Hard offset shadows are allowed on the "printed object" pieces (guide cover, book covers).

## Photos
Wrap in `.hb-duo` for the ink-on-cream halftone treatment; add `.hb-red-bg` for ink-on-red. This is what makes phone footage look deliberate. Use Kolton's portrait or other client-approved photos; arbitrary YouTube frames in large slots tend to catch him mid-word with captions on screen.

## Rules
- One red word per headline, not more.
- Section headers use `.hb-sec-head`: number slug, condensed heading with an optional serif phrase, right-hand slug.
- Every interactive element needs a visible `:focus-visible` state (already global in `handbill.css`).
- Scroll animation is not built yet (Stage 3 of `PLAN.md`). Every section must stay fully readable without it.
