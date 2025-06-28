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
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto"
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
                      w-full flex items-start gap-3 px-4 py-3 text-left transition-all duration-200
                      hover:bg-ai-cyan/10 border-b border-gray-700 last:border-b-0
                      ${selectedAlgorithm === key ? 'bg-ai-cyan/20 text-ai-cyan' : 'text-gray-300'}
                    `}
                    whileHover={{ x: 4 }}
                  >
                    <Icon size={16} className="mt-1 flex-shrink-0" />
                    <div className="space-y-1 flex-1">
                      <div className="font-medium">{info.name}</div>
                      <div className="text-xs text-gray-400 line-clamp-2">
                        {info.description}
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={getComplexityColor(info.timeComplexity.average)}>
                          Avg: {info.timeComplexity.average}
                        </span>
                        <span className="text-gray-500">
                          Space: {info.spaceComplexity}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Algorithm Info */}
      <AnimatePresence>
        {selectedInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-ai-cyan/10 to-ai-purple/10 border border-ai-cyan/30 rounded-lg p-4 space-y-3"
          >
            {/* Algorithm Name & Category */}
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                {React.createElement(getAlgorithmIcon(selectedInfo.category), { size: 20, className: 'text-ai-cyan' })}
                {selectedInfo.name}
              </h4>
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${selectedInfo.category === 'sorting' 
                  ? 'bg-ai-cyan/20 text-ai-cyan' 
                  : 'bg-ai-purple/20 text-ai-purple'
                }
              `}>
                {selectedInfo.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {selectedInfo.description}
            </p>

            {/* Complexity Analysis */}
            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-gray-200">Time Complexity:</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="bg-gray-800/50 rounded-lg p-2">
                  <div className="text-xs text-gray-400">Best Case</div>
                  <div className={`font-mono text-sm ${getComplexityColor(selectedInfo.timeComplexity.best)}`}>
                    {selectedInfo.timeComplexity.best}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-2">
                  <div className="text-xs text-gray-400">Average Case</div>
                  <div className={`font-mono text-sm ${getComplexityColor(selectedInfo.timeComplexity.average)}`}>
                    {selectedInfo.timeComplexity.average}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-2">
                  <div className="text-xs text-gray-400">Worst Case</div>
                  <div className={`font-mono text-sm ${getComplexityColor(selectedInfo.timeComplexity.worst)}`}>
                    {selectedInfo.timeComplexity.worst}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-2">
                <div className="text-xs text-gray-400">Space Complexity</div>
                <div className={`font-mono text-sm ${getComplexityColor(selectedInfo.spaceComplexity)}`}>
                  {selectedInfo.spaceComplexity}
                </div>
              </div>
            </div>

            {/* Algorithm Properties (for sorting algorithms) */}
            {'stable' in selectedInfo && (
              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-gray-200">Properties:</h5>
                <div className="flex gap-2 flex-wrap">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${selectedInfo.stable 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                    }
                  `}>
                    {selectedInfo.stable ? '✓ Stable' : '✗ Unstable'}
                  </span>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${selectedInfo.inPlace 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                    }
                  `}>
                    {selectedInfo.inPlace ? '✓ In-place' : '✗ Not in-place'}
                  </span>
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="pt-2 border-t border-gray-600">
              <div className="flex items-center gap-2 text-sm text-ai-cyan">
                <ArrowRight size={16} />
                <span>Ready to visualize! Generate an array and click Play to begin.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlgorithmSelector;
