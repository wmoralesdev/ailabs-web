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
      community: {
        label: "Comunidad",
        items: [
          {
            label: "Unirme a la comunidad",
            href: "/community",
          },
          {
            label: "Eventos",
            href: "/events",
          },
          {
            label: "Campus Leaders",
            href: "/campus-leader",
          },
        ],
      },
      contact: {
        label: "Hablemos",
        href: "#contact",
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
              label: "Formación práctica",
              href: "/capacitacion-ia-el-salvador",
            },
            {
              label: "Automatización de procesos",
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
              label: "Unirme a la comunidad",
              href: "/community",
            },
            {
              label: "Eventos",
              href: "/events",
            },
            {
              label: "Campus Leaders",
              href: "/campus-leader",
            },
          ],
        },
        {
          title: "Ai Labs",
          links: [
            {
              label: "Hablemos",
              href: "#contact",
            },
            {
              label: "Explorar una alianza",
              href: "#contact",
              contactInterest: "partnership",
            },
          ],
        },
      ],
      legalLinks: [
        { label: "Términos", href: "/terms" },
        { label: "Privacidad", href: "/privacy" },
      ],
      eventsTitle: "Eventos",
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
    textSpiralAction: "Animar la espiral de texto",
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
      body: "Consultoría en IA, automatización de procesos y formación práctica para equipos y profesionales. Hecho en San Salvador, El Salvador.",
      primaryCta: { label: "Hablemos", href: "#contact" },
      secondaryCta: { label: "Explorar servicios", href: "#services" },
      spiralWords: [
        "Procesos",
        "Equipos",
        "Ventas",
        "Operaciones",
        "Criterio",
        "Flujos",
        "Implementación",
        "Acompañamiento",
      ],
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
          interest: "enablement",
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
          interest: "implementation",
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
      cta: { label: "Preparar a mi equipo", href: "#contact" },
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
      cta: { label: "Revisar un proceso", href: "#contact" },
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
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "vos@ejemplo.com",
      companyLabel: "Empresa (opcional)",
      companyPlaceholder: "Tu empresa u organización",
      interestLabel: "¿Qué te trae por acá?",
      interestOptions: [
        {
          value: "discovery",
          label: "Encontrar dónde aplicar IA",
        },
        {
          value: "enablement",
          label: "Aprender o preparar a mi equipo",
        },
        {
          value: "implementation",
          label: "Mejorar o automatizar un proceso",
        },
        {
          value: "partnership",
          label: "Explorar una alianza",
        },
      ],
      messageLabel: "Contanos un poco más",
      messagePlaceholder:
        "¿Qué te gustaría aprender, cambiar o trabajar en conjunto?",
      submit: "Enviar consulta",
      submitting: "Enviando…",
      success: "Recibimos tu consulta. Nos pondremos en contacto con vos.",
      error:
        "No pudimos guardar tu consulta. Tu mensaje sigue aquí; intentá de nuevo.",
      closeLabel: "Cerrar",
      rateLimited: "Recibimos varias consultas. Intentá de nuevo en una hora.",
      invalid: "Revisá los datos e intentá de nuevo.",
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
      "Somos Ai Labs, una empresa de consultoría de IA en San Salvador, El Salvador. Revisamos un proceso con tu equipo, elegimos una mejora y te ayudamos a aplicarla.",
    label: "San Salvador, El Salvador",
    headline: "Consultoría de IA en El Salvador",
    lead: "Somos Ai Labs, una empresa de consultoría de IA en San Salvador, El Salvador. Revisamos un proceso con tu equipo, elegimos una mejora y te ayudamos a aplicarla.",
    claims: [
      "Hacemos consultoría de inteligencia artificial en El Salvador, desde San Salvador: revisamos tu proceso, elegimos una mejora y te ayudamos a aplicarla.",
      "Somos una empresa de IA en El Salvador: una empresa privada de consultoría en San Salvador.",
      "Si buscás una agencia de inteligencia artificial en El Salvador, somos una firma privada de consultoría en San Salvador. No somos la Agencia Nacional de Inteligencia Artificial.",
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
          "¿Existe una agencia de inteligencia artificial en El Salvador?",
        answer:
          "Somos Ai Labs, una empresa de consultoría de IA en San Salvador, El Salvador. Revisamos un proceso con tu equipo, elegimos una mejora y te ayudamos a aplicarla.",
      },
      {
        question: "¿Qué es la consultoría de IA en El Salvador?",
        answer:
          "Es revisar con un equipo cómo trabaja hoy, elegir una mejora y aplicarla con IA. En Ai Labs trabajamos con equipos comerciales, de gestión y de operaciones, y después preparamos al equipo (Academy) o implementamos el flujo (Agentic). No publicamos tarifas de consultoría; los talleres públicos sí muestran su precio.",
      },
      {
        question:
          "¿Hacen consultoría de inteligencia artificial en El Salvador?",
        answer:
          "Hacemos consultoría de inteligencia artificial en El Salvador, desde San Salvador: revisamos tu proceso, elegimos una mejora y te ayudamos a aplicarla.",
      },
      {
        question: "¿Son una empresa de IA en El Salvador?",
        answer:
          "Somos una empresa de IA en El Salvador: una empresa privada de consultoría en San Salvador.",
      },
      {
        question:
          "¿Buscás una agencia de inteligencia artificial en San Salvador?",
        answer:
          "Si buscás una agencia de inteligencia artificial en El Salvador, somos una firma privada de consultoría en San Salvador. No somos la Agencia Nacional de Inteligencia Artificial.",
      },
    ],
    cta: "Hablemos",
  },
  redeem: {
    heroPhoto: {
      name: "18.webp",
      alt: "Participantes posan en grupo durante un evento de Ai Labs.",
    },
    metaTitle: "Canjear créditos",
    eventLabel: "Evento",
    howItWorksLabel: "Cómo funciona",
    steps: [
      { title: "Inicia sesión", body: "Usa el correo de tu evento" },
      { title: "Verifícate", body: "Revisamos la lista de invitados" },
      { title: "Copia tu código", body: "Canjea en segundos" },
    ],
    poweredBy: "Un evento de Ai Labs",
    signInPrompt:
      "Inicia sesión con el mismo correo con el que te registraste al evento.",
    signInCta: "Iniciar sesión para canjear",
    claimCta: "Canjear créditos",
    claiming: "Canjeando…",
    signedInAs: "Sesión iniciada como {email}",
    signOutCta: "Cerrar sesión",
    yourCode: "Tu código",
    yourCodes: "Tus códigos",
    alreadyRedeemed: "Ya canjeaste estos créditos para este evento.",
    copyCode: "Copiar",
    copied: "Copiado",
    openCode: "Abrir",
    invalidTitle: "Enlace no encontrado",
    invalidBody:
      "Este enlace de canje no es válido. Revisa la URL del organizador.",
    inactiveTitle: "Canje cerrado",
    inactiveBody: "Este evento ya no acepta canjes de créditos.",
    notEligibleTitle: "Correo no está en la lista",
    notEligibleBody:
      "El correo de tu sesión no está registrado en este evento. Usa el de tu registro en Luma.",
    soldOutTitle: "Códigos agotados",
    soldOutBody:
      "Todos los códigos de este evento ya fueron canjeados. Contacta al organizador.",
    noVerifiedEmailTitle: "Verifica tu correo",
    noVerifiedEmailBody:
      "Tu cuenta necesita un correo verificado antes de canjear créditos.",
    missingCodeTitle: "Falta el código",
    missingCodeBody: "Abre el enlace completo que incluye ?code=…",
    qrCta: "QR",
    qrTitle: "Escaneá para abrir",
    qrBody: "Escaneá este código para abrir esta página en otro dispositivo.",
    poolLabels: {
      CURSOR: "Cursor",
      CODEX: "Codex",
      OPENAI: "OpenAI Platform",
    },
    products: {
      cursor: {
        title: "Créditos de Cursor",
        blurb: "Canjea tu código de Cursor de este evento de Ai Labs.",
      },
      codex: {
        title: "Créditos de Codex",
        blurb: "Canjea tu código de Codex de este evento de Ai Labs.",
      },
      openai: {
        title: "Créditos de OpenAI Platform",
        blurb: "Canjea tu código de OpenAI Platform de este evento de Ai Labs.",
      },
      codexOpenai: {
        title: "Créditos de Codex + OpenAI Platform",
        blurb: "Canjea tus códigos de Codex y OpenAI Platform de este evento.",
      },
    },
  },
  community: {
    heroPhoto: {
      name: "9.webp",
      alt: "Participantes de la comunidad de Ai Labs se abrazan y se toman una selfie en un evento.",
    },
    metaTitle: "Comunidad de IA en El Salvador",
    metaDescription:
      "Nuestra comunidad en El Salvador es un grupo de WhatsApp para aprender IA: avisos de talleres y eventos, y el programa Campus Leaders para estudiantes.",
    label: "Comunidad",
    headline: "¿Cómo me uno a la comunidad de WhatsApp de Ai Labs?",
    body: "Nuestra comunidad en El Salvador es un grupo de WhatsApp para aprender IA: avisos de talleres y eventos, y el programa Campus Leaders para estudiantes.",
    joinPrompt: "Unirte es gratis.",
    joinCta: "Unirme en WhatsApp",
    joinHint: "Se abre WhatsApp y puede pedir aprobación.",
    joinHref: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
    eventsCta: {
      label: "Eventos de Ai Labs en El Salvador",
      href: "/events",
    },
    consultingCta: {
      label: "Consultoría de IA en El Salvador",
      href: "/consultoria-de-ia-el-salvador",
    },
    howItWorksLabel: "Cómo funciona",
    steps: [
      { title: "Abrí la invitación", body: "Tocá Unirme en WhatsApp" },
      {
        title: "Pedí unirte",
        body: "WhatsApp puede pedir aprobación",
      },
      { title: "Saludá", body: "Presentate y seguí la conversación" },
    ],
    qrCta: "QR",
    qrTitle: "Escaneá para abrir",
    qrBody: "Escaneá este código para abrir esta página en otro dispositivo.",
  },
  campusLeader: {
    heroPhoto: {
      name: "17.webp",
      alt: "Estudiantes trabajan con sus laptops en un evento de Ai Labs.",
    },
    metaTitle: "Campus Leader: programa de IA para estudiantes",
    metaDescription:
      "Un Campus Leader es un estudiante, uno por universidad en El Salvador, que lleva nuestros talleres de IA a su campus y elige cuáles llegan.",
    label: "Campus Leader",
    headline: "¿Qué es un Campus Leader?",
    body: "Un Campus Leader es un estudiante, uno por universidad en El Salvador, que lleva nuestros talleres de IA a su campus y elige cuáles llegan.",
    creditsNote:
      "Los líderes aceptados reciben créditos de las herramientas con las que trabajamos. Los montos quedan entre nosotros.",
    cohort: "aster",
    cohortDisplay: "Aster",
    cohortLabel: "Cohorte",
    applicationsOpen: true,
    closedTitle: "La cohorte Aster está cerrada",
    closedBody: "La próxima cohorte aparece aquí.",
    applyCta: "Aplicar",
    learnCta: "Cómo funciona",
    consultingCta: {
      label: "Consultoría de IA en El Salvador",
      href: "/consultoria-de-ia-el-salvador",
    },
    media: {
      whatSrc: homeCarousel.campusLeader[0],
      whatAlt:
        "Evento de Ai Labs: estudiantes colaborando en laptops durante una sesión de capacitación.",
      benefitsSrcs: homeCarousel.campusLeader,
      benefitsAlt:
        "Evento de Ai Labs: participante en un escritorio de taller de capacitación.",
      credit: "Crédito: Ai Labs. Fotografía de un evento de Ai Labs.",
    },
    landing: {
      what: {
        label: "El programa",
        title: "¿Qué es el programa?",
        body: "Ai Labs en tu campus: elegimos un estudiante por universidad en El Salvador, por cohorte, para llevar nuestros talleres de IA.",
        items: [
          {
            title: "Cualquier carrera",
            body: "Sistemas, Diseño, Marketing, Economía. No es un rol técnico y la carrera no define el cupo.",
          },
          {
            title: "Uno por universidad",
            body: "Un solo líder por campus. Es el cargo de tu universidad dentro de Ai Labs, no un cupo por facultad.",
          },
          {
            title: "Cohorte Aster",
            body: "Las aplicaciones abren en ventanas. Revisamos cada una y respondemos por WhatsApp.",
          },
        ],
      },
      role: {
        label: "El cargo",
        title: "¿Qué hace un Campus Leader?",
        items: [
          {
            title: "Representás tu universidad",
            body: "Sos el punto de contacto entre tu campus y Ai Labs.",
          },
          {
            title: "Elegís qué taller llega",
            body: "Nos decís qué le sirve a tu campus y cuándo está listo.",
          },
          {
            title: "Abrís la sesión",
            body: "Presentás frente a tus pares. Nosotros llevamos el contenido; vos operás salón, invitaciones y check-in.",
          },
        ],
      },
      benefits: {
        label: "El intercambio",
        title: "¿Qué recibís?",
        items: [
          {
            title: "Reconocimiento oficial",
            body: "Nombre, foto, campus y bio en el directorio de líderes de Ai Labs. Lanza con la cohorte.",
          },
          {
            title: "Acceso a eventos cerrados",
            body: "Una sesión solo para líderes por cohorte, y primer acceso a las sesiones públicas.",
          },
          {
            title: "Herramientas y canales",
            body: "Créditos de las herramientas que damos y el grupo privado con el equipo y los otros líderes.",
          },
          {
            title: "Voz en la programación",
            body: "Elegís qué talleres llegan a tu campus: Cursor Labs, talleres Codex, ElevenCreative.",
          },
        ],
      },
      fit: {
        label: "Encaje",
        title: "¿Para quién es?",
        forTitle: "Sí si",
        forItems: [
          "Estudiás en un campus de El Salvador",
          "Podés representar a toda tu universidad, no solo a tu carrera",
          "Vas a ayudar a llenar un salón cuando llegue una sesión",
          "Querés el cargo y la sesión que lo respalda",
        ],
        notTitle: "Mejor no si",
        notItems: [
          "Tu universidad ya tiene líder en esta cohorte",
          "Querés la credencial sin operar la sesión",
          "Necesitás un rol 100% remoto que no podamos visitar",
        ],
      },
      ctaBand: {
        title: "¿Listo para la cohorte Aster?",
        body: "Tres pasos. Unos diez minutos si ya sabés la historia de tu campus.",
        applyCta: "Empezar aplicación",
      },
    },
    formTitle: "Tu aplicación",
    formStepLabel: "Paso {current} de {total}",
    formNext: "Continuar",
    formBack: "Atrás",
    formClose: "Cerrar",
    formOptional: "Opcional",
    formRequired: "Obligatorio",
    logisticsLabel: "Básicos",
    logisticsIntro: "Quién sos y dónde representarías a Ai Labs.",
    deeperLabel: "Quién sos",
    deeperIntro: "Un poco más allá del CV: cómo te movés con pares e IA.",
    roomLabel: "Cuando el salón se queda callado",
    roomIntro: "Cómo llenarías asientos de verdad.",
    fields: {
      name: { label: "Nombre", placeholder: "Juan Pérez" },
      email: {
        label: "Correo",
        placeholder: "juan.perez@universidad.edu",
        helper: "Uno que sí revisás",
      },
      whatsapp: {
        label: "WhatsApp",
        placeholder: "7845 2310",
        helper: "8 dígitos, número de El Salvador",
      },
      instagram: {
        label: "Instagram",
        placeholder: "https://instagram.com/tuusuario",
        helper: "Link del perfil. Así te encontramos en el campus.",
        skipLabel: "No tengo Instagram",
      },
      linkedin: {
        label: "LinkedIn",
        placeholder: "https://linkedin.com/in/tunombre",
      },
      x: {
        label: "X",
        placeholder: "https://x.com/tuusuario",
      },
      campus: {
        label: "Universidad / campus",
        placeholder: "UCA, Antiguo Cuscatlán",
        helper: "Solo El Salvador en la cohorte Aster",
      },
      career: {
        label: "Carrera",
        placeholder: "Elegí una carrera",
        helper: "Para conocerte. No define el cupo.",
      },
      year: {
        label: "Año",
        placeholder: "Elegí el año",
      },
      bio: {
        label: "Bio corta",
        placeholder:
          "Llevo el chat del club de diseño y termino organizando todos los trabajos en grupo.",
        helper: "Puede ir al sitio. Nombre + campus + este texto.",
      },
      reach: {
        label: "¿Dónde te escuchan ya en tu campus?",
        placeholder:
          "Escribo cada semana en el grupo de mi clase de ingeniería, somos como 240.",
        helper:
          "Chat del club, grupo de clase, laboratorio, o “todavía lo estoy armando”. Cualquiera sirve.",
      },
      aiToday: {
        label:
          "¿Cuál es tu nivel honesto con IA hoy, y qué querés que tu campus saque de una sesión?",
        placeholder:
          "Solo uso ChatGPT para tareas y quiero que mi campus vea para qué más sirve.",
      },
      whyLeader: {
        label: "¿Por qué Campus Leader y no solo estar en la comunidad?",
        placeholder:
          "Nadie trae esto a mi universidad y prefiero armarlo yo antes que esperar.",
      },
      quietRoom: {
        label:
          "La sesión empieza en 10 minutos. La mitad del salón está en el celular. ¿Qué hacés?",
        placeholder:
          "Les pido que cierren la laptop y abran la herramienta en el celular.",
      },
      inviteMessage: {
        label:
          "Escribí el mensaje que mandarías para que gente de tu campus venga a una sesión.",
        placeholder:
          "Sábado 9am en el B-12. Traé laptop, en dos horas armamos algo.",
      },
      roomPlan: {
        label:
          "¿Cómo conseguirías un salón y unas 20 personas de tu campus un sábado?",
        placeholder:
          "Le pido el laboratorio al coordinador, escribo en tres grupos de clase y confirmo nombres una semana antes.",
      },
      sessionPrefs: {
        label: "¿A qué sesiones vendría tu campus?",
      },
      notes: {
        label: "¿Algo que debamos saber antes de decir sí o no?",
        placeholder:
          "Ya tengo el auditorio reservado dos sábados de septiembre.",
      },
    },
    careerOptions: [
      { value: "sistemas", label: "Ingeniería / Computación" },
      { value: "diseno", label: "Diseño" },
      { value: "marketing", label: "Comunicación / Marketing" },
      { value: "negocios", label: "Economía / Negocios / Admin" },
      { value: "sociales", label: "Ciencias sociales / Derecho" },
      { value: "otra", label: "Otra (especificá en notas)" },
    ],
    yearOptions: [
      { value: "1", label: "1er año" },
      { value: "2", label: "2do año" },
      { value: "3", label: "3er año" },
      { value: "4", label: "4to año" },
      { value: "5-plus", label: "5to año o más" },
      { value: "grad", label: "Egresado" },
    ],
    sessionPrefOptions: [
      { value: "cursor-labs", label: "Cursor Labs" },
      { value: "codex", label: "Talleres Codex" },
      { value: "elevencreative", label: "ElevenCreative" },
      { value: "surprise", label: "Sorpréndanos" },
    ],
    careerHint:
      "Si tu universidad ya tiene líder en esta cohorte, te ponemos en lista de espera o lo dejamos para la siguiente.",
    submit: "Enviar aplicación",
    submitting: "Enviando…",
    success: "Listo. Revisamos la cohorte Aster y respondemos por WhatsApp.",
    error: "Algo falló. Probá de nuevo en un momento.",
    stepIncomplete:
      "Completá los campos obligatorios de este paso para seguir.",
    invalidLink: "Usá un link completo que empiece con https://",
    formCrashTitle: "El formulario falló",
    formRetry: "Empezar de nuevo",
    qrCta: "QR",
    qrTitle: "Escaneá para abrir",
    qrBody: "Escaneá este código para abrir esta página en otro dispositivo.",
  },
  legal: legalEs,
  events: {
    metaTitle: "Eventos de Ai Labs en El Salvador",
    metaDescription:
      "Publicamos los eventos de IA en El Salvador de Ai Labs en Luma para este mes, en San Salvador; no son todos los eventos del país.",
    breadcrumbHome: "Inicio",
    label: "Eventos",
    headline: "Eventos de Ai Labs en El Salvador",
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
    communityCta: "Unirme a la comunidad",
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
