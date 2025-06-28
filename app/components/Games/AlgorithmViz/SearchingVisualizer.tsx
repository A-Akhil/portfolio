'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlgorithmStep, ALGORITHM_COLORS } from '../../../types/algorithmTypes';

interface SearchingVisualizerProps {
  array: number[];
  currentStep: AlgorithmStep | null;
  isPlaying: boolean;
  searchTarget?: number;
  width?: number;
  height?: number;
}

const SearchingVisualizer: React.FC<SearchingVisualizerProps> = ({
  array,
  currentStep,
  isPlaying,
  searchTarget,
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
    const barHeightMultiplier = (height - 100) / maxValue;

    // Draw search target indicator
    if (searchTarget !== undefined) {
      ctx.fillStyle = ALGORITHM_COLORS.text;
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Searching for: ${searchTarget}`, 20, 25);
    }

    // Draw bars
    array.forEach((value, index) => {
      const x = 20 + index * (barWidth + barSpacing);
      const barHeight = value * barHeightMultiplier;
      const y = height - 50 - barHeight;

      // Determine bar color based on current step
      let barColor = ALGORITHM_COLORS.default;
      
      if (currentStep) {
        if (currentStep.sorted?.includes(index)) {
          barColor = ALGORITHM_COLORS.sorted; // Found target
        } else if (currentStep.comparing?.includes(index)) {
          barColor = ALGORITHM_COLORS.comparing; // Currently checking
        } else if (currentStep.current === index) {
          barColor = ALGORITHM_COLORS.current; // Current position
        }
      }

      // Highlight target value with special color
      if (value === searchTarget) {
        ctx.strokeStyle = '#ffd700'; // Gold outline for target values
        ctx.lineWidth = 3;
        ctx.strokeRect(x - 1, y - 1, barWidth + 2, barHeight + 2);
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
          height - 30
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

      // Draw search indicators
      if (currentStep && currentStep.comparing?.includes(index)) {
        // Draw search pointer above the bar
        ctx.fillStyle = ALGORITHM_COLORS.comparing;
        ctx.beginPath();
        ctx.moveTo(x + barWidth / 2, y - 15);
        ctx.lineTo(x + barWidth / 2 - 8, y - 25);
        ctx.lineTo(x + barWidth / 2 + 8, y - 25);
        ctx.closePath();
        ctx.fill();
      }
    });

    // Draw legend
    if (currentStep) {
      drawSearchLegend(ctx, width, height);
    }

  }, [array, currentStep, searchTarget, width, height]);

  const drawSearchLegend = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    const legendItems = [
      { color: ALGORITHM_COLORS.comparing, label: 'Checking' },
      { color: ALGORITHM_COLORS.current, label: 'Current' },
      { color: ALGORITHM_COLORS.sorted, label: 'Found' },
      { color: '#ffd700', label: 'Target Value' },
      { color: ALGORITHM_COLORS.default, label: 'Unchecked' }
    ];

    const legendX = canvasWidth - 150;
    const legendY = 50;
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
        <h4 className="text-lg font-semibold text-white">Search Visualization</h4>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>Elements: {array.length}</span>
          {searchTarget !== undefined && (
            <span>Target: {searchTarget}</span>
          )}
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
              <div className="text-4xl mb-2">🔍</div>
              <div>Generate an array to see search visualization</div>
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
            <div className="text-gray-400 text-xs">Checking</div>
          </div>
          <div className="bg-gray-800/60 rounded-lg p-2 text-center">
            <div className="text-ai-purple text-sm font-bold">
              {currentStep.sorted?.length || 0}
            </div>
            <div className="text-gray-400 text-xs">Found</div>
          </div>
          <div className="bg-gray-800/60 rounded-lg p-2 text-center">
            <div className="text-yellow-400 text-sm font-bold">
              {searchTarget !== undefined && array.includes(searchTarget) ? 'Present' : 'Unknown'}
            </div>
            <div className="text-gray-400 text-xs">Status</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchingVisualizer;
