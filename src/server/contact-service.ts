import { parseContactInput } from "./contact-input"
import type { ContactInput, SubmitContactResult } from "./contact-input"

export type SaveContactResult =
  | {
      status: "saved"
      id: string
    }
  | { status: "invalid" | "rate_limited" }

export type ContactDependencies = {
  save: (input: ContactInput) => Promise<SaveContactResult>
}

/** Confirm receipt only after the inquiry is available in the database. */
export async function receiveContact(
  raw: unknown,
  dependencies: ContactDependencies
): Promise<SubmitContactResult> {
  let input: ContactInput
  try {
    input = parseContactInput(raw)
  } catch {
    return { status: "invalid" }
  }
  if (input.website) return { status: "invalid" }

  try {
    const saved = await dependencies.save(input)
    if (saved.status !== "saved") return saved
    return { status: "received" }
  } catch {
    // Never log the form contents or connection credentials.
    console.error("Contact persistence failed")
    return { status: "error" }
  }
}
