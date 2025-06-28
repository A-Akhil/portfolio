'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KonamiActivationEffectsProps {
  isActivating: boolean;
  onEffectComplete: () => void;
}

const KonamiActivationEffects: React.FC<KonamiActivationEffectsProps> = ({
  isActivating,
  onEffectComplete
}) => {
  const [selectedEffect, setSelectedEffect] = useState<number>(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);

  // Select random effect when activation starts
  useEffect(() => {
    if (isActivating) {
      const randomEffect = Math.floor(Math.random() * 12) + 1;
      setSelectedEffect(randomEffect);
      
      // Create particles for effects that need them
      if ([5, 11].includes(randomEffect)) {
        const newParticles = Array.from({ length: 100 }, (_, i) => ({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10
        }));
        setParticles(newParticles);
      }

      // Auto-complete effect after duration
      const duration = getEffectDuration(randomEffect);
      setTimeout(() => {
        onEffectComplete();
      }, duration);
    }
  }, [isActivating, onEffectComplete]);

  const getEffectDuration = (effect: number) => {
    const durations = [0, 4000, 3000, 2500, 3000, 4000, 3500, 3000, 2500, 3000, 3500, 4000, 2500];
    return durations[effect] || 3000;
  };

  // Effect 1: Wormhole Portal
  const WormholeEffect = () => (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: [0, 2, 1.5, 0], rotate: [0, 720, 1080, 1440] }}
      transition={{ duration: 4, ease: "easeInOut" }}
      className="fixed top-1/2 right-4 transform -translate-y-1/2 flex items-center justify-center pointer-events-none z-50"
    >
      <div className="relative">
        {/* Wormhole rings */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-4 border-ai-cyan rounded-full"
            style={{
              width: `${(i + 1) * 60}px`,
              height: `${(i + 1) * 60}px`,
              left: `${-(i + 1) * 30}px`,
              top: `${-(i + 1) * 30}px`,
            }}
            animate={{
              scale: [1, 0.5, 1],
              opacity: [0.8, 0.3, 0.8],
              rotate: [0, 360]
            }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              repeat: 3,
              ease: "easeInOut"
            }}
          />
        ))}
        {/* Center portal */}
        <motion.div
          className="w-24 h-24 bg-gradient-radial from-ai-cyan via-ai-purple to-transparent rounded-full"
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 4 }}
        />
      </div>
    </motion.div>
  );

  // Effect 2: Matrix Digital Rain
  const MatrixEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 3 }}
      className="fixed top-0 right-0 w-1/3 h-full z-50 overflow-hidden"
      style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.9), transparent)' }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-ai-green font-mono text-sm"
          style={{ left: `${i * 5}%` }}
          animate={{
            y: [-100, window.innerHeight + 100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 1,
            ease: "linear"
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j}>
              {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
            </div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );

  // Effect 3: Neural Network Explosion
  const NeuralNetworkEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2.5 }}
      className="fixed top-1/2 right-4 w-96 h-96 transform -translate-y-1/2 z-50"
    >
      <svg className="w-full h-full absolute">
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i * 360) / 20;
          const x1 = 50;
          const y1 = 50;
          const x2 = 50 + 40 * Math.cos((angle * Math.PI) / 180);
          const y2 = 50 + 40 * Math.sin((angle * Math.PI) / 180);
          return (
            <motion.line
              key={i}
              x1={`${x1}%`} y1={`${y1}%`}
              x2={`${x2}%`} y2={`${y2}%`}
              stroke="rgb(var(--color-ai-cyan))"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: i * 0.05 }}
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={`${50 + (Math.random() - 0.5) * 60}%`}
            cy={`${50 + (Math.random() - 0.5) * 60}%`}
            r="4"
            fill="rgb(var(--color-ai-green))"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: Math.random() * 1 }}
          />
        ))}
      </svg>
    </motion.div>
  );

  // Effect 4: Holographic Scan Lines
  const HolographicEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 3 }}
      className="fixed top-0 right-0 w-1/2 h-full z-50"
    >
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-1 bg-gradient-to-l from-ai-cyan via-ai-cyan/50 to-transparent"
          style={{ top: `${i * 6.67}%` }}
          animate={{
            x: [window.innerWidth, -window.innerWidth / 2],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0 bg-gradient-to-l from-ai-blue/20 via-transparent to-transparent"
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 3 }}
      />
    </motion.div>
  );

  // Effect 5: Quantum Particle Burst
  const QuantumParticleEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 4 }}
      className="fixed inset-0 z-50"
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-ai-cyan rounded-full"
          style={{
            left: window.innerWidth / 2,
            top: window.innerHeight / 2,
          }}
          animate={{
            x: particle.x - window.innerWidth / 2,
            y: particle.y - window.innerHeight / 2,
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.div>
  );

  // Effect 6: AI Mind Meld Interface
  const MindMeldEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 3.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <svg className="w-full h-full">
        {/* Brain-like pathways */}
        {Array.from({ length: 20 }).map((_, i) => {
          const path = `M ${50 + Math.random() * 20} ${50 + Math.random() * 20} 
                       Q ${50 + Math.random() * 40} ${50 + Math.random() * 40} 
                       ${50 + Math.random() * 20} ${50 + Math.random() * 20}`;
          return (
            <motion.path
              key={i}
              d={path}
              stroke="rgb(var(--color-ai-purple))"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0], 
                opacity: [0, 1, 0],
                stroke: ["rgb(var(--color-ai-purple))", "rgb(var(--color-ai-cyan))", "rgb(var(--color-ai-green))"]
              }}
              transition={{ duration: 2, delay: i * 0.1, repeat: 1 }}
            />
          );
        })}
      </svg>
    </motion.div>
  );

  // Effect 7: Spacetime Distortion
  const SpacetimeEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 3 }}
      className="fixed inset-0 z-50"
      style={{
        background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 80%)'
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          transform: [
            'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            'perspective(1000px) rotateX(20deg) rotateY(20deg)',
            'perspective(1000px) rotateX(-10deg) rotateY(-10deg)',
            'perspective(1000px) rotateX(0deg) rotateY(0deg)'
          ]
        }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-ai-cyan"
            style={{
              width: `${(i + 1) * 10}%`,
              height: `${(i + 1) * 10}%`,
              left: `${50 - (i + 1) * 5}%`,
              top: `${50 - (i + 1) * 5}%`,
            }}
            animate={{
              rotateZ: [0, 180, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 2, delay: i * 0.1 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );

  // Effect 8: Cyberpunk Data Stream
  const CyberpunkEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2.5 }}
      className="fixed inset-0 z-50 bg-black"
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-ai-cyan"
          style={{ left: `${i * 3.33}%` }}
          animate={{
            y: [-50, window.innerHeight + 50],
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 0.5,
            ease: "linear"
          }}
        >
          {Array.from({ length: 15 }).map((_, j) => (
            <div key={j} className="leading-4">
              {Math.random().toString(16).substr(2, 8)}
            </div>
          ))}
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-ai-cyan/10 via-ai-purple/10 to-ai-green/10"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2.5 }}
      />
    </motion.div>
  );

  // Effect 9: Code Compilation Sequence
  const CompilationEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 3 }}
      className="fixed inset-0 z-50 bg-black p-4 font-mono text-sm"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-ai-green"
      >
        $ konami-code --activate --easter-eggs
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-ai-cyan mt-2"
      >
        Compiling quantum algorithms...
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-ai-purple mt-1"
      >
        Initializing neural networks...
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="text-ai-green mt-1"
      >
        Loading easter egg modules...
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="text-ai-cyan mt-2"
      >
        ✅ COMPILATION SUCCESSFUL
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="text-ai-green mt-1"
      >
        🎮 Easter eggs activated!
      </motion.div>
    </motion.div>
  );

  // Effect 10: Prismatic Reality Shatter
  const PrismaticEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 3.5 }}
      className="fixed inset-0 z-50"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
            background: `linear-gradient(${Math.random() * 360}deg, 
              hsl(${Math.random() * 360}, 70%, 50%), 
              hsl(${Math.random() * 360}, 70%, 50%))`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
          animate={{
            rotate: [0, 360],
            scale: [0, 1.5, 0],
            x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 400],
            y: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 400],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.div>
  );

  // Effect 11: Phoenix Rising Digital Rebirth
  const PhoenixEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 4 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Fire particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: window.innerWidth / 2,
            top: window.innerHeight / 2,
            background: `hsl(${Math.random() * 60}, 100%, 50%)`
          }}
          animate={{
            x: particle.x - window.innerWidth / 2,
            y: particle.y - window.innerHeight / 2,
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            ease: "easeOut"
          }}
        />
      ))}
      {/* Phoenix shape */}
      <motion.div
        className="relative"
        animate={{
          scale: [0, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 3 }}
      >
        <motion.div
          className="w-32 h-32 bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1, repeat: 3 }}
        />
      </motion.div>
    </motion.div>
  );

  // Effect 12: Retro Gaming Portal
  const RetroGamingEffect = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ duration: 2 }}
        className="relative"
      >
        {/* Pixelated portal */}
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4"
              style={{
                backgroundColor: Math.random() > 0.5 ? 'rgb(var(--color-ai-cyan))' : 'rgb(var(--color-ai-green))'
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1,
                delay: i * 0.02,
                repeat: 1
              }}
            />
          ))}
        </div>
        {/* Retro text */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-ai-green font-mono text-xl"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: 1 }}
        >
          KONAMI CODE ACTIVATED
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const renderEffect = () => {
    switch (selectedEffect) {
      case 1: return <WormholeEffect />;
      case 2: return <MatrixEffect />;
      case 3: return <NeuralNetworkEffect />;
      case 4: return <HolographicEffect />;
      case 5: return <QuantumParticleEffect />;
      case 6: return <MindMeldEffect />;
      case 7: return <SpacetimeEffect />;
      case 8: return <CyberpunkEffect />;
      case 9: return <CompilationEffect />;
      case 10: return <PrismaticEffect />;
      case 11: return <PhoenixEffect />;
      case 12: return <RetroGamingEffect />;
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {isActivating && renderEffect()}
    </AnimatePresence>
  );
};

export default KonamiActivationEffects;
