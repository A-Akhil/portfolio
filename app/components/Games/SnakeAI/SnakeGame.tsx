'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

import GameBoard from './GameBoard';
import GameControls from './GameControls';
import ScoreBoard from './ScoreBoard';
import DifficultySelect from './DifficultySelect';

import { 
  GameState, 
  GameDifficulty, 
  Direction, 
  Position, 
  HighScore,
  DIFFICULTY_SETTINGS,
  INITIAL_SNAKE,
  INITIAL_DIRECTION
} from '../../../types/snakeTypes';

import { AIPathfinding } from '../../../utils/aiPathfinding';
import { GameUtils } from '../../../utils/gameUtils';

const SnakeGame: React.FC = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: { x: 10, y: 10 },
    direction: INITIAL_DIRECTION,
    gameStatus: 'waiting',
    score: 0,
    isAI: false,
    difficulty: DIFFICULTY_SETTINGS.medium,
    obstacles: [],
    pathfindingTrail: []
  });

  // UI state
  const [showDifficultySelect, setShowDifficultySelect] = useState(true);
  const [showAIPath, setShowAIPath] = useState(true);
  const [gameTime, setGameTime] = useState(0);
  const [pathEfficiency, setPathEfficiency] = useState(0);
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  // Refs
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const aiTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const aiPathfindingRef = useRef<AIPathfinding | null>(null);

  // Load high scores on mount
  useEffect(() => {
    setHighScores(GameUtils.getHighScores());
  }, []);

  // Initialize AI pathfinding when game state changes
  useEffect(() => {
    aiPathfindingRef.current = new AIPathfinding(
      gameState.difficulty.gridSize,
      gameState.obstacles,
      gameState.snake
    );
  }, [gameState.difficulty.gridSize, gameState.obstacles, gameState.snake]);

  // Handle keyboard input for manual mode
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState.isAI) return;

      const newDirection = GameUtils.getDirectionFromKey(event.key);
      if (newDirection && GameUtils.isValidDirectionChange(gameState.direction, newDirection)) {
        setGameState(prev => ({ ...prev, direction: newDirection }));
      }

      // Game controls
      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault();
          handlePlayPause();
          break;
        case 'r':
          handleReset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isAI, gameState.direction, gameState.gameStatus]);

  // Game loop
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      gameLoopRef.current = setInterval(() => {
        moveSnake();
        setGameTime(Date.now() - startTimeRef.current);
      }, gameState.difficulty.speed);

      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [gameState.gameStatus, gameState.difficulty.speed]);

  // AI decision making
  useEffect(() => {
    if (gameState.isAI && gameState.gameStatus === 'playing' && aiPathfindingRef.current) {
      aiTimeoutRef.current = setTimeout(() => {
        // Update AI pathfinding with current snake state
        aiPathfindingRef.current = new AIPathfinding(
          gameState.difficulty.gridSize,
          gameState.obstacles,
          gameState.snake
        );

        const nextDirection = aiPathfindingRef.current!.getNextDirection(
          gameState.snake[0],
          gameState.food
        );

        if (nextDirection && GameUtils.isValidDirectionChange(gameState.direction, nextDirection)) {
          setGameState(prev => ({ ...prev, direction: nextDirection }));
        }

        // Update pathfinding trail for visualization
        if (showAIPath) {
          const trail = aiPathfindingRef.current!.getPathfindingTrail(
            gameState.snake[0],
            gameState.food
          );
          setGameState(prev => ({ ...prev, pathfindingTrail: trail }));
          
          // Calculate path efficiency
          const directDistance = GameUtils.positionsEqual(gameState.snake[0], gameState.food) 
            ? 0 
            : Math.abs(gameState.snake[0].x - gameState.food.x) + Math.abs(gameState.snake[0].y - gameState.food.y);
          const efficiency = GameUtils.calculatePathEfficiency(trail, directDistance);
          setPathEfficiency(efficiency);
        }
      }, gameState.difficulty.aiDelay);

      return () => {
        if (aiTimeoutRef.current) {
          clearTimeout(aiTimeoutRef.current);
        }
      };
    }
  }, [gameState.isAI, gameState.gameStatus, gameState.snake, gameState.food, gameState.direction, showAIPath]);

  const moveSnake = useCallback(() => {
    setGameState(prevState => {
      const newSnake = GameUtils.moveSnake(prevState.snake, prevState.direction);
      const head = newSnake[0];

      // Check collisions
      if (GameUtils.isGameOver({ ...prevState, snake: newSnake })) {
        // Game over
        const finalScore = GameUtils.calculateScore(
          prevState.score,
          prevState.difficulty.level,
          prevState.isAI
        );

        // Save high score
        const highScore: HighScore = {
          difficulty: prevState.difficulty.level,
          score: finalScore,
          isAI: prevState.isAI,
          timestamp: Date.now()
        };
        GameUtils.saveHighScore(highScore);
        setHighScores(GameUtils.getHighScores());

        // Check if it's a new high score
        const currentBest = GameUtils.getHighScoreForDifficulty(
          prevState.difficulty.level,
          prevState.isAI
        );
        
        if (finalScore > currentBest) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.5, y: 0.25 }, // Top of screen, behind UI
            colors: ['#00ccff', '#00ff88', '#8b00ff']
          });
          toast.success('🏆 New High Score!', {
            duration: 4000,
            style: {
              background: '#1a1a2e',
              color: '#00ccff',
              border: '1px solid #00ccff'
            }
          });
        }

        toast.error('Game Over!', {
          duration: 3000,
          style: {
            background: '#1a1a2e',
            color: '#ff3366',
            border: '1px solid #ff3366'
          }
        });

        return {
          ...prevState,
          snake: newSnake,
          gameStatus: 'gameOver' as const,
          score: finalScore
        };
      }

      // Check food collision
      if (GameUtils.checkFoodCollision(head, prevState.food)) {
        // Food eaten - grow snake and spawn new food
        const newFood = GameUtils.generateRandomPosition(
          prevState.difficulty.gridSize,
          [...newSnake, ...prevState.obstacles]
        );

        const points = 10;
        const newScore = prevState.score + points;

        // Celebration for food
        confetti({
          particleCount: 20,
          spread: 30,
          origin: { x: 0.5, y: 0.3 }, // Above the game board
          colors: ['#00ff88', '#00ccff']
        });

        return {
          ...prevState,
          snake: newSnake, // Keep full snake (with growth)
          food: newFood,
          score: newScore
        };
      } else {
        // Normal move - remove tail
        return {
          ...prevState,
          snake: newSnake.slice(0, -1)
        };
      }
    });
  }, []);

  const handleDifficultyChange = (difficulty: GameDifficulty) => {
    const obstacles = GameUtils.generateObstacles(
      difficulty.obstacles,
      difficulty.gridSize,
      INITIAL_SNAKE
    );

    const newFood = GameUtils.generateRandomPosition(
      difficulty.gridSize,
      [...INITIAL_SNAKE, ...obstacles]
    );

    setGameState({
      snake: INITIAL_SNAKE,
      food: newFood,
      direction: INITIAL_DIRECTION,
      gameStatus: 'waiting',
      score: 0,
      isAI: gameState.isAI,
      difficulty,
      obstacles,
      pathfindingTrail: []
    });

    setShowDifficultySelect(false);
    setGameTime(0);
    setPathEfficiency(0);
  };

  const handlePlay = () => {
    setGameState(prev => ({ ...prev, gameStatus: 'playing' }));
    startTimeRef.current = Date.now();
    
    toast.success(gameState.isAI ? '🤖 AI Started!' : '🎮 Game Started!', {
      duration: 2000,
      style: {
        background: '#1a1a2e',
        color: '#00ccff',
        border: '1px solid #00ccff'
      }
    });
  };

  const handlePause = () => {
    setGameState(prev => ({ ...prev, gameStatus: 'paused' }));
  };

  const handlePlayPause = () => {
    if (gameState.gameStatus === 'playing') {
      handlePause();
    } else if (gameState.gameStatus === 'paused' || gameState.gameStatus === 'waiting') {
      handlePlay();
    }
  };

  const handleReset = () => {
    const obstacles = GameUtils.generateObstacles(
      gameState.difficulty.obstacles,
      gameState.difficulty.gridSize,
      INITIAL_SNAKE
    );

    const newFood = GameUtils.generateRandomPosition(
      gameState.difficulty.gridSize,
      [...INITIAL_SNAKE, ...obstacles]
    );

    setGameState(prev => ({
      ...prev,
      snake: INITIAL_SNAKE,
      food: newFood,
      direction: INITIAL_DIRECTION,
      gameStatus: 'waiting',
      score: 0,
      obstacles,
      pathfindingTrail: []
    }));

    setGameTime(0);
    setPathEfficiency(0);

    toast('Game Reset', {
      duration: 1500,
      style: {
        background: '#1a1a2e',
        color: '#e2e8f0'
      }
    });
  };

  const handleToggleAI = () => {
    setGameState(prev => ({ 
      ...prev, 
      isAI: !prev.isAI,
      pathfindingTrail: !prev.isAI ? [] : prev.pathfindingTrail
    }));
    
    toast(gameState.isAI ? '👤 Manual Mode' : '🤖 AI Mode', {
      duration: 2000,
      style: {
        background: '#1a1a2e',
        color: gameState.isAI ? '#00ccff' : '#8b00ff'
      }
    });
  };

  const handleToggleAIPath = () => {
    setShowAIPath(!showAIPath);
    if (!showAIPath) {
      setGameState(prev => ({ ...prev, pathfindingTrail: [] }));
    }
  };

  if (showDifficultySelect) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-ai-cyan mb-2">
            Snake AI Game
          </h2>
          <p className="text-gray-300">
            Experience classic Snake with A* pathfinding algorithm
          </p>
        </div>

        <DifficultySelect
          selectedDifficulty={gameState.difficulty}
          onDifficultyChange={handleDifficultyChange}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board - Center */}
        <div className="lg:col-span-2 flex flex-col items-center space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-ai-cyan mb-2">
              Snake AI Game
            </h2>
            <button
              onClick={() => setShowDifficultySelect(true)}
              className="text-ai-cyan/70 hover:text-ai-cyan text-sm underline"
            >
              Change Difficulty
            </button>
          </div>

          <GameBoard
            gameState={gameState}
            pathfindingTrail={gameState.pathfindingTrail}
            showAIPath={showAIPath}
          />

          <GameControls
            gameStatus={gameState.gameStatus}
            isAI={gameState.isAI}
            showAIPath={showAIPath}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            onToggleAI={handleToggleAI}
            onToggleAIPath={handleToggleAIPath}
          />
        </div>

        {/* Score Board - Right */}
        <div className="space-y-4">
          <ScoreBoard
            gameState={gameState}
            highScores={highScores}
            pathEfficiency={pathEfficiency}
            gameTime={gameTime}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SnakeGame;
