import type { EventPhoto } from "./event-photos"

export const LOCALES = ["en", "es"] as const

export type Locale = (typeof LOCALES)[number]

export type PageMeta = {
  title: string
  description: string
}

export type NavItem = {
  label: string
  href: string
}

/** The three service pages, listed under one "Services" menu. */
export type NavServicesMenu = {
  label: string
  items: ReadonlyArray<NavItem>
}

export type NavContent = {
  services: NavServicesMenu
  events: NavItem
  /** The booking CTA. */
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
  notFoundCtaBooking: string
  languageSwitch: string
  skipToContent: string
  menuOpen: string
  menuClose: string
  themeCycle: string
  themeToLight: string
  themeToDark: string
  themeToSystem: string
}

export type HomeStat = {
  value: string
  label: string
}

export type HomeHeroContent = {
  label: string
  headline: string
  lead: string
  primaryCta: NavItem
  secondaryCta: NavItem
}

/** Technology marks printed as halftone dots (`src/lib/logo-dots.ts`). */
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

/**
 * The proof strip under the hero: the ambassador programs, then the tools we
 * work with but are not ambassadors of, one sentence on what that gives us,
 * and the single number we publish.
 */
export type HomeAmbassadorsContent = {
  label: string
  logos: ReadonlyArray<HomeTrustLogo>
  partnersLabel: string
  partners: ReadonlyArray<HomeTrustLogo>
  body: string
  stat: HomeStat
}

export type HomeOfferId = "automation" | "consulting" | "training"

export type HomeOfferItem = {
  id: HomeOfferId
  title: string
  body: string
  /** Process examples. Only the automation card carries one. */
  examples?: string
  /** Text link to the service page; the path comes from the id. */
  link: string
}

export type HomeOffersContent = {
  label: string
  title: string
  intro: string
  items: readonly [HomeOfferItem, HomeOfferItem, HomeOfferItem]
}

export type HomeMethodStep = {
  title: string
  body: string
}

export type HomeMethodContent = {
  label: string
  title: string
  body: string
  steps: readonly [HomeMethodStep, HomeMethodStep, HomeMethodStep]
}

export type HomeFaqItem = {
  question: string
  /** Opens with the full subject so the answer reads correctly when quoted alone. */
  answer: string
}

export type HomeFaqContent = {
  title: string
  items: ReadonlyArray<HomeFaqItem>
}

/** Closing home tile. The whole tile links to the booking page. */
export type HomeBookingContent = {
  title: string
  body: string
  /** The one big word printed on the tile. */
  display: string
  cta: string
  /** Shown only when a WhatsApp business number exists. */
  whatsappCta: string
}

export type HomeContent = {
  hero: HomeHeroContent
  ambassadors: HomeAmbassadorsContent
  offers: HomeOffersContent
  method: HomeMethodContent
  faq: HomeFaqContent
  booking: HomeBookingContent
}

export type ServicePageCard = {
  title: string
  body: string
  /** Optional text link under the card (training formats link to events). */
  link?: NavItem
}

export type ServicePageExample = {
  heading: string
  body: string
}

/**
 * One indexable service page. Consulting, automation and training share the
 * template: opening, who it is for, what it includes, how it works, FAQ,
 * booking. The first FAQ answer is the page's definition sentence.
 */
export type ServicePageContent = {
  /** Real event photo beside the opening. Omit to print the mark instead. */
  photo?: EventPhoto
  metaTitle: string
  /** 110–160 characters. */
  metaDescription: string
  /** Service name in JSON-LD, breadcrumbs, and related links. */
  serviceName: string
  eyebrow: string
  title: string
  lead: string
  cta: string
  fitHeading: string
  fit: ReadonlyArray<string>
  notFitHeading: string
  notFit: ReadonlyArray<string>
  includesHeading: string
  includes: ReadonlyArray<ServicePageCard>
  stepsHeading: string
  steps: readonly [ServicePageCard, ServicePageCard, ServicePageCard]
  /** A real before-and-after. Omitted until one exists. */
  example?: ServicePageExample
  faqHeading: string
  faq: ReadonlyArray<HomeFaqItem>
  ctaHeading: string
  ctaBody: string
  ctaLabel: string
}

export type ServicePagesContent = {
  homeLabel: string
  breadcrumbLabel: string
  relatedLabel: string
  eventsLink: string
  consulting: ServicePageContent
  automation: ServicePageContent
  training: ServicePageContent
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

export type EventsTrack = {
  title: string
  body: string
}

export type EventsIndexContent = {
  metaTitle: string
  metaDescription: string
  /** First crumb in the events JSON-LD breadcrumb. Not rendered on the page. */
  breadcrumbHome: string
  label: string
  headline: string
  intro: string
  calendarLabel: string
  /** Who each kind of event is for: leaders first, builders second. */
  tracks: readonly [EventsTrack, EventsTrack]
  upcomingLabel: string
  pastLabel: string
  lumaLabel: string
  newTabLabel: string
  upcomingEmpty: string
  monthEmpty: string
  photosLabel: string
  photosCaption: string
  pausePhotos: string
  playPhotos: string
  photos: ReadonlyArray<EventsIndexPhoto>
  communityTitle: string
  communityBody: string
  communityCta: string
  communityHint: string
  bridgeTitle: string
  bridgeCta: string
}

export type BookingStep = {
  title: string
  body: string
}

/**
 * Booking page (`/agendar`). The scheduler URL and WhatsApp links live in
 * `src/content/booking.ts`.
 */
export type BookingContent = {
  /** Real event photo on the hero panel. Omit to print the mark instead. */
  heroPhoto?: EventPhoto
  metaTitle: string
  metaDescription: string
  label: string
  headline: string
  body: string
  stepsLabel: string
  steps: readonly [BookingStep, BookingStep, BookingStep]
  /** Accessible title of the scheduler embed. */
  embedTitle: string
  /** Shown while `BOOKING_URL` is empty. */
  embedPending: string
  altTitle: string
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
  booking: BookingContent
  legal: LegalContent
  events: EventsIndexContent
}
