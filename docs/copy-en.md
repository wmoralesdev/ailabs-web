# Ai Labs: English copy

Draft from Nov 1, 2026, written from `docs/narrativa-y-mapa.md`. It is the
English counterpart of the text that goes into `src/content/es.ts` and
`service-pages-es.ts` when the technical pruning lands. Walter's answers from
Nov 1, 2026 are already applied; what follows in brackets is the only thing
pending. Budgets: H1 55, lead 160, section title 40,
card line 120, answer 220, five questions per page.

## Chrome

**Header**

- Servicios (desplegable): "Automation and software", "AI diagnostic",
  "Training for teams"
- "Events"
- Botón: "Book a diagnostic" → `/agendar`

**Footer**

- Línea de marca: "Automation, custom software and AI training for companies
  in El Salvador."
- Columna Servicios: "Automation and software", "AI diagnostic",
  "Training for teams", "How we work"
- Columna Ai Labs: "Workshops and events", "Book a diagnostic",
  "Message us on WhatsApp" `[optional: only if there is a business number]`
- Legal: "Terms", "Privacy"
- Ubicación: "Made in San Salvador, El Salvador"
- Redes: LinkedIn, Instagram, TikTok, X (unchanged)

**404**

- Título: "That page doesn't exist"
- Cuerpo: "Go back to the home page or book a diagnostic."
- Botones: "Go to home", "Book a diagnostic"

## Home `/`

- Meta title: "Ai Labs · Automation, software and AI for companies"
- Meta description: "AI automation and custom software for companies in El Salvador, and training for the teams that run them. Book a 30-minute diagnostic."

### Hero

- Eyebrow: "Ai Labs · San Salvador"
- H1: "Less manual work in your company. More control."
- H1 alternativa: "Automate your operations with AI and custom software."
- Lead: "We design and implement automations and custom software for companies in El Salvador, and prepare your team to run them without depending on us."
- CTA primario: "Book a 30-minute diagnostic" → `/agendar`
- CTA secundario: "See how we work" → `#metodo`

### Programas de comunidad

A strip right under the hero, with the halftone marks that already exist. It is
the site's main proof, which is why it goes first. Claude is not one of those
programs: it goes separately, as a tool we work with.

- Label: "We are members of the community programs of"
- Marcas: SpaceXAI, OpenAI, Codex, Cognition, Cursor, Mistral, ElevenLabs, Notion. Cursor and Cognition need a new mark in `assets/logos` and `pnpm halftone:logos`.
- Separador: "and we work with" + Claude mark
- Cuerpo: "Being members gives us a direct line to their teams, training from them, early access to what's next, and better judgment to guide those who use them."
- Cifra, única: "Over 60" / "AI events since 2025"

### Ofertas

- Label: "What we do"
- Título: "Three ways to work with us"
- Intro: "All of them start with a 30-minute diagnostic."
- Tarjeta 1, título: "Automation and custom software"
- Tarjeta 1, línea: "We connect your tools, automate the repetitive work and build what's missing."
- Tarjeta 1, ejemplos: "Reports, sales follow-up, quotes, invoicing, inventory."
- Tarjeta 1, link: "See how it works" → `/automatizacion-ia-el-salvador`
- Tarjeta 2, título: "AI diagnostic"
- Tarjeta 2, línea: "In one session we review your process and pick where to start."
- Tarjeta 2, link: "See how it works" → `/consultoria-de-ia-el-salvador`
- Tarjeta 3, título: "Training for teams"
- Tarjeta 3, línea: "From a four-hour Learning Day to a multi-day bootcamp, built on the team's real work."
- Tarjeta 3, link: "See how it works" → `/capacitacion-ia-el-salvador`

### Cómo trabajamos `#metodo`

- Label: "How we work"
- Título: "The process before the tool"
- Cuerpo: "We start by understanding how the work gets done today. Then we agree on the scope and the quote with you before touching anything."
- Paso 1, título: "Understand"
- Paso 1, cuerpo: "We review how the work gets done today, who is involved and where it gets stuck."
- Paso 2, título: "Prioritize"
- Paso 2, cuerpo: "We pick one improvement worth making and agree on the scope."
- Paso 3, título: "Implement"
- Paso 3, cuerpo: "We build, integrate and leave the team running it, with documentation."

### Preguntas

- Título: "What people usually ask us"
- P1: "How much does it cost?"
- R1: "The 30-minute diagnostic is free. After that we give you the scope and the quote before starting."
- P2: "Does my team need to know how to code?"
- R2: "No. We work with sales, operations and administrative teams. What we build is run from the tools they already use."
- P3: "What happens to our data?"
- R3: "Your data stays in your own accounts and tools. Before starting, we agree in writing on what information we touch and what we don't."
- P4: "How long does it take?"
- R4: "The diagnostic, 30 minutes. The rest depends on the process and the integrations. We give you an estimate in the diagnostic."
- P5: "What happens when you're done?"
- R5: "Your team keeps running it, with documentation and access to everything we did. If you want, we agree on support tailored to the tool."

### Agenda

- Título: "Book a 30-minute diagnostic"
- Cuerpo: "Tell us which process takes up your time. You leave the session with a concrete recommendation, whether you hire us or not."
- CTA primario: "Pick a date and time" → `/agendar`
- CTA secundario: "Message us on WhatsApp" `[optional: only if there is a business number]`

## Automatización `/automatizacion-ia-el-salvador`

- Meta title: "AI automation for companies in El Salvador | Ai Labs"
- Meta description: "AI process automation and custom software for companies in El Salvador. We connect your tools and build what's missing, with human review."
- Eyebrow: "Automation and custom software"
- H1: "AI automation and custom software"
- Lead: "We connect your tools, automate the repetitive work and build the software you're missing. With human review and documentation."
- CTA: "Book a 30-minute diagnostic"

### Para quién es

- Título: "Who it's for"
- Línea: "Teams that copy information between systems by hand."
- Línea: "Operations that need speed without losing control over decisions."
- Línea: "Companies that want a system of their own instead of another subscription."

### Para quién no es

- Título: "Who it's not for"
- Línea: "If you want to replace the team instead of improving how it works."
- Línea: "If the process isn't clear yet. In that case, start with the diagnostic."

### Qué incluye

- Título: "What's included"
- Ítem 1, título: "Fit with the process"
- Ítem 1, cuerpo: "The workflow respects the tools, data and responsibilities that already exist."
- Ítem 2, título: "Integrations"
- Ítem 2, cuerpo: "We connect the tools the team already uses so information doesn't get copied by hand."
- Ítem 3, título: "Human review"
- Ítem 3, cuerpo: "We define where AI assists, what gets automated and which decisions stay in the team's hands."
- Ítem 4, título: "Delivery and handoff"
- Ítem 4, cuerpo: "We deliver the workflow, the integrations and the documentation so the team can run it."

### Cómo lo hacemos

- Título: "How we do it"
- Paso 1, título: "Understand the process"
- Paso 1, cuerpo: "We map inputs, decisions, friction and the expected outcome."
- Paso 2, título: "Design the intervention"
- Paso 2, cuerpo: "We define what to assist, what to automate and what to keep human."
- Paso 3, título: "Implement and hand off"
- Paso 3, cuerpo: "We integrate, document and leave the team ready to operate."

### Ejemplo

- Título: "One process, before and after"
- Cuerpo: `[real case pending]`

### Preguntas

- Título: "Questions about automation"
- P1: "What is AI process automation?"
- R1: "It's designing and implementing workflows that connect tools, data and people, and defining what AI assists, what gets automated and which decisions stay with the team."
- P2: "Do you build custom software for companies?"
- R2: "Yes. If your tools already have what you need and just have to be connected, that's automation. If a piece is missing that no tool gives you, we build it to fit."
- P3: "Does AI replace the team?"
- R3: "No. We design every workflow with human review where it's needed. AI assists or automates steps, and the important decisions stay in the team's hands."
- P4: "Which tools does it integrate with?"
- R4: "We start from the tools the team already uses, and we define the integrations after we understand the process."
- P5: "How much does it cost to automate a process?"
- R5: "It depends on the process and the integrations. After the diagnostic we give you the scope and the quote before starting."

### Agenda

- Título: "Which process do you want to improve?"
- Cuerpo: "Tell us how it works today and where it gets stuck. We review it with you in 30 minutes."
- CTA: "Book a diagnostic"

## Consultoría `/consultoria-de-ia-el-salvador`

- Meta title: "AI consulting in El Salvador | Ai Labs"
- Meta description: "AI consulting in El Salvador: a 30-minute diagnostic and a review of your process with your team to pick one improvement worth making."
- Eyebrow: "AI diagnostic"
- H1: "AI consulting in El Salvador"
- Lead: "A 30-minute diagnostic and then a review of your process with your team, to pick one improvement worth making."
- CTA: "Book a 30-minute diagnostic"

### Para quién es

- Título: "Who it's for"
- Línea: "Owners and managers who want to use AI and don't know where to start."
- Línea: "Teams with a process that hurts and several ideas for how to fix it."
- Línea: "Companies that already tried AI tools and nothing changed."

### Para quién no es

- Título: "Who it's not for"
- Línea: "If you already know exactly what to build, go straight to automation."
- Línea: "If you want a general talk about AI, check out our workshops."

### Qué incluye

- Título: "What's included"
- Ítem 1, título: "30-minute diagnostic"
- Ítem 1, cuerpo: "A free video call, or a visit if you're nearby, to understand your operation and decide if it makes sense to continue."
- Ítem 2, título: "Process review"
- Ítem 2, cuerpo: "A session with the team that does the work: we map steps, tools and where it gets stuck."
- Ítem 3, título: "Prioritization"
- Ítem 3, cuerpo: "We pick one improvement worth making, define the scope and give you the quote before starting."
- Ítem 4, título: "Plan"
- Ítem 4, cuerpo: "A short document with the process, the chosen improvement and the steps to implement it or train the team."

### Cómo lo hacemos

- Título: "How we do it"
- Paso 1, título: "Understand"
- Paso 1, cuerpo: "We review how the work gets done today, who is involved and where it gets stuck."
- Paso 2, título: "Prioritize"
- Paso 2, cuerpo: "We pick one improvement worth making and agree on the scope."
- Paso 3, título: "Implement"
- Paso 3, cuerpo: "We build the workflow or prepare the team, with the documentation it needs."

### Preguntas

- Título: "Questions about consulting"
- P1: "What does an AI consultant do?"
- R1: "They review how a team works, find where AI can help and decide where to start. Then they implement the improvement or prepare the team to run it."
- P2: "How much does AI consulting cost?"
- R2: "The 30-minute diagnostic is free. The review and the plan depend on the size of the process, and we quote them before starting."
- P3: "Do I need to know what I want?"
- R3: "No. That's what the diagnostic is for. It's enough to know which part of the work costs you the most time or gives you the most trouble."
- P4: "What do I get at the end?"
- R4: "A short document with the mapped process, the chosen improvement, the scope and the quote. It's yours, whether you implement it with us or not."
- P5: "Do you only work in San Salvador?"
- R5: "No. We work with companies across El Salvador and outside the country too. The diagnostic is a video call, and the reviews can be in person if you're nearby."

### Agenda

- Título: "Start with the diagnostic"
- Cuerpo: "Thirty minutes, at no cost. You leave with a concrete recommendation, whether you hire us or not."
- CTA: "Pick a date and time"

## Capacitación `/capacitacion-ia-el-salvador`

- Meta title: "AI training for teams in El Salvador | Ai Labs"
- Meta description: "AI training and courses for teams in El Salvador: Learning Day, Build Day and bootcamp for managers and sales teams, built on their own work."
- Eyebrow: "Training for teams"
- H1: "AI training for teams"
- Lead: "Learning Day, Build Day and bootcamp so that managers and sales teams use AI with good judgment, on their own work."
- CTA: "Book a call"

### Formatos

The plan for each format, with audience, duration and launch order, is in
`docs/narrativa-y-mapa.md`, section 5.

- Título: "Formats"
- Formato 1, título: "Learning Day"
- Formato 1, cuerpo: "Four hours with your team, on their real tasks. They leave with templates they use the next day."
- Formato 2, título: "Build Day"
- Formato 2, cuerpo: "A day in an open cohort with other companies: you bring a process and leave with a prototype and a business case."
- Formato 3, título: "Bootcamp"
- Formato 3, cuerpo: "Two or more days with your team: the prototype ends up working, integrated and documented, and the team ready to run it."
- Formato 4, título: "Public workshops"
- Formato 4, cuerpo: "Open sessions in San Salvador for any professional. They are the easiest way to get to know us."
- Formato 4, link: "See upcoming workshops" → `/events`

### Para quién es

- Título: "Who it's for"
- Línea: "Managers and sales teams who want to use AI in their work with good judgment."
- Línea: "Operations and administrative teams that need a common foundation."
- Línea: "Leadership teams that want to decide with information before investing in AI."

### Para quién no es

- Título: "Who it's not for"
- Línea: "If you are looking for programming or AI research training."
- Línea: "If you're looking for a certificate without practicing on your own work."

### Cómo se arma

- Título: "How we put it together"
- Paso 1, título: "Understand"
- Paso 1, cuerpo: "We review what the team does, with which tools and where it loses time."
- Paso 2, título: "Practice"
- Paso 2, cuerpo: "We work on the team's real cases, with exercises they can repeat the next day."
- Paso 3, título: "Operate"
- Paso 3, cuerpo: "We leave review criteria and documentation so the improvement lasts."

### Preguntas

- Título: "Questions about training"
- P1: "What is practical AI training?"
- R1: "It teaches how to use artificial intelligence in the real tasks of each person or team, with the judgment to know when to use it, how to review the result and how to run it."
- P2: "Can I start from scratch, without knowing how to code?"
- R2: "Yes. We design the training for business roles and use plain language. We focus on applying AI to real tasks with good judgment."
- P3: "Does it work if my team isn't technical?"
- R3: "Yes. Most of the teams we work with are in sales, operations and administration. They practice with their own tasks."
- P4: "How much does it cost?"
- R4: "Public workshops show their price on each event. Training for teams depends on the format, and we quote it after a call."
- P5: "Do you run open AI courses, without a company?"
- R5: "Yes. Public workshops are for any professional. The upcoming ones are listed under Events, and we announce them on WhatsApp."

### Agenda

- Título: "Want to prepare your team?"
- Cuerpo: "Tell us what your team does and what it wants to improve. We go over it in a 30-minute call."
- CTA: "Book a call"

## Eventos `/events`

- Meta title: "AI workshops and events in San Salvador | Ai Labs"
- Meta description: "AI workshops, coffee chats and meetups in San Salvador organized by Ai Labs. We publish upcoming ones on Luma and announce them in our WhatsApp community."
- Label: "Events"
- H1: "AI workshops and events in San Salvador"
- Intro: "Since 2025 we've organized AI workshops, coffee chats and meetups. The upcoming ones are on Luma and we announce them on WhatsApp."
- Pista 1, título: "For teams and leaders"
- Pista 1, cuerpo: "Executive breakfasts, masterclasses and demo days where you see automations working."
- Pista 2, título: "For builders"
- Pista 2, cuerpo: "Labs, meetups and hackathons with the tools we use every day."
- Próximos: "Upcoming"
- Anteriores: "Past"
- Vacío: "No upcoming event yet. We announce the next one on WhatsApp."
- Luma: "View on Luma"
- Comunidad, título: "WhatsApp community"
- Comunidad, cuerpo: "That's where we announce every workshop before social media. Joining is free."
- Comunidad, CTA: "Join on WhatsApp"
- Comunidad, nota: "WhatsApp opens and may ask for approval."
- Puente, título: "Want this inside your company?"
- Puente, CTA: "Book a 30-minute diagnostic"
- Fotos, crédito: "Photos from our events in San Salvador."

## Comunidad `/community`

The home hero with its own copy. The WhatsApp group is the primary action
(`COMMUNITY_WHATSAPP_URL`); it is not in the header.

- Meta title: "AI community on WhatsApp | Ai Labs"
- Meta description: "Our AI community in El Salvador is a WhatsApp group. We announce workshops and meetups there before we post them on social media, and joining is free."
- Label: "Community"
- H1: "Learn AI with the Ai Labs community"
- Lead: "A WhatsApp group where we announce workshops and meetups before we post them on social media. Joining is free."
- CTA: "Join on WhatsApp"
- Link: "See events" → `/events`
- Nota: "WhatsApp opens and may ask for approval."

## Agendar `/agendar`

- Meta title: "Book a 30-minute diagnostic | Ai Labs"
- Meta description: "Pick a date and time for a 30-minute diagnostic with Ai Labs. Tell us which process takes up your time and leave with a concrete recommendation."
- Label: "Booking"
- H1: "Book a 30-minute diagnostic"
- Lead: "Tell us which process takes up your time. You leave the session with a concrete recommendation, whether you hire us or not."
- Paso 1, título: "Pick a date and time"
- Paso 1, cuerpo: "Thirty minutes by video call, at the time that works best for you."
- Paso 2, título: "Tell us about your process"
- Paso 2, cuerpo: "Two questions when you book: what you want to talk about and your company."
- Paso 3, título: "See you there"
- Paso 3, cuerpo: "We send the invitation to your email with the link."
- Alternativa, título: "Prefer to message us?"
- Alternativa, CTA: "Message us on WhatsApp" `[optional: only if there is a business number]`
- Own booker over cal.com `walter-ailabs/diagnostico` (`BOOKING_CAL_LINK`), one event for the three offers: times come from the public cal.com API and the booking goes back to it, which sends the invitation. No iframe, nothing stored on the site. Topic question "¿Sobre qué querés hablar?" with the options Automatizar un proceso o construir software / Consultoría: saber por dónde empezar con IA / Capacitar a mi equipo / Todavía no sé (cal.com stores the Spanish text); `?tema=automatizacion|consultoria|capacitacion` from each service page preselects it.
- Booker, event column: "AI diagnostic", "30 minutes", "Google Meet" and the visitor's time zone ("El Salvador (GMT-6)"); once a time is picked it adds the chosen date and time.
- Booker, calendar: "Previous month", "Next month", "Available times" (until a day is picked), "Pick a day to see the times.", "No times this month. Try the next one.", "12 h" / "24 h" switch
- Booker, states: "Loading times", "We could not load the calendar." with "Try again"
- Booker, form: "Change time", "Your name", "Your email", "Your company", "What would you like to talk about?", "Which process takes up your time? (optional)", "Two lines are enough."
- Booker, submit: "Confirm diagnostic", "Booking"; errors "That time is no longer available. Pick another." and "We could not book it. Try again in a moment."
- Booker, confirmation: "All set, see you there", "We sent the invitation with the video call link to {email}.", "View or change the booking"

## Legal

`/privacy` and `/terms` are rewritten separately: no accounts, no database and
no analytics. The only data that leaves the site is the booking on cal.com.
