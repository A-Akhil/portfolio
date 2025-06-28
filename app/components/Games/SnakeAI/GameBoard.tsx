'use client';

import React, { useRef, useEffect } from 'react';
import { GameState, Position, CELL_SIZE, GAME_COLORS } from '../../../types/snakeTypes';

interface GameBoardProps {
  gameState: GameState;
  pathfindingTrail: Position[];
  showAIPath: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, pathfindingTrail, showAIPath }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = GAME_COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    drawGrid(ctx, gameState.difficulty.gridSize);

    // Draw AI pathfinding trail (behind everything else)
    if (showAIPath && gameState.isAI && pathfindingTrail.length > 0) {
      drawPathfindingTrail(ctx, pathfindingTrail);
    }

    // Draw obstacles
    drawObstacles(ctx, gameState.obstacles);

    // Draw food
    drawFood(ctx, gameState.food);

    // Draw snake
    drawSnake(ctx, gameState.snake);

    // Draw game over overlay
    if (gameState.gameStatus === 'gameOver') {
      drawGameOverOverlay(ctx, canvas.width, canvas.height);
    }

    // Draw paused overlay
    if (gameState.gameStatus === 'paused') {
      drawPausedOverlay(ctx, canvas.width, canvas.height);
    }

  }, [gameState, pathfindingTrail, showAIPath]);

  const drawGrid = (ctx: CanvasRenderingContext2D, gridSize: number) => {
    ctx.strokeStyle = GAME_COLORS.grid;
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x <= gridSize; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, gridSize * CELL_SIZE);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= gridSize; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(gridSize * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }
  };

  const drawPathfindingTrail = (ctx: CanvasRenderingContext2D, trail: Position[]) => {
    if (trail.length < 2) return;

    ctx.strokeStyle = GAME_COLORS.aiTrail;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;

    ctx.beginPath();
    const firstPoint = trail[0];
    ctx.moveTo(
      firstPoint.x * CELL_SIZE + CELL_SIZE / 2,
      firstPoint.y * CELL_SIZE + CELL_SIZE / 2
    );

    for (let i = 1; i < trail.length; i++) {
      const point = trail[i];
      ctx.lineTo(
        point.x * CELL_SIZE + CELL_SIZE / 2,
        point.y * CELL_SIZE + CELL_SIZE / 2
      );
    }

    ctx.stroke();
    ctx.globalAlpha = 1;

    // Draw path points
    trail.forEach((point, index) => {
      if (index === 0 || index === trail.length - 1) return; // Skip start and end

      ctx.fillStyle = GAME_COLORS.aiTrail;
      ctx.globalAlpha = 0.4;
      ctx.fillRect(
        point.x * CELL_SIZE + CELL_SIZE / 3,
        point.y * CELL_SIZE + CELL_SIZE / 3,
        CELL_SIZE / 3,
        CELL_SIZE / 3
      );
      ctx.globalAlpha = 1;
    });
  };

  const drawObstacles = (ctx: CanvasRenderingContext2D, obstacles: Position[]) => {
    ctx.fillStyle = GAME_COLORS.obstacle;
    
    obstacles.forEach(obstacle => {
      // Draw obstacle with rounded corners
      const x = obstacle.x * CELL_SIZE + 2;
      const y = obstacle.y * CELL_SIZE + 2;
      const size = CELL_SIZE - 4;
      const radius = 4;

      ctx.beginPath();
      ctx.roundRect(x, y, size, size, radius);
      ctx.fill();

      // Add glow effect
      ctx.shadowColor = GAME_COLORS.obstacle;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  };

  const drawFood = (ctx: CanvasRenderingContext2D, food: Position) => {
    const centerX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const centerY = food.y * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE / 3;

    // Draw pulsing food
    ctx.fillStyle = GAME_COLORS.food;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    // Add glow effect
    ctx.shadowColor = GAME_COLORS.food;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw inner highlight
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(centerX - radius / 3, centerY - radius / 3, radius / 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  const drawSnake = (ctx: CanvasRenderingContext2D, snake: Position[]) => {
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      const x = segment.x * CELL_SIZE + 1;
      const y = segment.y * CELL_SIZE + 1;
      const size = CELL_SIZE - 2;

      // Draw snake segment
      ctx.fillStyle = isHead ? GAME_COLORS.snakeHead : GAME_COLORS.snake;
      ctx.beginPath();
      ctx.roundRect(x, y, size, size, isHead ? 6 : 3);
      ctx.fill();

      if (isHead) {
        // Add glow to head
        ctx.shadowColor = GAME_COLORS.snakeHead;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw eyes
        ctx.fillStyle = '#FFFFFF';
        const eyeSize = 3;
        const eyeOffset = 6;
        ctx.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize);
        ctx.fillRect(x + size - eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize);
      }
    });
  };

  const drawGameOverOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Semi-transparent background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);

    // Game Over text
    ctx.fillStyle = GAME_COLORS.ui;
    ctx.font = 'bold 32px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', width / 2, height / 2 - 20);

    ctx.font = '18px Inter';
    ctx.fillText('Press R to restart', width / 2, height / 2 + 20);
  };

  const drawPausedOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Semi-transparent background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, width, height);

    // Paused text
    ctx.fillStyle = GAME_COLORS.ui;
    ctx.font = 'bold 28px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', width / 2, height / 2 - 10);

    ctx.font = '16px Inter';
    ctx.fillText('Press SPACE to continue', width / 2, height / 2 + 20);
  };

  const canvasSize = gameState.difficulty.gridSize * CELL_SIZE;

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="border-2 border-ai-cyan rounded-lg shadow-lg shadow-ai-cyan/20"
        style={{
          maxWidth: '100%',
          maxHeight: '70vh',
          aspectRatio: '1',
        }}
      />
      
      {/* Game status indicator */}
      <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-sm text-ai-cyan">
        {gameState.isAI && (
          <span className="text-ai-purple mr-2">🤖 AI</span>
        )}
        {gameState.difficulty.level.toUpperCase()}
      </div>
    </div>
  );
};

export default GameBoard;
