import type { ServicePagesContent } from "./types"

const trainingDefinition =
  "Una capacitación práctica en IA enseña a usar la inteligencia artificial en las tareas reales de cada persona o equipo, con criterio para saber cuándo usarla, cómo revisar el resultado y cómo operarla."

const automationDefinition =
  "La automatización de procesos con IA diseña e implementa flujos que conectan herramientas, datos y personas, y define qué asiste la IA, qué se automatiza y qué decisiones siguen en manos del equipo."

const trainingCourses =
  "Los cursos de IA en El Salvador que damos son prácticos, sobre las tareas reales de tu trabajo, presenciales en San Salvador, y podés venir sin una empresa."

const trainingWorkshops =
  "Los talleres de inteligencia artificial en San Salvador son presenciales: practicás con tu propio trabajo y podés venir a aprender sin una empresa."

const trainingWhere =
  "En Ai Labs podés aprender IA en El Salvador con talleres prácticos en San Salvador; Campus Leaders es para estudiantes, y podés venir a aprender sin una empresa."

const automationCompanies =
  "Hacemos automatización con IA para empresas en El Salvador: diseñamos el flujo con tu equipo en San Salvador, con revisión humana y documentación."

const automationProcesses =
  "La automatización de procesos con IA en San Salvador la armamos con tus herramientas, y las decisiones importantes siguen en tus manos."

const automationCompany =
  "Somos Ai Labs, en San Salvador, El Salvador, y automatizamos procesos con IA para empresas: diseñamos el flujo con tu equipo, con revisión humana y documentación."

export const servicePagesEs: ServicePagesContent = {
  homeLabel: "Inicio",
  breadcrumbLabel: "Ruta de navegación",
  relatedLabel: "Otras formas de trabajar con Ai Labs",
  consultingLink: "Consultoría de IA en El Salvador",
  communityLink: "Comunidad de IA en El Salvador",
  training: {
    photo: {
      name: "3.webp",
      alt: "Participantes siguen una sesión práctica de Ai Labs en un auditorio.",
    },
    metaTitle: "Capacitación en IA en El Salvador para equipos | Ai Labs",
    metaDescription:
      "Damos cursos de IA en El Salvador y talleres de inteligencia artificial en San Salvador, prácticos, y podés venir sin una empresa.",
    serviceName: "Capacitación en IA en El Salvador",
    eyebrow: "Academy · Formación práctica",
    title: "Capacitación en IA en El Salvador para profesionales y equipos",
    lead: "En Ai Labs Academy enseñamos a aplicar IA en el trabajo de todos los días, en lenguaje claro para perfiles de negocio. Podés venir con tu equipo o por tu cuenta.",
    claims: [trainingCourses, trainingWorkshops, trainingWhere],
    definitionHeading: "Qué aprendés en una capacitación práctica en IA.",
    definition: trainingDefinition,
    includesHeading: "Cómo es la formación.",
    includes: [
      {
        title: "Sobre tus tareas",
        body: "La práctica parte de las tareas, decisiones y fricciones que enfrentás cada día, no de ejemplos genéricos.",
      },
      {
        title: "Criterio para usarla",
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
          "Un curso cubre un tema en varias sesiones, un taller es una sesión práctica y una capacitación se arma para un equipo y sus tareas. En Academy damos talleres públicos y capacitaciones, siempre sobre tareas reales.",
      },
      {
        question: "¿Necesito una empresa para aprender IA con Ai Labs?",
        answer:
          "No. En Academy recibimos a profesionales y equipos. Podés venir directo a aprender, sin empresa ni una consultoría previa.",
      },
      {
        question: "¿Necesito saber programar?",
        answer:
          "No. Pensamos la formación para perfiles de negocio y usamos lenguaje claro. Nos enfocamos en aplicar IA a tareas reales con criterio.",
      },
      {
        question: "¿Cuánto cuesta una capacitación en IA?",
        answer:
          "Cada taller público muestra su precio en su página. Las capacitaciones para equipos dependen del alcance y las acordamos después de revisar el proceso.",
      },
      {
        question: "¿Cómo me entero de los próximos talleres?",
        answer:
          "Seguí nuestra comunidad de WhatsApp en El Salvador y nuestras redes sociales: ahí avisamos de los próximos talleres públicos.",
      },
      {
        question: "¿Qué cursos de IA hay en El Salvador?",
        answer: trainingCourses,
      },
      {
        question:
          "¿Dónde son los talleres de inteligencia artificial en San Salvador?",
        answer: trainingWorkshops,
      },
      {
        question: "¿Dónde puedo aprender IA en El Salvador?",
        answer: trainingWhere,
      },
    ],
    ctaHeading: "¿Querés preparar a tu equipo?",
    ctaBody:
      "Contanos qué hace tu equipo y qué quiere mejorar. También podés escribirnos si querés aprender por tu cuenta.",
    cta: "Preparar a mi equipo",
    interest: "enablement",
  },
  automation: {
    photo: {
      name: "21.webp",
      alt: "Dos participantes revisan código en sus laptops durante una sesión de Ai Labs.",
    },
    metaTitle: "Automatización de procesos con IA en El Salvador | Ai Labs",
    metaDescription:
      "Hacemos automatización con IA para empresas en El Salvador y automatización de procesos con IA en San Salvador, con revisión humana.",
    serviceName: "Automatización de procesos con IA en El Salvador",
    eyebrow: "Agentic · Diseño e implementación",
    title:
      "Automatización de procesos con IA en El Salvador, diseñada con tu equipo",
    lead: "En Ai Labs Agentic diseñamos e implementamos flujos que encajan con la forma actual de trabajar, con las integraciones y la revisión humana que cada proceso necesita.",
    claims: [automationCompanies, automationProcesses, automationCompany],
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
      "Equipos con tareas repetitivas: seguimiento, documentos, reportes o datos entre herramientas.",
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
          "Una automatización ejecuta pasos fijos; un agente de IA también interpreta información y propone acciones. En los dos casos definimos qué decide la IA, qué revisa una persona y qué queda documentado.",
      },
      {
        question: "¿La IA reemplaza al equipo?",
        answer:
          "No. Diseñamos cada flujo con revisión humana donde hace falta. La IA asiste o automatiza pasos, y las decisiones importantes siguen en manos del equipo.",
      },
      {
        question: "¿Con qué herramientas se integra?",
        answer:
          "Partimos de las herramientas que el equipo ya usa. Definimos las integraciones después de entender el proceso, no antes.",
      },
      {
        question: "¿Cuánto cuesta automatizar un proceso con IA?",
        answer:
          "Depende del proceso y de las integraciones. No publicamos tarifas: primero revisamos el proceso y acordamos el alcance con el equipo.",
      },
      {
        question: "¿Qué recibe el equipo al final?",
        answer:
          "El equipo recibe el flujo funcionando, sus integraciones y la documentación necesaria para operarlo y ajustarlo.",
      },
      {
        question: "¿Hay automatización con IA para empresas en El Salvador?",
        answer: automationCompanies,
      },
      {
        question: "¿Hay automatización de procesos con IA en San Salvador?",
        answer: automationProcesses,
      },
      {
        question: "¿Qué empresa automatiza procesos con IA en El Salvador?",
        answer: automationCompany,
      },
    ],
    ctaHeading: "¿Qué proceso querés mejorar?",
    ctaBody:
      "Contanos cómo funciona hoy y dónde se traba. Lo revisamos con vos.",
    cta: "Quiero mejorar un proceso",
    interest: "implementation",
  },
}
