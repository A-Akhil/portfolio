// Centralized portfolio content typings shared across UI and terminal clients.

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ResumeResource {
  url: string;
  downloadName: string;
}

export interface ProfileEducation {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  achievements?: string[];
}

export interface ProfileSummary {
  name: string;
  titles: string[];
  summary: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  avatar: ImageAsset;
  resume: ResumeResource;
  bio: string[];
  education: ProfileEducation[];
}

export interface NavigationItem {
  label: string;
  target: string;
}

export interface TerminalLauncher {
  label: string;
  href: string;
  tooltip?: string;
}

export interface NavigationContent {
  primary: NavigationItem[];
  terminal: TerminalLauncher;
}

export type CtaAction = "download" | "scroll" | "external";

export interface CtaButton {
  label: string;
  action: CtaAction;
  target: string;
  downloadName?: string;
  newTab?: boolean;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export interface FloatingIcon {
  emoji: string;
  positionClass: string;
  animationDelay?: number;
}

export interface HeroContent {
  title?: string;
  subtitle: string;
  ctaPrimary: CtaButton;
  ctaSecondary?: CtaButton;
  socialLinks: SocialLink[];
  floatingIcons: FloatingIcon[];
}

export interface StatBadge {
  label: string;
  value: string;
  icon?: string;
}

export interface AboutContent {
  title: string;
  body: string[];
  highlightSkills: string[];
  stats?: StatBadge[];
  image?: ImageAsset;
}

export interface ExperienceEntry {
  title: string;
  company: string;
  location?: string;
  period: string;
  summary?: string;
  technologies: string[];
  achievements: string[];
  accentGradient?: string;
}

export interface ExperienceContent {
  title: string;
  description: string;
  items: ExperienceEntry[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectEntry {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  gradient?: string;
  icon?: string;
  metric?: ProjectMetric;
  featured?: boolean;
}

export interface ProjectsContent {
  title: string;
  description: string;
  cta?: CtaButton;
  items: ProjectEntry[];
}

export interface SkillEntry {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: SkillEntry[];
}

export interface SkillsContent {
  title: string;
  description: string;
  categories: SkillCategory[];
  coreCompetencies: string[];
}

export interface AwardEntry {
  title: string;
  level: string;
  position: string;
  description: string;
  year: string;
  icon?: string;
  gradient?: string;
}

export interface AwardsContent {
  title: string;
  description: string;
  items: AwardEntry[];
  stats?: StatBadge[];
}

export interface ContactMethod {
  type: string;
  label: string;
  value: string;
  href: string;
  icon?: string;
  gradient?: string;
}

export interface ContactFormCopy {
  successMessage: string;
  submitLabel?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  messagePlaceholder?: string;
}

export interface LocationContent {
  headline: string;
  body: string[];
}

export interface ContactContent {
  title: string;
  description: string;
  form: ContactFormCopy;
  methods: ContactMethod[];
  location: LocationContent;
  footer: string;
}

export interface EducationEntry extends ProfileEducation {}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  baseUrl: string;
  socialImage?: string;
  twitterHandle?: string;
}

export interface TerminalGreeting {
  intro: string[];
  prompts?: string[];
}

export interface TerminalContent {
  greeting?: TerminalGreeting;
  quickLinks?: SocialLink[];
}

export interface ContentMeta {
  version?: string;
  lastUpdated?: string;
}

export interface PortfolioData {
  profile: ProfileSummary;
  navigation: NavigationContent;
  hero: HeroContent;
  about: AboutContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  skills: SkillsContent;
  awards: AwardsContent;
  contact: ContactContent;
  education: EducationEntry[];
  seo: SeoMetadata;
  terminal?: TerminalContent;
  contentMeta?: ContentMeta;
}
