# Ai Labs — narrativa y mapa del sitio

Borrador de trabajo, 1 nov 2026. Es la base para reescribir copy, secciones y
el nuevo AGENTS.md. Todo lo marcado `[confirmar]` depende de Walter: precios,
tiempos, políticas y números públicos. No publicar nada marcado sin confirmarlo.

## 1. Target (fijado el 1 nov 2026)

**Compradora principal: la persona que decide en una empresa de El Salvador.**
Dueño, gerente general, gerente de operaciones, comercial o de finanzas, en una
empresa de 20 a 300 personas. Sus procesos viven en WhatsApp, Excel, correo y un
sistema que no habla con otro.

- **Su lenguaje:** perder tiempo, control, reportes, clientes que se caen,
  sistema, "lo hacemos a mano". Nunca "flujos agénticos" ni "IA generativa".
- **Sus objeciones:** cuánto cuesta, mi equipo no lo va a usar, quedo atado al
  proveedor, la IA es humo, qué pasa con mis datos.
- **Lo que la convence:** ver que somos embajadores de las herramientas que
  usamos, una sesión de diagnóstico sin compromiso, un antes y después visible
  de un proceso, lenguaje llano y una cotización antes de empezar. Conocer a
  las personas detrás pesa poco.
- **Tres necesidades, una compradora:** automatización y software a medida,
  diagnóstico de dónde aplicar IA, capacitación de su equipo gerencial o
  comercial.

**Embudo, no target:** profesionales que aprenden con nosotros en talleres,
cafés y meetups. Son la audiencia de hoy y entre ellos están los líderes. En el
sitio les toca la página de eventos, el WhatsApp y el calendario. No son el
lector del home.

**Futuro, fuera de la narrativa:** un bootcamp de carrera para devs que buscan
mejor empleo y estudiantes a precio bajo. Tendrá su propia landing cuando
exista el producto. Es distinto del bootcamp para equipos, que sí es un formato
de capacitación dentro de la oferta.

## 2. Promesa y voz

**Promesa:** que tu operación deje de depender de trabajo manual. Diseñamos e
implementamos automatizaciones y software a medida, y preparamos a tu equipo
para operarlos.

**Voz:** primera persona plural, voseo, directa, sin hype. Un solo vocabulario
en todo el sitio: consultoría, automatización, software a medida, capacitación,
talleres y eventos. Academy, Agentic y Aperture no aparecen. Learning Day,
Build Day, Bootcamp y Masterclass sí: son nombres de formato que la gente de
negocios ya usa, no marcas que haya que explicar, y cada uno lleva su
descripción al lado.

Reglas de redacción que se mantienen aunque AGENTS.md cambie:

- Nunca en tercera persona ("Ai Labs hace…").
- Nada defensivo: no explicamos qué no somos. El descargo de la Agencia Nacional
  desaparece.
- Un nombre de lugar por bloque, no por oración.
- Sin "no X sino Y" por costumbre, sin tríadas por regla, sin títulos con punto
  final.
- Ninguna métrica, logo o programa sin verificar.

## 3. Sitemap

### Queda

| Ruta                             | Rol                                            | Lector     |
| -------------------------------- | ---------------------------------------------- | ---------- |
| `/`                              | Home: promesa, ofertas, método, prueba, agenda | Compradora |
| `/automatizacion-ia-el-salvador` | Automatización y software a medida             | Compradora |
| `/consultoria-de-ia-el-salvador` | Diagnóstico de IA (la puerta de entrada)       | Compradora |
| `/capacitacion-ia-el-salvador`   | Capacitación en IA para equipos                | Compradora |
| `/events`                        | Talleres y eventos, el embudo, con WhatsApp    | Audiencia  |
| `/agendar`                       | Reserva del diagnóstico embebida más WhatsApp  | Todos      |
| `/privacy`, `/terms`             | Legal, reescrito sin base de datos ni cuentas  | Todos      |
| `/en/*`                          | Mismas páginas en inglés, se traducen al final | Todos      |

### Se va

`/redeem`, `/campus-leader`, `/community`, `/lab`, `/sign-in`, `/sign-up`, los
microsites `/events/modo-fundador` y `/events/get-competitive-quick`, los
webhooks de Clerk y Wompi, y todo `src/server` menos lo que necesite la agenda.

### Redirecciones 301

| De                                                         | A         |
| ---------------------------------------------------------- | --------- |
| `/community`, `/aperture`, `/aperture/join`, `/me`, `/u/*` | `/events` |
| `/campus-leader`                                           | `/events` |
| `/events/modo-fundador`, `/events/get-competitive-quick`   | `/events` |
| `/redeem`, `/sign-in`, `/sign-up`                          | `/`       |
| alias de consultoría y país                                | como hoy  |

## 4. Home, sección por sección

Seis secciones: hero, embajadores, ofertas, cómo trabajamos, preguntas y
agenda. La prueba principal son los programas de embajadores y va justo bajo
el hero, como hoy, con copy corregido. No hay sección de problema ni bloque de
equipo: la situación de la compradora se resuelve en el H1 y en los ejemplos
de la primera tarjeta.

### 4.1 Hero

- **H1, tres opciones:**
  - A. "Menos trabajo manual en tu empresa. Más control." Resultado primero;
    el title lleva el SEO.
  - B. "Automatizá tu operación con IA y software a medida." Nombra la oferta y
    el objeto de la compradora.
  - C. "Software, automatización e IA para empresas en El Salvador." La más
    segura para SEO y la más floja como mensaje.
  - Recomendación: A en el hero, B como respaldo. Máximo 55 caracteres.
- **Lead:** "Diseñamos e implementamos automatizaciones y software a medida para
  empresas en El Salvador, y preparamos a tu equipo para operarlos sin depender
  de nosotros." Máximo 160 caracteres.
- **CTA primario:** "Agendá un diagnóstico de 30 minutos" → `/agendar`.
- **CTA secundario:** "Ver cómo trabajamos" → `#metodo`.
- **Visual:** la marca en halftone como hoy. Sin descargo, sin tercer párrafo.

### 4.2 Embajadores

La franja de marcas en halftone que ya existe, con tres cambios: el label dice
"Embajadores de" y lista los ocho programas vigentes: SpaceXAI, OpenAI, Codex,
Cognition, Cursor, Mistral, ElevenLabs y Notion (Cursor y Cognition necesitan
marca nueva en `assets/logos`); Claude va separado tras "y trabajamos con",
porque no somos embajadores de Claude; y debajo una sola oración de qué nos da
ser embajadores (línea directa con sus equipos, formación, acceso temprano y
más criterio para guiar) más una sola cifra: más de 60 eventos desde 2025, que
es la única honesta. No se publica "personas formadas", porque
muchos eventos son charlas o networking, ni "empresas representadas", porque
solo serían correos de asistentes. Tampoco nombres de empresas sin permiso.

### 4.3 Ofertas

Bento de tres tarjetas: título, una línea, un link. Celdas de halftone en lugar
de fotos. Una línea de intro arriba, "Todas empiezan por un diagnóstico de 30
minutos", y la primera tarjeta lleva una fila de ejemplos de procesos
`[confirmar]` para que lo concreto viva ahí y no en una sección aparte.

| Tarjeta                            | Línea                                                                                              | Link                             |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------- |
| Automatización y software a medida | Conectamos tus herramientas, automatizamos lo repetitivo y construimos lo que falta.               | `/automatizacion-ia-el-salvador` |
| Diagnóstico de IA                  | En una sesión revisamos tu proceso y elegimos por dónde empezar.                                   | `/consultoria-de-ia-el-salvador` |
| Capacitación para equipos          | De un Learning Day de cuatro horas a un bootcamp de varios días, sobre el trabajo real del equipo. | `/capacitacion-ia-el-salvador`   |

### 4.4 Cómo trabajamos

Se conserva el método actual, es el mejor copy del sitio: Entender, Priorizar,
Implementar. Tres pasos, una línea cada uno. El tercero cambia de "Poner en
práctica" a "Implementar" porque ahora la salida principal es software.

### 4.5 Preguntas, máximo cinco

1. ¿Cuánto cuesta? El diagnóstico es gratis; después, alcance y cotización.
   No se promete "precio cerrado" ni se publican tarifas.
2. ¿Mi equipo necesita saber programar? No.
3. ¿Qué pasa con nuestros datos? Se quedan en sus cuentas; acordamos por
   escrito qué tocamos.
4. ¿Cuánto tarda? Sin rangos públicos: depende del proceso, estimación en el
   diagnóstico.
5. ¿Qué pasa cuando terminan? Documentación, transferencia, el equipo opera;
   soporte a la medida de la herramienta, no un paquete.

Respuestas de 220 caracteres o menos. El JSON-LD de FAQ se mantiene mientras
refleje lo visible; no da rich results para este tipo de sitio.

### 4.6 Agenda

Banda final: "Agendá un diagnóstico de 30 minutos", reserva embebida o botón a
`/agendar`, y WhatsApp al lado. Sin formulario propio.

## 5. Páginas de servicio

Plantilla compartida, en este orden: hero, para quién es y no es, qué incluye,
cómo se hace, un ejemplo, preguntas, agenda. Desaparecen los párrafos "claims"
y la banda morada de definición; la definición pasa a ser la primera pregunta.

| Página         | H1                                          | Lead                                                                                                                                    | Primera pregunta (SEO)                          |
| -------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Automatización | "Automatización con IA y software a medida" | "Conectamos tus herramientas, automatizamos lo repetitivo y construimos el software que te falta. Con revisión humana y documentación." | "¿Qué es la automatización de procesos con IA?" |
| Consultoría    | "Consultoría de IA en El Salvador"          | "Un diagnóstico de 30 minutos y después una revisión de tu proceso con tu equipo, para elegir una mejora que valga la pena."            | "¿Qué hace un consultor de IA?"                 |
| Capacitación   | "Capacitación en IA para equipos"           | "Learning Day, Build Day y bootcamp para que gerentes y equipos comerciales usen IA con criterio, sobre su propio trabajo."             | "¿Qué es una capacitación práctica en IA?"      |

### Plan de formatos de capacitación

Formatos elegidos por Walter el 1 nov 2026, después de revisar lo que hacen
otros proveedores (`docs/formatos-referencia.md`). La escalera para la
compradora: aprender en cuatro horas, prototipar en un día, dejarlo
funcionando en dos o más.

| Formato           | Para quién                                                                              | Duración                                           | Salida                                                                    | Cómo se cobra     |
| ----------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------- | ----------------- |
| Learning Day      | Un equipo de ventas, operaciones o administración, 8 a 20 personas, con su jefe directo | 4 horas, in-company                                | Plantillas y criterios que usan al día siguiente                          | Por sesión        |
| Build Day         | Cohorte abierta multiempresa, de 1 a 3 dueños de proceso por empresa                    | 1 día: descubrir dos horas, construir cuatro, demo | Un prototipo y un caso de negocio por equipo                              | Por cupo          |
| Bootcamp          | Un solo equipo, 8 a 20 personas                                                         | 2 días o más, in-company                           | El prototipo funcionando, integrado y documentado, y el equipo operándolo | Por sesión        |
| Talleres públicos | Profesionales por su cuenta                                                             | 2 a 3 horas                                        | La puerta de entrada; ya corren en Luma                                   | Por cupo, en Luma |

Descartados a propósito: Semana de IA (una hora al día por cinco días),
Seguimiento de cuatro semanas y Referentes internos. Si un cliente pide un
diplomado, se encadenan bootcamps. El desayuno ejecutivo y la masterclass no
están aquí porque no forman a nadie: son captación y viven en `/events`,
sección 6.

Qué apoya esto en los datos de Luma: los talleres prácticos promedian 62
aprobados y 52 % de llegada, de sobra para una sesión in-company de un solo
equipo; los hackathons y buildathons de día completo llegan al 66 % y el
sábado concentra la demanda con 64 %, que es la forma del Build Day y del
bootcamp. Duraciones y tamaños son propuesta, no dato. Precios: no se
publican `[definir tarifas internas]`. Los talleres públicos enlazan a
`/events`.

Dos prácticas tomadas de otros proveedores, pendientes de confirmar antes de
ponerlas en copy: diez preguntas antes del Learning Day y un reporte de una
página al comprador al terminar; y que el jefe directo participe con sus
propias tareas, porque es quien sostiene el cambio.

## 6. Eventos

- **H1:** "Talleres y eventos de IA en San Salvador".
- **Dos pistas:** para equipos y líderes (café, desayuno, demo day de
  automatizaciones) y para builders (labs, meetups, hackathons). Los datos de
  Luma apoyan las dos: café llega al 70 %, demo day al 93 %, los líderes tienen
  la mejor recencia.
- **Desayuno ejecutivo, el evento de captación para la compradora:** dos
  horas con dirección y gerencia, 6 a 12 personas, en su oficina o un café;
  qué puede hacer la IA en su operación y qué no, y termina con diagnósticos
  agendados. Gratis o de bajo costo. No es formación, por eso no está en
  capacitación. Los datos de Luma lo respaldan: el café es el formato con
  mejor llegada, 70 %, y los líderes el segmento con mejor recencia, así que
  es el evento más probable de llenar.
- **Masterclass:** 90 minutos, un solo tema, sin límite de asistentes. Para
  una gremial, una cámara o la reunión general de una empresa grande. Se
  cobra fijo por sesión cuando es a puerta cerrada; abierta, es captación.
- El listado de Luma queda como hoy. El WhatsApp de la comunidad vive aquí.
- Puente a la compradora, una línea: "Si querés esto adentro de tu empresa,
  agendá un diagnóstico."
- Las fotos de eventos solo se usan en esta página.

## 7. Prueba y fotos

- El sistema visual es tipográfico y de puntos, no depende de fotos. Los slots
  de foto pasan a ser opcionales.
- Para servicios, la imagen que convence es el artefacto: mapa de proceso,
  antes y después, documento de entrega, diagrama de integraciones. Se dibujan
  en halftone.
- No hay bloque de equipo ni retratos. Las fotos reales, si las hay, van en
  capacitación y en eventos. Las elige Walter.
- El antes y después de un proceso real vive en la página de automatización,
  no en el home `[elegir el caso]`.
- Nada de imaginería genérica de IA.

## 8. SEO: ranuras y queries

Cada página tiene cuatro ranuras para SEO: title, meta, H1 y la primera
pregunta. Todo lo demás se escribe para la compradora.

| Página         | Title                                                           | Query que conserva                                 |
| -------------- | --------------------------------------------------------------- | -------------------------------------------------- |
| Home           | "Ai Labs · Automatización, software e IA para empresas"         | marca                                              |
| Automatización | "Automatización con IA para empresas en El Salvador \| Ai Labs" | automatización con IA para empresas en El Salvador |
| Consultoría    | "Consultoría de IA en El Salvador \| Ai Labs"                   | consultoría de IA en El Salvador                   |
| Capacitación   | "Capacitación en IA para equipos en El Salvador \| Ai Labs"     | cursos de IA en El Salvador                        |
| Eventos        | "Talleres y eventos de IA en San Salvador \| Ai Labs"           | eventos de IA en El Salvador                       |

- El home deja de competir con consultoría: su title pasa a marca más ofertas.
- Se suelta a propósito la query "agencia de inteligencia artificial en El
  Salvador": apunta a la entidad pública y costaba el hero.
- Las preguntas con forma de búsqueda se reducen a la primera de cada página.
- `src/content/first-place-queries.test.ts` y los otros cinco tests de copy se
  reescriben con estas ranuras. El riesgo se evalúa página por página al
  tocarla, como pidió Walter.
- `public/llms.txt` se reescribe en tercera persona, corto, desde este mapa.

## 9. Presupuestos de longitud

| Elemento             | Máximo                         |
| -------------------- | ------------------------------ |
| H1                   | 55 caracteres                  |
| Lead                 | 160 caracteres                 |
| Título de sección    | 40 caracteres, sin punto final |
| Línea de tarjeta     | 120 caracteres                 |
| Respuesta de FAQ     | 220 caracteres                 |
| Preguntas por página | 5                              |

`scripts/copy-length.ts` se ajusta a esta tabla y mantiene la paridad entre
hermanos.

## 10. Contacto y agenda

- Reserva con cal.com embebido: gratis, sincroniza con Google Calendar y admite
  preguntas al reservar. Un solo evento, `walter-ailabs/diagnostico`
  (`BOOKING_CAL_LINK`), para las tres ofertas; el embed sigue el tema claro u
  oscuro del sitio y el morado.
- Preguntas en la reserva: nombre, correo, "¿Sobre qué querés hablar?"
  (automatizar o construir software, consultoría, capacitar al equipo, todavía
  no sé), empresa, y una nota opcional sobre el proceso. Cada página de
  servicio manda `?tema=automatizacion|consultoria|capacitacion` y la pregunta
  llega elegida.
- El diagnóstico es por videollamada, o presencial si la ubicación lo permite.
- WhatsApp como segundo canal solo si existe un número de negocio; el botón es
  opcional y no se muestra sin número.
- El sitio queda estático: sin server functions, sin base de datos, sin
  variables de entorno de datos.

## 11. Pendientes que solo Walter responde

Resueltos el 1 nov 2026: diagnóstico gratis por videollamada o presencial;
sin precio cerrado ni rangos de tiempo públicos; soporte a la medida; ocho
programas de embajadores confirmados y qué implican; más de 60 eventos; sin
límite geográfico; cal.com; `/community` redirige a `/events`; sin analíticas.

Siguen abiertos:

- Tarifas internas de Learning Day, Bootcamp y Masterclass por sesión, y del
  Build Day por cupo, para cotizar.
- Marcas de Cursor y Cognition en `assets/logos`, en un solo color.
- Si existe un número de WhatsApp de negocio para el botón secundario.
- El caso real de antes y después para la página de automatización.
- Las fotos, si las hay, para capacitación y eventos.

## 12. Orden de ejecución

1. Aprobar este mapa y cerrar los `[confirmar]` que bloqueen copy.
2. Poda técnica en su propio PR: Clerk, Prisma, rutas, scripts, dependencias,
   redirects, legal.
3. Copy en español, tipos y componentes, en un segundo PR.
4. Tests, `llms.txt`, JSON-LD y `pnpm copy:check`.
5. AGENTS.md nuevo y corto, escrito desde este mapa.
6. Inglés al final.
