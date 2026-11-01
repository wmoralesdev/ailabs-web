import { homeCarousel } from "./home-carousel"
import { legalEn } from "./legal-en"
import type { SiteContent } from "./types"
import { servicePagesEn } from "./service-pages-en"

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "AI consulting, automation and practical education | Ai Labs",
    description:
      "AI consulting, business automation and practical education for teams and professionals. Crafted in San Salvador, El Salvador.",
  },
  chrome: {
    nav: {
      services: {
        label: "Services",
        href: "#services",
      },
      events: {
        label: "Events",
        href: "/events",
      },
      contact: {
        label: "Let’s talk",
        href: "/agendar",
      },
    },
    footer: {
      brandLine:
        "AI consulting, business automation and practical education for teams and professionals.",
      socials: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/ai-labs-sv",
          icon: "linkedin",
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com/ailabs_sv/",
          icon: "instagram",
        },
        {
          label: "TikTok",
          href: "https://www.tiktok.com/@ailabs_sv",
          icon: "tiktok",
        },
        { label: "X", href: "https://x.com/ailabs_sv", icon: "x" },
      ],
      columns: [
        {
          title: "Services",
          links: [
            {
              label: "AI consulting",
              href: "#services",
            },
            {
              label: "AI courses and workshops",
              href: "/capacitacion-ia-el-salvador",
            },
            {
              label: "AI automation for companies",
              href: "/automatizacion-ia-el-salvador",
            },
            {
              label: "How we work",
              href: "#about",
            },
          ],
        },
        {
          id: "community",
          title: "Community",
          links: [
            {
              label: "AI events in El Salvador",
              href: "/events",
            },
          ],
        },
        {
          title: "Ai Labs",
          links: [
            {
              label: "Let’s talk",
              href: "/agendar",
            },
          ],
        },
      ],
      legalLinks: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
      ],
      copyright: "© {year} Ai Labs",
      locationLine: "Crafted in San Salvador, El Salvador",
      socialTitle: "Social",
    },
  },
  microcopy: {
    primaryNavigation: "Primary navigation",
    loading: "Loading…",
    notFoundTitle: "Page not found",
    notFoundBody: "That page doesn't exist. Head home or talk to us.",
    notFoundCtaHome: "Back home",
    languageSwitch: "ES",
    skipToContent: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    themeCycle: "Cycle color theme",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    themeToSystem: "Switch to system theme",
  },
  home: {
    hero: {
      label: "AI LABS · EL SALVADOR",
      headline: "AI consulting, business automation and practical education.",
      directAnswer:
        "We are Ai Labs, a private company in San Salvador, El Salvador. We help commercial, management, and operations teams improve real processes with AI.",
      agencyQuestion: "Is there an AI agency in El Salvador?",
      agencyAnswer:
        "If you are looking for an artificial intelligence agency in El Salvador, at Ai Labs we are a private consulting firm in San Salvador. We are not the National Artificial Intelligence Agency.",
      body: "AI consulting, business automation and practical education for teams and professionals. Crafted in San Salvador, El Salvador.",
      primaryCta: { label: "Let’s talk", href: "/agendar" },
      secondaryCta: { label: "Explore services", href: "#services" },
      proof: { value: "800+", label: "Builders" },
      slides: [
        { value: "800+", label: "Builders", icon: "builders" },
        { value: "40+", label: "Events hosted", icon: "events" },
        { value: "8", label: "Active partners", icon: "partners" },
      ],
      mediaSrcs: homeCarousel.hero,
      mediaAlt: "Ai Labs community session",
    },
    services: {
      label: "Our services",
      title: "What does AI consulting include?",
      offerName: "AI consulting",
      body: "We look at how you work, identify where AI can help and decide what to tackle first. From there, we help you learn or build the workflow with you.",
      items: [
        {
          id: "academy",
          brand: "Academy",
          title: "How do you learn to apply AI in your work?",
          offerName: "Learn to apply AI in your work.",
          body: "Workshops and training for professionals and teams, on the tasks you want to improve.",
          points: [
            "Practice with work you recognize.",
            "Learn when to use AI and how to review its output.",
            "Build skills you can use on your own.",
          ],
          cta: "I want to learn",
          learnMore: "More on AI training",
          photos: [
            {
              name: "23.webp",
              alt: "Two participants work on their laptops during an Ai Labs workshop.",
            },
            {
              name: "3.webp",
              alt: "Participants follow a hands-on Ai Labs session in an auditorium.",
            },
          ],
        },
        {
          id: "agentic",
          brand: "Agentic",
          title: "How do you make your processes work better?",
          offerName: "Make your processes work better.",
          body: "We design and implement workflows around your operation, connecting your tools and the people who use them.",
          points: [
            "Reduce repetitive steps and connect information.",
            "Keep human review where it is needed.",
            "Receive documentation and a handover to your team.",
          ],
          cta: "Improve a process",
          learnMore: "More on AI automation",
          photos: [
            {
              name: "24.webp",
              alt: "A participant writes code at a monitor during an Ai Labs session.",
            },
            {
              name: "21.webp",
              alt: "Two participants review code on their laptops during an Ai Labs session.",
            },
          ],
        },
      ],
      pageLink: {
        label: "AI consulting in El Salvador",
        href: "/consultoria-de-ia-el-salvador",
      },
    },
    method: {
      label: "How we work",
      title: "Where do we start?",
      body: "First we look at how the work gets done today. Then we agree on a concrete next step with you. If you only want to learn, come straight to Academy.",
      steps: [
        {
          title: "Understand",
          body: "We look at how the work happens today, who is involved and where it gets stuck.",
        },
        {
          title: "Prioritize",
          body: "We choose an opportunity and agree on scope and how to assess improvement.",
        },
        {
          title: "Put it into practice",
          body: "We prepare the team or implement the workflow, with the review and documentation it needs.",
        },
      ],
    },
    faq: {
      label: "Questions",
      title: "What people usually ask us.",
      items: [
        {
          question: "What does an AI consultant do?",
          answer:
            "They look at how a team works, find where AI can help, and decide where to start. At Ai Labs, once we choose an opportunity, we prepare the team (Academy) or implement the workflow with you (Agentic).",
        },
        {
          question:
            "AI consultant, advisor, agency or company: what is the difference?",
          answer:
            "A consultant or advisor usually works alone and recommends; an agency or company works as a team and also implements. We are a private AI consulting company in San Salvador, and we do both.",
        },
        {
          question: "How much does AI consulting cost?",
          answer:
            "It depends on scope. We do not publish consulting prices because we first review the process and agree on what is worth improving. Public workshops do list their price on their page.",
        },
        {
          question: "Which processes can AI improve or automate?",
          answer:
            "We work with commercial, management, and operations teams: repetitive tasks, follow-up, documents, and workflows across tools. We define what AI assists and which decisions stay with people.",
        },
        {
          question: "Do I need a company to learn AI with Ai Labs?",
          answer:
            "No. Academy is our practical education for professionals and teams. You can come straight to learn, with no company or prior consulting.",
        },
        {
          question: "Where is Ai Labs?",
          answer:
            "We are in San Salvador, El Salvador. Public workshops are in person in San Salvador, and we announce each session in our WhatsApp community.",
        },
        {
          question:
            "Does Ai Labs sell access or credits for OpenAI, Claude or other tools?",
          answer:
            "No. We take part in ambassador programs for several AI tools. Those logos are not a customer list or a guarantee of access, credits, or partnerships.",
        },
        {
          question: "What is Aperture?",
          answer:
            "Aperture is the name of our community: workshops, events, and the Campus Leaders program for students. Joining on WhatsApp is free.",
        },
        {
          question: "How do I start working with Ai Labs?",
          answer:
            "Write to us from “Let’s talk” and tell us what you want to improve or learn. You do not need a company or a defined solution.",
        },
      ],
    },
    trust: {
      label: "Part of ambassador programs",
      logos: [
        { id: "spacexai", name: "SpaceXAI" },
        { id: "codex", name: "Codex" },
        { id: "openai", name: "OpenAI" },
        { id: "claude", name: "Claude" },
        { id: "mistral", name: "Mistral" },
        { id: "elevenlabs", name: "ElevenLabs" },
        { id: "notion", name: "Notion" },
      ],
    },
    about: {
      label: "The process before the tool",
      body: "We first understand the work as it happens today, identify friction, and decide what AI should assist, what to automate, and what should remain human.",
      stats: [
        { value: "40+", label: "Events hosted" },
        { value: "8", label: "Active partners" },
      ],
      bold: "We choose a concrete path and leave your team with judgment, documentation, and the ability to operate it.",
      bridgeLabel: "Process consulting and prioritization",
      bridge: [
        {
          title: "Understand",
          body: "We map the process, people, inputs, decisions, and friction.",
        },
        {
          title: "Prioritize",
          body: "We evaluate the opportunity, impact, risk, and a realistic scope.",
        },
        {
          title: "Put it into practice",
          body: "We prepare the team or design and implement the workflow with them.",
        },
      ],
      mediaSrcs: homeCarousel.about,
      mediaAlt: "Ai Labs event: builders collaborating in a training session.",
      mediaCredit: "Credit: Ai Labs. Photograph from an Ai Labs event.",
      toastTitle: "Session in progress",
      toastMeta: "El Salvador",
    },
    academy: {
      id: "academy",
      index: "01",
      eyebrow: "ACADEMY · TEAM ENABLEMENT",
      title: "We prepare your team to put the improvement into practice",
      lead: "We start with the prioritized process and work through the team’s real cases in clear language for business roles until they can apply and operate the improvement.",
      points: [
        {
          title: "Built around their process",
          body: "Practice starts with the tasks, decisions, and friction the team faces every day.",
        },
        {
          title: "Practice with judgment",
          body: "We translate AI so the team understands when to use it, how to review it, and how to operate it.",
        },
        {
          title: "Complementary formats",
          body: "We also run public workshops and bootcamps for people learning on their own.",
        },
      ],
      cta: { label: "Prepare my team", href: "/agendar" },
      mediaSrcs: homeCarousel.features,
      mediaAlt: "Ai Labs event: a hands-on workshop for training and teaching.",
      mediaCredit: "Credit: Ai Labs. Photograph from an Ai Labs event.",
    },
    agentic: {
      id: "agentic",
      index: "02",
      eyebrow: "AGENTIC · WORKFLOW DESIGN AND IMPLEMENTATION",
      title: "We design and implement the workflow with you",
      lead: "We start with the prioritized process and design a workflow that fits how the team works today, including the integrations and human review it needs.",
      points: [
        {
          title: "Fit with the process",
          body: "The workflow respects the tools, data, and responsibilities already in place.",
        },
        {
          title: "Human review",
          body: "We define where AI assists, what gets automated, and which decisions stay with the team.",
        },
        {
          title: "Operational handoff",
          body: "We deliver the workflow, integrations, and documentation so the team can operate it.",
        },
      ],
      cta: { label: "Review a process", href: "/agendar" },
      process: {
        label: "How we implement a workflow",
        steps: [
          {
            label: "Understand the process",
            body: "We map inputs, decisions, friction, and the expected outcome.",
            glyph: "brief",
          },
          {
            label: "Design the intervention",
            body: "We define what to assist, automate, or keep human.",
            glyph: "bench",
          },
          {
            label: "Implement and transfer",
            body: "We integrate, document, and leave the team ready to operate it.",
            glyph: "live",
          },
        ],
      },
    },
    contact: {
      title: "How can we help?",
      lead: "Tell us what you want to learn, improve or explore. You don’t need to have a solution in mind.",
      cta: "Let’s talk",
    },
  },
  servicePages: servicePagesEn,
  consulting: {
    photo: {
      name: "13.webp",
      alt: "A participant listens closely during an Ai Labs session.",
    },
    metaTitle: "AI consulting in El Salvador",
    metaDescription:
      "We are Ai Labs, an AI consulting company in San Salvador, El Salvador. We review a process with your team, choose one improvement, and help you put it to work.",
    label: "San Salvador, El Salvador",
    headline: "AI consulting in El Salvador",
    lead: "We are Ai Labs, an AI consulting company in San Salvador, El Salvador. We review a process with your team, choose one improvement, and help you put it to work.",
    claims: [
      "We do artificial intelligence consulting in El Salvador, from San Salvador: we have the regional leader of SpaceXAI ambassadors, a role that covers all of Central America, and ambassadors for SpaceXAI, ElevenLabs, Mistral, Cognition, Codex, and Notion (Notion Builder).",
      "Ai Labs, in San Salvador, is an AI company in El Salvador: a private consulting firm for teams and professionals.",
      "If you are looking for an artificial intelligence agency in El Salvador, at Ai Labs we are a private consulting firm in San Salvador. We are not the National Artificial Intelligence Agency.",
    ],
    servicesTitle: "Services",
    services: [
      {
        id: "consulting",
        name: "AI consulting",
        body: "We look at how you work, find where AI helps, and decide where to start.",
      },
      {
        id: "academy",
        name: "Practical education",
        link: "AI training in El Salvador",
        body: "Workshops and training for professionals and teams, on the tasks you want to improve.",
      },
      {
        id: "agentic",
        name: "Business automation",
        link: "AI automation in El Salvador",
        body: "We design and implement workflows that connect your tools with the people who use them.",
      },
    ],
    methodTitle: "How we work",
    methodBody:
      "First we look at how the work gets done today. Then we agree on a concrete next step with you. If you only want to learn, come straight to Academy.",
    steps: [
      {
        title: "Understand",
        body: "We look at how the work happens today, who is involved and where it gets stuck.",
      },
      {
        title: "Prioritize",
        body: "We choose an opportunity and agree on scope and how to assess improvement.",
      },
      {
        title: "Put it into practice",
        body: "We prepare the team or implement the workflow, with the review and documentation it needs.",
      },
    ],
    faqs: [
      {
        question:
          "Do you do artificial intelligence consulting in El Salvador?",
        answer:
          "We do artificial intelligence consulting in El Salvador, from San Salvador: we have the regional leader of SpaceXAI ambassadors, a role that covers all of Central America, and ambassadors for SpaceXAI, ElevenLabs, Mistral, Cognition, Codex, and Notion (Notion Builder).",
      },
      {
        question: "Who does AI consulting in El Salvador?",
        answer:
          "We are Ai Labs, an AI consulting company in San Salvador, El Salvador. We review a process with your team, choose one improvement, and help you put it to work.",
      },
      {
        question: "Are you an AI company in El Salvador?",
        answer:
          "Ai Labs, in San Salvador, is an AI company in El Salvador: a private consulting firm for teams and professionals.",
      },
      {
        question: "Is there an AI agency in El Salvador?",
        answer:
          "If you are looking for an artificial intelligence agency in El Salvador, at Ai Labs we are a private consulting firm in San Salvador. We are not the National Artificial Intelligence Agency.",
      },
      {
        question: "What is AI consulting in El Salvador?",
        answer:
          "It means reviewing how a team works today, choosing one improvement, and applying it with AI. At Ai Labs we work with commercial, management, and operations teams, then prepare the team (Academy) or implement the workflow (Agentic). We do not publish consulting prices; public workshops do list theirs.",
      },
    ],
    cta: "Let’s talk",
  },
  booking: {
    heroPhoto: {
      name: "9.webp",
      alt: "Ai Labs community members hug and take a selfie at an event.",
    },
    metaTitle: "Book a 30-minute diagnostic",
    metaDescription:
      "Book a 30-minute diagnostic with us in San Salvador, El Salvador. Pick a time and tell us which process you want to review.",
    label: "Booking",
    headline: "Book a 30-minute diagnostic",
    body: "Pick a time and tell us which process you want to review.",
    embedTitle: "Ai Labs calendar",
    whatsappCta: "Join on WhatsApp",
    whatsappHint: "Opens WhatsApp. Your request may need approval.",
  },
  legal: legalEn,
  events: {
    metaTitle: "AI events from Ai Labs in San Salvador, El Salvador",
    metaDescription:
      "We publish the Ai Labs AI events in El Salvador on Luma for this month, in San Salvador; they are not every event in the country.",
    breadcrumbHome: "Home",
    label: "Events",
    headline: "AI events from Ai Labs in San Salvador, El Salvador",
    intro:
      "We publish the Ai Labs AI events in El Salvador on Luma for this month, in San Salvador; they are not every event in the country.",
    upcomingLabel: "Upcoming",
    pastLabel: "Past",
    hostsLabel: "Hosts",
    lumaLabel: "View on Luma",
    newTabLabel: "Opens in a new tab.",
    photosLabel: "Ai Labs photographs",
    photosCaption: "Credit: Ai Labs. Photos from our events in San Salvador.",
    cityLine: "in San Salvador",
    closeHeadline: "San Salvador keeps gathering",
    closeSupport: "Walter publishes the full calendar on Luma.",
    consultingLink: "AI consulting in El Salvador",
    upcomingEmpty: "There is no upcoming event.",
    monthEmpty: "We have no events published on Luma in {month}.",
    calendarLabel: "View calendar",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    pausePhotos: "Pause photos",
    playPhotos: "Play photos",
    photoStatus: "{current} of {total}",
    photos: [
      {
        src: "/events/community/01-group-hall.webp",
        alt: "Ai Labs event in San Salvador. Large group gathered in a two-level hall, with people sitting on the floor.",
        width: 1200,
        height: 676,
      },
      {
        src: "/events/community/02-canopy-laptops.webp",
        alt: "Ai Labs event in San Salvador. People with laptops at tables under a white canopy, surrounded by green chairs.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/03-selfie-stick.webp",
        alt: "Ai Labs event in San Salvador. Four people smile while one holds a selfie stick beside a table.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/04-auditorium-podium.webp",
        alt: "Ai Labs event in San Salvador. Blue-lit auditorium: a person at the podium and a screen that reads “Atrévete a construir”.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/08-green-couch.webp",
        alt: "Ai Labs event in San Salvador. Five people on a green couch, with open laptops on round tables.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/09-cursor-banner-group.webp",
        alt: "Ai Labs event in San Salvador. Group standing next to a vertical banner that reads Cursor San Salvador.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/10-classroom-talk.webp",
        alt: "Ai Labs event in San Salvador. A person with a microphone speaks in front of a screen while the group listens from the desks.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/12-stickers-outside.webp",
        alt: "Ai Labs event in San Salvador. Three people smile outside a glass building, holding up stickers and cards.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/13-hackathon-laptops.webp",
        alt: "Ai Labs event in San Salvador. Three people around a table; the center laptop reads “Cursor Hackathon”.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/05-classroom-selfie.webp",
        alt: "Ai Labs event in San Salvador. Classroom: one person takes a selfie while others use laptops at the desks.",
        width: 900,
        height: 1200,
      },
      {
        src: "/events/community/06-blue-audience.webp",
        alt: "Ai Labs event in San Salvador. Rows of people seated in blue chairs, under blue light, looking toward the stage.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/07-table-cursor-banner.webp",
        alt: "Ai Labs event in San Salvador. People seated at a table with water bottles, with a Cursor banner behind them.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/11-screen-atrevete.webp",
        alt: "Ai Labs event in San Salvador. A person standing beside a black screen that reads “Atrévete a construir”.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/14-purple-seats.webp",
        alt: "Ai Labs event in San Salvador. In purple seats, a person with a microphone points to a laptop someone else is holding.",
        width: 1200,
        height: 802,
      },
      {
        src: "/events/community/15-meetup-card.webp",
        alt: "Ai Labs event in San Salvador. A hand holds a card that reads “Grok Bot San Salvador Meetup”, with the audience behind.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/16-bookstore-laptops.webp",
        alt: "Ai Labs event in San Salvador. People with laptops around a table, next to bookshelves and a mural.",
        width: 1200,
        height: 676,
      },
      {
        src: "/events/community/17-window-laptops.webp",
        alt: "Ai Labs event in San Salvador. Three people work on laptops beside a window with wet glass.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/18-cursor-banner-hall.webp",
        alt: "Ai Labs event in San Salvador. Four people pose next to a vertical Cursor banner, in a glass-lined hallway.",
        width: 1200,
        height: 800,
      },
    ],
  },
}
