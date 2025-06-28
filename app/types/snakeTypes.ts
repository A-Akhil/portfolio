// Game types and interfaces for Snake AI Game
export interface Position {
  x: number;
  y: number;
}

export interface GameDifficulty {
  level: 'easy' | 'medium' | 'hard' | 'nightmare';
  speed: number;           // Game tick speed (ms)
  gridSize: number;        // Board dimensions
  obstacles: number;       // Number of static obstacles
  aiDelay: number;        // AI calculation delay
  foodSpawnRate: number;  // Food generation frequency
  description: string;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameStatus: 'playing' | 'paused' | 'gameOver' | 'waiting';
  score: number;
  isAI: boolean;
  difficulty: GameDifficulty;
  obstacles: Position[];
  pathfindingTrail: Position[];
}

export interface HighScore {
  difficulty: string;
  score: number;
  isAI: boolean;
  timestamp: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface PathNode {
  position: Position;
  gCost: number;      // Distance from start
  hCost: number;      // Distance to end (heuristic)
  fCost: number;      // Total cost
  parent: PathNode | null;
}

// Difficulty configurations
export const DIFFICULTY_SETTINGS: Record<string, GameDifficulty> = {
  easy: {
    level: 'easy',
    speed: 200,           // Slow movement
    gridSize: 15,         // Small board
    obstacles: 0,         // No obstacles
    aiDelay: 100,         // Fast AI
    foodSpawnRate: 1000,
    description: 'Perfect for beginners - small board, no obstacles, slow pace'
  },
  medium: {
    level: 'medium',
    speed: 150,           // Medium movement
    gridSize: 20,         // Medium board
    obstacles: 5,         // Few obstacles
    aiDelay: 150,         // Normal AI
    foodSpawnRate: 800,
    description: 'Balanced challenge - moderate speed with some obstacles'
  },
  hard: {
    level: 'hard',
    speed: 100,           // Fast movement
    gridSize: 25,         // Large board
    obstacles: 15,        // Many obstacles
    aiDelay: 200,         // Slower AI
    foodSpawnRate: 600,
    description: 'Fast-paced action - large board with many obstacles'
  },
  nightmare: {
    level: 'nightmare',
    speed: 50,            // Very fast
    gridSize: 30,         // Huge board
    obstacles: 30,        // Maximum obstacles
    aiDelay: 300,         // Challenged AI
    foodSpawnRate: 400,
    description: 'Ultimate challenge - blazing speed, massive board, maximum obstacles'
  }
};

// Game constants
export const CELL_SIZE = 20;
export const INITIAL_SNAKE: Position[] = [{ x: 5, y: 5 }];
export const INITIAL_DIRECTION: Direction = 'right';

// Color scheme for AI/ML theme
export const GAME_COLORS = {
  background: '#0A0A0F',
  grid: '#1A1A2E',
  snake: '#00CCFF',
  snakeHead: '#0066FF',
  food: '#00FF88',
  obstacle: '#FF3366',
  aiTrail: '#8B00FF',
  ui: '#E2E8F0'
};
