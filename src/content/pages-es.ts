import type { ProofEvent, PublicPages } from "./types"

const devDay: ProofEvent = {
  name: "DevDay. San Salvador",
  detail:
    "24 de octubre de 2026, de 3:00 a 7:00 p. m., en BINAES, San Salvador. Encuentro de Ai Labs para ver los anuncios de OpenAI y probar Codex, en español.",
  href: "https://devday.ailabs.sv/",
  linkLabel: "devday.ailabs.sv",
}

const pastInElSalvador: ReadonlyArray<ProofEvent> = [
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
]

const elSalvador = {
  areaName: "El Salvador",
  areaType: "Country",
} as const

const centralAmerica = {
  areaName: "Centroamérica",
  areaType: "AdministrativeArea",
} as const

export const pagesEs: PublicPages = {
  consulting: {
    path: "/consultoria-de-ia",
    metaTitle: "Consultoría de IA en El Salvador | Ai Labs",
    metaDescription:
      "Consultoría de inteligencia artificial para equipos en El Salvador. Desde San Salvador revisamos el trabajo, elegimos un proceso y lo dejamos andando con tu equipo.",
    schemaName: "Consultoría de IA en El Salvador",
    ...elSalvador,
    kind: "service",
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
      { label: "Eventos tech en El Salvador", href: "/eventos" },
      {
        label: "Comunidad de IA en El Salvador",
        href: "/comunidad-de-ia-el-salvador",
      },
    ],
  },
  training: {
    path: "/capacitacion-ia",
    metaTitle:
      "Capacitación en inteligencia artificial para equipos en El Salvador | Ai Labs",
    metaDescription:
      "Capacitación y formación práctica en inteligencia artificial para equipos en El Salvador. Desde San Salvador, con tareas reales y revisión del resultado.",
    schemaName:
      "Capacitación en inteligencia artificial para equipos en El Salvador",
    ...elSalvador,
    kind: "service",
    eyebrow: "Formación práctica",
    title:
      "Capacitación en inteligencia artificial para equipos en El Salvador",
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
      { label: "Eventos tech en El Salvador", href: "/eventos" },
    ],
  },
  automation: {
    path: "/automatizacion-con-ia",
    metaTitle:
      "Automatización de procesos con inteligencia artificial en El Salvador | Ai Labs",
    metaDescription:
      "Automatización de procesos con inteligencia artificial para equipos en El Salvador. Diseñamos el flujo, conectamos tus herramientas y dejamos la revisión humana donde hace falta.",
    schemaName:
      "Automatización de procesos con inteligencia artificial en El Salvador",
    ...elSalvador,
    kind: "service",
    eyebrow: "Implementación",
    title:
      "Automatización de procesos con inteligencia artificial en El Salvador",
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
      { label: "Eventos tech en El Salvador", href: "/eventos" },
    ],
  },
  events: {
    path: "/eventos",
    metaTitle: "Eventos tech en El Salvador | Ai Labs",
    metaDescription:
      "Eventos de IA y encuentros tech en El Salvador. DevDay en BINAES, el buildathon en la UFG y la serie Zero to Agent en San Salvador y Guatemala.",
    schemaName: "Eventos tech en El Salvador",
    ...elSalvador,
    kind: "event",
    eyebrow: "San Salvador",
    title: "Eventos tech en El Salvador",
    lead: "Eventos de IA y encuentros tech que Ai Labs ya publicó, sobre todo en San Salvador. Lo próximo está fechado. Lo anterior queda con el lugar que ya decíamos.",
    upcomingLabel: "Próximo",
    pastLabel: "Ya ocurrieron",
    upcoming: [devDay],
    past: pastInElSalvador,
    relatedLabel: "También",
    related: [
      {
        label: "Comunidad de IA en El Salvador",
        href: "/comunidad-de-ia-el-salvador",
      },
      {
        label: "Eventos tech en Centroamérica",
        href: "/eventos-tech-centroamerica",
      },
      { label: "Consultoría de IA en El Salvador", href: "/consultoria-de-ia" },
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
  community: {
    path: "/comunidad-de-ia-el-salvador",
    metaTitle: "Comunidad de IA en El Salvador | Ai Labs",
    metaDescription:
      "La comunidad tech de Ai Labs en El Salvador: WhatsApp, eventos en San Salvador y campus universitarios. La base está en San Salvador.",
    schemaName: "Comunidad de IA en El Salvador",
    ...elSalvador,
    kind: "community",
    eyebrow: "San Salvador",
    title: "Comunidad de IA en El Salvador",
    lead: "Ai Labs es una comunidad tech en El Salvador. La base está en San Salvador: un grupo de WhatsApp, encuentros presenciales y gente de universidades del país.",
    sections: [
      {
        heading: "Qué hay en San Salvador",
        paragraphs: [
          "El día a día está en WhatsApp. Los encuentros presenciales que ya publicamos incluyen DevDay en BINAES y el buildathon de 24 horas en la Universidad Francisco Gavidia.",
          "Campus Leaders es un líder por universidad en El Salvador. Aperture es el directorio de miembros que deciden publicar su perfil.",
        ],
      },
      {
        heading: "Cómo entrar",
        paragraphs: [
          "La invitación al grupo está en la página de la comunidad. No hace falta ser cliente ni estudiante.",
          "Esta página es de Ai Labs. No es un directorio de todas las comunidades tech del país.",
        ],
      },
    ],
    cta: "Unirme a la comunidad",
    ctaHref: "/community",
    interest: "discovery",
    relatedLabel: "También",
    related: [
      { label: "Eventos tech en El Salvador", href: "/eventos" },
      { label: "Campus Leaders", href: "/campus-leader" },
      { label: "Miembros de Aperture", href: "/aperture" },
      {
        label: "Comunidad de IA en Centroamérica",
        href: "/comunidad-de-ia-centroamerica",
      },
    ],
  },
  communityRegion: {
    path: "/comunidad-de-ia-centroamerica",
    metaTitle: "Comunidad de IA en Centroamérica | Ai Labs",
    metaDescription:
      "La comunidad de IA de Ai Labs para Centroamérica sale de San Salvador. En Guatemala ya hicimos la serie Zero to Agent. Es la misma comunidad.",
    schemaName: "Comunidad de IA en Centroamérica",
    ...centralAmerica,
    kind: "community",
    eyebrow: "Desde San Salvador",
    title: "Comunidad de IA en Centroamérica",
    lead: "La comunidad tech de Ai Labs para Centroamérica es la que ya funciona en San Salvador. No abrimos una sede por país. En Guatemala ya hicimos la serie Zero to Agent.",
    sections: [
      {
        heading: "La base",
        paragraphs: [
          "El grupo, los campus y la mayoría de los encuentros están en El Salvador. Si estás en la región, entrás al mismo WhatsApp y a los mismos eventos.",
          "Aperture publica los perfiles de quienes quieren aparecer. Campus Leaders cubre universidades de El Salvador.",
        ],
      },
      {
        heading: "Lo que ya ocurrió en Guatemala",
        paragraphs: [
          "Zero to Agent es una serie que Ai Labs hizo en San Salvador y en Guatemala. Es el encuentro fuera de El Salvador que ya está publicado.",
          "No hay otra oficina que mostrar. Si el siguiente encuentro tiene fecha y lugar, va a la página de eventos.",
        ],
      },
    ],
    cta: "Unirme a la comunidad",
    ctaHref: "/community",
    interest: "discovery",
    relatedLabel: "También",
    related: [
      {
        label: "Comunidad de IA en El Salvador",
        href: "/comunidad-de-ia-el-salvador",
      },
      {
        label: "Eventos tech en Centroamérica",
        href: "/eventos-tech-centroamerica",
      },
      {
        label: "Consultoría de IA en Centroamérica",
        href: "/consultoria-de-ia-centroamerica",
      },
    ],
  },
  eventsRegion: {
    path: "/eventos-tech-centroamerica",
    metaTitle: "Eventos tech en Centroamérica | Ai Labs",
    metaDescription:
      "Eventos tech y de IA de Ai Labs en Centroamérica. El calendario sale de San Salvador. Zero to Agent también se hizo en Guatemala.",
    schemaName: "Eventos tech en Centroamérica",
    ...centralAmerica,
    kind: "event",
    eyebrow: "Desde San Salvador",
    title: "Eventos tech en Centroamérica",
    lead: "Los eventos de IA de Ai Labs para Centroamérica se organizan desde San Salvador. El calendario completo está en El Salvador. En Guatemala ya hicimos Zero to Agent.",
    intro: [
      "Esta página no inventa un evento por país. Publicamos el próximo encuentro fechado y los que ya ocurrieron fuera del calendario de San Salvador, más el buildathon en la UFG como referencia local.",
    ],
    upcomingLabel: "Próximo",
    pastLabel: "Ya ocurrieron",
    upcoming: [devDay],
    past: [
      {
        name: "Zero to Agent",
        detail: "Serie en San Salvador y Guatemala.",
      },
      {
        name: "Cursor Buildathon 24h",
        detail: "Universidad Francisco Gavidia, San Salvador.",
      },
      {
        name: "Modo Fundador",
        detail: "15 de agosto de 2026, San Salvador.",
        href: "/events/modo-fundador",
        linkLabel: "Ver el taller",
      },
    ],
    relatedLabel: "También",
    related: [
      { label: "Eventos tech en El Salvador", href: "/eventos" },
      {
        label: "Comunidad de IA en Centroamérica",
        href: "/comunidad-de-ia-centroamerica",
      },
      {
        label: "Consultoría de IA en Centroamérica",
        href: "/consultoria-de-ia-centroamerica",
      },
    ],
  },
  consultingRegion: {
    path: "/consultoria-de-ia-centroamerica",
    metaTitle: "Consultoría de IA en Centroamérica | Ai Labs",
    metaDescription:
      "Consultoría de inteligencia artificial para equipos en Centroamérica. Ai Labs trabaja desde San Salvador y ya hizo eventos en Guatemala.",
    schemaName: "Consultoría de IA en Centroamérica",
    ...centralAmerica,
    kind: "service",
    eyebrow: "Desde San Salvador",
    title: "Consultoría de inteligencia artificial en Centroamérica",
    lead: "La consultoría cubre Centroamérica y se hace desde San Salvador. Revisamos el trabajo del equipo, elegimos un proceso y lo dejamos andando. No hay otra oficina.",
    sections: [
      {
        heading: "El mismo trabajo",
        paragraphs: [
          "No hace falta llegar con la solución armada. Contanos quién hace el trabajo, dónde se traba y qué tendría que salir distinto.",
          "Después vemos si el siguiente paso es preparar al equipo o implementar el flujo, con una persona que revisa donde hace falta.",
        ],
      },
      {
        heading: "Qué ya está publicado en la región",
        paragraphs: [
          "La base es San Salvador, El Salvador. Los encuentros con fecha y lugar están en la página de eventos.",
          "Fuera de El Salvador, lo publicado es la serie Zero to Agent en Guatemala. Eso no es una lista de clientes.",
        ],
      },
    ],
    cta: "Hablemos",
    interest: "discovery",
    relatedLabel: "También",
    related: [
      { label: "Consultoría de IA en El Salvador", href: "/consultoria-de-ia" },
      {
        label: "Eventos tech en Centroamérica",
        href: "/eventos-tech-centroamerica",
      },
      {
        label: "Comunidad de IA en Centroamérica",
        href: "/comunidad-de-ia-centroamerica",
      },
      { label: "Capacitación para equipos", href: "/capacitacion-ia" },
    ],
  },
}
