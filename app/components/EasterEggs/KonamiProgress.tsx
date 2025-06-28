'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

interface KonamiProgressProps {
  isVisible: boolean;
  progress: number;
  totalKeys: number;
}

const KonamiProgress: React.FC<KonamiProgressProps> = ({ 
  isVisible, 
  progress, 
  totalKeys 
}) => {
  const progressPercentage = (progress / totalKeys) * 100;

  // Key sequence for display
  const KONAMI_SEQUENCE = ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'];

  return (
    <AnimatePresence>
      {isVisible && progress > 0 && progress < totalKeys && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-sm border border-ai-purple rounded-lg p-4 shadow-xl max-w-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 text-ai-purple text-sm font-medium mb-3">
              <Gamepad2 size={16} />
              Konami Code Progress
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
              <motion.div
                className="bg-gradient-to-r from-ai-cyan to-ai-purple h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Key Sequence Display */}
            <div className="flex gap-1 justify-center mb-2">
              {KONAMI_SEQUENCE.map((key, index) => (
                <motion.span
                  key={index}
                  className={`
                    px-2 py-1 rounded text-xs font-mono border
                    ${index < progress
                      ? 'bg-ai-green/20 text-ai-green border-ai-green'
                      : index === progress
                      ? 'bg-ai-cyan/20 text-ai-cyan border-ai-cyan animate-pulse'
                      : 'bg-gray-700 text-gray-400 border-gray-600'
                    }
                  `}
                  animate={index === progress ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {key}
                </motion.span>
              ))}
            </div>

            {/* Status Text */}
            <div className="text-center text-xs text-gray-400">
              {progress} of {totalKeys} keys • Next: <span className="text-ai-cyan">{KONAMI_SEQUENCE[progress]}</span>
            </div>

            {/* Hint */}
            <div className="text-center text-xs text-ai-purple mt-2">
              Keep going to unlock easter eggs! 🎮
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiProgress;
