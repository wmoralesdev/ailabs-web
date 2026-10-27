# Ai Labs Web

This is the durable working brief for agents in this repository. Keep it short
and stable. Current implementation details belong in code, not in parallel
planning documents.

## Source of truth

- Product and brand invariants live in this file.
- Exact customer-facing copy lives in `src/content/en.ts` and
  `src/content/es.ts`; their shared contract lives in `src/content/types.ts`.
- Design tokens, theme mappings, and global utilities live in `src/styles.css`.
- Current layout and behavior live in `src/components` and `src/routes`.
- Database models live in `prisma/schema.prisma`. Generated Prisma files under
  `src/generated/prisma` must not be edited by hand.
- `audit.md` is a separate, developer-owned workstream. Do not treat it as the
  product specification or edit it unless the task explicitly targets it.

When this file and the implementation disagree, inspect the recent code and
git history before acting. Do not revive an old layout or copy direction only
because it appears in a historical plan. Update this file only when a durable
invariant changes. Do not add another root source-of-truth Markdown file.

## Product

Ai Labs offers AI consulting, business automation, and practical education for
teams and professionals, based in El Salvador. It helps commercial,
management, and operations teams improve real processes. Consulting starts by
understanding the current process and prioritizing one concrete opportunity,
then follows one of two delivery routes:

- **Academy** — practical education for professionals and teams. Individuals
  can come directly to learn; a company or prior consulting purchase is not required.
- **Agentic** — design and implement the workflow with the team, including
  integrations, human review, documentation, and transfer.

**Aperture** is the name of the Ai Labs community: community evidence, not a
third commercial offer. It has no pages of its own on this site; the member
directory, join flow, dashboard, and public profiles were retired. Keep the
offer practical and grounded in real work. Never sell AI as magic or imply
guaranteed access, credits, partnerships, or third-party outcomes.

Metrics, program names, partner relationships, credits, and credentials can
change. Verify them before adding or changing public claims; do not copy a
possibly stale value into this file.

## Brand and content

- The written name is **Ai Labs**. Use **Ai /abs** only as an intentional visual
  lockup, never as the default name in prose, metadata, or speech.
- Academy, Agentic, and Aperture remain brand names in English and Spanish.
  Lead with the customer outcome: understand and prioritize the process, then
  prepare the team or implement the workflow. Translate descriptions and
  surrounding copy.
- Do not associate the word "Labs" with experiments.
- Voice is clear, direct, concise, and understandable to business roles. Prefer concrete
  teaching, software, event, and community proof over AI-industry hype.
- Avoid inflated language such as "revolutionary," "unlock the future,"
  "empower," or unsupported "leading ecosystem" claims.
- Ai Labs speaks about itself in the first person plural ("somos", "hacemos",
  "we"), never as a third party ("Ai Labs hace…"). The brand name still opens
  entity statements ("Somos Ai Labs, una empresa…"). `public/llms.txt` is
  written for machines and stays in the third person.
- Spanish copy uses voseo throughout ("querés", "escribinos", "tocá").
- Long sections lose attention, so copy has length budgets: visible strings
  stay within their budget, and siblings shown side by side (cards, steps,
  FAQ answers) stay close in length. `pnpm copy:check`
  (`scripts/copy-length.ts`) enforces both and the first-person voice; run it
  after any copy change. Titles stay at 60 characters or fewer with the brand
  last; meta descriptions run 110 to 160.
- Keep English and Spanish content in parity. Add customer-facing strings to
  the typed content modules rather than scattering literals through
  components.
- Use real Ai Labs event and community imagery. Do not introduce generic robot,
  neon-brain, fake server-room, or generic AI-gradient imagery.
- Reuse approved assets in `public/brand`; do not redraw, stretch, or casually
  recolor logos.

## Current application

- Shared chrome is a flat, sticky header bar (`SiteHeader`): lockup at
  the left, then Services, grouped Community, theme, locale, and one
  "Let's talk" button. Event microsites and `/lab` print their own lockup and
  hide the header's. Do not embed theme/locale controls in page heroes. The
  footer is a night block revealed from under the page where it fits in the
  viewport, ending in the "get curious" line.
- Locale is not in the URL. Prefer the `ailabs-locale` cookie, then
  `Accept-Language`, then `es` when the header is missing or unrecognized.
  An explicit English preference still wins. Legacy `/en/*` and `/es/*` permanently
  redirect to the unprefixed path and set the cookie. Language toggle updates
  the cookie and reloads route context.
- The home page (`/`) follows Hero, Ambassador programs, Services, Method, FAQ,
  and Contact, followed by the shared footer. FAQ answers stay visible (never
  collapsed) and are the same text as the home `FAQPage` JSON-LD and the
  `llms.txt` FAQ. Services combines Academy and Agentic; community is
  accessible through chrome. The seven ambassador-program marks sit beneath the
  hero in a quiet row, printed as halftone dots. Describe that
  relationship, not a customer list or a guarantee from those companies. Do not
  restore photo bands or metrics from unused legacy content.
- The home hero is typographic beside the Ai Labs mark printed as a live
  halftone (`HalftoneCanvas` reading `public/brand/ailabs-iso-dark.svg`). The
  whole hero is the pointer surface: the cursor drags purple ink through the
  dot screen and it melts into the mark. No photo, no waves, no idle loop.
  `/events` reuses this hero.
- Services is a bento: per route a text card, two real event photos with the
  halftone lens, and one pure-halftone cell inked by the pointer.
- `/consultoria-de-ia-el-salvador` is the indexable consulting page. Spanish
  and English share that URL. Consulting aliases 301 to it. `/ia-el-salvador`,
  `/inteligencia-artificial-el-salvador`, and `/ai-el-salvador` still 301 to `/`.
- Two delivery pages share `src/components/marketing/service-page.tsx` and
  copy in `src/content/service-pages-{es,en}.ts`:
  `/capacitacion-ia-el-salvador` (Academy) and `/automatizacion-ia-el-salvador`
  (Agentic). Slugs are the Spanish search term; language stays in the cookie.
  Each opens with a self-contained definition sentence that is repeated as its
  first FAQ answer, keeps its FAQ visible and mirrored in `FAQPage` JSON-LD,
  and links to the other page and the consulting page. The footer Services
  column and the home Services cards link to them. Do not add per-country
  variants or a standalone Aperture marketing page.
- `/redeem` is an authenticated credit-redemption flow backed by Clerk,
  TanStack server functions, Prisma, and PostgreSQL/Neon.
- `/aperture`, `/aperture/join`, `/me`, and `/u/*` 301 to `/community`
  (`src/lib/search-aliases.ts`). Do not rebuild them without the owner.
- `/community` is a minimal WhatsApp invite landing (no auth). Like redeem
  and campus-leader, its hero is the shared campaign split hero
  (`src/components/campaign/campaign-hero.tsx`): copy at the left, a real
  event photo with the halftone lens at the right. Community appears in chrome nav
  and the footer.
- `/campus-leader` is a public Campus Leader application flow (no auth).
  Submissions persist via a TanStack server function and Prisma. Cohort
  open/close is controlled by `campusLeader.applicationsOpen` in content.
  Footer links to it; accepted-leader directory is not shipped yet. Export
  applications with `pnpm campus-leader:export` for Notion review.
- `/events` is the index of Ai Labs events in El Salvador. It is a normal
  indexable page (sitemap, 200). Country-shaped search aliases 301 here.
  The index reuses the home hero. Workshop aliases stay on their own event pages.
- `/events/$slug` hosts per-event microsites with their own layouts. Shipped
  events: `/events/modo-fundador` (founders, USD 50, Wompi) and
  `/events/get-competitive-quick` (students / remote seekers, USD 25, Wompi;
  date/venue TBD mid-August).
- Contact is a shared dialog opened directly by chrome and service CTAs, with
  the intended interest preselected. A successful response means the inquiry
  was persisted in PostgreSQL/Neon. The owner reads inquiries directly from the
  database; email delivery is deliberately out of scope. Never reintroduce
  simulated success or promise a response time that has not been agreed.

## Stack

- React 19 and strict TypeScript
- TanStack Start and TanStack Router on Vite
- Tailwind CSS v4 with shadcn/Base UI primitives
- Clerk authentication
- Prisma with PostgreSQL/Neon
- Vitest and Testing Library
- pnpm

Performance invariants for public pages (guarded by
`src/lib/performance-guards.test.ts`):

- The root `beforeLoad` resolves the locale with `createIsomorphicFn`, so
  client navigation never waits on a server function.
- Clerk runs only where `src/lib/clerk-scope.ts` says: server functions and
  the auth routes. Those routes wrap their component in `ClerkAuth` and use
  `ensureClerkDocument` in `beforeLoad`. Keep Clerk, toasts, and event page
  components out of the root, chrome, and route loaders: those ship in the
  entry bundle. Loaders import heavy modules dynamically.
- API route files import `.server` modules inside their handlers.
- No WebGL: live halftone is 2D canvas (`HalftoneCanvas`, `HalftoneLens`)
  that only draws while ink moves and on screen; icons and logos are inline
  SVG dots; photos are plain lazy `<img>`s. Carousel
  slides past the first load lazily. Only the Alan Sans Latin font is
  preloaded; preloading DM Sans measured slower. TextSpiral (`/lab` only)
  builds its rings on idle, after hydration.
- Resize new carousel photos to 1920px on the long edge (WebP, quality 80)
  and add their size to `src/content/event-photos.ts`. New ambassador marks go in `assets/logos`
  as single-colour SVGs; `pnpm halftone:logos` regenerates
  `src/lib/logo-dots.ts`.

The linked `ailabs-cli` package at `../ailabs-cli` powers the seed and image
scripts. Do not recreate deleted one-off scripts in this repo.

## Repository map

- `src/routes` — file-based routes, metadata, and route-level loading
- `src/components/chrome` — shared shell, header, footer, logo, and theme UI
- `src/components/home` — homepage sections and home-specific interactions
- `src/components/halftone` — the halftone primitives: `HalftoneCanvas` (live
  print with pointer ink), `HalftoneLens` (photo with a pointer lens),
  `HalftoneIcon` (shapes in `src/lib/halftone-shapes.ts`), `HalftoneLogo`, and
  the GSAP `Reveal`
- `src/components/ui` — shared shadcn/Base UI primitives; reuse before adding a
  local replacement
- `src/content` — localized content and its TypeScript contract
- `src/server` — server functions and protected business operations
- `src/lib` — shared utilities and domain helpers
- `src/styles.css` — Tailwind theme, semantic tokens, dark theme, and global
  utilities
- `prisma` — schema and migrations
- `public/brand`, `public/carousel`, `public/community-avatars` — approved
  visual assets; `assets/logos` holds the single-colour ambassador marks

## UI implementation rules

- Halftone is an accent, inspired by wmorales.dev but not a copy of it. Use
  it where it can move with the visitor: the printed mark, pure-halftone
  cells, the lens over photos, icons and ambassador marks. Photos stay real
  photographs; never pre-print a whole photo as dots. No waves or idle loops.
- Shape rule: surfaces (cards, photos, bento cells, the contact card) are
  rounded (`rounded-2xl`/`rounded-3xl`), inputs and menus small radii, buttons
  full pills. One button (`.btn`: indigo, snow ink, turns to ink on hover)
  and one text action (`.text-action`). Display type is Alan Sans 600, tight.
- Tokens live in `src/styles.css`: themed `paper`, `surface`, `ink`,
  `purple-ink`, `lilac`; fixed `purple` (indigo #614afc, shared with wmorales.dev), `on-purple`
  (snow), `print` (lilac paper under the photo lens),
  `snow`, `night`. Purple is an accent, not a band behind every section.
- Preserve the established light, dark, and system theme behavior.
- Use semantic classes and existing CSS variables. Do not create a parallel
  palette or hard-code brand colors inside components.
- Display type is Alan Sans; body and UI type is DM Sans. Both are loaded
  locally through Fontsource.
- Reuse `src/components/ui` and the shared home/chrome utilities. Use
  Hugeicons for interface icons; do not use emoji as UI icons.
- Keep responsive behavior deliberate. Below `lg` the home hero stacks copy
  over the mark with natural height; from `lg` it is a split up to one
  viewport tall. Let
  mobile text and zoom grow naturally.
- Keep effects restrained and performant. Prefer transform and opacity for
  motion, and do not add decorative animation that competes with content.

## Accessibility

- Preserve semantic landmarks, heading order, labels, alt text, and the
  skip-to-content path.
- All interactive controls must work by keyboard and have visible focus states.
- Do not rely on color alone for status or validation.
- Check contrast in both themes, especially purple controls and logo surfaces.
- Every nonessential motion path must honor `prefers-reduced-motion`.
- Avoid hiding server-rendered content by default; reveal behavior must fail
  open if JavaScript or observers do not run.

## Design skills and motion direction

- Project skills and their references live in `.agents/skills`; provenance is
  recorded in `skills-lock.json` and each skill's `ORIGIN.json`. Read the skill
  needed for the current stage, rather than combining every stylistic default.
- Taste and frontend-design guide composition; UI/UX Pro Max checks interaction,
  responsive layout and accessibility; Emil guides motion craft and review;
  GreenSock guides GSAP implementation and cleanup.
- The approved brand, copy and this repository's stack take precedence over
  generic skill defaults about fonts, palettes, generated imagery, headline
  line limits, Motion, Next.js or critique quotas. Review demonstrated problems
  judiciously and also acknowledge what works.
- Motion is editorial, fluid and driven by the visitor: a coordinated
  word-by-word hero entrance (700ms, up to 28px), the mark's dots growing in
  once, pointer ink that trails and melts back, the photo lens on a spring,
  sections that rise in once (`Reveal`: 24px, staggered), and icons and logos
  that ripple under the pointer. Nothing loops on its own. Use `src/lib/home-motion.ts` for the hero entrance and
  `src/styles.css` for surface/state tokens.
- GSAP and `@gsap/react` own coordinated entrances and scroll links; CSS owns
  small state changes; halftone canvases and SVGs run their own frame loops.
  Register ScrollTrigger inside hooks, not at import. Do not let two engines
  control the same transform.
- Keep native scrolling, immediate access to copy/CTAs, reduced-motion support,
  and cleanup of listeners, observers, timers and animation contexts. Test at
  normal speed as well as with captures; passing a build is not visual approval.

## Database migrations

- This repository owns every migration for the shared Neon database, including
  the credit tables `ailabs-cli` reads. `ailabs-cli` never runs `migrate dev`;
  it refreshes its own schema with `prisma db pull`.
- `prisma/migrations/20260923000000_baseline` records every table that existed
  before migrations moved here. Production marks it applied with
  `prisma migrate resolve --applied`; its older `ailabs-cli` rows in
  `_prisma_migrations` are harmless and stay.
- Create migrations with `pnpm db:migrate:dev --name <change>` against a
  disposable database and `SHADOW_DATABASE_URL`. Never hand-write migration
  SQL, never `db push`, and never `migrate reset` a shared database.
- Production migrations are additive and run by the owner with
  `pnpm db:migrate:deploy` using `DIRECT_URL`, before the code that needs them
  lands. The Vercel build does not migrate. `pnpm db:drift` must exit 0 after.
- `pnpm dev:seed` fills a disposable `lane_*` or `dev*` database with synthetic
  events, codes, and members. It refuses any other database name.
- Aperture member numbers are allocated as `MAX + 1` under a transaction
  advisory lock, so never delete a `Member` row or insert one by hand: either
  reuses or gaps a number. Team numbers 0 to 4 come only from
  `pnpm aperture:reserve`. Clerk `user.updated` and `user.deleted` events at
  `/api/webhooks/clerk` refresh emails and avatars for existing members and
  retire deleted users; a number is never reused. There is no join flow on
  the site any more; the member tables stay as they are.

## Contact operations

- Inquiries live in `ContactInquiry` in the existing PostgreSQL/Neon database.
  Read them through the database console or `pnpm db:studio`; there is no
  separate inbox, notification queue, mail provider or Convex deployment.
- Keep validation, origin protection, the submission UUID and transactional
  admission limits. An unsuccessful save preserves the visitor's draft.
- Launch acceptance requires a real stored inquiry and a successful browser
  receipt. Use clearly marked synthetic details for verification.

## Engineering workflow

1. Inspect `git status` before editing and preserve unrelated or concurrent
   work.
2. Read the implementation source named above before changing copy, layout,
   tokens, authentication, or redemption behavior.
3. Keep localized types and both language modules synchronized.
4. Prefer small changes to existing components over parallel abstractions.
5. Run checks proportional to the change and report anything not run.

Common commands:

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm test
pnpm check
pnpm build
```

`pnpm build` runs `prisma generate` before the Vite production build. Database
and Clerk-backed behavior may additionally require the relevant environment
variables.
