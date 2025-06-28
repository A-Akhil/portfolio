'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Minimize2, Maximize2, X, Terminal, Home } from 'lucide-react';
import Link from 'next/link';

const TerminalHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between"
    >
      {/* Left Side - Terminal Info */}
      <div className="flex items-center gap-3">
        <Terminal size={16} className="text-green-400" />
        <span className="text-green-400 font-mono text-sm">
          akhil@portfolio-terminal
        </span>
        <span className="text-gray-500 text-sm">•</span>
        <span className="text-cyan-400 text-sm font-mono">
          {currentTime}
        </span>
      </div>

      {/* Right Side - Window Controls */}
      <div className="flex items-center gap-2">
        {/* Home Button */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            title="Back to Portfolio"
          >
            <Home size={14} />
          </motion.button>
        </Link>

        {/* Window Controls */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
        >
          <Minimize2 size={14} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1 text-gray-400 hover:text-green-400 transition-colors"
        >
          <Maximize2 size={14} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
        >
          <X size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TerminalHeader;
