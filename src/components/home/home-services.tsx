import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { HomeServiceItem, HomeServicesContent, Locale } from "@/content"
import { EVENT_PHOTOS } from "@/content/event-photos"
import type { EventPhoto } from "@/content/event-photos"
import { useContact } from "@/components/contact/contact-provider"
import { HalftoneCanvas } from "@/components/halftone/halftone-canvas"
import { HalftoneIcon } from "@/components/halftone/halftone-icon"
import { HalftoneLens } from "@/components/halftone/halftone-lens"
import { Reveal } from "@/components/halftone/reveal"
import { HomeCtaLink } from "@/components/home/home-cta-link"
import { homeHeadingClassName, homeShellClassName } from "./home-styles"
import type { ShapeName } from "@/lib/halftone-shapes"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"
import { cn } from "@/lib/utils"

const servicePagePath = {
  academy: SERVICE_PAGE_PATHS.training,
  agentic: SERVICE_PAGE_PATHS.automation,
} as const

const serviceIcon = {
  academy: "book",
  agentic: "nodes",
} as const satisfies Record<HomeServiceItem["id"], ShapeName>

/** One cell of the bento: its placement on desktop and the look below it. */
const cellClassName = "relative overflow-clip rounded-2xl"

type HomeServicesProps = {
  services: HomeServicesContent
  locale: Locale
}

/**
 * Consulting first, then its two routes as one bento. Each route has a text
 * cell, two real event photos (a halftone lens follows the pointer over
 * them), and one cell that is pure halftone, printed live and inked by the
 * pointer: the Academy book, and the Ai Labs mark beside Agentic. The two halves mirror each other.
 */
function HomeServices({ services, locale }: HomeServicesProps) {
  const [academy, agentic] = services.items

  return (
    <Reveal
      as="section"
      id="services"
      aria-labelledby="home-services-title"
      className="section-y bg-background"
    >
      <div className={homeShellClassName}>
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <h2
            id="home-services-title"
            data-reveal
            className={homeHeadingClassName}
          >
            {services.title}
          </h2>
          <p
            data-reveal
            className="max-w-[52ch] text-lead leading-snug text-muted-foreground"
          >
            {services.body}
          </p>
          <div data-reveal>
            <HomeCtaLink
              cta={services.pageLink}
              locale={locale}
              variant="quiet"
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 lg:grid-cols-4 lg:grid-rows-[repeat(4,minmax(13.5rem,auto))] lg:gap-4">
          <ServiceCard
            service={academy}
            className="col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1"
          />
          <PhotoCell
            photo={academy.photos[0]}
            className="col-span-2 aspect-[4/3] lg:col-start-3 lg:row-start-1 lg:aspect-auto"
          />
          <PrintCell
            shape={serviceIcon.academy}
            tone="purple"
            className="lg:col-start-3 lg:row-start-2"
          />
          <PhotoCell
            photo={academy.photos[1]}
            className="aspect-square lg:col-start-4 lg:row-start-2 lg:aspect-auto"
          />

          <ServiceCard
            service={agentic}
            className="col-span-2 lg:col-start-3 lg:row-span-2 lg:row-start-3"
          />
          <PhotoCell
            photo={agentic.photos[0]}
            className="aspect-square lg:col-start-1 lg:row-start-3 lg:aspect-auto"
          />
          <PrintCell
            src="/brand/ailabs-iso-dark.svg"
            tone="night"
            className="lg:col-start-2 lg:row-start-3"
          />
          <PhotoCell
            photo={agentic.photos[1]}
            className="col-span-2 aspect-[4/3] lg:col-start-1 lg:row-start-4 lg:aspect-auto"
          />
        </div>
      </div>
    </Reveal>
  )
}

function ServiceCard({
  service,
  className,
}: {
  service: HomeServiceItem
  className?: string
}) {
  const { openContact } = useContact()

  return (
    <article
      id={service.id}
      aria-labelledby={`service-${service.id}-title`}
      data-reveal
      data-icon-hover
      className={cn(
        cellClassName,
        "flex flex-col items-start bg-surface p-6 sm:p-8 lg:p-10",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <HalftoneIcon
          shape={serviceIcon[service.id]}
          motion="hover"
          className="size-9 text-purple-ink"
        />
        <span className="text-small font-semibold">{service.brand}</span>
      </div>
      <h3
        id={`service-${service.id}-title`}
        className="display mt-6 max-w-[18ch] text-[clamp(1.75rem,1.35rem+1.3vw,2.5rem)]"
      >
        {service.title}
      </h3>
      <p className="mt-4 max-w-[44ch] text-body text-muted-foreground">
        {service.body}
      </p>
      <ul className="mt-6 flex flex-col gap-2.5">
        {service.points.map((point) => (
          <li
            key={point}
            className="grid grid-cols-[1.25rem_1fr] gap-2 text-body leading-snug"
          >
            <HalftoneIcon
              shape="check"
              grid={7}
              className="mt-[0.2em] size-4 text-purple-ink"
            />
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-8">
        <button
          type="button"
          onClick={() => openContact(service.interest)}
          className="btn"
        >
          {service.cta}
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        </button>
        <Link to={servicePagePath[service.id]} className="text-action">
          {service.learnMore}
        </Link>
      </div>
    </article>
  )
}

function PhotoCell({
  photo,
  className,
}: {
  photo: EventPhoto
  className?: string
}) {
  const size = EVENT_PHOTOS[photo.name]

  return (
    <div data-reveal className={cn(cellClassName, className)}>
      <HalftoneLens
        src={`/carousel/${photo.name}`}
        alt={photo.alt}
        width={size.width}
        height={size.height}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="absolute inset-0 size-full"
      />
    </div>
  )
}

const printTones = {
  purple:
    "bg-purple [--ht-accent:var(--color-print)] [--ht-faint:color-mix(in_srgb,var(--color-on-purple)_14%,transparent)] [--ht-ink:var(--color-on-purple)]",
  night:
    "bg-night ring-1 ring-snow/10 ring-inset [--ht-accent:var(--color-snow)] [--ht-faint:color-mix(in_srgb,var(--color-snow)_12%,transparent)] [--ht-ink:var(--color-purple)]",
} as const

function PrintCell({
  shape,
  src,
  tone,
  className,
}: {
  shape?: ShapeName
  src?: string
  tone: keyof typeof printTones
  className?: string
}) {
  return (
    <div
      data-reveal
      data-halftone-surface
      className={cn(
        cellClassName,
        "aspect-square lg:aspect-auto",
        printTones[tone],
        className
      )}
    >
      <HalftoneCanvas
        shape={shape}
        src={src}
        cell={10}
        density={30}
        area={{ left: 0.12, top: 0.12, width: 0.76, height: 0.76 }}
        className="absolute inset-0"
      />
    </div>
  )
}

export { HomeServices }
