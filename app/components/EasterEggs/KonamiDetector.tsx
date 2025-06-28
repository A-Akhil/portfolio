'use client';

import { useEffect, useState, useCallback } from 'react';
import { KONAMI_CODE } from '../../types/easterEggTypes';

interface KonamiDetectorProps {
  onKonamiActivated: () => void;
  isActivated: boolean;
  onProgressChange?: (progress: number) => void;
}

const KonamiDetector: React.FC<KonamiDetectorProps> = ({
  onKonamiActivated,
  isActivated,
  onProgressChange
}) => {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [lastInputTime, setLastInputTime] = useState<number>(0);

  const resetSequence = useCallback(() => {
    setInputSequence([]);
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Prevent detection when user is typing in input fields
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement) {
      return;
    }

    const currentTime = Date.now();
    const timeSinceLastInput = currentTime - lastInputTime;

    // Reset sequence if too much time has passed (3 seconds for easier input)
    if (timeSinceLastInput > 3000) {
      resetSequence();
    }

    setLastInputTime(currentTime);

    // Add the new key to the sequence
    setInputSequence(prev => {
      const newSequence = [...prev, event.code];
      
      // Keep only the last 10 keys (length of Konami code)
      if (newSequence.length > KONAMI_CODE.length) {
        newSequence.shift();
      }

      // Check if the sequence matches the Konami code
      if (newSequence.length === KONAMI_CODE.length) {
        const matches = newSequence.every((key, index) => key === KONAMI_CODE[index]);
        
        if (matches && !isActivated) {
          console.log('🎮 KONAMI CODE ACTIVATED! 🎮');
          // Defer the callback to avoid React warning about updating during render
          setTimeout(() => {
            onKonamiActivated();
          }, 0);
          return [];
        }
      }

      return newSequence;
    });
  }, [lastInputTime, onKonamiActivated, isActivated, resetSequence]);

  // Only notify parent of activation, not intermediate progress
  useEffect(() => {
    if (onProgressChange) {
      // Only update progress to 0 to hide the sequence entry completely
      onProgressChange(0);
    }
  }, [onProgressChange]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Debug mode - only log when code is fully activated
  useEffect(() => {
    // Only log when full code is activated, not during progress
    // This keeps the Konami code truly secret
    if (process.env.NODE_ENV === 'development' && isActivated) {
      console.log('🎮 KONAMI CODE STATUS: ACTIVATED');
    }
  }, [isActivated]);

  return null; // This component doesn't render anything visible
};

export default KonamiDetector;
