import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { HomeOfferItem, HomeOffersContent, Locale } from "@/content"
import { HalftoneIcon } from "@/components/halftone/halftone-icon"
import { Reveal } from "@/components/halftone/reveal"
import { PrintCell } from "@/components/home/print-cell"
import { homeHeadingClassName, homeShellClassName } from "./home-styles"
import type { ShapeName } from "@/lib/halftone-shapes"
import { localizedPath } from "@/lib/locale-path"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"
import { cn } from "@/lib/utils"

const offerIcon = {
  automation: "nodes",
  consulting: "search",
  training: "book",
} as const satisfies Record<HomeOfferItem["id"], ShapeName>

type HomeOffersProps = {
  offers: HomeOffersContent
  locale: Locale
}

/**
 * The three offers as one bento: a text cell each, and pure-halftone cells
 * between them, printed live and inked by the pointer. No photos: the
 * artifact that sells a service is the process, not a crowd.
 */
function HomeOffers({ offers, locale }: HomeOffersProps) {
  const [automation, consulting, training] = offers.items

  return (
    <Reveal
      as="section"
      id="services"
      aria-labelledby="home-offers-title"
      className="section-y bg-background"
    >
      <div className={homeShellClassName}>
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <p data-reveal className="text-small font-semibold text-muted-foreground">
            {offers.label}
          </p>
          <h2
            id="home-offers-title"
            data-reveal
            className={homeHeadingClassName}
          >
            {offers.title}
          </h2>
          <p
            data-reveal
            className="max-w-[52ch] text-lead leading-snug text-muted-foreground"
          >
            {offers.intro}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(17rem,auto))] lg:gap-4">
          <OfferCard
            offer={automation}
            locale={locale}
            className="col-span-2 lg:col-start-1 lg:row-start-1"
          />
          <OfferCard
            offer={consulting}
            locale={locale}
            className="col-span-2 lg:col-span-1 lg:col-start-4 lg:row-start-1"
          />
          <PrintCell
            src="/brand/ailabs-iso-dark.svg"
            tone="night"
            className="col-span-1 lg:col-start-3 lg:row-start-1"
          />
          <PrintCell
            shape="nodes"
            tone="purple"
            className="col-span-1 lg:col-start-1 lg:row-start-2"
          />
          <OfferCard
            offer={training}
            locale={locale}
            className="col-span-2 lg:col-start-2 lg:row-start-2"
          />
          <PrintCell
            shape="book"
            tone="purple"
            className="col-span-2 max-lg:aspect-[2/1] lg:col-span-1 lg:col-start-4 lg:row-start-2"
          />
        </div>
      </div>
    </Reveal>
  )
}

function OfferCard({
  offer,
  locale,
  className,
}: {
  offer: HomeOfferItem
  locale: Locale
  className?: string
}) {
  return (
    <article
      id={offer.id}
      aria-labelledby={`offer-${offer.id}-title`}
      data-reveal
      data-icon-hover
      className={cn(
        "relative flex flex-col items-start overflow-clip rounded-2xl bg-surface p-6 sm:p-8 lg:p-9",
        className
      )}
    >
      <HalftoneIcon
        shape={offerIcon[offer.id]}
        motion="hover"
        className="size-10 text-purple-ink"
      />
      <h3
        id={`offer-${offer.id}-title`}
        className="display mt-6 max-w-[16ch] text-[clamp(1.625rem,1.3rem+1.1vw,2.25rem)] text-balance"
      >
        {offer.title}
      </h3>
      <p className="mt-3 max-w-[40ch] text-body text-muted-foreground">
        {offer.body}
      </p>
      {offer.examples ? (
        <p className="mt-3 max-w-[40ch] text-small text-muted-foreground/80">
          {offer.examples}
        </p>
      ) : null}
      <Link
        to={localizedPath(locale, SERVICE_PAGE_PATHS[offer.id]) as never}
        className="text-action mt-auto pt-7"
      >
        {offer.link}
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          strokeWidth={2}
          className="size-4"
        />
      </Link>
    </article>
  )
}

export { HomeOffers }
