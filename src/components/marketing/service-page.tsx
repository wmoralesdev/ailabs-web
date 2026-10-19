import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Cancel01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import type { ServicePagesContent } from "@/content"
import { MainCard } from "@/components/chrome/main-card"
import { useContact } from "@/components/contact/contact-provider"
import { homePillClassName } from "@/components/home/home-styles"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import {
  CONSULTING_PAGE_PATH,
  SERVICE_PAGE_IDS,
  SERVICE_PAGE_PATHS,
} from "@/lib/service-pages"
import type { ServicePageId } from "@/lib/service-pages"
import { cn } from "@/lib/utils"

const h2ClassName =
  "font-display text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl"

const textLinkClassName =
  "inline-flex min-h-11 items-center gap-2 text-base font-medium text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"

type ServicePageProps = {
  id: ServicePageId
  pages: ServicePagesContent
}

/** Everything is server-rendered and static: answers must not hide behind JS. */
function ServicePage({ id, pages }: ServicePageProps) {
  const { openContact } = useContact()
  const page = pages[id]
  const related = SERVICE_PAGE_IDS.filter((other) => other !== id)

  const contactButton = (
    <Button
      type="button"
      onClick={() => openContact(page.interest)}
      className={cn(
        homePillClassName,
        "h-auto min-h-12 w-fit text-left whitespace-normal"
      )}
    >
      {page.cta}
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
    </Button>
  )

  return (
    <MainCard>
      <article className="page-gutter section-y mx-auto w-full max-w-content">
        <nav aria-label={pages.breadcrumbLabel} className="mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
            <li>
              <Link
                to="/"
                className="underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {pages.homeLabel}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-foreground">
              {page.serviceName}
            </li>
          </ol>
        </nav>

        <header className="flex max-w-3xl flex-col gap-5">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-5xl">
            {page.title}
          </h1>
          <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
            {page.lead}
          </p>
          <div className="pt-2">{contactButton}</div>
        </header>

        <section
          aria-labelledby="service-definition"
          className="mt-16 max-w-prose"
        >
          <h2 id="service-definition" className={h2ClassName}>
            {page.definitionHeading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground">
            <strong className="font-semibold">{page.definition}</strong>
          </p>
        </section>

        <section aria-labelledby="service-includes" className="mt-16">
          <h2 id="service-includes" className={h2ClassName}>
            {page.includesHeading}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {page.includes.map((item) => (
              <li
                key={item.title}
                className="rounded-3xl border border-border bg-card p-6 text-card-foreground"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="service-steps"
          className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
        >
          <h2 id="service-steps" className={h2ClassName}>
            {page.stepsHeading}
          </h2>
          <ol className="flex flex-col divide-y divide-border border-t border-border">
            {page.steps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[2rem_1fr] gap-4 py-5"
              >
                <span
                  aria-hidden
                  className="pt-1 font-mono text-xs text-muted-foreground tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <section aria-labelledby="service-fit">
            <h2 id="service-fit" className={h2ClassName}>
              {page.fitHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {page.fit.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed">
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size={20}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-purple"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="service-not-fit">
            <h2 id="service-not-fit" className={h2ClassName}>
              {page.notFitHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {page.notFit.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section
          aria-labelledby="service-faq"
          className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
        >
          <h2 id="service-faq" className={h2ClassName}>
            {page.faqHeading}
          </h2>
          <div className="flex flex-col divide-y divide-border border-t border-border">
            {page.faq.map((item) => (
              <div key={item.question} className="py-5">
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {item.question}
                </h3>
                <p className="mt-2 max-w-prose text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="service-cta"
          className="mt-16 flex flex-col gap-4 rounded-3xl border border-border bg-card p-8 text-card-foreground sm:p-10"
        >
          <h2 id="service-cta" className={h2ClassName}>
            {page.ctaHeading}
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
            {page.ctaBody}
          </p>
          <div className="pt-2">{contactButton}</div>
        </section>

        <nav aria-labelledby="service-related" className="mt-12">
          <h2
            id="service-related"
            className="text-sm font-semibold text-foreground"
          >
            {pages.relatedLabel}
          </h2>
          <ul className="mt-2 flex flex-col">
            {related.map((other) => (
              <li key={other}>
                <Link
                  to={SERVICE_PAGE_PATHS[other]}
                  className={textLinkClassName}
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
              <Link to={CONSULTING_PAGE_PATH} className={textLinkClassName}>
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
              <Link to="/community" className={textLinkClassName}>
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
      </article>
    </MainCard>
  )
}

export { ServicePage }
