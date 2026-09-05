import {
  BrowserIcon,
  CloudServerIcon,
  Coffee02Icon,
  Globe02Icon,
  LaptopChargingIcon,
  Linkedin01Icon,
  Mail01Icon,
  SparklesIcon,
  Target01Icon,
  WebDesign01Icon,
} from "@hugeicons/core-free-icons"

import type {
  GetCompetitiveQuickRequirementIcon,
  GetCompetitiveQuickStackIcon,
} from "@/events/get-competitive-quick/content"

/**
 * Content names the glyph, presentation resolves it. Keeps `content.ts` free of
 * icon imports so copy stays portable between locales and surfaces.
 */
type IconDefinition = typeof Globe02Icon

const stackIcons: Record<GetCompetitiveQuickStackIcon, IconDefinition> = {
  domain: Globe02Icon,
  email: Mail01Icon,
  profiles: Linkedin01Icon,
  portfolio: BrowserIcon,
  cloudflare: CloudServerIcon,
}

const requirementIcons: Record<
  GetCompetitiveQuickRequirementIcon,
  IconDefinition
> = {
  laptop: LaptopChargingIcon,
  payment: Mail01Icon,
  profiles: Linkedin01Icon,
  projects: WebDesign01Icon,
  level: SparklesIcon,
}

const breakIcon = Coffee02Icon
const closeIcon = Target01Icon

export { stackIcons, requirementIcons, breakIcon, closeIcon }
export type { IconDefinition }
