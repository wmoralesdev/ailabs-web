import type { ProofEvent, PublicPages } from "./types"

const devDay: ProofEvent = {
  name: "DevDay. San Salvador",
  detail:
    "October 24, 2026, 3:00–7:00 p.m., at BINAES, San Salvador. An Ai Labs gathering to see the OpenAI announcements and try Codex, in Spanish.",
  href: "https://devday.ailabs.sv/",
  linkLabel: "devday.ailabs.sv",
}

const pastInElSalvador: ReadonlyArray<ProofEvent> = [
  {
    name: "Modo Fundador",
    detail:
      "August 15, 2026, San Salvador. In-person workshop for founders and owners.",
    href: "/events/modo-fundador",
    linkLabel: "See the workshop",
  },
  {
    name: "Cursor Buildathon 24h",
    detail: "Universidad Francisco Gavidia, San Salvador.",
  },
  {
    name: "OpenAI Build Week",
    detail: "Presidente Plaza, San Salvador.",
  },
  {
    name: "Code Brew El Salvador",
    detail: "Presidente Plaza, San Salvador.",
  },
  {
    name: "Codex Community Build Meetup",
    detail: "Presidente Plaza, San Salvador.",
  },
  {
    name: "Cursor Cowork",
    detail: "Series in San Salvador.",
  },
  {
    name: "Cursor Lab",
    detail: "Series on university campuses.",
  },
  {
    name: "Zero to Agent",
    detail: "Series in San Salvador and Guatemala.",
  },
  {
    name: "The Next Craft",
    detail: "Community gathering.",
  },
]

const elSalvador = {
  areaName: "El Salvador",
  areaType: "Country",
} as const

const centralAmerica = {
  areaName: "Central America",
  areaType: "AdministrativeArea",
} as const

export const pagesEn: PublicPages = {
  consulting: {
    path: "/ai-consulting-el-salvador",
    metaTitle: "AI consulting in El Salvador | Ai Labs",
    metaDescription:
      "AI consulting for teams in El Salvador. From San Salvador we look at the work, choose one process, and leave it running with your team.",
    schemaName: "AI consulting in El Salvador",
    ...elSalvador,
    kind: "service",
    eyebrow: "Ai Labs · San Salvador",
    title: "AI consulting for teams in El Salvador",
    lead: "We look at how you work today, see where AI actually saves work, and leave a first workflow running with your team. The starting point is San Salvador.",
    sections: [
      {
        heading: "How it starts",
        paragraphs: [
          "You do not need a solution in mind. Tell us the work: who does it, where it gets stuck, and what should come out differently.",
          "From there we choose one opportunity, agree on scope, and decide whether the next step is preparing the team or implementing the workflow.",
        ],
      },
      {
        heading: "What stays with the team",
        paragraphs: [
          "Consulting does not stop at a report. Either you practice on tasks you already know, or we implement the workflow with the tools you already use, and a person reviews where that is needed.",
          "We leave documentation so the team can continue without us.",
        ],
      },
      {
        heading: "From San Salvador",
        paragraphs: [
          "Ai Labs works from San Salvador, El Salvador. When a gathering happened somewhere else, it is on the events page, with the place and date already published.",
        ],
      },
    ],
    cta: "Let’s talk",
    interest: "discovery",
    relatedLabel: "Also",
    related: [
      { label: "AI training for teams", href: "/ai-training-el-salvador" },
      { label: "AI automation", href: "/ai-automation-el-salvador" },
      { label: "Tech events in El Salvador", href: "/tech-events-el-salvador" },
      {
        label: "AI community in El Salvador",
        href: "/ai-community-el-salvador",
      },
    ],
  },
  training: {
    path: "/ai-training-el-salvador",
    metaTitle: "AI training for teams in El Salvador | Ai Labs",
    metaDescription:
      "Practical AI training for teams and professionals in El Salvador. From San Salvador, using real tasks and a way to review the output.",
    schemaName: "AI training for teams in El Salvador",
    ...elSalvador,
    kind: "service",
    eyebrow: "Practical education",
    title: "AI training for teams in El Salvador",
    lead: "Practical education for professionals and teams, built around the tasks you want to improve. It is not a degree program. You practice, and you learn how to review what AI returns.",
    sections: [
      {
        heading: "Who it is for",
        paragraphs: [
          "You can come on your own or with your team. A prior consulting engagement is not required.",
          "It fits when people are already trying these tools and need a shared judgment: when to use them, and how to review the output.",
        ],
      },
      {
        heading: "What the training is",
        paragraphs: [
          "You practice with work you recognize, not a generic example.",
          "You learn when to use AI and how to review what it returns, so you can continue on your own.",
          "Academy is the name of this line. This page is the training.",
        ],
      },
      {
        heading: "Where",
        paragraphs: [
          "We prepare it from San Salvador, El Salvador. For a team, the format is agreed in the conversation.",
        ],
      },
    ],
    cta: "I want to learn",
    interest: "enablement",
    relatedLabel: "Also",
    related: [
      {
        label: "AI consulting in El Salvador",
        href: "/ai-consulting-el-salvador",
      },
      { label: "AI automation", href: "/ai-automation-el-salvador" },
      { label: "Tech events in El Salvador", href: "/tech-events-el-salvador" },
    ],
  },
  automation: {
    path: "/ai-automation-el-salvador",
    metaTitle: "AI automation for teams in El Salvador | Ai Labs",
    metaDescription:
      "AI automation for teams in El Salvador. We design the workflow, connect your tools, and keep human review where it is needed.",
    schemaName: "AI automation for teams in El Salvador",
    ...elSalvador,
    kind: "service",
    eyebrow: "Implementation",
    title: "AI automation for teams in El Salvador",
    lead: "We design and implement workflows for your operation: fewer repetitive steps, information connected, and a person reviewing where that is needed.",
    sections: [
      {
        heading: "What gets automated",
        paragraphs: [
          "We start from the process you already have. We look at inputs, decisions, and where it gets stuck.",
          "We decide what to assist, what to automate, and what stays with a person. The team does not leave the workflow.",
        ],
      },
      {
        heading: "What you keep",
        paragraphs: [
          "Connections to the tools you already use, documentation, and a handover so the team can run it.",
          "Agentic is the name of this line. The result is a process that works better, not a demo.",
        ],
      },
      {
        heading: "From San Salvador",
        paragraphs: [
          "Implementation is agreed from San Salvador, El Salvador, on a real process from your team.",
        ],
      },
    ],
    cta: "Improve a process",
    interest: "implementation",
    relatedLabel: "Also",
    related: [
      {
        label: "AI consulting in El Salvador",
        href: "/ai-consulting-el-salvador",
      },
      { label: "AI training for teams", href: "/ai-training-el-salvador" },
      { label: "Tech events in El Salvador", href: "/tech-events-el-salvador" },
    ],
  },
  events: {
    path: "/tech-events-el-salvador",
    metaTitle: "Tech events in El Salvador | Ai Labs",
    metaDescription:
      "AI and tech events in El Salvador published by Ai Labs. DevDay at BINAES, the buildathon at UFG, and Zero to Agent in San Salvador and Guatemala.",
    schemaName: "Tech events in El Salvador",
    ...elSalvador,
    kind: "event",
    eyebrow: "San Salvador",
    title: "Tech events in El Salvador",
    lead: "AI and tech events Ai Labs has already published, mostly in San Salvador. What is next has a date. What already happened keeps the place we had named.",
    upcomingLabel: "Next",
    pastLabel: "Already held",
    upcoming: [devDay],
    past: pastInElSalvador,
    relatedLabel: "Also",
    related: [
      {
        label: "AI community in El Salvador",
        href: "/ai-community-el-salvador",
      },
      {
        label: "Tech events in Central America",
        href: "/tech-events-central-america",
      },
      {
        label: "AI consulting in El Salvador",
        href: "/ai-consulting-el-salvador",
      },
    ],
  },
  links: {
    path: "/enlaces",
    metaTitle: "Official links | Ai Labs",
    metaDescription:
      "LinkedIn, X, Instagram, and TikTok for Ai Labs. Made in San Salvador, El Salvador.",
    eyebrow: "Ai Labs",
    title: "Official links",
    lead: "These are the profiles Ai Labs publishes. The brand is Ai Labs. Made in San Salvador, El Salvador.",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/ai-labs-sv",
        detail: "Company",
      },
      {
        label: "X",
        href: "https://x.com/ailabs_sv",
        detail: "@ailabs_sv",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/ailabs_sv/",
        detail: "@ailabs_sv",
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@ailabs_sv",
        detail: "@ailabs_sv",
      },
    ],
  },
  community: {
    path: "/ai-community-el-salvador",
    metaTitle: "AI community in El Salvador | Ai Labs",
    metaDescription:
      "Ai Labs is a tech community in El Salvador: WhatsApp, events in San Salvador, and university campuses. Based in San Salvador.",
    schemaName: "AI community in El Salvador",
    ...elSalvador,
    kind: "community",
    eyebrow: "San Salvador",
    title: "AI community in El Salvador",
    lead: "Ai Labs is a tech community in El Salvador, based in San Salvador. A WhatsApp group, in-person events, and people from universities in the country.",
    sections: [
      {
        heading: "What happens in San Salvador",
        paragraphs: [
          "Day to day conversation is on WhatsApp. Published in-person gatherings include DevDay at BINAES and the 24-hour buildathon at Universidad Francisco Gavidia.",
          "Campus Leaders is one leader per university in El Salvador. Aperture is the directory of members who choose to publish a profile.",
        ],
      },
      {
        heading: "How to join",
        paragraphs: [
          "The group invite is on the community page. You do not need to be a client or a student.",
          "This page is Ai Labs. It is not a directory of every tech community in the country.",
        ],
      },
    ],
    cta: "Join the community",
    ctaHref: "/community",
    interest: "discovery",
    relatedLabel: "Also",
    related: [
      { label: "Tech events in El Salvador", href: "/tech-events-el-salvador" },
      { label: "Campus Leaders", href: "/campus-leader" },
      { label: "Aperture members", href: "/aperture" },
      {
        label: "AI community in Central America",
        href: "/ai-community-central-america",
      },
    ],
  },
  communityRegion: {
    path: "/ai-community-central-america",
    metaTitle: "AI community in Central America | Ai Labs",
    metaDescription:
      "Ai Labs’ AI community for Central America is based in San Salvador. Zero to Agent also ran in Guatemala. It is the same community.",
    schemaName: "AI community in Central America",
    ...centralAmerica,
    kind: "community",
    eyebrow: "From San Salvador",
    title: "AI community in Central America",
    lead: "Ai Labs’ tech community for Central America is the one already running in San Salvador. We do not open an office per country. Zero to Agent also ran in Guatemala.",
    sections: [
      {
        heading: "The base",
        paragraphs: [
          "The group, the campuses, and most gatherings are in El Salvador. If you are in the region, you join the same WhatsApp group and the same events.",
          "Aperture lists members who want to be visible. Campus Leaders covers universities in El Salvador.",
        ],
      },
      {
        heading: "What already happened in Guatemala",
        paragraphs: [
          "Zero to Agent is a series Ai Labs held in San Salvador and in Guatemala. That is the published gathering outside El Salvador.",
          "There is no other office to show. When the next gathering has a date and a place, it goes on the events page.",
        ],
      },
    ],
    cta: "Join the community",
    ctaHref: "/community",
    interest: "discovery",
    relatedLabel: "Also",
    related: [
      {
        label: "AI community in El Salvador",
        href: "/ai-community-el-salvador",
      },
      {
        label: "Tech events in Central America",
        href: "/tech-events-central-america",
      },
      {
        label: "AI consulting in Central America",
        href: "/ai-consulting-central-america",
      },
    ],
  },
  eventsRegion: {
    path: "/tech-events-central-america",
    metaTitle: "Tech events in Central America | Ai Labs",
    metaDescription:
      "Tech and AI events from Ai Labs in Central America. The calendar comes from San Salvador. Zero to Agent also ran in Guatemala.",
    schemaName: "Tech events in Central America",
    ...centralAmerica,
    kind: "event",
    eyebrow: "From San Salvador",
    title: "Tech events in Central America",
    lead: "Ai Labs organizes its tech events for Central America from San Salvador. The full calendar is in El Salvador. Zero to Agent also ran in Guatemala.",
    intro: [
      "This page does not invent an event per country. It lists the next dated gathering, the series already held in Guatemala, and the UFG buildathon as the local reference.",
    ],
    upcomingLabel: "Next",
    pastLabel: "Already held",
    upcoming: [devDay],
    past: [
      {
        name: "Zero to Agent",
        detail: "Series in San Salvador and Guatemala.",
      },
      {
        name: "Cursor Buildathon 24h",
        detail: "Universidad Francisco Gavidia, San Salvador.",
      },
      {
        name: "Modo Fundador",
        detail: "August 15, 2026, San Salvador.",
        href: "/events/modo-fundador",
        linkLabel: "See the workshop",
      },
    ],
    relatedLabel: "Also",
    related: [
      { label: "Tech events in El Salvador", href: "/tech-events-el-salvador" },
      {
        label: "AI community in Central America",
        href: "/ai-community-central-america",
      },
      {
        label: "AI consulting in Central America",
        href: "/ai-consulting-central-america",
      },
    ],
  },
  consultingRegion: {
    path: "/ai-consulting-central-america",
    metaTitle: "AI consulting in Central America | Ai Labs",
    metaDescription:
      "AI consulting for teams in Central America. Ai Labs works from San Salvador and has already held events in Guatemala.",
    schemaName: "AI consulting in Central America",
    ...centralAmerica,
    kind: "service",
    eyebrow: "From San Salvador",
    title: "AI consulting in Central America",
    lead: "Consulting covers Central America and is done from San Salvador. We look at the team’s work, choose one process, and leave it running. There is no other office.",
    sections: [
      {
        heading: "The same work",
        paragraphs: [
          "You do not need a solution in mind. Tell us who does the work, where it gets stuck, and what should come out differently.",
          "Then we decide whether the next step is preparing the team or implementing the workflow, with a person reviewing where that is needed.",
        ],
      },
      {
        heading: "What is already published in the region",
        paragraphs: [
          "The base is San Salvador, El Salvador. Gatherings with a date and a place are on the events page.",
          "Outside El Salvador, the published record is the Zero to Agent series in Guatemala. That is not a client list.",
        ],
      },
    ],
    cta: "Let’s talk",
    interest: "discovery",
    relatedLabel: "Also",
    related: [
      {
        label: "AI consulting in El Salvador",
        href: "/ai-consulting-el-salvador",
      },
      {
        label: "Tech events in Central America",
        href: "/tech-events-central-america",
      },
      {
        label: "AI community in Central America",
        href: "/ai-community-central-america",
      },
      { label: "AI training for teams", href: "/ai-training-el-salvador" },
    ],
  },
}
