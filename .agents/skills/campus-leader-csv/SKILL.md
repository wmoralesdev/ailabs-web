---
name: campus-leader-csv
description: Export Ai Labs Campus Leader applications from Prisma to a CSV (Notion import) and a Markdown review doc, then import or update the Notion Campus Leaders roster. Use when exporting applications, syncing cohort applicants to Notion, or reviewing Campus Leader submissions.
---

# Campus Leader export

No admin panel. Applications live in Postgres (`CampusLeaderApplication`). Review happens in Notion **Ai Labs — Campus Leaders**.

One run produces **two** artifacts: a CSV for the Notion import and a Markdown doc for reading applications.

> Naming note: this skill directory is still `campus-leader-csv`, which now
> undersells it. Suggested rename: `campus-leader-export`. Not renamed here to
> avoid breaking existing references — do it deliberately.

## Prerequisites

- `DATABASE_URL` set (same as the web app / Neon)
- Dependencies installed (`pnpm install` in `ailabs-web-vega`)

## Export

From the web repo root, current cohort:

```bash
pnpm campus-leader:export --cohort=aster
```

Without `--cohort`, every cohort is exported (there is no default cohort in the script):

```bash
pnpm campus-leader:export
```

## Output

Both files land in `tmp/` (git-ignored) and share a basename, so a run's two artifacts are obviously paired:

```
tmp/campus-leader-<cohort|all>-<timestamp>.csv
tmp/campus-leader-<cohort|all>-<timestamp>.md
```

Example: `tmp/campus-leader-aster-2026-07-27T05-36-38.977Z.csv` and `.md`.

### CSV — the Notion import path

Columns match Notion import: `cohort, status, name, email, whatsapp, campus, career, year, bio, reach, aiToday, whyLeader, quietRoom, inviteMessage, roomPlan, sessionPrefs, notes, credits_status, site_listed` (plus `id`, `createdAt` for ops).

Raw stored values, not display labels: `career` and `year` stay slugs, `whatsapp` keeps its `+503` prefix, `sessionPrefs` is pipe-joined.

`status` defaults to `Applied`. `credits_status` defaults to `Pending`. `site_listed` defaults to `false`. Update those in Notion after review.

Do not reshape the CSV casually — Notion import depends on this column set and order.

### Markdown — the review doc

Built for reading, not parsing:

- Run header with cohort, generated timestamp, and application count.
- An **At a glance** table (name, campus, career, year, submitted) for skimming a batch.
- One section per applicant: a compact summary table (email, WhatsApp, campus, career, year, session preferences, submitted, id) followed by each long-form answer as a labeled blockquote.

Display labels are resolved from the option lists in `src/content/en.ts` — `career`, `year`, and `sessionPrefs` slugs render as readable text. Unknown values pass through as stored, so rows written before those fields became slugs still export.

## Notion workflow

1. Run the export.
2. Read the Markdown to review; use the CSV to import.
3. Open [Ai Labs — Campus Leaders](https://app.notion.com/p/27746ba5e4b24b38a60d80f17f9707c7).
4. Import new rows or paste fields into existing ones.
5. Review with the program brief on [Campus Leader](https://app.notion.com/p/3aa3c66f698981e88722f83072cfec9e).
6. Enforce uniqueness: **one Accepted leader per campus × career**.
7. On accept: set Status `Accepted`, grant credits (internal), set Credits status `Granted`, draft site bio, then Site listed when published.

## Selection reminder

Prefer clear ops and voice over follower count. Weak reach alone is not a no. Strong reach alone is not a yes. Any carrera — not a technical seat.

## Program sources

- Programs DB: [Ai Labs — Programs](https://app.notion.com/p/7ef5a11db93a49c9b5dc540c5c284f91)
- Apply route: `/$locale/campus-leader`
- Toggle cohort: `applicationsOpen`, `cohort` (slug, currently `aster`), and `cohortDisplay` (`Aster`) in `src/content/en.ts` and `es.ts`. Future cohorts use English flower names.
