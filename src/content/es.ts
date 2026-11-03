import { eventsPhotosEs } from "./events-photos"
import { legalEs } from "./legal-es"
import type { SiteContent } from "./types"
import { servicePagesEs } from "./service-pages-es"

export const es: SiteContent = {
  locale: "es",
  meta: {
    title: "Ai Labs · Automatización, software e IA para empresas",
    description:
      "Automatizaciones y software a medida con IA para empresas en El Salvador, y capacitación para los equipos que los operan. Agendá un diagnóstico de 30 minutos.",
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
          link: "Ver cómo funciona",
        },
        {
          id: "consulting",
          title: "Diagnóstico de IA",
          body: "En una sesión revisamos tu proceso y elegimos por dónde empezar.",
          link: "Ver cómo funciona",
        },
        {
          id: "training",
          title: "Capacitación para equipos",
          body: "De un Learning Day de cuatro horas a un bootcamp de varios días, sobre el trabajo real del equipo.",
          link: "Ver cómo funciona",
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
      "Talleres, cafés y meetups de IA en San Salvador organizados por Ai Labs. Publicamos los próximos en Luma y los avisamos en nuestra comunidad de WhatsApp.",
    breadcrumbHome: "Inicio",
    label: "Eventos",
    headline: "Talleres y eventos de IA en San Salvador",
    intro:
      "Desde 2025 organizamos talleres, cafés y meetups de IA. Los próximos están en Luma y los avisamos por WhatsApp.",
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
      "No hay un evento próximo. Avisamos el siguiente por WhatsApp.",
    monthEmpty: "No publicamos eventos en Luma en {month}.",
    photosLabel: "Fotos de nuestros eventos",
    photosCaption:
      "Crédito: Ai Labs. Fotos de nuestros eventos en San Salvador.",
    pausePhotos: "Pausar fotos",
    playPhotos: "Reanudar fotos",
    photos: eventsPhotosEs,
    communityTitle: "Comunidad de WhatsApp",
    communityBody:
      "Ahí avisamos cada taller antes que en redes. Entrar es gratis.",
    communityCta: "Unirme en WhatsApp",
    communityHint: "Se abre WhatsApp y puede pedir aprobación.",
    bridgeTitle: "¿Querés esto adentro de tu empresa?",
    bridgeCta: "Agendá un diagnóstico de 30 minutos",
  },
  community: {
    metaTitle: "Comunidad de IA en WhatsApp",
    metaDescription:
      "Nuestra comunidad de IA en El Salvador es un grupo de WhatsApp. Ahí avisamos los talleres y meetups antes de publicarlos en redes, y entrar es gratis.",
    label: "Comunidad",
    headline: "Aprendé IA con la comunidad de Ai Labs",
    lead: "Un grupo de WhatsApp donde avisamos los talleres y meetups antes de publicarlos en redes. Entrar es gratis.",
    joinCta: "Unirme en WhatsApp",
    joinHint: "Se abre WhatsApp y puede pedir aprobación.",
    eventsCta: "Ver eventos",
  },
}
