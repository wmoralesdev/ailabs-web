/** Partner brand blue for Wompi checkout CTAs (not an Ai Labs token). */
export const WOMPI_BLUE = "#4666FF" as const

/**
 * Shared class for Wompi pay CTAs. Overrides default primary button colors.
 * Hover darkens slightly; focus ring stays visible on the blue field.
 */
export const wompiPayButtonClassName =
  "min-h-11 cursor-pointer bg-[#4666FF] text-white transition-colors duration-200 hover:bg-[#3a57e0] focus-visible:border-white/50 focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-11"
