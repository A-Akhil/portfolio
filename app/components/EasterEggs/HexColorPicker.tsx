'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, RotateCcw, Save } from 'lucide-react';
import { ThemeColor } from '../../types/easterEggTypes';

interface HexColorPickerProps {
  isVisible: boolean;
  onClose: () => void;
  onThemeChange: (theme: { primary: string; secondary: string; accent: string }) => void;
}

const HexColorPicker: React.FC<HexColorPickerProps> = ({ 
  isVisible, 
  onClose, 
  onThemeChange 
}) => {
  const [selectedColors, setSelectedColors] = useState({
    primary: '#00CCFF',
    secondary: '#8B00FF', 
    accent: '#00FF88'
  });

  const [previewMode, setPreviewMode] = useState(false);

  const colorPresets = [
    { name: 'AI Cyan', hex: '#00CCFF' },
    { name: 'Tech Purple', hex: '#8B00FF' },
    { name: 'Matrix Green', hex: '#00FF88' },
    { name: 'Neural Blue', hex: '#0066FF' },
    { name: 'Neon Pink', hex: '#FF0080' },
    { name: 'Electric Yellow', hex: '#FFFF00' },
    { name: 'Deep Orange', hex: '#FF6600' },
    { name: 'Cyber Red', hex: '#FF3366' }
  ];

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const isValidHex = (hex: string) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  };

  const handleColorChange = (type: 'primary' | 'secondary' | 'accent', value: string) => {
    if (isValidHex(value)) {
      setSelectedColors(prev => ({
        ...prev,
        [type]: value
      }));
    }
  };

  const applyTheme = () => {
    onThemeChange(selectedColors);
    setPreviewMode(true);
    
    console.log('🎨 Custom theme applied from color picker!', selectedColors);
  };

  const resetToDefault = () => {
    const defaultTheme = {
      primary: '#00CCFF',
      secondary: '#8B00FF',
      accent: '#00FF88'
    };
    setSelectedColors(defaultTheme);
    onThemeChange(defaultTheme);
    setPreviewMode(false);
    
    console.log('🔄 Theme reset to default from color picker');
  };

  // Load saved theme on component mount and sync with parent
  useEffect(() => {
    const savedTheme = localStorage.getItem('customTheme');
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme);
        setSelectedColors(theme);
        setPreviewMode(true);
        // Note: Don't call onThemeChange here to avoid double-application
        // The EasterEggManager already applies the theme on mount
      } catch (error) {
        console.error('Failed to load saved theme in color picker:', error);
      }
    }
  }, []);

  const renderColorInput = (
    type: 'primary' | 'secondary' | 'accent',
    label: string,
    description: string
  ) => {
    const color = selectedColors[type];
    const rgb = hexToRgb(color);

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          {label}
          <span className="text-xs text-gray-500 ml-2">{description}</span>
        </label>
        
        <div className="flex gap-2">
          <div 
            className="w-12 h-10 rounded-lg border-2 border-gray-600 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => {
              // Focus the input when clicking the color preview
              const input = document.getElementById(`color-${type}`) as HTMLInputElement;
              input?.focus();
            }}
          />
          
          <input
            id={`color-${type}`}
            type="text"
            value={color}
            onChange={(e) => handleColorChange(type, e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white font-mono text-sm focus:border-ai-cyan focus:outline-none"
            placeholder="#RRGGBB"
          />
        </div>

        {rgb && (
          <div className="text-xs text-gray-500 font-mono">
            RGB({rgb.r}, {rgb.g}, {rgb.b})
          </div>
        )}

        {/* Color Presets */}
        <div className="flex gap-1 flex-wrap">
          {colorPresets.map((preset) => (
            <motion.button
              key={preset.name}
              onClick={() => handleColorChange(type, preset.hex)}
              className="w-6 h-6 rounded border border-gray-600 hover:border-white transition-colors"
              style={{ backgroundColor: preset.hex }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={preset.name}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            className="bg-gray-900 border border-ai-cyan rounded-lg p-6 max-w-md mx-4 relative max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-ai-cyan flex items-center gap-2">
                  <Palette size={20} />
                  Hex Color Picker
                </h3>
                <p className="text-sm text-gray-400">Customize your portfolio theme</p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Color Inputs */}
            <div className="space-y-6">
              {renderColorInput('primary', 'Primary Color', 'Main accent color')}
              {renderColorInput('secondary', 'Secondary Color', 'Supporting elements')}
              {renderColorInput('accent', 'Accent Color', 'Highlights and buttons')}
            </div>

            {/* Preview */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Theme Preview</h4>
              <div className="space-y-2">
                <div 
                  className="h-3 rounded"
                  style={{ backgroundColor: selectedColors.primary }}
                />
                <div 
                  className="h-3 rounded"
                  style={{ backgroundColor: selectedColors.secondary }}
                />
                <div 
                  className="h-3 rounded"
                  style={{ backgroundColor: selectedColors.accent }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6">
              <motion.button
                onClick={applyTheme}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-ai-green/20 text-ai-green border border-ai-green rounded-lg hover:bg-ai-green/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={16} />
                Apply Theme
              </motion.button>
              
              <motion.button
                onClick={resetToDefault}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={16} />
                Reset
              </motion.button>
            </div>

            {previewMode && (
              <div className="mt-4 p-3 bg-ai-green/10 border border-ai-green/30 rounded-lg">
                <p className="text-sm text-ai-green">
                  ✅ Custom theme applied and saved! Changes persist across page refreshes.
                </p>
              </div>
            )}

            {/* Easter Egg Info */}
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>🎨 Hex Color Picker Easter Egg • Make the portfolio yours!</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HexColorPicker;
