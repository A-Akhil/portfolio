'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, RotateCcw, Save } from 'lucide-react';
import { ThemeColor } from '../../types/easterEggTypes';

interface HexColorPickerProps {
  isVisible: boolean;
  onClose: () => void;
  onThemeChange: (theme: { 
    primary: string; 
    secondary: string; 
    accent: string;
    blue: string;
    dark: string;
    gray: string;
    light: string;
  }) => void;
}

const HexColorPicker: React.FC<HexColorPickerProps> = ({ 
  isVisible, 
  onClose, 
  onThemeChange 
}) => {
  const [selectedColors, setSelectedColors] = useState({
    primary: '#00CCFF',
    secondary: '#8B00FF', 
    accent: '#00FF88',
    blue: '#0066FF',
    dark: '#0A0A0F',
    gray: '#1A1A2E',
    light: '#E2E8F0'
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);

  const colorPresets = [
    { name: 'AI Cyan', hex: '#00CCFF' },
    { name: 'Tech Purple', hex: '#8B00FF' },
    { name: 'Matrix Green', hex: '#00FF88' },
    { name: 'Neural Blue', hex: '#0066FF' },
    { name: 'Neon Pink', hex: '#FF0080' },
    { name: 'Electric Yellow', hex: '#FFFF00' },
    { name: 'Deep Orange', hex: '#FF6600' },
    { name: 'Cyber Red', hex: '#FF3366' },
    { name: 'Arctic Blue', hex: '#00BFFF' },
    { name: 'Lime Green', hex: '#32CD32' },
    { name: 'Magenta', hex: '#FF00FF' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Hot Pink', hex: '#FF69B4' },
    { name: 'Turquoise', hex: '#40E0D0' },
    { name: 'Orange Red', hex: '#FF4500' },
    { name: 'Spring Green', hex: '#00FF7F' }
  ];

  const themePresets = [
    {
      name: 'Default AI',
      primary: '#00CCFF',
      secondary: '#8B00FF',
      accent: '#00FF88',
      blue: '#0066FF',
      dark: '#0A0A0F',
      gray: '#1A1A2E',
      light: '#E2E8F0',
      description: 'Classic AI/ML theme'
    },
    {
      name: 'Neon Nights',
      primary: '#FF0080',
      secondary: '#8A2BE2',
      accent: '#00FFFF',
      blue: '#4169E1',
      dark: '#0F0515',
      gray: '#2A1A3E',
      light: '#F0E8FF',
      description: 'Cyberpunk vibes'
    },
    {
      name: 'Ocean Deep',
      primary: '#00BFFF',
      secondary: '#4169E1',
      accent: '#00CED1',
      blue: '#1E90FF',
      dark: '#051020',
      gray: '#1A2B4A',
      light: '#E0F0FF',
      description: 'Deep ocean blues'
    },
    {
      name: 'Forest Tech',
      primary: '#32CD32',
      secondary: '#228B22',
      accent: '#00FF7F',
      blue: '#008B8B',
      dark: '#0A1A0A',
      gray: '#1A2E1A',
      light: '#E8F5E8',
      description: 'Nature-inspired greens'
    },
    {
      name: 'Sunset Code',
      primary: '#FF6600',
      secondary: '#FF4500',
      accent: '#FFD700',
      blue: '#FF8C00',
      dark: '#1A0A00',
      gray: '#2E1A0A',
      light: '#FFF0E0',
      description: 'Warm sunset colors'
    }
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

  const handleColorChange = (type: 'primary' | 'secondary' | 'accent' | 'blue' | 'dark' | 'gray' | 'light', value: string) => {
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
    
    // Apply theme immediately without page refresh
    if (typeof document !== 'undefined') {
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return '0 0 0';
        return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
      };

      document.documentElement.style.setProperty('--color-ai-cyan', hexToRgb(selectedColors.primary));
      document.documentElement.style.setProperty('--color-ai-purple', hexToRgb(selectedColors.secondary));
      document.documentElement.style.setProperty('--color-ai-green', hexToRgb(selectedColors.accent));
      document.documentElement.style.setProperty('--color-ai-blue', hexToRgb(selectedColors.blue));
      document.documentElement.style.setProperty('--color-ai-dark', hexToRgb(selectedColors.dark));
      document.documentElement.style.setProperty('--color-ai-gray', hexToRgb(selectedColors.gray));
      document.documentElement.style.setProperty('--color-ai-light', hexToRgb(selectedColors.light));
    }
    
    console.log('🎨 Custom theme applied from color picker!', selectedColors);
  };

  const applyPresetTheme = (preset: { primary: string; secondary: string; accent: string; blue: string; dark: string; gray: string; light: string }) => {
    setSelectedColors(preset);
    onThemeChange(preset);
    setPreviewMode(true);
    
    // Apply theme immediately without page refresh
    if (typeof document !== 'undefined') {
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return '0 0 0';
        return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
      };

      document.documentElement.style.setProperty('--color-ai-cyan', hexToRgb(preset.primary));
      document.documentElement.style.setProperty('--color-ai-purple', hexToRgb(preset.secondary));
      document.documentElement.style.setProperty('--color-ai-green', hexToRgb(preset.accent));
      document.documentElement.style.setProperty('--color-ai-blue', hexToRgb(preset.blue));
      document.documentElement.style.setProperty('--color-ai-dark', hexToRgb(preset.dark));
      document.documentElement.style.setProperty('--color-ai-gray', hexToRgb(preset.gray));
      document.documentElement.style.setProperty('--color-ai-light', hexToRgb(preset.light));
    }
    
    console.log('🎨 Preset theme applied:', preset);
  };

  const resetToDefault = () => {
    const defaultTheme = {
      primary: '#00CCFF',
      secondary: '#8B00FF',
      accent: '#00FF88',
      blue: '#0066FF',
      dark: '#0A0A0F',
      gray: '#1A1A2E',
      light: '#E2E8F0'
    };
    setSelectedColors(defaultTheme);
    onThemeChange(defaultTheme);
    setPreviewMode(false);
    
    // Apply theme immediately without page refresh
    if (typeof document !== 'undefined') {
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return '0 0 0';
        return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
      };

      document.documentElement.style.setProperty('--color-ai-cyan', hexToRgb(defaultTheme.primary));
      document.documentElement.style.setProperty('--color-ai-purple', hexToRgb(defaultTheme.secondary));
      document.documentElement.style.setProperty('--color-ai-green', hexToRgb(defaultTheme.accent));
      document.documentElement.style.setProperty('--color-ai-blue', hexToRgb(defaultTheme.blue));
      document.documentElement.style.setProperty('--color-ai-dark', hexToRgb(defaultTheme.dark));
      document.documentElement.style.setProperty('--color-ai-gray', hexToRgb(defaultTheme.gray));
      document.documentElement.style.setProperty('--color-ai-light', hexToRgb(defaultTheme.light));
    }
    
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
    type: 'primary' | 'secondary' | 'accent' | 'blue' | 'dark' | 'gray' | 'light',
    label: string,
    description: string
  ) => {
    const color = selectedColors[type];
    const rgb = hexToRgb(color);

    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          {label}
          <span className="text-xs text-gray-500 ml-2">{description}</span>
        </label>
        
        <div className="flex gap-3">
          {/* Native Color Picker */}
          <div className="relative">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(type, e.target.value)}
              className="w-12 h-10 rounded-lg border-2 border-gray-600 cursor-pointer bg-transparent"
              title={`Pick ${label.toLowerCase()}`}
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none border-2 border-gray-600"></div>
          </div>
          
          {/* Color Preview */}
          <div 
            className="w-12 h-10 rounded-lg border-2 border-gray-600 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => {
              const input = document.getElementById(`color-${type}`) as HTMLInputElement;
              input?.focus();
            }}
          />
          
          {/* Hex Input */}
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
            className="bg-gray-900 border border-ai-cyan rounded-lg p-6 max-w-lg mx-4 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-ai-cyan flex items-center gap-2">
                  <Palette size={20} />
                  Hex Color Picker
                </h3>
                <p className="text-sm text-gray-400">
                  {advancedMode 
                    ? 'Customize all 7 theme colors for full control' 
                    : 'Customize the main 3 colors for quick theming'
                  }
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Basic/Advanced Toggle */}
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${!advancedMode ? 'text-ai-cyan' : 'text-gray-400'}`}>Basic</span>
                  <motion.button
                    onClick={() => setAdvancedMode(!advancedMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      advancedMode ? 'bg-ai-cyan' : 'bg-gray-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                      animate={{ x: advancedMode ? 24 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                  <span className={`text-xs ${advancedMode ? 'text-ai-cyan' : 'text-gray-400'}`}>Advanced</span>
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
            </div>

            {/* Theme Presets */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Theme Presets</h4>
              <div className="grid grid-cols-1 gap-2">
                {themePresets.map((preset) => (
                  <motion.button
                    key={preset.name}
                    onClick={() => applyPresetTheme(preset)}
                    className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex gap-1">
                      <div 
                        className="w-3 h-3 rounded-full border border-gray-600"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full border border-gray-600"
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full border border-gray-600"
                        style={{ backgroundColor: preset.accent }}
                      />
                      {advancedMode && (
                        <div 
                          className="w-3 h-3 rounded-full border border-gray-600"
                          style={{ backgroundColor: preset.blue }}
                        />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{preset.name}</div>
                      <div className="text-xs text-gray-400">{preset.description}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color Inputs */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                {advancedMode ? 'Theme Colors' : 'Main Colors'}
              </h4>
              <div className="space-y-4">
                {renderColorInput('primary', 'Primary Color', 'Main accent color (cyan)')}
                {renderColorInput('secondary', 'Secondary Color', 'Supporting elements (purple)')}
                {renderColorInput('accent', 'Accent Color', 'Highlights and buttons (green)')}
                
                {/* Advanced mode colors */}
                {advancedMode && (
                  <>
                    {renderColorInput('blue', 'Blue Color', 'Additional blue elements')}
                    
                    <h4 className="text-sm font-medium text-gray-300 mb-3 mt-6">UI Colors</h4>
                    {renderColorInput('dark', 'Dark Color', 'Background and dark elements')}
                    {renderColorInput('gray', 'Gray Color', 'UI elements and borders')}
                    {renderColorInput('light', 'Light Color', 'Text and light elements')}
                  </>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Theme Preview</h4>
              <div className={`grid gap-2 ${advancedMode ? 'grid-cols-4' : 'grid-cols-3'}`}>
                <div className="space-y-1">
                  <div 
                    className="h-6 rounded"
                    style={{ backgroundColor: selectedColors.primary }}
                    title="Primary"
                  />
                  <div className="text-xs text-gray-400">Primary</div>
                </div>
                <div className="space-y-1">
                  <div 
                    className="h-6 rounded"
                    style={{ backgroundColor: selectedColors.secondary }}
                    title="Secondary"
                  />
                  <div className="text-xs text-gray-400">Secondary</div>
                </div>
                <div className="space-y-1">
                  <div 
                    className="h-6 rounded"
                    style={{ backgroundColor: selectedColors.accent }}
                    title="Accent"
                  />
                  <div className="text-xs text-gray-400">Accent</div>
                </div>
                
                {/* Advanced mode preview colors */}
                {advancedMode && (
                  <>
                    <div className="space-y-1">
                      <div 
                        className="h-6 rounded"
                        style={{ backgroundColor: selectedColors.blue }}
                        title="Blue"
                      />
                      <div className="text-xs text-gray-400">Blue</div>
                    </div>
                    <div className="space-y-1">
                      <div 
                        className="h-6 rounded"
                        style={{ backgroundColor: selectedColors.dark }}
                        title="Dark"
                      />
                      <div className="text-xs text-gray-400">Dark</div>
                    </div>
                    <div className="space-y-1">
                      <div 
                        className="h-6 rounded"
                        style={{ backgroundColor: selectedColors.gray }}
                        title="Gray"
                      />
                      <div className="text-xs text-gray-400">Gray</div>
                    </div>
                    <div className="space-y-1">
                      <div 
                        className="h-6 rounded"
                        style={{ backgroundColor: selectedColors.light }}
                        title="Light"
                      />
                      <div className="text-xs text-gray-400">Light</div>
                    </div>
                  </>
                )}
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
