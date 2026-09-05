import { createFileRoute, notFound } from "@tanstack/react-router"

import { getWorkshopBySlug } from "@/events/registry"
import { getRegistrationPaymentStatus } from "@/server/workshop-registration"

type SuccessSearch = {
  identificadorEnlaceComercio?: string
  idTransaccion?: string
  idEnlace?: string
  monto?: string
  hash?: string
}

export const Route = createFileRoute("/_site/events/$slug/success")({
  validateSearch: (search: Record<string, unknown>): SuccessSearch => ({
    identificadorEnlaceComercio:
      typeof search.identificadorEnlaceComercio === "string"
        ? search.identificadorEnlaceComercio
        : undefined,
    idTransaccion:
      typeof search.idTransaccion === "string"
        ? search.idTransaccion
        : undefined,
    idEnlace: typeof search.idEnlace === "string" ? search.idEnlace : undefined,
    monto: typeof search.monto === "string" ? search.monto : undefined,
    hash: typeof search.hash === "string" ? search.hash : undefined,
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ params, context, deps }) => {
    const workshop = getWorkshopBySlug(params.slug)
    if (!workshop) {
      throw notFound()
    }

    const hasRedirectParams = Boolean(
      deps.identificadorEnlaceComercio &&
      deps.idTransaccion &&
      deps.idEnlace &&
      deps.monto &&
      deps.hash
    )

    const payment = await getRegistrationPaymentStatus({
      data: {
        slug: workshop.slug,
        commerceLinkId: deps.identificadorEnlaceComercio,
        redirect: hasRedirectParams
          ? {
              transactionId: deps.idTransaccion!,
              enlaceId: deps.idEnlace!,
              amount: deps.monto!,
              hash: deps.hash!,
            }
          : undefined,
      },
    })

    // Loader data must be serializable — never return Page/SuccessPage/fn fields.
    return {
      slug: workshop.slug,
      title: workshop.title,
      locale: context.locale,
      paymentStatus: payment.status,
      redirectValid: payment.redirectValid,
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    return {
      meta: [
        { title: `${loaderData.title} · Ai Labs` },
        { name: "robots", content: "noindex" },
      ],
    }
  },
  component: EventSuccessPage,
})

function EventSuccessPage() {
  const { slug, locale, paymentStatus, redirectValid } = Route.useLoaderData()
  const workshop = getWorkshopBySlug(slug)
  if (!workshop) {
    throw notFound()
  }

  const SuccessPage = workshop.SuccessPage
  return (
    <SuccessPage
      locale={locale}
      paymentStatus={paymentStatus}
      redirectValid={redirectValid}
    />
  )
}
