'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shuffle } from 'lucide-react';
import { ASCII_ART_COLLECTION, ASCIIArt } from '../../types/easterEggTypes';

interface ASCIIArtProps {
  isVisible: boolean;
  onClose: () => void;
}

const ASCIIArtComponent: React.FC<ASCIIArtProps> = ({ isVisible, onClose }) => {
  const [currentArt, setCurrentArt] = useState<ASCIIArt>(ASCII_ART_COLLECTION[0]);
  const [animatedLines, setAnimatedLines] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const typewriterEffect = (art: ASCIIArt) => {
    setIsAnimating(true);
    setAnimatedLines([]);
    
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < art.art.length) {
        setAnimatedLines(prev => [...prev, art.art[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 150); // Delay between lines
  };

  const shuffleArt = () => {
    if (!isAnimating) {
      const randomIndex = Math.floor(Math.random() * ASCII_ART_COLLECTION.length);
      const newArt = ASCII_ART_COLLECTION[randomIndex];
      setCurrentArt(newArt);
      typewriterEffect(newArt);
    }
  };

  useEffect(() => {
    if (isVisible) {
      typewriterEffect(currentArt);
    }
  }, [isVisible, currentArt]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            className="bg-gray-900 border border-ai-cyan rounded-lg p-6 max-w-lg mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-ai-cyan">ASCII Art Gallery</h3>
                <p className="text-sm text-gray-400">{currentArt.description}</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={shuffleArt}
                  disabled={isAnimating}
                  className="p-2 bg-ai-purple/20 text-ai-purple rounded-lg hover:bg-ai-purple/30 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shuffle size={16} />
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {/* ASCII Art Display */}
            <div className="bg-black rounded-lg p-4 font-mono text-ai-green text-sm leading-tight min-h-[200px] flex flex-col justify-center">
              <div className="text-center">
                {animatedLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="whitespace-pre-line"
                  >
                    {line}
                  </motion.div>
                ))}
                {isAnimating && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-ai-cyan"
                  >
                    ▌
                  </motion.span>
                )}
              </div>
            </div>

            {/* Art Selection */}
            <div className="mt-4 flex gap-2 justify-center flex-wrap">
              {ASCII_ART_COLLECTION.map((art, index) => (
                <motion.button
                  key={art.id}
                  onClick={() => {
                    if (!isAnimating && currentArt.id !== art.id) {
                      setCurrentArt(art);
                      typewriterEffect(art);
                    }
                  }}
                  disabled={isAnimating}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors disabled:opacity-50 ${
                    currentArt.id === art.id
                      ? 'bg-ai-cyan/20 text-ai-cyan border border-ai-cyan'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {art.name}
                </motion.button>
              ))}
            </div>

            {/* Easter Egg Info */}
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>🎨 ASCII Art Easter Egg • Press different arrow combinations for more surprises!</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ASCIIArtComponent;
