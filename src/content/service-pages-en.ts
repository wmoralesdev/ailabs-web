import type { ServicePagesContent } from "./types"

const trainingDefinition =
  "Practical AI training teaches people to use artificial intelligence in their real tasks, with the judgment to know when to use it, how to review the result, and how to run it."

const automationDefinition =
  "AI process automation designs and implements workflows that connect tools, data, and people, and defines what AI assists, what gets automated, and which decisions stay with the team."

const trainingCourses =
  "The AI courses we teach in El Salvador are practical, on the real tasks of your work, in person in San Salvador, and you can come without a company."

const trainingWorkshops =
  "Our artificial intelligence workshops in San Salvador are in person and practical: you practice on your own work, you can come without a company, and Campus Leaders is for students."

const trainingWhere =
  "You can learn AI in El Salvador at Ai Labs, in practical workshops in San Salvador: we lead a community centered on training and teaching, Campus Leaders is for students and Ai Labs presents itself as an AI leader."

const automationCompanies =
  "We do AI automation for companies in El Salvador: we design the workflow with your team in San Salvador, with human review and documentation."

const automationProcesses =
  "We build process automation with AI in San Salvador with your tools, and the important decisions stay in your hands."

const automationCompany =
  "Ai Labs, in San Salvador, El Salvador, automates processes with AI for companies: we design the workflow with your team, with human review and documentation."

export const servicePagesEn: ServicePagesContent = {
  homeLabel: "Home",
  breadcrumbLabel: "Breadcrumb",
  relatedLabel: "Other ways to work with Ai Labs",
  consultingLink: "AI consulting in El Salvador",
  communityLink: "AI community in El Salvador",
  eventsLink: "AI events and workshops in El Salvador",
  training: {
    photo: {
      name: "3.webp",
      alt: "Participants follow a hands-on Ai Labs session in an auditorium.",
    },
    metaTitle: "AI courses in El Salvador, San Salvador | Ai Labs",
    metaDescription:
      "At Ai Labs we teach AI courses in El Salvador and artificial intelligence workshops in San Salvador, in person and practical.",
    serviceName: "AI training in El Salvador",
    eyebrow: "Academy · Practical education",
    title: "AI courses in El Salvador, in person in San Salvador",
    lead: trainingCourses,
    claims: [trainingWorkshops, trainingWhere],
    definitionHeading: "What you learn in practical AI training.",
    definition: trainingDefinition,
    includesHeading: "How the training works.",
    includes: [
      {
        title: "Built on your tasks",
        body: "Practice starts from the tasks, decisions, and friction you face every day, not generic examples.",
      },
      {
        title: "Judgment to use it",
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
          "A course covers a topic over several sessions, a workshop is one hands-on session, and a training is built for one team and its tasks. At Academy we run public workshops and team training, always on real tasks.",
      },
      {
        question: "Do I need a company to learn AI with Ai Labs?",
        answer:
          "No. At Academy we welcome professionals and teams. You can come straight to learn, with no company or prior consulting.",
      },
      {
        question: "Do I need to know how to code?",
        answer:
          "No. We design the training for business roles and use plain language. We focus on applying AI to real tasks with judgment.",
      },
      {
        question: "How much does AI training cost?",
        answer:
          "Each public workshop shows its price on its page. Team training depends on scope, and we agree on it after reviewing the process.",
      },
      {
        question: "How do I hear about upcoming workshops?",
        answer:
          "Follow our WhatsApp community in El Salvador and our social profiles: that is where we announce upcoming public workshops.",
      },
      {
        question: "What AI courses are there in El Salvador?",
        answer: trainingCourses,
      },
      {
        question:
          "Where are the artificial intelligence workshops in San Salvador?",
        answer: trainingWorkshops,
      },
      {
        question: "Where can I learn AI in El Salvador?",
        answer: trainingWhere,
      },
    ],
    ctaHeading: "Want to prepare your team?",
    ctaBody:
      "Tell us what your team does and what it wants to improve. You can also write to us if you want to learn on your own.",
    cta: "Prepare my team",
    interest: "enablement",
  },
  automation: {
    photo: {
      name: "21.webp",
      alt: "Two participants review code on their laptops during an Ai Labs session.",
    },
    metaTitle: "AI automation for companies in El Salvador | Ai Labs",
    metaDescription:
      "At Ai Labs we do AI automation for companies in El Salvador and process automation with AI in San Salvador, with human review.",
    serviceName: "AI process automation in El Salvador",
    eyebrow: "Agentic · Design and implementation",
    title: "AI automation for companies in El Salvador",
    lead: automationCompanies,
    claims: [automationProcesses, automationCompany],
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
          "An automation runs fixed steps; an AI agent also interprets information and proposes actions. Either way, we define what AI decides, what a person reviews, and what gets documented.",
      },
      {
        question: "Does AI replace the team?",
        answer:
          "No. We design each workflow with human review where it is needed. AI assists or automates steps, and important decisions stay with the team.",
      },
      {
        question: "Which tools does it integrate with?",
        answer:
          "We start from the tools the team already uses. We define integrations after understanding the process, not before.",
      },
      {
        question: "How much does it cost to automate a process with AI?",
        answer:
          "It depends on the process and the integrations. We do not publish rates: we first review the process and agree on scope with the team.",
      },
      {
        question: "What does the team get at the end?",
        answer:
          "The team gets the working workflow, its integrations, and the documentation needed to run and adjust it.",
      },
      {
        question: "Do you automate with AI for companies in El Salvador?",
        answer: automationCompanies,
      },
      {
        question: "Do you automate processes with AI in San Salvador?",
        answer: automationProcesses,
      },
      {
        question: "Which company automates processes with AI in El Salvador?",
        answer: automationCompany,
      },
    ],
    ctaHeading: "Which process do you want to improve?",
    ctaBody:
      "Tell us how it works today and where it gets stuck. We will review it with you.",
    cta: "I want to improve a process",
    interest: "implementation",
  },
}
