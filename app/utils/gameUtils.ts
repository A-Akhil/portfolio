// Game utilities and logic functions
import { Position, Direction, GameState, HighScore } from '../types/snakeTypes';

export class GameUtils {
  // Generate random position within grid bounds
  static generateRandomPosition(gridSize: number, excludePositions: Position[] = []): Position {
    let position: Position;
    let attempts = 0;
    const maxAttempts = gridSize * gridSize;

    do {
      position = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
      attempts++;
    } while (
      attempts < maxAttempts &&
      excludePositions.some(pos => this.positionsEqual(pos, position))
    );

    return position;
  }

  // Generate obstacles for difficulty levels
  static generateObstacles(count: number, gridSize: number, excludePositions: Position[]): Position[] {
    const obstacles: Position[] = [];
    
    for (let i = 0; i < count; i++) {
      const obstacle = this.generateRandomPosition(gridSize, [...excludePositions, ...obstacles]);
      obstacles.push(obstacle);
    }

    return obstacles;
  }

  // Move snake based on direction
  static moveSnake(snake: Position[], direction: Direction): Position[] {
    const head = snake[0];
    const newHead = this.getNextPosition(head, direction);
    
    return [newHead, ...snake];
  }

  // Get next position based on direction
  static getNextPosition(position: Position, direction: Direction): Position {
    switch (direction) {
      case 'up': return { x: position.x, y: position.y - 1 };
      case 'down': return { x: position.x, y: position.y + 1 };
      case 'left': return { x: position.x - 1, y: position.y };
      case 'right': return { x: position.x + 1, y: position.y };
    }
  }

  // Check if position is within grid bounds
  static isWithinBounds(position: Position, gridSize: number): boolean {
    return position.x >= 0 && position.x < gridSize && 
           position.y >= 0 && position.y < gridSize;
  }

  // Check collision with obstacles
  static checkObstacleCollision(position: Position, obstacles: Position[]): boolean {
    return obstacles.some(obstacle => this.positionsEqual(obstacle, position));
  }

  // Check collision with snake body
  static checkSelfCollision(head: Position, body: Position[]): boolean {
    return body.some(segment => this.positionsEqual(segment, head));
  }

  // Check if snake ate food
  static checkFoodCollision(head: Position, food: Position): boolean {
    return this.positionsEqual(head, food);
  }

  // Get opposite direction (to prevent instant death)
  static getOppositeDirection(direction: Direction): Direction {
    switch (direction) {
      case 'up': return 'down';
      case 'down': return 'up';
      case 'left': return 'right';
      case 'right': return 'left';
    }
  }

  // Validate direction change
  static isValidDirectionChange(currentDirection: Direction, newDirection: Direction): boolean {
    return newDirection !== this.getOppositeDirection(currentDirection);
  }

  // Calculate score based on difficulty and AI mode
  static calculateScore(basicScore: number, difficulty: string, isAI: boolean): number {
    const difficultyMultiplier = {
      easy: 1,
      medium: 1.5,
      hard: 2,
      nightmare: 3
    }[difficulty] || 1;

    const aiMultiplier = isAI ? 0.8 : 1; // Slightly lower score for AI mode
    
    return Math.floor(basicScore * difficultyMultiplier * aiMultiplier);
  }

  // High score management
  static saveHighScore(score: HighScore): void {
    const highScores = this.getHighScores();
    highScores.push(score);
    
    // Sort by score (descending) and keep top 10 per difficulty
    const sortedScores = highScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 40); // Keep top 10 for each of 4 difficulties

    localStorage.setItem('snakeHighScores', JSON.stringify(sortedScores));
  }

  static getHighScores(): HighScore[] {
    try {
      const stored = localStorage.getItem('snakeHighScores');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static getHighScoreForDifficulty(difficulty: string, isAI: boolean): number {
    const highScores = this.getHighScores();
    const filteredScores = highScores.filter(
      score => score.difficulty === difficulty && score.isAI === isAI
    );
    
    return filteredScores.length > 0 ? Math.max(...filteredScores.map(s => s.score)) : 0;
  }

  // Performance metrics
  static calculatePathEfficiency(path: Position[], directDistance: number): number {
    if (path.length === 0 || directDistance === 0) return 0;
    return Math.round((directDistance / path.length) * 100);
  }

  // Keyboard input handling
  static getDirectionFromKey(key: string): Direction | null {
    switch (key.toLowerCase()) {
      case 'arrowup':
      case 'w':
        return 'up';
      case 'arrowdown':
      case 's':
        return 'down';
      case 'arrowleft':
      case 'a':
        return 'left';
      case 'arrowright':
      case 'd':
        return 'right';
      default:
        return null;
    }
  }

  // Game state validation
  static isGameOver(gameState: GameState): boolean {
    const head = gameState.snake[0];
    
    // Check bounds
    if (!this.isWithinBounds(head, gameState.difficulty.gridSize)) {
      return true;
    }

    // Check self collision
    if (this.checkSelfCollision(head, gameState.snake.slice(1))) {
      return true;
    }

    // Check obstacle collision
    if (this.checkObstacleCollision(head, gameState.obstacles)) {
      return true;
    }

    return false;
  }

  // Helper function for position comparison
  static positionsEqual(pos1: Position, pos2: Position): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  // Generate game statistics
  static generateGameStats(gameState: GameState) {
    const totalCells = gameState.difficulty.gridSize * gameState.difficulty.gridSize;
    const occupiedCells = gameState.snake.length + gameState.obstacles.length + 1; // +1 for food
    const freeSpace = totalCells - occupiedCells;
    
    return {
      score: gameState.score,
      snakeLength: gameState.snake.length,
      difficulty: gameState.difficulty.level,
      freeSpace,
      occupiedPercentage: Math.round((occupiedCells / totalCells) * 100),
      isAI: gameState.isAI
    };
  }
}
