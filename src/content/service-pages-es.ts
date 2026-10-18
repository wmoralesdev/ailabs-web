import type { ServicePagesContent } from "./types"

const consultingDefinition =
  "Una consultoría en IA revisa cómo se hace el trabajo hoy, identifica dónde la inteligencia artificial puede ayudar y prioriza una oportunidad concreta para ponerla en práctica."

const trainingDefinition =
  "Una capacitación práctica en IA enseña a usar la inteligencia artificial en las tareas reales de cada persona o equipo, con criterio para saber cuándo usarla, cómo revisar el resultado y cómo operarla."

const automationDefinition =
  "La automatización de procesos con IA diseña e implementa flujos que conectan herramientas, datos y personas, y define qué asiste la IA, qué se automatiza y qué decisiones siguen en manos del equipo."

export const servicePagesEs: ServicePagesContent = {
  homeLabel: "Inicio",
  breadcrumbLabel: "Ruta de navegación",
  relatedLabel: "Otras formas de trabajar con Ai Labs",
  communityLink: "Comunidad de IA en El Salvador",
  consulting: {
    metaTitle:
      "Consultoría en IA en El Salvador: diagnóstico y priorización | Ai Labs",
    metaDescription:
      "Consultoría en IA en San Salvador: revisamos el proceso, priorizamos una oportunidad concreta y definimos si formar al equipo o implementar el flujo.",
    serviceName: "Consultoría en IA en El Salvador",
    eyebrow: "Consultoría en IA · San Salvador",
    title:
      "Consultoría en IA en El Salvador para equipos comerciales, de gestión y operaciones",
    lead: "Ai Labs ayuda a equipos en El Salvador a entender cómo trabajan hoy, elegir dónde la IA aporta de verdad y decidir el siguiente paso: preparar al equipo o implementar el flujo.",
    definitionHeading: "Qué hace una consultoría en IA por tu equipo.",
    definition: consultingDefinition,
    includesHeading: "Qué incluye la consultoría.",
    includes: [
      {
        title: "Mapa del proceso actual",
        body: "Revisamos cómo se hace el trabajo hoy: quién participa, qué entra, qué se decide y dónde se traba.",
      },
      {
        title: "Oportunidades evaluadas",
        body: "Comparamos dónde puede ayudar la IA según impacto, riesgo y un alcance realista para el equipo.",
      },
      {
        title: "Una prioridad clara",
        body: "Elegimos una oportunidad y acordamos el alcance y cómo vamos a valorar la mejora.",
      },
      {
        title: "La ruta siguiente",
        body: "Decidimos si conviene preparar al equipo con Academy o implementar el flujo con Agentic.",
      },
    ],
    stepsHeading: "Cómo trabajamos.",
    steps: [
      {
        title: "Entender",
        body: "Mapeamos el proceso, las personas, las entradas, las decisiones y la fricción.",
      },
      {
        title: "Priorizar",
        body: "Evaluamos la oportunidad, el impacto, el riesgo y un alcance realista.",
      },
      {
        title: "Poner en práctica",
        body: "Preparamos al equipo o diseñamos e implementamos el flujo con él, con revisión humana y documentación.",
      },
    ],
    fitHeading: "Para quién es.",
    fit: [
      "Equipos comerciales, de gestión y de operaciones con tareas repetitivas o mucho seguimiento manual.",
      "Dueños y líderes que quieren empezar con IA sin comprar herramientas a ciegas.",
      "Empresas que ya probaron herramientas de IA y necesitan decidir qué vale la pena sostener.",
    ],
    notFitHeading: "Para quién no es.",
    notFit: [
      "Si buscás licencias, créditos o acceso a una herramienta específica.",
      "Si esperás un resultado garantizado sin revisar cómo se hace el trabajo.",
    ],
    faqHeading: "Preguntas sobre consultoría en IA.",
    faq: [
      {
        question: "¿Qué hace un consultor de IA?",
        answer: consultingDefinition,
      },
      {
        question:
          "Consultor, asesor, agencia o empresa de IA: ¿cuál es la diferencia?",
        answer:
          "Ai Labs es una empresa privada de consultoría en IA en San Salvador, El Salvador. Ya sea que busqués un consultor, un asesor, una agencia o una empresa de inteligencia artificial, lo que importa es el método: entender el proceso, priorizar una mejora y dejar al equipo listo para operarla.",
      },
      {
        question: "¿Cuánto cuesta una consultoría en IA en El Salvador?",
        answer:
          "Depende del alcance. Ai Labs no publica tarifas de consultoría porque primero revisa el proceso y acuerda con el equipo qué conviene mejorar.",
      },
      {
        question: "¿Necesito tener datos o herramientas listas para empezar?",
        answer:
          "No. La consultoría de Ai Labs empieza por entender cómo se hace el trabajo hoy. Las herramientas y los datos se deciden después, según la oportunidad priorizada.",
      },
      {
        question: "¿Qué pasa después de la consultoría?",
        answer:
          "Ai Labs sigue por una de dos rutas: Academy prepara al equipo para aplicar la mejora, y Agentic diseña e implementa el flujo con el equipo, con integraciones, revisión humana, documentación y transferencia.",
      },
      {
        question: "¿Ai Labs vende licencias o créditos de herramientas de IA?",
        answer:
          "No. Ai Labs participa en programas de embajadores de varias herramientas de IA, pero no vende licencias ni garantiza acceso, créditos o alianzas con terceros.",
      },
    ],
    ctaHeading: "¿Por dónde empezamos?",
    ctaBody: "Contanos qué proceso querés mejorar. La empresa es opcional.",
    cta: "Encontrar dónde aplicar IA",
    interest: "discovery",
  },
  training: {
    metaTitle:
      "Capacitación en IA en El Salvador: equipos y profesionales | Ai Labs",
    metaDescription:
      "Capacitación práctica en IA en San Salvador para profesionales y equipos: tareas reales, criterio para revisar resultados y talleres públicos.",
    serviceName: "Capacitación en IA en El Salvador",
    eyebrow: "Academy · Formación práctica",
    title: "Capacitación en IA en El Salvador para profesionales y equipos",
    lead: "Ai Labs Academy enseña a aplicar IA en el trabajo de todos los días, en lenguaje claro para perfiles de negocio. Podés venir con tu equipo o directamente a aprender.",
    definitionHeading: "Qué aprendés en una capacitación práctica en IA.",
    definition: trainingDefinition,
    includesHeading: "Cómo es la formación.",
    includes: [
      {
        title: "Sobre tus tareas",
        body: "La práctica parte de las tareas, decisiones y fricciones que enfrentás cada día, no de ejemplos genéricos.",
      },
      {
        title: "Criterio, no solo herramientas",
        body: "Aprendés cuándo usar la IA, cómo revisar lo que produce y cuándo conviene mantener una tarea humana.",
      },
      {
        title: "Para equipos",
        body: "Después de priorizar un proceso, trabajamos con los casos reales del equipo hasta que pueda aplicar y operar la mejora.",
      },
      {
        title: "Para profesionales",
        body: "Talleres y bootcamps públicos para quienes aprenden por su cuenta, sin una empresa ni una consultoría previa.",
      },
    ],
    stepsHeading: "Cómo se arma una capacitación para equipos.",
    steps: [
      {
        title: "Entender",
        body: "Revisamos qué hace el equipo, con qué herramientas y dónde pierde tiempo.",
      },
      {
        title: "Practicar",
        body: "Trabajamos sobre casos reales del equipo, con ejercicios que se pueden repetir al día siguiente.",
      },
      {
        title: "Operar",
        body: "Dejamos criterios de revisión y documentación para que la mejora se sostenga.",
      },
    ],
    fitHeading: "Para quién es.",
    fit: [
      "Profesionales que quieren aplicar IA en su trabajo con criterio.",
      "Equipos comerciales, de gestión y de operaciones que necesitan una base común.",
      "Personas que prefieren aprender en persona, con práctica guiada.",
    ],
    notFitHeading: "Para quién no es.",
    notFit: [
      "Si buscás un curso teórico de programación o investigación en IA.",
      "Si buscás un certificado sin práctica sobre tu propio trabajo.",
    ],
    faqHeading: "Preguntas sobre capacitación en IA.",
    faq: [
      {
        question: "¿Qué es una capacitación práctica en IA?",
        answer: trainingDefinition,
      },
      {
        question: "Curso, taller o capacitación en IA: ¿cuál es la diferencia?",
        answer:
          "Ai Labs Academy ofrece formación práctica en IA en San Salvador. Ya sea que busqués un curso, un taller, un bootcamp o una capacitación en inteligencia artificial, la idea es la misma: practicar sobre tareas reales hasta poder aplicarlo en el trabajo.",
      },
      {
        question: "¿Necesito una empresa para aprender IA con Ai Labs?",
        answer:
          "No. Ai Labs Academy recibe a profesionales y equipos. Podés venir directamente a aprender, sin una empresa ni una consultoría previa.",
      },
      {
        question: "¿Necesito saber programar?",
        answer:
          "No. La formación de Ai Labs está pensada para perfiles de negocio y usa lenguaje claro. Se enfoca en aplicar IA a tareas reales con criterio.",
      },
      {
        question: "¿Cuánto cuesta una capacitación en IA?",
        answer:
          "Los talleres públicos de Ai Labs muestran su costo en su propia página. Las capacitaciones para equipos dependen del alcance y se acuerdan después de revisar el proceso.",
      },
      {
        question: "¿Cómo me entero de los próximos talleres?",
        answer:
          "Seguí la comunidad de WhatsApp de Ai Labs en El Salvador y sus redes para enterarte de los próximos talleres públicos.",
      },
    ],
    ctaHeading: "¿Querés preparar a tu equipo?",
    ctaBody:
      "Contanos qué hace tu equipo y qué quiere mejorar. También podés escribirnos si querés aprender por tu cuenta.",
    cta: "Preparar a mi equipo",
    interest: "enablement",
  },
  automation: {
    metaTitle:
      "Automatización con IA en El Salvador: flujos e integraciones | Ai Labs",
    metaDescription:
      "Automatización de procesos con IA en San Salvador: flujos con tus herramientas, revisión humana, documentación y transferencia al equipo.",
    serviceName: "Automatización de procesos con IA en El Salvador",
    eyebrow: "Agentic · Diseño e implementación",
    title:
      "Automatización de procesos con IA en El Salvador, diseñada con tu equipo",
    lead: "Ai Labs Agentic diseña e implementa flujos que encajan con la forma actual de trabajar, con las integraciones y la revisión humana que cada proceso necesita.",
    definitionHeading: "Qué hace la automatización con IA por tu operación.",
    definition: automationDefinition,
    includesHeading: "Qué incluye.",
    includes: [
      {
        title: "Encaje con el proceso",
        body: "El flujo respeta las herramientas, los datos y las responsabilidades que ya existen.",
      },
      {
        title: "Integraciones",
        body: "Conectamos las herramientas que el equipo ya usa para que la información no se copie a mano.",
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
    stepsHeading: "Cómo implementamos un flujo.",
    steps: [
      {
        title: "Entender el proceso",
        body: "Mapeamos entradas, decisiones, fricción y el resultado esperado.",
      },
      {
        title: "Diseñar la intervención",
        body: "Definimos qué asistir, automatizar o mantener humano.",
      },
      {
        title: "Implementar y transferir",
        body: "Integramos, documentamos y dejamos al equipo listo para operar.",
      },
    ],
    fitHeading: "Para quién es.",
    fit: [
      "Equipos con procesos repetitivos: seguimiento, documentos, reportes o datos que pasan entre herramientas.",
      "Operaciones que necesitan velocidad sin perder control sobre las decisiones importantes.",
      "Empresas que quieren que el equipo pueda operar el flujo sin depender de un proveedor.",
    ],
    notFitHeading: "Para quién no es.",
    notFit: [
      "Si buscás reemplazar al equipo en vez de mejorar cómo trabaja.",
      "Si el proceso todavía no está claro: ahí conviene empezar por la consultoría.",
    ],
    faqHeading: "Preguntas sobre automatización con IA.",
    faq: [
      {
        question: "¿Qué es la automatización de procesos con IA?",
        answer: automationDefinition,
      },
      {
        question:
          "Automatización, agente de IA o flujo agéntico: ¿cuál es la diferencia?",
        answer:
          "Ai Labs Agentic implementa flujos con IA en San Salvador. Una automatización ejecuta pasos fijos; un agente de IA o flujo agéntico además interpreta información y propone acciones. En ambos casos, Ai Labs define qué decide la IA, qué revisa una persona y qué queda documentado.",
      },
      {
        question: "¿La IA reemplaza al equipo?",
        answer:
          "No. Ai Labs diseña cada flujo con revisión humana donde hace falta. La IA asiste o automatiza pasos, y las decisiones importantes siguen en manos del equipo.",
      },
      {
        question: "¿Con qué herramientas se integra?",
        answer:
          "Ai Labs parte de las herramientas que el equipo ya usa. Las integraciones se definen después de entender el proceso, no antes.",
      },
      {
        question: "¿Cuánto cuesta automatizar un proceso con IA?",
        answer:
          "Depende del proceso y de las integraciones. Ai Labs no publica tarifas: primero revisa el proceso y acuerda el alcance con el equipo.",
      },
      {
        question: "¿Qué recibe el equipo al final?",
        answer:
          "El equipo recibe el flujo funcionando, sus integraciones y la documentación necesaria para operarlo y ajustarlo.",
      },
    ],
    ctaHeading: "¿Qué proceso querés mejorar?",
    ctaBody:
      "Contanos cómo funciona hoy y dónde se traba. Lo revisamos con vos.",
    cta: "Quiero mejorar un proceso",
    interest: "implementation",
  },
}
