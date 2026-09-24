import { homeCarousel } from "./home-carousel"
import { legalEn } from "./legal-en"
import type { SiteContent } from "./types"

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "Ai Labs | AI consulting, automation and practical education",
    description:
      "AI consulting, business automation and practical education for teams and professionals. Based in El Salvador.",
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
            label: "Campus Leaders",
            href: "/campus-leader",
          },
          {
            label: "Aperture members",
            href: "/aperture",
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
              href: "#academy",
            },
            {
              label: "Business automation",
              href: "#agentic",
            },
            {
              label: "How we work",
              href: "#about",
            },
          ],
        },
        {
          id: "aperture",
          title: "Community",
          links: [
            {
              label: "Join the community",
              href: "/community",
            },
            {
              label: "Campus Leaders",
              href: "/campus-leader",
            },
            {
              label: "Aperture members",
              href: "/aperture",
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
      body: "For teams and professionals.",
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
      title: "AI consulting",
      body: "We look at how you work, identify where AI can help and decide what to tackle first. From there, we help you learn or build the workflow with you.",
      items: [
        {
          id: "academy",
          brand: "Academy",
          title: "Learn to apply AI in your work.",
          body: "Practical education for professionals and teams, built around the tasks you want to improve.",
          points: [
            "Practice with work you recognize.",
            "Learn when to use AI and how to review its output.",
            "Build skills you can use on your own.",
          ],
          cta: "I want to learn",
          interest: "enablement",
        },
        {
          id: "agentic",
          brand: "Agentic",
          title: "Make your processes work better.",
          body: "We design and implement workflows around your operation, connecting your tools and the people who use them.",
          points: [
            "Reduce repetitive steps and connect information.",
            "Keep human review where it is needed.",
            "Receive documentation and a handover to your team.",
          ],
          cta: "Improve a process",
          interest: "implementation",
        },
      ],
    },
    method: {
      label: "How we work",
      title: "First, understand the work.",
      body: "For consulting and implementation, we start with the need and agree on a useful next step. You can also come directly to learn.",
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
    trust: {
      label: "Part of ambassador programs",
      pause: "Pause logos",
      resume: "Resume logos",
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
      mediaAlt: "Builders collaborating at an Ai Labs event",
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
      mediaAlt: "Hands-on workshop at Ai Labs",
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
    aperture: {
      id: "aperture",
      index: "03",
      eyebrow: "APERTURE · COMMUNITY AND EVIDENCE",
      title: "Aperture",
      lead: "Our community, partnerships, and events keep us close to the people building with these tools and show the work in practice.",
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
        "Aperture brings together community, partnerships, and events that show how people build and learn with these tools.",
      attribution: "Ai Labs",
      cta: { label: "Join the community", href: "/community" },
      partnerCta: { label: "Explore a partnership", href: "#contact" },
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
    joinNudgeTitle: "Aperture",
    joinNudgeBody:
      "Claim a permanent member number and a public builder profile.",
    joinNudgeCta: "Join Aperture",
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
  aperture: {
    join: {
      metaTitle: "Join Aperture",
      metaDescription:
        "Claim a permanent Aperture member number and a short public builder profile.",
      label: "Aperture",
      headline: "Claim your member number",
      body: "A short public profile and a permanent number. Numbers are assigned in order and never reused.",
      signInPrompt: "Sign in to claim your number. Use a verified email.",
      signInCta: "Sign in to join",
      signOutCta: "Sign out",
      signedInAs: "Signed in as {email}",
      submit: "Claim my number",
      submitting: "Claiming…",
      closedTitle: "Join is closed",
      closedBody: "Aperture is not accepting new members right now.",
      retiredTitle: "This account was closed",
      retiredBody:
        "Your member number stays retired and cannot be claimed again.",
      existingTitle: "You already have a number",
      existingBody: "Your number is #{number}.",
      noVerifiedEmailTitle: "Verify your email",
      noVerifiedEmailBody:
        "Your account needs a verified email before you can join Aperture.",
      error: "Something went wrong. Try again in a moment.",
      usernameAvailable: "Available",
      usernameChecking: "Checking…",
      fields: {
        username: {
          label: "Username",
          placeholder: "walter",
          helper: "3–20 letters, numbers, or underscores.",
        },
        displayName: {
          label: "Display name",
          placeholder: "Walter Morales",
        },
        headline: {
          label: "Headline",
          placeholder: "Founder working on applied AI",
          helper: "What you do, in one line.",
        },
        country: {
          label: "Country",
          placeholder: "Select a country",
        },
        role: {
          label: "Role",
          placeholder: "Select a role",
        },
        upFor: {
          label: "Open to",
          helper: "Optional. What you want to be asked about.",
        },
      },
      roleOptions: {
        FOUNDER: "Founder",
        DEVELOPER: "Developer",
        DESIGNER: "Designer",
        OPERATOR: "Operator",
        STUDENT: "Student",
      },
      upForOptions: {
        COFOUNDING: "Cofounding",
        FREELANCE: "Freelance",
        HIRING: "Hiring",
        MENTORING: "Mentoring",
        COLLABORATING: "Collaborating",
      },
      fieldErrors: {
        required: "This field is required.",
        too_long: "This is too long.",
        invalid: "Check this value.",
        reserved: "That username is reserved.",
        taken: "That username is taken.",
      },
      legalAccept: "I agree to the {terms} and the {privacy}.",
      legalTerms: "Terms of use",
      legalPrivacy: "Privacy policy",
      ageAccept: "I am 18 or older.",
      newsletterAccept: "Send me the Aperture newsletter. Optional.",
      revealTitle: "You're in",
      revealBody: "Your number is #{number}.",
      revealCta: "Go to your dashboard",
      qrCta: "QR",
      qrTitle: "Scan to open",
      qrBody: "Scan this code to open this page on another device.",
    },
    me: {
      metaTitle: "Your Aperture profile",
      metaDescription:
        "Your private Aperture dashboard: member number, events, credits, and settings.",
      label: "Aperture",
      headline: "Your dashboard",
      numberLabel: "Member #{number}",
      signInPrompt: "Sign in to see your number, events, and credits.",
      signInCta: "Sign in",
      signOutCta: "Sign out",
      signedInAs: "Signed in as {email}",
      joinCta: "Claim your number",
      noMemberTitle: "You are not a member yet",
      noMemberBody: "Claim a permanent number to open your dashboard.",
      retiredTitle: "This account was closed",
      retiredBody:
        "Your member number stays retired. Events and credits are no longer shown.",
      eventsTitle: "Events",
      eventsEmpty: "No Ai Labs events are linked to your verified emails yet.",
      creditsTitle: "Credits",
      creditsEmpty: "You have not claimed credits yet.",
      expiresLabel: "Expires {date}",
      settingsTitle: "Profile settings",
      settingsGroups: {
        profile: "Profile",
        location: "Location and role",
        links: "Links",
        visibility: "Visibility",
      },
      viewProfileCta: "View public profile",
      save: "Save changes",
      saving: "Saving…",
      saved: "Saved",
      error: "Something went wrong. Try again in a moment.",
      newsletterLabel: "Send me the Aperture newsletter.",
      showEventsLabel: "Show my events on my public profile",
      showEventsHelper:
        "Only events already linked to your verified emails. Off by default.",
      usernameCooldown: "You can change your username again on {date}.",
      fields: {
        bio: {
          label: "Bio",
          placeholder: "What you are building, in a few lines.",
          helper: "Up to 280 characters. Shown on your public profile.",
        },
        city: {
          label: "City",
          placeholder: "San Salvador",
        },
        linkedin: {
          label: "LinkedIn",
          placeholder: "https://linkedin.com/in/yourname",
        },
        x: {
          label: "X",
          placeholder: "https://x.com/yourhandle",
        },
        github: {
          label: "GitHub",
          placeholder: "https://github.com/yourhandle",
        },
        website: {
          label: "Website",
          placeholder: "https://example.com",
        },
        instagram: {
          label: "Instagram",
          placeholder: "https://instagram.com/yourhandle",
        },
        title: {
          label: "Title",
          placeholder: "Lane notes",
        },
        summary: {
          label: "Summary",
          placeholder: "What it does, in a few lines.",
          helper: "Up to 280 characters.",
        },
        url: {
          label: "Project URL",
          placeholder: "https://example.com",
        },
        repoUrl: {
          label: "Repository",
          placeholder: "https://github.com/you/project",
        },
      },
      poolLabels: {
        CURSOR: "Cursor",
        CODEX: "Codex",
        OPENAI: "OpenAI Platform",
      },
      shareCta: "Open share card",
      projectsTitle: "Projects",
      projectsEmpty: "You have not published a project yet.",
      projectsHelper:
        "Show work you built. The built-with split is yours to report.",
      addProject: "Add a project",
      editProject: "Edit",
      saveProject: "Save project",
      cancelProject: "Cancel",
      deleteProject: "Remove",
      builtWithTitle: "Built with",
      builtWithHelper: "Self-reported. Shares must add up to 100.",
      addTool: "Add a tool",
      removeTool: "Remove",
      toolNameLabel: "Tool",
      percentLabel: "%",
      publishedLabel: "Show on my public profile",
      imageLabel: "Image",
      imageHelper: "JPEG, PNG, or WebP. Up to 2 MB.",
      imageUnavailable: "Image upload is not configured on this environment.",
      removeImage: "Remove image",
      projectLimit: "You can publish up to 12 projects.",
      projectErrors: {
        required: "This field is required.",
        too_long: "This is too long.",
        invalid: "Check this value.",
        sum: "The built-with shares must add up to 100.",
      },
    },
    directory: {
      metaTitle: "Aperture members",
      metaDescription:
        "Public Aperture builder profiles from the Ai Labs community.",
      label: "Aperture",
      headline: "Members",
      body: "People building with these tools. Each profile has a permanent number.",
      empty: "No public profiles yet.",
      joinCta: "Claim your number",
      countLabel: "Public profiles",
      searchLabel: "Search members",
      searchPlaceholder: "Name, username, or headline",
      roleFilterLabel: "Filter by role",
      allRoles: "All",
      resultsCount: "{count} of {total}",
      noResults: "No members match these filters.",
      clearFilters: "Clear filters",
    },
    profile: {
      metaTitle: "Aperture profile",
      metaTitleNamed: "{name} · Aperture",
      metaDescription: "A public Aperture builder profile.",
      metaDescriptionNamed: "{name}: {headline}",
      notFoundTitle: "Profile not found",
      notFoundBody: "That username is not an Aperture member.",
      backToDirectory: "All members",
      memberLabel: "Aperture member",
      upForTitle: "Open to",
      eventsTitle: "Events",
      linksTitle: "Links",
      projectsTitle: "Projects",
      builtWithTitle: "Built with",
      projectLinkCta: "Visit",
      repoLinkCta: "Source",
      builtWithDisclaimer:
        "Reported by the maker. Ai Labs does not verify this breakdown, and it does not mean a tool company endorses the project.",
      shareCta: "Open share card",
      shareCardAlt: "{name} · Aperture member #{number}",
    },
  },
}
