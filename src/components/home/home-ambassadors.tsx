import { HalftoneLogo } from "@/components/halftone/halftone-logo"
import { homeShellClassName } from "@/components/home/home-styles"
import type { HomeAmbassadorsContent, HomeTrustLogo } from "@/content/types"
import type { LogoName } from "@/lib/logo-dots"

type HomeAmbassadorsProps = { ambassadors: HomeAmbassadorsContent }

function Mark({ logo }: { logo: HomeTrustLogo }) {
  return (
    <li
      data-icon-hover
      className="group flex flex-col items-start gap-2.5"
    >
      <HalftoneLogo
        name={logo.id satisfies LogoName}
        className="size-11 text-foreground transition-colors duration-300 group-hover:text-purple-ink md:size-12"
      />
      <span className="text-small font-medium text-muted-foreground">
        {logo.name}
      </span>
    </li>
  )
}

/**
 * The proof strip under the hero: the ambassador programs printed as
 * halftone marks, the tools we work with but are not ambassadors of, one
 * sentence on what the programs give us, and the single number we publish.
 * Nothing moves until the pointer passes over a mark.
 */
function HomeAmbassadors({ ambassadors }: HomeAmbassadorsProps) {
  return (
    <section
      id="programas"
      aria-labelledby="home-ambassadors-title"
      className="border-y border-border bg-background py-10 md:py-14"
    >
      <div className={`${homeShellClassName} grid gap-8 lg:grid-cols-12`}>
        <div className="flex flex-col gap-6 lg:col-span-9">
          <div className="flex flex-wrap items-start gap-x-10 gap-y-6">
            <div className="flex flex-col gap-4">
              <h2
                id="home-ambassadors-title"
                className="text-body leading-snug font-semibold text-muted-foreground"
              >
                {ambassadors.label}
              </h2>
              <ul className="flex flex-wrap gap-x-7 gap-y-6">
                {ambassadors.logos.map((logo) => (
                  <Mark key={logo.id} logo={logo} />
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 border-l border-border pl-8">
              <p className="text-body leading-snug font-semibold text-muted-foreground">
                {ambassadors.partnersLabel}
              </p>
              <ul className="flex flex-wrap gap-x-7 gap-y-6">
                {ambassadors.partners.map((logo) => (
                  <Mark key={logo.id} logo={logo} />
                ))}
              </ul>
            </div>
          </div>
          <p className="max-w-[60ch] text-body leading-snug text-muted-foreground">
            {ambassadors.body}
          </p>
        </div>
        <div className="flex flex-col gap-1 border-t border-border pt-5 lg:col-span-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <p className="display text-[clamp(2rem,1.4rem+2vw,3rem)] leading-none text-foreground">
            {ambassadors.stat.value}
          </p>
          <p className="text-body text-muted-foreground">
            {ambassadors.stat.label}
          </p>
        </div>
      </div>
    </section>
  )
}

export { HomeAmbassadors }
export type { HomeAmbassadorsProps }
