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
  contactInterest?: ContactInterestId
}

export type NavContent = {
  services: NavItem
  community: {
    label: string
    items: ReadonlyArray<NavItem>
  }
  contact: NavItem
}

export type CampaignQrCopy = {
  qrCta: string
  qrTitle: string
  qrBody: string
}

export type FooterColumn = {
  id?: string
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
  /** Terms and Privacy links; the footer hides them while the text is a draft. */
  legalLinks: ReadonlyArray<NavItem>
  /** Heading for the dynamic upcoming-events column; omitted when empty. */
  eventsTitle: string
  copyright: string
  locationLine: string
}

export type ChromeContent = {
  nav: NavContent
  footer: FooterContent
}

export type MicrocopyContent = {
  primaryNavigation: string
  loading: string
  notFoundTitle: string
  notFoundBody: string
  notFoundCtaHome: string
  languageSwitch: string
  textSpiralAction: string
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
  /** Shown after codes when the signed-in visitor is not yet a member. */
  joinNudgeTitle: string
  joinNudgeBody: string
  joinNudgeCta: string
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
  /** Dedicated source for the canvas text spiral. */
  spiralWords: ReadonlyArray<string>
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
  HomeAcademyPillarContent | HomeAgenticPillarContent

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

/** Aperture section: community, partnerships, events, and evidence. */
export type HomeApertureContent = {
  id: "aperture"
  index: string
  eyebrow: string
  title: string
  lead: string
  stat: HomeStat
  quote: string
  attribution: string
  /** First voice carries the section's pull quote; the rest are testimonials. */
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
  /** Partner-facing CTA into the contact form's partnership interest. */
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

export type HomeServiceItem = {
  id: "academy" | "agentic"
  brand: string
  title: string
  body: string
  points: ReadonlyArray<string>
  cta: string
  interest: ContactInterestId
}

export type HomeServicesContent = {
  label: string
  title: string
  body: string
  items: readonly [HomeServiceItem, HomeServiceItem]
}

export type HomeMethodContent = {
  label: string
  title: string
  body: string
  steps: ReadonlyArray<HomeAboutBridgeItem>
}

/** Technology logos shown in the home trust strip. */
export type TrustLogoId =
  | "spacexai"
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
  pause: string
  resume: string
  logos: ReadonlyArray<HomeTrustLogo>
}

export type HomeContent = {
  hero: HomeHeroContent
  services: HomeServicesContent
  method: HomeMethodContent
  trust: HomeTrustContent
  about: HomeAboutContent
  academy: HomeAcademyPillarContent
  agentic: HomeAgenticPillarContent
  aperture: HomeApertureContent
  contact: HomeContactContent
}

export type LegalSection = {
  /** Anchor id, identical in every locale. */
  id: string
  heading: string
  paragraphs: ReadonlyArray<string>
}

export type LegalDocument = {
  title: string
  metaDescription: string
  intro: string
  sections: ReadonlyArray<LegalSection>
}

export type LegalStatus = "draft" | "published"

export type LegalContent = {
  /** Consents record `version`; join stays closed in production while this is a draft. */
  status: LegalStatus
  version: string
  /** `YYYY-MM-DD`, formatted per locale in UTC. */
  updatedOn: string
  draftNotice: string
  /** `{version}` is replaced. */
  versionLabel: string
  /** `{date}` is replaced. */
  updatedLabel: string
  contentsLabel: string
  terms: LegalDocument
  privacy: LegalDocument
}

export type ApertureMemberRole =
  "FOUNDER" | "DEVELOPER" | "DESIGNER" | "OPERATOR" | "STUDENT"

export type ApertureUpFor =
  "COFOUNDING" | "FREELANCE" | "HIRING" | "MENTORING" | "COLLABORATING"

export type ApertureFieldError =
  "required" | "too_long" | "invalid" | "reserved" | "taken"

export type ApertureJoinField = {
  label: string
  placeholder?: string
  helper?: string
}

export type ApertureJoinContent = CampaignQrCopy & {
  metaTitle: string
  metaDescription: string
  label: string
  headline: string
  body: string
  signInPrompt: string
  signInCta: string
  signOutCta: string
  signedInAs: string
  submit: string
  submitting: string
  closedTitle: string
  closedBody: string
  retiredTitle: string
  retiredBody: string
  existingTitle: string
  /** `{number}` is replaced. */
  existingBody: string
  noVerifiedEmailTitle: string
  noVerifiedEmailBody: string
  error: string
  usernameAvailable: string
  usernameChecking: string
  fields: {
    username: ApertureJoinField
    displayName: ApertureJoinField
    headline: ApertureJoinField
    country: ApertureJoinField
    role: ApertureJoinField
    upFor: ApertureJoinField
  }
  roleOptions: Record<ApertureMemberRole, string>
  upForOptions: Record<ApertureUpFor, string>
  fieldErrors: Record<ApertureFieldError, string>
  /** `{terms}` and `{privacy}` are replaced with links. */
  legalAccept: string
  legalTerms: string
  legalPrivacy: string
  ageAccept: string
  newsletterAccept: string
  revealTitle: string
  /** `{number}` is replaced. */
  revealBody: string
  revealCta: string
}

export type ApertureMeContent = {
  metaTitle: string
  metaDescription: string
  label: string
  headline: string
  /** `{number}` is replaced. */
  numberLabel: string
  signInPrompt: string
  signInCta: string
  signOutCta: string
  signedInAs: string
  joinCta: string
  noMemberTitle: string
  noMemberBody: string
  retiredTitle: string
  retiredBody: string
  eventsTitle: string
  eventsEmpty: string
  creditsTitle: string
  creditsEmpty: string
  /** `{date}` is replaced. */
  expiresLabel: string
  settingsTitle: string
  save: string
  saving: string
  saved: string
  error: string
  newsletterLabel: string
  showEventsLabel: string
  showEventsHelper: string
  /** `{date}` is replaced. */
  usernameCooldown: string
  fields: {
    bio: ApertureJoinField
    city: ApertureJoinField
    linkedin: ApertureJoinField
    x: ApertureJoinField
    github: ApertureJoinField
    website: ApertureJoinField
    instagram: ApertureJoinField
    title: ApertureJoinField
    summary: ApertureJoinField
    url: ApertureJoinField
    repoUrl: ApertureJoinField
  }
  poolLabels: {
    CURSOR: string
    CODEX: string
    OPENAI: string
  }
  projectsTitle: string
  projectsEmpty: string
  projectsHelper: string
  addProject: string
  editProject: string
  saveProject: string
  cancelProject: string
  deleteProject: string
  builtWithTitle: string
  builtWithHelper: string
  addTool: string
  removeTool: string
  toolNameLabel: string
  percentLabel: string
  publishedLabel: string
  imageLabel: string
  imageHelper: string
  imageUnavailable: string
  removeImage: string
  projectLimit: string
  projectErrors: {
    required: string
    too_long: string
    invalid: string
    sum: string
  }
}

export type ApertureDirectoryContent = {
  metaTitle: string
  metaDescription: string
  label: string
  headline: string
  body: string
  empty: string
  joinCta: string
}

export type ApertureProfileContent = {
  metaTitle: string
  /** `{name}` is replaced. */
  metaTitleNamed: string
  metaDescription: string
  /** `{name}` and `{headline}` are replaced. */
  metaDescriptionNamed: string
  notFoundTitle: string
  notFoundBody: string
  eventsTitle: string
  linksTitle: string
  projectsTitle: string
  builtWithDisclaimer: string
}

export type ApertureContent = {
  join: ApertureJoinContent
  me: ApertureMeContent
  directory: ApertureDirectoryContent
  profile: ApertureProfileContent
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
  legal: LegalContent
  aperture: ApertureContent
}
