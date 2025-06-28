'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Type, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ArrayGeneratorProps {
  arraySize: number;
  isCustomInput: boolean;
  customArray: string;
  onArrayGenerated: (array: number[]) => void;
  onCustomInputToggle: (isCustom: boolean) => void;
  onCustomArrayChange: (customArray: string) => void;
  maxValue?: number;
  minValue?: number;
}

const ArrayGenerator: React.FC<ArrayGeneratorProps> = ({
  arraySize,
  isCustomInput,
  customArray,
  onArrayGenerated,
  onCustomInputToggle,
  onCustomArrayChange,
  maxValue = 100,
  minValue = 1
}) => {
  const [inputError, setInputError] = useState<string>('');

  // Generate random array
  const generateRandomArray = useCallback(() => {
    const array = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    );
    onArrayGenerated(array);
    toast.success(`Generated random array of ${arraySize} elements`, {
      duration: 2000,
      style: {
        background: '#1a1a2e',
        color: '#00ccff',
        border: '1px solid #00ccff'
      }
    });
  }, [arraySize, maxValue, minValue, onArrayGenerated]);

  // Parse and validate custom input
  const parseCustomInput = useCallback((input: string): { array: number[]; error: string } => {
    try {
      // Remove extra whitespace and split by common delimiters
      const cleanInput = input.trim();
      if (!cleanInput) {
        return { array: [], error: 'Please enter some numbers' };
      }

      // Split by various delimiters: comma, space, semicolon, newline
      const parts = cleanInput
        .split(/[,;\s\n]+/)
        .filter(part => part.trim() !== '');

      if (parts.length === 0) {
        return { array: [], error: 'Please enter valid numbers' };
      }

      if (parts.length > 200) {
        return { array: [], error: 'Maximum 200 elements allowed' };
      }

      if (parts.length < 2) {
        return { array: [], error: 'Please enter at least 2 numbers' };
      }

      // Parse numbers
      const numbers: number[] = [];
      for (const part of parts) {
        const num = parseInt(part.trim(), 10);
        if (isNaN(num)) {
          return { array: [], error: `"${part}" is not a valid number` };
        }
        if (num < minValue || num > maxValue) {
          return { array: [], error: `Numbers must be between ${minValue} and ${maxValue}` };
        }
        numbers.push(num);
      }

      return { array: numbers, error: '' };
    } catch (error) {
      return { array: [], error: 'Invalid input format' };
    }
  }, [maxValue, minValue]);

  // Handle custom input change
  const handleCustomInputChange = (value: string) => {
    onCustomArrayChange(value);
    
    if (value.trim()) {
      const { error } = parseCustomInput(value);
      setInputError(error);
    } else {
      setInputError('');
    }
  };

  // Apply custom array
  const applyCustomArray = () => {
    const { array, error } = parseCustomInput(customArray);
    
    if (error) {
      setInputError(error);
      toast.error(error, {
        duration: 3000,
        style: {
          background: '#1a1a2e',
          color: '#ff3366',
          border: '1px solid #ff3366'
        }
      });
      return;
    }

    setInputError('');
    onArrayGenerated(array);
    toast.success(`Applied custom array with ${array.length} elements`, {
      duration: 2000,
      style: {
        background: '#1a1a2e',
        color: '#00ff88',
        border: '1px solid #00ff88'
      }
    });
  };

  // Generate preset arrays
  const generatePresetArray = (type: 'sorted' | 'reverse' | 'nearly-sorted' | 'few-unique') => {
    let array: number[] = [];
    
    switch (type) {
      case 'sorted':
        array = Array.from({ length: arraySize }, (_, i) => i + 1);
        break;
      case 'reverse':
        array = Array.from({ length: arraySize }, (_, i) => arraySize - i);
        break;
      case 'nearly-sorted':
        array = Array.from({ length: arraySize }, (_, i) => i + 1);
        // Swap a few random elements
        for (let i = 0; i < Math.min(3, arraySize / 10); i++) {
          const idx1 = Math.floor(Math.random() * arraySize);
          const idx2 = Math.floor(Math.random() * arraySize);
          [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
        }
        break;
      case 'few-unique':
        const uniqueValues = [1, 2, 3, 4, 5];
        array = Array.from({ length: arraySize }, () => 
          uniqueValues[Math.floor(Math.random() * uniqueValues.length)]
        );
        break;
    }
    
    onArrayGenerated(array);
    toast.success(`Generated ${type.replace('-', ' ')} array`, {
      duration: 2000,
      style: {
        background: '#1a1a2e',
        color: '#00ccff',
        border: '1px solid #00ccff'
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Input Mode Toggle */}
      <div className="flex gap-2">
        <motion.button
          onClick={() => onCustomInputToggle(false)}
          className={`
            flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
            ${!isCustomInput 
              ? 'bg-ai-cyan/20 text-ai-cyan border-2 border-ai-cyan' 
              : 'bg-gray-800/50 text-gray-400 border-2 border-gray-600 hover:border-ai-cyan/50'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Shuffle size={16} />
          Random
        </motion.button>
        
        <motion.button
          onClick={() => onCustomInputToggle(true)}
          className={`
            flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
            ${isCustomInput 
              ? 'bg-ai-purple/20 text-ai-purple border-2 border-ai-purple' 
              : 'bg-gray-800/50 text-gray-400 border-2 border-gray-600 hover:border-ai-purple/50'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Type size={16} />
          Custom
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {!isCustomInput ? (
          /* Random Array Generation */
          <motion.div
            key="random"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {/* Generate Random Button */}
            <motion.button
              onClick={generateRandomArray}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-ai-cyan to-ai-green rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Shuffle size={20} />
              Generate Random Array ({arraySize} elements)
            </motion.button>

            {/* Preset Arrays */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => generatePresetArray('sorted')}
                className="px-3 py-2 bg-gray-700/50 hover:bg-ai-cyan/20 text-gray-300 hover:text-ai-cyan rounded-lg text-sm font-medium transition-all duration-300"
              >
                Sorted
              </button>
              <button
                onClick={() => generatePresetArray('reverse')}
                className="px-3 py-2 bg-gray-700/50 hover:bg-ai-cyan/20 text-gray-300 hover:text-ai-cyan rounded-lg text-sm font-medium transition-all duration-300"
              >
                Reverse
              </button>
              <button
                onClick={() => generatePresetArray('nearly-sorted')}
                className="px-3 py-2 bg-gray-700/50 hover:bg-ai-cyan/20 text-gray-300 hover:text-ai-cyan rounded-lg text-sm font-medium transition-all duration-300"
              >
                Nearly Sorted
              </button>
              <button
                onClick={() => generatePresetArray('few-unique')}
                className="px-3 py-2 bg-gray-700/50 hover:bg-ai-cyan/20 text-gray-300 hover:text-ai-cyan rounded-lg text-sm font-medium transition-all duration-300"
              >
                Few Unique
              </button>
            </div>
          </motion.div>
        ) : (
          /* Custom Array Input */
          <motion.div
            key="custom"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {/* Custom Input Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Enter Numbers (separated by spaces, commas, or new lines)
              </label>
              <textarea
                value={customArray}
                onChange={(e) => handleCustomInputChange(e.target.value)}
                placeholder={`Enter numbers between ${minValue} and ${maxValue}...\nExample: 64, 34, 25, 12, 22, 11, 90`}
                className={`
                  w-full h-24 px-3 py-2 bg-gray-800/50 border-2 rounded-lg resize-none
                  text-white placeholder-gray-500 font-mono text-sm
                  transition-all duration-300 focus:outline-none
                  ${inputError 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-600 focus:border-ai-purple'
                  }
                `}
              />
              
              {/* Input Status */}
              <AnimatePresence>
                {inputError ? (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 text-red-400 text-sm"
                  >
                    <AlertCircle size={16} />
                    {inputError}
                  </motion.div>
                ) : customArray.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 text-green-400 text-sm"
                  >
                    <CheckCircle size={16} />
                    {parseCustomInput(customArray).array.length} numbers ready
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Apply Custom Array Button */}
            <motion.button
              onClick={applyCustomArray}
              disabled={!customArray.trim() || !!inputError}
              className={`
                w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300
                ${!customArray.trim() || inputError
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-ai-purple to-ai-cyan text-white hover:shadow-lg'
                }
              `}
              whileHover={!customArray.trim() || inputError ? {} : { scale: 1.02 }}
              whileTap={!customArray.trim() || inputError ? {} : { scale: 0.98 }}
            >
              <Type size={20} />
              Apply Custom Array
            </motion.button>

            {/* Help Text */}
            <div className="text-xs text-gray-500 space-y-1">
              <div>• Separate numbers with spaces, commas, or new lines</div>
              <div>• Range: {minValue} to {maxValue}</div>
              <div>• Minimum: 2 numbers, Maximum: 200 numbers</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArrayGenerator;
