import type { HomeFaqContent } from "@/content"
import { HalftoneIcon } from "@/components/halftone/halftone-icon"
import { Reveal } from "@/components/halftone/reveal"
import { homeHeadingClassName, homeShellClassName } from "./home-styles"

type HomeFaqProps = {
  faq: HomeFaqContent
}

/**
 * Answers stay expanded: the same text is the FAQPage JSON-LD and llms.txt.
 * A halftone mark cycles through shapes beside the list on wide screens.
 */
function HomeFaq({ faq }: HomeFaqProps) {
  return (
    <Reveal
      as="section"
      id="faq"
      aria-labelledby="home-faq-title"
      className="section-y bg-background"
    >
      <div className={homeShellClassName}>
        <h2 id="home-faq-title" data-reveal className={homeHeadingClassName}>
          {faq.title}
        </h2>
        <div className="mt-12 md:mt-20 md:grid md:grid-cols-12 md:gap-x-8">
          <div aria-hidden="true" className="hidden md:col-span-3 md:block">
            <HalftoneIcon
              shape={["chat", "search", "sparkle", "target", "nodes", "book"]}
              grid={13}
              motion="morph"
              className="sticky top-[calc(var(--site-header-height)+2.5rem)] w-full max-w-[14rem] text-purple-ink"
            />
          </div>
          <div className="md:col-span-8 md:col-start-5">
            {faq.items.map((item) => (
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
      </div>
    </Reveal>
  )
}

export { HomeFaq }
