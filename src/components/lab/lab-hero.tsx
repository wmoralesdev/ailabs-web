import type { Locale, SiteContent } from "@/content"
import { TextSpiral } from "@/components/lab/text-spiral"

type LabHeroProps = {
  locale: Locale
  content: SiteContent
}

/** Lab preview of the text spiral, full bleed on the night field. */
function LabHero({ content }: LabHeroProps) {
  return (
    <section className="surface-night relative min-h-[calc(100svh-var(--site-header-height))]">
      <TextSpiral
        words={content.home.hero.spiralWords}
        interactionLabel={content.microcopy.textSpiralAction}
        className="absolute inset-0 h-full w-full"
      />
    </section>
  )
}

export { LabHero }
