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
  pillars: ReadonlyArray<{
    id: PillarId
    label: string
    href: string
  }>
  community: NavItem
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

export type FooterContent = {
  brandLine: string
  columns: ReadonlyArray<FooterColumn>
  copyright: string
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
  benefitsSrc: string
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

/** A standalone pillar section (Academy, Agentic). */
export type HomePillarContent = {
  id: Extract<PillarId, "academy" | "agentic">
  index: string
  eyebrow: string
  title: string
  lead: string
  points: ReadonlyArray<HomePillarPoint>
  cta: NavItem
  mediaSrcs: ReadonlyArray<string>
  mediaAlt: string
}

export type HomePartnerVoice = {
  quote: string
  name: string
  role: string
}

export type HomePartnerMember = {
  id: string
  initial: string
  imageSrc?: string
  imageAlt?: string
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
  voices: ReadonlyArray<HomePartnerVoice>
  members: ReadonlyArray<HomePartnerMember>
  /** Builder-facing CTA into the community route. */
  cta: NavItem
  /** Partner-facing CTA into the contact form's partner interest. */
  partnerCta: NavItem
}

/** Contact routing covers the three pillars plus inbound partner requests. */
export type ContactInterestId = PillarId | "partner"

export type HomeContactInterest = {
  value: ContactInterestId
  label: string
}

export type HomeContactContent = {
  title: string
  lead: string
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
  academy: HomePillarContent
  agentic: HomePillarContent
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
