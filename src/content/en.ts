import { homeCarousel } from "./home-carousel"
import type { SiteContent } from "./types"

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "Ai Labs: Adapt, develop, and learn with AI",
    description:
      "Ai Labs helps companies put AI to work through training, software, and community. Based in El Salvador.",
  },
  chrome: {
    nav: {
      home: { label: "Home", href: "/" },
      pillars: [
        { id: "academy", label: "Academy", href: "#academy" },
        { id: "agentic", label: "Agentic", href: "#agentic" },
        { id: "aperture", label: "Aperture", href: "#aperture" },
      ],
      community: { label: "Community", href: "/community" },
      campusLeader: { label: "Campus Leaders", href: "/campus-leader" },
      contact: { label: "Contact", href: "#contact" },
      cta: { label: "Talk to us", href: "#contact" },
    },
    footer: {
      brandLine:
        "Ai Labs helps companies adapt, develop, and learn with AI.",
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
          title: "Pillars",
          links: [
            { label: "Academy", href: "#academy" },
            { label: "Agentic", href: "#agentic" },
            { label: "Aperture", href: "#aperture" },
          ],
        },
        {
          title: "Programs",
          links: [
            { label: "Community", href: "/community" },
            { label: "Campus Leader", href: "/campus-leader" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "Contact", href: "#contact" },
            { label: "ailabs.sv", href: "https://ailabs.sv" },
          ],
        },
      ],
      copyright: "© {year} Ai Labs",
      locationLine: "Crafted in San Salvador, El Salvador",
    },
  },
  microcopy: {
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
      label: "For companies and builders",
      headline: "AI your team actually uses",
      body: "Ai Labs is an AI company based in El Salvador. We teach teams to work with AI, build the software they need, and connect them to the people already doing it.",
      primaryCta: { label: "Talk to us", href: "#contact" },
      secondaryCta: { label: "See the pillars", href: "#academy" },
      proof: { value: "800+", label: "Builders" },
      slides: [
        { value: "800+", label: "Builders", icon: "builders" },
        { value: "40+", label: "Events hosted", icon: "events" },
        { value: "8", label: "Active partners", icon: "partners" },
      ],
      mediaSrcs: homeCarousel.hero,
      mediaAlt: "Ai Labs community session",
    },
    trust: {
      label: "Partners we run programs with",
      logos: [
        { id: "cursor", name: "Cursor" },
        { id: "codex", name: "Codex" },
        { id: "openai", name: "OpenAI" },
        { id: "claude", name: "Claude" },
        { id: "mistral", name: "Mistral" },
        { id: "elevenlabs", name: "ElevenLabs" },
        { id: "notion", name: "Notion" },
      ],
    },
    about: {
      label: "Why companies call us",
      body: "Most teams have already tried the tools on their own. We stay until the tools change how the team works day to day.",
      stats: [
        { value: "40+", label: "Events hosted" },
        { value: "8", label: "Active partners" },
      ],
      bold: "Your team learns on your own work, and what we build together stays yours to run after we leave.",
      bridgeLabel: "Where to start",
      bridge: [
        {
          title: "Academy",
          body: "Trainings, bootcamps, residencies.",
        },
        { title: "Agentic", body: "Products and workflows." },
        {
          title: "Aperture",
          body: "Partners and community.",
        },
      ],
      mediaSrcs: homeCarousel.about,
      mediaAlt: "Builders collaborating at an Ai Labs event",
      toastTitle: "Session in progress",
      toastMeta: "El Salvador",
    },
    academy: {
      id: "academy",
      index: "01",
      eyebrow: "Hands-on training",
      title: "Academy",
      lead: "Trainings, bootcamps, and residencies where your team spends the whole session building.",
      points: [
        {
          title: "For your team",
          body: "Company programs so adoption isn't left to a few champions.",
        },
        {
          title: "As a consultancy",
          body: "We scope and run the whole program with you.",
        },
        {
          title: "Open sessions",
          body: "Public workshops and bootcamps if you're learning on your own.",
        },
      ],
      cta: { label: "Train my team", href: "#contact" },
      mediaSrcs: homeCarousel.features,
      mediaAlt: "Hands-on workshop at Ai Labs",
    },
    agentic: {
      id: "agentic",
      index: "02",
      eyebrow: "Software and AI workflows",
      title: "Agentic",
      lead: "We build the product or workflow you need and ship it to production with your team.",
      points: [
        {
          title: "Software products",
          body: "From first version to production, shaped around your problem.",
        },
        {
          title: "AI workflows",
          body: "Automation that fits how your team already works.",
        },
        {
          title: "How we build",
          body: "We build with the same tools we teach in Academy.",
        },
      ],
      cta: { label: "Scope a build", href: "#contact" },
      process: {
        label: "How an Agentic build runs",
        steps: [
          {
            label: "Scope the build",
            body: "What’s in, what’s out, what done means.",
            glyph: "brief",
          },
          {
            label: "Build together",
            body: "Your team in the room while we write it.",
            glyph: "bench",
          },
          {
            label: "Ship it live",
            body: "In your environment, not a demo.",
            glyph: "live",
          },
        ],
      },
    },
    aperture: {
      id: "aperture",
      index: "03",
      eyebrow: "Partners and community",
      title: "Aperture",
      lead: "Events, workshops, and a WhatsApp group where 800+ builders and our partner companies end up in the same room.",
      voices: [
        {
          quote: "I learn by building.",
          name: "Cristina, CFO at YonJob",
          role: "Builder",
        },
        {
          quote: "Workshops, mentors, and people who show up.",
          name: "Cristian, Software Engineer",
          role: "Academy",
        },
        {
          quote: "Good people, real events, and a shared love for tech.",
          name: "Kharen, Design Student",
          role: "Aperture",
        },
      ],
      eventsLabel: "In the room so far",
      upcomingLabel: "Coming up",
      nextLabel: "Next",
      seriesLabel: "Recurring series",
      attendanceLabel: "builders",
      events: [
        {
          id: "hack0-q2my",
          name: "The Next Craft",
          upcoming: { date: "2026-08-29", href: "https://luma.com/hack0-q2my" },
        },
        {
          id: "tm16k0kj",
          name: "Cursor Buildathon 24h",
          venue: "Universidad Francisco Gavidia",
          attendance: 208,
        },
        {
          id: "yzoilzlq",
          name: "OpenAI Build Week",
          venue: "Presidente Plaza",
        },
        {
          id: "hack0-4d2s",
          name: "Code Brew El Salvador",
          venue: "Presidente Plaza",
        },
        {
          id: "625ptozh",
          name: "Codex Community Build Meetup",
          venue: "Presidente Plaza",
        },
        {
          id: "cursor-cowork",
          name: "Cursor Cowork",
          venue: "San Salvador",
          series: true,
        },
        {
          id: "cursor-lab",
          name: "Cursor Lab",
          venue: "University campuses",
          series: true,
        },
        {
          id: "zero-to-agent",
          name: "Zero to Agent",
          venue: "San Salvador and Guatemala",
          series: true,
        },
      ],
      stat: { value: "800+", label: "Builders in the community" },
      quote:
        "We work directly with the companies behind the tools we teach. Aperture is where that shows up as events, workshops, and introductions.",
      attribution: "Ai Labs",
      cta: { label: "Join the community", href: "/community" },
      partnerCta: { label: "Partner with us", href: "#contact" },
    },
    contact: {
      title: "How can we help?",
      lead: "Tell us what you want to learn, improve or explore. You don’t need to have a solution in mind.",
      cta: "Let’s talk",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      companyLabel: "Company (optional)",
      companyPlaceholder: "Your company or organization",
      interestLabel: "What brings you here?",
      interestOptions: [
        {
          value: "discovery",
          label: "Find where AI can help",
        },
        {
          value: "enablement",
          label: "Learn or train my team",
        },
        {
          value: "implementation",
          label: "Improve or automate a process",
        },
        {
          value: "partnership",
          label: "Explore a partnership",
        },
      ],
      messageLabel: "Tell us a little more",
      messagePlaceholder:
        "What would you like to learn, change or work on together?",
      submit: "Send inquiry",
      submitting: "Sending…",
      success: "We received your inquiry. We’ll be in touch.",
      error:
        "We couldn’t save your inquiry. Your message is still here; please try again.",
      closeLabel: "Close",
      rateLimited:
        "We received several inquiries. Please try again in an hour.",
      invalid: "Check your details and try again.",
    },
  },
  redeem: {
    metaTitle: "Redeem credits",
    eventLabel: "Event",
    howItWorksLabel: "How it works",
    steps: [
      { title: "Sign in", body: "Use your event email" },
      { title: "Get verified", body: "We check the guest list" },
      { title: "Copy your code", body: "Redeem in seconds" },
    ],
    poweredBy: "An Ai Labs event",
    signInPrompt:
      "Sign in with the same email you used to register for this event.",
    signInCta: "Sign in to claim",
    claimCta: "Claim credits",
    claiming: "Claiming…",
    signedInAs: "Signed in as {email}",
    signOutCta: "Sign out",
    yourCode: "Your code",
    yourCodes: "Your codes",
    alreadyRedeemed: "You already claimed these credits for this event.",
    copyCode: "Copy",
    copied: "Copied",
    openCode: "Open",
    invalidTitle: "Link not found",
    invalidBody:
      "This redeem link is invalid. Check the URL from your event host.",
    inactiveTitle: "Redemption closed",
    inactiveBody: "This event is no longer accepting credit claims.",
    notEligibleTitle: "Email not on the list",
    notEligibleBody:
      "Your signed-in email isn't registered for this event. Use the email from your Luma registration.",
    soldOutTitle: "Codes unavailable",
    soldOutBody:
      "All codes for this event have been claimed. Contact the event host.",
    noVerifiedEmailTitle: "Verify your email",
    noVerifiedEmailBody:
      "Your account needs a verified email before you can claim credits.",
    missingCodeTitle: "Missing code",
    missingCodeBody: "Open the full redeem link that includes ?code=…",
    qrCta: "QR",
    qrTitle: "Scan to open",
    qrBody: "Scan this code to open this page on another device.",
    poolLabels: {
      CURSOR: "Cursor",
      CODEX: "Codex",
      OPENAI: "OpenAI Platform",
    },
    products: {
      cursor: {
        title: "Cursor credits",
        blurb: "Claim your Cursor promo code from this Ai Labs event.",
      },
      codex: {
        title: "Codex credits",
        blurb: "Claim your Codex promo code from this Ai Labs event.",
      },
      openai: {
        title: "OpenAI Platform credits",
        blurb: "Claim your OpenAI Platform promo code from this Ai Labs event.",
      },
      codexOpenai: {
        title: "Codex + OpenAI Platform credits",
        blurb:
          "Claim both your Codex and OpenAI Platform promo codes from this event.",
      },
    },
  },
  community: {
    metaTitle: "Join the community",
    metaDescription:
      "Ai Labs WhatsApp community in El Salvador: events, workshops, and builders.",
    label: "Community",
    headline: "Join the Ai Labs WhatsApp community",
    body: "The day-to-day channel for events, workshops, and people building with AI.",
    joinPrompt: "Free to join.",
    joinCta: "Join on WhatsApp",
    joinHint: "Opens WhatsApp · request may need approval",
    joinHref: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
    howItWorksLabel: "How it works",
    steps: [
      { title: "Open the invite", body: "Tap Join on WhatsApp" },
      { title: "Request to join", body: "WhatsApp may ask to approve you" },
      { title: "Say hello", body: "Introduce yourself and follow along" },
    ],
    qrCta: "QR",
    qrTitle: "Scan to open",
    qrBody: "Scan this code to open this page on another device.",
  },
  campusLeader: {
    metaTitle: "Campus Leader",
    metaDescription:
      "Apply as an Ai Labs Campus Leader. One leader per university on campuses in El Salvador.",
    label: "Campus Leader",
    headline: "Be the leader at your university",
    body: "One leader per university, with official recognition and a say in which workshops reach your campus. Read how it works, then apply in three steps.",
    creditsNote:
      "Accepted leaders get credits for the tools we work with. Amounts stay between us.",
    cohort: "aster",
    cohortDisplay: "Aster",
    cohortLabel: "Cohort",
    applicationsOpen: true,
    closedTitle: "Cohort Aster is closed",
    closedBody: "The next cohort will show up here.",
    applyCta: "Apply",
    learnCta: "How it works",
    media: {
      whatSrc: homeCarousel.campusLeader[0],
      whatAlt: "Students collaborating on laptops during an Ai Labs session",
      benefitsSrcs: homeCarousel.campusLeader,
      benefitsAlt: "A participant working at an Ai Labs workshop desk",
    },
    landing: {
      what: {
        label: "The program",
        title: "What it is",
        body: "Ai Labs on campus: one leader per university in El Salvador, chosen by cohort.",
        items: [
          {
            title: "Any career",
            body: "Engineering, Design, Marketing, Economics. Not a technical seat, and your career doesn’t decide the seat.",
          },
          {
            title: "One per university",
            body: "A single leader per campus. It’s your university’s seat inside Ai Labs, not a seat per faculty.",
          },
          {
            title: "Cohort Aster",
            body: "Applications open in windows. We review every application and reply on WhatsApp.",
          },
        ],
      },
      role: {
        label: "The role",
        title: "What a Campus Leader does",
        items: [
          {
            title: "You represent your university",
            body: "You’re the contact point between your campus and Ai Labs.",
          },
          {
            title: "You pick which workshop lands",
            body: "You tell us what your campus needs and when it’s ready.",
          },
          {
            title: "You open the session",
            body: "You present to your peers. We bring the content; you run the room, invites, and check-in.",
          },
        ],
      },
      benefits: {
        label: "The exchange",
        title: "What you get",
        items: [
          {
            title: "Official recognition",
            body: "Name, photo, campus, and bio in the Ai Labs leader directory. Ships with the cohort.",
          },
          {
            title: "Access to closed events",
            body: "A leaders-only session each cohort, plus first access to public sessions.",
          },
          {
            title: "Tools and channels",
            body: "Credits for the tools we provide, and the private group with the team and other leaders.",
          },
          {
            title: "A say in programming",
            body: "You pick which workshops reach your campus: Cursor Labs, Codex workshops, ElevenCreative.",
          },
        ],
      },
      fit: {
        label: "Fit",
        title: "Who this is for",
        forTitle: "Yes if you",
        forItems: [
          "Study at a campus in El Salvador",
          "Can represent your whole university, not just your career",
          "Will help fill a room when a session lands",
          "Want the role and the session that backs it",
        ],
        notTitle: "Skip if you",
        notItems: [
          "Study where your university already has a leader this cohort",
          "Want the credential without running the session",
          "Need a remote-only role we can’t visit",
        ],
      },
      ctaBand: {
        title: "Ready for Cohort Aster?",
        body: "Three steps. About ten minutes if you already know your campus story.",
        applyCta: "Start application",
      },
    },
    formTitle: "Your application",
    formStepLabel: "Step {current} of {total}",
    formNext: "Continue",
    formBack: "Back",
    formClose: "Close",
    formOptional: "Optional",
    formRequired: "Required",
    logisticsLabel: "Basics",
    logisticsIntro: "Who you are and where you’d represent Ai Labs.",
    deeperLabel: "Who you are",
    deeperIntro: "A bit past the résumé line: how you show up with peers and AI.",
    roomLabel: "When the room goes quiet",
    roomIntro: "How you’d actually get people in seats.",
    fields: {
      name: { label: "Name", placeholder: "John Doe" },
      email: {
        label: "Email",
        placeholder: "john.doe@university.edu",
        helper: "One you’ll actually check",
      },
      whatsapp: {
        label: "WhatsApp",
        placeholder: "7845 2310",
        helper: "8 digits, El Salvador number",
      },
      instagram: {
        label: "Instagram",
        placeholder: "https://instagram.com/yourhandle",
        helper: "Profile link — how we find you on campus",
        skipLabel: "I don’t have Instagram",
      },
      linkedin: {
        label: "LinkedIn",
        placeholder: "https://linkedin.com/in/yourname",
      },
      x: {
        label: "X",
        placeholder: "https://x.com/yourhandle",
      },
      campus: {
        label: "University / campus",
        placeholder: "UCA, Antiguo Cuscatlán",
        helper: "El Salvador only for Cohort Aster",
      },
      career: {
        label: "Career",
        placeholder: "Select a career",
        helper: "So we know you. It doesn’t decide the seat.",
      },
      year: {
        label: "Year",
        placeholder: "Select year",
      },
      bio: {
        label: "Short bio",
        placeholder:
          "I run the design club chat and end up organizing every group project.",
        helper: "This can go on the site. Name + campus + this text.",
      },
      reach: {
        label: "Where do people on your campus already hear from you?",
        placeholder:
          "I post every week in my engineering class group, we’re about 240.",
        helper:
          "Club chat, class group, lab, or “I’m still building that.” Either is fine.",
      },
      aiToday: {
        label:
          "What’s your honest level with AI today, and what do you want your campus to get out of a session?",
        placeholder:
          "I only use ChatGPT for homework, and I want my campus to see what else it does.",
      },
      whyLeader: {
        label: "Why Campus Leader instead of just hanging in the community?",
        placeholder:
          "Nobody brings this to my university, and I’d rather run it than wait for it.",
      },
      quietRoom: {
        label:
          "Session starts in 10 minutes. Half the room is on their phones. What do you do?",
        placeholder:
          "I’d have them close the laptop and open the tool on their phone first.",
      },
      inviteMessage: {
        label:
          "Write the message you’d send to get people from your campus into a session.",
        placeholder:
          "Saturday 9am in B-12. Bring a laptop, we build something in two hours.",
      },
      roomPlan: {
        label:
          "How would you get a room and about 20 people from your campus for a Saturday session?",
        placeholder:
          "I’d ask the coordinator for the lab, post in three class chats, confirm names a week out.",
      },
      sessionPrefs: {
        label: "Which sessions would your campus show up for?",
      },
      notes: {
        label: "Anything we should know before we say yes or no?",
        placeholder:
          "I already have the auditorium booked for two Saturdays in September.",
      },
    },
    careerOptions: [
      { value: "sistemas", label: "Engineering / Computing" },
      { value: "diseno", label: "Design" },
      { value: "marketing", label: "Communications / Marketing" },
      { value: "negocios", label: "Economics / Business / Admin" },
      { value: "sociales", label: "Social sciences / Law" },
      { value: "otra", label: "Other (specify in notes)" },
    ],
    yearOptions: [
      { value: "1", label: "1st year" },
      { value: "2", label: "2nd year" },
      { value: "3", label: "3rd year" },
      { value: "4", label: "4th year" },
      { value: "5-plus", label: "5th year or beyond" },
      { value: "grad", label: "Recent grad" },
    ],
    sessionPrefOptions: [
      { value: "cursor-labs", label: "Cursor Labs" },
      { value: "codex", label: "Codex workshops" },
      { value: "elevencreative", label: "ElevenCreative" },
      { value: "surprise", label: "Surprise us" },
    ],
    careerHint:
      "If your university already has a leader this cohort, we waitlist or defer you to the next one.",
    submit: "Send application",
    submitting: "Sending…",
    success:
      "Got it. We’ll review for Cohort Aster and reply on WhatsApp.",
    error: "Something went wrong. Try again in a moment.",
    stepIncomplete: "Fill the required fields on this step to continue.",
    invalidLink: "Use a full link that starts with https://",
    formCrashTitle: "The form hit an error",
    formRetry: "Start over",
    qrCta: "QR",
    qrTitle: "Scan to open",
    qrBody: "Scan this code to open this page on another device.",
  },
}
