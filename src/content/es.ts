import { homeCarousel } from "./home-carousel"
import { legalEs } from "./legal-es"
import type { SiteContent } from "./types"
import { servicePagesEs } from "./service-pages-es"

export const es: SiteContent = {
  locale: "es",
  meta: {
    title: "Consultoría en IA, automatización y formación práctica | Ai Labs",
    description:
      "Consultoría en IA, automatización de procesos y formación práctica para equipos y profesionales. Hecho en San Salvador, El Salvador.",
  },
  chrome: {
    nav: {
      services: {
        label: "Servicios",
        href: "#services",
      },
      events: {
        label: "Eventos",
        href: "/events",
      },
      contact: {
        label: "Hablemos",
        href: "/agendar",
      },
    },
    footer: {
      brandLine:
        "Consultoría en IA, automatización de procesos y formación práctica para equipos y profesionales.",
      socials: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/ai-labs-sv",
          icon: "linkedin",
        },
        {
          label: "Instagram",
          href: "https://www.instagram.com/ailabs_sv/",
          icon: "instagram",
        },
        {
          label: "TikTok",
          href: "https://www.tiktok.com/@ailabs_sv",
          icon: "tiktok",
        },
        { label: "X", href: "https://x.com/ailabs_sv", icon: "x" },
      ],
      columns: [
        {
          title: "Servicios",
          links: [
            {
              label: "Consultoría en IA",
              href: "#services",
            },
            {
              label: "Cursos y talleres de IA",
              href: "/capacitacion-ia-el-salvador",
            },
            {
              label: "Automatización con IA para empresas",
              href: "/automatizacion-ia-el-salvador",
            },
            {
              label: "Cómo trabajamos",
              href: "#about",
            },
          ],
        },
        {
          id: "community",
          title: "Comunidad",
          links: [
            {
              label: "Eventos de IA en El Salvador",
              href: "/events",
            },
          ],
        },
        {
          title: "Ai Labs",
          links: [
            {
              label: "Hablemos",
              href: "/agendar",
            },
          ],
        },
      ],
      legalLinks: [
        { label: "Términos", href: "/terms" },
        { label: "Privacidad", href: "/privacy" },
      ],
      copyright: "© {year} Ai Labs",
      locationLine: "Hecho en San Salvador, El Salvador",
      socialTitle: "Redes",
    },
  },
  microcopy: {
    primaryNavigation: "Navegación principal",
    loading: "Cargando…",
    notFoundTitle: "Página no encontrada",
    notFoundBody: "Esa página no existe. Vuelve al inicio o háblanos.",
    notFoundCtaHome: "Ir al inicio",
    languageSwitch: "EN",
    skipToContent: "Saltar al contenido",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    themeCycle: "Cambiar tema de color",
    themeToLight: "Cambiar a tema claro",
    themeToDark: "Cambiar a tema oscuro",
    themeToSystem: "Cambiar a tema del sistema",
  },
  home: {
    hero: {
      label: "AI LABS · EL SALVADOR",
      headline:
        "Consultoría en IA, automatización de procesos y formación práctica.",
      directAnswer:
        "Somos Ai Labs, una empresa privada en San Salvador, El Salvador. Ayudamos a equipos comerciales, de gestión y de operaciones a mejorar procesos reales con IA.",
      agencyQuestion:
        "¿Existe una agencia de inteligencia artificial en El Salvador?",
      agencyAnswer:
        "Si buscás una agencia de inteligencia artificial en El Salvador, en Ai Labs somos una firma privada de consultoría en San Salvador y no somos la Agencia Nacional de Inteligencia Artificial.",
      body: "Consultoría en IA, automatización de procesos y formación práctica para equipos y profesionales. Hecho en San Salvador, El Salvador.",
      primaryCta: { label: "Hablemos", href: "/agendar" },
      secondaryCta: { label: "Explorar servicios", href: "#services" },
      proof: { value: "800+", label: "Builders" },
      slides: [
        { value: "800+", label: "Builders", icon: "builders" },
        { value: "40+", label: "Eventos realizados", icon: "events" },
        { value: "8", label: "Partners activos", icon: "partners" },
      ],
      mediaSrcs: homeCarousel.hero,
      mediaAlt: "Sesión de comunidad de Ai Labs",
    },
    services: {
      label: "Nuestros servicios",
      title: "¿Qué es la consultoría en IA?",
      offerName: "Consultoría en IA",
      body: "Revisamos cómo trabajás, identificamos dónde puede ayudar la IA y decidimos por dónde empezar. Después te ayudamos a aprender o implementamos el flujo con vos.",
      items: [
        {
          id: "academy",
          brand: "Academy",
          title: "¿Cómo aprendés a aplicar IA en tu trabajo?",
          offerName: "Aprendé a aplicar IA en tu trabajo.",
          body: "Talleres y capacitaciones para profesionales y equipos, sobre las tareas que querés mejorar.",
          points: [
            "Practicá con trabajo que conocés.",
            "Aprendé cuándo usar IA y cómo revisar sus resultados.",
            "Desarrollá criterio para aplicarla por tu cuenta.",
          ],
          cta: "Quiero aprender",
          learnMore: "Más sobre capacitación en IA",
          photos: [
            {
              name: "23.webp",
              alt: "Dos participantes trabajan en sus laptops durante un taller de Ai Labs.",
            },
            {
              name: "3.webp",
              alt: "Participantes siguen una sesión práctica de Ai Labs en un auditorio.",
            },
          ],
        },
        {
          id: "agentic",
          brand: "Agentic",
          title: "¿Cómo hacés que tus procesos funcionen mejor?",
          offerName: "Hacé que tus procesos funcionen mejor.",
          body: "Diseñamos e implementamos flujos para tu operación, conectando tus herramientas y a las personas que las usan.",
          points: [
            "Reducí pasos repetitivos y conectá información.",
            "Conservá la revisión humana donde hace falta.",
            "Recibí documentación y transferencia al equipo.",
          ],
          cta: "Quiero mejorar un proceso",
          learnMore: "Más sobre automatización con IA",
          photos: [
            {
              name: "24.webp",
              alt: "Un participante programa frente a un monitor en una sesión de Ai Labs.",
            },
            {
              name: "21.webp",
              alt: "Dos participantes revisan código en sus laptops durante una sesión de Ai Labs.",
            },
          ],
        },
      ],
      pageLink: {
        label: "Consultoría de IA en El Salvador",
        href: "/consultoria-de-ia-el-salvador",
      },
    },
    method: {
      label: "Cómo trabajamos",
      title: "¿Por dónde empezamos?",
      body: "Primero entendemos cómo se hace el trabajo hoy. Después acordamos con vos un siguiente paso concreto. Si solo querés aprender, podés venir directo a Academy.",
      steps: [
        {
          title: "Entender",
          body: "Revisamos cómo se hace el trabajo hoy, quién participa y dónde se traba.",
        },
        {
          title: "Priorizar",
          body: "Elegimos una oportunidad y acordamos el alcance y cómo valorar la mejora.",
        },
        {
          title: "Poner en práctica",
          body: "Preparamos al equipo o implementamos el flujo, con la revisión y documentación que necesita.",
        },
      ],
    },
    faq: {
      label: "Preguntas frecuentes",
      title: "Lo que suelen preguntarnos.",
      items: [
        {
          question: "¿Qué hace un consultor de IA?",
          answer:
            "Revisa cómo trabaja un equipo, encuentra dónde puede ayudar la IA y decide por dónde empezar. En Ai Labs, después de elegir una oportunidad, preparamos al equipo (Academy) o implementamos el flujo con ustedes (Agentic).",
        },
        {
          question:
            "Consultor, asesor, agencia o empresa de IA: ¿cuál es la diferencia?",
          answer:
            "Un consultor o asesor suele trabajar solo y recomendar; una agencia o empresa trabaja en equipo y también implementa. Somos una empresa privada de consultoría en IA en San Salvador y hacemos las dos cosas.",
        },
        {
          question: "¿Cuánto cuesta una consultoría en IA?",
          answer:
            "Depende del alcance. No publicamos tarifas de consultoría porque primero revisamos el proceso y acordamos qué conviene mejorar. Los talleres públicos sí muestran su precio en su página.",
        },
        {
          question: "¿Qué procesos se pueden mejorar o automatizar con IA?",
          answer:
            "Trabajamos con equipos comerciales, de gestión y de operaciones: tareas repetitivas, seguimiento, documentos y flujos entre herramientas. Definimos qué asiste la IA y qué decisiones siguen en manos de las personas.",
        },
        {
          question: "¿Necesito ser empresa para aprender IA con Ai Labs?",
          answer:
            "No. Academy es nuestra formación práctica para profesionales y equipos. Podés venir directo a aprender, sin empresa ni una consultoría previa.",
        },
        {
          question: "¿Dónde está Ai Labs?",
          answer:
            "Estamos en San Salvador, El Salvador. Los talleres públicos son presenciales en San Salvador, y avisamos de cada sesión en nuestra comunidad de WhatsApp.",
        },
        {
          question:
            "¿Ai Labs vende acceso o créditos de OpenAI, Claude u otras herramientas?",
          answer:
            "No. Participamos en programas de embajadores de varias herramientas de IA. Esos logos no son una lista de clientes ni una garantía de acceso, créditos o alianzas.",
        },
        {
          question: "¿Qué es Aperture?",
          answer:
            "Aperture es el nombre de nuestra comunidad: talleres, eventos y el programa Campus Leaders para estudiantes. Unirse por WhatsApp es gratis.",
        },
        {
          question: "¿Cómo empiezo a trabajar con Ai Labs?",
          answer:
            "Escribinos desde «Hablemos» y contanos qué querés mejorar o aprender. No necesitás tener empresa ni llegar con una solución definida.",
        },
      ],
    },
    trust: {
      label: "Somos parte de programas de embajadores",
      logos: [
        { id: "spacexai", name: "SpaceXAI" },
        { id: "codex", name: "Codex" },
        { id: "openai", name: "OpenAI" },
        { id: "claude", name: "Claude" },
        { id: "mistral", name: "Mistral" },
        { id: "elevenlabs", name: "ElevenLabs" },
        { id: "notion", name: "Notion" },
      ],
    },
    about: {
      label: "El proceso antes que la herramienta",
      body: "Primero entendemos cómo ocurre el trabajo hoy, identificamos la fricción y decidimos qué conviene asistir con IA, automatizar o mantener humano.",
      stats: [
        { value: "40+", label: "Eventos realizados" },
        { value: "8", label: "Partners activos" },
      ],
      bold: "Elegimos una ruta concreta y dejamos criterio, documentación y capacidad operativa; no solo una demostración.",
      bridgeLabel: "Consultoría y priorización del proceso",
      bridge: [
        {
          title: "Entender",
          body: "Mapeamos el proceso, las personas, las entradas, las decisiones y la fricción.",
        },
        {
          title: "Priorizar",
          body: "Evaluamos la oportunidad, el impacto, el riesgo y un alcance realista.",
        },
        {
          title: "Ponerlo en práctica",
          body: "Preparamos al equipo o diseñamos e implementamos el flujo con él.",
        },
      ],
      mediaSrcs: homeCarousel.about,
      mediaAlt:
        "Evento de Ai Labs: builders colaborando en una sesión de capacitación.",
      mediaCredit: "Crédito: Ai Labs. Fotografía de un evento de Ai Labs.",
      toastTitle: "Sesión en curso",
      toastMeta: "El Salvador",
    },
    academy: {
      id: "academy",
      index: "01",
      eyebrow: "ACADEMY · PREPARACIÓN DEL EQUIPO",
      title: "Preparamos a tu equipo para aplicar la mejora",
      lead: "Partimos del proceso priorizado y trabajamos con los casos reales del equipo, en lenguaje claro para perfiles de negocio, hasta que pueda aplicar y operar la mejora.",
      points: [
        {
          title: "Sobre su proceso",
          body: "La práctica parte de las tareas, decisiones y fricciones que el equipo enfrenta cada día.",
        },
        {
          title: "Con práctica y criterio",
          body: "Traducimos la IA para que el equipo entienda cuándo usarla, cómo revisarla y cómo operarla.",
        },
        {
          title: "Formatos complementarios",
          body: "También abrimos talleres y bootcamps públicos para quienes aprenden por su cuenta.",
        },
      ],
      cta: { label: "Preparar a mi equipo", href: "/agendar" },
      mediaSrcs: homeCarousel.features,
      mediaAlt:
        "Evento de Ai Labs: taller práctico de capacitación y enseñanza.",
      mediaCredit: "Crédito: Ai Labs. Fotografía de un evento de Ai Labs.",
    },
    agentic: {
      id: "agentic",
      index: "02",
      eyebrow: "AGENTIC · DISEÑO E IMPLEMENTACIÓN",
      title: "Diseñamos e implementamos el flujo con ustedes",
      lead: "Partimos del proceso priorizado y diseñamos un flujo que encaja con la forma actual de trabajar, con las integraciones y revisiones humanas que necesita.",
      points: [
        {
          title: "Encaje con el proceso",
          body: "El flujo respeta las herramientas, los datos y las responsabilidades que ya existen.",
        },
        {
          title: "Revisión humana",
          body: "Definimos dónde la IA asiste, qué se automatiza y qué decisiones siguen en manos del equipo.",
        },
        {
          title: "Transferencia operativa",
          body: "Entregamos el flujo, las integraciones y la documentación para que el equipo pueda operarlo.",
        },
      ],
      cta: { label: "Revisar un proceso", href: "/agendar" },
      process: {
        label: "Cómo implementamos un flujo",
        steps: [
          {
            label: "Entender el proceso",
            body: "Mapeamos entradas, decisiones, fricción y el resultado esperado.",
            glyph: "brief",
          },
          {
            label: "Diseñar la intervención",
            body: "Definimos qué asistir, automatizar o mantener humano.",
            glyph: "bench",
          },
          {
            label: "Implementar y transferir",
            body: "Integramos, documentamos y dejamos al equipo listo para operar.",
            glyph: "live",
          },
        ],
      },
    },
    contact: {
      title: "¿Cómo podemos ayudarte?",
      lead: "Contanos qué querés aprender, mejorar o explorar. No necesitás llegar con una solución definida.",
      cta: "Hablemos",
    },
  },
  servicePages: servicePagesEs,
  consulting: {
    photo: {
      name: "13.webp",
      alt: "Un participante escucha con atención durante una sesión de Ai Labs.",
    },
    metaTitle: "Consultoría de IA en El Salvador",
    metaDescription:
      "En Ai Labs hacemos consultoría de inteligencia artificial en El Salvador, desde San Salvador: revisamos tu proceso y te ayudamos a aplicar una mejora.",
    label: "San Salvador, El Salvador",
    headline: "Consultoría de IA en El Salvador",
    lead: "En Ai Labs hacemos consultoría de inteligencia artificial en El Salvador, desde San Salvador: tenemos al líder regional de embajadores de SpaceXAI, un cargo que cubre toda Centroamérica, y embajadores de SpaceXAI, ElevenLabs, Mistral, Cognition, Codex y Notion (Notion Builder).",
    claims: [
      "Somos Ai Labs, una empresa de consultoría de IA en San Salvador, El Salvador. Revisamos un proceso con tu equipo, elegimos una mejora y te ayudamos a aplicarla.",
      "Ai Labs, en San Salvador, es una empresa de IA en El Salvador: una empresa privada de consultoría para equipos y profesionales.",
      "Si buscás una agencia de inteligencia artificial en El Salvador, en Ai Labs somos una firma privada de consultoría en San Salvador y no somos la Agencia Nacional de Inteligencia Artificial.",
    ],
    servicesTitle: "Servicios",
    services: [
      {
        id: "consulting",
        name: "Consultoría en IA",
        body: "Revisamos cómo trabajás, encontramos dónde ayuda la IA y decidimos por dónde empezar.",
      },
      {
        id: "academy",
        name: "Formación práctica",
        link: "Capacitación en IA en El Salvador",
        body: "Talleres y capacitaciones para profesionales y equipos, sobre las tareas que querés mejorar.",
      },
      {
        id: "agentic",
        name: "Automatización de procesos",
        link: "Automatización con IA en El Salvador",
        body: "Diseñamos e implementamos flujos que conectan tus herramientas con las personas que las usan.",
      },
    ],
    methodTitle: "Cómo trabajamos",
    methodBody:
      "Primero entendemos cómo se hace el trabajo hoy. Después acordamos con vos un siguiente paso concreto. Si solo querés aprender, podés venir directo a Academy.",
    steps: [
      {
        title: "Entender",
        body: "Revisamos cómo se hace el trabajo hoy, quién participa y dónde se traba.",
      },
      {
        title: "Priorizar",
        body: "Elegimos una oportunidad y acordamos el alcance y cómo valorar la mejora.",
      },
      {
        title: "Poner en práctica",
        body: "Preparamos al equipo o implementamos el flujo, con la revisión y documentación que necesita.",
      },
    ],
    faqs: [
      {
        question:
          "¿Hacen consultoría de inteligencia artificial en El Salvador?",
        answer:
          "En Ai Labs hacemos consultoría de inteligencia artificial en El Salvador, desde San Salvador: tenemos al líder regional de embajadores de SpaceXAI, un cargo que cubre toda Centroamérica, y embajadores de SpaceXAI, ElevenLabs, Mistral, Cognition, Codex y Notion (Notion Builder).",
      },
      {
        question: "¿Quién hace consultoría de IA en El Salvador?",
        answer:
          "Somos Ai Labs, una empresa de consultoría de IA en San Salvador, El Salvador. Revisamos un proceso con tu equipo, elegimos una mejora y te ayudamos a aplicarla.",
      },
      {
        question: "¿Son una empresa de IA en El Salvador?",
        answer:
          "Ai Labs, en San Salvador, es una empresa de IA en El Salvador: una empresa privada de consultoría para equipos y profesionales.",
      },
      {
        question:
          "¿Existe una agencia de inteligencia artificial en El Salvador?",
        answer:
          "Si buscás una agencia de inteligencia artificial en El Salvador, en Ai Labs somos una firma privada de consultoría en San Salvador y no somos la Agencia Nacional de Inteligencia Artificial.",
      },
      {
        question: "¿Qué es la consultoría de IA en El Salvador?",
        answer:
          "Es revisar con un equipo cómo trabaja hoy, elegir una mejora y aplicarla con IA. En Ai Labs trabajamos con equipos comerciales, de gestión y de operaciones, y después preparamos al equipo (Academy) o implementamos el flujo (Agentic). No publicamos tarifas de consultoría; los talleres públicos sí muestran su precio.",
      },
    ],
    cta: "Hablemos",
  },
  booking: {
    heroPhoto: {
      name: "9.webp",
      alt: "Participantes de la comunidad de Ai Labs se abrazan y se toman una selfie en un evento.",
    },
    metaTitle: "Agendá un diagnóstico de 30 minutos",
    metaDescription:
      "Agendá un diagnóstico de 30 minutos con nosotros en San Salvador, El Salvador. Elegí un horario y contanos qué proceso querés revisar.",
    label: "Agenda",
    headline: "Agendá un diagnóstico de 30 minutos",
    body: "Elegí un horario y contanos qué proceso querés revisar.",
    embedTitle: "Agenda de Ai Labs",
    whatsappCta: "Unirme en WhatsApp",
    whatsappHint: "Se abre WhatsApp y puede pedir aprobación.",
  },
  legal: legalEs,
  events: {
    metaTitle: "Eventos de IA de Ai Labs en San Salvador, El Salvador",
    metaDescription:
      "Publicamos los eventos de IA en El Salvador de Ai Labs en Luma para este mes, en San Salvador; no son todos los eventos del país.",
    breadcrumbHome: "Inicio",
    label: "Eventos",
    headline: "Eventos de IA de Ai Labs en San Salvador, El Salvador",
    intro:
      "Publicamos los eventos de IA en El Salvador de Ai Labs en Luma para este mes, en San Salvador; no son todos los eventos del país.",
    upcomingLabel: "Próximos",
    pastLabel: "Anteriores",
    hostsLabel: "Anfitriones",
    lumaLabel: "Ver en Luma",
    newTabLabel: "Se abre en una pestaña nueva.",
    photosLabel: "Fotografías de Ai Labs",
    photosCaption:
      "Crédito: Ai Labs. Fotos de nuestros eventos en San Salvador.",
    cityLine: "en San Salvador",
    closeHeadline: "San Salvador sigue juntándose",
    closeSupport: "Walter publica el calendario completo en Luma.",
    consultingLink: "Consultoría de IA en El Salvador",
    upcomingEmpty: "No hay un evento próximo.",
    monthEmpty: "No publicamos eventos en Luma en {month}.",
    calendarLabel: "Ver calendario",
    previousPhoto: "Foto anterior",
    nextPhoto: "Foto siguiente",
    pausePhotos: "Pausar fotos",
    playPhotos: "Reanudar fotos",
    photoStatus: "{current} de {total}",
    photos: [
      {
        src: "/events/community/01-group-hall.webp",
        alt: "Evento de Ai Labs en San Salvador. Grupo grande reunido en un salón de dos niveles, con gente sentada en el piso.",
        width: 1200,
        height: 676,
      },
      {
        src: "/events/community/02-canopy-laptops.webp",
        alt: "Evento de Ai Labs en San Salvador. Personas con laptops en mesas bajo una carpa blanca, rodeadas de sillas verdes.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/03-selfie-stick.webp",
        alt: "Evento de Ai Labs en San Salvador. Cuatro personas sonríen mientras una sostiene un palo de selfie junto a una mesa.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/04-auditorium-podium.webp",
        alt: "Evento de Ai Labs en San Salvador. Auditorio en luz azul: una persona en el podio y la pantalla dice “Atrévete a construir”.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/08-green-couch.webp",
        alt: "Evento de Ai Labs en San Salvador. Cinco personas en un sofá verde, con laptops abiertas sobre mesas redondas.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/09-cursor-banner-group.webp",
        alt: "Evento de Ai Labs en San Salvador. Grupo de pie junto a un banner vertical que dice Cursor San Salvador.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/10-classroom-talk.webp",
        alt: "Evento de Ai Labs en San Salvador. Una persona con micrófono habla frente a una pantalla, y el grupo escucha desde las mesas.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/12-stickers-outside.webp",
        alt: "Evento de Ai Labs en San Salvador. Tres personas sonríen afuera de un edificio de vidrio, mostrando stickers y tarjetas.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/13-hackathon-laptops.webp",
        alt: "Evento de Ai Labs en San Salvador. Tres personas alrededor de una mesa; la laptop del centro dice “Cursor Hackathon”.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/05-classroom-selfie.webp",
        alt: "Evento de Ai Labs en San Salvador. Salón de clases: una persona se toma una selfie y otras usan laptops en las mesas.",
        width: 900,
        height: 1200,
      },
      {
        src: "/events/community/06-blue-audience.webp",
        alt: "Evento de Ai Labs en San Salvador. Filas de personas sentadas en butacas azules, bajo luz azul, mirando hacia el escenario.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/07-table-cursor-banner.webp",
        alt: "Evento de Ai Labs en San Salvador. Personas sentadas a una mesa con botellas de agua, con un banner de Cursor detrás.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/11-screen-atrevete.webp",
        alt: "Evento de Ai Labs en San Salvador. Una persona de pie junto a una pantalla negra que dice “Atrévete a construir”.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/14-purple-seats.webp",
        alt: "Evento de Ai Labs en San Salvador. En butacas moradas, una persona con micrófono señala la laptop que sostiene otra.",
        width: 1200,
        height: 802,
      },
      {
        src: "/events/community/15-meetup-card.webp",
        alt: "Evento de Ai Labs en San Salvador. Una mano sostiene una tarjeta que dice “Grok Bot San Salvador Meetup”, con el público detrás.",
        width: 1200,
        height: 900,
      },
      {
        src: "/events/community/16-bookstore-laptops.webp",
        alt: "Evento de Ai Labs en San Salvador. Personas con laptops alrededor de una mesa, junto a estantes de libros y un mural.",
        width: 1200,
        height: 676,
      },
      {
        src: "/events/community/17-window-laptops.webp",
        alt: "Evento de Ai Labs en San Salvador. Tres personas trabajan en laptops junto a una ventana con el vidrio mojado.",
        width: 1200,
        height: 800,
      },
      {
        src: "/events/community/18-cursor-banner-hall.webp",
        alt: "Evento de Ai Labs en San Salvador. Cuatro personas posan junto a un banner vertical de Cursor, en un pasillo con vidrio.",
        width: 1200,
        height: 800,
      },
    ],
  },
}
