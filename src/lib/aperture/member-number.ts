export const LAST_RESERVED_MEMBER_NUMBER = 4
export const FIRST_PUBLIC_MEMBER_NUMBER = LAST_RESERVED_MEMBER_NUMBER + 1

export function isReservedMemberNumber(number: number): boolean {
  return (
    Number.isInteger(number) &&
    number >= 0 &&
    number <= LAST_RESERVED_MEMBER_NUMBER
  )
}

/** Pads to at least three digits: 5 is "005", 1000 stays "1000". */
export function formatMemberNumber(number: number): string {
  return String(number).padStart(3, "0")
}
