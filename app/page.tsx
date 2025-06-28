'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import GitHubIntegration from './components/GitHub/GitHubIntegration';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import BackgroundAnimation from './components/BackgroundAnimation';
import LoadingScreen from './components/LoadingScreen';
import GameLauncher from './components/Games/GameLauncher';
import EasterEggManager from './components/EasterEggs/EasterEggManager';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Preload content
    const preloadTimer = setTimeout(() => {
      setContentReady(true);
    }, 1000);

    return () => clearTimeout(preloadTimer);
  }, []);

  const handleLoadingComplete = () => {
    // Ensure content is ready before transitioning
    if (contentReady) {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    } else {
      // Wait a bit more if content isn't ready
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-ai-dark via-ai-gray to-ai-dark" />
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-ai-dark via-ai-gray to-ai-dark">
      <AnimatePresence mode="wait" onExitComplete={() => {}}>
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <motion.main
            key="main"
            className="relative min-h-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <BackgroundAnimation />
            <Navigation />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative z-10"
            >
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Skills />
              
              {/* GitHub Integration Section */}
              <section id="github" className="py-20 bg-gradient-to-br from-ai-dark/50 to-ai-gray/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                      Development Activity
                    </h2>
                    <p className="text-xl text-ai-light/80 max-w-2xl mx-auto">
                      Real-time insights into my coding journey and open-source contributions
                    </p>
                  </motion.div>
                  
                  <GitHubIntegration />
                </div>
              </section>
              
              <Awards />
              <Contact />
            </motion.div>
            
            {/* Game Launcher - Available after loading */}
            <GameLauncher />
            
            {/* Easter Egg Manager - Hidden features and developer spice */}
            <EasterEggManager />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
