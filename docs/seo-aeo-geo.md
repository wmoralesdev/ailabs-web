# SEO, AEO y GEO: estado, medición y presencia fuera del sitio

Documento de trabajo, 9 nov 2026. Reúne lo que no vive en el código: qué se
auditó, cómo medir si los motores de respuesta nos nombran, el texto de la
marca para perfiles y directorios, y dónde conviene estar listados. Las
consultas por página siguen en `docs/narrativa-y-mapa.md`, sección 8.

## 1. Estado del sitio publicado (auditado el 9 nov 2026)

Bien resuelto, no tocar:

- Todas las páginas responden 200 en 0,2 a 0,8 s, con el texto en el HTML.
- Un `title`, una meta descripción, un canonical propio y un H1 por página.
  `hreflang` recíproco. `ailabs.sv` y `http://` redirigen con 308 a
  `https://www.ailabs.sv`. `/es/*` redirige con 301.
- `/privacy` y `/terms` llevan `noindex` y están fuera del sitemap.
- Todas las imágenes tienen `alt`.

Corregido en esta rama:

| Hallazgo | Cambio |
| --- | --- |
| Al buscar «Ai Labs El Salvador» los resultados hablan del laboratorio nacional de IA, no de la empresa | `Organization` ahora publica `alternateName`, `disambiguatingDescription` («Empresa privada de San Salvador…»), `knowsAbout`, `knowsLanguage` y la acción de reservar el diagnóstico. `llms.txt` abre con una ficha de la entidad |
| Los `Service` no decían de qué tipo son ni cómo se contratan | `serviceType`, una oferta de precio 0 para el diagnóstico y `ReserveAction` hacia `/agendar?tema=…` |
| `/agendar` y `/community` no tenían datos estructurados | `WebPage` y `BreadcrumbList`; `/agendar` declara la reserva |
| ChatGPT es la búsqueda más grande y capacitación no lo nombraba | La pregunta 3 pasa a «¿Enseñan a usar ChatGPT en el trabajo?» y absorbe la de equipos no técnicos, que repetía la pregunta 2 |
| `robots.txt` nombraba solo a parte de los crawlers de respuesta | Suma `Claude-SearchBot`, `Claude-User`, `Perplexity-User`, `Bingbot`, `Applebot`, `Applebot-Extended`, `DuckAssistBot` y `MistralAI-User` |
| El 404 publicaba un título viejo («Consultoría en IA, automatización y formación práctica») | Usa el título y la descripción del home |

Abierto, de menor prioridad:

- `/events/` (con barra final) redirige con 307 y debería ser 308. Lo hace
  el router; no afecta mientras nadie enlace esa forma.
- Las rutas no distinguen mayúsculas (`/EN`, `/Events` responden 200). El
  canonical apunta a la URL correcta, así que no duplica.
- Las páginas de servicio tienen unas 400 palabras. Ampliarlas con relleno
  no ayuda; lo que falta es el caso real (sección 5).

## 2. Medición GEO

Se corre desde El Salvador, en una ventana de incógnito y sin sesión, una
vez al mes. Cada pregunta se hace tal cual, una por conversación nueva.

**Motores:** ChatGPT con búsqueda, Perplexity, Gemini, Google (AI Overview y
Modo IA) y Copilot.

**Preguntas.** Usan «IA» y «ChatGPT» porque así busca la gente en El
Salvador («IA» se busca de 10 a 15 veces más que «inteligencia artificial»).

Marca, para saber si nos confunden con otra entidad:

1. ¿Qué es Ai Labs en El Salvador?
2. ¿Qué servicios ofrece ailabs.sv?
3. ¿Ai Labs de El Salvador es una empresa privada o del gobierno?

Categoría, para saber si nos nombran sin pedirlo:

4. ¿Qué empresas de IA hay en El Salvador?
5. ¿Quién ofrece consultoría de IA en El Salvador?
6. ¿Qué empresa puede automatizar procesos con IA en El Salvador?
7. ¿Quién da capacitación de IA para empresas en El Salvador?
8. ¿Dónde hay cursos de ChatGPT para empresas en El Salvador?
9. ¿Quién puede implementar ChatGPT en mi empresa en El Salvador?
10. ¿Quién construye agentes de IA para empresas en El Salvador?
11. ¿Qué eventos de IA hay en San Salvador este mes?
12. ¿Hay alguna comunidad de IA en El Salvador?

Problema, como pregunta la compradora que todavía no sabe que busca un proveedor:

13. Tengo una empresa en El Salvador y pierdo mucho tiempo pasando datos de
    Excel a mano. ¿Quién me puede ayudar a automatizarlo?
14. Quiero que mi equipo de ventas aprenda a usar ChatGPT. ¿A quién contrato
    en San Salvador?
15. ¿Cuánto cuesta una consultoría de IA en El Salvador?

**Registro.** Una fila por pregunta y motor:

| Fecha | Motor | Pregunta | ¿Nombra a Ai Labs? (no / sí / primero) | ¿Dice algo incorrecto? | Competidores que nombra | URLs que cita |
| --- | --- | --- | --- | --- | --- | --- |

**Cómo leerlo:**

- Si en las preguntas 1 a 3 responde sobre el laboratorio nacional o la
  agencia estatal, el problema es de entidad: pesan más el Business Profile,
  LinkedIn y los directorios que cualquier cambio de copy.
- Las URLs citadas en las preguntas 4 a 10 son la lista de sitios donde hay
  que aparecer. Reemplazan a la sección 4 en cuanto haya datos reales.
- Una afirmación incorrecta (precios, clientes, rankings) se corrige en la
  página que el motor citó, o en `llms.txt` si no citó ninguna.

## 3. Texto único de la marca

El mismo texto en Google Business Profile, LinkedIn, X, Instagram, TikTok y
cada directorio. Los motores cruzan estas fuentes: nombre, ciudad y
descripción deben coincidir letra por letra.

**Datos fijos**

- Nombre: Ai Labs (nunca «AI Labs», «AILabs» ni «Ai Labs SV»)
- Sitio: https://www.ailabs.sv
- Ciudad: San Salvador, El Salvador
- Categoría principal: Consultor de TI o empresa de software, la más cercana
  que ofrezca cada plataforma. Secundarias: centro de formación, consultoría
  de gestión.
- Reservas: https://www.ailabs.sv/agendar

**Una línea (hasta 160 caracteres)**

> Automatización con IA, software a medida y capacitación en IA para empresas en El Salvador. Diagnóstico de 30 minutos sin costo.

**Corto (hasta 300 caracteres, para biografías)**

> Ai Labs es una empresa privada de San Salvador. Diseñamos e implementamos automatizaciones con IA y software a medida para empresas, y capacitamos a sus equipos sobre su propio trabajo. Todo empieza con un diagnóstico de 30 minutos sin costo.

**Largo (hasta 750 caracteres, para Business Profile y directorios)**

> Ai Labs es una empresa privada de San Salvador, El Salvador. Diseñamos e implementamos automatizaciones con IA, agentes de IA y software a medida para empresas: conectamos las herramientas que el equipo ya usa, como Excel, el correo o WhatsApp Business, y construimos lo que falta, con revisión humana y documentación. También hacemos consultoría de IA, que incluye elegir e implementar herramientas como ChatGPT o Claude, y capacitación en IA para equipos de ventas, operaciones y administración. Cada proyecto empieza con un diagnóstico de 30 minutos sin costo, por videollamada o presencial. Desde 2025 organizamos más de 60 talleres y eventos de IA. Trabajamos con empresas de todo El Salvador y de fuera del país.

**English, short**

> Ai Labs is a private company in San Salvador, El Salvador. We design and build AI automations and custom software for companies, and train their teams on their own work. Every engagement starts with a free 30-minute diagnostic.

No se agrega a ninguno: precios, nombres de clientes, cifras de personas
formadas, «líderes», «los primeros» ni «#1».

## 4. Dónde conviene estar listados

Búsqueda del 9 nov 2026 desde un buscador de Estados Unidos, no desde las
respuestas de los motores. Es el punto de partida; la medición de la sección
2 dirá cuáles citan de verdad. Para «mejores empresas de IA en El Salvador»
no existe una lista editorial: los resultados son notas de prensa y
directorios, y ninguno nombra a Ai Labs.

Directorios de proveedores, por orden de esfuerzo y retorno:

| Sitio | Qué hay hoy | Acción |
| --- | --- | --- |
| Google Business Profile | Sin perfil | Crearlo como empresa con área de servicio. Es la fuente principal de Gemini y de AI Overviews para consultas locales |
| LinkedIn (página de empresa) | Existe | Pegar el texto corto, completar sitio, ciudad y especialidades |
| TechBehemoths, IA en El Salvador | Solo 2 empresas listadas | Perfil gratuito; con tan pocas, aparecer es casi seguro |
| Clutch, IA en El Salvador | 12 empresas | Perfil gratuito. Pesa cuando tiene reseñas verificadas de clientes |
| GoodFirms, DesignRush, Sortlist, SuperbCompanies | Listados por país | Perfil gratuito con el mismo texto |
| Bing Places | Sin perfil | Se importa desde Business Profile. Alimenta a Copilot y a ChatGPT |

Gremiales y prensa, que son lo que más citan los motores para El Salvador:

- CAMARASAL y CasaTIC: directorio de socios y eventos de IA para pymes.
- Diario El Mundo, elsalvador.com («Voces de emprendimiento»), DPL News,
  Revista E&N, Revista Summa y dinero.com.sv publican las notas que hoy
  salen para estas búsquedas. Una nota sobre los más de 60 eventos o sobre un
  caso real vale más que cualquier directorio.
- Luma: cada evento ya es una página indexable que enlaza a Ai Labs.

Empresas que hoy salen nombradas para estas búsquedas: Elaniin,
Bridge4Digital, Izalco DATA, TH3Labs, DATUM, Verita, Web Unify y Zarego.

## 5. Pendientes, en orden

Del dueño:

1. Crear el Google Business Profile con el texto de la sección 3.
2. Correr la medición de la sección 2 y guardar la tabla.
3. Conseguir uno o dos casos reales publicables. Es lo que más mueve GEO: da
   a los motores algo concreto que citar y llena el bloque de ejemplo que la
   página de automatización ya tiene previsto.
4. Crear los perfiles de TechBehemoths y Clutch.
5. Confirmar que en capacitación se practica con ChatGPT y Claude, que es lo
   que ahora dice la pregunta 3 de esa página.
6. Hacia el 30 nov, exportar Search Console (Rendimiento, Resultados de
   búsqueda, Exportar) y decidir si capacitación dice «para equipos» o «para
   empresas».
7. Pasar la lista de las 13 consultas que ya se siguen.

Del agente, cuando haya datos:

1. Rehacer prioridades con Search Console y con la tabla de la medición.
2. Publicar el caso real en la página de automatización, en `llms.txt` y
   como `Article` o `CreativeWork` en los datos estructurados.
