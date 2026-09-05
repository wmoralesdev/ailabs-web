import type { Locale } from "@/content"

export type GetCompetitiveQuickFact = {
  label: string
  value: string
}

export type GetCompetitiveQuickAgendaItem = {
  title: string
  minutes: number
  kind?: "session" | "break" | "close"
}

export type GetCompetitiveQuickStackIcon =
  "domain" | "email" | "profiles" | "portfolio" | "cloudflare"

/** One tool in the five-piece stack the workshop assembles. */
export type GetCompetitiveQuickStackItem = {
  icon: GetCompetitiveQuickStackIcon
  label: string
  note: string
}

export type GetCompetitiveQuickRequirementIcon =
  "laptop" | "payment" | "profiles" | "projects" | "level"

export type GetCompetitiveQuickRequirement = {
  icon: GetCompetitiveQuickRequirementIcon
  label: string
}

export type GetCompetitiveQuickFormStep = {
  title: string
  description: string
  placeholder: string
  error: string
}

export type GetCompetitiveQuickContent = {
  metaTitle: string
  metaDescription: string
  eyebrow: readonly [string, string]
  audience: readonly [string, string]
  title: readonly [string, string, string]
  deck: string
  sellLead: string
  outcomes: readonly string[]
  outcomesTitle: string
  stackTitle: string
  stackNote: string
  stack: readonly GetCompetitiveQuickStackItem[]
  dateLabel: string
  dateNote: string
  venueNote: string
  scheduleNote: string
  bundle: string
  includesLabel: string
  priceLabel: string
  ticketLabel: string
  facts: readonly GetCompetitiveQuickFact[]
  promiseTitle: string
  promise: string
  programFrame: string
  forWhomTitle: string
  forWhom: readonly string[]
  notForWhomTitle: string
  notForWhom: readonly string[]
  deliverablesTitle: string
  deliverables: readonly string[]
  requirementsTitle: string
  requirements: readonly GetCompetitiveQuickRequirement[]
  agendaTitle: string
  agendaNote: string
  agenda: readonly GetCompetitiveQuickAgendaItem[]
  ctaLabel: string
  soldOutLabel: string
  closingCta: {
    title: string
    body: string
    buttonLabel: string
  }
  form: {
    eyebrow: string
    previousLabel: string
    nextLabel: string
    name: GetCompetitiveQuickFormStep
    email: GetCompetitiveQuickFormStep
    whatsapp: GetCompetitiveQuickFormStep
    submitLabel: string
    submittingLabel: string
    errorGeneric: string
    errorSoldOut: string
    errorInvalid: string
  }
  success: {
    eyebrow: string
    title: string
    body: string
    pendingTitle: string
    pendingBody: string
    nextStepsTitle: string
    nextSteps: readonly string[]
    homeCta: string
  }
}

const es: GetCompetitiveQuickContent = {
  metaTitle: "Get Competitive Quick",
  metaDescription:
    "Taller ~4h para estudiantes y remote job seekers. Dominio, email pro, LinkedIn/X y portfolio. Mid-agosto 2026 · fecha por confirmar · USD 25.",
  eyebrow: ["Taller práctico", "Academy"],
  audience: ["Estudiantes", "Primer empleo tech"],
  title: ["Get", "Competitive", "Quick"],
  deck: "De Gmail genérico a email con tu dominio. Perfiles limpios. Portfolio listo.",
  sellLead:
    "USD 25. Te compras un dominio, configuras email profesional a Gmail (gratis con Cloudflare), limpias LinkedIn y X, y sales con un portfolio hecho con IA. Incluye 3 meses de Ai Labs, Notion e IA. Mid-agosto · fecha por confirmar · cupo limitado.",
  outcomesTitle: "Sales con",
  outcomes: [
    "Dominio propio + email pro",
    "LinkedIn y GitHub que pasan filtro",
    "Portfolio publicado, en vivo",
  ],
  stackTitle: "El stack del día",
  stackNote: "Cinco piezas. Las montas en la sesión, no en tu casa.",
  stack: [
    {
      icon: "domain",
      label: "Dominio",
      note: "Tuyo, comprado durante el taller",
    },
    {
      icon: "email",
      label: "Email pro",
      note: "tu@tudominio, entregado en Gmail",
    },
    {
      icon: "profiles",
      label: "LinkedIn + GitHub",
      note: "Headline, bio y actividad que pasan filtro",
    },
    {
      icon: "portfolio",
      label: "Portfolio",
      note: "Hecho con IA, publicado y mandable",
    },
    {
      icon: "cloudflare",
      label: "Cloudflare",
      note: "DNS y Email Routing en plan gratis",
    },
  ],
  dateLabel: "Mid-ago",
  dateNote: "Fecha por confirmar · mid-agosto 2026",
  venueNote: "Venue / formato por confirmar",
  scheduleNote: "Horario por confirmar · ~4 horas",
  bundle: "Ai Labs · Notion · IA · 3 meses",
  includesLabel: "Incluye",
  priceLabel: "$25",
  ticketLabel: "Ticket",
  facts: [
    { label: "Duración", value: "4 horas" },
    { label: "Nivel", value: "Sin experiencia" },
    { label: "Cupo", value: "20 lugares" },
  ],
  promiseTitle: "La promesa",
  promise:
    "En una tarde arreglas dominio, email profesional a Gmail, perfiles sin red flags obvios, y un portfolio v0 que sí se puede mandar en una aplicación.",
  programFrame:
    "El ticket está pensado para cubrir el dominio. El resto del stack del día sale en cero. Bundle 3 meses: Ai Labs + Notion + IA (planes exactos por confirmar).",
  forWhomTitle: "Para quién",
  forWhom: [
    "Estudiantes y gente buscando remote con Gmail genérico",
    "Quienes tienen LinkedIn a medias y cero portfolio mandable",
    "Primer empleo tech — sin requisito técnico serio",
  ],
  notForWhomTitle: "No es para",
  notForWhom: [
    "Quienes ya negocian offers o tienen brand personal sólido",
    "Un bootcamp de código — hay otros formatos para eso",
  ],
  deliverablesTitle: "Entregables",
  deliverables: [
    "Dominio comprado + email vivo en Gmail (Cloudflare Email Routing)",
    "Checklist LinkedIn/X y headline/bio listos",
    "Portfolio v0 (URL o draft mandable)",
    "Firma + 1 template de outreach",
    "Accesos del bundle 3 meses (cuando cierren SKUs)",
  ],
  requirementsTitle: "Qué traer",
  requirements: [
    { icon: "laptop", label: "Laptop cargada" },
    { icon: "payment", label: "Gmail y forma de pago para el dominio" },
    { icon: "profiles", label: "LinkedIn y X (créalos si no existen)" },
    {
      icon: "projects",
      label: "2–3 proyectos o experiencias crudas para el portfolio",
    },
    { icon: "level", label: "Cero requisito técnico serio" },
  ],
  agendaTitle: "Agenda (~4h)",
  agendaNote: "Tiempos relativos al inicio. Horario del día por confirmar.",
  agenda: [
    {
      title: "Bienvenida. Por qué un recruiter te ignora en 8 segundos. Setup.",
      minutes: 15,
    },
    {
      title: "Audit LinkedIn + X: headline, about, foto, actividad",
      minutes: 40,
    },
    { title: "Break", minutes: 10, kind: "break" },
    {
      title: "Comprar dominio. DNS. Email Routing → Gmail. Send mail as.",
      minutes: 45,
    },
    {
      title: "Nombre/handle consistente, bio, CTA, firma de email",
      minutes: 35,
    },
    { title: "Break", minutes: 10, kind: "break" },
    {
      title: "Portfolio con IA. Deploy ligero si da el tiempo.",
      minutes: 50,
    },
    {
      title: "Dónde aplicar. Un mensaje frío corto. Checklist de la semana.",
      minutes: 25,
    },
    {
      title: "Activar bundle. Q&A.",
      minutes: 10,
      kind: "close",
    },
  ],
  ctaLabel: "Reservar mi lugar",
  soldOutLabel: "Cupo lleno",
  closingCta: {
    title: "¿Listo para mid-agosto?",
    body: "20 lugares. Fecha y formato por confirmar. Pagas con Wompi y te confirmamos por email.",
    buttonLabel: "Ir a reservar",
  },
  form: {
    eyebrow: "20 lugares · cupo limitado",
    previousLabel: "Anterior",
    nextLabel: "Siguiente",
    name: {
      title: "¿Cómo te llamas?",
      description: "Como quieres aparecer en la confirmación.",
      placeholder: "Tu nombre",
      error: "Escribe tu nombre para continuar.",
    },
    email: {
      title: "¿Cuál es tu email?",
      description:
        "Ahí llega la confirmación del pago y los detalles del taller.",
      placeholder: "tu@email.com",
      error: "Necesitamos un email válido.",
    },
    whatsapp: {
      title: "¿Tu WhatsApp?",
      description: "Para avisos del día del taller.",
      placeholder: "+503 …",
      error: "Escribe un WhatsApp válido.",
    },
    submitLabel: "Pagar con Wompi",
    submittingLabel: "Creando pago…",
    errorGeneric: "No pudimos iniciar el pago. Intenta de nuevo.",
    errorSoldOut: "El cupo ya está lleno.",
    errorInvalid: "Revisa los datos e intenta de nuevo.",
  },
  success: {
    eyebrow: "Get Competitive Quick",
    title: "Pago recibido",
    body: "Te confirmamos el lugar por email. Fecha, venue y horario cuando cierren — mid-agosto 2026.",
    pendingTitle: "Estamos confirmando tu pago",
    pendingBody:
      "Si ya pagaste en Wompi, la confirmación puede tardar unos segundos. Te escribimos al email cuando el lugar quede reservado.",
    nextStepsTitle: "Qué sigue",
    nextSteps: [
      "Revisa tu email: ahí llega el comprobante de Wompi.",
      "Te escribimos por WhatsApp cuando cierren fecha y venue.",
      "Llega con laptop cargada, Gmail y forma de pago para el dominio.",
    ],
    homeCta: "Volver al inicio",
  },
}

const en: GetCompetitiveQuickContent = {
  metaTitle: "Get Competitive Quick",
  metaDescription:
    "≈4h workshop for students and remote job seekers. Domain, pro email, LinkedIn/X, and portfolio. Mid-August 2026 · date TBD · USD 25.",
  eyebrow: ["Hands-on workshop", "Academy"],
  audience: ["Students", "First tech job"],
  title: ["Get", "Competitive", "Quick"],
  deck: "From generic Gmail to email on your domain. Clean profiles. Portfolio ready.",
  sellLead:
    "USD 25. Buy a domain, set up pro email to Gmail (free with Cloudflare), clean LinkedIn and X, and leave with an AI-built portfolio. Includes 3 months of Ai Labs, Notion, and AI. Mid-August · date TBD · limited seats.",
  outcomesTitle: "You leave with",
  outcomes: [
    "Your own domain + pro email",
    "LinkedIn and GitHub that pass the filter",
    "A live, published portfolio",
  ],
  stackTitle: "The day's stack",
  stackNote: "Five pieces. You assemble them in the session, not at home.",
  stack: [
    {
      icon: "domain",
      label: "Domain",
      note: "Yours, bought during the workshop",
    },
    {
      icon: "email",
      label: "Pro email",
      note: "you@yourdomain, delivered to Gmail",
    },
    {
      icon: "profiles",
      label: "LinkedIn + GitHub",
      note: "Headline, bio, and activity that pass a filter",
    },
    {
      icon: "portfolio",
      label: "Portfolio",
      note: "AI-built, published, and sendable",
    },
    {
      icon: "cloudflare",
      label: "Cloudflare",
      note: "DNS and Email Routing on the free tier",
    },
  ],
  dateLabel: "Mid-Aug",
  dateNote: "Date TBD · mid-August 2026",
  venueNote: "Venue / format TBD",
  scheduleNote: "Time TBD · ~4 hours",
  bundle: "Ai Labs · Notion · AI · 3 months",
  includesLabel: "Includes",
  priceLabel: "$25",
  ticketLabel: "Ticket",
  facts: [
    { label: "Duration", value: "4 hours" },
    { label: "Level", value: "No experience" },
    { label: "Seats", value: "20 seats" },
  ],
  promiseTitle: "The promise",
  promise:
    "In one afternoon you fix domain, pro email to Gmail, profiles without obvious red flags, and a v0 portfolio you can actually send in an application.",
  programFrame:
    "The ticket is sized to cover the domain. The rest of the day stack is free. 3-month bundle: Ai Labs + Notion + AI (exact plans TBD).",
  forWhomTitle: "Who it's for",
  forWhom: [
    "Students and remote seekers still applying with generic Gmail",
    "People with a half-finished LinkedIn and no sendable portfolio",
    "First tech job — no serious technical prerequisite",
  ],
  notForWhomTitle: "Not for",
  notForWhom: [
    "People already negotiating offers or with a solid personal brand",
    "A coding bootcamp — other formats cover that",
  ],
  deliverablesTitle: "Deliverables",
  deliverables: [
    "Domain purchased + email live in Gmail (Cloudflare Email Routing)",
    "LinkedIn/X checklist and ready headline/bio",
    "Portfolio v0 (URL or sendable draft)",
    "Email signature + 1 outreach template",
    "3-month bundle access (when SKUs lock)",
  ],
  requirementsTitle: "Bring",
  requirements: [
    { icon: "laptop", label: "Charged laptop" },
    { icon: "payment", label: "Gmail and a way to pay for the domain" },
    { icon: "profiles", label: "LinkedIn and X (create them if needed)" },
    {
      icon: "projects",
      label: "2–3 raw projects or experiences for the portfolio",
    },
    { icon: "level", label: "No serious technical background required" },
  ],
  agendaTitle: "Agenda (~4h)",
  agendaNote: "Times are relative to the start. Day schedule TBD.",
  agenda: [
    {
      title: "Welcome. Why a recruiter ignores you in 8 seconds. Setup.",
      minutes: 15,
    },
    {
      title: "LinkedIn + X audit: headline, about, photo, activity",
      minutes: 40,
    },
    { title: "Break", minutes: 10, kind: "break" },
    {
      title: "Buy domain. DNS. Email Routing → Gmail. Send mail as.",
      minutes: 45,
    },
    {
      title: "Consistent name/handle, bio, CTA, email signature",
      minutes: 35,
    },
    { title: "Break", minutes: 10, kind: "break" },
    {
      title: "Portfolio with AI. Light deploy if time allows.",
      minutes: 50,
    },
    {
      title: "Where to apply. One short cold message. Week checklist.",
      minutes: 25,
    },
    {
      title: "Activate bundle. Q&A.",
      minutes: 10,
      kind: "close",
    },
  ],
  ctaLabel: "Reserve my seat",
  soldOutLabel: "Sold out",
  closingCta: {
    title: "Ready for mid-August?",
    body: "20 seats. Date and format TBD. Pay with Wompi — we confirm by email.",
    buttonLabel: "Go to registration",
  },
  form: {
    eyebrow: "20 seats · limited",
    previousLabel: "Previous",
    nextLabel: "Next",
    name: {
      title: "What’s your name?",
      description: "As you want it on the confirmation.",
      placeholder: "Your name",
      error: "Enter your name to continue.",
    },
    email: {
      title: "What’s your email?",
      description: "Payment confirmation and workshop details land here.",
      placeholder: "you@email.com",
      error: "We need a valid email.",
    },
    whatsapp: {
      title: "Your WhatsApp?",
      description: "For day-of workshop updates.",
      placeholder: "+503 …",
      error: "Enter a valid WhatsApp number.",
    },
    submitLabel: "Pay with Wompi",
    submittingLabel: "Starting checkout…",
    errorGeneric: "We couldn’t start checkout. Try again.",
    errorSoldOut: "This workshop is sold out.",
    errorInvalid: "Check your details and try again.",
  },
  success: {
    eyebrow: "Get Competitive Quick",
    title: "Payment received",
    body: "We’ll confirm your seat by email. Date, venue, and time when they lock — mid-August 2026.",
    pendingTitle: "We’re confirming your payment",
    pendingBody:
      "If you already paid on Wompi, confirmation can take a few seconds. We’ll email you when the seat is reserved.",
    nextStepsTitle: "What’s next",
    nextSteps: [
      "Check your email — the Wompi receipt lands there.",
      "We message you on WhatsApp when date and venue lock.",
      "Bring a charged laptop, Gmail, and a way to pay for the domain.",
    ],
    homeCta: "Back home",
  },
}

export function getGetCompetitiveQuickContent(
  locale: Locale
): GetCompetitiveQuickContent {
  return locale === "es" ? es : en
}
