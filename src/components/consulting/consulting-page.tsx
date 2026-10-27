import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { ConsultingPageContent } from "@/content"
import { EVENT_PHOTOS } from "@/content/event-photos"
import { HalftoneIcon } from "@/components/halftone/halftone-icon"
import { HalftoneLens } from "@/components/halftone/halftone-lens"
import { Reveal } from "@/components/halftone/reveal"
import {
  homeHeadingClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { ShapeName } from "@/lib/halftone-shapes"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"

type ConsultingPageProps = {
  content: ConsultingPageContent
  onTalk: () => void
}

/** Delivery routes link to their own page; consulting is this page. */
const servicePagePath = {
  academy: SERVICE_PAGE_PATHS.training,
  agentic: SERVICE_PAGE_PATHS.automation,
} as const

const serviceShapes: ReadonlyArray<ShapeName> = ["sparkle", "book", "nodes"]
const stepShapes: ReadonlyArray<ShapeName> = ["search", "target", "arrow"]

function ConsultingPage({ content, onTalk }: ConsultingPageProps) {
  const photo = EVENT_PHOTOS[content.photo.name]

  return (
    <article className="bg-background">
      <header
        className={`${homeShellClassName} grid items-end gap-10 pt-10 pb-16 sm:pt-14 md:pb-24 lg:grid-cols-12 lg:gap-8 lg:pt-[clamp(2.5rem,8svh,5.5rem)]`}
      >
        <div className="flex flex-col items-start gap-6 lg:col-span-7">
          <Eyebrow>{content.label}</Eyebrow>
          <h1 className="display text-[clamp(2.5rem,1.4rem+4.4vw,5.25rem)]">
            {content.headline}
          </h1>
          <p className="max-w-[40ch] text-lead leading-snug">{content.lead}</p>
          {content.claims.map((claim) => (
            <p key={claim} className="max-w-[46ch] text-body leading-snug">
              {claim}
            </p>
          ))}
          <button type="button" onClick={onTalk} className="btn">
            {content.cta}
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </button>
        </div>
        <div className="lg:col-span-5">
          <HalftoneLens
            src={`/carousel/${content.photo.name}`}
            alt={content.photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority
            className="rounded-3xl"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          />
        </div>
      </header>

      <Reveal
        as="section"
        aria-labelledby="consulting-services-title"
        className="section-y bg-surface"
      >
        <div className={homeShellClassName}>
          <h2
            id="consulting-services-title"
            data-reveal
            className={homeHeadingClassName}
          >
            {content.servicesTitle}
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-12 md:mt-16 md:grid-cols-3">
            {content.services.map((service, index) => (
              <section
                key={service.id}
                aria-labelledby={`consulting-${service.id}-title`}
                data-reveal
                data-icon-hover
                className="border-t border-foreground/15 pt-6"
              >
                <HalftoneIcon
                  shape={serviceShapes[index] ?? "dot"}
                  motion="hover"
                  className="mb-8 size-16 text-purple-ink"
                />
                <h3
                  id={`consulting-${service.id}-title`}
                  className="display text-[clamp(1.75rem,1.4rem+1vw,2.375rem)]"
                >
                  {service.name}
                </h3>
                <p className="mt-3 max-w-[38ch] text-body text-muted-foreground">
                  {service.body}
                </p>
                {service.link && service.id in servicePagePath ? (
                  <Link
                    to={
                      servicePagePath[
                        service.id as keyof typeof servicePagePath
                      ]
                    }
                    className="text-action mt-4"
                  >
                    {service.link}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                  </Link>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal
        as="section"
        aria-labelledby="consulting-method-title"
        className="section-y"
      >
        <div className={`${homeShellClassName} grid gap-12 lg:grid-cols-12`}>
          <div className="flex flex-col gap-5 lg:col-span-5">
            <h2
              id="consulting-method-title"
              data-reveal
              className={homeHeadingClassName}
            >
              {content.methodTitle}
            </h2>
            <p
              data-reveal
              className="max-w-[46ch] text-lead leading-snug text-muted-foreground"
            >
              {content.methodBody}
            </p>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {content.steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                data-icon-hover
                className="grid grid-cols-[3.5rem_1fr] gap-x-5 border-t border-foreground/15 py-6"
              >
                <HalftoneIcon
                  shape={stepShapes[index] ?? "dot"}
                  motion="hover"
                  className="size-12 text-purple-ink"
                />
                <div>
                  <h3 className="display text-[1.75rem]">{step.title}</h3>
                  <p className="mt-2 text-body text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal as="div" className="section-y bg-surface">
        <div className={`${homeShellClassName} flex flex-col gap-14`}>
          {content.faqs.map((faq) => (
            <section
              key={faq.question}
              data-reveal
              className="grid gap-5 border-t border-foreground/15 pt-8 lg:grid-cols-12 lg:gap-8"
            >
              <h2 className="display text-[clamp(1.875rem,1.4rem+1.5vw,2.75rem)] leading-[1] lg:col-span-5">
                {faq.question}
              </h2>
              <p className="max-w-[60ch] text-lead leading-snug text-muted-foreground lg:col-span-6 lg:col-start-7">
                {faq.answer}
              </p>
            </section>
          ))}
        </div>
      </Reveal>
    </article>
  )
}

export { ConsultingPage }
