'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalHeader from './TerminalHeader';
import CommandProcessor from './CommandProcessor';
import { TerminalLine, TerminalCommand } from '../../types/terminalTypes';

// Helper function to convert ANSI color codes to HTML
const formatAnsiColors = (text: string): string => {
  return text
    .replace(/\x1b\[32m/g, '<span class="text-green-400">')  // Green
    .replace(/\x1b\[34m/g, '<span class="text-blue-400">')   // Blue  
    .replace(/\x1b\[31m/g, '<span class="text-red-400">')    // Red
    .replace(/\x1b\[33m/g, '<span class="text-yellow-400">') // Yellow
    .replace(/\x1b\[35m/g, '<span class="text-purple-400">') // Purple
    .replace(/\x1b\[36m/g, '<span class="text-cyan-400">')   // Cyan
    .replace(/\x1b\[0m/g, '</span>');                        // Reset
};

const TerminalInterface: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setRerender] = useState(0); // Forcing rerender for prompt update

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Use a persistent CommandProcessor instance
  const commandProcessorRef = useRef<CommandProcessor>(new CommandProcessor());
  const commandProcessor = commandProcessorRef.current;

  // Initialize terminal with welcome message
  useEffect(() => {
    const welcomeLines: TerminalLine[] = [
      { 
        type: 'output', 
        content: '╭─ A Akhil Terminal Interface ─╮', 
        timestamp: new Date() 
      },
      { 
        type: 'output', 
        content: '│ AI/ML Developer & Researcher │', 
        timestamp: new Date() 
      },
      { 
        type: 'output', 
        content: '╰──────────────────────────────╯', 
        timestamp: new Date() 
      },
      { 
        type: 'output', 
        content: '', 
        timestamp: new Date() 
      },
      { 
        type: 'output', 
        content: 'Welcome to my interactive portfolio terminal!', 
        timestamp: new Date() 
      },
      { 
        type: 'output', 
        content: 'Type "help" to see available commands or ask me anything about my work.', 
        timestamp: new Date() 
      },
      { 
        type: 'output', 
        content: '', 
        timestamp: new Date() 
      }
    ];
    
    setLines(welcomeLines);
    
    // Focus input after component mounts
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = (line: TerminalLine) => {
    setLines(prev => [...prev, line]);
  };

  const handleTabCompletion = () => {
    const parts = currentInput.split(' ');
    const commandName = parts[0];
    const args = parts.slice(1);
    
    if (parts.length === 1) {
      // Complete command names
      const commands = ['help', 'ls', 'cat', 'cd', 'pwd', 'whoami', 'ask', 'clear', 'find', 'tree'];
      const matches = commands.filter(cmd => cmd.startsWith(commandName));
      
      if (matches.length === 1) {
        setCurrentInput(matches[0] + ' ');
      } else if (matches.length > 1) {
        addLine({
          type: 'info',
          content: matches.join('  '),
          timestamp: new Date()
        });
      }
    } else if (commandName === 'cat' || commandName === 'cd') {
      // Complete file/directory names
      const currentArg = args[args.length - 1] || '';
      const suggestions = commandProcessor.getCompletions(commandName, currentArg);
      
      if (suggestions.length === 1) {
        const newArgs = [...args.slice(0, -1), suggestions[0]];
        setCurrentInput(commandName + ' ' + newArgs.join(' '));
      } else if (suggestions.length > 1) {
        addLine({
          type: 'info',
          content: suggestions.join('  '),
          timestamp: new Date()
        });
      }
    }
  };

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    addLine({ type: 'command', content: command, timestamp: new Date() });
    setIsProcessing(true);
    setCurrentInput('');
    try {
      const response = await commandProcessor.processCommand(command);
      if (response.length === 1 && response[0].content === 'CLEAR_SCREEN') {
        setLines([]);
        setTimeout(() => inputRef.current?.focus(), 50);
        setRerender(r => r + 1); // Force rerender for prompt
        return;
      }
      response.forEach((line: TerminalLine) => addLine(line));
      setRerender(r => r + 1); // Force rerender for prompt after command
    } catch (error) {
      addLine({
        type: 'error',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      });
    }
    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        handleCommand(currentInput);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex >= 0) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setCurrentInput('');
          } else {
            setHistoryIndex(newIndex);
            setCurrentInput(commandHistory[newIndex]);
          }
        }
        break;
        
      case 'Tab':
        e.preventDefault();
        handleTabCompletion();
        break;
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const getCurrentPrompt = () => {
    // Show current directory in prompt
    let path = commandProcessor.getCurrentDirectoryPath() || '/home/akhil';
    // Shorten to ~ if home
    if (path === '/home/akhil') path = '~';
    else if (path.startsWith('/home/akhil/')) path = '~' + path.slice('/home/akhil'.length);
    return `akhil@portfolio:${path}$ `;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Terminal Header */}
      <TerminalHeader />
      
      {/* Terminal Content */}
      <div 
        ref={containerRef}
        onClick={handleContainerClick}
        className="flex-1 overflow-y-auto p-4 cursor-text"
      >
        {/* Terminal Lines */}
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-1 ${
                line.type === 'command' ? 'text-white' :
                line.type === 'error' ? 'text-red-400' :
                line.type === 'success' ? 'text-green-400' :
                line.type === 'info' ? 'text-cyan-400' :
                'text-green-300'
              }`}
            >
              {line.type === 'command' && (
                <span className="text-yellow-400">{getCurrentPrompt()}</span>
              )}
              <span 
                className="whitespace-pre-wrap" 
                dangerouslySetInnerHTML={{ 
                  __html: formatAnsiColors(line.content) 
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input Line */}
        <div className="flex items-center text-white">
          <span className="text-yellow-400">{getCurrentPrompt()}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="flex-1 bg-transparent outline-none text-white font-mono caret-green-400"
            autoComplete="off"
            spellCheck={false}
          />
          {isProcessing && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-green-400 ml-2"
            >
              ▋
            </motion.span>
          )}
        </div>

        {/* Cursor blink when not processing */}
        {!isProcessing && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-green-400 ml-1"
          />
        )}
      </div>
    </div>
  );
};

export default TerminalInterface;
