import type { HomeMethodContent, Locale } from "@/content"
import { HalftoneIcon } from "@/components/halftone/halftone-icon"
import { Reveal } from "@/components/halftone/reveal"
import type { ShapeName } from "@/lib/halftone-shapes"
import { homeHeadingClassName, homeShellClassName } from "./home-styles"

type HomeMethodProps = {
  method: HomeMethodContent
  locale: Locale
}

const stepShapes: ReadonlyArray<ShapeName> = ["search", "target", "arrow"]

/** Three verbs, read left to right; each prints its own halftone mark. */
function HomeMethod({ method }: HomeMethodProps) {
  return (
    <Reveal
      as="section"
      id="method"
      aria-labelledby="home-method-title"
      className="section-y relative bg-surface"
    >
      <span id="about" aria-hidden className="absolute top-0" />
      <div className={homeShellClassName}>
        <div className="flex max-w-3xl flex-col gap-5">
          <h2
            id="home-method-title"
            data-reveal
            className={homeHeadingClassName}
          >
            {method.title}
          </h2>
          <p
            data-reveal
            className="max-w-[52ch] text-lead leading-snug text-muted-foreground"
          >
            {method.body}
          </p>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-3">
          {method.steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              data-icon-hover
              className="border-t border-foreground/15 pt-6"
            >
              <HalftoneIcon
                shape={stepShapes[index] ?? "dot"}
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
  )
}

export { HomeMethod }
