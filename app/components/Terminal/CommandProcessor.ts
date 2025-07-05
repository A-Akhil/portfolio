import { TerminalLine, TerminalCommand, FileSystemItem, PortfolioData } from '../../types/terminalTypes';

class CommandProcessor {
  private commands: Map<string, TerminalCommand> = new Map();
  private currentDirectory: string = '/home/akhil';
  private fileSystem!: FileSystemItem;
  private portfolioData!: PortfolioData;

  constructor() {
    this.initializePortfolioData();
    this.initializeFileSystem();
    this.initializeCommands();
  }

  private initializePortfolioData(): void {
    // Data from rough_note.md analysis
    this.portfolioData = {
      about: {
        name: 'A Akhil',
        title: 'AI/ML Developer & Researcher',
        location: 'Kollemcode, Kanyakumari, Tamil Nadu',
        email: 'akhilarul324@gmail.com',
        phone: '[REDACTED]',
        linkedin: 'a-akhil-16b396201',
        github: 'A-Akhil',
        education: 'B.Tech CSE with AI-ML Specialization at SRM Institute (2022-Present)'
      },
      experience: [
        {
          company: 'CAIR-DRDO',
          position: 'Research Intern',
          duration: 'Dec 2024 - Present',
          description: 'Web scraper with LLM capabilities',
          achievements: ['Developed intelligent web scraping system', 'Integrated LLM for data processing']
        },
        {
          company: 'ISSDC-ISRO',
          position: 'Research Intern',
          duration: 'Dec 2024 - Jan 2025',
          description: 'Recommendation engine for PRADAN website',
          achievements: ['Built recommendation system', 'Enhanced user experience for PRADAN platform']
        },
        {
          company: 'CVRDE-DRDO',
          position: 'Research Intern',
          duration: 'Jul 2024 - Aug 2024',
          description: 'AI model for BLDC motor lifespan prediction',
          achievements: ['Achieved 92% accuracy in motor lifespan prediction', 'Developed AI models for industrial applications']
        },
        {
          company: 'Samsung R&D',
          position: 'Research Intern',
          duration: 'Jan 2024 - Jul 2024',
          description: 'Generative AI LLM with web scraper',
          achievements: ['Built generative AI system with 85% accuracy', 'Integrated web scraping capabilities']
        }
      ],
      projects: [
        {
          name: 'Machine Learning for Diabetic Prediction',
          description: 'AI system for early diabetic diagnosis',
          technologies: ['Java', 'Machine Learning'],
          accuracy: '88%'
        },
        {
          name: 'Advanced Traffic Sign Detection',
          description: 'Computer vision system for traffic sign recognition',
          technologies: ['Python', 'Computer Vision', 'OpenCV'],
          accuracy: '79% error reduction'
        },
        {
          name: 'Real-time Parking Detection',
          description: 'Smart parking system using computer vision',
          technologies: ['Python', 'OpenCV', 'Machine Learning'],
          accuracy: '94%'
        },
        {
          name: 'Mental Health Assessment System',
          description: 'AI-powered mental health evaluation platform',
          technologies: ['Flask', 'Python', 'LLM'],
          accuracy: '95%'
        },
        {
          name: 'Cloud and Fog Removal using GAN',
          description: 'Image enhancement using Generative Adversarial Networks',
          technologies: ['PyTorch', 'Deep Learning', 'GAN'],
          accuracy: '84% improvement'
        },
        {
          name: 'Real-time Crime Detection',
          description: 'Surveillance system for crime detection and prevention',
          technologies: ['Python', 'Machine Learning', 'Computer Vision'],
          accuracy: '90%'
        },
        {
          name: 'AI-Generated Text Detection',
          description: 'System to identify AI-generated content',
          technologies: ['Python', 'Machine Learning', 'NLP'],
          accuracy: '92%'
        },
        {
          name: 'Chat Application',
          description: 'Real-time messaging platform',
          technologies: ['Java', 'Firebase', 'Android'],
          accuracy: '500+ users'
        }
      ],
      skills: {
        languages: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'MATLAB', 'SQL', 'HTML/CSS', 'Bash'],
        technologies: ['Linux', 'GitHub', 'ReactJS', 'NextJS', 'NodeJS', 'ExpressJS', 'Git', 'MongoDB', 'MySQL', 'PostgreSQL', 'Kubernetes', 'AWS', 'Azure'],
        tools: ['VS Code', 'Android Studio', 'IntelliJ IDEA', 'Eclipse', 'PyCharm', 'Docker']
      },
      awards: [
        {
          name: 'MIT Anna University Hackathon',
          position: '1st Prize',
          description: 'Won first place in prestigious hackathon'
        },
        {
          name: 'IEEE GRSS Hackathon',
          position: '1st Prize',
          description: 'NASA-supported hackathon winner'
        },
        {
          name: 'Smart Campus Hackathon',
          position: '1st Place',
          description: 'Campus innovation competition winner'
        },
        {
          name: 'Smart India Hackathon',
          position: 'Final Round',
          description: 'National-level hackathon finalist'
        },
        {
          name: 'Dark Pattern Buster Hackathon',
          position: 'Final Round',
          description: 'UX/UI ethics hackathon finalist'
        }
      ]
    };
  }

  private initializeFileSystem(): void {
    this.fileSystem = {
      name: 'akhil',
      type: 'directory',
      children: [
        {
          name: 'about.txt',
          type: 'file',
          content: `Name: ${this.portfolioData.about.name}
Title: ${this.portfolioData.about.title}
Location: ${this.portfolioData.about.location}
Email: ${this.portfolioData.about.email}
Phone: ${this.portfolioData.about.phone}
LinkedIn: ${this.portfolioData.about.linkedin}
GitHub: ${this.portfolioData.about.github}
Education: ${this.portfolioData.about.education}`
        },
        {
          name: 'experience',
          type: 'directory',
          children: this.portfolioData.experience.map(exp => ({
            name: `${exp.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`,
            type: 'file',
            content: `# ${exp.company}
Position: ${exp.position}
Duration: ${exp.duration}
Description: ${exp.description}

Achievements:
${exp.achievements.map(achievement => `- ${achievement}`).join('\n')}`
          }))
        },
        {
          name: 'projects',
          type: 'directory',
          children: this.portfolioData.projects.map(project => ({
            name: `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`,
            type: 'file',
            content: `# ${project.name}
Description: ${project.description}
Technologies: ${project.technologies.join(', ')}
Accuracy/Impact: ${project.accuracy || 'N/A'}`
          }))
        },
        {
          name: 'skills',
          type: 'directory',
          children: [
            {
              name: 'languages.txt',
              type: 'file',
              content: this.portfolioData.skills.languages.join('\n')
            },
            {
              name: 'technologies.txt',
              type: 'file',
              content: this.portfolioData.skills.technologies.join('\n')
            },
            {
              name: 'tools.txt',
              type: 'file',
              content: this.portfolioData.skills.tools.join('\n')
            }
          ]
        },
        {
          name: 'awards',
          type: 'directory',
          children: this.portfolioData.awards.map(award => ({
            name: `${award.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`,
            type: 'file',
            content: `${award.name}
Position: ${award.position}
Description: ${award.description}`
          }))
        },
        {
          name: 'contact.txt',
          type: 'file',
          content: `Email: ${this.portfolioData.about.email}
Phone: ${this.portfolioData.about.phone}
LinkedIn: https://linkedin.com/in/${this.portfolioData.about.linkedin}
GitHub: https://github.com/${this.portfolioData.about.github}`
        }
      ]
    };
  }

  private initializeCommands(): void {
    const commands: TerminalCommand[] = [
      {
        name: 'help',
        description: 'Show available commands',
        usage: 'help [command]',
        handler: this.handleHelp.bind(this)
      },
      {
        name: 'ls',
        description: 'List directory contents',
        usage: 'ls [directory]',
        handler: this.handleLs.bind(this)
      },
      {
        name: 'cat',
        description: 'Display file contents',
        usage: 'cat <filename>',
        handler: this.handleCat.bind(this)
      },
      {
        name: 'cd',
        description: 'Change directory',
        usage: 'cd <directory>',
        handler: this.handleCd.bind(this)
      },
      {
        name: 'pwd',
        description: 'Print working directory',
        usage: 'pwd',
        handler: this.handlePwd.bind(this)
      },
      {
        name: 'whoami',
        description: 'Display user information',
        usage: 'whoami',
        handler: this.handleWhoami.bind(this)
      },
      {
        name: 'ask',
        description: 'Ask questions about my portfolio',
        usage: 'ask "your question"',
        handler: this.handleAsk.bind(this)
      },
      {
        name: 'clear',
        description: 'Clear terminal screen',
        usage: 'clear',
        handler: this.handleClear.bind(this)
      },
      {
        name: 'find',
        description: 'Find files by name',
        usage: 'find <search_term>',
        handler: this.handleFind.bind(this)
      },
      {
        name: 'tree',
        description: 'Show directory tree structure',
        usage: 'tree',
        handler: this.handleTree.bind(this)
      }
    ];

    commands.forEach(cmd => this.commands.set(cmd.name, cmd));
  }

  async processCommand(input: string): Promise<TerminalLine[]> {
    const parts = this.parseCommand(input);
    const commandName = parts[0];
    const args = parts.slice(1);

    const command = this.commands.get(commandName);
    if (!command) {
      return [{
        type: 'error',
        content: `Command '${commandName}' not found. Type 'help' for available commands.`,
        timestamp: new Date()
      }];
    }

    try {
      const result = await command.handler(args);
      return Array.isArray(result) ? result : [result];
    } catch (error) {
      return [{
        type: 'error',
        content: `Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      }];
    }
  }

  private parseCommand(input: string): string[] {
    // Simple command parsing - can be enhanced for quoted arguments
    return input.trim().split(/\s+/);
  }

  private handleHelp(args: string[]): TerminalLine[] {
    if (args.length > 0) {
      const command = this.commands.get(args[0]);
      if (command) {
        return [
          {
            type: 'info',
            content: `${command.name} - ${command.description}`,
            timestamp: new Date()
          },
          {
            type: 'output',
            content: `Usage: ${command.usage}`,
            timestamp: new Date()
          }
        ];
      } else {
        return [{
          type: 'error',
          content: `Unknown command: ${args[0]}`,
          timestamp: new Date()
        }];
      }
    }

    const helpText = Array.from(this.commands.values())
      .map(cmd => `  ${cmd.name.padEnd(12)} - ${cmd.description}`)
      .join('\n');

    return [
      {
        type: 'info',
        content: 'Available commands:',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: helpText,
        timestamp: new Date()
      },
      {
        type: 'output',
        content: '\nTip: Use "ask" to ask me questions about my experience and projects!',
        timestamp: new Date()
      }
    ];
  }

  private handleLs(args: string[]): TerminalLine[] {
    const targetPath = args[0] || this.currentDirectory;
    const currentDir = this.getCurrentDirectory();
    
    if (!currentDir || currentDir.type !== 'directory') {
      return [{
        type: 'error',
        content: 'Not a directory',
        timestamp: new Date()
      }];
    }

    const items = currentDir.children || [];
    
    if (items.length === 0) {
      return [{
        type: 'output',
        content: 'Empty directory',
        timestamp: new Date()
      }];
    }

    // Create formatted listing
    const directories = items.filter(item => item.type === 'directory');
    const files = items.filter(item => item.type === 'file');
    
    let output = '';
    
    // List directories first
    if (directories.length > 0) {
      output += 'Directories:\n';
      directories.forEach(dir => {
        output += `  \x1b[34m${dir.name}/\x1b[0m\n`;
      });
    }
    
    // Then list files
    if (files.length > 0) {
      if (directories.length > 0) output += '\n';
      output += 'Files:\n';
      files.forEach(file => {
        output += `  \x1b[32m${file.name}\x1b[0m\n`;
      });
    }

    return [{
      type: 'output',
      content: output.trim(),
      timestamp: new Date()
    }];
  }

  private handleCat(args: string[]): TerminalLine[] {
    if (args.length === 0) {
      return [{
        type: 'error',
        content: 'Usage: cat <filename>',
        timestamp: new Date()
      }];
    }

    const filename = args[0];
    const currentDir = this.getCurrentDirectory();
    
    if (!currentDir || currentDir.type !== 'directory') {
      return [{
        type: 'error',
        content: 'Not in a directory',
        timestamp: new Date()
      }];
    }

    const file = currentDir.children?.find(item => item.name === filename && item.type === 'file');
    
    if (!file) {
      return [{
        type: 'error',
        content: `File '${filename}' not found`,
        timestamp: new Date()
      }];
    }

    return [{
      type: 'output',
      content: file.content || '',
      timestamp: new Date()
    }];
  }

  private handleCd(args: string[]): TerminalLine[] {
    if (args.length === 0) {
      this.currentDirectory = '/home/akhil';
      return [{
        type: 'success',
        content: 'Changed to home directory',
        timestamp: new Date()
      }];
    }

    const targetDir = args[0];
    
    if (targetDir === '..') {
      // Go up one directory
      const pathParts = this.currentDirectory.split('/').filter(p => p);
      if (pathParts.length > 2) { // Don't go above /home/akhil
        pathParts.pop();
        this.currentDirectory = '/' + pathParts.join('/');
      }
      return [{
        type: 'success',
        content: `Changed to ${this.currentDirectory}`,
        timestamp: new Date()
      }];
    }

    // Check if target directory exists
    const currentDir = this.getCurrentDirectory();
    const targetDirItem = currentDir?.children?.find(item => 
      item.name === targetDir && item.type === 'directory'
    );

    if (!targetDirItem) {
      return [{
        type: 'error',
        content: `Directory '${targetDir}' not found`,
        timestamp: new Date()
      }];
    }

    this.currentDirectory = `${this.currentDirectory}/${targetDir}`.replace('//', '/');
    return [{
      type: 'success',
      content: `Changed to ${this.currentDirectory}`,
      timestamp: new Date()
    }];
  }

  private handlePwd(): TerminalLine[] {
    return [{
      type: 'output',
      content: this.currentDirectory,
      timestamp: new Date()
    }];
  }

  private handleWhoami(): TerminalLine[] {
    return [
      {
        type: 'info',
        content: '👨‍💻 A Akhil - AI/ML Developer & Researcher',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: `🎓 ${this.portfolioData.about.education}`,
        timestamp: new Date()
      },
      {
        type: 'output',
        content: `📍 ${this.portfolioData.about.location}`,
        timestamp: new Date()
      },
      {
        type: 'output',
        content: `🔬 ${this.portfolioData.experience.length} research experiences at DRDO, ISRO, Samsung`,
        timestamp: new Date()
      },
      {
        type: 'output',
        content: `🚀 ${this.portfolioData.projects.length} major projects with 79-95% accuracy rates`,
        timestamp: new Date()
      },
      {
        type: 'output',
        content: `🏆 ${this.portfolioData.awards.length} hackathon awards including MIT, IEEE, Smart India`,
        timestamp: new Date()
      }
    ];
  }

  private handleAsk(args: string[]): TerminalLine[] {
    const question = args.join(' ').replace(/['"]/g, '');
    
    if (!question) {
      return [{
        type: 'error',
        content: 'Usage: ask "your question about my experience, projects, or skills"',
        timestamp: new Date()
      }];
    }

    // Simple Q&A logic - can be enhanced with better NLP
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('work') || lowerQuestion.includes('internship')) {
      return [
        {
          type: 'info',
          content: '🔬 My Research Experience:',
          timestamp: new Date()
        },
        ...this.portfolioData.experience.map(exp => ({
          type: 'output' as const,
          content: `• ${exp.company} (${exp.duration}): ${exp.description}`,
          timestamp: new Date()
        }))
      ];
    }
    
    if (lowerQuestion.includes('project')) {
      return [
        {
          type: 'info',
          content: '🚀 My Key Projects:',
          timestamp: new Date()
        },
        ...this.portfolioData.projects.slice(0, 5).map(project => ({
          type: 'output' as const,
          content: `• ${project.name}: ${project.description} (${project.accuracy})`,
          timestamp: new Date()
        })),
        {
          type: 'output',
          content: '\nUse "ls projects && cat <project-name>.md" for detailed info!',
          timestamp: new Date()
        }
      ];
    }
    
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology')) {
      return [
        {
          type: 'info',
          content: '💻 My Technical Skills:',
          timestamp: new Date()
        },
        {
          type: 'output',
          content: `Languages: ${this.portfolioData.skills.languages.slice(0, 6).join(', ')}...`,
          timestamp: new Date()
        },
        {
          type: 'output',
          content: `Technologies: ${this.portfolioData.skills.technologies.slice(0, 6).join(', ')}...`,
          timestamp: new Date()
        },
        {
          type: 'output',
          content: '\nUse "cd skills && ls" to explore all skills!',
          timestamp: new Date()
        }
      ];
    }
    
    if (lowerQuestion.includes('award') || lowerQuestion.includes('achievement')) {
      return [
        {
          type: 'info',
          content: '🏆 My Awards & Achievements:',
          timestamp: new Date()
        },
        ...this.portfolioData.awards.map(award => ({
          type: 'output' as const,
          content: `• ${award.name}: ${award.position}`,
          timestamp: new Date()
        }))
      ];
    }
    
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach')) {
      return [
        {
          type: 'info',
          content: '📧 Contact Information:',
          timestamp: new Date()
        },
        {
          type: 'output',
          content: `Email: ${this.portfolioData.about.email}`,
          timestamp: new Date()
        },
        {
          type: 'output',
          content: `LinkedIn: https://linkedin.com/in/${this.portfolioData.about.linkedin}`,
          timestamp: new Date()
        },
        {
          type: 'output',
          content: `GitHub: https://github.com/${this.portfolioData.about.github}`,
          timestamp: new Date()
        }
      ];
    }
    
    // Default response
    return [
      {
        type: 'info',
        content: `🤔 Interesting question: "${question}"`,
        timestamp: new Date()
      },
      {
        type: 'output',
        content: 'I can help you learn about my:',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: '• Experience & internships (ask "tell me about your experience")',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: '• Projects & achievements (ask "what projects have you worked on?")',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: '• Skills & technologies (ask "what are your skills?")',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: '• Awards & recognition (ask "what awards have you won?")',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: '• Contact information (ask "how can I contact you?")',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: '\nOr explore the filesystem with "ls", "cd", and "cat" commands!',
        timestamp: new Date()
      }
    ];
  }

  private handleClear(): TerminalLine[] {
    // This will be handled specially by the parent component
    return [{
      type: 'info',
      content: 'CLEAR_SCREEN',
      timestamp: new Date()
    }];
  }

  private handleFind(args: string[]): TerminalLine[] {
    if (args.length === 0) {
      return [{
        type: 'error',
        content: 'Usage: find <search_term>',
        timestamp: new Date()
      }];
    }

    const searchTerm = args[0].toLowerCase();
    const matches: string[] = [];

    const searchInDirectory = (dir: FileSystemItem, path: string) => {
      if (dir.children) {
        dir.children.forEach(child => {
          const fullPath = `${path}/${child.name}`;
          if (child.name.toLowerCase().includes(searchTerm)) {
            matches.push(fullPath);
          }
          if (child.type === 'directory') {
            searchInDirectory(child, fullPath);
          }
        });
      }
    };

    searchInDirectory(this.fileSystem, '/home/akhil');

    if (matches.length === 0) {
      return [{
        type: 'output',
        content: `No files found containing "${searchTerm}"`,
        timestamp: new Date()
      }];
    }

    return [
      {
        type: 'info',
        content: `Found ${matches.length} matches:`,
        timestamp: new Date()
      },
      {
        type: 'output',
        content: matches.join('\n'),
        timestamp: new Date()
      }
    ];
  }

  private handleTree(): TerminalLine[] {
    const buildTree = (dir: FileSystemItem, prefix: string = '', isLast: boolean = true): string[] => {
      const lines: string[] = [];
      const connector = isLast ? '└── ' : '├── ';
      const name = dir.type === 'directory' ? `\x1b[34m${dir.name}/\x1b[0m` : `\x1b[32m${dir.name}\x1b[0m`;
      
      if (prefix !== '') {
        lines.push(prefix + connector + name);
      } else {
        lines.push(name);
      }

      if (dir.children) {
        const children = dir.children;
        children.forEach((child, index) => {
          const isLastChild = index === children.length - 1;
          const newPrefix = prefix + (isLast ? '    ' : '│   ');
          lines.push(...buildTree(child, newPrefix, isLastChild));
        });
      }

      return lines;
    };

    const tree = buildTree(this.fileSystem);
    
    return [
      {
        type: 'info',
        content: 'Portfolio Directory Structure:',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: tree.join('\n'),
        timestamp: new Date()
      }
    ];
  }

  getCompletions(command: string, partial: string): string[] {
    const currentDir = this.getCurrentDirectory();
    if (!currentDir || currentDir.type !== 'directory') {
      return [];
    }

    const items = currentDir.children || [];
    
    if (command === 'cd') {
      // Only show directories for cd command
      return items
        .filter(item => item.type === 'directory' && item.name.startsWith(partial))
        .map(item => item.name);
    } else if (command === 'cat') {
      // Only show files for cat command
      return items
        .filter(item => item.type === 'file' && item.name.startsWith(partial))
        .map(item => item.name);
    }
    
    return [];
  }

  private getCurrentDirectory(): FileSystemItem | null {
    const pathParts = this.currentDirectory.split('/').filter(p => p);
    let current = this.fileSystem;
    
    // If we're at root (/home/akhil), return the root fileSystem
    if (pathParts.length === 2 && pathParts[0] === 'home' && pathParts[1] === 'akhil') {
      return current;
    }
    
    // Navigate to current directory, starting from the 3rd part (after /home/akhil)
    for (let i = 2; i < pathParts.length; i++) {
      const part = pathParts[i];
      const child = current.children?.find(c => c.name === part && c.type === 'directory');
      if (!child) {
        console.error(`Directory '${part}' not found in path: ${this.currentDirectory}`);
        return null;
      }
      current = child;
    }
    
    return current;
  }
}

export default CommandProcessor;
