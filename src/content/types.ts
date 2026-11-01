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
}

export type NavContent = {
  services: NavItem
  events: NavItem
  contact: NavItem
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
  skipToContent: string
  menuOpen: string
  menuClose: string
  themeCycle: string
  themeToLight: string
  themeToDark: string
  themeToSystem: string
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
  /** Opening paragraph. Stays the company sentence already on the home. */
  directAnswer: string
  /** FAQ question that distinguishes Ai Labs from the national agency. */
  agencyQuestion: string
  /** Visible answer to `agencyQuestion`. Repeated on the consulting page. */
  agencyAnswer: string
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

/** Closing home tile. The whole tile links to the booking page. */
export type HomeContactContent = {
  title: string
  lead: string
  cta: string
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
  /**
   * First visible paragraph. Spanish answers consultoría de inteligencia
   * artificial and names the SpaceXAI role. English stays the sentence that
   * already ranks for “AI consulting El Salvador”.
   */
  lead: string
  /** Sentences under the opening. Each one is also a FAQ answer. */
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
}

export type ServicePagesContent = {
  homeLabel: string
  breadcrumbLabel: string
  relatedLabel: string
  consultingLink: string
  eventsLink: string
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

/**
 * Booking page (`/agendar`). Placeholder copy until the copy PR lands; the
 * scheduler URL and WhatsApp link live in `src/content/booking.ts`.
 */
export type BookingContent = {
  /** Event photo printed on the hero panel. */
  heroPhoto: EventPhoto
  metaTitle: string
  metaDescription: string
  label: string
  headline: string
  body: string
  /** Accessible title of the scheduler embed. */
  embedTitle: string
  whatsappCta: string
  whatsappHint: string
}

export type SiteContent = {
  locale: Locale
  meta: PageMeta
  chrome: ChromeContent
  microcopy: MicrocopyContent
  home: HomeContent
  servicePages: ServicePagesContent
  consulting: ConsultingPageContent
  booking: BookingContent
  legal: LegalContent
  events: EventsIndexContent
}
