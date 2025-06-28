export interface EasterEggState {
  konamiActivated: boolean;
  asciiArtVisible: boolean;
  binaryClockVisible: boolean;
  hexPickerVisible: boolean;
  consoleMessagesActivated: boolean;
  customTheme: {
    primary: string;
    secondary: string;
    accent: string;
  } | null;
}

export interface ASCIIArt {
  id: string;
  name: string;
  art: string[];
  description: string;
  isCustom?: boolean; // Flag to identify custom generated ASCII art
}

export interface CustomASCIIArtOptions {
  density: string;
  contrast: number;
  invert: boolean;
}

export interface ConsoleMessage {
  id: string;
  message: string;
  type: 'info' | 'warn' | 'error' | 'log';
  timestamp?: Date;
}

export interface BinaryTime {
  hours: string;
  minutes: string;
  seconds: string;
  formatted: string;
}

export interface ThemeColor {
  name: string;
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
}

export const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
] as const;

export const ASCII_ART_COLLECTION: ASCIIArt[] = [
  {
    id: 'ai-brain',
    name: 'AI Brain',
    art: [
      '    ╭─────────────╮',
      '   ╱ ○ ○ ○ ○ ○ ○ ╲',
      '  ╱ ○ ╭─────────╮ ○ ╲',
      ' ╱ ○ ╱ A I   M L ╲ ○ ╲',
      '╱ ○ ╱   ╭─────╮   ╲ ○ ╲',
      '╲ ○ ╲   ╰─────╯   ╱ ○ ╱',
      ' ╲ ○ ╲ THINKING... ╱ ○ ╱',
      '  ╲ ○ ╰─────────╯ ○ ╱',
      '   ╲ ○ ○ ○ ○ ○ ○ ╱',
      '    ╰─────────────╯'
    ],
    description: 'AI/ML themed brain'
  },
  {
    id: 'code-matrix',
    name: 'Code Matrix',
    art: [
      '  ┌─┐┌─┐┌┬┐┌─┐',
      '  │  │ │ ││├┤ ',
      '  └─┘└─┘─┴┘└─┘',
      '  ╔══════════╗',
      '  ║ 01010101 ║',
      '  ║ 11000011 ║',
      '  ║ 10101010 ║',
      '  ║ 00111100 ║',
      '  ╚══════════╝'
    ],
    description: 'Binary code matrix'
  },
  {
    id: 'developer',
    name: 'Developer',
    art: [
      '      ┌─┐',
      '      ┌┴┐',
      '    ┌─┴─┴─┐',
      '    │ ● ● │',
      '    └─┬─┬─┘',
      '      │ │',
      '    ┌─┴─┴─┐',
      '    │ { } │',
      '    │  ;  │',
      '    └─────┘'
    ],
    description: 'ASCII Developer'
  }
];

export const CONSOLE_MESSAGES: ConsoleMessage[] = [
  {
    id: 'welcome',
    message: '🚀 Welcome to A Akhil\'s portfolio! You found the secret console!',
    type: 'info'
  },
  {
    id: 'konami',
    message: '🎮 Konami code activated! Easter eggs unlocked!',
    type: 'log'
  },
  {
    id: 'developer-joke',
    message: '👨‍💻 Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
    type: 'log'
  },
  {
    id: 'portfolio-stats',
    message: '📊 Portfolio stats: Built with ❤️, Next.js, and way too much coffee ☕',
    type: 'info'
  },
  {
    id: 'hiring',
    message: '💼 Psst... I\'m open to exciting AI/ML opportunities! Let\'s build the future together!',
    type: 'info'
  },
  {
    id: 'tech-stack',
    message: '🛠️ Tech Stack: React + Next.js + TypeScript + Tailwind + Framer Motion + Coffee²',
    type: 'log'
  }
];
