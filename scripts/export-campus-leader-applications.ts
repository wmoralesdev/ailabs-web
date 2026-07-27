import "dotenv/config"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "../src/generated/prisma/client"

/** Shape the export reads. Mirrors `CampusLeaderApplication` in the schema. */
type ApplicationRow = {
  id: string
  cohort: string
  name: string
  email: string
  whatsapp: string
  campus: string
  career: string
  year: string
  bio: string
  reach: string
  aiToday: string
  whyLeader: string
  quietRoom: string
  inviteMessage: string
  roomPlan: string
  sessionPrefs: ReadonlyArray<string>
  notes: string | null
  createdAt: Date
}

const CSV_HEADER = [
  "id",
  "cohort",
  "status",
  "name",
  "email",
  "whatsapp",
  "campus",
  "career",
  "year",
  "bio",
  "reach",
  "aiToday",
  "whyLeader",
  "quietRoom",
  "inviteMessage",
  "roomPlan",
  "sessionPrefs",
  "notes",
  "credits_status",
  "site_listed",
  "createdAt",
]

/**
 * Slug → label maps mirror the option lists in `src/content/en.ts`. Unknown
 * values fall through to the stored string so rows written before a field
 * became a slug still export.
 */
const YEAR_LABELS: Record<string, string> = {
  "1": "1st year",
  "2": "2nd year",
  "3": "3rd year",
  "4": "4th year",
  "5+": "5th year or beyond",
  grad: "Recent grad",
}

const CAREER_LABELS: Record<string, string> = {
  sistemas: "Engineering / Computing",
  diseno: "Design",
  marketing: "Communications / Marketing",
  negocios: "Economics / Business / Admin",
  sociales: "Social sciences / Law",
  otra: "Other",
}

const SESSION_PREF_LABELS: Record<string, string> = {
  "cursor-labs": "Cursor Labs",
  codex: "Codex workshops",
  elevencreative: "ElevenCreative",
  surprise: "Surprise us",
}

/** Long-form answers, in form order, with labels a reviewer can scan. */
const LONG_FORM_FIELDS: ReadonlyArray<{
  key: keyof Pick<
    ApplicationRow,
    | "bio"
    | "reach"
    | "aiToday"
    | "whyLeader"
    | "quietRoom"
    | "inviteMessage"
    | "roomPlan"
  >
  label: string
}> = [
  { key: "bio", label: "Short bio" },
  { key: "reach", label: "Reach on campus" },
  { key: "aiToday", label: "AI level today, and what they want for campus" },
  { key: "whyLeader", label: "Why Campus Leader" },
  { key: "quietRoom", label: "Half the room is on their phones" },
  { key: "inviteMessage", label: "Invite message they would send" },
  { key: "roomPlan", label: "Room and 20 people plan" },
]

const EMPTY = "—"

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`
  }
  return value
}

function toCsvRow(values: ReadonlyArray<string>): string {
  return values.map(csvEscape).join(",")
}

function labelFor(map: Record<string, string>, value: string): string {
  const trimmed = value.trim()
  if (!trimmed) {
    return EMPTY
  }
  return map[trimmed] ?? trimmed
}

/**
 * Current submissions store `+503` plus 8 local digits. Older rows were free
 * text, so anything unrecognized is passed through untouched.
 */
function formatWhatsapp(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) {
    return EMPTY
  }
  const digits = trimmed.replace(/\D/g, "")
  if (digits.length === 8) {
    return `+503 ${digits.slice(0, 4)} ${digits.slice(4)}`
  }
  if (digits.length === 11 && digits.startsWith("503")) {
    return `+503 ${digits.slice(3, 7)} ${digits.slice(7)}`
  }
  return trimmed
}

function formatSessionPrefs(values: ReadonlyArray<string>): string {
  if (values.length === 0) {
    return EMPTY
  }
  return values.map((value) => labelFor(SESSION_PREF_LABELS, value)).join(", ")
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function formatDateTime(date: Date): string {
  const iso = date.toISOString()
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`
}

/** Applicant text inside a table cell: one line, pipes neutralized. */
function mdCell(value: string): string {
  const flattened = value.replace(/\s+/g, " ").trim()
  if (!flattened) {
    return EMPTY
  }
  return flattened.replaceAll("\\", "\\\\").replaceAll("|", "\\|")
}

/**
 * Applicant prose as a blockquote so their formatting cannot break sections.
 * A leading `#` is escaped so a typed heading stays out of the document
 * outline; it still renders as a plain `#`.
 */
function mdQuote(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) {
    return `> ${EMPTY}`
  }
  return trimmed
    .split(/\r?\n/)
    .map((line) => {
      const text = line.trim()
      if (!text) {
        return ">"
      }
      return `> ${text.startsWith("#") ? `\\${text}` : text}`
    })
    .join("\n")
}

function buildCsv(rows: ReadonlyArray<ApplicationRow>): string {
  const lines = [
    toCsvRow(CSV_HEADER),
    ...rows.map((row) =>
      toCsvRow([
        row.id,
        row.cohort,
        "Applied",
        row.name,
        row.email,
        row.whatsapp,
        row.campus,
        row.career,
        row.year,
        row.bio,
        row.reach,
        row.aiToday,
        row.whyLeader,
        row.quietRoom,
        row.inviteMessage,
        row.roomPlan,
        row.sessionPrefs.join("|"),
        row.notes ?? "",
        "Pending",
        "false",
        row.createdAt.toISOString(),
      ])
    ),
  ]
  return `${lines.join("\n")}\n`
}

function buildMarkdown(
  rows: ReadonlyArray<ApplicationRow>,
  options: { cohort?: string; generatedAt: Date }
): string {
  const { cohort, generatedAt } = options
  const scope = cohort ?? "all cohorts"
  const sections: string[] = [
    [
      `# Campus Leader applications — ${scope}`,
      "",
      `- **Cohort:** ${cohort ? `\`${cohort}\`` : "all cohorts"}`,
      `- **Generated:** ${formatDateTime(generatedAt)}`,
      `- **Applications:** ${rows.length}`,
    ].join("\n"),
  ]

  if (rows.length === 0) {
    sections.push("No applications matched this export.")
    return `${sections.join("\n\n")}\n`
  }

  // Cohort only earns a column when the run is not already scoped to one.
  const indexColumns = cohort
    ? ["#", "Name", "Campus", "Career", "Year", "Submitted"]
    : ["#", "Name", "Cohort", "Campus", "Career", "Year", "Submitted"]

  const indexRows = rows.map((row, index) => {
    const cells = [
      String(index + 1),
      mdCell(row.name),
      ...(cohort ? [] : [mdCell(row.cohort)]),
      mdCell(row.campus),
      mdCell(labelFor(CAREER_LABELS, row.career)),
      mdCell(labelFor(YEAR_LABELS, row.year)),
      formatDate(row.createdAt),
    ]
    return `| ${cells.join(" | ")} |`
  })

  sections.push(
    [
      "## At a glance",
      "",
      `| ${indexColumns.join(" | ")} |`,
      `| ${indexColumns.map(() => "---").join(" | ")} |`,
      ...indexRows,
    ].join("\n")
  )

  rows.forEach((row, index) => {
    const summary: ReadonlyArray<[string, string]> = [
      ["Email", mdCell(row.email)],
      ["WhatsApp", mdCell(formatWhatsapp(row.whatsapp))],
      ["Campus", mdCell(row.campus)],
      ["Career", mdCell(labelFor(CAREER_LABELS, row.career))],
      ["Year", mdCell(labelFor(YEAR_LABELS, row.year))],
      ["Sessions", mdCell(formatSessionPrefs(row.sessionPrefs))],
      ["Submitted", formatDateTime(row.createdAt)],
      ...(cohort
        ? []
        : ([["Cohort", mdCell(row.cohort)]] as ReadonlyArray<
            [string, string]
          >)),
      ["ID", `\`${row.id}\``],
    ]

    const body = [
      "---",
      "",
      `## ${index + 1}. ${mdCell(row.name)}`,
      "",
      "| Field | Value |",
      "| --- | --- |",
      ...summary.map(([label, value]) => `| ${label} | ${value} |`),
    ]

    for (const field of LONG_FORM_FIELDS) {
      body.push("", `**${field.label}**`, "", mdQuote(row[field.key]))
    }

    body.push("", "**Notes**", "", mdQuote(row.notes ?? ""))

    sections.push(body.join("\n"))
  })

  return `${sections.join("\n\n")}\n`
}

async function main() {
  const cohortFilter = process.argv
    .find((arg) => arg.startsWith("--cohort="))
    ?.slice("--cohort=".length)

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set")
  }

  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
  })

  try {
    const rows = await prisma.campusLeaderApplication.findMany({
      where: cohortFilter ? { cohort: cohortFilter } : undefined,
      orderBy: { createdAt: "asc" },
    })

    const outDir = path.join(process.cwd(), "tmp")
    await mkdir(outDir, { recursive: true })

    const generatedAt = new Date()
    const stamp = generatedAt.toISOString().replaceAll(":", "-")
    const basename = cohortFilter
      ? `campus-leader-${cohortFilter}-${stamp}`
      : `campus-leader-all-${stamp}`

    const csvPath = path.join(outDir, `${basename}.csv`)
    const markdownPath = path.join(outDir, `${basename}.md`)

    await writeFile(csvPath, buildCsv(rows), "utf8")
    await writeFile(
      markdownPath,
      buildMarkdown(rows, { cohort: cohortFilter, generatedAt }),
      "utf8"
    )

    console.log(`Wrote ${rows.length} row(s) to:`)
    console.log(`  ${csvPath}`)
    console.log(`  ${markdownPath}`)
  } finally {
    await prisma.$disconnect()
  }
}

const entrypoint = process.argv[1]
if (entrypoint && import.meta.url === pathToFileURL(entrypoint).href) {
  main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}

export { buildCsv, buildMarkdown }
export type { ApplicationRow }
