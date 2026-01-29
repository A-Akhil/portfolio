/**
 * Central Portfolio Data File
 * 
 * This file contains all the data for the portfolio website in a centralized structure.
 * Update information here once and it will be reflected across the entire application.
 */

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  color: string;
  achievements?: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;  // Made optional since some projects might not have images
  githubUrl?: string; // Made optional for projects without GitHub repositories
  demoUrl?: string;
  featured?: boolean; // Made optional with default true for backward compatibility
  color?: string;     // Support old format
  gradient?: string;  // Support new format used in Projects.tsx
  icon?: string;      // For displaying emoji icons in the Projects component
  accuracy?: string;  // For displaying accuracy/metrics in the Projects component
}

export interface Skill {
  name: string;
  icon: string;
  category: 'languages' | 'frameworks' | 'tools' | 'ml' | 'other';
  level: number; // 1-5 skill level
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string;
}

export interface Publication {
  title: string;
  venue: string;
  date: string;
  description: string[];
  doi?: string;
  doiUrl?: string;
}

export interface OpenSourceContribution {
  project: string;
  role: string;
  year: string;
  description: string;
  prUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  achievements?: string[];
}

export interface PersonalInfo {
  name: string;
  titles: string[]; // Used for typewriter animation
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  bio: string[];
  resumeUrl: string;
  avatarUrl: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  awards: Award[];
  publications: Publication[];
  openSourceContributions: OpenSourceContribution[];
  education: Education[];
  socialLinks: SocialLink[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  }
}

/**
 * NOTE: This file only contains TypeScript interfaces for type safety.
 * All actual portfolio data is stored in portfolio.json and loaded via getPortfolioData().
 * Do not add hardcoded data here - update portfolio.json instead.
 */
