// A* Pathfinding Algorithm for Snake AI
import { Position, PathNode, Direction } from '../types/snakeTypes';

export class AIPathfinding {
  private gridSize: number;
  private obstacles: Position[];
  private snake: Position[];

  constructor(gridSize: number, obstacles: Position[], snake: Position[]) {
    this.gridSize = gridSize;
    this.obstacles = obstacles;
    this.snake = snake;
  }

  // Main A* pathfinding function
  findPath(start: Position, target: Position): Position[] {
    const openSet: PathNode[] = [];
    const closedSet: Set<string> = new Set();
    
    const startNode: PathNode = {
      position: start,
      gCost: 0,
      hCost: this.calculateDistance(start, target),
      fCost: 0,
      parent: null
    };
    startNode.fCost = startNode.gCost + startNode.hCost;
    
    openSet.push(startNode);

    while (openSet.length > 0) {
      // Find node with lowest fCost
      let currentNode = openSet[0];
      let currentIndex = 0;
      
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].fCost < currentNode.fCost) {
          currentNode = openSet[i];
          currentIndex = i;
        }
      }

      // Remove current node from open set
      openSet.splice(currentIndex, 1);
      closedSet.add(this.positionToString(currentNode.position));

      // Check if we reached the target
      if (this.positionsEqual(currentNode.position, target)) {
        return this.reconstructPath(currentNode);
      }

      // Check all neighbors
      const neighbors = this.getNeighbors(currentNode.position);
      
      for (const neighbor of neighbors) {
        const neighborKey = this.positionToString(neighbor);
        
        // Skip if already processed or invalid
        if (closedSet.has(neighborKey) || !this.isValidPosition(neighbor)) {
          continue;
        }

        const tentativeGCost = currentNode.gCost + 1;
        
        // Check if this neighbor is already in open set
        const existingNode = openSet.find(node => 
          this.positionsEqual(node.position, neighbor)
        );

        if (!existingNode) {
          // Add new node to open set
          const neighborNode: PathNode = {
            position: neighbor,
            gCost: tentativeGCost,
            hCost: this.calculateDistance(neighbor, target),
            fCost: 0,
            parent: currentNode
          };
          neighborNode.fCost = neighborNode.gCost + neighborNode.hCost;
          openSet.push(neighborNode);
        } else if (tentativeGCost < existingNode.gCost) {
          // Update existing node with better path
          existingNode.gCost = tentativeGCost;
          existingNode.fCost = existingNode.gCost + existingNode.hCost;
          existingNode.parent = currentNode;
        }
      }
    }

    // No path found - return empty array
    return [];
  }

  // Get the next direction for the snake to move
  getNextDirection(currentHead: Position, target: Position): Direction | null {
    const path = this.findPath(currentHead, target);
    
    if (path.length < 2) {
      // No path found or already at target
      return this.getRandomSafeDirection(currentHead);
    }

    const nextPosition = path[1]; // Skip current position
    const dx = nextPosition.x - currentHead.x;
    const dy = nextPosition.y - currentHead.y;

    if (dx === 1) return 'right';
    if (dx === -1) return 'left';
    if (dy === 1) return 'down';
    if (dy === -1) return 'up';

    return null;
  }

  // Get pathfinding trail for visualization
  getPathfindingTrail(start: Position, target: Position): Position[] {
    return this.findPath(start, target);
  }

  // Calculate Manhattan distance (heuristic)
  private calculateDistance(pos1: Position, pos2: Position): number {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
  }

  // Get valid neighbors of a position
  private getNeighbors(position: Position): Position[] {
    const neighbors: Position[] = [
      { x: position.x + 1, y: position.y },     // Right
      { x: position.x - 1, y: position.y },     // Left
      { x: position.x, y: position.y + 1 },     // Down
      { x: position.x, y: position.y - 1 }      // Up
    ];

    return neighbors.filter(neighbor => 
      neighbor.x >= 0 && neighbor.x < this.gridSize &&
      neighbor.y >= 0 && neighbor.y < this.gridSize
    );
  }

  // Check if position is valid (not obstacle or snake body)
  private isValidPosition(position: Position): boolean {
    // Check grid boundaries
    if (position.x < 0 || position.x >= this.gridSize ||
        position.y < 0 || position.y >= this.gridSize) {
      return false;
    }

    // Check obstacles
    if (this.obstacles.some(obstacle => this.positionsEqual(obstacle, position))) {
      return false;
    }

    // Check snake body (excluding head)
    if (this.snake.slice(1).some(segment => this.positionsEqual(segment, position))) {
      return false;
    }

    return true;
  }

  // Reconstruct path from target to start
  private reconstructPath(node: PathNode): Position[] {
    const path: Position[] = [];
    let current: PathNode | null = node;

    while (current !== null) {
      path.unshift(current.position);
      current = current.parent;
    }

    return path;
  }

  // Get a random safe direction when pathfinding fails
  private getRandomSafeDirection(currentHead: Position): Direction | null {
    const directions: Direction[] = ['up', 'down', 'left', 'right'];
    const safeDirections: Direction[] = [];

    for (const direction of directions) {
      const nextPos = this.getNextPosition(currentHead, direction);
      if (this.isValidPosition(nextPos)) {
        safeDirections.push(direction);
      }
    }

    if (safeDirections.length === 0) {
      return null; // No safe moves
    }

    return safeDirections[Math.floor(Math.random() * safeDirections.length)];
  }

  // Get next position based on direction
  private getNextPosition(position: Position, direction: Direction): Position {
    switch (direction) {
      case 'up': return { x: position.x, y: position.y - 1 };
      case 'down': return { x: position.x, y: position.y + 1 };
      case 'left': return { x: position.x - 1, y: position.y };
      case 'right': return { x: position.x + 1, y: position.y };
    }
  }

  // Helper functions
  private positionsEqual(pos1: Position, pos2: Position): boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  private positionToString(position: Position): string {
    return `${position.x},${position.y}`;
  }
}
