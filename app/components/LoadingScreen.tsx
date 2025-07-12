'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1000); // Slightly faster to allow for crossfade

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-ai-dark via-ai-gray to-ai-dark"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.02,
        filter: "blur(2px)",
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-ai-cyan rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative flex flex-col items-center">
        {/* Loading circle with A */}
        <div className="relative w-32 h-32 mb-8">
          {/* Outer rotating circle */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-ai-cyan border-r-ai-blue"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Inner rotating circle */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-ai-green border-l-ai-purple"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Center A letter */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              type: "spring",
              stiffness: 200,
            }}
          >
            <span className="text-6xl font-bold gradient-text">A</span>
          </motion.div>

          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-ai-cyan opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Loading text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-ai-light mb-2">A Akhil</h2>
          <motion.p
            className="text-ai-cyan font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Portfolio...
          </motion.p>
        </motion.div>

        {/* Progress dots */}
        <motion.div
          className="flex space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-ai-cyan rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Corner tech elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <motion.div
          className="text-4xl text-ai-blue"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          ⚙️
        </motion.div>
      </div>
      
      <div className="absolute top-10 right-10 opacity-20">
        <motion.div
          className="text-4xl text-ai-green"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          🧠
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-10 opacity-20">
        <motion.div
          className="text-4xl text-ai-purple"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          💡
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-10 opacity-20">
        <motion.div
          className="text-4xl text-ai-cyan"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🤖
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
