import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { HomeContactContent } from "@/content"
import { CanvasRevealBanner } from "@/components/ui/canvas-reveal-banner"
import { Button } from "@/components/ui/button"
import { useContact } from "@/components/contact/contact-provider"
import { cn } from "@/lib/utils"
import { homeDisplayClassName, homePillClassName } from "./home-styles"

export function HomeContact({ contact }: { contact: HomeContactContent }) {
  const { openContact } = useContact()
  return (
    <CanvasRevealBanner
      id="contact"
      action={
        <Button
          type="button"
          onClick={() => openContact()}
          className={cn(homePillClassName, "h-12 px-8")}
        >
          {contact.cta}
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        </Button>
      }
    >
      <h2
        className={cn(
          homeDisplayClassName,
          "text-3xl text-on-dark normal-case sm:text-4xl md:text-5xl"
        )}
      >
        {contact.title}
      </h2>
      <p className="text-base leading-relaxed text-on-dark/75 md:text-lg">
        {contact.lead}
      </p>
    </CanvasRevealBanner>
  )
}
