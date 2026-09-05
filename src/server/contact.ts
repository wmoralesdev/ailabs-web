import { createServerFn } from "@tanstack/react-start"
import { receiveContact } from "./contact-service"
import type { ContactInput, SubmitContactResult } from "./contact-input"

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: ContactInput) => input)
  .handler(async ({ data }): Promise<SubmitContactResult> => {
    // Keep database setup inside the guarded server handler, so missing config
    // produces a recoverable form error rather than breaking every site route.
    try {
      const [{ prisma }, { saveContact }] = await Promise.all([
        import("@/lib/prisma"),
        import("./contact-store"),
      ])
      return receiveContact(data, {
        save: (input) => saveContact(prisma, input),
      })
    } catch {
      console.error("Contact service unavailable")
      return { status: "error" }
    }
  })
