import type { HomeFaqContent } from "@/content"
import { HalftoneIcon } from "@/components/halftone/halftone-icon"
import { Reveal } from "@/components/halftone/reveal"
import { homeHeadingClassName, homeShellClassName } from "./home-styles"

type HomeFaqProps = {
  faq: HomeFaqContent
}

/**
 * Answers stay expanded: the same text is the FAQPage JSON-LD and llms.txt.
 * Two columns on wide screens keep the section about half as tall, so the
 * list reads in one sitting; reading order runs down each column.
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
        <div className="flex items-end justify-between gap-8">
          <h2 id="home-faq-title" data-reveal className={homeHeadingClassName}>
            {faq.title}
          </h2>
          <HalftoneIcon
            shape={["chat", "search", "sparkle", "target", "nodes", "book"]}
            grid={13}
            motion="morph"
            className="hidden size-24 shrink-0 text-purple-ink md:block"
          />
        </div>
        <div className="mt-12 gap-x-16 md:mt-16 lg:columns-2">
          {faq.items.map((item) => (
            <div
              key={item.question}
              data-reveal
              className="break-inside-avoid border-t border-foreground/15 py-6"
            >
              <h3 className="text-[1.125rem] leading-snug font-semibold md:text-[1.25rem]">
                {item.question}
              </h3>
              <p className="mt-2.5 max-w-[60ch] text-body text-muted-foreground">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export { HomeFaq }
