import { cn } from "@/lib/utils"

function initials(name: string): string {
  const letters = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
  return letters.toUpperCase() || "?"
}

const SIZE_CLASS = {
  sm: "size-10 rounded-full text-sm",
  portrait:
    "size-32 rounded-[1.75rem] text-4xl shadow-lift ring-4 ring-foreground/10 sm:size-40 sm:text-5xl lg:size-52 lg:rounded-[2.25rem] lg:text-6xl xl:size-56",
} as const

export function MemberAvatar({
  name,
  src,
  size = "sm",
  className,
}: {
  name: string
  src: string | null
  size?: keyof typeof SIZE_CLASS
  className?: string
}) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        className={cn(
          SIZE_CLASS[size],
          "shrink-0 border border-border object-cover",
          className
        )}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        SIZE_CLASS[size],
        "flex shrink-0 items-center justify-center border border-border bg-primary/15 font-display font-semibold text-foreground select-none",
        className
      )}
    >
      {initials(name)}
    </span>
  )
}
