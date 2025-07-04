'use client';

import { useEffect } from 'react';
import { CONSOLE_MESSAGES } from '../../types/easterEggTypes';

interface ConsoleMessagesProps {
  isActivated: boolean;
  konamiActivated: boolean;
}

const ConsoleMessages: React.FC<ConsoleMessagesProps> = ({ 
  isActivated, 
  konamiActivated 
}) => {
  useEffect(() => {
    if (isActivated) {
      // Welcome message
      const welcomeMsg = CONSOLE_MESSAGES.find(msg => msg.id === 'welcome');
      if (welcomeMsg) {
        console.log(`%c${welcomeMsg.message}`, 'color: #00CCFF; font-size: 16px; font-weight: bold;');
      }

      // Portfolio stats
      const statsMsg = CONSOLE_MESSAGES.find(msg => msg.id === 'portfolio-stats');
      if (statsMsg) {
        console.log(`%c${statsMsg.message}`, 'color: #00FF88; font-size: 14px;');
      }

      // Tech stack
      const techMsg = CONSOLE_MESSAGES.find(msg => msg.id === 'tech-stack');
      if (techMsg) {
        console.log(`%c${techMsg.message}`, 'color: #8B00FF; font-size: 14px;');
      }

      // Developer joke
      setTimeout(() => {
        const jokeMsg = CONSOLE_MESSAGES.find(msg => msg.id === 'developer-joke');
        if (jokeMsg) {
          console.log(`%c${jokeMsg.message}`, 'color: #FFFF00; font-size: 14px;');
        }
      }, 2000);

      // Hiring message
      setTimeout(() => {
        const hiringMsg = CONSOLE_MESSAGES.find(msg => msg.id === 'hiring');
        if (hiringMsg) {
          console.log(`%c${hiringMsg.message}`, 'color: #FF6600; font-size: 15px; font-weight: bold;');
        }
      }, 4000);

      // Add ASCII art to console
      setTimeout(() => {
        console.log(`%c
    ╭─────────────╮
   ╱ ○ ○ ○ ○ ○ ○ ╲
  ╱ ○ ╭─────────╮ ○ ╲
 ╱ ○ ╱ A AKHIL ╲ ○ ╲
╱ ○ ╱  PORTFOLIO ╲ ○ ╲
╲ ○ ╲  AI/ML DEV ╱ ○ ╱
 ╲ ○ ╲ ENGINEER ╱ ○ ╱
  ╲ ○ ╰─────────╯ ○ ╱
   ╲ ○ ○ ○ ○ ○ ○ ╱
    ╰─────────────╯`, 'color: #00CCFF; font-family: monospace;');
      }, 6000);

      // Hidden commands info
      setTimeout(() => {
        console.log(`%c🔧 HIDDEN COMMANDS:`, 'color: #FF3366; font-size: 16px; font-weight: bold;');
        console.log(`%cTry these commands in the console:`, 'color: #00CCFF; font-size: 14px;');
        console.log(`%c• portfolio.skills() - Show technical skills`, 'color: #00FF88; font-family: monospace;');
        console.log(`%c• portfolio.experience() - Show work experience`, 'color: #00FF88; font-family: monospace;');
        console.log(`%c• portfolio.projects() - List all projects`, 'color: #00FF88; font-family: monospace;');
        console.log(`%c• portfolio.contact() - Get contact info`, 'color: #00FF88; font-family: monospace;');
        console.log(`%c• portfolio.eastereggs() - Find all easter eggs`, 'color: #00FF88; font-family: monospace;');
      }, 8000);
    }
  }, [isActivated]);

  useEffect(() => {
    if (konamiActivated) {
      const konamiMsg = CONSOLE_MESSAGES.find(msg => msg.id === 'konami');
      if (konamiMsg) {
        console.log(`%c${konamiMsg.message}`, 'color: #FF3366; font-size: 18px; font-weight: bold;');
      }
    }
  }, [konamiActivated]);

  // Add global portfolio object with hidden commands
  useEffect(() => {
    if (isActivated && typeof window !== 'undefined') {
      (window as any).portfolio = {
        skills: () => {
          console.log(`%c🛠️ TECHNICAL SKILLS:`, 'color: #00CCFF; font-size: 16px; font-weight: bold;');
          console.log(`%cLanguages: Python, Java, C++, JavaScript, TypeScript, MATLAB, SQL`, 'color: #00FF88;');
          console.log(`%cFrameworks: React, Next.js, Node.js, Express.js, Flask, PyTorch`, 'color: #00FF88;');
          console.log(`%cCloud: AWS, Azure, Docker, Kubernetes`, 'color: #00FF88;');
          console.log(`%cDatabases: MongoDB, MySQL, PostgreSQL`, 'color: #00FF88;');
          console.log(`%cAI/ML: Machine Learning, Computer Vision, NLP, Deep Learning`, 'color: #00FF88;');
        },
        
        experience: () => {
          console.log(`%c💼 WORK EXPERIENCE:`, 'color: #8B00FF; font-size: 16px; font-weight: bold;');
          console.log(`%c1. CAIR-DRDO (Dec 2024 - Present): Web scraper with LLM capabilities`, 'color: #FFFF00;');
          console.log(`%c2. ISSDC-ISRO (Dec 2024 - Jan 2025): Recommendation engine for PRADAN`, 'color: #FFFF00;');
          console.log(`%c3. CVRDE-DRDO (Jul 2024 - Aug 2024): AI model for BLDC motor prediction (92% accuracy)`, 'color: #FFFF00;');
          console.log(`%c4. Samsung R&D (Jan 2024 - Jul 2024): Generative AI LLM with web scraper (85% accuracy)`, 'color: #FFFF00;');
        },
        
        projects: () => {
          console.log(`%c🚀 KEY PROJECTS:`, 'color: #FF6600; font-size: 16px; font-weight: bold;');
          console.log(`%c• ML Diabetic Prediction (88% accuracy)`, 'color: #00CCFF;');
          console.log(`%c• Traffic Sign Detection (79% error reduction)`, 'color: #00CCFF;');
          console.log(`%c• Real-time Parking Detection (94% accuracy)`, 'color: #00CCFF;');
          console.log(`%c• Mental Health Assessment System (95% accuracy)`, 'color: #00CCFF;');
          console.log(`%c• Cloud and Fog Removal using GAN (84% improvement)`, 'color: #00CCFF;');
          console.log(`%c• Real-time Crime Detection (90% accuracy)`, 'color: #00CCFF;');
          console.log(`%c• AI-Generated Text Detection (92% accuracy)`, 'color: #00CCFF;');
          console.log(`%c• Chat Application (500+ users)`, 'color: #00CCFF;');
        },
        
        contact: () => {
          console.log(`%c📧 CONTACT INFORMATION:`, 'color: #FF3366; font-size: 16px; font-weight: bold;');
          console.log(`%cEmail: akhilarul324@gmail.com`, 'color: #00FF88;');
          console.log(`%cPhone: [REDACTED]`, 'color: #00FF88;');
          console.log(`%cLinkedIn: linkedin.com/in/a-akhil-16b396201`, 'color: #00FF88;');
          console.log(`%cGitHub: github.com/A-Akhil`, 'color: #00FF88;');
          console.log(`%cLocation: Kollemcode, Kanyakumari, Tamil Nadu`, 'color: #00FF88;');
        },
        
        eastereggs: () => {
          console.log(`%c🥚 EASTER EGGS FOUND:`, 'color: #8B00FF; font-size: 16px; font-weight: bold;');
          console.log(`%c• ✅ Console Commands (You found this!)`, 'color: #00FF88;');
          console.log(`%c• 🎮 Konami Code (↑↑↓↓←→←→BA)`, 'color: #FFFF00;');
          console.log(`%c• 🎨 ASCII Art Gallery`, 'color: #FFFF00;');
          console.log(`%c• ⏰ Binary Clock`, 'color: #FFFF00;');
          console.log(`%c• 🎨 Hex Color Picker`, 'color: #FFFF00;');
          console.log(`%c• 🐍 Snake AI Game`, 'color: #FFFF00;');
          console.log(`%c• 📊 Algorithm Visualizer`, 'color: #FFFF00;');
          console.log(`%cKeep exploring for more surprises! 🔍`, 'color: #00CCFF; font-style: italic;');
        }
      };

      console.log(`%c🎯 Global 'portfolio' object added! Try 'portfolio.skills()' or any other command!`, 'color: #FF6600; font-size: 14px; font-weight: bold;');
    }
  }, [isActivated]);

  return null; // This component doesn't render anything visible
};

export default ConsoleMessages;
