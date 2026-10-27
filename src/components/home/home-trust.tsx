import { HalftoneLogo } from "@/components/halftone/halftone-logo"
import { homeShellClassName } from "@/components/home/home-styles"
import type { HomeTrustContent } from "@/content/types"
import type { LogoName } from "@/lib/logo-dots"

type HomeTrustProps = { trust: HomeTrustContent }

/**
 * The ambassador programs, printed as halftone marks on the purple field the
 * hero's water rises into. A static list: nothing moves until the pointer
 * passes over a mark.
 */
function HomeTrust({ trust }: HomeTrustProps) {
  return (
    <section
      id="trust"
      aria-labelledby="home-trust-title"
      className="bg-purple py-12 text-on-purple md:py-16"
    >
      <div
        className={`${homeShellClassName} grid gap-8 lg:grid-cols-12 lg:items-center`}
      >
        <h2
          id="home-trust-title"
          className="max-w-[18ch] text-lead leading-snug font-semibold lg:col-span-3"
        >
          {trust.label}
        </h2>
        <ul className="grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-7 lg:col-span-9">
          {trust.logos.map((logo) => (
            <li
              key={logo.id}
              data-icon-hover
              className="flex flex-col items-start gap-2.5"
            >
              <HalftoneLogo
                name={logo.id satisfies LogoName}
                className="size-12 md:size-14"
              />
              <span className="text-small font-semibold">{logo.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export { HomeTrust }
export type { HomeTrustProps }
