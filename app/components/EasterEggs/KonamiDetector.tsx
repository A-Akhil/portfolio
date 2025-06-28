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
          onKonamiActivated();
          return [];
        }
      }

      return newSequence;
    });
  }, [lastInputTime, onKonamiActivated, isActivated, resetSequence]);

  // Notify parent of progress changes
  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(inputSequence.length);
    }
  }, [inputSequence.length, onProgressChange]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Debug mode - show current sequence in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && inputSequence.length > 0) {
      const readableSequence = inputSequence.map(key => 
        key.replace('Arrow', '').replace('Key', '')
      ).join(' → ');
      console.log(`🔑 Current sequence: ${readableSequence}`);
      
      const remaining = KONAMI_CODE.length - inputSequence.length;
      if (remaining > 0) {
        const nextKeys = KONAMI_CODE.slice(inputSequence.length, inputSequence.length + 3)
          .map(key => key.replace('Arrow', '').replace('Key', ''))
          .join(' → ');
        console.log(`📝 Next keys needed: ${nextKeys}`);
      }
      
      // Show progress
      const progress = Math.round((inputSequence.length / KONAMI_CODE.length) * 100);
      console.log(`📊 Progress: ${progress}% (${inputSequence.length}/${KONAMI_CODE.length})`);
    }
  }, [inputSequence]);

  return null; // This component doesn't render anything visible
};

export default KonamiDetector;
