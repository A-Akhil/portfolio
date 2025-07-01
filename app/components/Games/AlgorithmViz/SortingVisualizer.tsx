'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlgorithmStep, ALGORITHM_COLORS } from '../../../types/algorithmTypes';

interface SortingVisualizerProps {
  array: number[];
  currentStep: AlgorithmStep | null;
  isPlaying: boolean;
  width?: number;
  height?: number;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  array,
  currentStep,
  isPlaying,
  width = 800,
  height = 400
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.fillStyle = ALGORITHM_COLORS.background;
    ctx.fillRect(0, 0, width, height);

    if (array.length === 0) return;

    // Calculate bar dimensions
    const barWidth = Math.max(2, Math.floor((width - 40) / array.length));
    const barSpacing = Math.max(1, Math.floor(barWidth * 0.1));
    const maxValue = Math.max(...array);
    const barHeightMultiplier = (height - 60) / maxValue;

    // Draw bars
    array.forEach((value, index) => {
      const x = 20 + index * (barWidth + barSpacing);
      const barHeight = value * barHeightMultiplier;
      const y = height - 30 - barHeight;

      // Determine bar color based on current step
      let barColor = ALGORITHM_COLORS.default;
      
      if (currentStep) {
        if (currentStep.sorted?.includes(index)) {
          barColor = ALGORITHM_COLORS.sorted;
        } else if (currentStep.comparing?.includes(index)) {
          barColor = ALGORITHM_COLORS.comparing;
        } else if (currentStep.swapped?.includes(index)) {
          barColor = ALGORITHM_COLORS.swapped;
        } else if (currentStep.current === index) {
          barColor = ALGORITHM_COLORS.current;
        } else if (currentStep.pivots?.includes(index)) {
          barColor = ALGORITHM_COLORS.pivot;
        }
      }

      // Draw bar with gradient effect
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, barColor);
      gradient.addColorStop(1, barColor + '80'); // Add transparency

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw bar outline
      ctx.strokeStyle = ALGORITHM_COLORS.text + '40';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, barWidth, barHeight);

      // Draw value labels for smaller arrays
      if (array.length <= 20) {
        ctx.fillStyle = ALGORITHM_COLORS.text;
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(
          value.toString(),
          x + barWidth / 2,
          height - 10
        );
      }

      // Draw index labels for very small arrays
      if (array.length <= 10) {
        ctx.fillStyle = ALGORITHM_COLORS.text + '80';
        ctx.font = '10px monospace';
        ctx.fillText(
          index.toString(),
          x + barWidth / 2,
          y - 5
        );
      }
    });

    // Draw legend
    if (currentStep) {
      drawLegend(ctx, width, height);
    }

  }, [array, currentStep, width, height]);

  const drawLegend = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    const legendItems = [
      { color: ALGORITHM_COLORS.comparing, label: 'Comparing' },
      { color: ALGORITHM_COLORS.current, label: 'Current' },
      { color: ALGORITHM_COLORS.sorted, label: 'Sorted' },
      { color: ALGORITHM_COLORS.swapped, label: 'Swapped' },
      { color: ALGORITHM_COLORS.pivot, label: 'Pivot' }
    ];

    const legendX = canvasWidth - 150;
    const legendY = 20;
    const itemHeight = 20;

    // Draw legend background
    ctx.fillStyle = ALGORITHM_COLORS.background + 'CC';
    ctx.fillRect(legendX - 10, legendY - 5, 140, legendItems.length * itemHeight + 10);
    ctx.strokeStyle = ALGORITHM_COLORS.text + '40';
    ctx.strokeRect(legendX - 10, legendY - 5, 140, legendItems.length * itemHeight + 10);

    legendItems.forEach((item, index) => {
      const y = legendY + index * itemHeight;
      
      // Draw color square
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, y, 12, 12);
      ctx.strokeStyle = ALGORITHM_COLORS.text + '60';
      ctx.strokeRect(legendX, y, 12, 12);

      // Draw label
      ctx.fillStyle = ALGORITHM_COLORS.text;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(item.label, legendX + 20, y + 10);
    });
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white">Sorting Visualization</h4>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>Elements: {array.length}</span>
          {currentStep && (
            <span>Step: {currentStep.stepNumber}</span>
          )}
        </div>
      </div>

      <div className="relative bg-black/30 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-full"
          style={{ maxHeight: '400px' }}
        />
        
        {array.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📊</div>
              <div>Generate an array to see visualization</div>
            </div>
          </div>
        )}
      </div>

      {/* Current Step Description */}
      {currentStep && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-ai-cyan/10 border border-ai-cyan/30 rounded-lg"
        >
          <div className="text-sm text-ai-cyan font-medium mb-1">
            Step {currentStep.stepNumber}
          </div>
          <div className="text-sm text-gray-300">
            {currentStep.description}
          </div>
        </motion.div>
      )}

      {/* Statistics */}
      {currentStep && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="bg-gray-800/60 rounded-lg p-2 text-center">
            <div className="text-ai-cyan text-sm font-bold">
              {currentStep.stepNumber}
            </div>
            <div className="text-gray-400 text-xs">Step</div>
          </div>
          <div className="bg-gray-800/60 rounded-lg p-2 text-center">
            <div className="text-ai-green text-sm font-bold">
              {currentStep.comparing?.length || 0}
            </div>
            <div className="text-gray-400 text-xs">Comparing</div>
          </div>
          <div className="bg-gray-800/60 rounded-lg p-2 text-center">
            <div className="text-ai-purple text-sm font-bold">
              {currentStep.sorted?.length || 0}
            </div>
            <div className="text-gray-400 text-xs">Sorted</div>
          </div>
          <div className="bg-gray-800/60 rounded-lg p-2 text-center">
            <div className="text-yellow-400 text-sm font-bold">
              {Math.round(((currentStep.sorted?.length || 0) / array.length) * 100)}%
            </div>
            <div className="text-gray-400 text-xs">Complete</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingVisualizer;
