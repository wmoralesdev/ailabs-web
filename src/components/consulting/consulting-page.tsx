import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { ConsultingPageContent } from "@/content"
import { MainCard } from "@/components/chrome/main-card"
import { homePillClassName } from "@/components/home/home-styles"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

type ConsultingPageProps = {
  content: ConsultingPageContent
  onTalk: () => void
}

function ConsultingPage({ content, onTalk }: ConsultingPageProps) {
  return (
    <MainCard>
      <article className="page-gutter section-y mx-auto w-full max-w-content">
        <header className="flex max-w-prose flex-col items-start gap-5">
          <Eyebrow>{content.label}</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {content.headline}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {content.lead}
          </p>
          <Button
            type="button"
            onClick={onTalk}
            className={cn(homePillClassName, "w-fit")}
          >
            {content.cta}
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </Button>
        </header>

        <section aria-labelledby="consulting-services-title" className="mt-16">
          <h2
            id="consulting-services-title"
            className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {content.servicesTitle}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {content.services.map((service) => (
              <section
                key={service.id}
                aria-labelledby={`consulting-${service.id}-title`}
                className="rounded-3xl border border-border bg-card p-6 text-card-foreground"
              >
                <h3
                  id={`consulting-${service.id}-title`}
                  className="font-display text-xl font-semibold tracking-tight"
                >
                  {service.name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {service.body}
                </p>
              </section>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="consulting-method-title"
          className="mt-16 max-w-prose"
        >
          <h2
            id="consulting-method-title"
            className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {content.methodTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.methodBody}
          </p>
          <ol className="mt-8 flex flex-col gap-6">
            {content.steps.map((step) => (
              <li key={step.title}>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {content.faqs.map((faq) => (
          <section key={faq.question} className="mt-16 max-w-prose">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {faq.question}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </section>
        ))}
      </article>
    </MainCard>
  )
}

export { ConsultingPage }
