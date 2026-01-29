'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';
import { BinaryTime } from '../../types/easterEggTypes';

interface BinaryClockProps {
  isVisible: boolean;
  onClose: () => void;
}

const BinaryClock: React.FC<BinaryClockProps> = ({ isVisible, onClose }) => {
  const [binaryTime, setBinaryTime] = useState<BinaryTime>({
    hours: '',
    minutes: '',
    seconds: '',
    formatted: ''
  });
  const [showTooltip, setShowTooltip] = useState(false);

  const toBinary = (num: number, digits: number = 6): string => {
    return num.toString(2).padStart(digits, '0');
  };

  const updateBinaryTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    setBinaryTime({
      hours: toBinary(hours, 6),
      minutes: toBinary(minutes, 6),
      seconds: toBinary(seconds, 6),
      formatted: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    });
  };

  useEffect(() => {
    updateBinaryTime();
    const interval = setInterval(updateBinaryTime, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBinaryDigits = (binary: string, label: string, color: string) => {
    return (
      <div className="text-center">
        <div className="text-xs text-gray-400 mb-2 font-semibold">{label}</div>
        <div className="flex gap-1 justify-center">
          {binary.split('').map((digit, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center font-mono font-bold transition-all duration-300 ${
                digit === '1'
                  ? `${color} border-current shadow-lg shadow-current/50`
                  : 'bg-gray-800 border-gray-600 text-gray-500'
              }`}
            >
              {digit}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const getBinaryExplanation = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return [
      `Hours: ${hours} = ${toBinary(hours, 6)}`,
      `Minutes: ${minutes} = ${toBinary(minutes, 6)}`,
      `Seconds: ${seconds} = ${toBinary(seconds, 6)}`,
      '',
      'Each column represents a power of 2:',
      '32 | 16 | 8 | 4 | 2 | 1',
      '',
      'Binary: Base-2 numbering system',
      'Used in all digital computers!'
    ];
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-4 right-4 bg-gray-900 border border-ai-green rounded-lg p-4 z-50 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-ai-green">Binary Clock</h3>
              <p className="text-sm text-gray-400">Current time: {binaryTime.formatted}</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => setShowTooltip(!showTooltip)}
                className="p-2 bg-ai-cyan/20 text-ai-cyan rounded-lg hover:bg-ai-cyan/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Info size={16} />
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

          {/* Binary Time Display */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {renderBinaryDigits(binaryTime.hours, 'HOURS', 'bg-ai-cyan text-ai-cyan')}
            {renderBinaryDigits(binaryTime.minutes, 'MINUTES', 'bg-ai-green text-ai-green')}
            {renderBinaryDigits(binaryTime.seconds, 'SECONDS', 'bg-ai-purple text-ai-purple')}
          </div>

          {/* Binary Explanation Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-800 rounded-lg p-3 text-xs font-mono text-gray-300 border border-gray-700"
              >
                {getBinaryExplanation().map((line, index) => (
                  <div key={index} className={line === '' ? 'h-2' : ''}>
                    {line}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Easter Egg Info */}
          <div className="text-center text-xs text-gray-500 mt-2">
            <p>⏰ Binary Clock Easter Egg • Time in programmer&apos;s language!</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BinaryClock;
