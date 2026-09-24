import { homeCarousel } from "./home-carousel"
import { legalEs } from "./legal-es"
import type { SiteContent } from "./types"

export const es: SiteContent = {
  locale: "es",
  meta: {
    title: "Ai Labs | Consultoría en IA, automatización y formación práctica",
    description:
      "Consultoría en IA, automatización de procesos y formación práctica para equipos y profesionales. Desde El Salvador.",
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
              href: "#academy",
            },
            {
              label: "Automatización de procesos",
              href: "#agentic",
            },
            {
              label: "Cómo trabajamos",
              href: "#about",
            },
          ],
        },
        {
          id: "aperture",
          title: "Comunidad",
          links: [
            {
              label: "Unirme a la comunidad",
              href: "/community",
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
      body: "Para equipos y profesionales.",
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
      title: "Consultoría en IA",
      body: "Revisamos cómo trabajás, identificamos dónde puede ayudar la IA y decidimos por dónde empezar. Después te ayudamos a aprender o implementamos el flujo con vos.",
      items: [
        {
          id: "academy",
          brand: "Academy",
          title: "Aprendé a aplicar IA en tu trabajo.",
          body: "Formación práctica para profesionales y equipos, a partir de las tareas que querés mejorar.",
          points: [
            "Practicá con trabajo que conocés.",
            "Aprendé cuándo usar IA y cómo revisar sus resultados.",
            "Desarrollá criterio para aplicarla por tu cuenta.",
          ],
          cta: "Quiero aprender",
          interest: "enablement",
        },
        {
          id: "agentic",
          brand: "Agentic",
          title: "Hacé que tus procesos funcionen mejor.",
          body: "Diseñamos e implementamos flujos para tu operación, conectando tus herramientas y a las personas que las usan.",
          points: [
            "Reducí pasos repetitivos y conectá información.",
            "Conservá la revisión humana donde hace falta.",
            "Recibí documentación y transferencia al equipo.",
          ],
          cta: "Quiero mejorar un proceso",
          interest: "implementation",
        },
      ],
    },
    method: {
      label: "Cómo trabajamos",
      title: "Primero, entendamos el trabajo.",
      body: "En consultoría e implementación, partimos de la necesidad y acordamos un siguiente paso útil. También podés venir directamente a aprender.",
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
    trust: {
      label: "Somos parte de programas de embajadores",
      pause: "Pausar logos",
      resume: "Reanudar logos",
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
      mediaAlt: "Builders colaborando en un evento de Ai Labs",
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
      mediaAlt: "Taller práctico en Ai Labs",
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
    aperture: {
      id: "aperture",
      index: "03",
      eyebrow: "APERTURE · COMUNIDAD Y EVIDENCIA",
      title: "Aperture",
      lead: "La comunidad, las alianzas y los eventos nos mantienen cerca de quienes construyen con estas herramientas y muestran el trabajo en práctica.",
      voices: [
        {
          quote: "Aprendo construyendo.",
          name: "Cristina, CFO en YonJob",
          role: "Builder",
        },
        {
          quote: "Talleres, mentores y gente que sí aparece.",
          name: "Cristian, Ingeniero de Software",
          role: "Academy",
        },
        {
          quote:
            "Buena gente, eventos reales y un amor compartido por la tech.",
          name: "Kharen, Estudiante de Diseño",
          role: "Aperture",
        },
      ],
      eventsLabel: "Quiénes han estado en la sala",
      upcomingLabel: "Próximamente",
      nextLabel: "Próximo",
      seriesLabel: "Serie recurrente",
      attendanceLabel: "builders",
      events: [
        {
          id: "hack0-q2my",
          name: "The Next Craft",
        },
        {
          id: "tm16k0kj",
          name: "Cursor Buildathon 24h",
          venue: "Universidad Francisco Gavidia",
          attendance: 208,
        },
        {
          id: "yzoilzlq",
          name: "OpenAI Build Week",
          venue: "Presidente Plaza",
        },
        {
          id: "hack0-4d2s",
          name: "Code Brew El Salvador",
          venue: "Presidente Plaza",
        },
        {
          id: "625ptozh",
          name: "Codex Community Build Meetup",
          venue: "Presidente Plaza",
        },
        {
          id: "cursor-cowork",
          name: "Cursor Cowork",
          venue: "San Salvador",
          series: true,
        },
        {
          id: "cursor-lab",
          name: "Cursor Lab",
          venue: "Campus universitarios",
          series: true,
        },
        {
          id: "zero-to-agent",
          name: "Zero to Agent",
          venue: "San Salvador y Guatemala",
          series: true,
        },
      ],
      stat: { value: "800+", label: "Builders en la comunidad" },
      quote:
        "Aperture reúne comunidad, alianzas y eventos que muestran cómo se construye y se aprende con estas herramientas.",
      attribution: "Ai Labs",
      cta: { label: "Unirme a la comunidad", href: "/community" },
      partnerCta: { label: "Explorar una alianza", href: "#contact" },
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
  redeem: {
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
    joinNudgeTitle: "Aperture",
    joinNudgeBody:
      "Reclamá un número de miembro permanente y un perfil público de builder.",
    joinNudgeCta: "Unirme a Aperture",
    qrCta: "QR",
    qrTitle: "Escanea para abrir",
    qrBody: "Escanea este código para abrir esta página en otro dispositivo.",
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
    metaTitle: "Únete a la comunidad",
    metaDescription:
      "Comunidad de WhatsApp de Ai Labs en El Salvador: eventos, talleres y builders.",
    label: "Comunidad",
    headline: "Únete a la comunidad de WhatsApp de Ai Labs",
    body: "El canal del día a día para eventos, talleres y gente construyendo con IA.",
    joinPrompt: "Unirte es gratis.",
    joinCta: "Unirme en WhatsApp",
    joinHint: "Abre WhatsApp · puede pedir aprobación",
    joinHref: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
    howItWorksLabel: "Cómo funciona",
    steps: [
      { title: "Abre la invitación", body: "Toca Unirme en WhatsApp" },
      {
        title: "Solicita unirte",
        body: "WhatsApp puede pedir aprobación",
      },
      { title: "Saluda", body: "Preséntate y sigue la conversación" },
    ],
    qrCta: "QR",
    qrTitle: "Escanea para abrir",
    qrBody: "Escanea este código para abrir esta página en otro dispositivo.",
  },
  campusLeader: {
    metaTitle: "Campus Leader",
    metaDescription:
      "Aplicá como Ai Labs Campus Leader. Un líder por universidad en campus de El Salvador.",
    label: "Campus Leader",
    headline: "Sé el líder de tu universidad",
    body: "Un líder por universidad, con reconocimiento oficial y voz en qué talleres llegan a tu campus. Mirá cómo funciona y aplicá en tres pasos.",
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
    media: {
      whatSrc: homeCarousel.campusLeader[0],
      whatAlt: "Estudiantes colaborando en laptops durante una sesión Ai Labs",
      benefitsSrcs: homeCarousel.campusLeader,
      benefitsAlt: "Participante trabajando en un escritorio de taller Ai Labs",
    },
    landing: {
      what: {
        label: "El programa",
        title: "Qué es",
        body: "Ai Labs en el campus: un líder por universidad de El Salvador, elegido por cohorte.",
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
        title: "Qué hace un Campus Leader",
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
        title: "Qué recibís",
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
        title: "Para quién es",
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
        helper: "Link del perfil — así te encontramos en el campus",
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
  aperture: {
    join: {
      metaTitle: "Unirme a Aperture",
      metaDescription:
        "Reclamá un número de miembro permanente de Aperture y un perfil público corto.",
      label: "Aperture",
      headline: "Reclamá tu número de miembro",
      body: "Un perfil público corto y un número permanente. Los números se asignan en orden y no se reutilizan.",
      signInPrompt:
        "Iniciá sesión para reclamar tu número. Usá un correo verificado.",
      signInCta: "Iniciar sesión para unirme",
      signOutCta: "Cerrar sesión",
      signedInAs: "Sesión iniciada como {email}",
      submit: "Reclamar mi número",
      submitting: "Reclamando…",
      closedTitle: "El registro está cerrado",
      closedBody: "Aperture no está aceptando miembros nuevos por ahora.",
      retiredTitle: "Esta cuenta se cerró",
      retiredBody:
        "Tu número de miembro queda retirado y no se puede volver a reclamar.",
      existingTitle: "Ya tenés un número",
      existingBody: "Tu número es #{number}.",
      noVerifiedEmailTitle: "Verificá tu correo",
      noVerifiedEmailBody:
        "Tu cuenta necesita un correo verificado antes de unirte a Aperture.",
      error: "Algo falló. Probá de nuevo en un momento.",
      usernameAvailable: "Disponible",
      usernameChecking: "Revisando…",
      fields: {
        username: {
          label: "Usuario",
          placeholder: "walter",
          helper: "3–20 letras, números o guiones bajos.",
        },
        displayName: {
          label: "Nombre para mostrar",
          placeholder: "Walter Morales",
        },
        headline: {
          label: "Titular",
          placeholder: "Founder trabajando en IA aplicada",
          helper: "Qué hacés, en una línea.",
        },
        country: {
          label: "País",
          placeholder: "Elegí un país",
        },
        role: {
          label: "Rol",
          placeholder: "Elegí un rol",
        },
        upFor: {
          label: "Me apunto a",
          helper: "Opcional. En qué te pueden escribir.",
        },
      },
      roleOptions: {
        FOUNDER: "Founder",
        DEVELOPER: "Developer",
        DESIGNER: "Diseñador",
        OPERATOR: "Operaciones",
        STUDENT: "Estudiante",
      },
      upForOptions: {
        COFOUNDING: "Cofundar",
        FREELANCE: "Freelance",
        HIRING: "Contratar",
        MENTORING: "Mentorear",
        COLLABORATING: "Colaborar",
      },
      fieldErrors: {
        required: "Este campo es obligatorio.",
        too_long: "Es demasiado largo.",
        invalid: "Revisá este valor.",
        reserved: "Ese usuario está reservado.",
        taken: "Ese usuario ya está en uso.",
      },
      legalAccept: "Acepto los {terms} y la {privacy}.",
      legalTerms: "Términos de uso",
      legalPrivacy: "Política de privacidad",
      ageAccept: "Tengo 18 años o más.",
      newsletterAccept: "Quiero recibir el boletín de Aperture. Es opcional.",
      revealTitle: "Ya estás dentro",
      revealBody: "Tu número es #{number}.",
      revealCta: "Ir a tu panel",
      qrCta: "QR",
      qrTitle: "Escaneá para abrir",
      qrBody: "Escaneá este código para abrir esta página en otro dispositivo.",
    },
    me: {
      metaTitle: "Tu perfil de Aperture",
      metaDescription:
        "Tu panel privado de Aperture: número de miembro, eventos, créditos y ajustes.",
      label: "Aperture",
      headline: "Tu panel",
      numberLabel: "Miembro #{number}",
      signInPrompt: "Iniciá sesión para ver tu número, eventos y créditos.",
      signInCta: "Iniciar sesión",
      signOutCta: "Cerrar sesión",
      signedInAs: "Sesión iniciada como {email}",
      joinCta: "Reclamá tu número",
      noMemberTitle: "Todavía no sos miembro",
      noMemberBody: "Reclamá un número permanente para abrir tu panel.",
      retiredTitle: "Esta cuenta se cerró",
      retiredBody:
        "Tu número de miembro queda retirado. Ya no se muestran eventos ni créditos.",
      eventsTitle: "Eventos",
      eventsEmpty:
        "Todavía no hay eventos de Ai Labs ligados a tus correos verificados.",
      creditsTitle: "Créditos",
      creditsEmpty: "Todavía no canjeaste créditos.",
      expiresLabel: "Vence {date}",
      settingsTitle: "Ajustes del perfil",
      save: "Guardar cambios",
      saving: "Guardando…",
      saved: "Guardado",
      error: "Algo falló. Probá de nuevo en un momento.",
      newsletterLabel: "Quiero recibir el boletín de Aperture.",
      showEventsLabel: "Mostrar mis eventos en el perfil público",
      showEventsHelper:
        "Solo los eventos ya ligados a tus correos verificados. Apagado por defecto.",
      usernameCooldown: "Podés cambiar tu usuario de nuevo el {date}.",
      fields: {
        bio: {
          label: "Bio",
          placeholder: "Qué estás construyendo, en unas líneas.",
          helper: "Hasta 280 caracteres. Se ve en tu perfil público.",
        },
        city: {
          label: "Ciudad",
          placeholder: "San Salvador",
        },
        linkedin: {
          label: "LinkedIn",
          placeholder: "https://linkedin.com/in/tunombre",
        },
        x: {
          label: "X",
          placeholder: "https://x.com/tuusuario",
        },
        github: {
          label: "GitHub",
          placeholder: "https://github.com/tuusuario",
        },
        website: {
          label: "Sitio",
          placeholder: "https://ejemplo.com",
        },
        instagram: {
          label: "Instagram",
          placeholder: "https://instagram.com/tuusuario",
        },
      },
      poolLabels: {
        CURSOR: "Cursor",
        CODEX: "Codex",
        OPENAI: "OpenAI Platform",
      },
    },
  },
}
