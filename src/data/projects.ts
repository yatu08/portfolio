import { Project } from '../types';

export const projectsList: Project[] = [
  {
    id: "ai-insight-hub",
    name: "AI Insight Hub",
    category: "AI Platform",
    badge: "Company Project",
    subtitle: "Enterprise AI Dashboard & Analytics Platform",
    description: "Built an internal platform for analyzing market trends, AI adoption insights, and strategic metrics. Features responsive interactive dashboards, LLM-powered report generation, and dynamic data visualization.",
    role: "Frontend Developer",
    contributions: [
      "Engineered modular React / Next.js dashboard views with clean component architecture",
      "Integrated OpenAI API for streaming responses and automated report generation",
      "Built interactive data charts and filter controls for complex multi-dimensional metrics",
      "Ensured pixel-perfect design fidelity from Figma while optimizing render performance"
    ],
    technologies: ["Next.js", "React", "TypeScript", "OpenAI API", "Data Charts", "Tailwind CSS"],
    gradient: "from-violet-600 to-indigo-500",
    highlights: ["Interactive Dashboards", "LLM API Integration", "Real-time Filtering", "Figma to Code"]
  },
  {
    id: "where-is-my-food",
    name: "WhereIsMyFood",
    category: "Food Delivery Platform",
    badge: "Company Project",
    subtitle: "Full-Featured On-Demand Food Ordering Web Application",
    description: "Built reusable UI components for an end-to-end food ordering experience, focusing on responsive layouts, seamless navigation, smooth micro-interactions, and REST API integration.",
    role: "Frontend Developer",
    contributions: [
      "Developed modular customer-facing ordering flow with intuitive menu browsing",
      "Implemented responsive layouts and cart management across mobile and desktop",
      "Integrated REST APIs for real-time order status, restaurant catalog, and checkout",
      "Authored clean SCSS stylesheets and component styles adhering to UI guidelines"
    ],
    technologies: ["React.js", "TypeScript", "REST API", "SCSS", "Responsive Design", "State Management"],
    gradient: "from-violet-500 to-fuchsia-500",
    highlights: ["Modular UI Components", "Cart State Management", "REST API Integration", "Mobile Optimization"]
  },
  {
    id: "cybonet",
    name: "Cybonet",
    category: "Enterprise Dashboard",
    badge: "Company Project",
    subtitle: "Data-Dense Enterprise Administration & Analytics Interface",
    description: "Developed enterprise dashboard UI components and frontend modules, improving usability, navigation, and rendering performance across a complex data-heavy interface.",
    role: "Frontend Developer",
    contributions: [
      "Architected scalable Angular modules and reactive components for enterprise users",
      "Built high-density data tables with sorting, multi-column filtering, and pagination",
      "Integrated REST APIs and reactive RxJS streams for real-time dashboard data sync",
      "Significantly improved UI responsiveness and reduced unnecessary component re-renders"
    ],
    technologies: ["Angular", "TypeScript", "RxJS", "SCSS", "Data Grids", "Enterprise UX"],
    gradient: "from-cyan-400 to-blue-600",
    highlights: ["Angular Component Architecture", "Complex Data Grids", "Performance Tuning", "Enterprise UI"]
  },
  {
    id: "boomcaste",
    name: "Boomcaste",
    category: "Marketing Web App",
    badge: "Company Project",
    subtitle: "High-Conversion Marketing & Engagement Platform",
    description: "Built a responsive UI system with reusable components, focused on brand visual consistency, smooth micro-interactions, and fast load times for client engagement campaigns.",
    role: "Frontend Developer",
    contributions: [
      "Translated Figma prototypes into pixel-perfect Next.js and Tailwind CSS interfaces",
      "Implemented fluid scroll animations and interactive UI components",
      "Optimized assets and frontend bundle size for rapid initial page loads and high Lighthouse scores",
      "Maintained cross-browser compatibility across Safari, Chrome, Edge, and mobile browsers"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Micro-animations", "SEO"],
    gradient: "from-amber-400 to-rose-500",
    highlights: ["Pixel-perfect Figma Conversion", "Fluid Animations", "Core Web Vitals", "Cross-browser Support"]
  },
  {
    id: "synkaa",
    name: "Synkaa",
    category: "Product Web App",
    badge: "Company Project",
    subtitle: "Collaborative Product Management & Workflow Web App",
    description: "Worked on core frontend features and mobile responsiveness improvements, modernizing legacy components and streamlining user interaction workflows across the product.",
    role: "Frontend Developer",
    contributions: [
      "Refactored older UI blocks into clean, typed React components with predictable state flow",
      "Resolved complex responsive layout bugs across tablet and mobile viewports",
      "Integrated backend endpoints with error handling and optimistic UI updates",
      "Collaborated with QA and design teams to refine component usability and accessibility"
    ],
    technologies: ["React.js", "JavaScript (ES6+)", "REST API", "SCSS", "Mobile-first", "UI Refactoring"],
    gradient: "from-emerald-400 to-teal-600",
    highlights: ["Component Modernization", "Mobile-first Refactoring", "API Integration", "UI Bug Fixing"]
  },
  {
    id: "city-hotel",
    name: "CityHotel",
    category: "Marketplace Concept",
    badge: "Professional Project",
    subtitle: "Modern Hospitality & Hotel Booking Marketplace",
    description: "Designed and prototyped a hospitality marketplace concept — structuring complete user booking flows, intuitive filter interfaces, and a clean modern visual language.",
    role: "Frontend Developer / UI Engineer",
    contributions: [
      "Crafted responsive UI views for property browsing, room detail pages, and checkout",
      "Implemented dynamic search filters for dates, price range, amenities, and location",
      "Established typography, color hierarchy, and spacing tokens based on modern design systems",
      "Ensured accessible keyboard navigation and semantic HTML structure throughout"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma", "UI/UX Architecture"],
    gradient: "from-pink-500 to-purple-600",
    highlights: ["Marketplace UI Patterns", "Dynamic Filtering", "Design System Tokens", "Accessibility"]
  },
  {
    id: "equalis",
    name: "Equalis",
    category: "Frontend UI System",
    badge: "Company Project",
    subtitle: "Comprehensive Modular Component Library & Design Tokens",
    description: "Built frontend UI components and structured layouts with a primary focus on design system consistency, token architecture, and high reusability across multiple client applications.",
    role: "Frontend Developer",
    contributions: [
      "Created reusable atomic components including inputs, modal dialogs, cards, and data badges",
      "Implemented unified theme tokens for colors, typography, elevations, and spacing",
      "Authored modular SCSS architectures with scalable mixins and responsive breakpoints",
      "Documented component usage guidelines for seamless cross-team adoption"
    ],
    technologies: ["React.js", "TypeScript", "SCSS Modules", "Design Systems", "Component Architecture"],
    gradient: "from-indigo-500 to-sky-500",
    highlights: ["Atomic Design System", "Theme Tokens", "Reusable Libraries", "Accessible Components"]
  }
];
