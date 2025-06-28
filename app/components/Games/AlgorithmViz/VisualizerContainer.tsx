'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import AlgorithmSelector from './AlgorithmSelector';
import ControlPanel from './ControlPanel';
import SortingVisualizer from './SortingVisualizer';
import SearchingVisualizer from './SearchingVisualizer';
import { VisualizerState, ControlPanelState, SortingAlgorithm, SearchingAlgorithm } from '../../../types/algorithmTypes';
import { AlgorithmEngine } from '../../../utils/algorithms/AlgorithmEngine';

const VisualizerContainer: React.FC = () => {
  // Visualizer state
  const [visualizerState, setVisualizerState] = useState<VisualizerState>({
    array: [],
    originalArray: [],
    currentStep: 0,
    steps: [],
    isPlaying: false,
    isPaused: false,
    isComplete: false,
    speed: 1,
    algorithm: null,
    searchTarget: undefined,
    comparisons: 0,
    swaps: 0,
    timeElapsed: 0
  });

  // Control panel state
  const [controlState, setControlState] = useState<ControlPanelState>({
    arraySize: 50,
    speed: 1,
    isCustomInput: false,
    customArray: ''
  });

  // Algorithm type (sorting or searching)
  const [algorithmType, setAlgorithmType] = useState<'sorting' | 'searching'>('sorting');

  // Animation state
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const algorithmEngine = AlgorithmEngine.getInstance();

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  // Animation effect
  useEffect(() => {
    if (visualizerState.isPlaying && !visualizerState.isComplete && visualizerState.steps.length > 0) {
      const stepDelay = Math.max(50, 1000 / visualizerState.speed);
      
      animationRef.current = setTimeout(() => {
        if (visualizerState.currentStep < visualizerState.steps.length - 1) {
          setVisualizerState(prev => {
            const nextStep = prev.currentStep + 1;
            const step = prev.steps[nextStep];
            
            // Count comparisons and swaps based on step activity
            let newComparisons = prev.comparisons;
            let newSwaps = prev.swaps;
            
            if (step.comparing && step.comparing.length > 0) {
              newComparisons += 1;
            }
            if (step.swapped && step.swapped.length > 0) {
              newSwaps += 1;
            }
            
            return {
              ...prev,
              currentStep: nextStep,
              array: [...step.array],
              comparisons: newComparisons,
              swaps: newSwaps,
              timeElapsed: prev.timeElapsed + stepDelay
            };
          });
        } else {
          // Animation complete
          setVisualizerState(prev => ({
            ...prev,
            isPlaying: false,
            isComplete: true
          }));

          toast.success('Algorithm visualization completed!', {
            duration: 3000,
            style: {
              background: '#1a1a2e',
              color: '#00ff88',
              border: '1px solid #00ff88'
            }
          });
        }
      }, stepDelay);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [visualizerState.isPlaying, visualizerState.currentStep, visualizerState.steps.length, visualizerState.speed, visualizerState.isComplete]);
  const handleArrayGenerated = useCallback((array: number[]) => {
    // Stop any current animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    setVisualizerState(prev => ({
      ...prev,
      array: [...array],
      originalArray: [...array],
      currentStep: 0,
      steps: [],
      isPlaying: false,
      isPaused: false,
      isComplete: false,
      comparisons: 0,
      swaps: 0,
      timeElapsed: 0
    }));

    toast.success(`Array with ${array.length} elements loaded`, {
      duration: 2000,
      style: {
        background: '#1a1a2e',
        color: '#00ccff',
        border: '1px solid #00ccff'
      }
    });
  }, []);

  // Handle algorithm selection
  const handleAlgorithmSelect = useCallback((algorithm: string) => {
    setVisualizerState(prev => ({
      ...prev,
      algorithm,
      currentStep: 0,
      steps: [],
      isPlaying: false,
      isPaused: false,
      isComplete: false,
      comparisons: 0,
      swaps: 0,
      timeElapsed: 0
    }));

    toast.success(`${algorithm.replace('-', ' ')} algorithm selected`, {
      duration: 2000,
      style: {
        background: '#1a1a2e',
        color: '#8b00ff',
        border: '1px solid #8b00ff'
      }
    });
  }, []);

  // Playback controls
  const handlePlay = useCallback(() => {
    if (!visualizerState.algorithm || visualizerState.array.length === 0) {
      toast.error('Please select an algorithm and generate an array first', {
        duration: 3000,
        style: {
          background: '#1a1a2e',
          color: '#ff3366',
          border: '1px solid #ff3366'
        }
      });
      return;
    }

    // If we have steps already and haven't completed, resume animation
    if (visualizerState.steps.length > 0 && !visualizerState.isComplete) {
      setVisualizerState(prev => ({
        ...prev,
        isPlaying: true,
        isPaused: false
      }));
      return;
    }

    // Generate algorithm steps
    try {
      let steps;
      
      if (algorithmType === 'sorting') {
        steps = algorithmEngine.executeSortingAlgorithm(
          visualizerState.algorithm as SortingAlgorithm, 
          visualizerState.array
        );
      } else {
        if (visualizerState.searchTarget === undefined) {
          toast.error('Please set a search target for searching algorithms', {
            duration: 3000,
            style: {
              background: '#1a1a2e',
              color: '#ff3366',
              border: '1px solid #ff3366'
            }
          });
          return;
        }
        
        steps = algorithmEngine.executeSearchingAlgorithm(
          visualizerState.algorithm as SearchingAlgorithm,
          visualizerState.array,
          visualizerState.searchTarget
        );
      }

      setVisualizerState(prev => ({
        ...prev,
        steps,
        currentStep: 0,
        isPlaying: true,
        isPaused: false,
        isComplete: false,
        comparisons: 0,
        swaps: 0,
        timeElapsed: 0
      }));

      toast.success(`Starting ${visualizerState.algorithm.replace('-', ' ')} visualization`, {
        duration: 2000,
        style: {
          background: '#1a1a2e',
          color: '#00ccff',
          border: '1px solid #00ccff'
        }
      });
    } catch (error) {
      console.error('Error executing algorithm:', error);
      toast.error(error instanceof Error ? error.message : 'Algorithm execution failed', {
        duration: 3000,
        style: {
          background: '#1a1a2e',
          color: '#ff3366',
          border: '1px solid #ff3366'
        }
      });
    }
  }, [visualizerState.algorithm, visualizerState.array, visualizerState.steps.length, visualizerState.isComplete, visualizerState.searchTarget, algorithmType, algorithmEngine]);

  const handlePause = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    
    setVisualizerState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: true
    }));
  }, []);

  const handleReset = useCallback(() => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    
    setVisualizerState(prev => ({
      ...prev,
      array: [...prev.originalArray],
      currentStep: 0,
      steps: [],
      isPlaying: false,
      isPaused: false,
      isComplete: false,
      comparisons: 0,
      swaps: 0,
      timeElapsed: 0
    }));

    toast('Visualization reset', {
      duration: 1500,
      style: {
        background: '#1a1a2e',
        color: '#e2e8f0'
      }
    });
  }, []);

  const handleStepForward = useCallback(() => {
    if (visualizerState.steps.length === 0) {
      toast.error('Generate algorithm steps first by clicking Play', {
        duration: 2000,
        style: {
          background: '#1a1a2e',
          color: '#ff3366',
          border: '1px solid #ff3366'
        }
      });
      return;
    }

    if (visualizerState.currentStep < visualizerState.steps.length - 1) {
      setVisualizerState(prev => {
        const nextStep = prev.currentStep + 1;
        const step = prev.steps[nextStep];
        
        // Count comparisons and swaps based on step activity
        let newComparisons = prev.comparisons;
        let newSwaps = prev.swaps;
        
        if (step.comparing && step.comparing.length > 0) {
          newComparisons += 1;
        }
        if (step.swapped && step.swapped.length > 0) {
          newSwaps += 1;
        }
        
        return {
          ...prev,
          currentStep: nextStep,
          array: [...step.array],
          comparisons: newComparisons,
          swaps: newSwaps,
          isPlaying: false,
          isPaused: true
        };
      });
    } else {
      setVisualizerState(prev => ({
        ...prev,
        isComplete: true,
        isPlaying: false
      }));
      
      toast.success('Algorithm completed!', {
        duration: 2000,
        style: {
          background: '#1a1a2e',
          color: '#00ff88',
          border: '1px solid #00ff88'
        }
      });
    }
  }, [visualizerState.steps.length, visualizerState.currentStep]);

  const handleSpeedChange = useCallback((speed: number) => {
    setControlState(prev => ({ ...prev, speed }));
    setVisualizerState(prev => ({ ...prev, speed }));
  }, []);

  const handleArraySizeChange = useCallback((size: number) => {
    setControlState(prev => ({ ...prev, arraySize: size }));
  }, []);

  const handleCustomInputToggle = useCallback((isCustom: boolean) => {
    setControlState(prev => ({ ...prev, isCustomInput: isCustom }));
  }, []);

  const handleCustomArrayChange = useCallback((customArray: string) => {
    setControlState(prev => ({ ...prev, customArray }));
  }, []);

  const handleAlgorithmTypeChange = useCallback((type: 'sorting' | 'searching') => {
    setAlgorithmType(type);
    setVisualizerState(prev => ({
      ...prev,
      algorithm: null,
      currentStep: 0,
      steps: [],
      isPlaying: false,
      isPaused: false,
      isComplete: false
    }));
  }, []);

  const handleSearchTargetChange = useCallback((target: number) => {
    setVisualizerState(prev => ({ ...prev, searchTarget: target }));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Algorithm Selection */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Algorithm Selection</h3>
            <AlgorithmSelector
              algorithmType={algorithmType}
              selectedAlgorithm={visualizerState.algorithm}
              onAlgorithmSelect={handleAlgorithmSelect}
            />
          </div>

          {/* Control Panel */}
          <ControlPanel
            arraySize={controlState.arraySize}
            onArraySizeChange={handleArraySizeChange}
            isCustomInput={controlState.isCustomInput}
            customArray={controlState.customArray}
            onArrayGenerated={handleArrayGenerated}
            onCustomInputToggle={handleCustomInputToggle}
            onCustomArrayChange={handleCustomArrayChange}
            isPlaying={visualizerState.isPlaying}
            isPaused={visualizerState.isPaused}
            isComplete={visualizerState.isComplete}
            speed={visualizerState.speed}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            onStepForward={handleStepForward}
            onSpeedChange={handleSpeedChange}
            algorithmType={algorithmType}
            selectedAlgorithm={visualizerState.algorithm}
            onAlgorithmTypeChange={handleAlgorithmTypeChange}
            currentArray={visualizerState.array}
            searchTarget={visualizerState.searchTarget}
            onSearchTargetChange={handleSearchTargetChange}
          />
        </div>

        {/* Right Panel - Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                {algorithmType === 'sorting' ? 'Sorting' : 'Searching'} Visualization
              </h3>
              {visualizerState.algorithm && (
                <div className="text-sm text-gray-400">
                  Algorithm: <span className="text-ai-cyan font-medium">
                    {visualizerState.algorithm.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              )}
            </div>

            {/* Visualization Area */}
            {algorithmType === 'sorting' ? (
              <SortingVisualizer
                array={visualizerState.array}
                currentStep={visualizerState.steps[visualizerState.currentStep] || null}
                isPlaying={visualizerState.isPlaying}
                width={800}
                height={400}
              />
            ) : (
              <SearchingVisualizer
                array={visualizerState.array}
                currentStep={visualizerState.steps[visualizerState.currentStep] || null}
                isPlaying={visualizerState.isPlaying}
                searchTarget={visualizerState.searchTarget}
                width={800}
                height={400}
              />
            )}

            {/* Statistics Panel */}
            {visualizerState.array.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/60 rounded-lg p-3 text-center">
                  <div className="text-ai-cyan text-lg font-bold">
                    {visualizerState.array.length}
                  </div>
                  <div className="text-gray-400 text-xs">Elements</div>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-3 text-center">
                  <div className="text-ai-green text-lg font-bold">
                    {visualizerState.comparisons}
                  </div>
                  <div className="text-gray-400 text-xs">Comparisons</div>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-3 text-center">
                  <div className="text-ai-purple text-lg font-bold">
                    {visualizerState.swaps}
                  </div>
                  <div className="text-gray-400 text-xs">Swaps</div>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-3 text-center">
                  <div className="text-yellow-400 text-lg font-bold">
                    {Math.round(visualizerState.timeElapsed / 1000)}s
                  </div>
                  <div className="text-gray-400 text-xs">Time</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerContainer;
