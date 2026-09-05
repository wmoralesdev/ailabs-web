import { Outlet, createFileRoute } from "@tanstack/react-router"

/**
 * Event slug layout. Landing lives in `$slug.index`; success in `$slug.success`.
 * Both need this parent to render `<Outlet />` — without it the child never mounts.
 */
export const Route = createFileRoute("/_site/events/$slug")({
  component: EventSlugLayout,
})

function EventSlugLayout() {
  return <Outlet />
}
