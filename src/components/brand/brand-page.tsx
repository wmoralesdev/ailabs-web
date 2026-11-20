import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
  Cancel01Icon,
  Copy01Icon,
  Download04Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { HalftoneIcon } from "@/components/halftone/halftone-icon"
import { Reveal } from "@/components/halftone/reveal"
import {
  homeHeadingClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { PrintCell } from "@/components/home/print-cell"
import type { BrandContent, BrandSwatch, EventsIndexPhoto } from "@/content"
import { BRAND_LOGOS } from "@/content/brand-assets"
import type { ShapeName } from "@/lib/halftone-shapes"
import { cn } from "@/lib/utils"

type Background = "light" | "dark"

/** The logo previews sit on fixed papers, not the page theme. */
const tileBackground: Record<Background, string> = {
  light: "bg-snow ring-1 ring-ink/10 ring-inset",
  dark: "bg-night ring-1 ring-snow/10 ring-inset",
}

/**
 * Copies text and remembers which control did it for a moment, so that
 * control can say so. One timer at a time, cleared on unmount.
 */
function useCopied() {
  const [copied, setCopied] = useState<string | null>(null)
  const [failed, setFailed] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy(key: string, read: () => Promise<string> | string) {
    window.clearTimeout(timer.current)
    let ok = false
    try {
      await navigator.clipboard.writeText(await read())
      ok = true
    } catch {
      ok = false
    }
    setCopied(ok ? key : null)
    setFailed(ok ? null : key)
    timer.current = window.setTimeout(() => {
      setCopied(null)
      setFailed(null)
    }, 2400)
  }

  return { copied, failed, copy }
}

/** Reads an SVG for the clipboard; an error page is a failure, not a logo. */
async function readSvg(file: string) {
  const res = await fetch(file)
  if (!res.ok) {
    throw new Error(`${file}: ${res.status}`)
  }
  return res.text()
}

function SectionHeader({
  id,
  title,
  body,
}: {
  id: string
  title: string
  body?: string
}) {
  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-[calc(var(--site-header-height)+2rem)] lg:col-span-4 lg:self-start">
      <h2 id={`${id}-title`} data-reveal className={homeHeadingClassName}>
        {title}
      </h2>
      {body ? (
        <p data-reveal className="max-w-[40ch] text-body text-muted-foreground">
          {body}
        </p>
      ) : null}
    </div>
  )
}

/** A guideline block: the title column beside its content, from `lg` up. */
function BrandSection({
  id,
  title,
  body,
  children,
  className,
}: {
  id: string
  title: string
  body?: string
  children: ReactNode
  className?: string
}) {
  return (
    <Reveal
      as="section"
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("section-y border-t border-border", className)}
    >
      <div
        className={cn(
          homeShellClassName,
          "grid gap-10 lg:grid-cols-12 lg:gap-8"
        )}
      >
        <SectionHeader id={id} title={title} body={body} />
        <div className="lg:col-span-8">{children}</div>
      </div>
    </Reveal>
  )
}

type LogoTileProps = {
  name: string
  body: string
  /** One file per background, or a single file that works on its own. */
  files: { light: string; dark: string } | string
  logo: BrandContent["logo"]
  copied: string | null
  failed: string | null
  onCopy: (key: string, read: () => Promise<string>) => void
  /** Preview box sizing for the artwork. */
  artClassName: string
  /** Preview box classes. */
  className?: string
  figureClassName?: string
}

function LogoTile({
  name,
  body,
  files,
  logo,
  copied,
  failed,
  onCopy,
  artClassName,
  className,
  figureClassName,
}: LogoTileProps) {
  const [background, setBackground] = useState<Background>("light")
  const single = typeof files === "string"
  const file = single ? files : files[background]
  const fileName = file.split("/").pop() ?? file
  const copyKey = `svg:${file}`

  return (
    <figure
      data-reveal
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border border-border bg-card",
        figureClassName
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center p-10 transition-colors duration-300 sm:p-14",
          single ? "bg-surface" : tileBackground[background],
          className
        )}
      >
        <img src={file} alt={name} className={artClassName} />
      </div>
      <figcaption className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-xl font-semibold tracking-tight">
              {name}
            </h3>
            <p className="max-w-[44ch] text-small text-muted-foreground">
              {body}
            </p>
          </div>
          {single ? null : (
            <div
              role="group"
              aria-label={`${logo.backgroundLabel}: ${name}`}
              className="inline-flex rounded-full bg-surface p-1 text-small font-semibold"
            >
              {(["light", "dark"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={background === value}
                  onClick={() => setBackground(value)}
                  className={cn(
                    "min-h-9 rounded-full px-3.5 transition-colors",
                    background === value
                      ? "shadow-soft bg-background text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {value === "light" ? logo.onLight : logo.onDark}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={file} download={fileName} className="btn">
            {logo.download}
            <HugeiconsIcon icon={Download04Icon} strokeWidth={2} />
          </a>
          <button
            type="button"
            className="text-action"
            onClick={() => onCopy(copyKey, () => readSvg(file))}
          >
            <HugeiconsIcon
              icon={
                copied === copyKey
                  ? Tick02Icon
                  : failed === copyKey
                    ? Cancel01Icon
                    : Copy01Icon
              }
              strokeWidth={2}
              className="size-4"
            />
            {copied === copyKey
              ? logo.copied
              : failed === copyKey
                ? logo.copyFailed
                : logo.copy}
          </button>
        </div>
      </figcaption>
    </figure>
  )
}

/** Each misuse is the real lockup, broken the way the caption says. */
const misuses: ReadonlyArray<{
  paper: string
  file: string
  style?: CSSProperties
  crop?: boolean
}> = [
  {
    paper: "bg-snow",
    file: BRAND_LOGOS.lockup.light,
    style: { transform: "scale(1.35, 0.7)" },
  },
  {
    paper: "bg-snow",
    file: BRAND_LOGOS.lockup.light,
    style: { transform: "rotate(-14deg)" },
  },
  {
    paper: "bg-snow",
    file: BRAND_LOGOS.lockup.light,
    style: { filter: "hue-rotate(150deg) saturate(2.4)" },
  },
  {
    paper: "bg-snow",
    file: BRAND_LOGOS.lockup.light,
    style: { filter: "drop-shadow(5px 7px 3px rgb(0 0 0 / 0.45))" },
  },
  {
    paper: "bg-night",
    file: BRAND_LOGOS.lockup.light,
  },
  {
    paper: "bg-snow",
    file: BRAND_LOGOS.lockup.light,
    style: { transform: "translateX(38%) scale(1.9)" },
    crop: true,
  },
]

function MisuseGrid({ items }: { items: BrandContent["misuse"]["items"] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((caption, index) => {
        const misuse = misuses[index]
        return (
          <li
            key={caption}
            data-reveal
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div
              className={cn(
                "relative flex aspect-[4/3] items-center justify-center overflow-hidden px-8",
                misuse.paper
              )}
            >
              <img
                src={misuse.file}
                alt=""
                loading="lazy"
                className="h-auto w-full max-w-[13rem]"
                style={misuse.style}
              />
              <span
                aria-hidden="true"
                className="absolute right-3 bottom-3 flex size-7 items-center justify-center rounded-full bg-[#c2410c] text-snow"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  strokeWidth={2.5}
                  className="size-4"
                />
              </span>
            </div>
            <p className="p-4 text-small font-semibold">{caption}</p>
          </li>
        )
      })}
    </ul>
  )
}

function Swatch({
  swatch,
  copied,
  failed,
  onCopy,
  copyLabel,
  copiedLabel,
  failedLabel,
}: {
  swatch: BrandSwatch
  copied: string | null
  failed: string | null
  onCopy: (key: string, read: () => string) => void
  copyLabel: string
  copiedLabel: string
  failedLabel: string
}) {
  const key = `hex:${swatch.name}`
  const done = copied === key
  const missed = failed === key
  const badge = done ? copiedLabel : missed ? failedLabel : copyLabel
  return (
    <li data-reveal className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => onCopy(key, () => swatch.hex)}
        className="group press relative aspect-[4/3] w-full rounded-2xl ring-1 ring-ink/12 ring-inset"
        style={{ backgroundColor: swatch.hex }}
      >
        <span className="sr-only">
          {done || missed ? badge : `${copyLabel} ${swatch.name} ${swatch.hex}`}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-snow/90 px-2.5 py-1 text-xs font-semibold text-[var(--brand-graphite)] transition-opacity",
            done || missed
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          )}
        >
          <HugeiconsIcon
            icon={done ? Tick02Icon : missed ? Cancel01Icon : Copy01Icon}
            strokeWidth={2}
            className="size-3.5"
          />
          {badge}
        </span>
      </button>
      <div className="flex flex-col gap-0.5">
        <p className="flex items-baseline justify-between gap-3">
          <span className="font-semibold">{swatch.name}</span>
          <span className="font-mono text-small text-muted-foreground uppercase">
            {swatch.hex}
          </span>
        </p>
        <p className="text-small text-muted-foreground">{swatch.role}</p>
      </div>
    </li>
  )
}

const halftoneShapes: ReadonlyArray<ShapeName> = ["nodes", "sparkle", "ring"]

type BrandGuidelinesProps = {
  brand: BrandContent
  /** Real event photos, reused from the events page with their alt text. */
  photos: ReadonlyArray<EventsIndexPhoto>
}

/**
 * The guideline sections under the hero: logo files, misuse, color, type,
 * halftone, photography, voice and usage. Everything is printed from the
 * same files and tokens the site uses.
 */
function BrandGuidelines({ brand, photos }: BrandGuidelinesProps) {
  const { copied, failed, copy } = useCopied()
  const { logo, misuse, color, type, halftone, imagery, voice, usage } = brand
  const announce = copied?.startsWith("hex:")
    ? color.copied
    : copied
      ? logo.copied
      : failed?.startsWith("hex:")
        ? color.copyFailed
        : failed
          ? logo.copyFailed
          : ""

  return (
    <>
      <p role="status" aria-live="polite" className="sr-only">
        {announce}
      </p>

      <BrandSection id="logo" title={logo.title} body={logo.body}>
        <div className="grid gap-4 md:grid-cols-2">
          <LogoTile
            name={logo.lockup.name}
            body={logo.lockup.body}
            files={BRAND_LOGOS.lockup}
            logo={logo}
            copied={copied}
            failed={failed}
            onCopy={copy}
            artClassName="h-auto w-full max-w-[22rem]"
            className="md:aspect-[2.6/1]"
            figureClassName="md:col-span-2"
          />
          <LogoTile
            name={logo.mark.name}
            body={logo.mark.body}
            files={BRAND_LOGOS.mark}
            logo={logo}
            copied={copied}
            failed={failed}
            onCopy={copy}
            artClassName="h-28 w-auto sm:h-32"
            className="aspect-[4/3]"
          />
          <LogoTile
            name={logo.icon.name}
            body={logo.icon.body}
            files={BRAND_LOGOS.icon}
            logo={logo}
            copied={copied}
            failed={failed}
            onCopy={copy}
            artClassName="size-28 rounded-[22%] sm:size-32"
            className="aspect-[4/3]"
          />
        </div>
      </BrandSection>

      <BrandSection id="misuse" title={misuse.title} body={misuse.body}>
        <MisuseGrid items={misuse.items} />
      </BrandSection>

      <BrandSection id="color" title={color.title} body={color.body}>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
          {color.swatches.map((swatch) => (
            <Swatch
              key={swatch.name}
              swatch={swatch}
              copied={copied}
              failed={failed}
              onCopy={copy}
              copyLabel={color.copy}
              copiedLabel={color.copied}
              failedLabel={color.copyFailed}
            />
          ))}
        </ul>
        <div className="mt-14 border-t border-border pt-8">
          <h3
            data-reveal
            className="font-display text-xl font-semibold tracking-tight"
          >
            {color.logoTitle}
          </h3>
          <p
            data-reveal
            className="mt-2 max-w-[52ch] text-body text-muted-foreground"
          >
            {color.logoBody}
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
            {color.logoInks.map((swatch) => (
              <Swatch
                key={swatch.name}
                swatch={swatch}
                copied={copied}
                failed={failed}
                onCopy={copy}
                copyLabel={color.copy}
                copiedLabel={color.copied}
                failedLabel={color.copyFailed}
              />
            ))}
          </ul>
        </div>
      </BrandSection>

      <BrandSection id="type" title={type.title} body={type.body}>
        <ul className="grid gap-4">
          {type.fonts.map((font, index) => (
            <li
              key={font.name}
              data-reveal
              className="flex flex-col gap-8 rounded-3xl border border-border bg-card p-6 sm:p-8"
            >
              <p
                className={cn(
                  index === 0
                    ? "display text-[clamp(2rem,1.4rem+2.4vw,3.5rem)]"
                    : "max-w-[40ch] font-sans text-lead leading-snug"
                )}
              >
                {font.sample}
              </p>
              <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border pt-5">
                <div className="flex flex-col gap-1">
                  <h3
                    className={cn(
                      "text-xl font-semibold",
                      index === 0 ? "font-display tracking-tight" : "font-sans"
                    )}
                  >
                    {font.name}
                  </h3>
                  <p className="text-small text-muted-foreground">
                    {font.role}
                  </p>
                </div>
                <a
                  href={font.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-action"
                >
                  {type.linkLabel}
                  <span className="sr-only"> {font.name}</span>
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </BrandSection>

      <BrandSection id="halftone" title={halftone.title} body={halftone.body}>
        <div className="grid gap-4 md:grid-cols-2">
          <PrintCell tone="night" className="aspect-square lg:aspect-square" />
          <ol className="flex flex-col">
            {halftone.rules.map((rule, index) => (
              <li
                key={rule}
                data-reveal
                data-icon-hover
                className="flex items-start gap-5 border-t border-border py-6 first:border-t-0 first:pt-2 md:first:pt-0"
              >
                <HalftoneIcon
                  shape={halftoneShapes[index] ?? "dot"}
                  motion="hover"
                  className="size-12 shrink-0 text-purple-ink"
                />
                <p className="text-body">{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      </BrandSection>

      <BrandSection id="imagery" title={imagery.title} body={imagery.body}>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {photos.map((photo, index) => (
            <li
              key={photo.src}
              data-reveal
              className={cn(
                "overflow-hidden rounded-2xl bg-surface",
                index === 0 && "col-span-2 md:col-span-1"
              )}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {(
            [
              [imagery.useLabel, imagery.use, Tick02Icon, "text-purple-ink"],
              [
                imagery.avoidLabel,
                imagery.avoid,
                Cancel01Icon,
                "text-[#c2410c] dark:text-[#f87171]",
              ],
            ] as const
          ).map(([label, lines, icon, tone]) => (
            <div key={label} data-reveal>
              <h3 className="text-small font-semibold text-muted-foreground">
                {label}
              </h3>
              <ul className="mt-3 flex flex-col">
                {lines.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 border-t border-border py-3"
                  >
                    <HugeiconsIcon
                      icon={icon}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className={cn("mt-1 size-4 shrink-0", tone)}
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </BrandSection>

      <BrandSection id="voice" title={voice.title} body={voice.body}>
        <div
          data-reveal
          className="overflow-hidden rounded-3xl border border-border"
        >
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface text-small text-muted-foreground">
              <tr>
                <th scope="col" className="w-1/2 px-5 py-3 font-semibold">
                  {voice.writeLabel}
                </th>
                <th scope="col" className="w-1/2 px-5 py-3 font-semibold">
                  {voice.avoidLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {voice.rows.map((row) => (
                <tr
                  key={row.write}
                  className="border-t border-border align-top"
                >
                  <td className="px-5 py-4 font-semibold">{row.write}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {row.avoid}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BrandSection>

      <BrandSection id="usage" title={usage.title}>
        <ol className="flex flex-col">
          {usage.items.map((item, index) => (
            <li
              key={item}
              data-reveal
              className="flex gap-6 border-t border-border py-6 first:border-t-0 first:pt-0"
            >
              <span className="font-display text-lead font-semibold text-purple-ink tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="max-w-[52ch] text-lead leading-snug">{item}</p>
            </li>
          ))}
        </ol>
      </BrandSection>
    </>
  )
}

export { BrandGuidelines }
