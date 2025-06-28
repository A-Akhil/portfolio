'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GameDifficulty, DIFFICULTY_SETTINGS } from '../../../types/snakeTypes';

interface DifficultySelectProps {
  selectedDifficulty: GameDifficulty;
  onDifficultyChange: (difficulty: GameDifficulty) => void;
  disabled?: boolean;
}

const DifficultySelect: React.FC<DifficultySelectProps> = ({
  selectedDifficulty,
  onDifficultyChange,
  disabled = false
}) => {
  const difficulties = Object.values(DIFFICULTY_SETTINGS);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy': return 'from-green-500 to-green-600';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'hard': return 'from-red-500 to-red-600';
      case 'nightmare': return 'from-purple-600 to-red-700';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      case 'nightmare': return '💀';
      default: return '⚪';
    }
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold text-ai-cyan mb-4">
        Select Difficulty Level
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {difficulties.map((difficulty) => {
          const isSelected = selectedDifficulty.level === difficulty.level;
          
          return (
            <motion.button
              key={difficulty.level}
              onClick={() => !disabled && onDifficultyChange(difficulty)}
              disabled={disabled}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-300
                ${isSelected 
                  ? 'border-ai-cyan bg-ai-cyan/10' 
                  : 'border-gray-600 hover:border-ai-cyan/60'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              whileHover={!disabled ? { scale: 1.02 } : {}}
              whileTap={!disabled ? { scale: 0.98 } : {}}
            >
              {/* Difficulty badge */}
              <div className={`
                absolute -top-2 -right-2 w-8 h-8 rounded-full
                bg-gradient-to-r ${getDifficultyColor(difficulty.level)}
                flex items-center justify-center text-white text-sm font-bold
                shadow-lg
              `}>
                {getDifficultyIcon(difficulty.level)}
              </div>

              <div className="text-left">
                {/* Difficulty name */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-bold capitalize">
                    {difficulty.level}
                  </h4>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-ai-cyan rounded-full flex items-center justify-center"
                    >
                      <span className="text-black text-xs">✓</span>
                    </motion.div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                  {difficulty.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-400">
                    Grid: <span className="text-white">{difficulty.gridSize}×{difficulty.gridSize}</span>
                  </div>
                  <div className="text-gray-400">
                    Speed: <span className="text-white">{difficulty.speed}ms</span>
                  </div>
                  <div className="text-gray-400">
                    Obstacles: <span className="text-white">{difficulty.obstacles}</span>
                  </div>
                  <div className="text-gray-400">
                    AI Delay: <span className="text-white">{difficulty.aiDelay}ms</span>
                  </div>
                </div>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-lg bg-ai-cyan/5 pointer-events-none"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Current selection summary */}
      <motion.div
        key={selectedDifficulty.level}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
      >
        <h4 className="text-ai-cyan font-semibold mb-2">
          Selected: {selectedDifficulty.level.toUpperCase()} {getDifficultyIcon(selectedDifficulty.level)}
        </h4>
        <div className="text-sm text-gray-300 space-y-1">
          <div>Board Size: {selectedDifficulty.gridSize} × {selectedDifficulty.gridSize} cells</div>
          <div>Game Speed: {selectedDifficulty.speed}ms per move</div>
          <div>Obstacles: {selectedDifficulty.obstacles} static barriers</div>
          <div>AI Response Time: {selectedDifficulty.aiDelay}ms</div>
        </div>
      </motion.div>
    </div>
  );
};

export default DifficultySelect;
