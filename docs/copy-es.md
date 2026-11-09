# Ai Labs — copy en español

Borrador del 1 nov 2026, escrito desde `docs/narrativa-y-mapa.md`. Es el texto
que va a entrar en `src/content/es.ts` y `service-pages-es.ts` cuando aterrice
la poda técnica. Las respuestas de Walter del 1 nov 2026 ya están aplicadas;
lo que sigue entre corchetes es lo único pendiente. Presupuestos: H1 55, lead
160, título de sección 40,
línea de tarjeta 120, respuesta 220, cinco preguntas por página.

## Chrome

**Header**

- Servicios (desplegable): "Automatización y software", "Diagnóstico de IA",
  "Capacitación para equipos"
- "Eventos"
- Botón: "Agendar diagnóstico" → `/agendar`

**Footer**

- Línea de marca: "Automatización, software a medida y capacitación en IA para
  empresas en El Salvador."
- Columna Servicios: "Automatización y software", "Diagnóstico de IA",
  "Capacitación para equipos", "Cómo trabajamos"
- Columna Ai Labs: "Talleres y eventos", "Agendar un diagnóstico",
  "Escribinos por WhatsApp" `[opcional: solo si hay número de negocio]`
- Legal: "Términos", "Privacidad"
- Ubicación: "Hecho en San Salvador, El Salvador"
- Redes: LinkedIn, Instagram, TikTok, X (sin cambios)

**404**

- Título: "Esa página no existe"
- Cuerpo: "Volvé al inicio o agendá un diagnóstico."
- Botones: "Ir al inicio", "Agendar diagnóstico"

## Home `/`

- Meta title: "Ai Labs · Automatización, software e IA para empresas"
- Meta description: "Automatizaciones y software a medida con IA para empresas en El Salvador, y capacitación para los equipos que los operan. Agendá un diagnóstico de 30 minutos."

### Hero

- Eyebrow: "Ai Labs · San Salvador"
- H1: "Menos trabajo manual en tu empresa. Más control."
- H1 alternativa: "Automatizá tu operación con IA y software a medida."
- Lead: "Diseñamos e implementamos automatizaciones y software a medida para empresas en El Salvador, y preparamos a tu equipo para operarlos sin depender de nosotros."
- CTA primario: "Agendá un diagnóstico de 30 minutos" → `/agendar`
- CTA secundario: "Ver cómo trabajamos" → `#metodo`

### Programas de comunidad

Franja justo bajo el hero, con las marcas en halftone que ya existen. Es la
prueba principal del sitio y por eso va primero. Claude no es uno de esos programas: va
separado, como herramienta con la que trabajamos.

- Label: "Somos miembros de los programas de comunidad de"
- Marcas: SpaceXAI, OpenAI, Codex, Cognition, Cursor, Mistral, ElevenLabs, Notion. Cursor y Cognition necesitan marca nueva en `assets/logos` y `pnpm halftone:logos`.
- Separador: "y trabajamos con" + marca de Claude
- Cuerpo: "Ser miembros nos da línea directa con sus equipos, formación de su parte, acceso temprano a lo que viene y más criterio para guiar a quien las usa."
- Cifra, única: "Más de 60" / "eventos de IA desde 2025"

### Ofertas

- Label: "Qué hacemos"
- Título: "Tres formas de trabajar con nosotros"
- Intro: "Todas empiezan por un diagnóstico de 30 minutos."
- Tarjeta 1, título: "Automatización y software a medida"
- Tarjeta 1, línea: "Conectamos tus herramientas, automatizamos lo repetitivo y construimos lo que falta."
- Tarjeta 1, ejemplos: "Reportes, seguimiento comercial, cotizaciones, facturación, inventario."
- Tarjeta 1, link: "Ver cómo funciona" → `/automatizacion-ia-el-salvador`
- Tarjeta 2, título: "Diagnóstico de IA"
- Tarjeta 2, línea: "En una sesión revisamos tu proceso y elegimos por dónde empezar."
- Tarjeta 2, link: "Ver cómo funciona" → `/consultoria-de-ia-el-salvador`
- Tarjeta 3, título: "Capacitación para equipos"
- Tarjeta 3, línea: "De un Learning Day de cuatro horas a un bootcamp de varios días, sobre el trabajo real del equipo."
- Tarjeta 3, link: "Ver cómo funciona" → `/capacitacion-ia-el-salvador`

### Cómo trabajamos `#metodo`

- Label: "Cómo trabajamos"
- Título: "El proceso antes que la herramienta"
- Cuerpo: "Empezamos por entender cómo se hace el trabajo hoy. Después acordamos con vos el alcance y la cotización antes de tocar nada."
- Paso 1, título: "Entender"
- Paso 1, cuerpo: "Revisamos cómo se hace el trabajo hoy, quién participa y dónde se traba."
- Paso 2, título: "Priorizar"
- Paso 2, cuerpo: "Elegimos una mejora que valga la pena y acordamos el alcance."
- Paso 3, título: "Implementar"
- Paso 3, cuerpo: "Construimos, integramos y dejamos al equipo operando, con documentación."

### Preguntas

- Título: "Lo que suelen preguntarnos"
- P1: "¿Cuánto cuesta?"
- R1: "El diagnóstico de 30 minutos no tiene costo. Después te damos el alcance y la cotización antes de empezar."
- P2: "¿Mi equipo necesita saber programar?"
- R2: "No. Trabajamos con equipos de ventas, operaciones y administración. Lo que construimos se opera desde las herramientas que ya usan."
- P3: "¿Qué pasa con nuestros datos?"
- R3: "Tus datos se quedan en tus cuentas y herramientas. Antes de empezar acordamos por escrito qué información tocamos y qué no."
- P4: "¿Cuánto tarda?"
- R4: "El diagnóstico, 30 minutos. El resto depende del proceso y de las integraciones. En el diagnóstico te damos una estimación."
- P5: "¿Qué pasa cuando terminan?"
- R5: "Tu equipo queda operando, con documentación y acceso a todo lo que hicimos. Si querés, acordamos un soporte a la medida de la herramienta."

### Agenda

- Título: "Agendá un diagnóstico de 30 minutos"
- Cuerpo: "Contanos qué proceso te quita tiempo. Salís de la sesión con una recomendación concreta, la contrates o no."
- CTA primario: "Elegir fecha y hora" → `/agendar`
- CTA secundario: "Escribinos por WhatsApp" `[opcional: solo si hay número de negocio]`

## Automatización `/automatizacion-ia-el-salvador`

- Meta title: "Automatización con IA para empresas en El Salvador | Ai Labs"
- Meta description: "Automatización de procesos con IA y software a medida para empresas en El Salvador. Conectamos tus herramientas y construimos lo que falta, con revisión humana."
- Eyebrow: "Automatización y software a medida"
- H1: "Automatización con IA y software a medida"
- Lead: "Conectamos tus herramientas, automatizamos lo repetitivo y construimos el software que te falta. Con revisión humana y documentación."
- CTA: "Agendá un diagnóstico de 30 minutos"

### Para quién es

- Título: "Para quién es"
- Línea: "Equipos que copian información entre sistemas a mano."
- Línea: "Operaciones que necesitan velocidad sin perder control de las decisiones."
- Línea: "Empresas que quieren un sistema propio en vez de otra suscripción."

### Para quién no es

- Título: "Para quién no es"
- Línea: "Si buscás reemplazar al equipo en vez de mejorar cómo trabaja."
- Línea: "Si el proceso todavía no está claro. Ahí conviene empezar por el diagnóstico."

### Qué incluye

- Título: "Qué incluye"
- Ítem 1, título: "Encaje con el proceso"
- Ítem 1, cuerpo: "El flujo respeta las herramientas, los datos y las responsabilidades que ya existen."
- Ítem 2, título: "Integraciones"
- Ítem 2, cuerpo: "Conectamos lo que el equipo ya usa, del Excel y el correo a WhatsApp Business, para no copiar información a mano."
- Ítem 3, título: "Revisión humana"
- Ítem 3, cuerpo: "Definimos dónde la IA asiste, qué se automatiza y qué decisiones siguen en manos del equipo."
- Ítem 4, título: "Entrega y transferencia"
- Ítem 4, cuerpo: "Entregamos el flujo, las integraciones y la documentación para que el equipo pueda operarlo."

### Cómo lo hacemos

- Título: "Cómo lo hacemos"
- Paso 1, título: "Entender el proceso"
- Paso 1, cuerpo: "Mapeamos entradas, decisiones, fricción y el resultado esperado."
- Paso 2, título: "Diseñar la intervención"
- Paso 2, cuerpo: "Definimos qué asistir, qué automatizar y qué mantener humano."
- Paso 3, título: "Implementar y transferir"
- Paso 3, cuerpo: "Integramos, documentamos y dejamos al equipo listo para operar."

### Ejemplo

- Título: "Un proceso, antes y después"
- Cuerpo: `[caso real pendiente]`

### Preguntas

- Título: "Preguntas sobre automatización"
- P1: "¿Qué es la automatización de procesos con IA?"
- R1: "Es diseñar e implementar flujos y agentes de IA que conectan herramientas, datos y personas, y definir qué asiste la IA, qué se automatiza y qué decisiones siguen en manos del equipo."
- P2: "¿Automatización o software a medida?"
- R2: "Si tus herramientas ya tienen lo que necesitás y solo falta conectarlas, es automatización. Si falta una pieza que ninguna herramienta te da, la construimos."
- P3: "¿La IA reemplaza al equipo?"
- R3: "No. Diseñamos cada flujo con revisión humana donde hace falta. La IA asiste o automatiza pasos, y las decisiones importantes siguen en manos del equipo."
- P4: "¿Con qué herramientas se integra?"
- R4: "Partimos de lo que el equipo ya usa, como Excel, el correo, WhatsApp Business o sus sistemas. Definimos las integraciones después de entender el proceso."
- P5: "¿Cuánto cuesta automatizar un proceso?"
- R5: "Depende del proceso y de las integraciones. Después del diagnóstico te damos el alcance y la cotización antes de empezar."

### Agenda

- Título: "¿Qué proceso querés mejorar?"
- Cuerpo: "Contanos cómo funciona hoy y dónde se traba. Lo revisamos con vos en 30 minutos."
- CTA: "Agendá un diagnóstico"

## Consultoría `/consultoria-de-ia-el-salvador`

- Meta title: "Consultoría de IA en El Salvador | Ai Labs"
- Meta description: "Consultoría de IA en El Salvador: un diagnóstico de 30 minutos y una revisión de tu proceso con tu equipo para elegir una mejora que valga la pena."
- Eyebrow: "Diagnóstico de IA"
- H1: "Consultoría de IA en El Salvador"
- Lead: "Un diagnóstico de 30 minutos y después una revisión de tu proceso con tu equipo, para elegir una mejora que valga la pena."
- CTA: "Agendá un diagnóstico de 30 minutos"

### Para quién es

- Título: "Para quién es"
- Línea: "Dueños y gerentes que quieren usar IA y no saben por dónde empezar."
- Línea: "Equipos con un proceso que duele y varias ideas de cómo arreglarlo."
- Línea: "Empresas que ya probaron herramientas de IA y no les cambió nada."

### Para quién no es

- Título: "Para quién no es"
- Línea: "Si ya sabés exactamente qué construir, andá directo a automatización."
- Línea: "Si querés una charla general sobre IA, mirá nuestros talleres."

### Qué incluye

- Título: "Qué incluye"
- Ítem 1, título: "Diagnóstico de 30 minutos"
- Ítem 1, cuerpo: "Una videollamada sin costo, o una visita si estás cerca, para entender tu operación y decidir si tiene sentido seguir."
- Ítem 2, título: "Revisión del proceso"
- Ítem 2, cuerpo: "Una sesión con el equipo que hace el trabajo: mapeamos pasos, herramientas y dónde se traba."
- Ítem 3, título: "Priorización"
- Ítem 3, cuerpo: "Elegimos una mejora que valga la pena, definimos el alcance y te damos la cotización antes de empezar."
- Ítem 4, título: "Plan"
- Ítem 4, cuerpo: "Un documento corto con el proceso, la mejora elegida y los pasos para implementarla o capacitar al equipo."

### Cómo lo hacemos

- Título: "Cómo lo hacemos"
- Paso 1, título: "Entender"
- Paso 1, cuerpo: "Revisamos cómo se hace el trabajo hoy, quién participa y dónde se traba."
- Paso 2, título: "Priorizar"
- Paso 2, cuerpo: "Elegimos una mejora que valga la pena y acordamos el alcance."
- Paso 3, título: "Implementar"
- Paso 3, cuerpo: "Construimos el flujo o preparamos al equipo, con la documentación que necesita."

### Preguntas

- Título: "Preguntas sobre consultoría"
- P1: "¿Qué hace un consultor de IA?"
- R1: "Revisa cómo trabaja un equipo, encuentra dónde puede ayudar la IA y decide por dónde empezar. Después implementa la mejora o prepara al equipo para operarla."
- P2: "¿Cuánto cuesta una consultoría en IA?"
- R2: "El diagnóstico de 30 minutos no tiene costo. La revisión y el plan dependen del tamaño del proceso y los cotizamos antes de empezar."
- P3: "¿Nos ayudan a elegir ChatGPT, Claude u otra herramienta?"
- R3: "Sí. Elegimos la herramienta según tu proceso y tus datos, sea ChatGPT, Claude, Grok, Codex u otra, y te ayudamos a implementarla en el equipo."
- P4: "¿Qué recibo al final?"
- R4: "Un documento corto con el proceso mapeado, la mejora elegida, el alcance y la cotización. Es tuyo, lo implementes con nosotros o no."
- P5: "¿Trabajan solo en San Salvador?"
- R5: "No. Trabajamos con empresas de todo El Salvador y también fuera del país. El diagnóstico es por videollamada y las revisiones pueden ser presenciales si estás cerca."

### Agenda

- Título: "Empezá por el diagnóstico"
- Cuerpo: "Treinta minutos, sin costo. Salís con una recomendación concreta, la contrates o no."
- CTA: "Elegir fecha y hora"

## Capacitación `/capacitacion-ia-el-salvador`

- Meta title: "Capacitación en IA para empresas en El Salvador | Ai Labs"
- Meta description: "Capacitación y cursos de IA para empresas en El Salvador: Learning Day, Build Day y bootcamp para gerentes y equipos comerciales, sobre su propio trabajo."
- Eyebrow: "Capacitación para equipos"
- H1: "Capacitación en IA para empresas"
- Lead: "Learning Day, Build Day y bootcamp para que gerentes y equipos comerciales usen IA con criterio, sobre su propio trabajo."
- CTA: "Agendá una llamada"

### Formatos

El plan de cada formato, con público, duración y orden de lanzamiento, está en
`docs/narrativa-y-mapa.md`, sección 5.

- Título: "Formatos"
- Formato 1, título: "Learning Day"
- Formato 1, cuerpo: "Cuatro horas con tu equipo, sobre sus tareas reales. Se van con plantillas que usan al día siguiente."
- Formato 2, título: "Build Day"
- Formato 2, cuerpo: "Un día en cohorte abierta con otras empresas: llegás con un proceso y salís con un prototipo y un caso de negocio."
- Formato 3, título: "Bootcamp"
- Formato 3, cuerpo: "Dos días o más con tu equipo: el prototipo queda funcionando, integrado y documentado, y el equipo listo para operarlo."
- Formato 4, título: "Talleres públicos"
- Formato 4, cuerpo: "Sesiones abiertas en San Salvador para cualquier profesional. Son la forma más fácil de conocernos."
- Formato 4, link: "Ver próximos talleres" → `/events`

### Para quién es

- Título: "Para quién es"
- Línea: "Gerentes y equipos comerciales que quieren usar IA en su trabajo con criterio."
- Línea: "Equipos de operaciones y administración que necesitan una base común."
- Línea: "Direcciones que quieren decidir con información antes de invertir en IA."

### Para quién no es

- Título: "Para quién no es"
- Línea: "Si buscás formación en programación o investigación en IA."
- Línea: "Si buscás un certificado sin práctica sobre tu propio trabajo."

### Cómo se arma

- Título: "Cómo se arma"
- Paso 1, título: "Entender"
- Paso 1, cuerpo: "Revisamos qué hace el equipo, con qué herramientas y dónde pierde tiempo."
- Paso 2, título: "Practicar"
- Paso 2, cuerpo: "Trabajamos sobre casos reales del equipo, con ejercicios que se pueden repetir al día siguiente."
- Paso 3, título: "Operar"
- Paso 3, cuerpo: "Dejamos criterios de revisión y documentación para que la mejora se sostenga."

### Preguntas

- Título: "Preguntas sobre capacitación"
- P1: "¿Qué es una capacitación práctica en IA?"
- R1: "Enseña a usar la inteligencia artificial en las tareas reales de cada persona o equipo, con criterio para saber cuándo usarla, cómo revisar el resultado y cómo operarla."
- P2: "¿Necesito saber programar?"
- R2: "No. Pensamos la formación para perfiles de negocio y usamos lenguaje claro. Nos enfocamos en aplicar IA a tareas reales con criterio."
- P3: "¿Sirve si mi equipo no es técnico?"
- R3: "Sí. La mayoría de los equipos con los que trabajamos son de ventas, operaciones y administración. Practican con sus propias tareas."
- P4: "¿Cuánto cuesta?"
- R4: "Los talleres públicos muestran su precio en cada evento. Las capacitaciones para equipos dependen del formato y las cotizamos después de una llamada."
- P5: "¿Tienen cursos de IA abiertos, sin empresa?"
- R5: "Sí. Los talleres públicos son para cualquier profesional. Los próximos están en Eventos y los avisamos por WhatsApp."

### Agenda

- Título: "¿Querés preparar a tu equipo?"
- Cuerpo: "Contanos qué hace tu equipo y qué quiere mejorar. Lo vemos en una llamada de 30 minutos."
- CTA: "Agendá una llamada"

## Eventos `/events`

- Meta title: "Talleres y eventos de IA en San Salvador | Ai Labs"
- Meta description: "Talleres, cafés y meetups de IA en San Salvador organizados por Ai Labs. Publicamos los próximos en Luma y los avisamos en nuestra comunidad de WhatsApp."
- Label: "Eventos"
- H1: "Talleres y eventos de IA en San Salvador"
- Intro: "Desde 2025 organizamos talleres, cafés y meetups de IA. Los próximos están en Luma y los avisamos por WhatsApp."
- Pista 1, título: "Para equipos y líderes"
- Pista 1, cuerpo: "Desayunos ejecutivos, masterclasses y demo days donde ves automatizaciones funcionando."
- Pista 2, título: "Para builders"
- Pista 2, cuerpo: "Labs, meetups y hackathons con las herramientas que usamos a diario."
- Próximos: "Próximos"
- Anteriores: "Anteriores"
- Vacío: "No hay un evento próximo. Avisamos el siguiente por WhatsApp."
- Luma: "Ver en Luma"
- Comunidad, título: "Comunidad de WhatsApp"
- Comunidad, cuerpo: "Ahí avisamos cada taller antes que en redes. Entrar es gratis."
- Comunidad, CTA: "Unirme en WhatsApp"
- Comunidad, nota: "Se abre WhatsApp y puede pedir aprobación."
- Puente, título: "¿Querés esto adentro de tu empresa?"
- Puente, CTA: "Agendá un diagnóstico de 30 minutos"
- Fotos, crédito: "Fotos de nuestros eventos en San Salvador."

## Comunidad `/community`

El hero del home con su propio copy. El grupo de WhatsApp es la acción
principal (`COMMUNITY_WHATSAPP_URL`); no aparece en el header.

- Meta title: "Comunidad de IA en WhatsApp | Ai Labs"
- Meta description: "Nuestra comunidad de IA en El Salvador es un grupo de WhatsApp. Ahí avisamos los talleres y meetups antes de publicarlos en redes, y entrar es gratis."
- Label: "Comunidad"
- H1: "Aprendé IA con la comunidad de Ai Labs"
- Lead: "Un grupo de WhatsApp donde avisamos los talleres y meetups antes de publicarlos en redes. Entrar es gratis."
- CTA: "Unirme en WhatsApp"
- Link: "Ver eventos" → `/events`
- Nota: "Se abre WhatsApp y puede pedir aprobación."

## Agendar `/agendar`

- Meta title: "Agendá un diagnóstico de 30 minutos | Ai Labs"
- Meta description: "Elegí fecha y hora para un diagnóstico de 30 minutos con Ai Labs. Contanos qué proceso te quita tiempo y salís con una recomendación concreta."
- Label: "Agenda"
- H1: "Agendá un diagnóstico de 30 minutos"
- Lead: "Contanos qué proceso te quita tiempo. Salís de la sesión con una recomendación concreta, la contrates o no."
- Paso 1, título: "Elegí fecha y hora"
- Paso 1, cuerpo: "Treinta minutos por videollamada, en el horario que te quede mejor."
- Paso 2, título: "Contanos tu proceso"
- Paso 2, cuerpo: "Dos preguntas al reservar: de qué querés hablar y tu empresa."
- Paso 3, título: "Nos vemos"
- Paso 3, cuerpo: "Te mandamos la invitación al correo con el enlace."
- Alternativa, título: "¿Preferís escribir?"
- Alternativa, CTA: "Escribinos por WhatsApp" `[opcional: solo si hay número de negocio]`
- Agenda propia sobre cal.com `walter-ailabs/diagnostico` (`BOOKING_CAL_LINK`), un solo evento para las tres ofertas: los horarios salen de la API pública de cal.com y la reserva vuelve a ella, que manda la invitación. No hay iframe ni se guarda nada en el sitio. Pregunta de tema "¿Sobre qué querés hablar?" con opciones Automatizar un proceso o construir software / Consultoría: saber por dónde empezar con IA / Capacitar a mi equipo / Todavía no sé (cal.com guarda el texto en español); `?tema=automatizacion|consultoria|capacitacion` desde cada página de servicio la deja elegida.
- Agenda, columna del evento: "Diagnóstico de IA", "30 minutos", "Google Meet" y la zona horaria del visitante ("El Salvador (GMT-6)"); al elegir horario suma la fecha y la hora elegidas.
- Agenda, calendario: "Mes anterior", "Mes siguiente", "Horarios disponibles" (hasta elegir un día), "Elegí un día para ver los horarios.", "No hay horarios este mes. Probá con el siguiente.", selector "12 h" / "24 h"
- Agenda, estados: "Cargando horarios", "No pudimos cargar la agenda." con "Intentar de nuevo"
- Agenda, formulario: "Cambiar horario", "Tu nombre", "Tu correo", "Tu empresa", "¿Sobre qué querés hablar?", "¿Qué proceso te quita tiempo? (opcional)", "Dos líneas alcanzan."
- Agenda, envío: "Confirmar diagnóstico", "Reservando"; errores "Ese horario ya no está disponible. Elegí otro." y "No pudimos reservar. Probá de nuevo en un momento."
- Agenda, confirmación: "Listo, te esperamos", "Te mandamos la invitación con el enlace de la videollamada a {correo}.", "Ver o cambiar la reserva"

## Legal

`/privacy` y `/terms` se reescriben aparte: sin cuentas, sin base de datos y
sin analíticas. El único dato que sale del sitio es la reserva en cal.com.
