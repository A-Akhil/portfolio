'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shuffle, Upload, Contrast, Sliders } from 'lucide-react';
import { ASCII_ART_COLLECTION, ASCIIArt, CustomASCIIArtOptions } from '../../types/easterEggTypes';

interface ASCIIArtProps {
  isVisible: boolean;
  onClose: () => void;
}

// ASCII characters from dark to light
const ASCII_CHARS = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];

const ASCIIArtComponent: React.FC<ASCIIArtProps> = ({ isVisible, onClose }) => {
  const [currentArt, setCurrentArt] = useState<ASCIIArt>(ASCII_ART_COLLECTION[0]);
  const [animatedLines, setAnimatedLines] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<CustomASCIIArtOptions>({
    density: 'medium',
    contrast: 1,
    invert: false
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const typewriterEffect = (art: ASCIIArt) => {
    setIsAnimating(true);
    setAnimatedLines([]);
    
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < art.art.length) {
        setAnimatedLines(prev => [...prev, art.art[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 150); // Delay between lines
  };

  const shuffleArt = () => {
    if (!isAnimating) {
      const randomIndex = Math.floor(Math.random() * ASCII_ART_COLLECTION.length);
      const newArt = ASCII_ART_COLLECTION[randomIndex];
      setCurrentArt(newArt);
      typewriterEffect(newArt);
      setShowUpload(false);
    }
  };

  // Image to ASCII conversion functions
  
  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, GIF)');
      return;
    }
    
    setIsProcessing(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        convertImageToASCII(img);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);
  
  const convertImageToASCII = useCallback((img: HTMLImageElement) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Determine output dimensions based on density
    let width, height;
    switch(options.density) {
      case 'low':
        width = 40;
        break;
      case 'medium':
        width = 80;
        break;
      case 'high':
        width = 120;
        break;
      default:
        width = 80;
    }
    
    // Calculate height to maintain aspect ratio
    const aspectRatio = img.height / img.width;
    height = Math.floor(width * aspectRatio * 0.5); // Multiply by 0.5 because characters are taller than wide
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Draw and resize image on canvas
    ctx.drawImage(img, 0, 0, width, height);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    // Generate ASCII art
    const asciiLines: string[] = [];
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        
        // Calculate brightness (0-255)
        let brightness = (0.299 * r + 0.587 * g + 0.114 * b) * options.contrast;
        brightness = Math.max(0, Math.min(255, brightness));
        
        // Map brightness to ASCII character
        const charIndex = options.invert 
          ? Math.floor((255 - brightness) * (ASCII_CHARS.length - 1) / 255)
          : Math.floor(brightness * (ASCII_CHARS.length - 1) / 255);
          
        line += ASCII_CHARS[charIndex];
      }
      asciiLines.push(line);
    }
    
    // Create custom ASCII art object
    const customArt: ASCIIArt = {
      id: 'custom-' + Date.now(),
      name: 'Custom Image',
      art: asciiLines,
      description: 'Generated from uploaded image',
      isCustom: true
    };
    
    setCurrentArt(customArt);
    typewriterEffect(customArt);
    setIsProcessing(false);
  }, [options]);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFileSelect]);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFileSelect]);
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  useEffect(() => {
    if (isVisible) {
      if (!showUpload) {
        typewriterEffect(currentArt);
      }
    }
  }, [isVisible, currentArt, showUpload]);

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
            className="bg-gray-900 border border-ai-cyan rounded-lg p-6 max-w-xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-ai-cyan">
                  {showUpload ? 'Image to ASCII Converter' : 'ASCII Art Gallery'}
                </h3>
                <p className="text-sm text-gray-400">
                  {showUpload ? 'Drop an image to convert to ASCII art' : currentArt.description}
                </p>
              </div>
              <div className="flex gap-2">
                {!showUpload && (
                  <motion.button
                    onClick={shuffleArt}
                    disabled={isAnimating}
                    className="p-2 bg-ai-purple/20 text-ai-purple rounded-lg hover:bg-ai-purple/30 transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shuffle size={16} />
                  </motion.button>
                )}
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

            {/* Toggle between Upload and Gallery */}
            <div className="flex justify-center mb-4">
              <div className="bg-gray-800 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setShowUpload(false)}
                  className={`px-4 py-1 rounded-md text-sm transition ${
                    !showUpload ? 'bg-ai-cyan/20 text-ai-cyan' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Gallery
                </button>
                <button
                  onClick={() => setShowUpload(true)}
                  className={`px-4 py-1 rounded-md text-sm transition ${
                    showUpload ? 'bg-ai-cyan/20 text-ai-cyan' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Convert Image
                </button>
              </div>
            </div>

            {/* Image Upload Area */}
            {showUpload && (
              <div className="mb-4">
                <div
                  className={`bg-black rounded-lg p-6 border-2 border-dashed transition-colors flex flex-col items-center justify-center min-h-[200px] ${
                    isDragging ? 'border-ai-cyan bg-ai-cyan/5' : 'border-gray-700'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={triggerFileInput}
                >
                  {isProcessing ? (
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-ai-cyan/20 border-t-ai-cyan rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-ai-cyan">Processing image...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="text-ai-cyan mb-3" size={32} />
                      <p className="text-gray-400 text-center mb-2">Drag & drop an image here</p>
                      <p className="text-gray-500 text-xs text-center">or click to browse files</p>
                    </>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {/* Image conversion options */}
                <div className="mt-4 bg-gray-800/50 rounded-lg p-3">
                  <div className="text-sm text-gray-300 font-medium mb-2 flex items-center">
                    <Sliders size={14} className="mr-1" /> Conversion Options
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400">Density</label>
                      <select
                        value={options.density}
                        onChange={(e) => setOptions({...options, density: e.target.value})}
                        className="w-full bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm"
                        disabled={isProcessing}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 flex items-center">
                        <Contrast size={12} className="mr-1" /> Contrast
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={options.contrast}
                        onChange={(e) => setOptions({...options, contrast: parseFloat(e.target.value)})}
                        className="w-full accent-ai-cyan"
                        disabled={isProcessing}
                      />
                      <div className="text-xs text-gray-500 text-right">{options.contrast.toFixed(1)}x</div>
                    </div>
                    <div className="flex items-center">
                      <label className="text-xs text-gray-400 mr-2">Invert</label>
                      <input
                        type="checkbox"
                        checked={options.invert}
                        onChange={(e) => setOptions({...options, invert: e.target.checked})}
                        className="accent-ai-cyan h-4 w-4 rounded"
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hidden canvas for image processing */}
            <canvas ref={canvasRef} className="hidden" />

            {/* ASCII Art Display */}
            <div className="bg-black rounded-lg p-3 overflow-auto max-h-[60vh] font-mono text-xs">
              {animatedLines.map((line, index) => (
                <motion.div
                  key={`line-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre text-ai-cyan leading-[0.8]"
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Footer with attribution */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              {showUpload ? 
                "Upload any image to convert to ASCII art in real-time" : 
                `ASCII Art Collection • ${ASCII_ART_COLLECTION.length} designs available`}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ASCIIArtComponent;
