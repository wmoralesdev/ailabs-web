import { Resvg } from "@resvg/resvg-js"
import satori from "satori"

import { SHARE_CARD_HEIGHT, SHARE_CARD_WIDTH } from "@/lib/aperture/share-card"
import type { ShareCardModel } from "@/lib/aperture/share-card"
import alanSans600 from "./fonts/alan-sans-600.ttf?inline"
import dmSans400 from "./fonts/dm-sans-400.ttf?inline"
import dmSans600 from "./fonts/dm-sans-600.ttf?inline"

const PAPER = "#fafafa"
const INK = "#1a1a1a"
const MUTED = "#5c5c5c"

function Words({ text, gap }: { text: string; gap: number }) {
  if (typeof text !== "string") {
    throw new Error("Share-card text must be a string")
  }
  if (!Number.isFinite(gap) || gap < 0) {
    throw new Error("Share-card word gap must be a non-negative number")
  }
  const words = text.split(/\s+/).filter(Boolean)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap,
      }}
    >
      {words.map((word, index) => (
        <span key={`${index}-${word}`} style={{ display: "flex" }}>
          {word}
        </span>
      ))}
    </div>
  )
}

function fontBuffer(dataUrl: string): ArrayBuffer {
  const comma = dataUrl.indexOf(",")
  if (comma < 0 || !dataUrl.startsWith("data:")) {
    throw new Error("Share-card font must be an inlined data URL")
  }
  const bytes = Buffer.from(dataUrl.slice(comma + 1), "base64")
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength
  )
}

// Satori cannot parse Fontsource woff2 or variable TTF. These are static
// latin instances of @fontsource-variable/alan-sans and dm-sans (OFL).
function loadFonts() {
  return [
    {
      name: "Alan Sans",
      data: fontBuffer(alanSans600),
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "DM Sans",
      data: fontBuffer(dmSans400),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "DM Sans",
      data: fontBuffer(dmSans600),
      weight: 600 as const,
      style: "normal" as const,
    },
  ]
}

export async function renderShareCardSvg(
  model: ShareCardModel
): Promise<string> {
  return satori(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: PAPER,
        color: INK,
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "DM Sans",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: MUTED,
            whiteSpace: "pre",
          }}
        >
          Aperture
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "DM Sans",
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "0.08em",
            marginTop: 20,
            whiteSpace: "pre",
          }}
        >
          {`#${model.number}`}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Alan Sans",
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.05,
            marginTop: 28,
          }}
        >
          <Words text={model.displayName} gap={18} />
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "DM Sans",
            fontSize: 32,
            color: MUTED,
            marginTop: 16,
          }}
        >
          <Words text={model.headline} gap={10} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "DM Sans",
          fontSize: 24,
          color: MUTED,
        }}
      >
        <span style={{ display: "flex", whiteSpace: "pre" }}>
          {`@${model.username}`}
        </span>
        <Words text="Ai Labs" gap={8} />
      </div>
    </div>,
    {
      width: SHARE_CARD_WIDTH,
      height: SHARE_CARD_HEIGHT,
      fonts: loadFonts(),
    }
  )
}

export async function renderShareCardPng(
  model: ShareCardModel
): Promise<Uint8Array> {
  const svg = await renderShareCardSvg(model)
  return new Resvg(svg, {
    fitTo: { mode: "width", value: SHARE_CARD_WIDTH },
  })
    .render()
    .asPng()
}
