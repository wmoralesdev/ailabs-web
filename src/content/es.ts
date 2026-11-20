import { eventsPhotosEs } from "./events-photos"
import { legalEs } from "./legal-es"
import type { SiteContent } from "./types"
import { servicePagesEs } from "./service-pages-es"

export const es: SiteContent = {
  locale: "es",
  meta: {
    title: "Ai Labs · Automatización, software e IA para empresas",
    description:
      "Somos una empresa de IA en El Salvador. Automatizamos procesos, hacemos software a medida y capacitamos equipos. Agendá un diagnóstico de 30 minutos.",
  },
  chrome: {
    nav: {
      services: {
        label: "Servicios",
        items: [
          {
            label: "Automatización y software",
            href: "/automatizacion-ia-el-salvador",
          },
          {
            label: "Diagnóstico de IA",
            href: "/consultoria-de-ia-el-salvador",
          },
          {
            label: "Capacitación para equipos",
            href: "/capacitacion-ia-el-salvador",
          },
        ],
      },
      events: {
        label: "Eventos",
        href: "/events",
      },
      contact: {
        label: "Agendar diagnóstico",
        href: "/agendar",
      },
    },
    footer: {
      brandLine:
        "Automatización, software a medida y capacitación en IA para empresas en El Salvador.",
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
              label: "Automatización y software",
              href: "/automatizacion-ia-el-salvador",
            },
            {
              label: "Diagnóstico de IA",
              href: "/consultoria-de-ia-el-salvador",
            },
            {
              label: "Capacitación para equipos",
              href: "/capacitacion-ia-el-salvador",
            },
            {
              label: "Cómo trabajamos",
              href: "#metodo",
            },
          ],
        },
        {
          title: "Ai Labs",
          links: [
            {
              label: "Talleres y eventos",
              href: "/events",
            },
            {
              label: "Agendar un diagnóstico",
              href: "/agendar",
            },
            {
              label: "Guía de marca",
              href: "/brand",
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
    notFoundTitle: "Esa página no existe",
    notFoundBody: "Volvé al inicio o agendá un diagnóstico.",
    notFoundCtaHome: "Ir al inicio",
    notFoundCtaBooking: "Agendar diagnóstico",
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
      label: "Ai Labs · San Salvador",
      headline: "Menos trabajo manual en tu empresa. Más control.",
      lead: "Diseñamos e implementamos automatizaciones y software a medida para empresas en El Salvador, y preparamos a tu equipo para operarlos sin depender de nosotros.",
      primaryCta: {
        label: "Agendá un diagnóstico de 30 minutos",
        href: "/agendar",
      },
      secondaryCta: { label: "Ver cómo trabajamos", href: "#metodo" },
    },
    ambassadors: {
      label: "Somos miembros de los programas de comunidad de",
      logos: [
        { id: "spacexai", name: "SpaceXAI" },
        { id: "openai", name: "OpenAI" },
        { id: "codex", name: "Codex" },
        { id: "mistral", name: "Mistral" },
        { id: "elevenlabs", name: "ElevenLabs" },
        { id: "notion", name: "Notion" },
      ],
      partnersLabel: "y trabajamos con",
      partners: [{ id: "claude", name: "Claude" }],
      body: "Ser miembros nos da línea directa con sus equipos, formación de su parte, acceso temprano a lo que viene y más criterio para guiar a quien las usa.",
      stat: { value: "Más de 60", label: "eventos de IA desde 2025" },
    },
    offers: {
      label: "Qué hacemos",
      title: "Tres formas de trabajar con nosotros",
      intro: "Todas empiezan por un diagnóstico de 30 minutos.",
      items: [
        {
          id: "automation",
          title: "Automatización y software a medida",
          body: "Conectamos tus herramientas, automatizamos lo repetitivo y construimos lo que falta.",
          examples:
            "Reportes, seguimiento comercial, cotizaciones, facturación, inventario.",
          link: "Ver automatización",
        },
        {
          id: "consulting",
          title: "Diagnóstico de IA",
          body: "En una sesión revisamos tu proceso y elegimos por dónde empezar.",
          link: "Ver diagnóstico",
        },
        {
          id: "training",
          title: "Capacitación para equipos",
          body: "De un Learning Day de cuatro horas a un bootcamp de varios días, sobre el trabajo real del equipo.",
          link: "Ver capacitación",
        },
      ],
    },
    method: {
      label: "Cómo trabajamos",
      title: "El proceso antes que la herramienta",
      body: "Empezamos por entender cómo se hace el trabajo hoy. Después acordamos con vos el alcance y la cotización antes de tocar nada.",
      steps: [
        {
          title: "Entender",
          body: "Revisamos cómo se hace el trabajo hoy, quién participa y dónde se traba.",
        },
        {
          title: "Priorizar",
          body: "Elegimos una mejora que valga la pena y acordamos el alcance.",
        },
        {
          title: "Implementar",
          body: "Construimos, integramos y dejamos al equipo operando, con documentación.",
        },
      ],
    },
    faq: {
      title: "Lo que suelen preguntarnos",
      items: [
        {
          question: "¿Cuánto cuesta?",
          answer:
            "El diagnóstico de 30 minutos no tiene costo. Después te damos el alcance y la cotización antes de empezar.",
        },
        {
          question: "¿Mi equipo necesita saber programar?",
          answer:
            "No. Trabajamos con equipos de ventas, operaciones y administración. Lo que construimos se opera desde las herramientas que ya usan.",
        },
        {
          question: "¿Qué pasa con nuestros datos?",
          answer:
            "Tus datos se quedan en tus cuentas y herramientas. Antes de empezar acordamos por escrito qué información tocamos y qué no.",
        },
        {
          question: "¿Cuánto tarda?",
          answer:
            "El diagnóstico, 30 minutos. El resto depende del proceso y de las integraciones. En el diagnóstico te damos una estimación.",
        },
        {
          question: "¿Qué pasa cuando terminan?",
          answer:
            "Tu equipo queda operando, con documentación y acceso a todo lo que hicimos. Si querés, acordamos un soporte a la medida de la herramienta.",
        },
      ],
    },
    booking: {
      title: "Agendá un diagnóstico de 30 minutos",
      body: "Contanos qué proceso te quita tiempo. Salís de la sesión con una recomendación concreta, la contrates o no.",
      display: "Agendá.",
      cta: "Elegir fecha y hora",
      whatsappCta: "Escribinos por WhatsApp",
    },
  },
  servicePages: servicePagesEs,
  booking: {
    metaTitle: "Agendá un diagnóstico de 30 minutos",
    metaDescription:
      "Elegí fecha y hora para un diagnóstico de 30 minutos con Ai Labs. Contanos qué proceso te quita tiempo y salís con una recomendación concreta.",
    label: "Agenda",
    headline: "Agendá un diagnóstico de 30 minutos",
    body: "Contanos qué proceso te quita tiempo. Salís de la sesión con una recomendación concreta, la contrates o no.",
    stepsLabel: "Cómo funciona",
    steps: [
      {
        title: "Elegí fecha y hora",
        body: "Treinta minutos por videollamada, en el horario que te quede mejor.",
      },
      {
        title: "Contanos tu proceso",
        body: "Dos preguntas al reservar: de qué querés hablar y tu empresa.",
      },
      {
        title: "Nos vemos",
        body: "Te mandamos la invitación al correo con el enlace.",
      },
    ],
    embedTitle: "Agenda de Ai Labs",
    booker: {
      previousMonth: "Mes anterior",
      nextMonth: "Mes siguiente",
      eventTitle: "Diagnóstico de IA",
      durationLabel: "30 minutos",
      locationLabel: "Google Meet",
      timesTitle: "Horarios disponibles",
      hourFormatLabel: "Formato de hora",
      hour12Label: "12 h",
      hour24Label: "24 h",
      loading: "Cargando horarios",
      pickDay: "Elegí un día para ver los horarios.",
      noTimes: "No hay horarios este mes. Probá con el siguiente.",
      timeZoneLabel: "Horarios en",
      loadError: "No pudimos cargar la agenda.",
      retry: "Intentar de nuevo",
      changeTime: "Cambiar horario",
      nameLabel: "Tu nombre",
      namePlaceholder: "Nombre y apellido",
      emailLabel: "Tu correo",
      emailPlaceholder: "nombre@empresa.com",
      companyLabel: "Tu empresa",
      companyPlaceholder: "Nombre de la empresa",
      topicLabel: "¿Sobre qué querés hablar?",
      topics: {
        automatizacion: "Automatizar un proceso o construir software",
        consultoria: "Saber por dónde empezar con IA",
        capacitacion: "Capacitar a mi equipo",
        indeciso: "Todavía no sé",
      },
      notesLabel: "¿Qué proceso te quita tiempo? (opcional)",
      notesPlaceholder: "Dos líneas alcanzan.",
      submit: "Confirmar diagnóstico",
      submitting: "Reservando",
      rejected: "Ese horario ya no está disponible. Elegí otro.",
      failed: "No pudimos reservar. Probá de nuevo en un momento.",
      confirmedTitle: "Listo, te esperamos",
      confirmedBody:
        "Te mandamos la invitación con el enlace de la videollamada a",
      manage: "Ver o cambiar la reserva",
    },
    embedPending:
      "La agenda en línea está por abrir. Mientras tanto, escribinos.",
    altTitle: "¿Preferís escribir?",
    whatsappCta: "Escribinos por WhatsApp",
    whatsappHint: "Se abre WhatsApp con un chat con nosotros.",
  },
  legal: legalEs,
  events: {
    metaTitle: "Talleres y eventos de IA en San Salvador | Ai Labs",
    metaDescription:
      "Talleres y eventos para aprender IA en El Salvador, organizados por Ai Labs desde 2025. Publicamos los próximos en Luma y los avisamos por WhatsApp.",
    breadcrumbHome: "Inicio",
    label: "Eventos",
    headline: "Talleres y eventos de IA en San Salvador",
    intro:
      "Talleres, cafés y meetups para aprender IA, desde 2025. Las fechas salen en Luma, pero en WhatsApp te enterás antes.",
    calendarLabel: "Ver calendario",
    tracks: [
      {
        title: "Para equipos y líderes",
        body: "Desayunos ejecutivos, masterclasses y demo days donde ves automatizaciones funcionando.",
      },
      {
        title: "Para builders",
        body: "Labs, meetups y hackathons con las herramientas que usamos a diario.",
      },
    ],
    upcomingLabel: "Próximos",
    pastLabel: "Anteriores",
    lumaLabel: "Ver en Luma",
    newTabLabel: "Se abre en una pestaña nueva.",
    upcomingEmpty:
      "Todavía no hay fecha para el próximo. Cuando la tengamos, sale primero en el grupo de WhatsApp.",
    monthEmpty: "No publicamos eventos en Luma en {month}.",
    photosLabel: "Fotos de nuestros eventos",
    photosCaption:
      "Crédito: Ai Labs. Fotos de nuestros eventos en San Salvador.",
    pausePhotos: "Pausar fotos",
    playPhotos: "Reanudar fotos",
    photos: eventsPhotosEs,
    communityTitle: "Comunidad de WhatsApp",
    communityBody:
      "Avisamos ahí cada taller antes que en redes, y entrar es gratis.",
    communityCta: "Unirme en WhatsApp",
    communityHint: "Se abre WhatsApp y puede pedir aprobación.",
    bridgeTitle: "¿Querés un taller así con tu equipo?",
    bridgeCta: "Agendá un diagnóstico de 30 minutos",
  },
  community: {
    metaTitle: "Comunidad de IA en El Salvador",
    metaDescription:
      "Aprendé IA en El Salvador con nuestra comunidad: un grupo de WhatsApp gratis donde avisamos talleres y meetups antes de publicarlos en redes.",
    label: "Comunidad",
    headline: "Aprendé IA con la comunidad de Ai Labs",
    lead: "Un grupo de WhatsApp para conversar y un canal donde avisamos los talleres y meetups antes de publicarlos en redes. Entrar es gratis.",
    joinCta: "Unirme a la comunidad",
    channelCta: "Unirme al canal de avisos",
    joinHint: "Se abre WhatsApp. El grupo puede pedir aprobación.",
    eventsCta: "Ver eventos",
    qrCta: "Mostrar QR",
    qrTitle: "Escaneá para unirte",
  },
  brand: {
    metaTitle: "Guía de marca y logo",
    metaDescription:
      "Descargá el logo de Ai Labs en SVG y conocé nuestros colores, tipografías y reglas para mostrar y escribir la marca bien.",
    label: "Marca",
    headline: "Guía de marca de Ai Labs",
    lead: "El logo, los colores, las tipografías y cómo escribimos. Lo que necesitás para mostrar Ai Labs en una nota, una presentación o un evento.",
    kitCta: "Descargar el kit",
    kitNote: "Un ZIP con el logotipo, el símbolo y el ícono en SVG.",
    logoCta: "Ver el logo",
    logo: {
      title: "Logo",
      body: "Usá siempre los archivos originales. El logotipo va por defecto; el símbolo solo, cuando el espacio es chico.",
      lockup: {
        name: "Logotipo",
        body: "El símbolo y el nombre juntos. Es la versión que va por defecto.",
      },
      mark: {
        name: "Símbolo",
        body: "Para el favicon, avatares y espacios chicos cerca del nombre.",
      },
      icon: {
        name: "Ícono de app",
        body: "El símbolo sobre su placa. Para perfiles y apps.",
      },
      backgroundLabel: "Fondo",
      onLight: "Fondo claro",
      onDark: "Fondo oscuro",
      download: "Descargar SVG",
      copy: "Copiar SVG",
      copied: "SVG copiado",
      copyFailed: "No se pudo copiar",
    },
    misuse: {
      title: "Cómo no usar el logo",
      body: "El logo funciona tal como viene. Estos son los cambios que más vemos y que lo rompen.",
      items: [
        "No lo estires ni lo aplastes",
        "No lo rotes",
        "No le cambies los colores",
        "No le agregues sombras",
        "No lo pongas sobre poco contraste",
        "No lo recortes",
      ],
    },
    color: {
      title: "Color",
      body: "Violeta para acentuar, grafito y nieve para leer. Son los valores del sitio en su tema claro.",
      swatches: [
        {
          name: "Violeta",
          hex: "#614AFC",
          role: "Botones, enlaces y acentos. No va de fondo en cada sección.",
        },
        {
          name: "Grafito",
          hex: "#16131F",
          role: "Texto sobre fondos claros.",
        },
        {
          name: "Nieve",
          hex: "#F5F4F8",
          role: "Papel del tema claro y texto sobre oscuro.",
        },
        {
          name: "Noche",
          hex: "#0F0D17",
          role: "Bandas oscuras que no cambian con el tema.",
        },
        {
          name: "Lila",
          hex: "#D6CFFD",
          role: "Papel suave bajo las fotos y en detalles.",
        },
        {
          name: "Hoja",
          hex: "#1E1E22",
          role: "El pie de página, igual en los dos temas.",
        },
      ],
      logoTitle: "Las tintas del logo",
      logoBody:
        "El logotipo y el símbolo llevan tintas propias, distintas de las del sitio. Usá el archivo tal como viene.",
      logoInks: [
        {
          name: "Violeta del logo",
          hex: "#8B7BC7",
          role: "El punto y «Ai», sobre cualquier fondo.",
        },
        {
          name: "Gris del logo",
          hex: "#303030",
          role: "El resto, sobre fondo claro.",
        },
        {
          name: "Claro del logo",
          hex: "#EDEDED",
          role: "El resto, sobre fondo oscuro.",
        },
      ],
      copy: "Copiar",
      copied: "Copiado",
      copyFailed: "No se pudo copiar",
    },
    type: {
      title: "Tipografía",
      body: "Dos familias libres de Google Fonts: Plus Jakarta Sans para titulares y DM Sans para todo lo demás.",
      fonts: [
        {
          name: "Plus Jakarta Sans",
          role: "Titulares. Peso 600, interletra cerrada.",
          sample: "Automatizamos el trabajo que se repite",
          href: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
        },
        {
          name: "DM Sans",
          role: "Texto, botones e interfaz. Pesos 400 y 600.",
          sample:
            "Agendá un diagnóstico de 30 minutos y contanos cómo trabaja tu equipo hoy.",
          href: "https://fonts.google.com/specimen/DM+Sans",
        },
      ],
      linkLabel: "Ver en Google Fonts",
    },
    halftone: {
      title: "Semitono",
      body: "El punto es nuestra firma. Imprimimos el símbolo, los íconos y las marcas de los programas como trama de puntos.",
      rules: [
        "Es un acento: un elemento por bloque, nunca un fondo para todo.",
        "Las fotos quedan como fotos. Nunca las pasamos a puntos.",
        "Se mueve cuando lo tocás. Solo el símbolo de apertura se mueve solo.",
      ],
    },
    imagery: {
      title: "Fotografía",
      body: "Fotos reales de Ai Labs, solo donde las personas son el punto: talleres, eventos y equipos trabajando.",
      useLabel: "Usamos",
      avoidLabel: "Evitamos",
      use: [
        "Fotos reales de nuestros talleres y eventos",
        "Personas trabajando con sus herramientas",
        "Luz natural y encuadres sin pose",
      ],
      avoid: [
        "Robots, cerebros de neón o salas de servidores",
        "Degradados que dicen «IA» sin mostrar nada",
        "Fotos de stock con gente posando",
      ],
    },
    voice: {
      title: "Cómo escribimos",
      body: "En primera persona del plural y con voseo. Directo, concreto y sin promesas que no podemos mostrar.",
      writeLabel: "Escribimos",
      avoidLabel: "Evitamos",
      rows: [
        { write: "Ai Labs", avoid: "AI Labs, AiLabs, Ailabs, AI-Labs" },
        {
          write: "Somos, hacemos, agendá, contanos",
          avoid: "«Ai Labs hace», usted, agende",
        },
        {
          write: "Miembros de los programas de comunidad",
          avoid: "Embajadores, partners oficiales",
        },
        {
          write: "Alcance y cotización antes de empezar",
          avoid: "Precios, «precio cerrado», plazos fijos",
        },
        {
          write: "Más de 60 eventos de IA desde 2025",
          avoid: "Métricas sin confirmar, «líderes», «#1»",
        },
        {
          write: "Una idea por oración, con punto",
          avoid: "Rayas largas como conectores",
        },
      ],
    },
    usage: {
      title: "Uso de la marca",
      items: [
        "Podés usar el logo para hablar de Ai Labs, de un evento nuestro o de un trabajo que hicimos juntos.",
        "No lo uses para sugerir que te respaldamos o que somos socios si no lo somos.",
        "No lo unas con otro logo en un solo signo ni lo pongas en productos a la venta.",
      ],
    },
  },
}
