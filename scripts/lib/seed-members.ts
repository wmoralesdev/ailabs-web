import type { MemberRole, UpFor } from "../../src/generated/prisma/enums"
import type { CountryCode } from "../../src/lib/aperture/countries"
import type { BuiltWithPart } from "../../src/lib/aperture/project-input"
import type { ProfileDraft } from "../../src/lib/aperture/profile-input"

export type SeedProject = {
  title: string
  summary: string
  url: string | null
  repoUrl: string | null
  builtWith: BuiltWithPart[]
}

export type SeedMember = {
  profile: ProfileDraft
  avatarUrl: string | null
  projects: ReadonlyArray<SeedProject>
  /** Slugs of seed events this member attended. */
  events: ReadonlyArray<string>
}

type Portrait = { set: "men" | "women"; id: number }

/** Stock placeholder portraits; dev databases only. */
function portrait({ set, id }: Portrait): string {
  return `https://randomuser.me/api/portraits/${set}/${id}.jpg`
}

type PersonaInput = {
  username: string
  displayName: string
  headline: string
  bio?: string
  countryCode: CountryCode
  city?: string
  role: MemberRole
  upFor?: UpFor[]
  photo: Portrait | null
  links?: Partial<
    Pick<
      ProfileDraft,
      "linkedinUrl" | "xUrl" | "githubUrl" | "websiteUrl" | "instagramUrl"
    >
  >
  projects?: SeedProject[]
  events?: string[]
}

function persona(input: PersonaInput): SeedMember {
  const events = input.events ?? []
  return {
    profile: {
      username: input.username,
      displayName: input.displayName,
      headline: input.headline,
      bio: input.bio ?? null,
      countryCode: input.countryCode,
      city: input.city ?? null,
      role: input.role,
      upFor: input.upFor ?? [],
      showEvents: events.length > 0,
      linkedinUrl: input.links?.linkedinUrl ?? null,
      xUrl: input.links?.xUrl ?? null,
      githubUrl: input.links?.githubUrl ?? null,
      websiteUrl: input.links?.websiteUrl ?? null,
      instagramUrl: input.links?.instagramUrl ?? null,
    },
    avatarUrl: input.photo ? portrait(input.photo) : null,
    projects: input.projects ?? [],
    events,
  }
}

/** Hand-written profiles that cover the long, short, and empty layout cases. */
const PERSONAS: ReadonlyArray<SeedMember> = [
  persona({
    username: "daniela_rivas",
    displayName: "Daniela Rivas",
    headline:
      "Founder, Cobra Logística. Automating dispatch for a 40-truck fleet",
    bio: "I run a regional freight company and spend most of my week on dispatch, quotes, and customer updates. Since joining Aperture I have moved route planning and delivery notices to agents with a human check before anything reaches a client. Happy to share what broke along the way.",
    countryCode: "SV",
    city: "San Salvador",
    role: "FOUNDER",
    upFor: ["COFOUNDING", "HIRING", "MENTORING"],
    photo: { set: "women", id: 44 },
    links: {
      linkedinUrl: "https://www.linkedin.com/in/daniela-rivas-seed",
      xUrl: "https://x.com/daniela_seed",
      websiteUrl: "https://cobra-logistica.example.com",
    },
    projects: [
      {
        title: "Dispatch copilot",
        summary:
          "Reads the morning order sheet, proposes truck assignments by zone and capacity, and posts the plan to the drivers' WhatsApp group once a dispatcher approves it. Cut planning from ninety minutes to about twenty.",
        url: "https://cobra-logistica.example.com/dispatch",
        repoUrl: null,
        builtWith: [
          { name: "Cursor", percent: 55 },
          { name: "Claude", percent: 30 },
          { name: "n8n", percent: 15 },
        ],
      },
      {
        title: "Delivery notice bot",
        summary:
          "Sends customers a delivery window and a photo proof when the driver closes the stop.",
        url: null,
        repoUrl: "https://github.com/daniela-seed/delivery-notices",
        builtWith: [
          { name: "Codex", percent: 70 },
          { name: "Twilio", percent: 30 },
        ],
      },
      {
        title: "Quote drafts",
        summary:
          "Turns a call summary into a priced freight quote that the account lead edits before sending.",
        url: "https://cobra-logistica.example.com/quotes",
        repoUrl: "https://github.com/daniela-seed/quote-drafts",
        builtWith: [{ name: "Claude", percent: 100 }],
      },
      {
        title: "Fuel log cleanup",
        summary:
          "A weekly job that reconciles fuel card exports with trip logs and flags gaps for review.",
        url: null,
        repoUrl: null,
        builtWith: [
          { name: "Cursor", percent: 40 },
          { name: "ChatGPT", percent: 25 },
          { name: "Google Sheets", percent: 20 },
          { name: "Python", percent: 10 },
          { name: "Make", percent: 5 },
        ],
      },
    ],
    events: [
      "lane-event",
      "lane-agents-workshop",
      "lane-demo-day",
      "lane-ops-clinic",
      "lane-founders-dinner",
    ],
  }),
  persona({
    username: "mafe_castellanos",
    displayName: "María Fernanda Castellanos de la Peña",
    headline:
      "Product designer turning messy back-office workflows into tools people enjoy",
    bio: "Ten years designing internal software for banks and retailers across Central America. Lately I prototype in code with agents and test with the operations team the same afternoon. I care about review steps, empty states, and the copy that prevents mistakes.",
    countryCode: "GT",
    city: "Ciudad de Guatemala",
    role: "DESIGNER",
    upFor: ["FREELANCE", "COLLABORATING"],
    photo: { set: "women", id: 68 },
    links: {
      linkedinUrl: "https://www.linkedin.com/in/mafe-castellanos-seed",
      instagramUrl: "https://www.instagram.com/mafe.seed",
      websiteUrl: "https://mafe-design.example.com",
    },
    projects: [
      {
        title: "Branch cash-count app",
        summary:
          "A tablet flow for closing the till at 60 branches, with an agent that explains mismatches in plain language.",
        url: "https://mafe-design.example.com/cash-count",
        repoUrl: null,
        builtWith: [
          { name: "v0", percent: 45 },
          { name: "Cursor", percent: 35 },
          { name: "Figma", percent: 20 },
        ],
      },
    ],
    events: ["lane-event", "lane-demo-day"],
  }),
  persona({
    username: "kevin_alfaro",
    displayName: "Kevin Alfaro",
    headline: "Full-stack developer. Agents, integrations, and the boring glue",
    bio: "I build the integrations nobody wants to own: ERP exports, payment webhooks, and the scripts that keep them in sync. Currently helping two local retailers move order intake to an agent with a human review queue.",
    countryCode: "SV",
    city: "Santa Tecla",
    role: "DEVELOPER",
    upFor: ["FREELANCE", "MENTORING"],
    photo: { set: "men", id: 32 },
    links: {
      linkedinUrl: "https://www.linkedin.com/in/kevin-alfaro-seed",
      xUrl: "https://x.com/kevin_seed",
      githubUrl: "https://github.com/kevin-alfaro-seed",
      websiteUrl: "https://kevinalfaro.example.com",
      instagramUrl: "https://www.instagram.com/kevin.seed",
    },
    projects: [
      {
        title: "Order intake queue",
        summary:
          "Parses WhatsApp and email orders into draft invoices; a clerk approves each one before it reaches the ERP.",
        url: "https://kevinalfaro.example.com/intake",
        repoUrl: "https://github.com/kevin-alfaro-seed/order-intake",
        builtWith: [
          { name: "Cursor", percent: 60 },
          { name: "Claude", percent: 25 },
          { name: "Postgres", percent: 15 },
        ],
      },
      {
        title: "Webhook replay",
        summary:
          "A small CLI that replays failed payment webhooks from logs, so support stops asking engineering.",
        url: null,
        repoUrl: "https://github.com/kevin-alfaro-seed/webhook-replay",
        builtWith: [
          { name: "Codex", percent: 80 },
          { name: "Go", percent: 20 },
        ],
      },
    ],
    events: ["lane-event", "lane-agents-workshop"],
  }),
  persona({
    username: "sofia_hernandez",
    displayName: "Sofía Hernández",
    headline: "Operations lead at a 200-person contact center",
    bio: "I manage scheduling, QA, and reporting for a bilingual support team. I am here to learn how other operators review AI output before it reaches customers, and to find people who have automated weekly reporting without losing the story behind the numbers.",
    countryCode: "HN",
    city: "Tegucigalpa",
    role: "OPERATOR",
    upFor: ["COLLABORATING"],
    photo: { set: "women", id: 26 },
    links: { linkedinUrl: "https://www.linkedin.com/in/sofia-hernandez-seed" },
  }),
  persona({
    username: "luis_portillo",
    displayName: "Luis Portillo",
    headline: "Systems engineering student, UCA",
    countryCode: "SV",
    city: "Antiguo Cuscatlán",
    role: "STUDENT",
    upFor: ["HIRING"],
    photo: { set: "men", id: 75 },
    links: { githubUrl: "https://github.com/luis-portillo-seed" },
    projects: [
      {
        title: "Class schedule planner",
        summary:
          "Suggests a conflict-free semester from the course catalog and my constraints.",
        url: "https://luis-seed.example.com/planner",
        repoUrl: "https://github.com/luis-portillo-seed/planner",
        builtWith: [
          { name: "Cursor", percent: 70 },
          { name: "ChatGPT", percent: 30 },
        ],
      },
      {
        title: "Lab notes search",
        summary: "Semantic search over three years of shared lab notes.",
        url: null,
        repoUrl: "https://github.com/luis-portillo-seed/lab-notes",
        builtWith: [{ name: "Claude", percent: 100 }],
      },
    ],
  }),
  persona({
    username: "gabriela_mejia",
    displayName: "Gabriela Mejía",
    headline: "Accountant exploring automation",
    countryCode: "SV",
    role: "OPERATOR",
    photo: null,
  }),
  persona({
    username: "roberto_chavez",
    displayName: "Roberto Chávez",
    headline: "Co-founder, Nopal Health. Clinic scheduling for northern Mexico",
    bio: "We run scheduling and reminders for 30 private clinics. Looking for a technical co-founder who has shipped agents that talk to patients and knows when to hand off to a human.",
    countryCode: "MX",
    city: "Monterrey",
    role: "FOUNDER",
    upFor: ["COFOUNDING", "HIRING"],
    photo: { set: "men", id: 52 },
    links: {
      linkedinUrl: "https://www.linkedin.com/in/roberto-chavez-seed",
      websiteUrl: "https://nopal-health.example.com",
    },
    projects: [
      {
        title: "Reminder agent",
        summary:
          "Confirms appointments over WhatsApp, reschedules within clinic rules, and escalates anything medical to the front desk.",
        url: "https://nopal-health.example.com",
        repoUrl: null,
        builtWith: [
          { name: "Cursor", percent: 35 },
          { name: "Claude", percent: 25 },
          { name: "Twilio", percent: 20 },
          { name: "Supabase", percent: 15 },
          { name: "Vercel", percent: 5 },
        ],
      },
    ],
    events: ["lane-founders-dinner"],
  }),
  persona({
    username: "valeria_quintanilla",
    displayName: "Valeria Quintanilla",
    headline: "Brand and motion designer",
    bio: "Identity systems for restaurants and hotels. I use agents for first drafts of copy and asset variations, then spend the saved time on the details.",
    countryCode: "CR",
    city: "San José",
    role: "DESIGNER",
    upFor: ["FREELANCE"],
    photo: { set: "women", id: 90 },
    links: {
      instagramUrl: "https://www.instagram.com/valeria.seed",
      websiteUrl: "https://valeria-studio.example.com",
    },
    projects: [
      {
        title: "Menu variant generator",
        summary:
          "Produces seasonal menu layouts from one master file and a price list.",
        url: "https://valeria-studio.example.com/menus",
        repoUrl: null,
        builtWith: [
          { name: "Figma", percent: 50 },
          { name: "Claude", percent: 50 },
        ],
      },
    ],
  }),
  persona({
    username: "diego_rodas",
    displayName: "Diego Rodas",
    headline: "Revenue operations at a Houston logistics startup",
    bio: "Salvadoran in Texas. I own the CRM, the pipeline reports, and every spreadsheet sales pretends not to use.",
    countryCode: "US",
    city: "Houston",
    role: "OPERATOR",
    upFor: ["MENTORING", "COLLABORATING"],
    photo: { set: "men", id: 11 },
    links: { linkedinUrl: "https://www.linkedin.com/in/diego-rodas-seed" },
    events: ["lane-ops-clinic"],
  }),
  persona({
    username: "paola_guzman",
    displayName: "Paola Guzmán",
    headline: "Backend developer, payments",
    countryCode: "SV",
    city: "San Miguel",
    role: "DEVELOPER",
    upFor: ["FREELANCE"],
    photo: { set: "women", id: 12 },
    links: { githubUrl: "https://github.com/paola-guzman-seed" },
  }),
]

const FIRST_NAMES = [
  ["Andrea", "women"],
  ["Carlos", "men"],
  ["Mónica", "women"],
  ["José", "men"],
  ["Fernanda", "women"],
  ["Ricardo", "men"],
  ["Lucía", "women"],
  ["Ernesto", "men"],
  ["Camila", "women"],
  ["Mauricio", "men"],
] as const
const LAST_NAMES = [
  "Aguilar",
  "Batres",
  "Cruz",
  "Durán",
  "Escobar",
  "Flores",
  "Galdámez",
  "Hernández",
  "Iraheta",
  "Juárez",
]
const HEADLINES: Record<MemberRole, string> = {
  FOUNDER: "Founder building a services business with agents",
  DEVELOPER: "Developer shipping internal tools",
  DESIGNER: "Designer prototyping in code",
  OPERATOR: "Operations manager automating weekly reports",
  STUDENT: "Student learning to build with AI tools",
}
const ROLES: ReadonlyArray<MemberRole> = [
  "DEVELOPER",
  "OPERATOR",
  "FOUNDER",
  "STUDENT",
  "DESIGNER",
]
const COUNTRIES: ReadonlyArray<CountryCode> = ["SV", "GT", "HN", "MX", "CR"]
const UP_FOR: ReadonlyArray<UpFor[]> = [
  [],
  ["COLLABORATING"],
  ["FREELANCE"],
  ["MENTORING"],
]

/** Plain members that fill the directory; every seventh has no photo. */
function fillerMember(index: number): SeedMember {
  const [first, set] = FIRST_NAMES[index % FIRST_NAMES.length]
  const last =
    LAST_NAMES[(index * 3 + Math.floor(index / 10)) % LAST_NAMES.length]
  const role = ROLES[index % ROLES.length]
  const username = `${first}_${last.charAt(0)}${index}`
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
  return persona({
    username,
    displayName: `${first} ${last}`,
    headline: HEADLINES[role],
    countryCode: COUNTRIES[index % COUNTRIES.length],
    role,
    upFor: UP_FOR[index % UP_FOR.length],
    photo: index % 7 === 6 ? null : { set, id: 10 + index * 3 },
  })
}

export const SEED_MEMBER_COUNT = 30

export const SEED_MEMBERS: ReadonlyArray<SeedMember> = Array.from(
  { length: SEED_MEMBER_COUNT },
  (_, index) => PERSONAS[index] ?? fillerMember(index)
)
