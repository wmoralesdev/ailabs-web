import type { ServicePagesContent } from "./types"

const consultingDefinition =
  "AI consulting reviews how the work gets done today, finds where artificial intelligence can help, and prioritizes one concrete opportunity to put into practice."

const trainingDefinition =
  "Practical AI training teaches people to use artificial intelligence in their real tasks, with the judgment to know when to use it, how to review the result, and how to run it."

const automationDefinition =
  "AI process automation designs and implements workflows that connect tools, data, and people, and defines what AI assists, what gets automated, and which decisions stay with the team."

export const servicePagesEn: ServicePagesContent = {
  homeLabel: "Home",
  breadcrumbLabel: "Breadcrumb",
  relatedLabel: "Other ways to work with Ai Labs",
  communityLink: "AI community in El Salvador",
  consulting: {
    metaTitle:
      "AI Consulting in El Salvador: Assessment and Priorities | Ai Labs",
    metaDescription:
      "AI consulting in San Salvador: we review the process, prioritize one concrete opportunity, and decide whether to train the team or implement the workflow.",
    serviceName: "AI consulting in El Salvador",
    eyebrow: "AI consulting · San Salvador",
    title:
      "AI consulting in El Salvador for commercial, management, and operations teams",
    lead: "Ai Labs helps teams in El Salvador understand how they work today, choose where AI really helps, and decide the next step: prepare the team or implement the workflow.",
    definitionHeading: "What AI consulting does for your team.",
    definition: consultingDefinition,
    includesHeading: "What consulting includes.",
    includes: [
      {
        title: "A map of the current process",
        body: "We look at how the work happens today: who is involved, what comes in, what gets decided, and where it gets stuck.",
      },
      {
        title: "Assessed opportunities",
        body: "We compare where AI can help by impact, risk, and a realistic scope for the team.",
      },
      {
        title: "One clear priority",
        body: "We choose one opportunity and agree on scope and how we will assess the improvement.",
      },
      {
        title: "The next route",
        body: "We decide whether to prepare the team with Academy or implement the workflow with Agentic.",
      },
    ],
    stepsHeading: "How we work.",
    steps: [
      {
        title: "Understand",
        body: "We map the process, people, inputs, decisions, and friction.",
      },
      {
        title: "Prioritize",
        body: "We assess the opportunity, impact, risk, and a realistic scope.",
      },
      {
        title: "Put it into practice",
        body: "We prepare the team or design and implement the workflow with them, with human review and documentation.",
      },
    ],
    fitHeading: "Who it is for.",
    fit: [
      "Commercial, management, and operations teams with repetitive tasks or a lot of manual follow-up.",
      "Owners and leaders who want to start with AI without buying tools blindly.",
      "Companies that already tried AI tools and need to decide what is worth keeping.",
    ],
    notFitHeading: "Who it is not for.",
    notFit: [
      "If you are looking for licenses, credits, or access to a specific tool.",
      "If you expect a guaranteed result without reviewing how the work gets done.",
    ],
    faqHeading: "Questions about AI consulting.",
    faq: [
      {
        question: "What does an AI consultant do?",
        answer: consultingDefinition,
      },
      {
        question:
          "AI consultant, advisor, agency, or company: what is the difference?",
        answer:
          "Ai Labs is a private AI consulting company in San Salvador, El Salvador. Whether you are looking for an AI consultant, advisor, agency, or company, what matters is the method: understand the process, prioritize one improvement, and leave the team ready to run it.",
      },
      {
        question: "How much does AI consulting cost in El Salvador?",
        answer:
          "It depends on scope. Ai Labs does not publish consulting rates because it first reviews the process and agrees with the team on what is worth improving.",
      },
      {
        question: "Do I need data or tools ready to start?",
        answer:
          "No. Ai Labs consulting starts by understanding how the work gets done today. Tools and data are decided later, based on the prioritized opportunity.",
      },
      {
        question: "What happens after consulting?",
        answer:
          "Ai Labs follows one of two routes: Academy prepares the team to apply the improvement, and Agentic designs and implements the workflow with the team, with integrations, human review, documentation, and transfer.",
      },
      {
        question: "Does Ai Labs sell AI tool licenses or credits?",
        answer:
          "No. Ai Labs takes part in ambassador programs for several AI tools, but it does not sell licenses or guarantee access, credits, or third-party partnerships.",
      },
    ],
    ctaHeading: "Where do we start?",
    ctaBody:
      "Tell us which process you want to improve. A company is optional.",
    cta: "Find where to apply AI",
    interest: "discovery",
  },
  training: {
    metaTitle: "AI Training in El Salvador: Teams and Professionals | Ai Labs",
    metaDescription:
      "Practical AI training in San Salvador for professionals and teams: real tasks, judgment to review results, and public workshops.",
    serviceName: "AI training in El Salvador",
    eyebrow: "Academy · Practical education",
    title: "AI training in El Salvador for professionals and teams",
    lead: "Ai Labs Academy teaches how to apply AI to everyday work, in plain language for business roles. Come with your team or directly to learn.",
    definitionHeading: "What you learn in practical AI training.",
    definition: trainingDefinition,
    includesHeading: "How the training works.",
    includes: [
      {
        title: "Built on your tasks",
        body: "Practice starts from the tasks, decisions, and friction you face every day, not generic examples.",
      },
      {
        title: "Judgment, not just tools",
        body: "You learn when to use AI, how to review what it produces, and when a task should stay human.",
      },
      {
        title: "For teams",
        body: "After prioritizing a process, we work on the team's real cases until it can apply and run the improvement.",
      },
      {
        title: "For professionals",
        body: "Public workshops and bootcamps for people learning on their own, with no company or prior consulting required.",
      },
    ],
    stepsHeading: "How team training comes together.",
    steps: [
      {
        title: "Understand",
        body: "We look at what the team does, with which tools, and where it loses time.",
      },
      {
        title: "Practice",
        body: "We work on the team's real cases, with exercises they can repeat the next day.",
      },
      {
        title: "Run it",
        body: "We leave review criteria and documentation so the improvement lasts.",
      },
    ],
    fitHeading: "Who it is for.",
    fit: [
      "Professionals who want to apply AI to their work with judgment.",
      "Commercial, management, and operations teams that need a shared foundation.",
      "People who prefer to learn in person, with guided practice.",
    ],
    notFitHeading: "Who it is not for.",
    notFit: [
      "If you want a theoretical programming or AI research course.",
      "If you want a certificate without practice on your own work.",
    ],
    faqHeading: "Questions about AI training.",
    faq: [
      {
        question: "What is practical AI training?",
        answer: trainingDefinition,
      },
      {
        question: "AI course, workshop, or training: what is the difference?",
        answer:
          "Ai Labs Academy offers practical AI education in San Salvador. Whether you are looking for an AI course, workshop, bootcamp, or training, the idea is the same: practice on real tasks until you can apply it at work.",
      },
      {
        question: "Do I need a company to learn AI with Ai Labs?",
        answer:
          "No. Ai Labs Academy welcomes professionals and teams. You can come directly to learn, with no company or prior consulting required.",
      },
      {
        question: "Do I need to know how to code?",
        answer:
          "No. Ai Labs training is designed for business roles and uses plain language. It focuses on applying AI to real tasks with judgment.",
      },
      {
        question: "How much does AI training cost?",
        answer:
          "Ai Labs public workshops show their cost on their own page. Team training depends on scope and is agreed after reviewing the process.",
      },
      {
        question: "How do I hear about upcoming workshops?",
        answer:
          "Follow the Ai Labs WhatsApp community in El Salvador and its social profiles to hear about upcoming public workshops.",
      },
    ],
    ctaHeading: "Want to prepare your team?",
    ctaBody:
      "Tell us what your team does and what it wants to improve. You can also write to us if you want to learn on your own.",
    cta: "Prepare my team",
    interest: "enablement",
  },
  automation: {
    metaTitle:
      "AI Automation in El Salvador: Workflows and Integrations | Ai Labs",
    metaDescription:
      "AI process automation in San Salvador: workflows with your tools, human review, documentation, and transfer to the team.",
    serviceName: "AI process automation in El Salvador",
    eyebrow: "Agentic · Design and implementation",
    title: "AI process automation in El Salvador, designed with your team",
    lead: "Ai Labs Agentic designs and implements workflows that fit the way your team works today, with the integrations and human review each process needs.",
    definitionHeading: "What AI automation does for your operation.",
    definition: automationDefinition,
    includesHeading: "What it includes.",
    includes: [
      {
        title: "Fits the process",
        body: "The workflow respects the tools, data, and responsibilities that already exist.",
      },
      {
        title: "Integrations",
        body: "We connect the tools the team already uses so information is not copied by hand.",
      },
      {
        title: "Human review",
        body: "We define where AI assists, what gets automated, and which decisions stay with the team.",
      },
      {
        title: "Operational handoff",
        body: "We deliver the workflow, integrations, and documentation so the team can run it.",
      },
    ],
    stepsHeading: "How we implement a workflow.",
    steps: [
      {
        title: "Understand the process",
        body: "We map inputs, decisions, friction, and the expected outcome.",
      },
      {
        title: "Design the intervention",
        body: "We define what to assist, automate, or keep human.",
      },
      {
        title: "Implement and transfer",
        body: "We integrate, document, and leave the team ready to operate.",
      },
    ],
    fitHeading: "Who it is for.",
    fit: [
      "Teams with repetitive processes: follow-up, documents, reports, or data moving between tools.",
      "Operations that need speed without losing control over important decisions.",
      "Companies that want the team to run the workflow without depending on a vendor.",
    ],
    notFitHeading: "Who it is not for.",
    notFit: [
      "If you want to replace the team instead of improving how it works.",
      "If the process is not clear yet: start with consulting instead.",
    ],
    faqHeading: "Questions about AI automation.",
    faq: [
      {
        question: "What is AI process automation?",
        answer: automationDefinition,
      },
      {
        question:
          "Automation, AI agent, or agentic workflow: what is the difference?",
        answer:
          "Ai Labs Agentic implements AI workflows in San Salvador. An automation runs fixed steps; an AI agent or agentic workflow also interprets information and proposes actions. Either way, Ai Labs defines what AI decides, what a person reviews, and what gets documented.",
      },
      {
        question: "Does AI replace the team?",
        answer:
          "No. Ai Labs designs each workflow with human review where it is needed. AI assists or automates steps, and important decisions stay with the team.",
      },
      {
        question: "Which tools does it integrate with?",
        answer:
          "Ai Labs starts from the tools the team already uses. Integrations are defined after understanding the process, not before.",
      },
      {
        question: "How much does it cost to automate a process with AI?",
        answer:
          "It depends on the process and the integrations. Ai Labs does not publish rates: it first reviews the process and agrees on scope with the team.",
      },
      {
        question: "What does the team get at the end?",
        answer:
          "The team gets the working workflow, its integrations, and the documentation needed to run and adjust it.",
      },
    ],
    ctaHeading: "Which process do you want to improve?",
    ctaBody:
      "Tell us how it works today and where it gets stuck. We will review it with you.",
    cta: "I want to improve a process",
    interest: "implementation",
  },
}
