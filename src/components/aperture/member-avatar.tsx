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
  md: "size-12 rounded-2xl text-base",
  lg: "size-20 rounded-3xl text-2xl sm:size-24 sm:text-3xl",
} as const

export function MemberAvatar({
  name,
  src,
  size = "md",
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
        "flex shrink-0 items-center justify-center border border-border bg-muted font-display font-semibold text-foreground select-none",
        className
      )}
    >
      {initials(name)}
    </span>
  )
}
