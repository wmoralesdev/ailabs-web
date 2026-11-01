// Checks the public copy against length budgets and the house voice.
//
//   pnpm copy:check
//
// Long sections lose the reader, so every visible string has a budget in
// characters, and sibling items shown side by side (cards, steps, FAQ
// answers) must stay close in length so the layout reads as one rhythm.
// Ai Labs speaks about itself in the first person plural ("we"), so the
// check also flags sentences that describe Ai Labs in the third person, and
// it refuses dashes used as connectors. Exits 1 when anything is off.
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
const SIBLING_RATIO = 1.6
const FAQ_MAX_ITEMS = 5

const BUDGET = {
  metaTitle: 60,
  metaDescription: [110, 160] as const,
  h1: 55,
  lead: 160,
  sectionTitle: 40,
  cardLine: 120,
  stepBody: 100,
  listLine: 95,
  faqQuestion: 60,
  faqAnswer: 220,
  ctaBody: 140,
}

/** Third-person self-description: "Ai Labs hace…", "Ai Labs does…". */
const THIRD_PERSON = {
  es: /\bAi Labs (?:es|hace|trabaja|participa|no publica|publica|ofrece|diseña|parte|recibe|enseña|implementa|define|está|da|organiza)(?![\p{L}])/u,
  en: /\bAi Labs (?:is|does|works|takes part|offers|designs|runs|starts|teaches|implements|defines|receives|publishes|does not|organizes)(?![\p{L}])/u,
} as const

const DASH = /[–—]|\s--\s/

function collect(content: SiteContent): {
  checks: Check[]
  groups: { path: string; texts: string[] }[]
  voice: { path: string; text: string }[]
} {
  const checks: Check[] = []
  const groups: { path: string; texts: string[] }[] = []
  const voice: { path: string; text: string }[] = []
  const add = (
    path: string,
    text: string,
    max: number | readonly [number, number]
  ) => {
    if (typeof max === "number") {
      checks.push({ path, text, max })
    } else {
      checks.push({ path, text, max: max[1], min: max[0] })
    }
    voice.push({ path, text })
  }
  const group = (path: string, texts: string[]) => groups.push({ path, texts })

  const { home, servicePages, meta, events, booking } = content

  add("meta.title", meta.title, BUDGET.metaTitle)
  add("meta.description", meta.description, BUDGET.metaDescription)

  add("home.hero.headline", home.hero.headline, BUDGET.h1)
  add("home.hero.lead", home.hero.lead, BUDGET.lead)
  add("home.ambassadors.body", home.ambassadors.body, BUDGET.lead)
  add("home.offers.title", home.offers.title, BUDGET.sectionTitle)
  add("home.offers.intro", home.offers.intro, BUDGET.cardLine)
  home.offers.items.forEach((item, i) => {
    add(`home.offers.items[${i}].body`, item.body, BUDGET.cardLine)
    if (item.examples) {
      add(`home.offers.items[${i}].examples`, item.examples, BUDGET.cardLine)
    }
  })
  group(
    "home.offers.items[].body",
    home.offers.items.map((item) => item.body)
  )
  add("home.method.title", home.method.title, BUDGET.sectionTitle)
  add("home.method.body", home.method.body, BUDGET.lead)
  home.method.steps.forEach((step, i) =>
    add(`home.method.steps[${i}].body`, step.body, BUDGET.stepBody)
  )
  group(
    "home.method.steps[].body",
    home.method.steps.map((step) => step.body)
  )
  add("home.faq.title", home.faq.title, BUDGET.sectionTitle)
  if (home.faq.items.length > FAQ_MAX_ITEMS) {
    checks.push({
      path: "home.faq.items",
      text: "x".repeat(home.faq.items.length),
      max: FAQ_MAX_ITEMS,
    })
  }
  home.faq.items.forEach((item, i) => {
    add(`home.faq.items[${i}].question`, item.question, BUDGET.faqQuestion)
    add(`home.faq.items[${i}].answer`, item.answer, BUDGET.faqAnswer)
  })
  group(
    "home.faq.items[].answer",
    home.faq.items.map((item) => item.answer)
  )
  add("home.booking.body", home.booking.body, BUDGET.lead)

  for (const id of ["consulting", "automation", "training"] as const) {
    const page = servicePages[id]
    const at = `servicePages.${id}`
    add(`${at}.metaTitle`, page.metaTitle, BUDGET.metaTitle)
    add(`${at}.metaDescription`, page.metaDescription, BUDGET.metaDescription)
    add(`${at}.title`, page.title, BUDGET.h1)
    add(`${at}.lead`, page.lead, BUDGET.lead)
    page.fit.forEach((line, i) => add(`${at}.fit[${i}]`, line, BUDGET.listLine))
    page.notFit.forEach((line, i) =>
      add(`${at}.notFit[${i}]`, line, BUDGET.listLine)
    )
    page.includes.forEach((item, i) =>
      add(`${at}.includes[${i}].body`, item.body, BUDGET.cardLine)
    )
    group(
      `${at}.includes[].body`,
      page.includes.map((item) => item.body)
    )
    page.steps.forEach((step, i) =>
      add(`${at}.steps[${i}].body`, step.body, BUDGET.stepBody)
    )
    group(
      `${at}.steps[].body`,
      page.steps.map((step) => step.body)
    )
    if (page.faq.length > FAQ_MAX_ITEMS) {
      checks.push({
        path: `${at}.faq`,
        text: "x".repeat(page.faq.length),
        max: FAQ_MAX_ITEMS,
      })
    }
    page.faq.forEach((item, i) => {
      add(`${at}.faq[${i}].question`, item.question, BUDGET.faqQuestion)
      add(`${at}.faq[${i}].answer`, item.answer, BUDGET.faqAnswer)
    })
    group(
      `${at}.faq[].answer`,
      page.faq.map((item) => item.answer)
    )
    add(`${at}.ctaBody`, page.ctaBody, BUDGET.ctaBody)
  }

  add("events.metaTitle", events.metaTitle, BUDGET.metaTitle)
  add("events.metaDescription", events.metaDescription, BUDGET.metaDescription)
  add("events.headline", events.headline, BUDGET.h1)
  add("events.intro", events.intro, BUDGET.lead)
  events.tracks.forEach((track, i) =>
    add(`events.tracks[${i}].body`, track.body, BUDGET.cardLine)
  )
  group(
    "events.tracks[].body",
    events.tracks.map((track) => track.body)
  )
  add("events.communityBody", events.communityBody, BUDGET.cardLine)

  add(
    "booking.metaDescription",
    booking.metaDescription,
    BUDGET.metaDescription
  )
  add("booking.headline", booking.headline, BUDGET.h1)
  add("booking.body", booking.body, BUDGET.lead)
  booking.steps.forEach((step, i) =>
    add(`booking.steps[${i}].body`, step.body, BUDGET.stepBody)
  )
  group(
    "booking.steps[].body",
    booking.steps.map((step) => step.body)
  )

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
    if (DASH.test(text)) {
      failures++
      console.log(`[${locale}] ${path}: dash used as a connector`)
    }
  }
}

if (failures > 0) {
  console.log(`\n${failures} copy issue(s).`)
  process.exit(1)
}
console.log("Copy is within budget and in our voice.")
