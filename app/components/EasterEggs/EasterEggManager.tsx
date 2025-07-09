'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeOff, Eye, Gamepad2 } from 'lucide-react';
import toast from 'react-hot-toast';

import KonamiDetector from './KonamiDetector';
import KonamiProgress from './KonamiProgress';
import ASCIIArt from './ASCIIArt';
import BinaryClock from './BinaryClock';
import HexColorPicker from './HexColorPicker';
import ConsoleMessages from './ConsoleMessages';
import { EasterEggState, KONAMI_CODE } from '../../types/easterEggTypes';

const EasterEggManager: React.FC = () => {
  const [easterEggState, setEasterEggState] = useState<EasterEggState>({
    konamiActivated: false,
    asciiArtVisible: false,
    binaryClockVisible: false,
    hexPickerVisible: false,
    consoleMessagesActivated: false,
    customTheme: null
  });

  const [showEasterEggPanel, setShowEasterEggPanel] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  // Function to apply theme to CSS variables
  const applyThemeToCss = (theme: { primary: string; secondary: string; accent: string }) => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--color-ai-cyan', theme.primary);
      document.documentElement.style.setProperty('--color-ai-purple', theme.secondary);
      document.documentElement.style.setProperty('--color-ai-green', theme.accent);
    }
  };

  // Initialize and restore state on component mount
  useEffect(() => {
    // Load saved Konami activation state
    const savedKonamiState = localStorage.getItem('konamiActivated');
    const konamiWasActivated = savedKonamiState === 'true';

    // Load saved theme
    const savedTheme = localStorage.getItem('customTheme');
    let customTheme = null;

    if (savedTheme) {
      try {
        customTheme = JSON.parse(savedTheme);
        // Apply saved theme immediately
        applyThemeToCss(customTheme);
        console.log('🎨 Restored custom theme from previous session:', customTheme);
      } catch (error) {
        console.error('Failed to load saved theme:', error);
      }
    }

    // Update state with restored values
    setEasterEggState(prev => ({
      ...prev,
      konamiActivated: konamiWasActivated,
      consoleMessagesActivated: true,
      customTheme: customTheme
    }));

    // Show panel if Konami was previously activated
    if (konamiWasActivated) {
      setShowEasterEggPanel(true);
    }

    // Add welcome message to console
    console.log(`%c🚀 A Akhil's Portfolio Loaded!`, 'color: #00CCFF; font-size: 18px; font-weight: bold;');
    
    if (konamiWasActivated) {
      console.log(`%c🎮 Konami Code Status: ACTIVATED (restored from previous session)`, 'color: #00FF88; font-size: 14px; font-weight: bold;');
      console.log(`%cEaster eggs are available! Check the panel on the right →`, 'color: #00CCFF; font-size: 14px;');
    } else {
      console.log(`%cLooking for easter eggs? Try the Konami code: ↑↑↓↓←→←→BA`, 'color: #00FF88; font-size: 14px;');
    }
    
    console.log(`%cOr check the developer console for hidden commands! 🔍`, 'color: #8B00FF; font-size: 14px;');
    console.log(`%cHint: Make sure no input fields are focused when entering the code!`, 'color: #FF6600; font-size: 12px;');
    
    // Add reset function to global window for debugging
    if (typeof window !== 'undefined') {
      (window as any).resetEasterEggs = resetEasterEggState;
      console.log(`%c🛠️  Debug: Call resetEasterEggs() in console to reset all easter egg state`, 'color: #FF6600; font-size: 12px;');
    }
  }, []);

  const handleKonamiActivated = () => {
    // First update the state
    setEasterEggState(prev => ({
      ...prev,
      konamiActivated: true
    }));

    // Show the panel
    setShowEasterEggPanel(true);
    
    // Save state to localStorage
    localStorage.setItem('konamiActivated', 'true');

    // Show notification toast
    toast('🎮 Konami Code Activated! Easter eggs unlocked!', {
      duration: 4000,
      style: {
        background: '#1a1a2e',
        color: '#00CCFF',
        border: '1px solid #00CCFF'
      },
      icon: '🎮'
    });

    // Log to console
    console.log(`%c🎮 Konami Code Activated! Easter eggs unlocked and saved to session!`, 'color: #00FF88; font-size: 16px; font-weight: bold;');
    
    // Force re-render of the easter egg panel by using a timeout
    setTimeout(() => {
      setShowEasterEggPanel(true);
    }, 100);
  };

  const handleKonamiProgress = (progress: number) => {
    setKonamiProgress(progress);
  };

  const handleThemeChange = (theme: { primary: string; secondary: string; accent: string }) => {
    setEasterEggState(prev => ({
      ...prev,
      customTheme: theme
    }));

    // Apply theme to CSS variables immediately
    applyThemeToCss(theme);

    // Save theme to localStorage for persistence
    localStorage.setItem('customTheme', JSON.stringify(theme));

    toast('🎨 Custom theme applied and saved!', {
      duration: 3000,
      style: {
        background: '#1a1a2e',
        color: theme.primary,
        border: `1px solid ${theme.primary}`
      }
    });

    console.log('🎨 Custom theme applied and saved for future sessions:', theme);
  };

  // Reset all easter egg state (useful for testing or user preference)
  const resetEasterEggState = () => {
    // Clear localStorage
    localStorage.removeItem('konamiActivated');
    localStorage.removeItem('customTheme');

    // Reset to default theme
    const defaultTheme = {
      primary: '#00CCFF',
      secondary: '#8B00FF',
      accent: '#00FF88'
    };
    applyThemeToCss(defaultTheme);

    // Reset state
    setEasterEggState({
      konamiActivated: false,
      asciiArtVisible: false,
      binaryClockVisible: false,
      hexPickerVisible: false,
      consoleMessagesActivated: true,
      customTheme: null
    });

    setShowEasterEggPanel(false);

    toast('🔄 Easter egg state reset', {
      duration: 3000,
      style: {
        background: '#1a1a2e',
        color: '#00CCFF',
        border: '1px solid #00CCFF'
      }
    });

    console.log('🔄 Easter egg state and theme reset to defaults');
  };

  const easterEggButtons = [
    {
      id: 'ascii',
      label: 'ASCII Art',
      icon: '🎨',
      onClick: () => setEasterEggState(prev => ({ ...prev, asciiArtVisible: true })),
      visible: easterEggState.konamiActivated
    },
    {
      id: 'binary',
      label: 'Binary Clock',
      icon: '⏰',
      onClick: () => setEasterEggState(prev => ({ ...prev, binaryClockVisible: true })),
      visible: easterEggState.konamiActivated
    },
    {
      id: 'colors',
      label: 'Color Picker',
      icon: '🎨',
      onClick: () => setEasterEggState(prev => ({ ...prev, hexPickerVisible: true })),
      visible: easterEggState.konamiActivated
    }
  ];

  // Add reset button if Konami is activated
  if (easterEggState.konamiActivated) {
    easterEggButtons.push({
      id: 'reset',
      label: 'Reset All',
      icon: '🔄',
      onClick: resetEasterEggState,
      visible: true
    });
  }

  return (
    <>
      {/* Konami Code Detector - Silent until activation */}
      <KonamiDetector
        onKonamiActivated={handleKonamiActivated}
        isActivated={easterEggState.konamiActivated}
        onProgressChange={handleKonamiProgress}
      />
      
      {/* No progress indicator - completely hidden to keep Konami code secret */}

      {/* Console Messages */}
      <ConsoleMessages
        isActivated={easterEggState.consoleMessagesActivated}
        konamiActivated={easterEggState.konamiActivated}
      />

      {/* Easter Egg Control Panel */}
      <AnimatePresence>
        {easterEggState.konamiActivated && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40"
          >
            <motion.button
              onClick={() => setShowEasterEggPanel(!showEasterEggPanel)}
              className="mb-2 p-3 bg-ai-purple/20 text-ai-purple border border-ai-purple rounded-full hover:bg-ai-purple/30 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Easter Egg Panel"
            >
              {showEasterEggPanel ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.button>

            <AnimatePresence>
              {showEasterEggPanel && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-gray-900/95 backdrop-blur-sm border border-ai-purple rounded-lg p-4 space-y-2 shadow-xl"
                >
                  <div className="flex items-center gap-2 text-ai-purple text-sm font-medium mb-3">
                    <Gamepad2 size={16} />
                    Easter Eggs
                  </div>

                  {easterEggButtons.map((button) => (
                    button.visible && (
                      <motion.button
                        key={button.id}
                        onClick={button.onClick}
                        className="w-full px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{button.icon}</span>
                        {button.label}
                      </motion.button>
                    )
                  ))}

                  <div className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-700">
                    <p>🎮 Konami code activated!</p>
                    <p>Check console for more</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg Components */}
      <ASCIIArt
        isVisible={easterEggState.asciiArtVisible}
        onClose={() => setEasterEggState(prev => ({ ...prev, asciiArtVisible: false }))}
      />

      <BinaryClock
        isVisible={easterEggState.binaryClockVisible}
        onClose={() => setEasterEggState(prev => ({ ...prev, binaryClockVisible: false }))}
      />

      <HexColorPicker
        isVisible={easterEggState.hexPickerVisible}
        onClose={() => setEasterEggState(prev => ({ ...prev, hexPickerVisible: false }))}
        onThemeChange={handleThemeChange}
      />
    </>
  );
};

export default EasterEggManager;
