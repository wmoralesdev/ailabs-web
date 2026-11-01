# Ai Labs Web

Durable working brief for agents in this repository. Keep it short and
stable. Current implementation details belong in code, not in parallel
planning documents.

## Source of truth

- Product, brand and copy invariants live in this file.
- The approved narrative and section map is `docs/narrativa-y-mapa.md`; the
  copy decks `docs/copy-es.md` and `docs/copy-en.md` are the reviewable
  mirror of the content modules, and `docs/formatos-referencia.md` is the
  research behind the training formats. Change the deck and the module
  together.
- Customer-facing copy lives in `src/content/es.ts`, `src/content/en.ts`,
  `src/content/service-pages-{es,en}.ts`; the shared contract is
  `src/content/types.ts`. Length budgets and voice are enforced by
  `pnpm copy:check` (`scripts/copy-length.ts`).
- Design tokens, theme mappings and global utilities live in
  `src/styles.css`. Layout and behavior live in `src/components` and
  `src/routes`.
- `audit.md` is a stale audit of a layout that no longer exists. Do not treat
  it as a specification.

When this file and the implementation disagree, inspect the recent code and
git history before acting. Do not revive a retired layout, route or copy
direction because an old plan or commit mentions it.

## Product

Ai Labs is a private company in San Salvador, El Salvador. It designs and
implements AI automations and custom software for companies, opens every
engagement with a free 30-minute diagnostic, and trains business teams on
their own work. It works with companies across El Salvador and abroad.

**The buyer** is the person who decides in a company of roughly 20 to 300
people: owner, general manager, operations, sales or finance manager. Their
processes live in WhatsApp, Excel, email and systems that do not talk to each
other. Every page speaks to that person, except `/events`.

**Three offers for that buyer:**

- **Automatización y software a medida** (`/automatizacion-ia-el-salvador`):
  connect the tools the company already uses, automate the repetitive work,
  build what is missing; human review, integrations, documentation, handoff.
- **Diagnóstico de IA** (`/consultoria-de-ia-el-salvador`): the free
  30-minute diagnostic, by video call or in person, then a process review
  with the team, a prioritized improvement, scope and quote, and a short plan.
- **Capacitación para equipos** (`/capacitacion-ia-el-salvador`): Learning
  Day (4 hours in-company), Build Day (one day, open multi-company cohort,
  prototype and business case), Bootcamp (two days or more, in-company), and
  the public workshops.

**Events are the funnel, not the target.** `/events` lists the Luma
calendar with two tracks: leaders (desayuno ejecutivo, masterclass, demo
day) and builders (labs, meetups, hackathons). The WhatsApp community lives
there. Students and builders are the audience of the events, not the reader
of the site. A career bootcamp for developers is a future product with its
own landing; it does not appear on the site.

**Facts the owner confirmed on 2026-11-01.** The diagnostic is free. No
prices, no "precio cerrado" and no time ranges are published: copy says
"alcance y cotización antes de empezar". Post-delivery support is negotiated
per tool. Client data stays in the client's accounts. The ambassador
programs are SpaceXAI, OpenAI, Codex, Cognition, Cursor, Mistral, ElevenLabs
and Notion; Claude is a tool we work with, not an ambassadorship. The only
public number is "más de 60 eventos de IA desde 2025". Never publish
"personas formadas", "empresas representadas", client names taken from
attendee emails, or any metric the owner has not confirmed.

## Brand and content

- The name and the lockup are **Ai Labs**, the wordmark outlined from Plus
  Jakarta Sans 600. The favicon is the mark alone.
- No sub-brands. Academy, Agentic and Aperture are retired and must not
  return in copy, code identifiers for new work, or navigation. Format
  names (Learning Day, Build Day, Bootcamp, Masterclass) are allowed because
  business readers already use them, and each one carries its description.
- Voice: first person plural ("somos", "hacemos", "we"), voseo in Spanish
  ("agendá", "contanos"), direct, concrete, no hype. Nothing defensive: the
  site never explains what it is not, and the old disclaimer about the
  national AI agency stays gone. One place name per block, not per sentence.
  No em or en dashes as connectors, no triads by habit, no section titles
  ending in a period. `public/llms.txt` is written for machines and stays in
  the third person.
- SEO lives in four slots per page: title, meta description, H1 and the first
  FAQ. Everything else is written for the buyer. The queries kept, one per
  page, are pinned in `src/content/first-place-queries.test.ts`. The home
  title is brand plus offers so it does not compete with the consulting page.
- Length budgets, enforced for both languages: H1 55 characters, lead 160,
  section title 40, card line 120, step body 100, FAQ answer 220, at most
  five FAQs per page, meta title 60, meta description 110 to 160. Siblings
  shown side by side stay within a 1.6x ratio of each other.
- English and Spanish stay in parity: same structure, same counts, Spanish
  written first.
- FAQ answers stay visible on the page and are the same text as the
  `FAQPage` JSON-LD and the `llms.txt` FAQ.
- Imagery: real Ai Labs photos only where people are the point (training,
  events). Service and booking openings print the Ai Labs mark as halftone
  instead of a photo. Photos are chosen by the owner. No generic robot,
  neon-brain, server-room or AI-gradient imagery; reuse `public/brand`
  assets as they are.

## Current application

- Shared chrome is a flat sticky header (`SiteHeader`): lockup, a Services
  menu with the three service pages, Eventos, theme, locale and one
  "Agendar diagnóstico" button to `/agendar`. The footer is the night block
  revealed from under the page, ending in the "get curious" line. The 404
  offers home and booking.
- Locale is in the URL. Spanish is the default at the unprefixed paths;
  English lives under `/en/…` with the same slugs. Unprefixed URLs always
  return Spanish, including to crawlers; `/es/*` 301s to the unprefixed
  path. Each page publishes reciprocal `hreflang` (`es`, `en`, `x-default`
  to Spanish) and a self-canonical.
- The home (`/`) has six sections, in this order: Hero (headline, lead, two
  CTAs beside the live halftone mark), Ambassadors (programs as halftone
  marks, "y trabajamos con" Claude, one sentence, one number), Offers (a
  bento of three text cells and pure-halftone cells, no photos), Method
  (three steps, `#metodo`), FAQ (five visible answers), Booking tile
  (`/agendar`). No problem section, no team block, no photo bands.
- The three service pages share `src/components/marketing/service-page.tsx`
  and the `servicePages` content: opening (eyebrow, H1, lead, CTA, optional
  photo or the printed mark), who it is for and not for, what it includes
  (the formats on training), how it works in three steps, an optional real
  example, five FAQs whose first answer is the definition, booking and the
  two related pages plus events. Paths and ids are `src/lib/service-pages.ts`.
- `/events` reuses the home hero with its own copy, then the two tracks, the
  photo marquee, the current month from Luma, the WhatsApp community block
  (`COMMUNITY_WHATSAPP_URL`) and the bridge to the diagnostic.
- `/agendar` is the booking page: the campaign split hero, three steps, and
  the cal.com calendar embedded by `src/components/campaign/booking-embed.tsx`
  from `BOOKING_CAL_LINK` in `src/content/booking.ts` (one event,
  `walter-ailabs/diagnostico`, for the three offers). The embed follows the
  site theme and remounts on a theme switch, because the booker ignores
  runtime theme updates. Service pages link with `?tema=automatizacion`,
  `?tema=consultoria` or `?tema=capacitacion`, and `BOOKING_TOPICS` maps those
  to the option labels of the event's "¿Sobre qué querés hablar?" question;
  change them together with the event. While the link is empty the page
  shows the pending notice. WhatsApp buttons render only when `WHATSAPP_URL`
  (a business number) is set. There is no contact form and nothing is stored.
- `/terms` and `/privacy` still describe the retired member profiles and
  must be rewritten; the footer hides them while `legal.status` is a draft.
- Retired routes 301 in `src/lib/search-aliases.ts`: `/community`,
  `/aperture*`, `/me`, `/u/*`, `/campus-leader` and the old event microsites
  go to `/events`; `/redeem`, `/sign-in`, `/sign-up` go to `/`. Do not
  rebuild them.
- The site persists nothing: no database, no auth, no payments, no
  analytics. Keep it that way unless the owner decides otherwise.

## Stack

- React 19 and strict TypeScript, TanStack Start and TanStack Router on
  Vite, Tailwind CSS v4 with shadcn/Base UI primitives, Vitest and Testing
  Library, pnpm. The build needs no environment variables.

Performance invariants for public pages (guarded by
`src/lib/performance-guards.test.ts`):

- The root `beforeLoad` resolves the locale from the pathname with
  `createIsomorphicFn`, so client navigation never waits on a server
  function. No auth, database or payment client ships at all.
- No WebGL: live halftone is 2D canvas (`HalftoneCanvas`, `HalftoneLens`,
  `PrintCell`) that only draws on screen, while ink or the hero's story
  moves; marks and
  icons are inline SVG dots; photos are plain lazy `<img>`s. Only the Plus
  Jakarta Sans Latin font is preloaded.
- New ambassador marks go in `assets/logos` as single-colour SVGs and
  `pnpm halftone:logos` regenerates `src/lib/logo-dots.ts`; Cursor and
  Cognition are still missing there. New photos are resized to 1920px on
  the long edge (WebP, quality 80) and added to `src/content/event-photos.ts`.

## Repository map

- `src/routes` — file-based routes, metadata and JSON-LD per page
- `src/components/chrome` — header, footer, logo, theme, 404
- `src/components/home` — hero, ambassadors, offers, method, FAQ, booking
  tile, and `print-cell.tsx` (the pure-halftone cell)
- `src/components/marketing/service-page.tsx` — the one service template
- `src/components/events`, `src/components/campaign` — events index and the
  split hero used by `/agendar`
- `src/components/halftone` — `HalftoneCanvas`, `HalftoneLens`,
  `HalftoneIcon`, `HalftoneLogo` and the GSAP `Reveal`
- `src/components/ui` — shared shadcn/Base UI primitives; reuse before adding
- `src/content` — localized content, the contract, event photo lists and
  `booking.ts`
- `src/lib` — SEO helpers, search aliases, service page ids, logo dots
- `src/styles.css` — Tailwind theme, semantic tokens, dark theme, utilities
- `public/brand`, `public/carousel`, `public/events/community`,
  `assets/logos` — approved visual assets
- `docs` — the narrative map, the copy decks and the formats research

## UI implementation rules

- Halftone is the accent: the printed mark in the hero, the pure-halftone
  cells of the bento and the service openings, the lens over the few real
  photos, the icons and the ambassador marks. Photos stay real photographs;
  never pre-print a whole photo as dots. The hero mark is the one place with
  its own motion and has no resting dot grid.
- Shape rule: surfaces (cards, cells, photos, the booking tile) are rounded
  (`rounded-2xl`/`rounded-3xl`), inputs and menus small radii, buttons full
  pills. One button (`.btn`) and one text action (`.text-action`). Display
  type is Plus Jakarta Sans 600, tight; body and UI type is DM Sans, both local
  through Fontsource.
- Tokens live in `src/styles.css`: themed `paper`, `surface`, `ink`,
  `purple-ink`, `lilac`; fixed `purple` (#614afc), `on-purple`, `print`,
  `snow`, `night`. Purple is an accent, not a band behind every section.
  Use semantic classes and existing variables; no parallel palette.
- Preserve light, dark and system theme behavior.
- Use Hugeicons for interface icons; never emoji as icons.
- Keep responsive behavior deliberate: below `lg` the home hero stacks copy
  over the mark; from `lg` it is a split up to one viewport tall. Mobile
  text and zoom grow naturally.
- Keep effects restrained: transform and opacity for motion, nothing that
  competes with the copy.

## Accessibility

- Preserve semantic landmarks, heading order, labels, alt text and the
  skip-to-content path.
- Every interactive control works by keyboard with a visible focus state.
- Do not rely on color alone; check contrast in both themes.
- Every nonessential motion path honors `prefers-reduced-motion`.
- Server-rendered content is never hidden by default; reveals fail open.

## Motion direction

- Motion is editorial and driven by the visitor: the word-by-word hero
  entrance, pointer ink that trails and
  melts back, the photo lens on a spring, sections that rise in once
  (`Reveal`), icons and marks that ripple under the pointer. Only the hero mark
  moves on its own: its scattered dots settle into order once, with the
  headline, a light gives them volume, then a signal crosses its nodes every
  few seconds. Off screen it pauses; under reduced motion it stays still.
- GSAP and `@gsap/react` own coordinated entrances; CSS owns small state
  changes; halftone canvases run their own frame loops. Register
  ScrollTrigger inside hooks, not at import. Never let two engines drive the
  same transform. Clean up listeners, observers, timers and contexts.
- Project skills live in `.agents/skills`; the approved brand, copy and this
  stack take precedence over generic skill defaults.

## Engineering workflow

1. Inspect `git status` before editing and preserve unrelated work.
2. Read the content module, the deck and the component before changing
   copy, layout or tokens. Keep both languages and the decks in sync.
3. Prefer small changes to existing components over parallel abstractions.
4. Run checks proportional to the change and report anything not run.

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm test
pnpm copy:check
pnpm check
pnpm build
```

`pnpm lint` carries upstream warnings in `src/components/ui/*` that predate
this brief; do not let new files add to them.

## Open items for the owner

- If a business WhatsApp number exists, set `WHATSAPP_URL` in
  `src/content/booking.ts`.
- Add the Cursor and Cognition marks to `assets/logos` and run
  `pnpm halftone:logos`, then list them in `home.ambassadors.logos`.
- Rewrite `/terms` and `/privacy` for a site that stores nothing.
- Provide one real before-and-after for the automation page
  (`servicePages.automation.example`) and any photos worth adding.
