import type { PublicPages } from "./types"

export const pagesEs: PublicPages = {
  consulting: {
    path: "/consultoria-de-ia",
    metaTitle: "Consultoría de IA en El Salvador | Ai Labs",
    metaDescription:
      "Consultoría de inteligencia artificial para equipos en El Salvador. Desde San Salvador revisamos el trabajo, elegimos un proceso y lo dejamos andando con tu equipo.",
    schemaName: "Consultoría de IA en El Salvador",
    eyebrow: "Ai Labs · San Salvador",
    title: "Consultoría de inteligencia artificial para equipos en El Salvador",
    lead: "Revisamos cómo trabajás hoy, vemos dónde la IA sí ahorra trabajo y dejamos un primer flujo funcionando con tu equipo. El punto de partida es San Salvador.",
    sections: [
      {
        heading: "Cómo arranca",
        paragraphs: [
          "No hace falta llegar con la solución armada. Contanos el trabajo: quién lo hace, dónde se traba y qué tendría que salir distinto.",
          "De ahí elegimos una oportunidad, acordamos el alcance y vemos si el siguiente paso es preparar al equipo o implementar el flujo.",
        ],
      },
      {
        heading: "Qué queda en el equipo",
        paragraphs: [
          "La consultoría no se queda en un informe. O practicás con tareas que ya conocés, o implementamos el flujo con las herramientas que ya usás, y una persona revisa donde hace falta.",
          "Dejamos documentación para que el equipo pueda seguir sin nosotros.",
        ],
      },
      {
        heading: "Desde San Salvador",
        paragraphs: [
          "Ai Labs trabaja desde San Salvador, El Salvador. Si hubo un encuentro en otro lugar, está en la página de eventos, con el sitio y la fecha que ya publicamos.",
        ],
      },
    ],
    cta: "Hablemos",
    interest: "discovery",
    relatedLabel: "También",
    related: [
      { label: "Capacitación para equipos", href: "/capacitacion-ia" },
      { label: "Automatización de procesos", href: "/automatizacion-con-ia" },
      { label: "Eventos en San Salvador", href: "/eventos" },
    ],
  },
  training: {
    path: "/capacitacion-ia",
    metaTitle: "Capacitación en inteligencia artificial para equipos | Ai Labs",
    metaDescription:
      "Capacitación y formación práctica en inteligencia artificial para equipos y profesionales. Desde San Salvador, con tareas reales y revisión del resultado.",
    schemaName: "Capacitación en inteligencia artificial para equipos",
    eyebrow: "Formación práctica",
    title: "Capacitación en inteligencia artificial para equipos",
    lead: "Formación práctica para profesionales y equipos, a partir de las tareas que querés mejorar. No es un diplomado ni un postgrado: practicás, y aprendés a revisar lo que devuelve la IA.",
    sections: [
      {
        heading: "Para quién",
        paragraphs: [
          "Podés venir por tu cuenta o con tu equipo. No hace falta haber contratado una consultoría antes.",
          "Sirve cuando la gente ya prueba estas herramientas y necesita un criterio común: cuándo usarlas y cómo revisar el resultado.",
        ],
      },
      {
        heading: "Cómo es la formación",
        paragraphs: [
          "Practicás con trabajo que reconocés, no con un ejemplo genérico.",
          "Aprendé cuándo usar IA y cómo revisar lo que devuelve. La idea es que puedas seguir por tu cuenta.",
          "Academy es el nombre de esta línea. Lo que se busca en esta página es la capacitación.",
        ],
      },
      {
        heading: "Dónde",
        paragraphs: [
          "La preparamos desde San Salvador, El Salvador. Si es para un equipo, el formato se acuerda en la conversación.",
        ],
      },
    ],
    cta: "Quiero aprender",
    interest: "enablement",
    relatedLabel: "También",
    related: [
      { label: "Consultoría de IA en El Salvador", href: "/consultoria-de-ia" },
      { label: "Automatización de procesos", href: "/automatizacion-con-ia" },
      { label: "Eventos en San Salvador", href: "/eventos" },
    ],
  },
  automation: {
    path: "/automatizacion-con-ia",
    metaTitle:
      "Automatización de procesos con inteligencia artificial | Ai Labs",
    metaDescription:
      "Automatización de procesos con inteligencia artificial para equipos en El Salvador. Diseñamos el flujo, conectamos tus herramientas y dejamos la revisión humana donde hace falta.",
    schemaName: "Automatización de procesos con inteligencia artificial",
    eyebrow: "Implementación",
    title: "Automatización de procesos con inteligencia artificial",
    lead: "Diseñamos e implementamos flujos para tu operación: menos pasos repetitivos, la información conectada y una persona que revisa donde hace falta.",
    sections: [
      {
        heading: "Qué se automatiza",
        paragraphs: [
          "Partimos del proceso que ya tenés. Vemos entradas, decisiones y dónde se traba.",
          "Definimos qué se asiste, qué se automatiza y qué se queda en una persona. El equipo no sale del flujo.",
        ],
      },
      {
        heading: "Qué te llevás",
        paragraphs: [
          "Conexión con las herramientas que ya usás, documentación y una transferencia para que el equipo lo opere.",
          "Agentic es el nombre de esta línea. El resultado es un proceso que funciona mejor, no un demo.",
        ],
      },
      {
        heading: "Desde San Salvador",
        paragraphs: [
          "La implementación se acuerda desde San Salvador, El Salvador, sobre un proceso real de tu equipo.",
        ],
      },
    ],
    cta: "Quiero mejorar un proceso",
    interest: "implementation",
    relatedLabel: "También",
    related: [
      { label: "Consultoría de IA en El Salvador", href: "/consultoria-de-ia" },
      { label: "Capacitación para equipos", href: "/capacitacion-ia" },
      { label: "Eventos en San Salvador", href: "/eventos" },
    ],
  },
  events: {
    path: "/eventos",
    metaTitle: "Eventos de inteligencia artificial en San Salvador | Ai Labs",
    metaDescription:
      "Encuentros de Ai Labs en San Salvador: DevDay en BINAES, el buildathon en la UFG y la serie Zero to Agent en San Salvador y Guatemala.",
    eyebrow: "Comunidad",
    title: "Eventos de inteligencia artificial en San Salvador",
    lead: "Encuentros que Ai Labs ya publicó. Lo próximo está fechado. Lo anterior está con el lugar que ya decíamos. No hay cifras de asistencia en esta página.",
    upcomingLabel: "Próximo",
    pastLabel: "Ya ocurrieron",
    upcoming: [
      {
        name: "DevDay. San Salvador",
        detail:
          "24 de octubre de 2026, de 3:00 a 7:00 p. m., en BINAES, San Salvador. Encuentro de Ai Labs para ver los anuncios de OpenAI y probar Codex, en español.",
        href: "https://devday.ailabs.sv/",
        linkLabel: "devday.ailabs.sv",
      },
    ],
    past: [
      {
        name: "Modo Fundador",
        detail:
          "15 de agosto de 2026, San Salvador. Taller presencial para fundadores y dueños.",
        href: "/events/modo-fundador",
        linkLabel: "Ver el taller",
      },
      {
        name: "Cursor Buildathon 24h",
        detail: "Universidad Francisco Gavidia, San Salvador.",
      },
      {
        name: "OpenAI Build Week",
        detail: "Presidente Plaza, San Salvador.",
      },
      {
        name: "Code Brew El Salvador",
        detail: "Presidente Plaza, San Salvador.",
      },
      {
        name: "Codex Community Build Meetup",
        detail: "Presidente Plaza, San Salvador.",
      },
      {
        name: "Cursor Cowork",
        detail: "Serie en San Salvador.",
      },
      {
        name: "Cursor Lab",
        detail: "Serie en campus universitarios.",
      },
      {
        name: "Zero to Agent",
        detail: "Serie en San Salvador y Guatemala.",
      },
      {
        name: "The Next Craft",
        detail: "Encuentro de la comunidad.",
      },
    ],
  },
  links: {
    path: "/enlaces",
    metaTitle: "Enlaces oficiales | Ai Labs",
    metaDescription:
      "LinkedIn, X, Instagram y TikTok de Ai Labs. Hecho en San Salvador, El Salvador.",
    eyebrow: "Ai Labs",
    title: "Enlaces oficiales",
    lead: "Estos son los perfiles que Ai Labs publica. La marca es Ai Labs. Hecho en San Salvador, El Salvador.",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/ai-labs-sv",
        detail: "Empresa",
      },
      {
        label: "X",
        href: "https://x.com/ailabs_sv",
        detail: "@ailabs_sv",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/ailabs_sv/",
        detail: "@ailabs_sv",
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@ailabs_sv",
        detail: "@ailabs_sv",
      },
    ],
  },
}
