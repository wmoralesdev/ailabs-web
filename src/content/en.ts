import { eventsPhotosEn } from "./events-photos"
import { legalEn } from "./legal-en"
import type { SiteContent } from "./types"
import { servicePagesEn } from "./service-pages-en"

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "Ai Labs · Automation, software and AI for companies",
    description:
      "We are an AI company in El Salvador. We automate processes, build custom software and train teams. Book a 30-minute diagnostic.",
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
            {
              label: "Brand guidelines",
              href: "/brand",
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
      label: "We are members of the community programs of",
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
      body: "Being members gives us a direct line to their teams, training from them, early access to what's next, and better judgment to guide those who use them.",
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
          link: "See automation",
        },
        {
          id: "consulting",
          title: "AI diagnostic",
          body: "In one session we review your process and pick where to start.",
          link: "See the diagnostic",
        },
        {
          id: "training",
          title: "Training for teams",
          body: "From a four-hour Learning Day to a multi-day bootcamp, built on the team's real work.",
          link: "See training",
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
        body: "Two questions when you book: what you want to talk about and your company.",
      },
      {
        title: "See you there",
        body: "We send the invitation to your email with the link.",
      },
    ],
    embedTitle: "Ai Labs booking",
    booker: {
      previousMonth: "Previous month",
      nextMonth: "Next month",
      eventTitle: "AI diagnostic",
      durationLabel: "30 minutes",
      locationLabel: "Google Meet",
      timesTitle: "Available times",
      hourFormatLabel: "Time format",
      hour12Label: "12 h",
      hour24Label: "24 h",
      loading: "Loading times",
      pickDay: "Pick a day to see the times.",
      noTimes: "No times this month. Try the next one.",
      timeZoneLabel: "Times in",
      loadError: "We could not load the calendar.",
      retry: "Try again",
      changeTime: "Change time",
      nameLabel: "Your name",
      namePlaceholder: "First and last name",
      emailLabel: "Your email",
      emailPlaceholder: "name@company.com",
      companyLabel: "Your company",
      companyPlaceholder: "Company name",
      topicLabel: "What would you like to talk about?",
      topics: {
        automatizacion: "Automate a process or build software",
        consultoria: "Find out where to start with AI",
        capacitacion: "Train my team",
        indeciso: "Not sure yet",
      },
      notesLabel: "Which process takes up your time? (optional)",
      notesPlaceholder: "Two lines are enough.",
      submit: "Confirm diagnostic",
      submitting: "Booking",
      rejected: "That time is no longer available. Pick another.",
      failed: "We could not book it. Try again in a moment.",
      confirmedTitle: "All set, see you there",
      confirmedBody: "We sent the invitation with the video call link to",
      manage: "View or change the booking",
    },
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
      "Workshops and events to learn AI in El Salvador, organized by Ai Labs since 2025. We publish upcoming ones on Luma and announce them on WhatsApp.",
    breadcrumbHome: "Home",
    label: "Events",
    headline: "AI workshops and events in San Salvador",
    intro:
      "Workshops, coffee chats and meetups to learn AI, since 2025. Dates go up on Luma, but you hear about them first on WhatsApp.",
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
      "No date yet for the next one. When we have it, it goes to the WhatsApp group first.",
    monthEmpty: "We did not publish any events on Luma in {month}.",
    photosLabel: "Photos from our events",
    photosCaption: "Credit: Ai Labs. Photos from our events in San Salvador.",
    pausePhotos: "Pause photos",
    playPhotos: "Resume photos",
    photos: eventsPhotosEn,
    communityTitle: "WhatsApp community",
    communityBody:
      "We announce every workshop there before social media, and joining is free.",
    communityCta: "Join on WhatsApp",
    communityHint: "WhatsApp opens and may ask for approval.",
    bridgeTitle: "Want a workshop like this with your team?",
    bridgeCta: "Book a 30-minute diagnostic",
  },
  community: {
    metaTitle: "AI community in El Salvador",
    metaDescription:
      "Learn AI in El Salvador with our community: a free WhatsApp group where we announce workshops and meetups before we post them on social media.",
    label: "Community",
    headline: "Learn AI with the Ai Labs community",
    lead: "A WhatsApp group to talk and a channel where we announce workshops and meetups before we post them on social media. Joining is free.",
    joinCta: "Join the community",
    channelCta: "Join the announcements channel",
    joinHint: "WhatsApp opens. The group may ask for approval.",
    eventsCta: "See events",
    qrCta: "Show QR",
    qrTitle: "Scan to join",
  },
  brand: {
    metaTitle: "Brand guidelines and logo",
    metaDescription:
      "Download the Ai Labs logo as SVG and learn our colors, typefaces and the rules for showing and writing the brand the right way.",
    label: "Brand",
    headline: "Ai Labs brand guidelines",
    lead: "The logo, the colors, the typefaces and how we write. What you need to show Ai Labs in an article, a presentation or an event.",
    kitCta: "Download the kit",
    kitNote: "A ZIP with the logotype, the symbol and the icon as SVG.",
    logoCta: "See the logo",
    logo: {
      title: "Logo",
      body: "Always use the original files. The logotype is the default; the symbol alone, when space is tight.",
      lockup: {
        name: "Logotype",
        body: "The symbol and the name together. It is the default version.",
      },
      mark: {
        name: "Symbol",
        body: "For the favicon, avatars and small spaces near the name.",
      },
      icon: {
        name: "App icon",
        body: "The symbol on its tile. For profiles and apps.",
      },
      backgroundLabel: "Background",
      onLight: "Light background",
      onDark: "Dark background",
      download: "Download SVG",
      copy: "Copy SVG",
      copied: "SVG copied",
      copyFailed: "Could not copy",
    },
    misuse: {
      title: "How not to use the logo",
      body: "The logo works as it comes. These are the changes we see most, and they break it.",
      items: [
        "Do not stretch or squash it",
        "Do not rotate it",
        "Do not change its colors",
        "Do not add shadows",
        "Do not place it on low contrast",
        "Do not crop it",
      ],
    },
    color: {
      title: "Color",
      body: "Violet to accent, graphite and snow to read. These are the site values in its light theme.",
      swatches: [
        {
          name: "Violet",
          hex: "#614AFC",
          role: "Buttons, links and accents. Never the background of every section.",
        },
        {
          name: "Graphite",
          hex: "#16131F",
          role: "Text on light backgrounds.",
        },
        {
          name: "Snow",
          hex: "#F5F4F8",
          role: "Light theme paper and text on dark.",
        },
        {
          name: "Night",
          hex: "#0F0D17",
          role: "Dark bands that do not change with the theme.",
        },
        {
          name: "Lilac",
          hex: "#D6CFFD",
          role: "Soft paper under photos and in details.",
        },
        {
          name: "Sheet",
          hex: "#1E1E22",
          role: "The footer, the same in both themes.",
        },
      ],
      logoTitle: "The logo inks",
      logoBody:
        "The logotype and the symbol carry their own inks, different from the site's. Use the file as it comes.",
      logoInks: [
        {
          name: "Logo violet",
          hex: "#8B7BC7",
          role: "The dot and “Ai”, on any background.",
        },
        {
          name: "Logo grey",
          hex: "#303030",
          role: "The rest, on a light background.",
        },
        {
          name: "Logo light",
          hex: "#EDEDED",
          role: "The rest, on a dark background.",
        },
      ],
      copy: "Copy",
      copied: "Copied",
      copyFailed: "Could not copy",
    },
    type: {
      title: "Typography",
      body: "Two free families from Google Fonts: Plus Jakarta Sans for headlines and DM Sans for everything else.",
      fonts: [
        {
          name: "Plus Jakarta Sans",
          role: "Headlines. Weight 600, tight tracking.",
          sample: "We automate the work that repeats",
          href: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
        },
        {
          name: "DM Sans",
          role: "Text, buttons and interface. Weights 400 and 600.",
          sample:
            "Book a 30-minute diagnostic and tell us how your team works today.",
          href: "https://fonts.google.com/specimen/DM+Sans",
        },
      ],
      linkLabel: "See on Google Fonts",
    },
    halftone: {
      title: "Halftone",
      body: "The dot is our signature. We print the symbol, the icons and the program marks as a dot screen.",
      rules: [
        "It is an accent: one element per block, never a background for everything.",
        "Photos stay photos. We never turn them into dots.",
        "It moves when you touch it. Only the opening symbol moves on its own.",
      ],
    },
    imagery: {
      title: "Photography",
      body: "Real Ai Labs photos, only where people are the point: workshops, events and teams at work.",
      useLabel: "We use",
      avoidLabel: "We avoid",
      use: [
        "Real photos of our workshops and events",
        "People working with their own tools",
        "Natural light and unposed framing",
      ],
      avoid: [
        "Robots, neon brains or server rooms",
        "Gradients that say “AI” without showing anything",
        "Stock photos of people posing",
      ],
    },
    voice: {
      title: "How we write",
      body: "In the first person plural. Direct, concrete and with no promises we cannot show.",
      writeLabel: "We write",
      avoidLabel: "We avoid",
      rows: [
        { write: "Ai Labs", avoid: "AI Labs, AiLabs, Ailabs, AI-Labs" },
        {
          write: "We are, we build, book, tell us",
          avoid: "“Ai Labs does”, the company",
        },
        {
          write: "Members of the community programs",
          avoid: "Ambassadors, official partners",
        },
        {
          write: "Scope and quote before we start",
          avoid: "Prices, “fixed price”, fixed timelines",
        },
        {
          write: "More than 60 AI events since 2025",
          avoid: "Unconfirmed metrics, “leaders”, “#1”",
        },
        {
          write: "One idea per sentence, with a period",
          avoid: "Long dashes as connectors",
        },
      ],
    },
    usage: {
      title: "Using the brand",
      items: [
        "You can use the logo to talk about Ai Labs, one of our events or work we did together.",
        "Do not use it to suggest that we endorse you or that we are partners when we are not.",
        "Do not merge it with another logo into one sign or put it on products for sale.",
      ],
    },
  },
}
