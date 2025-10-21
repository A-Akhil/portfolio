import { TerminalLine, TerminalCommand, FileSystemItem, PortfolioData } from '@/app/types/terminalTypes';
import { convertToTerminalData } from '@/app/utils/terminalDataAdapter';

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
    // Use the terminal data adapter to convert from the central data source
    this.portfolioData = convertToTerminalData();
  }

  private initializeFileSystem(): void {
    const aboutLines: string[] = [
      `Name: ${this.portfolioData.about.name}`,
      `Title: ${this.portfolioData.about.primaryTitle}`,
      `Location: ${this.portfolioData.about.location}`,
      `Email: ${this.portfolioData.about.email}`
    ];

    if (this.portfolioData.about.phone) {
      aboutLines.push(`Phone: ${this.portfolioData.about.phone}`);
    }

    if (this.portfolioData.about.summary) {
      aboutLines.push('', `Summary: ${this.portfolioData.about.summary}`);
    }

    if (this.portfolioData.about.education.length > 0) {
      aboutLines.push('', 'Education:');
      this.portfolioData.about.education.forEach((entry) => {
        aboutLines.push(`- ${entry}`);
      });
    }

    if (this.portfolioData.about.links.length > 0) {
      aboutLines.push('', 'Links:');
      this.portfolioData.about.links.forEach((link) => {
        aboutLines.push(`- ${link.label}: ${link.url}`);
      });
    }

    if (this.portfolioData.about.bio.length > 0) {
      aboutLines.push('', 'Bio:');
      this.portfolioData.about.bio.forEach((paragraph) => {
        aboutLines.push(`- ${paragraph}`);
      });
    }

    this.fileSystem = {
      name: 'akhil',
      type: 'directory',
      children: [
        {
          name: 'about.txt',
          type: 'file',
          content: aboutLines.join('\n')
        },
        {
          name: 'experience',
          type: 'directory',
          children: this.portfolioData.experience.map(exp => ({
            name: `${exp.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`,
            type: 'file',
            content: `# ${exp.company}
Role: ${exp.position}
Duration: ${exp.duration}
Summary: ${exp.summary || 'N/A'}

Technologies: ${exp.technologies.length > 0 ? exp.technologies.join(', ') : 'N/A'}

Achievements:
${exp.achievements.length > 0 ? exp.achievements.map((achievement) => `- ${achievement}`).join('\n') : '- N/A'}`
          }))
        },
        {
          name: 'projects',
          type: 'directory',
          children: this.portfolioData.projects.map(project => {
            const metricLine = project.metric ? `${project.metric.label}: ${project.metric.value}` : 'Metric: N/A';
            const linkLines = [
              project.github ? `GitHub: ${project.github}` : '',
              project.demo ? `Demo: ${project.demo}` : ''
            ].filter(Boolean);

            return {
              name: `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`,
              type: 'file',
              content: [`# ${project.name}`,
                `Description: ${project.description}`,
                `Technologies: ${project.technologies.length > 0 ? project.technologies.join(', ') : 'N/A'}`,
                metricLine,
                ...linkLines
              ].join('\n')
            };
          })
        },
        {
          name: 'skills',
          type: 'directory',
          children: [
            ...this.portfolioData.skills.categories.map((category) => ({
              name: `${category.id || category.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`,
              type: 'file',
              content: category.skills.join('\n')
            })),
            this.portfolioData.skills.coreCompetencies.length > 0
              ? {
                  name: 'core-competencies.txt',
                  type: 'file',
                  content: this.portfolioData.skills.coreCompetencies.join('\n')
                }
              : undefined
          ].filter(Boolean) as FileSystemItem[]
        },
        {
          name: 'awards',
          type: 'directory',
          children: this.portfolioData.awards.map(award => ({
            name: `${award.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`,
            type: 'file',
            content: `${award.title}
Level: ${award.level}
Position: ${award.position}
Year: ${award.year}
Description: ${award.description}`
          }))
        },
        {
          name: 'contact.txt',
          type: 'file',
          content: [
            ...this.portfolioData.contact.methods.map((method) => `${method.label}: ${method.value} (${method.url})`),
            '',
            'Location:',
            ...this.portfolioData.contact.location,
            this.portfolioData.contact.footer ? `\n${this.portfolioData.contact.footer}` : ''
          ].filter(Boolean).join('\n')
        }
      ]
    };
  }

  private initializeCommands(): void {
    const commands: TerminalCommand[] = [
      {
        name: 'help',
        description: 'Display available commands',
        usage: 'help [command]',
        handler: (args: string[]) => this.handleHelp(args)
      },
      {
        name: 'ls',
        description: 'List directory contents',
        usage: 'ls [directory]',
        handler: (args: string[]) => this.handleLs(args)
      },
      {
        name: 'cat',
        description: 'View file contents',
        usage: 'cat <file>',
        handler: (args: string[]) => this.handleCat(args)
      },
      {
        name: 'cd',
        description: 'Change directory',
        usage: 'cd <directory>',
        handler: (args: string[]) => this.handleCd(args)
      },
      {
        name: 'pwd',
        description: 'Print working directory',
        usage: 'pwd',
        handler: () => this.handlePwd()
      },
      {
        name: 'whoami',
        description: 'Display profile overview',
        usage: 'whoami',
        handler: () => this.handleWhoami()
      },
      {
        name: 'ask',
        description: 'Ask questions about my experience, skills, or projects',
        usage: 'ask "your question here"',
        handler: (args: string[]) => this.handleAsk(args)
      },
      {
        name: 'clear',
        description: 'Clear the terminal screen',
        usage: 'clear',
        handler: () => this.handleClear()
      },
      {
        name: 'find',
        description: 'Search for files with specific content',
        usage: 'find <search-term>',
        handler: (args: string[]) => this.handleFind(args)
      },
      {
        name: 'tree',
        description: 'Display file system as a tree',
        usage: 'tree',
        handler: () => this.handleTree()
      }
    ];

    commands.forEach(command => {
      this.commands.set(command.name, command);
    });
  }

  async processCommand(input: string): Promise<TerminalLine[]> {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      return [];
    }
    
    // Using non-null assertion after we've verified the array won't be empty
    const parts = trimmedInput.match(/(?:[^\s"']+|["'][^"']*["'])+/g);
    
    if (!parts || parts.length === 0) {
      return [{
        type: 'error',
        content: 'Invalid command format. Type \'help\' for available commands.',
        timestamp: new Date()
      }];
    }
    
    const commandName = parts[0].toLowerCase(); // Now TypeScript knows parts[0] exists
    // Since we've validated parts exists, we can safely slice it
    const args = parts.slice(1).map(arg => arg.replace(/^['"]|['"]$/g, ''));
    
    const command = this.commands.get(commandName);
    
    if (!command) {
      return [{
        type: 'error',
        content: `Command not found: ${commandName}. Type 'help' for available commands.`,
        timestamp: new Date()
      }];
    }
    
    try {
      return await command.handler(args);
    } catch (error) {
      return [{
        type: 'error',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      }];
    }
  }

  private handleHelp(args: string[]): TerminalLine[] {
    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const command = this.commands.get(commandName);
      
      if (!command) {
        return [{
          type: 'error',
          content: `No help found for '${commandName}'. Type 'help' for all commands.`,
          timestamp: new Date()
        }];
      }
      
      return [
        {
          type: 'info',
          content: `Help for '${commandName}':`,
          timestamp: new Date()
        },
        {
          type: 'output',
          content: command.description,
          timestamp: new Date()
        },
        {
          type: 'output',
          content: `Usage: ${command.usage}`,
          timestamp: new Date()
        }
      ];
    }
    
    // Display all commands
    const commandsHelp = Array.from(this.commands.values()).map(command => 
      `${command.name.padEnd(10)} - ${command.description}`
    );
    
    return [
      {
        type: 'info',
        content: '💻 Available Commands:',
        timestamp: new Date()
      },
      {
        type: 'output',
        content: commandsHelp.join('\n'),
        timestamp: new Date()
      }
    ];
  }

  private handleLs(args: string[]): TerminalLine[] {
    const targetPath = args[0] || this.currentDirectory;
    let directory: FileSystemItem | null;
    
    if (targetPath.startsWith('/')) {
      directory = this.getFileSystemItemByPath(targetPath);
    } else {
      const fullPath = this.resolvePath(targetPath);
      directory = this.getFileSystemItemByPath(fullPath);
    }
    
    if (!directory) {
      return [{
        type: 'error',
        content: `Directory not found: ${targetPath}`,
        timestamp: new Date()
      }];
    }
    
    if (directory.type !== 'directory') {
      return [{
        type: 'error',
        content: `Not a directory: ${targetPath}`,
        timestamp: new Date()
      }];
    }
    
    const files = directory.children || [];
    const output = files.map(file => {
      const isDir = file.type === 'directory';
      return isDir ? 
        `\x1b[34m${file.name}/\x1b[0m` : // Blue for directories
        file.name;
    });
    
    return [{
      type: 'output',
      content: output.join('  '),
      timestamp: new Date()
    }];
  }

  private handleCat(args: string[]): TerminalLine[] {
    if (args.length === 0) {
      return [{
        type: 'error',
        content: 'Usage: cat <file>',
        timestamp: new Date()
      }];
    }
    
    const filePath = args[0];
    const fullPath = filePath.startsWith('/') ? filePath : this.resolvePath(filePath);
    const file = this.getFileSystemItemByPath(fullPath);
    
    if (!file) {
      return [{
        type: 'error',
        content: `File not found: ${filePath}`,
        timestamp: new Date()
      }];
    }
    
    if (file.type !== 'file') {
      return [{
        type: 'error',
        content: `Not a file: ${filePath}`,
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
      return [];
    }
    
    const path = args[0];
    let newPath;
    
    if (path === '..') {
      const parts = this.currentDirectory.split('/');
      if (parts.length > 3) { // Don't go above /home/akhil
        parts.pop();
        newPath = parts.join('/');
      } else {
        newPath = '/home/akhil';
      }
    } else if (path === '~' || path === '/') {
      newPath = '/home/akhil';
    } else if (path.startsWith('/')) {
      newPath = path;
    } else {
      newPath = this.resolvePath(path);
    }
    
    const target = this.getFileSystemItemByPath(newPath);
    
    if (!target) {
      return [{
        type: 'error',
        content: `Directory not found: ${path}`,
        timestamp: new Date()
      }];
    }
    
    if (target.type !== 'directory') {
      return [{
        type: 'error',
        content: `Not a directory: ${path}`,
        timestamp: new Date()
      }];
    }
    
    this.currentDirectory = newPath;
    return [];
  }

  private handlePwd(): TerminalLine[] {
    return [{
      type: 'output',
      content: this.currentDirectory,
      timestamp: new Date()
    }];
  }

  private handleWhoami(): TerminalLine[] {
    const lines: TerminalLine[] = [];
    const headline = `👨‍💻 ${this.portfolioData.about.name} - ${this.portfolioData.about.primaryTitle}`.trim();
    const summaryLine = this.portfolioData.about.summary ? `🧭 ${this.portfolioData.about.summary}` : null;
    const primaryEducation = this.portfolioData.about.education[0];
    const educationLine = primaryEducation ? `🎓 ${primaryEducation}` : null;

    lines.push({
      type: 'info',
      content: headline,
      timestamp: new Date()
    });

    if (summaryLine) {
      lines.push({
        type: 'output',
        content: summaryLine,
        timestamp: new Date()
      });
    }

    if (educationLine) {
      lines.push({
        type: 'output',
        content: educationLine,
        timestamp: new Date()
      });
    }

    lines.push({
      type: 'output',
      content: `📍 ${this.portfolioData.about.location}`,
      timestamp: new Date()
    });

    lines.push({
      type: 'output',
      content: `🔬 ${this.portfolioData.experience.length} research experiences across DRDO, ISRO, Samsung`,
      timestamp: new Date()
    });

    const notableMetric = this.portfolioData.projects.find((project) => project.metric)?.metric;
    const projectSummary = notableMetric
      ? `🚀 ${this.portfolioData.projects.length} major projects (${notableMetric.label}: ${notableMetric.value})`
      : `🚀 ${this.portfolioData.projects.length} major projects`;

    lines.push({
      type: 'output',
      content: projectSummary,
      timestamp: new Date()
    });

    lines.push({
      type: 'output',
      content: `🏆 ${this.portfolioData.awards.length} awards including national hackathons`,
      timestamp: new Date()
    });

    return lines;
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
    const lowerQuestion = question.toLowerCase();
    const formatProjectMetric = (project: PortfolioData['projects'][number]) => {
      if (project.metric) {
        return `${project.metric.label}: ${project.metric.value}`;
      }
      return 'Metric: N/A';
    };
    
    // Check for name question
    if (lowerQuestion.match(/(?:what|who)(?:'s| is| are)?\s+(?:your|the)?\s*(?:name|called)/i)) {
      return [
        {
          type: 'info',
          content: '👋 Personal Information:',
          timestamp: new Date()
        },
        {
          type: 'output',
          content: `My name is ${this.portfolioData.about.name}. I'm a ${this.portfolioData.about.primaryTitle}.`,
          timestamp: new Date()
        }
      ];
    }
    
    // Enhanced regex matching for specific company experiences
    // Match queries like "what did you do at ISRO" or "tell me about your work at DRDO"
    const companyRegex = /(?:what|tell|about|you|your|work|do|did|experience|role|responsibility|responsibilities|project|projects)\s+(?:at|in|with|for)?\s*([a-z\-]+)/i;
    const companyAltRegex = /([a-z\-]{2,})\s+(?:work|experience|project|role|job|internship)/i;
    
    let companyMatches = lowerQuestion.match(companyRegex);
    if (!companyMatches) {
      companyMatches = lowerQuestion.match(companyAltRegex);
    }
    
    if (companyMatches && companyMatches[1]) {
      const keywordFromQuestion = companyMatches[1].toLowerCase().trim();
      
      // Use a data-driven approach to find matching experiences
      // Search directly in the company names and descriptions
      const matchedExperience = this.portfolioData.experience.filter(exp => {
        const companyLower = exp.company.toLowerCase();
        const descLower = exp.summary.toLowerCase();
        
        // Check if the company name or description contains the keyword
        return companyLower.includes(keywordFromQuestion) || 
               descLower.includes(keywordFromQuestion);
      });
      
      if (matchedExperience.length > 0) {
        return [
          {
            type: 'info',
            content: `🔬 My Experience at ${matchedExperience[0].company}:`,
            timestamp: new Date()
          },
          ...matchedExperience.map(exp => ({
            type: 'output' as const,
            content: `• Position: ${exp.position}\n• Duration: ${exp.duration}\n• Summary: ${exp.summary}\n\nAchievements:${exp.achievements.length > 0 ? exp.achievements.map(achievement => `\n- ${achievement}`).join('') : '\n- N/A'}`,
            timestamp: new Date()
          }))
        ];
      }
      
      // If no experience match, try matching project by keyword from question
      const projectKeyword = keywordFromQuestion;
      const matchedProjects = this.portfolioData.projects.filter(project => 
        project.name.toLowerCase().includes(projectKeyword) || 
        project.description.toLowerCase().includes(projectKeyword) ||
        project.technologies.some(tech => tech.toLowerCase().includes(projectKeyword))
      );
      
      if (matchedProjects.length > 0) {
        return [
          {
            type: 'info',
            content: `🚀 Projects related to "${companyMatches[1]}":`,
            timestamp: new Date()
          },
          ...matchedProjects.map(project => ({
            type: 'output' as const,
            content: `• ${project.name}: ${project.description}\n  Technologies: ${project.technologies.join(', ')}\n  ${formatProjectMetric(project)}`,
            timestamp: new Date()
          }))
        ];
      }
    }
    
    // Project topic matching - look for specific technologies or domains in projects
    // Enhanced to capture more variations of language/technology queries
    const techMatchRegexes = [
      /(?:project|projects)?\s+(?:with|using|about|on|in)\s+([a-z\s]+)/i,
      /([a-z\s]+)\s+(?:project|projects)/i,
      /tell\s+(?:me)?\s+about\s+(?:your)?\s+([a-z\s]+)\s+(?:project|projects)/i
    ];
    
    let techMatches = null;
    for (const regex of techMatchRegexes) {
      techMatches = lowerQuestion.match(regex);
      if (techMatches && techMatches[1]) break;
    }
    
    if (techMatches && techMatches[1]) {
      const techKeyword = techMatches[1].toLowerCase().trim();
      const matchedProjects = this.portfolioData.projects.filter(project => 
        project.technologies.some(tech => tech.toLowerCase().includes(techKeyword)) ||
        project.description.toLowerCase().includes(techKeyword) ||
        project.name.toLowerCase().includes(techKeyword)
      );
      
      if (matchedProjects.length > 0) {
        return [
          {
            type: 'info',
            content: `🚀 Projects related to "${techMatches[1]}":`,
            timestamp: new Date()
          },
          ...matchedProjects.map(project => ({
            type: 'output' as const,
            content: `• ${project.name}: ${project.description}\n  Technologies: ${project.technologies.join(', ')}\n  ${formatProjectMetric(project)}`,
            timestamp: new Date()
          }))
        ];
      }
    }
    
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('work') || lowerQuestion.includes('internship')) {
      return [
        {
          type: 'info',
          content: '🔬 My Research Experience:',
          timestamp: new Date()
        },
        ...this.portfolioData.experience.map(exp => ({
          type: 'output' as const,
          content: `• ${exp.company} (${exp.duration}): ${exp.summary}`,
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
          content: `• ${project.name}: ${project.description} (${formatProjectMetric(project)})`,
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
      const categorySummaries = this.portfolioData.skills.categories.slice(0, 2).map((category) => {
        const preview = category.skills.slice(0, 6).join(', ');
        return `${category.label}: ${preview}${category.skills.length > 6 ? ', ...' : ''}`;
      });

      const coreSummary = this.portfolioData.skills.coreCompetencies.slice(0, 6).join(', ');

      return [
        {
          type: 'info',
          content: '💻 My Technical Skills:',
          timestamp: new Date()
        },
        ...categorySummaries.map((summary) => ({
          type: 'output' as const,
          content: summary,
          timestamp: new Date()
        })),
        coreSummary
          ? {
              type: 'output' as const,
              content: `Core Competencies: ${coreSummary}${this.portfolioData.skills.coreCompetencies.length > 6 ? ', ...' : ''}`,
              timestamp: new Date()
            }
          : undefined,
        {
          type: 'output',
          content: '\nUse "cd skills && ls" to explore all skills!',
          timestamp: new Date()
        }
      ].filter(Boolean) as TerminalLine[];
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
          content: `• ${award.title} (${award.level}): ${award.position}`,
          timestamp: new Date()
        }))
      ];
    }
    
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach')) {
      const contactLines = this.portfolioData.contact.methods.map((method) =>
        `${method.label}: ${method.url || method.value}`
      );
      const locationLines = this.portfolioData.contact.location.length > 0
        ? ['Location:', ...this.portfolioData.contact.location]
        : [];

      return [
        {
          type: 'info',
          content: '📧 Contact Information:',
          timestamp: new Date()
        },
        ...contactLines.map((line) => ({
          type: 'output' as const,
          content: line,
          timestamp: new Date()
        })),
        ...locationLines.map((line) => ({
          type: 'output' as const,
          content: line,
          timestamp: new Date()
        }))
      ];
    }
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
        content: 'Usage: find <search-term>',
        timestamp: new Date()
      }];
    }
    
    const searchTerm = args[0].toLowerCase();
    const matches: string[] = [];

    const searchInDirectory = (dir: FileSystemItem, path: string) => {
      if (dir.children) {
        for (const item of dir.children) {
          const itemPath = `${path}/${item.name}`;
          
          if (item.type === 'file' && item.content && 
              item.content.toLowerCase().includes(searchTerm)) {
            matches.push(`${itemPath} - contains "${searchTerm}"`);
          }
          
          if (item.type === 'directory') {
            searchInDirectory(item, itemPath);
          }
        }
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
      const result: string[] = [];
      const connector = isLast ? '└── ' : '├── ';
      
      result.push(prefix + connector + dir.name + (dir.type === 'directory' ? '/' : ''));
      
      const childPrefix = prefix + (isLast ? '    ' : '│   ');
      
      if (dir.children) {
        const children = [...dir.children];
        for (let i = 0; i < children.length; i++) {
          const childItem = children[i];
          const isLastChild = i === children.length - 1;
          
          if (childItem.type === 'directory') {
            result.push(...buildTree(childItem, childPrefix, isLastChild));
          } else {
            result.push(childPrefix + (isLastChild ? '└── ' : '├── ') + childItem.name);
          }
        }
      }
      
      return result;
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
      return items
        .filter(item => item.type === 'directory' && item.name.startsWith(partial))
        .map(item => item.name);
    } else if (command === 'cat') {
      return items
        .filter(item => item.type === 'file' && item.name.startsWith(partial))
        .map(item => item.name);
    }
    
    return [];
  }

  public getCurrentDirectoryPath(): string {
    return this.currentDirectory;
  }

  private getCurrentDirectory(): FileSystemItem | null {
    return this.getFileSystemItemByPath(this.currentDirectory);
  }

  private getFileSystemItemByPath(path: string): FileSystemItem | null {
    const normalizedPath = path === '/' ? '/home/akhil' : path;
    const pathParts = normalizedPath.split('/').filter(p => p);
    
    if (pathParts.length === 0) {
      return this.fileSystem;
    }
    
    if (pathParts[0] !== 'home' || pathParts.length < 2 || pathParts[1] !== 'akhil') {
      return null; // Only allow paths under /home/akhil
    }
    
    let current = this.fileSystem;
    
    // Skip 'home' and 'akhil' as we've already validated them
    for (let i = 2; i < pathParts.length; i++) {
      const part = pathParts[i];
      const children = current.children || [];
      const child = children.find(c => c.name === part);
      
      if (!child) {
        return null;
      }
      
      current = child;
    }
    
    return current;
  }

  private resolvePath(relativePath: string): string {
    if (relativePath === '.' || relativePath === './') {
      return this.currentDirectory;
    }
    
    if (relativePath === '..' || relativePath === '../') {
      const parts = this.currentDirectory.split('/');
      if (parts.length > 3) { // Don't go above /home/akhil
        parts.pop();
        return parts.join('/');
      }
      return '/home/akhil';
    }
    
    if (relativePath.startsWith('./')) {
      relativePath = relativePath.substring(2);
    }
    
    if (relativePath.startsWith('/')) {
      return relativePath;
    }
    
    return `${this.currentDirectory}/${relativePath}`;
  }
}

export default CommandProcessor;
