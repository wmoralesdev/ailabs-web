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

**Aperture** is community evidence, not a third commercial offer. It connects
people, companies, events, and relevant opportunities and keeps Ai Labs close
to people building with these tools. Keep the offer practical and grounded in
real work. Never sell AI as magic or imply guaranteed access, credits,
partnerships, or third-party outcomes.

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
- Keep English and Spanish content in parity. Add customer-facing strings to
  the typed content modules rather than scattering literals through
  components.
- Use real Ai Labs event and community imagery. Do not introduce generic robot,
  neon-brain, fake server-room, or generic AI-gradient imagery.
- Reuse approved assets in `public/brand`; do not redraw, stretch, or casually
  recolor logos.

## Current application

- Shared chrome is a fixed, centered floating nav bar (`SiteHeader`): rounded
  corners (not pill), nav links plus theme and locale. Brand lockup stays
  page-owned on full-bleed routes (home, redeem, community, campus-leader,
  lab, event microsites); other routes get a top-left lockup sibling. Do not
  embed theme/locale controls in page heroes.
- Locale is not in the URL. Prefer the `ailabs-locale` cookie, then
  `Accept-Language`, then `en`. Legacy `/en/*` and `/es/*` permanently
  redirect to the unprefixed path and set the cookie. Language toggle updates
  the cookie and reloads route context.
- The home page (`/`) follows Hero, Ambassador marquee, Services, Method, and Contact, followed by
  the shared footer. Services combines Academy and Agentic; community is
  accessible through chrome. The seven existing ambassador-program logos return
  beneath the hero at the owner's request. Describe that relationship, not a
  customer list or a guarantee from those companies. Do not restore photo bands or metrics
  from unused legacy content. The navbar is Services, grouped Community, and
  Let's talk; mobile navigation is used below 1024px.
  From 1024px, the home hero is a 50/50 split: left copy and a right text
  spiral sourced from `hero.spiralWords` (`TextSpiral`). Below 1024px, the
  home has a compact typographic hero with natural height, balanced headline,
  primary button and secondary text link with an arrow, followed by the logos.
  The spiral is unmounted on mobile, not replaced with another decoration.
  `/lab` and campaign heroes keep their existing spiral layouts.
- Academy / Agentic / Aperture standalone marketing routes are not shipped
  pages.
- `/redeem` is an authenticated credit-redemption flow backed by Clerk,
  TanStack server functions, Prisma, and PostgreSQL/Neon.
- `/aperture/join` is the authenticated Aperture claim flow. Join stays
  closed in production unless `APERTURE_JOIN=open` and the legal text is
  published. `APERTURE_JOIN=preview` opens the form only outside
  production. A successful claim allocates a permanent member number.
- `/me` is the private member dashboard: events linked to verified emails,
  credit codes and expiry, and profile settings. It stays noindex.
- `/u/$username` is the public builder profile. `/aperture` lists members.
  Public events appear only when the member turns `showEvents` on.
- `/community` is a minimal WhatsApp invite landing (no auth). Like redeem
  and campus-leader, its hero is the shared campaign split hero
  (`src/components/campaign/campaign-hero.tsx`): light copy column on the
  left, ink text-spiral panel on the right. Community appears in chrome nav
  and the footer.
- `/campus-leader` is a public Campus Leader application flow (no auth).
  Submissions persist via a TanStack server function and Prisma. Cohort
  open/close is controlled by `campusLeader.applicationsOpen` in content.
  Footer links to it; accepted-leader directory is not shipped yet. Export
  applications with `pnpm campus-leader:export` for Notion review.
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

The linked `ailabs-cli` package at `../ailabs-cli` powers the seed and image
scripts. Do not recreate deleted one-off scripts in this repo.

## Repository map

- `src/routes` — file-based routes, metadata, and route-level loading
- `src/components/chrome` — shared shell, header, footer, logo, and theme UI
- `src/components/home` — homepage sections and home-specific interactions
- `src/components/ui` — shared shadcn/Base UI primitives; reuse before adding a
  local replacement
- `src/content` — localized content and its TypeScript contract
- `src/server` — server functions and protected business operations
- `src/lib` — shared utilities and domain helpers
- `src/styles.css` — Tailwind theme, semantic tokens, dark theme, and global
  utilities
- `prisma` — schema and migrations
- `public/brand`, `public/carousel`, `public/community-avatars` — approved
  visual assets

## UI implementation rules

- Treat the current components as the geometry reference. The home uses large
  rounded surfaces, pill-shaped marketing controls, real-event media, stipple
  texture, and distinct desktop/mobile hero compositions.
- Preserve the established light, dark, and system theme behavior.
- Use semantic classes and existing CSS variables. Do not create a parallel
  palette or hard-code brand colors inside components.
- Display type is Alan Sans; body and UI type is DM Sans. Both are loaded
  locally through Fontsource.
- Reuse `src/components/ui` and the shared home/chrome utilities. Use
  Hugeicons for interface icons; do not use emoji as UI icons.
- Keep responsive behavior deliberate. The home hero is typographic below
  `lg` and becomes a true 50/50 split with TextSpiral from `lg` up. Let mobile
  text and zoom grow naturally; do not restore a viewport-height minimum.
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
- Motion is editorial, fluid and perceptible: a coordinated word-by-word
  hero entrance (700ms, up to 28px), service entrances (600ms,
  up to 24px), and short diagrams that assemble as they enter their own viewport.
  Method icons enter once while its text and the footer remain still. Use
  `src/lib/home-motion.ts` for entrance timings and
  `src/styles.css` for surface/state tokens.
- GSAP and `@gsap/react` own coordinated entrances; CSS owns small state changes.
  TextSpiral keeps its own engine and pauses outside the viewport or in hidden
  tabs. Do not let two engines control the same transform.
- The ambassador marquee moves linearly at 42px/s. Provide a pause control,
  pause outside the viewport and in hidden tabs, and show a static accessible
  list with reduced motion or without JavaScript. Keep decorative copies out
  of the accessibility tree.
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
  retire deleted users; a number is never reused. Join at `/aperture/join`
  is gated by `APERTURE_JOIN` and required Terms, Privacy, and 18+ consent.

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
