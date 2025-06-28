'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Search, ArrowRight } from 'lucide-react';
import { 
  SORTING_ALGORITHMS, 
  SEARCHING_ALGORITHMS, 
  SortingAlgorithm, 
  SearchingAlgorithm,
  AlgorithmInfo 
} from '../../../types/algorithmTypes';

interface AlgorithmSelectorProps {
  algorithmType: 'sorting' | 'searching';
  selectedAlgorithm: string | null;
  onAlgorithmSelect: (algorithm: string) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  algorithmType,
  selectedAlgorithm,
  onAlgorithmSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const algorithms = algorithmType === 'sorting' ? SORTING_ALGORITHMS : SEARCHING_ALGORITHMS;
  const selectedInfo: AlgorithmInfo | null = selectedAlgorithm ? 
    (algorithms as Record<string, AlgorithmInfo>)[selectedAlgorithm] : null;

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('O(1)') || complexity.includes('O(n)')) return 'text-green-400';
    if (complexity.includes('O(log') || complexity.includes('O(n log')) return 'text-yellow-400';
    if (complexity.includes('O(n²)') || complexity.includes('O(n^')) return 'text-orange-400';
    return 'text-red-400';
  };

  const getAlgorithmIcon = (category: string) => {
    return category === 'sorting' ? Zap : Search;
  };

  return (
    <div className="space-y-4">
      {/* Algorithm Dropdown */}
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all duration-300
            ${selectedAlgorithm
              ? 'bg-ai-cyan/10 border-ai-cyan text-ai-cyan'
              : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-ai-cyan/50'
            }
          `}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-3">
            {React.createElement(getAlgorithmIcon(algorithmType), { size: 20 })}
            <span className="font-medium">
              {selectedInfo ? selectedInfo.name : `Select ${algorithmType} algorithm...`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Show complexity inline when selected */}
            {selectedInfo && (
              <span className={`text-xs font-mono ${getComplexityColor(selectedInfo.timeComplexity.average)}`}>
                {selectedInfo.timeComplexity.average}
              </span>
            )}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </div>
        </motion.button>

        {/* Dropdown Menu - Simplified */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto"
            >
              {Object.entries(algorithms).map(([key, info]) => {
                const Icon = getAlgorithmIcon(info.category);
                return (
                  <motion.button
                    key={key}
                    onClick={() => {
                      onAlgorithmSelect(key);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-2 text-left transition-all duration-200
                      hover:bg-ai-cyan/10 border-b border-gray-700 last:border-b-0
                      ${selectedAlgorithm === key ? 'bg-ai-cyan/20 text-ai-cyan' : 'text-gray-300'}
                    `}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="flex-shrink-0" />
                      <span className="font-medium">{info.name}</span>
                    </div>
                    <span className={`text-xs font-mono ${getComplexityColor(info.timeComplexity.average)}`}>
                      {info.timeComplexity.average}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compact Info Toggle */}
      {selectedInfo && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className={getComplexityColor(selectedInfo.timeComplexity.average)}>
              {selectedInfo.timeComplexity.average}
            </span>
            <span>•</span>
            <span>{selectedInfo.spaceComplexity}</span>
            {'stable' in selectedInfo && (
              <>
                <span>•</span>
                <span className={selectedInfo.stable ? 'text-green-400' : 'text-red-400'}>
                  {selectedInfo.stable ? 'Stable' : 'Unstable'}
                </span>
              </>
            )}
          </div>
          <motion.button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-ai-cyan hover:text-ai-cyan/80 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </motion.button>
        </div>
      )}

      {/* Collapsible Detailed Info */}
      <AnimatePresence>
        {selectedInfo && showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-ai-cyan/10 to-ai-purple/10 border border-ai-cyan/30 rounded-lg p-3 space-y-2"
          >
            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {selectedInfo.description}
            </p>

            {/* Complexity Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-800/50 rounded p-2">
                <div className="text-xs text-gray-400">Best</div>
                <div className={`font-mono text-xs ${getComplexityColor(selectedInfo.timeComplexity.best)}`}>
                  {selectedInfo.timeComplexity.best}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <div className="text-xs text-gray-400">Average</div>
                <div className={`font-mono text-xs ${getComplexityColor(selectedInfo.timeComplexity.average)}`}>
                  {selectedInfo.timeComplexity.average}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <div className="text-xs text-gray-400">Worst</div>
                <div className={`font-mono text-xs ${getComplexityColor(selectedInfo.timeComplexity.worst)}`}>
                  {selectedInfo.timeComplexity.worst}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlgorithmSelector;
