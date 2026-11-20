/** Ai Labs artwork offered on /brand, all under public/brand. */

export const BRAND_PAGE_PATH = "/brand"

/** Rebuilt by `pnpm brand:kit` from `BRAND_KIT_FILES`. */
export const BRAND_KIT_PATH = "/brand/ailabs-brand-kit.zip"

/**
 * Each variant names the background it sits on. `ailabs-dark.svg` carries
 * dark ink, so it is the file for a light background.
 */
export const BRAND_LOGOS = {
  lockup: {
    light: "/brand/ailabs-dark.svg",
    dark: "/brand/ailabs-light.svg",
  },
  mark: {
    light: "/brand/ailabs-iso-dark.svg",
    dark: "/brand/ailabs-iso-light.svg",
  },
  icon: "/brand/ailabs-ico.svg",
} as const

/**
 * Only Ai Labs artwork goes in the kit: public/brand also holds
 * third-party marks that are not ours to hand out.
 */
export const BRAND_KIT_FILES = [
  BRAND_LOGOS.lockup.light,
  BRAND_LOGOS.lockup.dark,
  BRAND_LOGOS.mark.light,
  BRAND_LOGOS.mark.dark,
  BRAND_LOGOS.icon,
].map((path) => path.replace("/brand/", ""))
