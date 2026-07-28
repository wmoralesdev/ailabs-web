import type { HomeAgenticPillarContent, HomeProcessGlyph } from "@/content"
import { cn } from "@/lib/utils"

type HomeAgenticProcessProps = {
  process: HomeAgenticPillarContent["process"]
  className?: string
}

function BriefGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 64"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect
        x="10"
        y="8"
        width="68"
        height="48"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M20 22h36M20 32h28M20 42h20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="54"
        y="38"
        width="14"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function BenchGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 64"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect
        x="8"
        y="14"
        width="40"
        height="28"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="40"
        y="22"
        width="40"
        height="28"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 24h16M16 30h12"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="52" cy="34" r="3" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="66" cy="34" r="3" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function LiveGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 64"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect
        x="14"
        y="10"
        width="60"
        height="40"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M22 40V28l8 6 8-12 8 10 8-6v14H22z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <circle cx="68" cy="18" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M65 18l2.2 2.2L72 15.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ProcessGlyph({
  glyph,
  className,
}: {
  glyph: HomeProcessGlyph
  className?: string
}) {
  switch (glyph) {
    case "brief":
      return <BriefGlyph className={className} />
    case "bench":
      return <BenchGlyph className={className} />
    case "live":
      return <LiveGlyph className={className} />
    default: {
      const _exhaustive: never = glyph
      return _exhaustive
    }
  }
}

function GlyphFrame({
  glyph,
  className,
}: {
  glyph: HomeProcessGlyph
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-on-dark/15 bg-on-dark/5 text-on-dark",
        className
      )}
    >
      <ProcessGlyph glyph={glyph} className="h-auto w-full max-w-20" />
    </div>
  )
}

function FlowArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={cn("text-purple/70", className)}
    >
      <path
        d="M2 2.5 L9 6 L2 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FlowPath() {
  return (
    <div
      className="pointer-events-none absolute inset-x-6 top-[4.75rem] hidden h-10 w-[calc(100%-3rem)] lg:block"
      aria-hidden
    >
      {/* Stretched dash only — arrow stays outside so preserveAspectRatio=none can't squash it. */}
      <svg
        className="absolute inset-0 h-full w-full text-purple"
        viewBox="0 0 360 40"
        preserveAspectRatio="none"
      >
        <path
          d="M36 30 C 100 6, 140 6, 180 22 S 260 38, 318 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          opacity="0.55"
        />
      </svg>
      <FlowArrow className="absolute top-[0.35rem] right-[6%] size-3" />
    </div>
  )
}

function HomeAgenticProcess({ process, className }: HomeAgenticProcessProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-72 flex-col justify-center p-5 sm:p-7 lg:min-h-[30rem] lg:p-8",
        className
      )}
      aria-label={process.label}
    >
      <p className="font-mono text-[0.65rem] font-semibold tracking-[0.16em] text-on-dark/45 uppercase">
        {process.label}
      </p>

      {/* Desktop: horizontal flow */}
      <div className="relative mt-6 hidden lg:block">
        <FlowPath />
        <ol className="grid grid-cols-3 gap-4">
          {process.steps.map((step, index) => (
            <li
              key={step.label}
              className="relative z-[1] flex flex-col items-center gap-3 text-center"
            >
              <GlyphFrame glyph={step.glyph} className="w-full px-3 py-3" />
              <span className="font-display text-sm font-semibold tracking-tight text-purple tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-on-dark">
                  {step.label}
                </span>
                <span className="text-sm leading-relaxed text-on-dark/60">
                  {step.body}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile / tablet: vertical timeline */}
      <ol className="mt-5 flex flex-col lg:hidden">
        {process.steps.map((step, index) => {
          const last = index === process.steps.length - 1
          return (
            <li
              key={step.label}
              className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3"
            >
              <div className="relative flex flex-col items-center">
                <GlyphFrame
                  glyph={step.glyph}
                  className="relative z-[1] w-full p-1.5"
                />
                {last ? null : (
                  <span
                    aria-hidden
                    className="mt-1 mb-1 flex min-h-4 flex-1 flex-col items-center"
                  >
                    <span className="w-px flex-1 border-l border-dashed border-purple/55" />
                    <FlowArrow className="size-2.5 rotate-90" />
                  </span>
                )}
              </div>
              <div className={cn("flex flex-col gap-1 pt-1", !last && "pb-5")}>
                <span className="font-display text-xs font-semibold tracking-tight text-purple tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-on-dark">
                  {step.label}
                </span>
                <span className="text-sm leading-relaxed text-on-dark/60">
                  {step.body}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export { HomeAgenticProcess }
