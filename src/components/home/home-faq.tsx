import type { HomeFaqContent } from "@/content"
import { Eyebrow } from "@/components/ui/eyebrow"
import { homeShellClassName } from "./home-styles"

type HomeFaqProps = {
  faq: HomeFaqContent
}

/** Answers stay expanded: the same text is the FAQPage JSON-LD. */
function HomeFaq({ faq }: HomeFaqProps) {
  return (
    <section
      id="faq"
      aria-labelledby="home-faq-title"
      className="section-y scroll-mt-[calc(var(--site-header-offset)+1rem)]"
    >
      <div className={homeShellClassName}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-4 lg:sticky lg:top-[calc(var(--site-header-offset)+2rem)] lg:self-start">
            <Eyebrow>{faq.label}</Eyebrow>
            <h2
              id="home-faq-title"
              className="max-w-lg font-display text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {faq.title}
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-border border-t border-border">
            {faq.items.map((item) => (
              <div key={item.question} className="py-6 first:pt-5">
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {item.question}
                </h3>
                <p className="mt-2 max-w-prose text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { HomeFaq }
