/** Disjoint home-page media groups by aspect (no image reused across sections). */
export const homeCarousel = {
  hero: [
    "/carousel/10.webp",
    "/carousel/11.webp",
    "/carousel/12.webp",
    "/carousel/14.webp",
    "/carousel/15.webp",
    "/carousel/16.webp",
    "/carousel/19.webp",
    "/carousel/20.webp",
    "/carousel/22.webp",
  ],
  about: [
    "/carousel/1.webp",
    "/carousel/2.webp",
    "/carousel/3.webp",
    "/carousel/9.webp",
  ],
  /** Academy — learning in session (workshops, facilitators, focused builds). */
  features: [
    "/carousel/5.webp",
    "/carousel/8.webp",
    "/carousel/13.webp",
    "/carousel/21.webp",
    "/carousel/23.webp",
  ],
  trust: [
    "/carousel/18.webp",
    "/carousel/24.webp",
    "/carousel/25.webp",
    "/carousel/27.webp",
  ],
  /** Campus Leader landing — student organizers, campus energy, peer leadership. */
  campusLeader: [
    "/carousel/4.webp",
    "/carousel/17.webp",
    "/carousel/6.webp",
    "/carousel/7.webp",
    "/carousel/26.webp",
  ],
} as const satisfies Record<string, ReadonlyArray<string>>
