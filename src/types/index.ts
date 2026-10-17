export type SkillCategory = 
  | 'Frontend Frameworks'
  | 'Languages'
  | 'Styling'
  | 'Development'
  | 'Tools'
  | 'AI Frontend Integrations';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number;
  tag: string;
  index: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  badge: 'Company Project' | 'Professional Project';
  subtitle: string;
  description: string;
  role: string;
  contributions: string[];
  technologies: string[];
  gradient: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  badge: string;
  description?: string;
  responsibilities: string[];
  techStack?: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
