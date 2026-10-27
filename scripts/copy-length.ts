// Checks the public copy against length budgets and the house voice.
//
//   pnpm copy:check
//
// Long sections lose the reader, so every visible string has a budget in
// characters, and sibling items shown side by side (cards, steps, FAQ
// answers) must stay close in length so the layout reads as one rhythm.
// Ai Labs speaks about itself in the first person plural ("we"), so the
// check also flags sentences that describe Ai Labs in the third person.
// Exits 1 when anything is over budget or off voice.
import { en } from "../src/content/en"
import { es } from "../src/content/es"
import type { SiteContent } from "../src/content/types"

type Check = {
  path: string
  text: string
  max: number
  min?: number
}

/** Siblings may differ by at most this ratio between longest and shortest. */
const SIBLING_RATIO = 1.8
const BRAND = " | Ai Labs"

/** Third-person self-description: "Ai Labs hace…", "Ai Labs does…". */
const THIRD_PERSON = {
  es: /\bAi Labs(?: Academy| Agentic)? (?:es|hace|trabaja|participa|no publica|publica|ofrece|diseña|parte|recibe|enseña|implementa|define|está|da)(?![\p{L}])/u,
  en: /\bAi Labs(?: Academy| Agentic)? (?:is|does|works|takes part|offers|designs|runs|starts|teaches|implements|defines|receives|publishes|does not)(?![\p{L}])/u,
} as const

function collect(content: SiteContent): {
  checks: Check[]
  groups: { path: string; texts: string[] }[]
  voice: { path: string; text: string }[]
} {
  const checks: Check[] = []
  const groups: { path: string; texts: string[] }[] = []
  const voice: { path: string; text: string }[] = []
  const add = (path: string, text: string, max: number, min?: number) => {
    checks.push({ path, text, max, min })
    voice.push({ path, text })
  }
  const group = (path: string, texts: string[]) => groups.push({ path, texts })

  const { home, consulting, community, campusLeader, servicePages, meta } =
    content

  add("meta.title", meta.title, 64)
  add("meta.description", meta.description, 160, 110)

  add("home.hero.headline", home.hero.headline, 70)
  add("home.hero.directAnswer", home.hero.directAnswer, 160)
  add("home.services.title", home.services.title, 60)
  add("home.services.body", home.services.body, 170)
  home.services.items.forEach((item, i) => {
    add(`home.services.items[${i}].title`, item.title, 60)
    add(`home.services.items[${i}].body`, item.body, 120)
    item.points.forEach((point, j) =>
      add(`home.services.items[${i}].points[${j}]`, point, 60)
    )
  })
  group(
    "home.services.items[].body",
    home.services.items.map((item) => item.body)
  )
  group(
    "home.services.items[].points",
    home.services.items.flatMap((item) => item.points)
  )
  add("home.method.title", home.method.title, 60)
  add("home.method.body", home.method.body, 170)
  home.method.steps.forEach((step, i) =>
    add(`home.method.steps[${i}].body`, step.body, 100)
  )
  group(
    "home.method.steps[].body",
    home.method.steps.map((step) => step.body)
  )
  add("home.faq.title", home.faq.title, 60)
  home.faq.items.forEach((item, i) => {
    add(`home.faq.items[${i}].question`, item.question, 80)
    add(`home.faq.items[${i}].answer`, item.answer, 240)
  })
  group(
    "home.faq.items[].answer",
    home.faq.items.map((item) => item.answer)
  )
  add("home.contact.lead", home.contact.lead, 140)

  add("consulting.metaTitle", consulting.metaTitle + BRAND, 60)
  add("consulting.metaDescription", consulting.metaDescription, 160, 110)
  add("consulting.lead", consulting.lead, 160)
  consulting.services.forEach((service, i) =>
    add(`consulting.services[${i}].body`, service.body, 120)
  )
  group(
    "consulting.services[].body",
    consulting.services.map((service) => service.body)
  )
  add("consulting.methodBody", consulting.methodBody, 170)
  consulting.faqs.forEach((faq, i) =>
    add(`consulting.faqs[${i}].answer`, faq.answer, 320)
  )

  add("community.metaTitle", community.metaTitle + BRAND, 60)
  add("community.body", community.body, 160, 110)
  add("campusLeader.metaTitle", campusLeader.metaTitle + BRAND, 60)
  add("campusLeader.body", campusLeader.body, 160, 110)

  for (const id of ["training", "automation"] as const) {
    const page = servicePages[id]
    const at = `servicePages.${id}`
    add(`${at}.metaTitle`, page.metaTitle, 60)
    add(`${at}.metaDescription`, page.metaDescription, 160, 110)
    add(`${at}.title`, page.title, 75)
    add(`${at}.lead`, page.lead, 170)
    add(`${at}.definition`, page.definition, 230)
    page.includes.forEach((item, i) =>
      add(`${at}.includes[${i}].body`, item.body, 120)
    )
    group(
      `${at}.includes[].body`,
      page.includes.map((item) => item.body)
    )
    page.steps.forEach((step, i) =>
      add(`${at}.steps[${i}].body`, step.body, 100)
    )
    group(
      `${at}.steps[].body`,
      page.steps.map((step) => step.body)
    )
    page.fit.forEach((line, i) => add(`${at}.fit[${i}]`, line, 100))
    page.notFit.forEach((line, i) => add(`${at}.notFit[${i}]`, line, 100))
    page.faq.forEach((item, i) =>
      add(`${at}.faq[${i}].answer`, item.answer, 240)
    )
    group(
      `${at}.faq[].answer`,
      page.faq.map((item) => item.answer)
    )
    add(`${at}.ctaBody`, page.ctaBody, 140)
  }

  return { checks, groups, voice }
}

let failures = 0
for (const [locale, content] of [
  ["es", es],
  ["en", en],
] as const) {
  const { checks, groups, voice } = collect(content)
  for (const { path, text, max, min } of checks) {
    const length = text.length
    if (length > max || (min !== undefined && length < min)) {
      failures++
      const range = min === undefined ? `≤ ${max}` : `${min}–${max}`
      console.log(`[${locale}] ${path}: ${length} chars (budget ${range})`)
    }
  }
  for (const { path, texts } of groups) {
    const lengths = texts.map((text) => text.length)
    const ratio = Math.max(...lengths) / Math.min(...lengths)
    if (ratio > SIBLING_RATIO) {
      failures++
      console.log(
        `[${locale}] ${path}: siblings uneven (${lengths.join(", ")}; ratio ${ratio.toFixed(1)} > ${SIBLING_RATIO})`
      )
    }
  }
  for (const { path, text } of voice) {
    const match = THIRD_PERSON[locale].exec(text)
    if (match) {
      failures++
      console.log(`[${locale}] ${path}: third person "${match[0]}…"`)
    }
  }
}

if (failures > 0) {
  console.log(`\n${failures} copy issue(s).`)
  process.exit(1)
}
console.log("Copy is within budget and in our voice.")
