import { Experience } from '../types';

export const experienceList: Experience[] = [
  {
    id: "softobiz",
    role: "UI Developer",
    company: "Softobiz",
    period: "Dec 2021 — Present",
    badge: "Current Role · 4+ Years",
    description: "Developing enterprise web applications, customer portals, and internal dashboards using React.js, Angular, Next.js, and TypeScript.",
    responsibilities: [
      "Architect and maintain scalable frontend modules using React.js, Angular, and Next.js.",
      "Translate complex Figma designs and design tokens into responsive, accessible, pixel-perfect interfaces.",
      "Integrate RESTful APIs and implement predictable state management using RxJS observables.",
      "Optimize frontend asset loading, code splitting, and Core Web Vitals for fast page performance.",
      "Implement AI-powered frontend features, including real-time token streaming chat and OpenAI API integrations.",
      "Collaborate in agile cross-functional sprints with backend engineers, UX designers, and QA teams."
    ],
    techStack: ["React.js", "Angular", "Next.js", "TypeScript", "Tailwind CSS", "SCSS", "RxJS", "REST APIs"]
  },
  {
    id: "webxtechnology",
    role: "Web Designer",
    company: "WebXTechnology",
    period: "6 Months",
    badge: "6 Months Experience",
    description: "Designed and developed responsive client web interfaces, customized UI components, and ensured cross-browser compatibility.",
    responsibilities: [
      "Created responsive website layouts using HTML5, modern CSS3/SCSS, and JavaScript.",
      "Converted client wireframes and design mockups into cross-browser compatible web pages.",
      "Built reusable navigation menus, interactive forms, and responsive landing page sections.",
      "Conducted cross-browser and mobile device testing to ensure seamless responsive behavior."
    ],
    techStack: ["HTML5", "CSS3 / SCSS", "JavaScript", "Responsive Design", "UI/UX"]
  }
];
