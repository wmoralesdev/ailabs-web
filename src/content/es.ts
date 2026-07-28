import { homeCarousel } from "./home-carousel"
import type { SiteContent } from "./types"

export const es: SiteContent = {
  locale: "es",
  meta: {
    title: "Ai Labs: Adáptate, desarrolla y aprende con IA",
    description:
      "Ai Labs ayuda a las empresas a poner la IA a trabajar con formación, software y comunidad. Desde El Salvador.",
  },
  chrome: {
    nav: {
      home: { label: "Inicio", href: "/" },
      pillars: [
        { id: "academy", label: "Academy", href: "#academy" },
        { id: "agentic", label: "Agentic", href: "#agentic" },
        { id: "aperture", label: "Aperture", href: "#aperture" },
      ],
      community: { label: "Comunidad", href: "/community" },
      campusLeader: { label: "Líderes campus", href: "/campus-leader" },
      contact: { label: "Contacto", href: "#contact" },
      cta: { label: "Hablemos", href: "#contact" },
    },
    footer: {
      brandLine:
        "Ai Labs ayuda a las empresas a adaptarse, desarrollar y aprender con IA.",
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
          title: "Pilares",
          links: [
            { label: "Academy", href: "#academy" },
            { label: "Agentic", href: "#agentic" },
            { label: "Aperture", href: "#aperture" },
          ],
        },
        {
          title: "Programas",
          links: [
            { label: "Comunidad", href: "/community" },
            { label: "Campus Leader", href: "/campus-leader" },
          ],
        },
        {
          title: "Compañía",
          links: [
            { label: "Contacto", href: "#contact" },
            { label: "ailabs.sv", href: "https://ailabs.sv" },
          ],
        },
      ],
      copyright: "© {year} Ai Labs",
      locationLine: "Hecho en San Salvador, El Salvador",
    },
  },
  microcopy: {
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
      label: "Para empresas y builders",
      headline: "IA que tu equipo sí usa",
      body: "Ai Labs es una empresa de IA con base en El Salvador. Enseñamos a los equipos a trabajar con IA, construimos el software que necesitan y los conectamos con quienes ya lo hacen.",
      primaryCta: { label: "Hablemos", href: "#contact" },
      secondaryCta: { label: "Conoce los pilares", href: "#academy" },
      proof: { value: "800+", label: "Builders" },
      slides: [
        { value: "800+", label: "Builders", icon: "builders" },
        { value: "40+", label: "Eventos realizados", icon: "events" },
        { value: "8", label: "Partners activos", icon: "partners" },
      ],
      mediaSrcs: homeCarousel.hero,
      mediaAlt: "Sesión de comunidad de Ai Labs",
    },
    trust: {
      label: "Partners con los que hacemos programas",
      logos: [
        { id: "cursor", name: "Cursor" },
        { id: "codex", name: "Codex" },
        { id: "openai", name: "OpenAI" },
        { id: "claude", name: "Claude" },
        { id: "mistral", name: "Mistral" },
        { id: "elevenlabs", name: "ElevenLabs" },
        { id: "notion", name: "Notion" },
      ],
    },
    about: {
      label: "Por qué nos llaman las empresas",
      body: "La mayoría de los equipos ya probó las herramientas por su cuenta. Nos quedamos hasta que las herramientas cambian cómo trabaja el equipo día a día.",
      stats: [
        { value: "40+", label: "Eventos realizados" },
        { value: "8", label: "Partners activos" },
      ],
      bold: "Tu equipo aprende con su propio trabajo, y lo que construimos juntos queda tuyo para operarlo cuando nos vamos.",
      bridgeLabel: "Por dónde empezar",
      bridge: [
        {
          title: "Academy",
          body: "Formaciones, bootcamps, residencias.",
        },
        { title: "Agentic", body: "Productos y flujos." },
        {
          title: "Aperture",
          body: "Partners y comunidad.",
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
      eyebrow: "Formación práctica",
      title: "Academy",
      lead: "Formaciones, bootcamps y residencias donde tu equipo pasa toda la sesión construyendo.",
      points: [
        {
          title: "Para tu equipo",
          body: "Programas para la empresa, para que la adopción no quede en unos pocos.",
        },
        {
          title: "Como consultoría",
          body: "Diseñamos y corremos todo el programa contigo.",
        },
        {
          title: "Sesiones abiertas",
          body: "Talleres y bootcamps públicos si aprendes por tu cuenta.",
        },
      ],
      cta: { label: "Formar a mi equipo", href: "#contact" },
      mediaSrcs: homeCarousel.features,
      mediaAlt: "Taller práctico en Ai Labs",
    },
    agentic: {
      id: "agentic",
      index: "02",
      eyebrow: "Software y flujos con IA",
      title: "Agentic",
      lead: "Construimos el producto o el flujo que necesitas y lo llevamos a producción con tu equipo.",
      points: [
        {
          title: "Productos de software",
          body: "De la primera versión a producción, alrededor de tu problema.",
        },
        {
          title: "Flujos con IA",
          body: "Automatización que encaja con cómo ya trabaja tu equipo.",
        },
        {
          title: "Cómo construimos",
          body: "Construimos con las mismas herramientas que enseñamos en Academy.",
        },
      ],
      cta: { label: "Definir un proyecto", href: "#contact" },
      process: {
        label: "Cómo corre un build de Agentic",
        steps: [
          {
            label: "Definir el proyecto",
            body: "Qué entra, qué no, qué significa listo.",
            glyph: "brief",
          },
          {
            label: "Construir juntos",
            body: "Tu equipo en la sala mientras lo escribimos.",
            glyph: "bench",
          },
          {
            label: "Dejarlo en vivo",
            body: "En tu entorno, no un demo.",
            glyph: "live",
          },
        ],
      },
    },
    aperture: {
      id: "aperture",
      index: "03",
      eyebrow: "Partners y comunidad",
      title: "Aperture",
      lead: "Eventos, talleres y un grupo de WhatsApp donde 800+ builders y nuestras empresas partner terminan en la misma sala.",
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
          quote: "Buena gente, eventos reales y un amor compartido por la tech.",
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
          upcoming: { date: "2026-08-29", href: "https://luma.com/hack0-q2my" },
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
        "Trabajamos directamente con las empresas detrás de las herramientas que enseñamos. Aperture es donde eso se vuelve eventos, talleres y contactos.",
      attribution: "Ai Labs",
      cta: { label: "Unirme a la comunidad", href: "/community" },
      partnerCta: { label: "Ser partner", href: "#contact" },
    },
    contact: {
      title: "¿Tenés un problema que valga la pena?",
      lead: "Capacitación, un build o un equipo trabado. Dejá una nota corta. La leemos y te respondemos.",
      cta: "Dejar una nota",
      nameLabel: "Nombre",
      namePlaceholder: "Juan Pérez",
      emailLabel: "Correo",
      emailPlaceholder: "juan.perez@ejemplo.com",
      companyLabel: "Empresa",
      companyPlaceholder: "Empresa Ejemplo",
      interestLabel: "¿Por dónde empezamos?",
      interestOptions: [
        { value: "academy", label: "Academy" },
        { value: "agentic", label: "Agentic" },
        { value: "aperture", label: "Aperture" },
        { value: "partner", label: "Partnership" },
      ],
      messageLabel: "¿En qué estás trabajando?",
      messagePlaceholder:
        "Nuestro equipo de operaciones cotiza cada pedido a mano. Queremos capacitarlos en IA.",
      submit: "Enviar mensaje",
      submitting: "Enviando…",
      success: "Gracias. Te contactamos pronto.",
      error: "Algo falló. Intenta de nuevo o escríbenos.",
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
        blurb:
          "Canjea tu código de OpenAI Platform de este evento de Ai Labs.",
      },
      codexOpenai: {
        title: "Créditos de Codex + OpenAI Platform",
        blurb:
          "Canjea tus códigos de Codex y OpenAI Platform de este evento.",
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
    success:
      "Listo. Revisamos la cohorte Aster y respondemos por WhatsApp.",
    error: "Algo falló. Probá de nuevo en un momento.",
    stepIncomplete: "Completá los campos obligatorios de este paso para seguir.",
    invalidLink: "Usá un link completo que empiece con https://",
    formCrashTitle: "El formulario falló",
    formRetry: "Empezar de nuevo",
    qrCta: "QR",
    qrTitle: "Escaneá para abrir",
    qrBody: "Escaneá este código para abrir esta página en otro dispositivo.",
  },
}
