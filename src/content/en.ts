import { eventsPhotosEn } from "./events-photos"
import { legalEn } from "./legal-en"
import type { SiteContent } from "./types"
import { servicePagesEn } from "./service-pages-en"

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "Ai Labs · Automation, software and AI for companies",
    description:
      "AI automation and custom software for companies in El Salvador, and training for the teams that run them. Book a 30-minute diagnostic.",
  },
  chrome: {
    nav: {
      services: {
        label: "Services",
        items: [
          {
            label: "Automation and software",
            href: "/automatizacion-ia-el-salvador",
          },
          {
            label: "AI diagnostic",
            href: "/consultoria-de-ia-el-salvador",
          },
          {
            label: "Training for teams",
            href: "/capacitacion-ia-el-salvador",
          },
        ],
      },
      events: {
        label: "Events",
        href: "/events",
      },
      contact: {
        label: "Book a diagnostic",
        href: "/agendar",
      },
    },
    footer: {
      brandLine:
        "Automation, custom software and AI training for companies in El Salvador.",
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
              label: "Automation and software",
              href: "/automatizacion-ia-el-salvador",
            },
            {
              label: "AI diagnostic",
              href: "/consultoria-de-ia-el-salvador",
            },
            {
              label: "Training for teams",
              href: "/capacitacion-ia-el-salvador",
            },
            {
              label: "How we work",
              href: "#metodo",
            },
          ],
        },
        {
          title: "Ai Labs",
          links: [
            {
              label: "Workshops and events",
              href: "/events",
            },
            {
              label: "Book a diagnostic",
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
      locationLine: "Made in San Salvador, El Salvador",
      socialTitle: "Social",
    },
  },
  microcopy: {
    primaryNavigation: "Primary navigation",
    loading: "Loading…",
    notFoundTitle: "That page doesn't exist",
    notFoundBody: "Go back to the home page or book a diagnostic.",
    notFoundCtaHome: "Go to home",
    notFoundCtaBooking: "Book a diagnostic",
    languageSwitch: "ES",
    skipToContent: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    themeCycle: "Change color theme",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    themeToSystem: "Switch to system theme",
  },
  home: {
    hero: {
      label: "Ai Labs · San Salvador",
      headline: "Less manual work in your company. More control.",
      lead: "We design and implement automations and custom software for companies in El Salvador, and prepare your team to run them without depending on us.",
      primaryCta: { label: "Book a 30-minute diagnostic", href: "/agendar" },
      secondaryCta: { label: "See how we work", href: "#metodo" },
    },
    ambassadors: {
      label: "Ambassadors for",
      logos: [
        { id: "spacexai", name: "SpaceXAI" },
        { id: "openai", name: "OpenAI" },
        { id: "codex", name: "Codex" },
        { id: "mistral", name: "Mistral" },
        { id: "elevenlabs", name: "ElevenLabs" },
        { id: "notion", name: "Notion" },
      ],
      partnersLabel: "and we work with",
      partners: [{ id: "claude", name: "Claude" }],
      body: "Being ambassadors gives us a direct line to their teams, training from them, early access to what's next, and better judgment to guide those who use them.",
      stat: { value: "Over 60", label: "AI events since 2025" },
    },
    offers: {
      label: "What we do",
      title: "Three ways to work with us",
      intro: "All of them start with a 30-minute diagnostic.",
      items: [
        {
          id: "automation",
          title: "Automation and custom software",
          body: "We connect your tools, automate the repetitive work and build what's missing.",
          examples: "Reports, sales follow-up, quotes, invoicing, inventory.",
          link: "See how it works",
        },
        {
          id: "consulting",
          title: "AI diagnostic",
          body: "In one session we review your process and pick where to start.",
          link: "See how it works",
        },
        {
          id: "training",
          title: "Training for teams",
          body: "From a four-hour Learning Day to a multi-day bootcamp, built on the team's real work.",
          link: "See how it works",
        },
      ],
    },
    method: {
      label: "How we work",
      title: "The process before the tool",
      body: "We start by understanding how the work gets done today. Then we agree on the scope and the quote with you before touching anything.",
      steps: [
        {
          title: "Understand",
          body: "We review how the work gets done today, who is involved and where it gets stuck.",
        },
        {
          title: "Prioritize",
          body: "We pick one improvement worth making and agree on the scope.",
        },
        {
          title: "Implement",
          body: "We build, integrate and leave the team running it, with documentation.",
        },
      ],
    },
    faq: {
      title: "What people usually ask us",
      items: [
        {
          question: "How much does it cost?",
          answer:
            "The 30-minute diagnostic is free. After that we give you the scope and the quote before starting.",
        },
        {
          question: "Does my team need to know how to code?",
          answer:
            "No. We work with sales, operations and administrative teams. What we build is run from the tools they already use.",
        },
        {
          question: "What happens to our data?",
          answer:
            "Your data stays in your own accounts and tools. Before starting, we agree in writing on what information we touch and what we don't.",
        },
        {
          question: "How long does it take?",
          answer:
            "The diagnostic, 30 minutes. The rest depends on the process and the integrations. We give you an estimate in the diagnostic.",
        },
        {
          question: "What happens when you're done?",
          answer:
            "Your team keeps running it, with documentation and access to everything we did. If you want, we agree on support tailored to the tool.",
        },
      ],
    },
    booking: {
      title: "Book a 30-minute diagnostic",
      body: "Tell us which process takes up your time. You leave the session with a concrete recommendation, whether you hire us or not.",
      display: "Book.",
      cta: "Pick a date and time",
      whatsappCta: "Message us on WhatsApp",
    },
  },
  servicePages: servicePagesEn,
  booking: {
    metaTitle: "Book a 30-minute diagnostic",
    metaDescription:
      "Pick a date and time for a 30-minute diagnostic with Ai Labs. Tell us which process takes up your time and leave with a concrete recommendation.",
    label: "Booking",
    headline: "Book a 30-minute diagnostic",
    body: "Tell us which process takes up your time. You leave the session with a concrete recommendation, whether you hire us or not.",
    stepsLabel: "How it works",
    steps: [
      {
        title: "Pick a date and time",
        body: "Thirty minutes by video call, at the time that works best for you.",
      },
      {
        title: "Tell us about your process",
        body: "Two questions when you book: your company and what you want to review.",
      },
      {
        title: "See you there",
        body: "We send the invitation to your email with the link.",
      },
    ],
    embedTitle: "Ai Labs booking",
    embedPending:
      "The online calendar is about to open. In the meantime, message us.",
    altTitle: "Prefer to message us?",
    whatsappCta: "Message us on WhatsApp",
    whatsappHint: "WhatsApp opens a chat with us.",
  },
  legal: legalEn,
  events: {
    metaTitle: "AI workshops and events in San Salvador | Ai Labs",
    metaDescription:
      "AI workshops, coffee chats and meetups in San Salvador organized by Ai Labs. We publish upcoming ones on Luma and announce them in our WhatsApp community.",
    breadcrumbHome: "Home",
    label: "Events",
    headline: "AI workshops and events in San Salvador",
    intro:
      "Since 2025 we've organized AI workshops, coffee chats and meetups. The upcoming ones are on Luma and we announce them on WhatsApp.",
    calendarLabel: "See the calendar",
    tracks: [
      {
        title: "For teams and leaders",
        body: "Executive breakfasts, masterclasses and demo days where you see automations working.",
      },
      {
        title: "For builders",
        body: "Labs, meetups and hackathons with the tools we use every day.",
      },
    ],
    upcomingLabel: "Upcoming",
    pastLabel: "Past",
    lumaLabel: "View on Luma",
    newTabLabel: "Opens in a new tab.",
    upcomingEmpty:
      "No upcoming event yet. We announce the next one on WhatsApp.",
    monthEmpty: "We did not publish any events on Luma in {month}.",
    photosLabel: "Photos from our events",
    photosCaption: "Credit: Ai Labs. Photos from our events in San Salvador.",
    pausePhotos: "Pause photos",
    playPhotos: "Resume photos",
    photos: eventsPhotosEn,
    communityTitle: "WhatsApp community",
    communityBody:
      "That's where we announce every workshop before social media. Joining is free.",
    communityCta: "Join on WhatsApp",
    communityHint: "WhatsApp opens and may ask for approval.",
    bridgeTitle: "Want this inside your company?",
    bridgeCta: "Book a 30-minute diagnostic",
  },
}
