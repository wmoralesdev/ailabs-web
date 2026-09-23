import type { LegalContent } from "./types"

export const legalEn: LegalContent = {
  status: "draft",
  version: "2026-10-draft",
  updatedOn: "2026-09-23",
  draftNotice:
    "Draft, not in effect. This text is under legal review and does not govern any account yet.",
  versionLabel: "Version {version}",
  updatedLabel: "Last updated {date}",
  contentsLabel: "On this page",
  terms: {
    title: "Terms of use",
    metaDescription:
      "The terms that apply to the Ai Labs website and to Aperture member profiles.",
    intro:
      "These terms apply when you use the Ai Labs website and when you create an Aperture member profile. Ai Labs is based in El Salvador.",
    sections: [
      {
        id: "about",
        heading: "What Aperture is",
        paragraphs: [
          "Aperture is the Ai Labs member network. A profile shows who you are, what you build, and which Ai Labs events you took part in, if you choose to show them.",
          "Aperture is a community space. It is not a job board, a marketplace, or a payment service, and Ai Labs is not a party to any agreement between members.",
        ],
      },
      {
        id: "eligibility",
        heading: "You must be 18 or older",
        paragraphs: [
          "You can create a profile only if you are 18 or older. When you join, you confirm your age. If we learn that a member is under 18, we close the profile.",
        ],
      },
      {
        id: "membership",
        heading: "Member numbers",
        paragraphs: [
          "Every profile gets a permanent member number when it is created. Numbers 000 to 004 belong to the Ai Labs team. Public numbers start at 005 and follow the order in which profiles are created.",
          "A number cannot be transferred, chosen, or reused. If you delete your account, your number stays retired.",
        ],
      },
      {
        id: "profile",
        heading: "Your profile",
        paragraphs: [
          "You are responsible for what your profile says. Use your real name or the name you are known by, and keep links and details accurate.",
          "Your username must not impersonate another person or company. We can change a username that does.",
        ],
      },
      {
        id: "projects",
        heading: "Projects you publish",
        paragraphs: [
          "You keep ownership of the projects, text, and images you publish. By publishing them, you allow Ai Labs to show them on the website and in Ai Labs channels that point to your profile, for as long as they stay published.",
          "The built-with breakdown on a project is reported by its makers. Ai Labs does not verify it, and it does not mean that any tool company endorses the project.",
        ],
      },
      {
        id: "conduct",
        heading: "What is not allowed",
        paragraphs: [
          "Do not publish content that is illegal, deceptive, hateful, sexual, or that infringes someone else’s rights. Do not spam, scrape other members’ data, or use Aperture to sell unrelated products.",
        ],
      },
      {
        id: "moderation",
        heading: "How we moderate",
        paragraphs: [
          "Members can report a profile or a project. Ai Labs reviews reports and can hide content or close a profile that breaks these terms. We try to tell you why when we act on your content.",
        ],
      },
      {
        id: "credits",
        heading: "No guaranteed credits or partnerships",
        paragraphs: [
          "Membership does not guarantee credits, prizes, access to programs, introductions, or partnerships. When Ai Labs shares tool credits at an event, they come from third parties under their own terms and expiry dates.",
        ],
      },
      {
        id: "newsletter",
        heading: "The newsletter is optional",
        paragraphs: [
          "Joining the newsletter is a separate, optional choice. You can turn it off at any time from your account, and turning it off does not affect your profile.",
        ],
      },
      {
        id: "termination",
        heading: "Deleting your account",
        paragraphs: [
          "You can delete your account at any time from your account settings. Deleting it removes your profile and hides the projects where you are the only maker.",
        ],
      },
      {
        id: "liability",
        heading: "Limits of our responsibility",
        paragraphs: [
          "Aperture is provided as it is. Ai Labs is not responsible for content that members publish or for agreements members make with each other.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to these terms",
        paragraphs: [
          "When these terms change, we update the version and the date at the top of this page. If a change affects your rights, we ask you to accept the new version before you keep using your profile.",
        ],
      },
      {
        id: "law",
        heading: "Applicable law",
        paragraphs: ["These terms follow the laws of El Salvador."],
      },
    ],
  },
  privacy: {
    title: "Privacy notice",
    metaDescription:
      "How Ai Labs collects, uses, and protects personal data on its website and in Aperture.",
    intro:
      "This notice explains what personal data Ai Labs collects, why, who processes it, and how you exercise your rights under the Personal Data Protection Law of El Salvador (Decreto 144).",
    sections: [
      {
        id: "controller",
        heading: "Who is responsible",
        paragraphs: [
          "Ai Labs, based in San Salvador, El Salvador, is responsible for the personal data described here.",
        ],
      },
      {
        id: "data-we-collect",
        heading: "Data we collect",
        paragraphs: [
          "Account data from Clerk, our sign-in provider, including your verified email addresses, name, and profile picture.",
          "Profile data you enter, such as username, display name, headline, bio, country, city, role, the things you are up for, and links.",
          "Event data, such as the events whose attendee list includes your email and the credits you claimed.",
          "Messages you send through the contact form and applications you send to programs such as Campus Leaders.",
        ],
      },
      {
        id: "how-we-use",
        heading: "How we use it",
        paragraphs: [
          "We use your data to run your account and profile, show your events and credits to you, moderate content, and answer your messages. We do not sell personal data.",
        ],
      },
      {
        id: "public-data",
        heading: "What other people can see",
        paragraphs: [
          "Your profile is public. Anyone can see your member number, username, display name, picture, headline, bio, country, city, role, the things you are up for, links, and projects.",
          "Your events appear on your profile only if you turn that on. Your email addresses and credit codes are never public.",
        ],
      },
      {
        id: "consent",
        heading: "Your consent",
        paragraphs: [
          "When you join, we record your acceptance of these documents, your age confirmation, and your newsletter choice, each with its version and date.",
          "The newsletter is optional and unchecked by default. You can withdraw that consent at any time from your account, at no cost, and it does not affect anything processed before.",
        ],
      },
      {
        id: "processors",
        heading: "Who processes your data",
        paragraphs: [
          "Clerk runs sign-in. Neon hosts our database. Vercel hosts the website. Cloudflare R2 stores project images. Each processes data only to provide its service to Ai Labs.",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep it",
        paragraphs: [
          "We keep profile data while your account exists. When you delete your account, we delete your profile and email addresses. We keep your retired member number and the record of your consents so we can show what you agreed to and that you withdrew from the newsletter.",
        ],
      },
      {
        id: "data-rights",
        heading: "Your rights",
        paragraphs: [
          "You have the right to access, correct, delete, and object to the processing of your personal data, and to receive a copy of it.",
          "You can edit your profile, download your data, turn the newsletter off, and delete your account from your account settings. For anything else, write to us through the contact form on ailabs.sv.",
        ],
      },
      {
        id: "security",
        heading: "How we protect it",
        paragraphs: [
          "Access to the database is limited to the Ai Labs team, connections are encrypted, and sign-in is handled by Clerk, so we never store your password.",
        ],
      },
      {
        id: "minors",
        heading: "People under 18",
        paragraphs: [
          "Aperture is only for people who are 18 or older. We do not knowingly keep profiles of minors.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to this notice",
        paragraphs: [
          "When this notice changes, we update the version and the date at the top of this page and tell members about changes that affect them.",
        ],
      },
    ],
  },
}
