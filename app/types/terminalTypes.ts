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

export interface TerminalLink {
  label: string;
  url: string;
  icon?: string;
}

export interface PortfolioData {
  about: {
    name: string;
    primaryTitle: string;
    titles: string[];
    summary: string;
    location: string;
    email: string;
    phone?: string;
    links: TerminalLink[];
    education: string[];
    bio: string[];
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    summary: string;
    achievements: string[];
    technologies: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    metric?: {
      label: string;
      value: string;
    };
    github?: string;
    demo?: string;
  }>;
  skills: {
    categories: Array<{
      id: string;
      label: string;
      skills: string[];
    }>;
    coreCompetencies: string[];
  };
  awards: Array<{
    title: string;
    level: string;
    position: string;
    description: string;
    year: string;
  }>;
  contact: {
    methods: Array<{
      label: string;
      value: string;
      url: string;
    }>;
    location: string[];
    footer?: string;
  };
}
