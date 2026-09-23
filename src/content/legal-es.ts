import type { LegalContent } from "./types"

export const legalEs: LegalContent = {
  status: "draft",
  version: "2026-10-draft",
  updatedOn: "2026-09-23",
  draftNotice:
    "Borrador, sin vigencia. Este texto está en revisión legal y todavía no rige ninguna cuenta.",
  versionLabel: "Versión {version}",
  updatedLabel: "Última actualización: {date}",
  contentsLabel: "En esta página",
  terms: {
    title: "Términos de uso",
    metaDescription:
      "Los términos que aplican al sitio de Ai Labs y a los perfiles de miembro de Aperture.",
    intro:
      "Estos términos aplican cuando usas el sitio de Ai Labs y cuando creas un perfil de miembro en Aperture. Ai Labs tiene su sede en El Salvador.",
    sections: [
      {
        id: "about",
        heading: "Qué es Aperture",
        paragraphs: [
          "Aperture es la red de miembros de Ai Labs. Un perfil muestra quién sos, qué construís y en qué eventos de Ai Labs participaste, si decidís mostrarlos.",
          "Aperture es un espacio de comunidad. No es una bolsa de empleo, un marketplace ni un servicio de pagos, y Ai Labs no es parte de los acuerdos entre miembros.",
        ],
      },
      {
        id: "eligibility",
        heading: "Tenés que tener 18 años o más",
        paragraphs: [
          "Solo podés crear un perfil si tenés 18 años o más. Al unirte, confirmás tu edad. Si sabemos que un miembro es menor de 18, cerramos el perfil.",
        ],
      },
      {
        id: "membership",
        heading: "Números de miembro",
        paragraphs: [
          "Cada perfil recibe un número de miembro permanente al crearse. Los números 000 a 004 pertenecen al equipo de Ai Labs. Los números públicos empiezan en 005 y siguen el orden en que se crean los perfiles.",
          "Un número no se puede transferir, elegir ni reutilizar. Si eliminás tu cuenta, tu número queda retirado.",
        ],
      },
      {
        id: "profile",
        heading: "Tu perfil",
        paragraphs: [
          "Sos responsable de lo que dice tu perfil. Usá tu nombre real o el nombre por el que te conocen, y mantené tus enlaces y datos correctos.",
          "Tu nombre de usuario no debe suplantar a otra persona o empresa. Podemos cambiar un nombre de usuario que lo haga.",
        ],
      },
      {
        id: "projects",
        heading: "Proyectos que publicás",
        paragraphs: [
          "Los proyectos, textos e imágenes que publicás siguen siendo tuyos. Al publicarlos, permitís que Ai Labs los muestre en el sitio y en canales de Ai Labs que enlacen a tu perfil, mientras sigan publicados.",
          "El desglose de herramientas de un proyecto lo reportan sus creadores. Ai Labs no lo verifica, y no significa que alguna empresa de herramientas respalde el proyecto.",
        ],
      },
      {
        id: "conduct",
        heading: "Qué no está permitido",
        paragraphs: [
          "No publiqués contenido ilegal, engañoso, de odio, sexual o que infrinja derechos de otras personas. No enviés spam, no extraigás datos de otros miembros y no usés Aperture para vender productos ajenos a la comunidad.",
        ],
      },
      {
        id: "moderation",
        heading: "Cómo moderamos",
        paragraphs: [
          "Los miembros pueden reportar un perfil o un proyecto. Ai Labs revisa los reportes y puede ocultar contenido o cerrar un perfil que incumpla estos términos. Cuando actuamos sobre tu contenido, intentamos decirte por qué.",
        ],
      },
      {
        id: "credits",
        heading: "Sin créditos ni alianzas garantizadas",
        paragraphs: [
          "Ser miembro no garantiza créditos, premios, acceso a programas, presentaciones ni alianzas. Cuando Ai Labs comparte créditos de herramientas en un evento, provienen de terceros con sus propios términos y fechas de vencimiento.",
        ],
      },
      {
        id: "newsletter",
        heading: "El newsletter es opcional",
        paragraphs: [
          "Unirte al newsletter es una decisión aparte y opcional. Podés desactivarlo cuando quieras desde tu cuenta, y hacerlo no afecta tu perfil.",
        ],
      },
      {
        id: "termination",
        heading: "Eliminar tu cuenta",
        paragraphs: [
          "Podés eliminar tu cuenta cuando quieras desde la configuración de tu cuenta. Al eliminarla, se borra tu perfil y se ocultan los proyectos donde sos el único creador.",
        ],
      },
      {
        id: "liability",
        heading: "Límites de nuestra responsabilidad",
        paragraphs: [
          "Aperture se ofrece tal como está. Ai Labs no es responsable del contenido que publican los miembros ni de los acuerdos que hacen entre sí.",
        ],
      },
      {
        id: "changes",
        heading: "Cambios a estos términos",
        paragraphs: [
          "Cuando estos términos cambien, actualizaremos la versión y la fecha al inicio de esta página. Si un cambio afecta tus derechos, te vamos a pedir que aceptés la nueva versión antes de seguir usando tu perfil.",
        ],
      },
      {
        id: "law",
        heading: "Ley aplicable",
        paragraphs: ["Estos términos se rigen por las leyes de El Salvador."],
      },
    ],
  },
  privacy: {
    title: "Aviso de privacidad",
    metaDescription:
      "Cómo Ai Labs recopila, usa y protege datos personales en su sitio y en Aperture.",
    intro:
      "Este aviso explica qué datos personales recopila Ai Labs, para qué, quién los trata y cómo ejercés tus derechos según la Ley para la Protección de Datos Personales de El Salvador (Decreto 144).",
    sections: [
      {
        id: "controller",
        heading: "Quién es responsable",
        paragraphs: [
          "Ai Labs, con sede en San Salvador, El Salvador, es responsable de los datos personales descritos aquí.",
        ],
      },
      {
        id: "data-we-collect",
        heading: "Datos que recopilamos",
        paragraphs: [
          "Datos de cuenta de Clerk, nuestro proveedor de inicio de sesión, incluidos tus correos verificados, nombre y foto de perfil.",
          "Datos de perfil que ingresás, como nombre de usuario, nombre visible, titular, biografía, país, ciudad, rol, a qué te apuntás y enlaces.",
          "Datos de eventos, como los eventos cuya lista de asistentes incluye tu correo y los créditos que reclamaste.",
          "Mensajes que enviás por el formulario de contacto y solicitudes que enviás a programas como Campus Leaders.",
        ],
      },
      {
        id: "how-we-use",
        heading: "Cómo los usamos",
        paragraphs: [
          "Usamos tus datos para operar tu cuenta y tu perfil, mostrarte tus eventos y créditos, moderar contenido y responder tus mensajes. No vendemos datos personales.",
        ],
      },
      {
        id: "public-data",
        heading: "Qué pueden ver otras personas",
        paragraphs: [
          "Tu perfil es público. Cualquier persona puede ver tu número de miembro, nombre de usuario, nombre visible, foto, titular, biografía, país, ciudad, rol, a qué te apuntás, enlaces y proyectos.",
          "Tus eventos aparecen en tu perfil solo si lo activás. Tus correos y códigos de créditos nunca son públicos.",
        ],
      },
      {
        id: "consent",
        heading: "Tu consentimiento",
        paragraphs: [
          "Al unirte, registramos que aceptaste estos documentos, tu confirmación de edad y tu decisión sobre el newsletter, cada una con su versión y fecha.",
          "El newsletter es opcional y viene desmarcado. Podés retirar ese consentimiento cuando quieras desde tu cuenta, sin costo, y eso no afecta lo tratado antes.",
        ],
      },
      {
        id: "processors",
        heading: "Quién trata tus datos",
        paragraphs: [
          "Clerk gestiona el inicio de sesión. Neon aloja nuestra base de datos. Vercel aloja el sitio. Cloudflare R2 guarda las imágenes de proyectos. Cada uno trata datos solo para prestar su servicio a Ai Labs.",
        ],
      },
      {
        id: "retention",
        heading: "Cuánto tiempo los guardamos",
        paragraphs: [
          "Guardamos los datos de perfil mientras exista tu cuenta. Cuando eliminás tu cuenta, borramos tu perfil y tus correos. Conservamos tu número de miembro retirado y el registro de tus consentimientos para poder mostrar qué aceptaste y que te diste de baja del newsletter.",
        ],
      },
      {
        id: "data-rights",
        heading: "Tus derechos",
        paragraphs: [
          "Tenés derecho a acceder, rectificar, cancelar y oponerte al tratamiento de tus datos personales, y a recibir una copia de ellos.",
          "Desde la configuración de tu cuenta podés editar tu perfil, descargar tus datos, desactivar el newsletter y eliminar tu cuenta. Para cualquier otra solicitud, escribinos por el formulario de contacto en ailabs.sv.",
        ],
      },
      {
        id: "security",
        heading: "Cómo los protegemos",
        paragraphs: [
          "El acceso a la base de datos está limitado al equipo de Ai Labs, las conexiones están cifradas y Clerk gestiona el inicio de sesión, así que nunca guardamos tu contraseña.",
        ],
      },
      {
        id: "minors",
        heading: "Personas menores de 18",
        paragraphs: [
          "Aperture es solo para personas de 18 años o más. No conservamos a sabiendas perfiles de menores.",
        ],
      },
      {
        id: "changes",
        heading: "Cambios a este aviso",
        paragraphs: [
          "Cuando este aviso cambie, actualizaremos la versión y la fecha al inicio de esta página y avisaremos a los miembros sobre los cambios que les afecten.",
        ],
      },
    ],
  },
}
