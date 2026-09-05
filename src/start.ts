import { clerkMiddleware } from "@clerk/tanstack-react-start/server"
import { createCsrfMiddleware, createStart } from "@tanstack/react-start"

const csrfMiddleware = createCsrfMiddleware({
  filter: (context) => context.handlerType === "serverFn",
})

export const startInstance = createStart(() => {
  return {
    // Browser server functions require same-origin requests. API routes such
    // as Wompi webhooks keep their own verification and are not intercepted.
    requestMiddleware: [csrfMiddleware, clerkMiddleware()],
  }
})
