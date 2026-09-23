import { HugeiconsIcon } from "@hugeicons/react"
import { Alert02Icon } from "@hugeicons/core-free-icons"

import type {
  LegalContent,
  LegalDocument as LegalDocumentContent,
  Locale,
} from "@/content"
import { MainCard } from "@/components/chrome/main-card"

const INTL_LOCALE: Record<Locale, string> = { en: "en-US", es: "es-SV" }

/** UTC keeps the server render and the hydrated date identical. */
export function formatLegalDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`))
}

const sectionScrollClassName =
  "scroll-mt-[calc(var(--site-header-offset)+2rem)]"

type LegalDocumentProps = {
  legal: LegalContent
  document: LegalDocumentContent
  locale: Locale
}

function LegalDocument({ legal, document, locale }: LegalDocumentProps) {
  const version = legal.versionLabel.replace("{version}", legal.version)
  const updated = legal.updatedLabel.replace(
    "{date}",
    formatLegalDate(legal.updatedOn, locale)
  )

  return (
    <MainCard>
      <article className="page-gutter section-y mx-auto w-full max-w-content">
        <header className="flex max-w-prose flex-col gap-5">
          {legal.status === "draft" ? (
            <p
              role="note"
              className="flex w-fit items-start gap-2.5 rounded-md border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground"
            >
              <HugeiconsIcon
                icon={Alert02Icon}
                strokeWidth={2}
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              {legal.draftNotice}
            </p>
          ) : null}
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {document.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {version} · {updated}
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {document.intro}
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <nav aria-labelledby="legal-contents" className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--site-header-offset)+2rem)]">
              <h2
                id="legal-contents"
                className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
              >
                {legal.contentsLabel}
              </h2>
              <ol className="mt-3 flex flex-col">
                {document.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="flex flex-col gap-10 lg:col-span-8">
            {document.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className={sectionScrollClassName}
              >
                <h2
                  id={`${section.id}-heading`}
                  className="font-display text-2xl font-semibold tracking-tight text-foreground"
                >
                  {section.heading}
                </h2>
                <div className="mt-3 flex max-w-prose flex-col gap-3 text-base leading-relaxed text-foreground/80">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </MainCard>
  )
}

export { LegalDocument }
