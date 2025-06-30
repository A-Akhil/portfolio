'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Brain, Timer } from 'lucide-react';
import { GameState, HighScore } from '../../../types/snakeTypes';
import { GameUtils } from '../../../utils/gameUtils';

interface ScoreBoardProps {
  gameState: GameState;
  highScores: HighScore[];
  pathEfficiency?: number;
  gameTime?: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  gameState,
  highScores,
  pathEfficiency = 0,
  gameTime = 0
}) => {
  const currentHighScore = GameUtils.getHighScoreForDifficulty(
    gameState.difficulty.level,
    gameState.isAI
  );

  const humanHighScore = GameUtils.getHighScoreForDifficulty(
    gameState.difficulty.level,
    false
  );

  const aiHighScore = GameUtils.getHighScoreForDifficulty(
    gameState.difficulty.level,
    true
  );

  const isNewHighScore = gameState.score > currentHighScore;
  const gameStats = GameUtils.generateGameStats(gameState);

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const getDifficultyScores = () => {
    return highScores
      .filter(score => 
        score.difficulty === gameState.difficulty.level && 
        score.isAI === gameState.isAI
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const getAllDifficultyScores = () => {
    return highScores
      .filter(score => score.difficulty === gameState.difficulty.level)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  };

  return (
    <div className="space-y-4">
      {/* Current Score */}
      <div className="text-center">
        <motion.div
          key={gameState.score}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="space-y-2"
        >
          <div className="text-2xl font-bold text-ai-cyan">
            Score: {gameState.score}
          </div>
          {isNewHighScore && gameState.score > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-yellow-400 text-sm font-semibold animate-pulse"
            >
              🏆 NEW HIGH SCORE! 🏆
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Game Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Snake Length */}
        <div className="bg-gray-800/60 rounded-lg p-3 text-center">
          <div className="text-ai-cyan text-lg font-bold">
            {gameStats.snakeLength}
          </div>
          <div className="text-gray-400 text-xs">Snake Length</div>
        </div>

        {/* Game Time */}
        <div className="bg-gray-800/60 rounded-lg p-3 text-center">
          <div className="text-ai-green text-lg font-bold">
            {formatTime(gameTime)}
          </div>
          <div className="text-gray-400 text-xs">Time</div>
        </div>

        {/* Free Space */}
        <div className="bg-gray-800/60 rounded-lg p-3 text-center">
          <div className="text-yellow-400 text-lg font-bold">
            {gameStats.freeSpace}
          </div>
          <div className="text-gray-400 text-xs">Free Cells</div>
        </div>

        {/* Efficiency (AI only) */}
        {gameState.isAI && (
          <div className="bg-gray-800/60 rounded-lg p-3 text-center">
            <div className="text-ai-purple text-lg font-bold">
              {pathEfficiency}%
            </div>
            <div className="text-gray-400 text-xs">Path Efficiency</div>
          </div>
        )}

        {/* Occupied Percentage */}
        {!gameState.isAI && (
          <div className="bg-gray-800/60 rounded-lg p-3 text-center">
            <div className="text-red-400 text-lg font-bold">
              {gameStats.occupiedPercentage}%
            </div>
            <div className="text-gray-400 text-xs">Board Filled</div>
          </div>
        )}
      </div>

      {/* High Score Section */}
      <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="text-yellow-400" size={20} />
          <h3 className="text-white font-semibold">
            High Scores - {gameState.difficulty.level.toUpperCase()}
          </h3>
        </div>

        <div className="space-y-2">
          {/* Current Mode Best Score */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">
              {gameState.isAI ? 'AI Best:' : 'Human Best:'}
            </span>
            <span className="text-ai-cyan font-bold">
              {currentHighScore}
            </span>
          </div>

          {/* Comparison Scores */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-700/30 rounded p-2 text-center">
              <div className="text-gray-400">👤 Human</div>
              <div className="text-white font-bold">{humanHighScore}</div>
            </div>
            <div className="bg-gray-700/30 rounded p-2 text-center">
              <div className="text-gray-400">🤖 AI</div>
              <div className="text-white font-bold">{aiHighScore}</div>
            </div>
          </div>

          {/* Top Scores for Current Mode */}
          {getDifficultyScores().length > 0 && (
            <div className="mt-3 space-y-1">
              <div className="text-xs text-gray-500 mb-2">
                Top {gameState.isAI ? 'AI' : 'Human'} Scores:
              </div>
              {getDifficultyScores().map((score, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="text-gray-400">
                    #{index + 1} {score.isAI ? '🤖' : '👤'}
                  </span>
                  <span className="text-white">{score.score}</span>
                </div>
              ))}
            </div>
          )}

          {/* All Time Best for Difficulty */}
          {getAllDifficultyScores().length > 0 && (
            <div className="mt-3 pt-2 border-t border-gray-600">
              <div className="text-xs text-gray-500 mb-2">All-Time Best:</div>
              {getAllDifficultyScores().slice(0, 3).map((score, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="text-gray-400">
                    #{index + 1} {score.isAI ? '🤖' : '👤'}
                  </span>
                  <span className={`${score.isAI ? 'text-purple-400' : 'text-green-400'}`}>
                    {score.score}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Performance Indicators */}
      {gameState.isAI && (
        <div className="bg-ai-purple/10 rounded-lg p-3 border border-ai-purple/30">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="text-ai-purple" size={16} />
            <span className="text-ai-purple text-sm font-semibold">AI Performance</span>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Algorithm:</span>
              <span className="text-ai-purple">A* Pathfinding</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Response Time:</span>
              <span className="text-ai-purple">{gameState.difficulty.aiDelay}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Path Efficiency:</span>
              <span className={`${pathEfficiency > 80 ? 'text-green-400' : pathEfficiency > 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {pathEfficiency}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Game Status Messages */}
      {gameState.gameStatus === 'gameOver' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center"
        >
          <div className="text-red-400 font-semibold mb-1">Game Over!</div>
          <div className="text-gray-300 text-sm">
            Final Score: {gameState.score}
          </div>
          {isNewHighScore && (
            <div className="text-yellow-400 text-sm mt-1">
              🎉 New Personal Best! 🎉
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ScoreBoard;
