import type { PortfolioData } from '@/app/types/portfolioData';
import type { PortfolioDataInput } from './portfolioSchema';

const PROJECT_GRADIENT_FALLBACKS = [
  'from-ai-blue to-ai-purple',
  'from-ai-cyan to-ai-blue',
  'from-ai-purple to-ai-pink',
];

const AWARD_GRADIENT_FALLBACKS = [
  'from-yellow-400 to-yellow-600',
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
];

const CONTACT_GRADIENT_FALLBACKS = [
  'from-ai-cyan to-ai-blue',
  'from-green-400 to-green-600',
  'from-purple-400 to-purple-600',
  'from-red-400 to-red-600',
];

const CONTACT_ICON_FALLBACKS: Record<string, string> = {
  email: 'FaEnvelope',
  phone: 'FaPhone',
  linkedin: 'FaLinkedin',
  github: 'FaGithub',
};

const AWARD_ICON_FALLBACK = 'FaTrophy';
const PROJECT_ICON_FALLBACK = 'FiBox';

export function normalizePortfolioData(raw: PortfolioDataInput): PortfolioData {
  const experience = {
    ...raw.experience,
    items: raw.experience.items.map((item) => ({
      ...item,
      achievements: item.achievements ?? [],
    })),
  };

  const projects = {
    ...raw.projects,
    items: raw.projects.items.map((project, index) => ({
      ...project,
      gradient:
        project.gradient ??
        PROJECT_GRADIENT_FALLBACKS[index % PROJECT_GRADIENT_FALLBACKS.length],
      icon: project.icon ?? PROJECT_ICON_FALLBACK,
      featured: project.featured ?? true,
    })),
  };

  const awards = {
    ...raw.awards,
    items: raw.awards.items.map((award, index) => ({
      ...award,
      gradient:
        award.gradient ??
        AWARD_GRADIENT_FALLBACKS[index % AWARD_GRADIENT_FALLBACKS.length],
      icon: award.icon ?? AWARD_ICON_FALLBACK,
    })),
    stats: raw.awards.stats?.map((stat) => ({
      ...stat,
      icon: stat.icon ?? AWARD_ICON_FALLBACK,
    })),
  };

  const contact = {
    ...raw.contact,
    methods: raw.contact.methods.map((method, index) => {
      const normalizedType = method.type.toLowerCase();
      return {
        ...method,
        gradient:
          method.gradient ??
          CONTACT_GRADIENT_FALLBACKS[index % CONTACT_GRADIENT_FALLBACKS.length],
        icon:
          method.icon ??
          CONTACT_ICON_FALLBACKS[normalizedType] ??
          CONTACT_ICON_FALLBACKS[method.label.toLowerCase()] ??
          'FaPaperPlane',
      };
    }),
    form: {
      submitLabel: 'Send Message',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      ...raw.contact.form,
    },
  };

  const terminal = raw.terminal
    ? {
        ...raw.terminal,
        quickLinks: raw.terminal.quickLinks ?? raw.hero.socialLinks,
      }
    : undefined;

  return {
    ...raw,
    experience,
    projects,
    awards,
    contact,
    terminal,
  };
}
