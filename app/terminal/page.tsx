'use client';

// Add Cloudflare Edge runtime configuration
export const runtime = 'edge';

import React from 'react';
import { motion } from 'framer-motion';
import TerminalInterface from '../components/Terminal/TerminalInterface';

export default function TerminalPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-green-400 font-mono overflow-hidden"
    >
      {/* Terminal Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900/10" />
      
      {/* Scanlines Effect */}
      <div className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" 
           style={{
             backgroundImage: `linear-gradient(transparent 50%, rgba(0, 255, 0, 0.1) 50%)`,
             backgroundSize: '100% 4px'
           }} 
      />
      
      {/* Main Terminal Interface */}
      <div className="relative z-10 h-screen">
        <TerminalInterface />
      </div>
    </motion.div>
  );
}
