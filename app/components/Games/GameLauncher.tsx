'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2, Brain, Zap } from 'lucide-react';
import SnakeGame from './SnakeAI/SnakeGame';

const GameLauncher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<'snake' | 'algorithms' | null>(null);

  const games = [
    {
      id: 'snake' as const,
      title: 'Snake AI',
      description: 'Classic Snake with A* pathfinding algorithm',
      icon: Brain,
      color: 'from-ai-purple to-ai-cyan',
      features: ['A* Pathfinding', '4 Difficulty Levels', 'AI vs Manual Mode', 'Performance Metrics']
    },
    {
      id: 'algorithms' as const,
      title: 'Algorithm Visualizer',
      description: 'Interactive sorting and searching animations',
      icon: Zap,
      color: 'from-ai-cyan to-ai-green',
      features: ['All Sorting Algorithms', 'Search Algorithms', 'Performance Analysis', 'Custom Arrays'],
      disabled: true // Will enable in next phase
    }
  ];

  const openGame = (gameId: 'snake' | 'algorithms') => {
    if (gameId === 'algorithms') {
      // TODO: Implement in Phase 2B
      return;
    }
    setSelectedGame(gameId);
    setIsOpen(true);
  };

  const closeGame = () => {
    setIsOpen(false);
    setSelectedGame(null);
  };

  return (
    <>
      {/* Game Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-ai-purple to-ai-cyan rounded-full shadow-lg shadow-ai-purple/30 text-white hover:shadow-xl hover:shadow-ai-purple/40 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Gamepad2 size={24} />
      </motion.button>

      {/* Game Selection Modal */}
      <AnimatePresence>
        {isOpen && !selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeGame}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-ai-dark via-ai-gray to-ai-dark border border-ai-cyan/30 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-ai-cyan">Interactive Games</h2>
                  <p className="text-gray-300">Showcase your technical skills through interactive challenges</p>
                </div>
                <button
                  onClick={closeGame}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="text-gray-400" size={24} />
                </button>
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game) => {
                  const Icon = game.icon;
                  return (
                    <motion.div
                      key={game.id}
                      whileHover={{ scale: 1.02 }}
                      className={`
                        relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300
                        ${game.disabled 
                          ? 'border-gray-600 bg-gray-800/30 opacity-60 cursor-not-allowed' 
                          : 'border-ai-cyan/30 hover:border-ai-cyan bg-gradient-to-br from-gray-800/50 to-gray-900/50'
                        }
                      `}
                      onClick={() => !game.disabled && openGame(game.id)}
                    >
                      {/* Coming Soon Badge */}
                      {game.disabled && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">
                          Coming Soon
                        </div>
                      )}

                      {/* Game Icon */}
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${game.color} flex items-center justify-center mb-4`}>
                        <Icon size={32} className="text-white" />
                      </div>

                      {/* Game Info */}
                      <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                      <p className="text-gray-300 mb-4">{game.description}</p>

                      {/* Features */}
                      <div className="space-y-2">
                        {game.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-ai-cyan rounded-full" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Play Button */}
                      {!game.disabled && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="mt-4 px-4 py-2 bg-gradient-to-r from-ai-purple to-ai-cyan rounded-lg text-white font-semibold text-center"
                        >
                          Play Now
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-6 text-center text-gray-400 text-sm">
                More games coming soon! These interactive demos showcase algorithm implementation and AI concepts.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Game Modal */}
      <AnimatePresence>
        {isOpen && selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-ai-cyan">
                  {selectedGame === 'snake' ? 'Snake AI Game' : 'Algorithm Visualizer'}
                </h2>
                <button
                  onClick={closeGame}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="text-gray-400" size={24} />
                </button>
              </div>

              {/* Game Content */}
              <div className="flex-1 p-4">
                {selectedGame === 'snake' && <SnakeGame />}
                {selectedGame === 'algorithms' && (
                  <div className="text-center text-gray-400 py-20">
                    Algorithm Visualizer coming in Phase 2B!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameLauncher;
