/**
 * Terminal Data Adapter
 * 
 * This file provides a utility function to convert centralized portfolio data
 * into the format expected by the terminal interface.
 */

import { getPortfolioData } from '@/app/utils/getPortfolioData';
import type { PortfolioData as NormalizedPortfolioData } from '@/app/types/portfolioData';
import type { PortfolioData as TerminalPortfolioData, TerminalLink } from '@/app/types/terminalTypes';

function ensureUrl(url?: string): string {
  if (!url) {
    return '';
  }
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return url.startsWith('/') ? url : `https://${url}`;
}

function deriveEducationEntries(data: NormalizedPortfolioData): string[] {
  const profileEducation = data.profile.education || [];
  const standaloneEducation = data.education || [];
  const merged = profileEducation.length > 0 ? profileEducation : standaloneEducation;

  return merged.map((entry) => {
    const degree = entry.degree ? `${entry.degree}` : '';
    const field = entry.field ? `${entry.field}` : '';
    const institution = entry.institution ? ` at ${entry.institution}` : '';
    const period = entry.period ? ` (${entry.period})` : '';
    const fieldPart = degree && field ? ` in ${field}` : field ? field : '';
    return `${degree}${fieldPart}${institution}${period}`.trim();
  }).filter(Boolean);
}

function buildProfileLinks(data: NormalizedPortfolioData): TerminalLink[] {
  const links: TerminalLink[] = [];

  if (data.profile.linkedin) {
    links.push({ label: 'LinkedIn', url: ensureUrl(data.profile.linkedin) });
  }
  if (data.profile.github) {
    links.push({ label: 'GitHub', url: ensureUrl(data.profile.github) });
  }
  if (data.profile.resume?.url) {
    links.push({ label: 'Resume', url: ensureUrl(data.profile.resume.url) });
  }
  if (data.terminal?.quickLinks?.length) {
    data.terminal.quickLinks.forEach((quickLink) => {
      if (quickLink.url) {
        links.push({ label: quickLink.label, url: ensureUrl(quickLink.url), icon: quickLink.icon });
      }
    });
  }

  const uniqueLinks = new Map<string, TerminalLink>();
  links.forEach((link) => {
    if (!uniqueLinks.has(link.url)) {
      uniqueLinks.set(link.url, link);
    }
  });

  return Array.from(uniqueLinks.values());
}

function sanitizeUrlField(url?: string): string | undefined {
  if (!url || url === '#') {
    return undefined;
  }
  return ensureUrl(url);
}

/**
 * Converts the central portfolio data into the format expected by the terminal
 */
export function convertToTerminalData(): TerminalPortfolioData {
  const data = getPortfolioData();
  const aboutSummary = data.profile.summary || data.hero.subtitle || '';
  const educationEntries = deriveEducationEntries(data);
  const profileLinks = buildProfileLinks(data);

  return {
    about: {
      name: data.profile.name,
      primaryTitle: data.profile.titles[0] || '',
      titles: data.profile.titles,
      summary: aboutSummary,
      location: data.profile.location,
      email: data.profile.email,
      phone: data.profile.phone,
      links: profileLinks,
      education: educationEntries,
      bio: (data.profile.bio && data.profile.bio.length > 0)
        ? data.profile.bio
        : data.about.body || []
    },
    experience: data.experience.items.map((item) => ({
      company: item.company,
      position: item.title,
      duration: item.period,
      summary: item.summary || '',
      achievements: item.achievements || [],
      technologies: item.technologies || []
    })),
    projects: data.projects.items.map((project) => ({
      name: project.title,
      description: project.description,
      technologies: project.technologies || [],
      metric: project.metric,
      github: sanitizeUrlField(project.githubUrl),
      demo: sanitizeUrlField(project.demoUrl)
    })),
    skills: {
      categories: data.skills.categories.map((category) => ({
        id: category.id,
        label: category.label,
        skills: category.skills.map((skill) => skill.name)
      })),
      coreCompetencies: data.skills.coreCompetencies
    },
    awards: data.awards.items.map((award) => ({
      title: award.title,
      level: award.level,
      position: award.position,
      description: award.description,
      year: award.year
    })),
    contact: {
      methods: data.contact.methods.map((method) => ({
        label: method.label,
        value: method.value,
        url: ensureUrl(method.href)
      })),
      location: data.contact.location.body,
      footer: data.contact.footer
    }
  };
}
