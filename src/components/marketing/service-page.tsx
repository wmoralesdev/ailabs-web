import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { ServicePagesContent } from "@/content"
import { EVENT_PHOTOS } from "@/content/event-photos"
import { useContact } from "@/components/contact/contact-provider"
import { HalftoneIcon } from "@/components/halftone/halftone-icon"
import { HalftoneLens } from "@/components/halftone/halftone-lens"
import { Reveal } from "@/components/halftone/reveal"
import { homeShellClassName } from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { ShapeName } from "@/lib/halftone-shapes"
import { useLocaleContext } from "@/lib/locale-context"
import { localizedPath } from "@/lib/locale-path"
import {
  CONSULTING_PAGE_PATH,
  SERVICE_PAGE_IDS,
  SERVICE_PAGE_PATHS,
} from "@/lib/service-pages"
import type { ServicePageId } from "@/lib/service-pages"

const h2ClassName = "display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)]"

const relatedLinkClassName = "text-action text-body"

type ServicePageProps = {
  id: ServicePageId
  pages: ServicePagesContent
}

const includeShapes: ReadonlyArray<ShapeName> = [
  "target",
  "sparkle",
  "tiles",
  "chat",
]
const stepShapes: ReadonlyArray<ShapeName> = ["search", "nodes", "arrow"]

/** Everything is server-rendered and static: answers must not hide behind JS. */
function ServicePage({ id, pages }: ServicePageProps) {
  const { locale } = useLocaleContext()
  const { openContact } = useContact()
  const page = pages[id]
  const related = SERVICE_PAGE_IDS.filter((other) => other !== id)
  const photo = EVENT_PHOTOS[page.photo.name]
  const to = (path: string) => localizedPath(locale, path) as never

  return (
    <article className="bg-background">
      <div className={`${homeShellClassName} pt-8 pb-16 sm:pt-10 md:pb-24`}>
        <nav aria-label={pages.breadcrumbLabel} className="mb-10 text-small">
          <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
            <li>
              <Link to={to("/")} className="link-underline hover:text-foreground">
                {pages.homeLabel}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-foreground">
              {page.serviceName}
            </li>
          </ol>
        </nav>

        <header className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <h1 className="display text-[clamp(2.5rem,1.4rem+4vw,5rem)]">
              {page.title}
            </h1>
            <p className="max-w-[46ch] text-lead leading-snug">{page.lead}</p>
            {page.claims.map((claim) => (
              <p key={claim} className="max-w-[46ch] text-body leading-snug">
                {claim}
              </p>
            ))}
            <button
              type="button"
              onClick={() => openContact(page.interest)}
              className="btn"
            >
              {page.cta}
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </button>
          </div>
          <div className="lg:col-span-5">
            <HalftoneLens
              src={`/carousel/${page.photo.name}`}
              alt={page.photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
              className="rounded-3xl"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            />
          </div>
        </header>
      </div>

      <section
        aria-labelledby="service-definition"
        className={homeShellClassName}
      >
        <div className="grid gap-6 rounded-3xl bg-purple p-6 text-on-purple sm:p-10 lg:grid-cols-12 lg:p-14">
          <h2
            id="service-definition"
            className="text-lead leading-snug font-semibold lg:col-span-4"
          >
            {page.definitionHeading}
          </h2>
          <p className="display text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-[1.05] lg:col-span-8">
            {page.definition}
          </p>
        </div>
      </section>

      <Reveal
        as="section"
        aria-labelledby="service-includes"
        className="section-y"
      >
        <div className={homeShellClassName}>
          <h2 id="service-includes" data-reveal className={h2ClassName}>
            {page.includesHeading}
          </h2>
          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-16">
            {page.includes.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                data-icon-hover
                className="grid grid-cols-[3.5rem_1fr] gap-x-5 border-t border-foreground/15 pt-6"
              >
                <HalftoneIcon
                  shape={includeShapes[index % includeShapes.length] ?? "dot"}
                  motion="hover"
                  className="size-12 text-purple-ink"
                />
                <div>
                  <h3 className="display text-[1.75rem]">{item.title}</h3>
                  <p className="mt-2 max-w-[44ch] text-body text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal
        as="section"
        aria-labelledby="service-steps"
        className="section-y bg-surface"
      >
        <div className={homeShellClassName}>
          <h2 id="service-steps" data-reveal className={h2ClassName}>
            {page.stepsHeading}
          </h2>
          <ol className="mt-12 grid gap-x-8 gap-y-12 md:mt-16 md:grid-cols-3">
            {page.steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                data-icon-hover
                className="border-t border-foreground/15 pt-6"
              >
                <HalftoneIcon
                  shape={stepShapes[index % stepShapes.length] ?? "dot"}
                  motion="hover"
                  className="mb-8 size-16 text-purple-ink"
                />
                <h3 className="display text-[clamp(1.75rem,1.4rem+1vw,2.375rem)]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-body text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal as="div" className="section-y">
        <div className={`${homeShellClassName} grid gap-14 md:grid-cols-2`}>
          <section aria-labelledby="service-fit" data-reveal>
            <h2 id="service-fit" className={h2ClassName}>
              {page.fitHeading}
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {page.fit.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[1.25rem_1fr] gap-3 text-body leading-snug"
                >
                  <HalftoneIcon
                    shape="check"
                    grid={7}
                    className="mt-[0.2em] size-4 text-purple-ink"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="service-not-fit" data-reveal>
            <h2 id="service-not-fit" className={h2ClassName}>
              {page.notFitHeading}
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {page.notFit.map((item) => (
                <li
                  key={item}
                  className="grid grid-cols-[1.25rem_1fr] gap-3 text-body leading-snug text-muted-foreground"
                >
                  <HalftoneIcon
                    shape="plus"
                    grid={7}
                    className="mt-[0.2em] size-4 rotate-45"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Reveal>

      <Reveal
        as="section"
        aria-labelledby="service-faq"
        className="section-y bg-surface"
      >
        <div className={`${homeShellClassName} grid gap-10 lg:grid-cols-12`}>
          <h2
            id="service-faq"
            data-reveal
            className={`${h2ClassName} lg:col-span-4`}
          >
            {page.faqHeading}
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            {page.faq.map((item) => (
              <div
                key={item.question}
                data-reveal
                className="border-t border-foreground/15 py-7 first:border-t-0 first:pt-0"
              >
                <h3 className="text-[1.1875rem] leading-snug font-semibold md:text-[1.375rem]">
                  {item.question}
                </h3>
                <p className="mt-3 max-w-[60ch] text-body text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <section aria-labelledby="service-cta" className="section-y">
        <div
          className={`${homeShellClassName} grid gap-12 lg:grid-cols-12 lg:items-end`}
        >
          <div className="flex flex-col items-start gap-5 lg:col-span-7">
            <h2 id="service-cta" className={h2ClassName}>
              {page.ctaHeading}
            </h2>
            <p className="max-w-[52ch] text-lead leading-snug text-muted-foreground">
              {page.ctaBody}
            </p>
            <button
              type="button"
              onClick={() => openContact(page.interest)}
              className="btn"
            >
              {page.cta}
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </button>
          </div>

          <nav
            aria-labelledby="service-related"
            className="lg:col-span-4 lg:col-start-9"
          >
            <h2
              id="service-related"
              className="text-small font-semibold text-muted-foreground"
            >
              {pages.relatedLabel}
            </h2>
            <ul className="mt-2 flex flex-col">
              {related.map((other) => (
                <li key={other}>
                  <Link
                    to={to(SERVICE_PAGE_PATHS[other])}
                    className={relatedLinkClassName}
                  >
                    {pages[other].serviceName}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={to(CONSULTING_PAGE_PATH)}
                  className={relatedLinkClassName}
                >
                  {pages.consultingLink}
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>
              </li>
              <li>
                <Link to={to("/events")} className={relatedLinkClassName}>
                  {pages.eventsLink}
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>
              </li>
              <li>
                <Link to={to("/community")} className={relatedLinkClassName}>
                  {pages.communityLink}
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </article>
  )
}

export { ServicePage }
