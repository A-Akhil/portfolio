'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward, Settings } from 'lucide-react';
import ArrayGenerator from './ArrayGenerator';
import { SPEED_SETTINGS } from '../../../types/algorithmTypes';

interface ControlPanelProps {
  // Array controls
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  isCustomInput: boolean;
  customArray: string;
  onArrayGenerated: (array: number[]) => void;
  onCustomInputToggle: (isCustom: boolean) => void;
  onCustomArrayChange: (customArray: string) => void;
  
  // Playback controls
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onSpeedChange: (speed: number) => void;
  
  // Algorithm selection
  algorithmType: 'sorting' | 'searching';
  selectedAlgorithm: string | null;
  onAlgorithmTypeChange: (type: 'sorting' | 'searching') => void;
  
  // Current array display
  currentArray: number[];
  
  // Search specific
  searchTarget?: number;
  onSearchTargetChange?: (target: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  arraySize,
  onArraySizeChange,
  isCustomInput,
  customArray,
  onArrayGenerated,
  onCustomInputToggle,
  onCustomArrayChange,
  isPlaying,
  isPaused,
  isComplete,
  speed,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onSpeedChange,
  algorithmType,
  selectedAlgorithm,
  onAlgorithmTypeChange,
  currentArray,
  searchTarget,
  onSearchTargetChange
}) => {
  const canPlay = !isPlaying && !isComplete && currentArray.length > 0 && selectedAlgorithm;
  const canPause = isPlaying;
  const canReset = isPaused || isComplete;
  const canStep = !isPlaying && !isComplete && currentArray.length > 0 && selectedAlgorithm;

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-gray-600">
        <Settings className="text-ai-cyan" size={20} />
        <h3 className="text-lg font-semibold text-white">Controls</h3>
      </div>

      {/* Algorithm Type Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          Algorithm Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            onClick={() => onAlgorithmTypeChange('sorting')}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-300
              ${algorithmType === 'sorting'
                ? 'bg-ai-cyan/20 text-ai-cyan border-2 border-ai-cyan'
                : 'bg-gray-700/50 text-gray-400 border-2 border-gray-600 hover:border-ai-cyan/50'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sorting
          </motion.button>
          <motion.button
            onClick={() => onAlgorithmTypeChange('searching')}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-300
              ${algorithmType === 'searching'
                ? 'bg-ai-purple/20 text-ai-purple border-2 border-ai-purple'
                : 'bg-gray-700/50 text-gray-400 border-2 border-gray-600 hover:border-ai-purple/50'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Searching
          </motion.button>
        </div>
      </div>

      {/* Array Size Control */}
      {!isCustomInput && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={arraySize}
            onChange={(e) => onArraySizeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #00ccff 0%, #00ccff ${(arraySize - 10) / 1.9}%, #374151 ${(arraySize - 10) / 1.9}%, #374151 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>10</span>
            <span>100</span>
            <span>200</span>
          </div>
        </div>
      )}

      {/* Array Generator */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          Array Input
        </label>
        <ArrayGenerator
          arraySize={arraySize}
          isCustomInput={isCustomInput}
          customArray={customArray}
          onArrayGenerated={onArrayGenerated}
          onCustomInputToggle={onCustomInputToggle}
          onCustomArrayChange={onCustomArrayChange}
          maxValue={100}
          minValue={1}
        />
      </div>

      {/* Search Target (for searching algorithms) */}
      {algorithmType === 'searching' && onSearchTargetChange && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Search Target
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={searchTarget || ''}
            onChange={(e) => onSearchTargetChange(parseInt(e.target.value) || 0)}
            placeholder="Enter number to search..."
            className="w-full px-3 py-2 bg-gray-800/50 border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-ai-purple transition-all duration-300"
          />
        </div>
      )}

      {/* Current Array Display */}
      {currentArray.length > 0 && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Current Array ({currentArray.length} elements)
          </label>
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="text-sm text-gray-300 font-mono">
              {currentArray.length <= 20 
                ? `[${currentArray.join(', ')}]`
                : `[${currentArray.slice(0, 10).join(', ')}, ... ${currentArray.length - 20} more ..., ${currentArray.slice(-10).join(', ')}]`
              }
            </div>
          </div>
        </div>
      )}

      {/* Playback Controls */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">
          Playback Controls
        </label>
        
        {/* Main Control Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            onClick={canPlay ? onPlay : onPause}
            disabled={!canPlay && !canPause}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300
              ${canPlay
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30'
                : canPause
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-600/30'
                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
              }
            `}
            whileHover={canPlay || canPause ? { scale: 1.02 } : {}}
            whileTap={canPlay || canPause ? { scale: 0.98 } : {}}
          >
            {canPlay ? (
              <>
                <Play size={16} fill="currentColor" />
                Play
              </>
            ) : (
              <>
                <Pause size={16} />
                Pause
              </>
            )}
          </motion.button>

          <motion.button
            onClick={onStepForward}
            disabled={!canStep}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300
              ${canStep
                ? 'bg-ai-purple hover:bg-purple-700 text-white shadow-lg shadow-ai-purple/30'
                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
              }
            `}
            whileHover={canStep ? { scale: 1.02 } : {}}
            whileTap={canStep ? { scale: 0.98 } : {}}
          >
            <SkipForward size={16} />
            Step
          </motion.button>
        </div>

        {/* Reset Button */}
        <motion.button
          onClick={onReset}
          disabled={!canReset}
          className={`
            w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300
            ${canReset
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30'
              : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
            }
          `}
          whileHover={canReset ? { scale: 1.02 } : {}}
          whileTap={canReset ? { scale: 0.98 } : {}}
        >
          <RotateCcw size={16} />
          Reset
        </motion.button>
      </div>

      {/* Speed Control */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          Speed: {SPEED_SETTINGS[speed as keyof typeof SPEED_SETTINGS] || `${speed}x`}
        </label>
        <input
          type="range"
          min="0.25"
          max="8"
          step="0.25"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0.25x</span>
          <span>1x</span>
          <span>4x</span>
          <span>8x</span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="pt-4 border-t border-gray-600">
        <div className={`
          inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium
          ${isPlaying ? 'bg-green-500/20 text-green-400' :
            isPaused ? 'bg-yellow-500/20 text-yellow-400' :
            isComplete ? 'bg-ai-cyan/20 text-ai-cyan' :
            'bg-gray-500/20 text-gray-400'
          }
        `}>
          <div className={`
            w-2 h-2 rounded-full
            ${isPlaying ? 'bg-green-400 animate-pulse' :
              isPaused ? 'bg-yellow-400' :
              isComplete ? 'bg-ai-cyan' :
              'bg-gray-400'
            }
          `} />
          {isPlaying ? 'Running' :
           isPaused ? 'Paused' :
           isComplete ? 'Complete' :
           'Ready'}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
