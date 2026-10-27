import { homeCarousel } from "./home-carousel"
import { legalEn } from "./legal-en"
import type { SiteContent } from "./types"
import { servicePagesEn } from "./service-pages-en"

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "Ai Labs | AI consulting, automation and practical education",
    description:
      "AI consulting, business automation and practical education for teams and professionals. Crafted in San Salvador, El Salvador.",
  },
  chrome: {
    nav: {
      services: {
        label: "Services",
        href: "#services",
      },
      community: {
        label: "Community",
        items: [
          {
            label: "Join the community",
            href: "/community",
          },
          {
            label: "Events",
            href: "/events",
          },
          {
            label: "Campus Leaders",
            href: "/campus-leader",
          },
        ],
      },
      contact: {
        label: "Let’s talk",
        href: "#contact",
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
              label: "Practical education",
              href: "/capacitacion-ia-el-salvador",
            },
            {
              label: "Business automation",
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
              label: "Join the community",
              href: "/community",
            },
            {
              label: "Events",
              href: "/events",
            },
            {
              label: "Campus Leaders",
              href: "/campus-leader",
            },
          ],
        },
        {
          title: "Ai Labs",
          links: [
            {
              label: "Let’s talk",
              href: "#contact",
            },
            {
              label: "Explore a partnership",
              href: "#contact",
              contactInterest: "partnership",
            },
          ],
        },
      ],
      legalLinks: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
      ],
      eventsTitle: "Events",
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
    textSpiralAction: "Animate the text spiral",
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
        "Ai Labs is a private company in San Salvador, El Salvador, for AI consulting, automation, and practical education.",
      agencyQuestion: "Is there an AI agency in El Salvador?",
      body: "AI consulting, business automation and practical education for teams and professionals. Crafted in San Salvador, El Salvador.",
      primaryCta: { label: "Let’s talk", href: "#contact" },
      secondaryCta: { label: "Explore services", href: "#services" },
      spiralWords: [
        "Processes",
        "Teams",
        "Sales",
        "Operations",
        "Judgment",
        "Workflows",
        "Implementation",
        "Support",
      ],
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
          body: "Practical education for professionals and teams, built around the tasks you want to improve.",
          points: [
            "Practice with work you recognize.",
            "Learn when to use AI and how to review its output.",
            "Build skills you can use on your own.",
          ],
          cta: "I want to learn",
          interest: "enablement",
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
          interest: "implementation",
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
      body: "First, understand the work. For consulting and implementation, we start with the need and agree on a useful next step. You can also come directly to learn.",
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
            "An AI consultant looks at how a team works, finds where artificial intelligence can help, and decides where to start. At Ai Labs, once one concrete opportunity is prioritized, we prepare the team (Academy) or implement the workflow with you (Agentic).",
        },
        {
          question:
            "AI consultant, advisor, agency or company: what is the difference?",
          answer:
            "Ai Labs is a private AI consulting company in San Salvador, El Salvador. Whether you are looking for an AI consultant, advisor, agency or company, what matters is the outcome: understand the process, choose one improvement, and get ready to apply it. Ai Labs does consulting, business automation, and practical education.",
        },
        {
          question: "How much does AI consulting cost?",
          answer:
            "It depends on scope. Ai Labs does not publish consulting prices because we first review the process and agree on what is worth improving. Public workshops do list their price on their own page.",
        },
        {
          question: "Which processes can AI improve or automate?",
          answer:
            "Ai Labs works with commercial, management, and operations teams: repetitive tasks, follow-up, documents, and workflows across tools. We define what AI assists, what gets automated, and which decisions stay with people, with human review and documentation.",
        },
        {
          question: "Do I need a company to learn AI with Ai Labs?",
          answer:
            "No. Ai Labs Academy is practical education for professionals and teams. You can come directly to learn, with no company or prior consulting required.",
        },
        {
          question: "Where is Ai Labs?",
          answer:
            "Ai Labs is in San Salvador, El Salvador. The public workshops we have published are in person in San Salvador. The community is centered on training and teaching, and WhatsApp is how people hear about the sessions.",
        },
        {
          question:
            "Does Ai Labs sell access or credits for OpenAI, Claude or other tools?",
          answer:
            "No. Ai Labs takes part in ambassador programs for several AI tools. Those logos are not a customer list or a guarantee of access, credits, or partnerships.",
        },
        {
          question: "What is Aperture?",
          answer:
            "Aperture is the Ai Labs community. It is centered on training and teaching, it includes the Campus Leaders program for students, and you can learn AI with us. It is not a third commercial offer.",
        },
        {
          question: "How do I start working with Ai Labs?",
          answer:
            "Write to Ai Labs from “Let’s talk” and tell us what you want to improve or learn. A company is optional.",
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
      bold: "We choose a concrete path and leave your team with judgment, documentation, and the ability to operate it—not just a demonstration.",
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
      cta: { label: "Prepare my team", href: "#contact" },
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
      cta: { label: "Review a process", href: "#contact" },
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
  servicePages: servicePagesEn,
  consulting: {
    photo: {
      name: "13.webp",
      alt: "A participant listens closely during an Ai Labs session.",
    },
    metaTitle: "AI consulting in El Salvador",
    metaDescription:
      "Ai Labs is an AI consulting company in San Salvador, El Salvador.",
    label: "San Salvador, El Salvador",
    headline: "AI consulting in El Salvador",
    lead: "Ai Labs is an AI consulting company in San Salvador, El Salvador.",
    servicesTitle: "Services",
    services: [
      {
        id: "consulting",
        name: "AI consulting",
        body: "We look at how you work, identify where AI can help and decide what to tackle first. From there, we help you learn or build the workflow with you.",
      },
      {
        id: "academy",
        name: "Practical education",
        body: "Practical education for professionals and teams, built around the tasks you want to improve.",
      },
      {
        id: "agentic",
        name: "Business automation",
        body: "We design and implement workflows around your operation, connecting your tools and the people who use them.",
      },
    ],
    methodTitle: "How we work",
    methodBody:
      "First, understand the work. For consulting and implementation, we start with the need and agree on a useful next step. You can also come directly to learn.",
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
        question: "Is there an AI agency in El Salvador?",
        answer:
          "Ai Labs is an AI consulting company in San Salvador, El Salvador.",
      },
      {
        question: "What is AI consulting in El Salvador?",
        answer:
          "Ai Labs is an AI consulting company in San Salvador, El Salvador. With commercial, management, and operations teams, we review the work, choose one opportunity, and then prepare the team (Academy) or implement the workflow (Agentic), with human review and documentation. You can come directly to learn, with no company or prior consulting required. The public workshops we have published are in person in San Salvador. Ai Labs does not publish consulting prices because we first review the process and agree on what is worth improving. Public workshops do list their price on their own page. Write to Ai Labs from “Let’s talk” and tell us what you want to improve or learn. A company is optional.",
      },
    ],
    cta: "Let’s talk",
  },
  redeem: {
    heroPhoto: {
      name: "18.webp",
      alt: "Participants pose as a group during an Ai Labs event.",
    },
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
    heroPhoto: {
      name: "9.webp",
      alt: "Ai Labs community members hug and take a selfie at an event.",
    },
    metaTitle: "WhatsApp community",
    metaDescription:
      "Ai Labs is a community in El Salvador centered on training and teaching. The Campus Leaders program is for students, and you can learn AI with us. To join, open the WhatsApp link.",
    label: "Community",
    headline: "How do I join the Ai Labs WhatsApp community?",
    body: "Ai Labs is a community in El Salvador centered on training and teaching. The Campus Leaders program is for students, and you can learn AI with us. To join, open the WhatsApp link.",
    joinPrompt: "Free to join.",
    joinCta: "Join on WhatsApp",
    joinHint: "Opens WhatsApp · request may need approval",
    joinHref: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
    eventsCta: {
      label: "Ai Labs events in El Salvador",
      href: "/events",
    },
    consultingCta: {
      label: "AI consulting in El Salvador",
      href: "/consultoria-de-ia-el-salvador",
    },
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
    heroPhoto: {
      name: "17.webp",
      alt: "Students work on their laptops at an Ai Labs event.",
    },
    metaTitle: "Campus Leader",
    metaDescription:
      "An Ai Labs Campus Leader is a student, one per university in El Salvador, who brings AI training and teaching to campus, with official recognition and a say in which workshops arrive.",
    label: "Campus Leader",
    headline: "What is a Campus Leader?",
    body: "An Ai Labs Campus Leader is a student, one per university in El Salvador, who brings AI training and teaching to campus, with official recognition and a say in which workshops arrive.",
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
    consultingCta: {
      label: "AI consulting in El Salvador",
      href: "/consultoria-de-ia-el-salvador",
    },
    media: {
      whatSrc: homeCarousel.campusLeader[0],
      whatAlt:
        "Ai Labs event: students collaborating on laptops during a training session.",
      benefitsSrcs: homeCarousel.campusLeader,
      benefitsAlt: "Ai Labs event: a participant at a training workshop desk.",
      credit: "Credit: Ai Labs. Photograph from an Ai Labs event.",
    },
    landing: {
      what: {
        label: "The program",
        title: "What is the program?",
        body: "Ai Labs on campus: one student per university in El Salvador, chosen by cohort, to bring AI training and teaching.",
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
        title: "What does a Campus Leader do?",
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
        title: "What do you get?",
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
        title: "Who is this for?",
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
    deeperIntro:
      "A bit past the résumé line: how you show up with peers and AI.",
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
    success: "Got it. We’ll review for Cohort Aster and reply on WhatsApp.",
    error: "Something went wrong. Try again in a moment.",
    stepIncomplete: "Fill the required fields on this step to continue.",
    invalidLink: "Use a full link that starts with https://",
    formCrashTitle: "The form hit an error",
    formRetry: "Start over",
    qrCta: "QR",
    qrTitle: "Scan to open",
    qrBody: "Scan this code to open this page on another device.",
  },
  legal: legalEn,
  events: {
    metaTitle: "Ai Labs events in El Salvador",
    metaDescription:
      "These are the Ai Labs events published on Luma for this month. The base is in San Salvador; they are not every event in the country.",
    breadcrumbHome: "Home",
    label: "Events",
    headline: "Ai Labs events in El Salvador",
    intro:
      "These are the Ai Labs events published on Luma for this month, not every event in the country.",
    upcomingLabel: "Upcoming",
    pastLabel: "Past",
    hostsLabel: "Hosts",
    lumaLabel: "View on Luma",
    newTabLabel: "Opens in a new tab.",
    photosLabel: "Ai Labs photographs",
    photosCaption:
      "Credit: Ai Labs. These photographs are from Ai Labs events in San Salvador.",
    cityLine: "in San Salvador",
    closeHeadline: "San Salvador keeps gathering",
    closeSupport: "Walter publishes the full calendar on Luma.",
    communityCta: "Join the community",
    consultingLink: "AI consulting in El Salvador",
    upcomingEmpty: "There is no upcoming event.",
    monthEmpty: "There are no Ai Labs events published on Luma in {month}.",
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
