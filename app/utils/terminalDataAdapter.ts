/**
 * Terminal Data Adapter
 * 
 * This file provides a utility function to convert centralized portfolio data
 * into the format expected by the terminal interface.
 */

import portfolioData, { Experience, Project, Skill, Award } from '@/app/data/portfolioData';
import { PortfolioData as TerminalPortfolioData } from '@/app/types/terminalTypes';

/**
 * Converts the central portfolio data into the format expected by the terminal
 */
export function convertToTerminalData(): TerminalPortfolioData {
  return {
    about: {
      name: portfolioData.personalInfo.name,
      title: portfolioData.personalInfo.titles[0],
      location: portfolioData.personalInfo.location,
      email: portfolioData.personalInfo.email,
      phone: portfolioData.personalInfo.phone,
      linkedin: portfolioData.personalInfo.linkedin,
      github: portfolioData.personalInfo.github,
      education: portfolioData.education[0].degree + ' ' + 
                portfolioData.education[0].field + ' at ' + 
                portfolioData.education[0].institution
    },
    experience: portfolioData.experiences.map((exp: Experience) => ({
      company: exp.company,
      position: exp.title,
      duration: exp.period,
      description: exp.description,
      achievements: exp.achievements || []
    })),
    projects: portfolioData.projects.map((proj: Project) => ({
      name: proj.title,
      description: proj.description,
      technologies: proj.technologies,
      github: proj.githubUrl,
      demo: proj.demoUrl,
      accuracy: ''
    })),
    skills: {
      languages: portfolioData.skills
        .filter((skill: Skill) => skill.category === 'languages')
        .map((skill: Skill) => skill.name),
      technologies: portfolioData.skills
        .filter((skill: Skill) => skill.category === 'frameworks' || skill.category === 'ml')
        .map((skill: Skill) => skill.name),
      tools: portfolioData.skills
        .filter((skill: Skill) => skill.category === 'tools')
        .map((skill: Skill) => skill.name)
    },
    awards: portfolioData.awards.map((award: Award) => ({
      name: award.title,
      position: award.issuer,
      description: award.description || award.date // Fallback to date if description is not available
    }))
  };
}
