import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { HomeServicesContent, Locale } from "@/content"
import { EVENT_PHOTOS } from "@/content/event-photos"
import { useContact } from "@/components/contact/contact-provider"
import { HalftoneIcon } from "@/components/halftone/halftone-icon"
import { HalftonePhoto } from "@/components/halftone/halftone-photo"
import { Reveal } from "@/components/halftone/reveal"
import { HomeCtaLink } from "@/components/home/home-cta-link"
import { homeHeadingClassName, homeShellClassName } from "./home-styles"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"
import { cn } from "@/lib/utils"

const servicePagePath = {
  academy: SERVICE_PAGE_PATHS.training,
  agentic: SERVICE_PAGE_PATHS.automation,
} as const

const serviceIcon = {
  academy: "book",
  agentic: "nodes",
} as const

type HomeServicesProps = {
  services: HomeServicesContent
  locale: Locale
}

/**
 * Consulting first, then its two delivery routes. Each route pairs a real
 * event photo, printed as halftone, with its promise; the second mirrors the
 * first so the two read as one spread.
 */
function HomeServices({ services, locale }: HomeServicesProps) {
  const { openContact } = useContact()

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

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
          {services.items.map((service, index) => {
            const photo = EVENT_PHOTOS[service.photo.name]
            const flip = index % 2 === 1
            return (
              <article
                key={service.id}
                id={service.id}
                aria-labelledby={`service-${service.id}-title`}
                className="grid items-center gap-8 md:grid-cols-12 md:gap-x-8"
              >
                <div
                  data-reveal="clip"
                  className={cn(
                    "md:col-span-7",
                    flip && "md:order-2 md:col-start-6"
                  )}
                >
                  <HalftonePhoto
                    name={service.photo.name}
                    alt={service.photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 768px) 56vw, 100vw"
                    tone={
                      flip
                        ? "bg-purple text-on-purple"
                        : "bg-print text-on-purple"
                    }
                  />
                </div>
                <div
                  data-icon-hover
                  className={cn(
                    "flex flex-col items-start md:col-span-5",
                    flip && "md:order-1 md:col-span-4 md:col-start-1"
                  )}
                >
                  <div data-reveal className="flex items-center gap-4">
                    <HalftoneIcon
                      shape={serviceIcon[service.id]}
                      motion="hover"
                      className="size-12 text-purple-ink"
                    />
                    <span className="text-small font-semibold">
                      {service.brand}
                    </span>
                  </div>
                  <h3
                    id={`service-${service.id}-title`}
                    data-reveal
                    className="display mt-6 text-[clamp(1.875rem,1.4rem+1.5vw,2.75rem)] leading-[1]"
                  >
                    {service.title}
                  </h3>
                  <p
                    data-reveal
                    className="mt-4 max-w-[44ch] text-body text-muted-foreground"
                  >
                    {service.body}
                  </p>
                  <ul data-reveal className="mt-6 flex flex-col gap-2.5">
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
                  <div
                    data-reveal
                    className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
                  >
                    <button
                      type="button"
                      onClick={() => openContact(service.interest)}
                      className="btn"
                    >
                      {service.cta}
                      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
                    </button>
                    <Link
                      to={servicePagePath[service.id]}
                      className="text-action"
                    >
                      {service.learnMore}
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </Reveal>
  )
}

export { HomeServices }
