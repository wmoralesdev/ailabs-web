import { useRef } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { HomeServicesContent, Locale } from "@/content"
import { useContact } from "@/components/contact/contact-provider"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { homePillClassName, homeShellClassName } from "./home-styles"
import { HomeServiceVisual } from "./home-service-visual"
import { useHomeEntrance } from "@/lib/home-motion"
import { cn } from "@/lib/utils"

type HomeServicesProps = {
  services: HomeServicesContent
  locale: Locale
}

function HomeServices({ services, locale }: HomeServicesProps) {
  const root = useRef<HTMLElement>(null)
  const { openContact } = useContact()
  useHomeEntrance(root, "services", locale)

  return (
    <section
      ref={root}
      id="services"
      aria-labelledby="home-services-title"
      className="section-y scroll-mt-[calc(var(--site-header-offset)+1rem)] bg-background"
    >
      <div className={homeShellClassName}>
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div className="flex flex-col gap-4">
            <Eyebrow>{services.label}</Eyebrow>
            <h2
              id="home-services-title"
              className="font-display text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {services.title}
            </h2>
          </div>
          <div className="flex max-w-xl flex-col items-start gap-2">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {services.body}
            </p>
            <Link
              to="/consultoria-de-ia"
              className="inline-flex min-h-11 items-center text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {services.pageLabel}
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-0">
          {services.items.map((service) => (
            <article
              key={service.id}
              id={service.id}
              data-home-entrance
              aria-labelledby={`service-${service.id}-title`}
              className="flex min-w-0 scroll-mt-[calc(var(--site-header-offset)+1rem)] flex-col rounded-3xl border border-border bg-card p-6 text-card-foreground sm:p-8 lg:row-span-6 lg:grid lg:grid-rows-subgrid lg:p-10"
            >
              <div data-service-part>
                <Eyebrow>{service.brand}</Eyebrow>
              </div>
              <h3
                id={`service-${service.id}-title`}
                data-service-part
                className="mt-4 font-display text-2xl leading-tight font-semibold tracking-tight sm:text-3xl"
              >
                {service.title}
              </h3>
              <p
                data-service-part
                className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground"
              >
                {service.body}
              </p>
              <HomeServiceVisual service={service.id} />
              <ul
                data-service-part
                className="mt-6 flex flex-col divide-y divide-border border-y border-border"
              >
                {service.points.map((point) => (
                  <li key={point} className="py-3 text-sm leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
              <div data-service-part className="mt-auto pt-8">
                <Button
                  type="button"
                  onClick={() => openContact(service.interest)}
                  className={cn(
                    homePillClassName,
                    "h-auto min-h-12 w-fit text-left whitespace-normal"
                  )}
                >
                  {service.cta}
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
                </Button>
                <Link
                  to={
                    service.id === "academy"
                      ? "/capacitacion-ia"
                      : "/automatizacion-con-ia"
                  }
                  className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  {service.pageLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { HomeServices }
