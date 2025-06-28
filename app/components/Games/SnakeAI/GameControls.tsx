'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Bot, User } from 'lucide-react';

interface GameControlsProps {
  gameStatus: 'playing' | 'paused' | 'gameOver' | 'waiting';
  isAI: boolean;
  showAIPath: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onToggleAI: () => void;
  onToggleAIPath: () => void;
  disabled?: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameStatus,
  isAI,
  showAIPath,
  onPlay,
  onPause,
  onReset,
  onToggleAI,
  onToggleAIPath,
  disabled = false
}) => {
  const canPlay = gameStatus === 'paused' || gameStatus === 'waiting';
  const canPause = gameStatus === 'playing';
  const canReset = gameStatus !== 'waiting';

  return (
    <div className="space-y-4">
      {/* Main Controls */}
      <div className="flex gap-3 justify-center">
        {/* Play/Pause Button */}
        <motion.button
          onClick={canPlay ? onPlay : onPause}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
            transition-all duration-300 min-w-[120px] justify-center
            ${canPlay
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30'
              : 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-600/30'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
        >
          {canPlay ? (
            <>
              <Play size={20} fill="currentColor" />
              Play
            </>
          ) : (
            <>
              <Pause size={20} />
              Pause
            </>
          )}
        </motion.button>

        {/* Reset Button */}
        <motion.button
          onClick={onReset}
          disabled={!canReset || disabled}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
            bg-red-600 hover:bg-red-700 text-white transition-all duration-300
            shadow-lg shadow-red-600/30 min-w-[120px] justify-center
            ${(!canReset || disabled) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          whileHover={!disabled && canReset ? { scale: 1.05 } : {}}
          whileTap={!disabled && canReset ? { scale: 0.95 } : {}}
        >
          <RotateCcw size={20} />
          Reset
        </motion.button>
      </div>

      {/* AI Controls */}
      <div className="space-y-3">
        {/* AI Mode Toggle */}
        <motion.button
          onClick={onToggleAI}
          disabled={disabled || gameStatus === 'playing'}
          className={`
            w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg
            border-2 transition-all duration-300 font-semibold
            ${isAI
              ? 'border-ai-purple bg-ai-purple/20 text-ai-purple'
              : 'border-ai-cyan bg-ai-cyan/20 text-ai-cyan'
            }
            ${(disabled || gameStatus === 'playing') ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
          `}
          whileHover={!disabled && gameStatus !== 'playing' ? { scale: 1.02 } : {}}
          whileTap={!disabled && gameStatus !== 'playing' ? { scale: 0.98 } : {}}
        >
          {isAI ? (
            <>
              <Bot size={24} />
              AI Mode: ON
              <div className="w-2 h-2 bg-ai-purple rounded-full animate-pulse" />
            </>
          ) : (
            <>
              <User size={24} />
              Manual Mode
              <div className="w-2 h-2 bg-ai-cyan rounded-full" />
            </>
          )}
        </motion.button>

        {/* AI Path Visualization Toggle */}
        {isAI && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <button
              onClick={onToggleAIPath}
              disabled={disabled}
              className={`
                w-full flex items-center justify-between px-4 py-2 rounded-lg
                border transition-all duration-300 text-sm
                ${showAIPath
                  ? 'border-ai-purple/60 bg-ai-purple/10 text-ai-purple'
                  : 'border-gray-600 bg-gray-800/50 text-gray-400 hover:border-ai-purple/40'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span>Show AI Pathfinding</span>
              <div className={`
                w-10 h-5 rounded-full transition-all duration-300 relative
                ${showAIPath ? 'bg-ai-purple' : 'bg-gray-600'}
              `}>
                <div className={`
                  w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform duration-300
                  ${showAIPath ? 'translate-x-5' : 'translate-x-0.5'}
                `} />
              </div>
            </button>
          </motion.div>
        )}
      </div>

      {/* Game Status Info */}
      <div className="text-center">
        <div className={`
          inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
          ${gameStatus === 'playing' ? 'bg-green-500/20 text-green-400' :
            gameStatus === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
            gameStatus === 'gameOver' ? 'bg-red-500/20 text-red-400' :
            'bg-gray-500/20 text-gray-400'
          }
        `}>
          <div className={`
            w-2 h-2 rounded-full
            ${gameStatus === 'playing' ? 'bg-green-400 animate-pulse' :
              gameStatus === 'paused' ? 'bg-yellow-400 animate-pulse' :
              gameStatus === 'gameOver' ? 'bg-red-400' :
              'bg-gray-400'
            }
          `} />
          {gameStatus === 'playing' ? 'Playing' :
           gameStatus === 'paused' ? 'Paused' :
           gameStatus === 'gameOver' ? 'Game Over' :
           'Ready'}
        </div>
      </div>

      {/* Controls Help */}
      {!isAI && gameStatus !== 'gameOver' && (
        <div className="text-center text-xs text-gray-500 space-y-1">
          <div>Use WASD or Arrow Keys to move</div>
          <div>SPACE to pause/resume • R to reset</div>
        </div>
      )}
    </div>
  );
};

export default GameControls;
