import type { Locale } from "@/content"

export type ModoFundadorFactIcon = "duration" | "price" | "format" | "seats"

export type ModoFundadorTagIcon =
  "prompting" | "modes" | "cowork" | "mcps" | "skills"

export type ModoFundadorDeliverableIcon =
  "profile" | "review" | "opportunity" | "meetings"

export type ModoFundadorRequirementIcon =
  "laptop" | "account" | "problem" | "level"

export type ModoFundadorProofIcon = "room" | "work" | "artifacts"

export type ModoFundadorProofPoint = {
  label: string
  note: string
  icon: ModoFundadorProofIcon
}

export type ModoFundadorFact = {
  label: string
  value: string
  icon: ModoFundadorFactIcon
}

export type ModoFundadorTag = {
  label: string
  icon: ModoFundadorTagIcon
}

export type ModoFundadorDeliverable = {
  title: string
  note: string
  icon: ModoFundadorDeliverableIcon
}

export type ModoFundadorRequirement = {
  label: string
  note: string
  icon: ModoFundadorRequirementIcon
}

export type ModoFundadorAgendaItem = {
  title: string
  minutes: number
  kind?: "session" | "break" | "close"
  /** What the room actually does in the block. Breaks omit it. */
  detail?: string
  /** The deliverable the block produces, when it maps to a declared one. */
  output?: string
}

export type ModoFundadorFormStep = {
  title: string
  description: string
  placeholder: string
  error: string
}

export type ModoFundadorContent = {
  metaTitle: string
  metaDescription: string
  eyebrow: readonly [string, string]
  title: readonly [string, string]
  deck: string
  sellLead: string
  tags: readonly ModoFundadorTag[]
  tagsLabel: string
  /** Compact mono row on the pass face — keep each entry under ~18 chars. */
  passMeta: readonly string[]
  price: string
  priceNote: string
  date: { day: string; monthYear: string }
  city: string
  venueNote: string
  scheduleNote: string
  seatsLabel: string
  /** `{count}` and `{total}` are substituted at render. */
  seatsRemaining: string
  /** `{days}` is substituted at render; the singular form avoids "1 días". */
  countdown: string
  countdownSingular: string
  facts: readonly ModoFundadorFact[]
  promiseTitle: string
  promise: string
  programFrame: string
  proof: {
    title: string
    points: readonly ModoFundadorProofPoint[]
  }
  forWhomTitle: string
  forWhom: readonly string[]
  notForWhomTitle: string
  notForWhom: readonly string[]
  deliverablesTitle: string
  deliverables: readonly ModoFundadorDeliverable[]
  requirementsTitle: string
  requirements: readonly ModoFundadorRequirement[]
  agendaTitle: string
  agendaNote: string
  /** Prefix on the deliverable a block produces. */
  agendaOutputLabel: string
  /** Big figure beside the agenda — the full workshop length. */
  agendaPracticeTotal: string
  agendaPracticeLabel: string
  agenda: readonly ModoFundadorAgendaItem[]
  ctaLabel: string
  registerTitle: string
  registerBody: string
  soldOutLabel: string
  soldOutNote: string
  closingCta: {
    title: string
    body: string
    buttonLabel: string
    meta: string
  }
  form: {
    previousLabel: string
    nextLabel: string
    name: ModoFundadorFormStep
    email: ModoFundadorFormStep
    whatsapp: ModoFundadorFormStep
    submitLabel: string
    submittingLabel: string
    secureNote: string
    errorGeneric: string
    errorSoldOut: string
    errorInvalid: string
  }
  success: {
    stubLabel: string
    title: string
    body: string
    pendingTitle: string
    pendingBody: string
    failedTitle: string
    failedBody: string
    retryCta: string
    homeCta: string
  }
}

const es: ModoFundadorContent = {
  metaTitle: "Modo Fundador",
  metaDescription:
    "Taller presencial 4h para fundadores y dueños. Dirige tu empresa y tu equipo con Claude. San Salvador · 15 ago 2026 · USD 50.",
  eyebrow: ["Taller en vivo", "con Claude"],
  title: ["Modo", "Fundador"],
  deck: "Dirige tu empresa y tu equipo con Claude, conectado a lo que ya usas.",
  sellLead:
    "Taller presencial 4h para fundadores y dueños. Prompting, modos, co-work, MCPs y skills para operar el día a día. Cupo ~20.",
  tagsLabel: "Lo que cubrimos",
  tags: [
    { label: "Prompting", icon: "prompting" },
    { label: "Modos", icon: "modes" },
    { label: "Co-work", icon: "cowork" },
    { label: "MCPs", icon: "mcps" },
    { label: "Skills", icon: "skills" },
  ],
  passMeta: ["15 Ago 2026", "San Salvador", "4 horas", "20 lugares"],
  price: "$50",
  priceNote: "Pago único · sin membresías",
  date: { day: "15", monthYear: "Ago 2026" },
  city: "San Salvador",
  venueNote: "Venue por confirmar",
  scheduleNote: "Horario por confirmar · 4 horas",
  seatsLabel: "Cupo",
  seatsRemaining: "Quedan {count} de {total} lugares",
  countdown: "En {days} días",
  countdownSingular: "Mañana",
  facts: [
    { label: "Duración", value: "4 horas", icon: "duration" },
    { label: "Inversión", value: "$50", icon: "price" },
    { label: "Formato", value: "Presencial", icon: "format" },
    { label: "Cupo", value: "20 lugares", icon: "seats" },
  ],
  promiseTitle: "La promesa",
  promise:
    "Sales con un sistema para usar Claude en decisiones, planificación, seguimiento y administración diaria.",
  programFrame:
    "Primer taller del programa Claude para emprendedores. Validamos demanda con trabajo real.",
  proof: {
    title: "Cómo lo hacemos",
    points: [
      {
        label: "Sala pequeña",
        note: "20 lugares en San Salvador. Alcanza para revisar el caso de cada quien.",
        icon: "room",
      },
      {
        label: "Sobre tu negocio",
        note: "Los ejercicios usan tus decisiones y tus reuniones, no un caso de ejemplo.",
        icon: "work",
      },
      {
        label: "Te vas con algo que corre",
        note: "Cuatro entregables configurados en tu cuenta, no apuntes para después.",
        icon: "artifacts",
      },
    ],
  },
  forWhomTitle: "Para quién",
  forWhom: [
    "Fundadores y dueños que deciden ventas, marketing, ops o finanzas",
    "Emprendedores que quieren operar con Claude sin volverse técnicos",
    "Quienes ya probaron IA y necesitan un sistema para el día a día",
  ],
  notForWhomTitle: "No es para",
  notForWhom: [
    "Campañas de marketing o sales playbooks a profundidad",
    "Automatización técnica avanzada (hay otros talleres del programa)",
  ],
  deliverablesTitle: "Qué te llevas",
  deliverables: [
    {
      title: "Perfil de contexto de tu empresa",
      note: "El documento que Claude lee antes de cada consulta.",
      icon: "profile",
    },
    {
      title: "Prompt de revisión semanal",
      note: "Para cerrar la semana y planificar la siguiente.",
      icon: "review",
    },
    {
      title: "Prompt para evaluar oportunidades",
      note: "Un mismo criterio para decir sí o no.",
      icon: "opportunity",
    },
    {
      title: "Checklist de reuniones y seguimiento",
      note: "De la nota cruda al siguiente paso asignado.",
      icon: "meetings",
    },
  ],
  requirementsTitle: "Qué traer",
  requirements: [
    {
      label: "Laptop cargada",
      note: "Trabajamos en vivo las 4 horas.",
      icon: "laptop",
    },
    {
      label: "Cuenta Claude",
      note: "Pro preferible; Free posible con límites.",
      icon: "account",
    },
    {
      label: "Un problema real",
      note: "Una decisión pendiente o una reunión reciente.",
      icon: "problem",
    },
    {
      label: "Cero background técnico",
      note: "No se requiere; nada de código.",
      icon: "level",
    },
  ],
  agendaTitle: "El día",
  agendaNote:
    "Cuatro horas con dos breaks. Los bloques largos son de práctica, no de presentación.",
  agendaOutputLabel: "Te llevas",
  agendaPracticeTotal: "4 hrs",
  agendaPracticeLabel: "de práctica en vivo",
  agenda: [
    {
      title: "Bienvenida, contexto Ai Labs, setup Claude",
      minutes: 15,
      detail:
        "Dejamos tu cuenta y tu proyecto listos, para que nada del taller se vaya en configuración.",
    },
    {
      title: "Claude como copiloto de dirección",
      minutes: 45,
      detail:
        "Escribes el perfil de tu empresa y practicas cómo dar contexto, para que las respuestas hablen de tu negocio y no en general.",
      output: "Perfil de contexto de tu empresa",
    },
    { title: "Break", minutes: 10, kind: "break" },
    {
      title: "Administración del negocio",
      minutes: 40,
      detail:
        "De una nota de reunión a tareas asignadas, y el cierre de semana resuelto en un solo prompt.",
      output: "Prompt de revisión semanal · Checklist de reuniones",
    },
    {
      title: "Decisiones y estrategia",
      minutes: 40,
      detail:
        "Traes una decisión pendiente real y defines el criterio con el que la vas a evaluar cada vez.",
      output: "Prompt para evaluar oportunidades",
    },
    { title: "Break", minutes: 10, kind: "break" },
    {
      title: "Conexión con herramientas + MCPs/Skills",
      minutes: 35,
      detail:
        "Conectamos Claude con las herramientas que ya usas y guardas tus instrucciones como skills reutilizables.",
    },
    {
      title: "Flujos reutilizables y co-work",
      minutes: 35,
      detail:
        "Conviertes lo del día en flujos que tu equipo puede correr sin ti, trabajando en paralelo con Claude.",
    },
    {
      title: "Entregables, Q&A, siguiente paso",
      minutes: 10,
      kind: "close",
      detail:
        "Revisamos que los cuatro entregables corran en tu cuenta y defines el siguiente paso.",
    },
  ],
  ctaLabel: "Reservar lugar",
  registerTitle: "Asegura tu lugar",
  registerBody:
    "Tres datos y te llevamos a Wompi. Confirmamos por email, con venue y horario cuando cierren.",
  soldOutLabel: "Cupo lleno",
  soldOutNote:
    "Se agotaron los 20 lugares de esta fecha. Abriremos otra en las próximas semanas.",
  closingCta: {
    title: "¿Listo para el 15 de agosto?",
    body: "Hay 20 lugares en San Salvador. Pagás con Wompi y te confirmamos por email.",
    buttonLabel: "Ir a reservar",
    meta: "$50 · 15 Ago 2026 · San Salvador",
  },
  form: {
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
      description: "Ahí llega la confirmación del pago y el venue.",
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
    secureNote:
      "Te llevamos a Wompi para pagar. Confirmamos el lugar por email.",
    errorGeneric: "No pudimos iniciar el pago. Intenta de nuevo.",
    errorSoldOut: "El cupo ya está lleno.",
    errorInvalid: "Revisa los datos e intenta de nuevo.",
  },
  success: {
    stubLabel: "Comprobante",
    title: "Pago recibido",
    body: "Te confirmamos el lugar por email. Nos vemos el 15 de agosto en San Salvador. Venue y horario cuando cierren.",
    pendingTitle: "Estamos confirmando tu pago",
    pendingBody:
      "Si ya pagaste en Wompi, la confirmación puede tardar unos segundos. Te escribimos al email cuando el lugar quede reservado.",
    failedTitle: "El pago no se completó",
    failedBody:
      "Wompi rechazó o canceló la transacción, así que no reservamos el lugar. Podés intentar de nuevo con los mismos datos.",
    retryCta: "Volver a intentar",
    homeCta: "Volver al inicio",
  },
}

const en: ModoFundadorContent = {
  metaTitle: "Modo Fundador",
  metaDescription:
    "4-hour in-person workshop for founders and owners. Run your company and team with Claude. San Salvador · Aug 15, 2026 · USD 50.",
  eyebrow: ["Live workshop", "with Claude"],
  title: ["Modo", "Fundador"],
  deck: "Run your company and team with Claude, connected to what you already use.",
  sellLead:
    "4-hour in-person workshop for founders and owners. Prompting, modes, co-work, MCPs, and skills for running the day to day. About 20 seats.",
  tagsLabel: "What we cover",
  tags: [
    { label: "Prompting", icon: "prompting" },
    { label: "Modes", icon: "modes" },
    { label: "Co-work", icon: "cowork" },
    { label: "MCPs", icon: "mcps" },
    { label: "Skills", icon: "skills" },
  ],
  passMeta: ["Aug 15, 2026", "San Salvador", "4 hours", "20 seats"],
  price: "$50",
  priceNote: "One-time payment · no membership",
  date: { day: "15", monthYear: "Aug 2026" },
  city: "San Salvador",
  venueNote: "Venue TBD",
  scheduleNote: "Time TBD · 4 hours",
  seatsLabel: "Seats",
  seatsRemaining: "{count} of {total} seats left",
  countdown: "In {days} days",
  countdownSingular: "Tomorrow",
  facts: [
    { label: "Duration", value: "4 hours", icon: "duration" },
    { label: "Investment", value: "$50", icon: "price" },
    { label: "Format", value: "In person", icon: "format" },
    { label: "Seats", value: "20 seats", icon: "seats" },
  ],
  promiseTitle: "The promise",
  promise:
    "You leave with a system to use Claude for decisions, planning, follow-up, and day-to-day ops.",
  programFrame:
    "First workshop in the Claude-for-founders program. We validate demand with real work.",
  proof: {
    title: "How we run it",
    points: [
      {
        label: "Small room",
        note: "20 seats in San Salvador. Enough time to go through everyone's case.",
        icon: "room",
      },
      {
        label: "On your business",
        note: "Exercises run on your decisions and your meetings, not a sample case.",
        icon: "work",
      },
      {
        label: "You leave with it running",
        note: "Four deliverables set up in your account, not notes to act on later.",
        icon: "artifacts",
      },
    ],
  },
  forWhomTitle: "Who it's for",
  forWhom: [
    "Founders and owners who decide sales, marketing, ops, or finance",
    "Builders who want to operate with Claude without going deep-technical",
    "People who tried AI and need a system for the workweek",
  ],
  notForWhomTitle: "Not for",
  notForWhom: [
    "Deep marketing campaigns or sales playbooks",
    "Advanced technical automation (other workshops in the program)",
  ],
  deliverablesTitle: "What you leave with",
  deliverables: [
    {
      title: "Company context profile",
      note: "The document Claude reads before every question.",
      icon: "profile",
    },
    {
      title: "Weekly review prompt",
      note: "Close the week and plan the next one.",
      icon: "review",
    },
    {
      title: "Opportunity evaluation prompt",
      note: "One consistent standard for yes or no.",
      icon: "opportunity",
    },
    {
      title: "Meeting and follow-up checklist",
      note: "From raw notes to an assigned next step.",
      icon: "meetings",
    },
  ],
  requirementsTitle: "Bring",
  requirements: [
    {
      label: "Charged laptop",
      note: "We work live for the full four hours.",
      icon: "laptop",
    },
    {
      label: "Claude account",
      note: "Pro preferred; Free works with limits.",
      icon: "account",
    },
    {
      label: "A real problem",
      note: "A pending decision or a recent meeting.",
      icon: "problem",
    },
    {
      label: "No technical background",
      note: "Not required; no code involved.",
      icon: "level",
    },
  ],
  agendaTitle: "The day",
  agendaNote:
    "Four hours with two breaks. The long blocks are hands-on, not slides.",
  agendaOutputLabel: "You leave with",
  agendaPracticeTotal: "4 hrs",
  agendaPracticeLabel: "hands-on, live",
  agenda: [
    {
      title: "Welcome, Ai Labs context, Claude setup",
      minutes: 15,
      detail:
        "We get your account and project ready, so none of the workshop goes to setup.",
    },
    {
      title: "Claude as a direction copilot",
      minutes: 45,
      detail:
        "You write your company profile and practice giving context, so answers are about your business instead of business in general.",
      output: "Company context profile",
    },
    { title: "Break", minutes: 10, kind: "break" },
    {
      title: "Running the business day-to-day",
      minutes: 40,
      detail:
        "From a raw meeting note to assigned tasks, and the week's close handled in a single prompt.",
      output: "Weekly review prompt · Meeting checklist",
    },
    {
      title: "Decisions and strategy",
      minutes: 40,
      detail:
        "Bring a real pending decision and define the standard you'll evaluate it against every time.",
      output: "Opportunity evaluation prompt",
    },
    { title: "Break", minutes: 10, kind: "break" },
    {
      title: "Tooling + MCPs/Skills",
      minutes: 35,
      detail:
        "We connect Claude to the tools you already use and you save your instructions as reusable skills.",
    },
    {
      title: "Reusable flows and co-work",
      minutes: 35,
      detail:
        "You turn the day's work into flows your team can run without you, working alongside Claude.",
    },
    {
      title: "Deliverables, Q&A, next step",
      minutes: 10,
      kind: "close",
      detail:
        "We check that the four deliverables run in your account and you set the next step.",
    },
  ],
  ctaLabel: "Reserve a seat",
  registerTitle: "Lock your seat",
  registerBody:
    "Three fields, then we send you to Wompi. We confirm by email, with venue and time once they lock.",
  soldOutLabel: "Sold out",
  soldOutNote:
    "All 20 seats for this date are taken. We'll open another one in the coming weeks.",
  closingCta: {
    title: "Ready for August 15?",
    body: "20 seats in San Salvador. Pay with Wompi and we confirm by email.",
    buttonLabel: "Go to registration",
    meta: "$50 · Aug 15, 2026 · San Salvador",
  },
  form: {
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
      description: "Payment confirmation and venue details go here.",
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
    secureNote:
      "We send you to Wompi to pay. Seat confirmation comes by email.",
    errorGeneric: "We couldn’t start checkout. Try again.",
    errorSoldOut: "This workshop is sold out.",
    errorInvalid: "Check your details and try again.",
  },
  success: {
    stubLabel: "Receipt",
    title: "Payment received",
    body: "We’ll confirm your seat by email. See you August 15 in San Salvador. Venue and time when they lock.",
    pendingTitle: "We’re confirming your payment",
    pendingBody:
      "If you already paid on Wompi, confirmation can take a few seconds. We’ll email you when the seat is reserved.",
    failedTitle: "The payment didn’t go through",
    failedBody:
      "Wompi declined or cancelled the transaction, so no seat was reserved. You can try again with the same details.",
    retryCta: "Try again",
    homeCta: "Back home",
  },
}

export function getModoFundadorContent(locale: Locale): ModoFundadorContent {
  return locale === "es" ? es : en
}
