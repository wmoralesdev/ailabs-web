export const LOCALES = ["en", "es"] as const

export type Locale = (typeof LOCALES)[number]

export type PillarId = "academy" | "agentic" | "aperture"

export type PageMeta = {
  title: string
  description: string
}

export type NavItem = {
  label: string
  href: string
}

export type NavContent = {
  /** Label for the home route link shown on non-home pages. */
  home: NavItem
  pillars: ReadonlyArray<{
    id: PillarId
    label: string
    href: string
  }>
  community: NavItem
  campusLeader: NavItem
  contact: NavItem
  cta: NavItem
}

export type CampaignQrCopy = {
  qrCta: string
  qrTitle: string
  qrBody: string
}

export type FooterColumn = {
  title: string
  links: ReadonlyArray<NavItem>
}

export type FooterSocial = NavItem & {
  icon: "linkedin" | "instagram" | "tiktok" | "x"
}

export type FooterContent = {
  brandLine: string
  socials: ReadonlyArray<FooterSocial>
  columns: ReadonlyArray<FooterColumn>
  copyright: string
  locationLine: string
}

export type ChromeContent = {
  nav: NavContent
  footer: FooterContent
}

export type MicrocopyContent = {
  loading: string
  notFoundTitle: string
  notFoundBody: string
  notFoundCtaHome: string
  languageSwitch: string
  skipToContent: string
  menuOpen: string
  menuClose: string
  themeCycle: string
  themeToLight: string
  themeToDark: string
  themeToSystem: string
}

export type RedeemProductCopy = {
  title: string
  blurb: string
}

export type RedeemStep = {
  title: string
  body: string
}

export type RedeemContent = CampaignQrCopy & {
  metaTitle: string
  eventLabel: string
  howItWorksLabel: string
  steps: ReadonlyArray<RedeemStep>
  poweredBy: string
  signInPrompt: string
  signInCta: string
  claimCta: string
  claiming: string
  signedInAs: string
  signOutCta: string
  yourCode: string
  yourCodes: string
  alreadyRedeemed: string
  copyCode: string
  copied: string
  openCode: string
  invalidTitle: string
  invalidBody: string
  inactiveTitle: string
  inactiveBody: string
  notEligibleTitle: string
  notEligibleBody: string
  soldOutTitle: string
  soldOutBody: string
  noVerifiedEmailTitle: string
  noVerifiedEmailBody: string
  missingCodeTitle: string
  missingCodeBody: string
  poolLabels: {
    CURSOR: string
    CODEX: string
    OPENAI: string
  }
  products: {
    cursor: RedeemProductCopy
    codex: RedeemProductCopy
    openai: RedeemProductCopy
    codexOpenai: RedeemProductCopy
  }
}

export type CommunityStep = {
  title: string
  body: string
}

export type CommunityContent = CampaignQrCopy & {
  metaTitle: string
  metaDescription: string
  label: string
  headline: string
  body: string
  joinPrompt: string
  joinCta: string
  joinHint: string
  joinHref: string
  howItWorksLabel: string
  steps: ReadonlyArray<CommunityStep>
}

export type CampusLeaderFieldOption = {
  value: string
  label: string
}

export type CampusLeaderFieldCopy = {
  label: string
  placeholder?: string
  helper?: string
}

export type CampusLeaderPoint = {
  title: string
  body: string
}

export type CampusLeaderLandingSection = {
  label: string
  title: string
  body?: string
  items: ReadonlyArray<CampusLeaderPoint>
}

export type CampusLeaderFitSection = {
  label: string
  title: string
  forTitle: string
  forItems: ReadonlyArray<string>
  notTitle: string
  notItems: ReadonlyArray<string>
}

export type CampusLeaderMedia = {
  whatSrc: string
  whatAlt: string
  benefitsSrcs: ReadonlyArray<string>
  benefitsAlt: string
}

export type CampusLeaderContent = CampaignQrCopy & {
  metaTitle: string
  metaDescription: string
  label: string
  headline: string
  body: string
  creditsNote: string
  /** Stored slug, e.g. "aster". */
  cohort: string
  /** Flower display name, e.g. "Aster". Same proper noun in EN and ES. */
  cohortDisplay: string
  /** Localized word before the flower name, e.g. "Cohort" / "Cohorte". */
  cohortLabel: string
  applicationsOpen: boolean
  closedTitle: string
  closedBody: string
  applyCta: string
  learnCta: string
  media: CampusLeaderMedia
  landing: {
    what: CampusLeaderLandingSection
    role: CampusLeaderLandingSection
    benefits: CampusLeaderLandingSection
    fit: CampusLeaderFitSection
    ctaBand: {
      title: string
      body: string
      applyCta: string
    }
  }
  formTitle: string
  formStepLabel: string
  formNext: string
  formBack: string
  formClose: string
  /** Shown on the fewer side of required vs optional fields. */
  formOptional: string
  formRequired: string
  logisticsLabel: string
  logisticsIntro: string
  deeperLabel: string
  deeperIntro: string
  roomLabel: string
  roomIntro: string
  fields: {
    name: CampusLeaderFieldCopy
    email: CampusLeaderFieldCopy
    whatsapp: CampusLeaderFieldCopy
    linkedin: CampusLeaderFieldCopy
    instagram: CampusLeaderFieldCopy & {
      /** Checkbox label to skip Instagram when they have no account. */
      skipLabel: string
    }
    x: CampusLeaderFieldCopy
    campus: CampusLeaderFieldCopy
    career: CampusLeaderFieldCopy
    year: CampusLeaderFieldCopy
    bio: CampusLeaderFieldCopy
    reach: CampusLeaderFieldCopy
    aiToday: CampusLeaderFieldCopy
    whyLeader: CampusLeaderFieldCopy
    quietRoom: CampusLeaderFieldCopy
    inviteMessage: CampusLeaderFieldCopy
    roomPlan: CampusLeaderFieldCopy
    sessionPrefs: CampusLeaderFieldCopy
    notes: CampusLeaderFieldCopy
  }
  careerOptions: ReadonlyArray<CampusLeaderFieldOption>
  /** Values stay language-neutral so exports read the same in EN and ES. */
  yearOptions: ReadonlyArray<CampusLeaderFieldOption>
  sessionPrefOptions: ReadonlyArray<CampusLeaderFieldOption>
  careerHint: string
  submit: string
  submitting: string
  success: string
  error: string
  stepIncomplete: string
  /** Shown when a social field is filled but is not an http(s) URL. */
  invalidLink: string
  /** Render-crash fallback title inside the apply dialog. */
  formCrashTitle: string
  formRetry: string
}

export type HomeStatIcon = "builders" | "events" | "partners"

export type HomeStat = {
  value: string
  label: string
  icon?: HomeStatIcon
}

export type HomeHeroContent = {
  label: string
  headline: string
  body: string
  primaryCta: NavItem
  secondaryCta: NavItem
  proof: HomeStat
  slides: ReadonlyArray<HomeStat>
  mediaSrcs: ReadonlyArray<string>
  mediaAlt: string
}

export type HomeAboutBridgeItem = {
  title: string
  body: string
}

export type HomeAboutContent = {
  label: string
  body: string
  stats: readonly [HomeStat, HomeStat]
  bold: string
  bridgeLabel: string
  bridge: readonly [
    HomeAboutBridgeItem,
    HomeAboutBridgeItem,
    HomeAboutBridgeItem,
  ]
  mediaSrcs: ReadonlyArray<string>
  mediaAlt: string
  toastTitle: string
  toastMeta: string
}

export type HomePillarPoint = {
  title: string
  body: string
}

export type HomeProcessGlyph = "brief" | "bench" | "live"

export type HomeProcessStep = {
  label: string
  body: string
  glyph: HomeProcessGlyph
}

type HomePillarShared = {
  index: string
  eyebrow: string
  title: string
  lead: string
  points: ReadonlyArray<HomePillarPoint>
  cta: NavItem
}

/** Academy — curated workshop carousel. */
export type HomeAcademyPillarContent = HomePillarShared & {
  id: "academy"
  mediaSrcs: ReadonlyArray<string>
  mediaAlt: string
}

/** Agentic — process flow diagram (no photo carousel). */
export type HomeAgenticPillarContent = HomePillarShared & {
  id: "agentic"
  process: {
    label: string
    steps: readonly [HomeProcessStep, HomeProcessStep, HomeProcessStep]
  }
}

/** A standalone pillar section (Academy, Agentic). */
export type HomePillarContent =
  | HomeAcademyPillarContent
  | HomeAgenticPillarContent

export type HomePartnerVoice = {
  quote: string
  name: string
  role: string
}

/**
 * One row of the Aperture lineup. Every event so far is in San Salvador, so
 * rows carry a venue rather than a city.
 */
export type HomeApertureEvent = {
  /** Luma slug where the event has a public page, otherwise a stable key. */
  id: string
  /** Authored to scan in display type — not the raw Luma title. */
  name: string
  venue?: string
  /** Verified headcount. Reserved for standout events; most rows omit it. */
  attendance?: number
  /** Marks a recurring series collapsed into a single row. */
  series?: boolean
  /** Set on upcoming events; drives the coming-up card's date block and link. */
  upcoming?: {
    /** `YYYY-MM-DD`, formatted per locale in UTC so SSR and client agree. */
    date: string
    href: string
  }
}

/** Aperture section: the funnel/community pillar (absorbs former Partner + Trust). */
export type HomeApertureContent = {
  id: "aperture"
  index: string
  eyebrow: string
  title: string
  lead: string
  stat: HomeStat
  quote: string
  attribution: string
  /** First voice carries the section's pull quote; the rest feed the hero spiral. */
  voices: readonly [HomePartnerVoice, ...ReadonlyArray<HomePartnerVoice>]
  eventsLabel: string
  /** Column label above the upcoming event cards. */
  upcomingLabel: string
  /** Marker on the upcoming card. */
  nextLabel: string
  /** Shown where a collapsed series would otherwise show an edition count. */
  seriesLabel: string
  /** Unit after `attendance`, e.g. "208 builders". */
  attendanceLabel: string
  events: ReadonlyArray<HomeApertureEvent>
  /** Builder-facing CTA into the community route. */
  cta: NavItem
  /** Partner-facing CTA into the contact form's partner interest. */
  partnerCta: NavItem
}

/** Contact routing follows the consultive outcome or relationship requested. */
export type ContactInterestId =
  "discovery" | "enablement" | "implementation" | "partnership"

export type HomeContactInterest = {
  value: ContactInterestId
  label: string
}

export type HomeContactContent = {
  title: string
  lead: string
  /** Banner CTA that opens the contact form modal. */
  cta: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  companyLabel: string
  companyPlaceholder: string
  interestLabel: string
  interestOptions: ReadonlyArray<HomeContactInterest>
  messageLabel: string
  messagePlaceholder: string
  submit: string
  submitting: string
  success: string
  error: string
  closeLabel: string
  rateLimited: string
  invalid: string
}

/** Tech partner logos shown in the home trust strip. */
export type TrustLogoId =
  | "cursor"
  | "codex"
  | "openai"
  | "claude"
  | "mistral"
  | "elevenlabs"
  | "notion"

export type HomeTrustLogo = {
  id: TrustLogoId
  name: string
}

export type HomeTrustContent = {
  label: string
  logos: ReadonlyArray<HomeTrustLogo>
}

export type HomeContent = {
  hero: HomeHeroContent
  trust: HomeTrustContent
  about: HomeAboutContent
  academy: HomeAcademyPillarContent
  agentic: HomeAgenticPillarContent
  aperture: HomeApertureContent
  contact: HomeContactContent
}

export type SiteContent = {
  locale: Locale
  meta: PageMeta
  chrome: ChromeContent
  microcopy: MicrocopyContent
  home: HomeContent
  redeem: RedeemContent
  community: CommunityContent
  campusLeader: CampusLeaderContent
}
