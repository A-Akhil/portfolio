// Terminal Types
export interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success' | 'info';
  content: string;
  timestamp: Date;
}

export interface TerminalCommand {
  name: string;
  description: string;
  usage: string;
  handler: (args: string[]) => Promise<TerminalLine[]> | TerminalLine[];
}

export interface FileSystemItem {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileSystemItem[];
}

export interface PortfolioData {
  about: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    education: string;
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    accuracy?: string;
    github?: string;
    demo?: string;
  }>;
  skills: {
    languages: string[];
    technologies: string[];
    tools: string[];
  };
  awards: Array<{
    name: string;
    position: string;
    description: string;
  }>;
}
