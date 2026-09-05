import {
  Calendar03Icon,
  CheckListIcon,
  Coffee01Icon,
  Compass01Icon,
  Flag03Icon,
  HandshakeIcon,
  Idea01Icon,
  LaptopChargingIcon,
  Layers01Icon,
  Message01Icon,
  Money01Icon,
  Notebook01Icon,
  PackageDeliveredIcon,
  PlugSocketIcon,
  PuzzleIcon,
  SparklesIcon,
  Store01Icon,
  Ticket01Icon,
  Clock01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

import type {
  ModoFundadorDeliverableIcon,
  ModoFundadorFactIcon,
  ModoFundadorProofIcon,
  ModoFundadorRequirementIcon,
  ModoFundadorTagIcon,
} from "@/events/modo-fundador/content"

/**
 * Content names the glyph, presentation resolves it — keeps `content.ts` free
 * of icon imports so copy stays portable between locales and surfaces.
 */
type IconDefinition = typeof Ticket01Icon

const factIcons: Record<ModoFundadorFactIcon, IconDefinition> = {
  duration: Clock01Icon,
  price: Money01Icon,
  format: UserGroupIcon,
  seats: Ticket01Icon,
}

const tagIcons: Record<ModoFundadorTagIcon, IconDefinition> = {
  prompting: Message01Icon,
  modes: Layers01Icon,
  cowork: UserGroupIcon,
  mcps: PlugSocketIcon,
  skills: PuzzleIcon,
}

const deliverableIcons: Record<ModoFundadorDeliverableIcon, IconDefinition> = {
  profile: Notebook01Icon,
  review: Calendar03Icon,
  opportunity: Compass01Icon,
  meetings: CheckListIcon,
}

const requirementIcons: Record<ModoFundadorRequirementIcon, IconDefinition> = {
  laptop: LaptopChargingIcon,
  account: SparklesIcon,
  problem: Idea01Icon,
  level: HandshakeIcon,
}

const proofIcons: Record<ModoFundadorProofIcon, IconDefinition> = {
  room: UserGroupIcon,
  work: Store01Icon,
  artifacts: PackageDeliveredIcon,
}

const breakIcon = Coffee01Icon
const closeIcon = Flag03Icon

export {
  breakIcon,
  closeIcon,
  deliverableIcons,
  factIcons,
  proofIcons,
  requirementIcons,
  tagIcons,
}
export type { IconDefinition }
