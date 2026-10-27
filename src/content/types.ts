import type { EventPhoto } from "./event-photos"

export const LOCALES = ["en", "es"] as const

export type Locale = (typeof LOCALES)[number]

export type PillarId = "academy" | "agentic"

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
  /** Heading above the social links. */
  socialTitle: string
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
  /** Event photo printed on the hero panel. */
  heroPhoto: EventPhoto
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
  /** Event photo printed on the hero panel. */
  heroPhoto: EventPhoto
  metaTitle: string
  metaDescription: string
  label: string
  headline: string
  body: string
  joinPrompt: string
  joinCta: string
  joinHint: string
  joinHref: string
  /** Plain link to the events index. The body stays text for meta and FAQ. */
  eventsCta: NavItem
  /** Plain link to the consulting page. The anchor is the search query. */
  consultingCta: NavItem
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
  /** Visible credit for the campus photographs. */
  credit: string
}

export type CampusLeaderContent = CampaignQrCopy & {
  /** Event photo printed on the hero panel. */
  heroPhoto: EventPhoto
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
  /** Plain link to the consulting page. The anchor is the search query. */
  consultingCta: NavItem
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
  /** Visible company answer on the home page. Same string as the FAQ answer. */
  directAnswer: string
  /** FAQ question for the visible direct answer. Not a separate route. */
  agencyQuestion: string
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
  /** Visible credit under the about photographs. */
  mediaCredit: string
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
  /** Visible credit under the workshop photographs. */
  mediaCredit: string
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
  /** Visible heading. Question-shaped when the card already answers it. */
  title: string
  /** Service name in JSON-LD. Not the question heading. */
  offerName: string
  body: string
  points: ReadonlyArray<string>
  cta: string
  interest: ContactInterestId
  /** Text link to the matching service page. */
  learnMore: string
  /** Two real event photos for the service's cells in the bento. */
  photos: readonly [EventPhoto, EventPhoto]
}

export type HomeServicesContent = {
  label: string
  /** Visible heading. */
  title: string
  /** Catalog name in JSON-LD. Not the question heading. */
  offerName: string
  body: string
  items: readonly [HomeServiceItem, HomeServiceItem]
  /** One text link from the home consulting section to the consulting page. */
  pageLink: NavItem
}

export type ConsultingServiceId = "consulting" | "academy" | "agentic"

export type ConsultingService = {
  id: ConsultingServiceId
  name: string
  body: string
  /** Anchor text to the route's own page, phrased as its search query. */
  link?: string
}

export type ConsultingFaq = {
  question: string
  answer: string
}

/** Indexable consulting page. Same path in both languages. */
export type ConsultingPageContent = {
  /** Event photo printed beside the opening. */
  photo: EventPhoto
  metaTitle: string
  metaDescription: string
  label: string
  headline: string
  /** First visible paragraph. Same string as `faqs[0].answer`. */
  lead: string
  /** Sentences beside the opening. Each one is also a later FAQ answer. */
  claims: ReadonlyArray<string>
  servicesTitle: string
  services: readonly [ConsultingService, ConsultingService, ConsultingService]
  methodTitle: string
  methodBody: string
  steps: readonly [
    HomeAboutBridgeItem,
    HomeAboutBridgeItem,
    HomeAboutBridgeItem,
  ]
  faqs: ReadonlyArray<ConsultingFaq>
  cta: string
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
  logos: ReadonlyArray<HomeTrustLogo>
}

export type HomeFaqItem = {
  question: string
  /** Opens with the full subject so the answer reads correctly when quoted alone. */
  answer: string
}

export type HomeFaqContent = {
  label: string
  title: string
  items: ReadonlyArray<HomeFaqItem>
}

export type ServicePageCard = {
  title: string
  body: string
}

export type ServicePageContent = {
  /** Event photo printed beside the opening. */
  photo: EventPhoto
  metaTitle: string
  /** 140–160 characters. */
  metaDescription: string
  /** Service name in JSON-LD, breadcrumbs, and related links. */
  serviceName: string
  eyebrow: string
  title: string
  lead: string
  /** Sentences under the opening. Each one is also a later FAQ answer. */
  claims: ReadonlyArray<string>
  definitionHeading: string
  /** Self-contained sentence. Repeated verbatim as the first FAQ answer. */
  definition: string
  includesHeading: string
  includes: ReadonlyArray<ServicePageCard>
  stepsHeading: string
  steps: ReadonlyArray<ServicePageCard>
  fitHeading: string
  fit: ReadonlyArray<string>
  notFitHeading: string
  notFit: ReadonlyArray<string>
  faqHeading: string
  faq: ReadonlyArray<HomeFaqItem>
  ctaHeading: string
  ctaBody: string
  cta: string
  interest: ContactInterestId
}

export type ServicePagesContent = {
  homeLabel: string
  breadcrumbLabel: string
  relatedLabel: string
  consultingLink: string
  communityLink: string
  training: ServicePageContent
  automation: ServicePageContent
}

export type HomeContent = {
  hero: HomeHeroContent
  services: HomeServicesContent
  method: HomeMethodContent
  faq: HomeFaqContent
  trust: HomeTrustContent
  about: HomeAboutContent
  academy: HomeAcademyPillarContent
  agentic: HomeAgenticPillarContent
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

export type EventsIndexPhoto = {
  src: string
  alt: string
  width: number
  height: number
}

export type EventsIndexContent = {
  metaTitle: string
  metaDescription: string
  /** First crumb in the events JSON-LD breadcrumb. Not rendered on the page. */
  breadcrumbHome: string
  label: string
  headline: string
  intro: string
  upcomingLabel: string
  pastLabel: string
  hostsLabel: string
  lumaLabel: string
  newTabLabel: string
  photosLabel: string
  photosCaption: string
  cityLine: string
  closeHeadline: string
  closeSupport: string
  communityCta: string
  /** Visible label for the consulting page. The anchor is the search query. */
  consultingLink: string
  upcomingEmpty: string
  monthEmpty: string
  calendarLabel: string
  previousPhoto: string
  nextPhoto: string
  pausePhotos: string
  playPhotos: string
  photoStatus: string
  photos: ReadonlyArray<EventsIndexPhoto>
}

export type SiteContent = {
  locale: Locale
  meta: PageMeta
  chrome: ChromeContent
  microcopy: MicrocopyContent
  home: HomeContent
  servicePages: ServicePagesContent
  consulting: ConsultingPageContent
  redeem: RedeemContent
  community: CommunityContent
  campusLeader: CampusLeaderContent
  legal: LegalContent
  events: EventsIndexContent
}
