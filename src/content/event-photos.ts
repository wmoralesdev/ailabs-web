/**
 * Real Ai Labs event photos in public/carousel. Each has a halftone mask in
 * public/halftone with the same name (`pnpm halftone`).
 */
export const EVENT_PHOTOS = {
  "1.webp": { width: 1616, height: 1080 },
  "2.webp": { width: 1616, height: 1080 },
  "3.webp": { width: 1616, height: 1080 },
  "4.webp": { width: 1280, height: 963 },
  "5.webp": { width: 1920, height: 1280 },
  "6.webp": { width: 1920, height: 1280 },
  "7.webp": { width: 1920, height: 1280 },
  "8.webp": { width: 1920, height: 1280 },
  "9.webp": { width: 1920, height: 1280 },
  "10.webp": { width: 1081, height: 1920 },
  "11.webp": { width: 768, height: 1024 },
  "12.webp": { width: 1080, height: 1616 },
  "13.webp": { width: 1920, height: 1280 },
  "14.webp": { width: 1439, height: 1920 },
  "15.webp": { width: 1280, height: 1920 },
  "16.webp": { width: 1440, height: 1920 },
  "17.webp": { width: 1920, height: 1280 },
  "18.webp": { width: 1920, height: 1280 },
  "19.webp": { width: 1280, height: 1920 },
  "20.webp": { width: 1280, height: 1920 },
  "21.webp": { width: 1920, height: 1280 },
  "22.webp": { width: 1280, height: 1920 },
  "23.webp": { width: 1920, height: 1280 },
  "24.webp": { width: 1920, height: 1280 },
  "25.webp": { width: 1920, height: 1280 },
  "26.webp": { width: 1920, height: 1280 },
  "27.webp": { width: 1920, height: 1280 },
} as const satisfies Record<string, { width: number; height: number }>

export type EventPhotoName = keyof typeof EVENT_PHOTOS

/** A photo placed on a page, with its localized description. */
export type EventPhoto = {
  name: EventPhotoName
  alt: string
}
