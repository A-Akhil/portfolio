'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Terminal } from 'lucide-react';
import Link from 'next/link';
import { getPortfolioData } from '@/app/utils/getPortfolioData';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { navigation, profile } = getPortfolioData();
  const navItems = useMemo(() => navigation.primary ?? [], [navigation]);
  const terminalLauncher = navigation.terminal;

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.target.replace('#', ''),
        element: document.getElementById(item.target.replace('#', '')),
      }));

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-ai-dark/80 backdrop-blur-md border-b border-ai-blue/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text cursor-pointer"
            onClick={() => scrollToSection(navItems[0]?.target ?? '#hero')}
          >
            {profile.name}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <motion.button
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.target.replace('#', '')
                    ? 'text-ai-cyan'
                    : 'text-ai-light hover:text-ai-cyan'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.target.replace('#', '') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-ai-cyan"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            
            {/* Terminal Link */}
            <Link href={terminalLauncher.href}>
              <motion.button
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-400 border border-green-400/30 rounded-lg hover:bg-green-400/10 hover:border-green-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={terminalLauncher.tooltip}
              >
                <Terminal size={16} />
                {terminalLauncher.label}
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ai-light hover:text-ai-cyan p-2"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors ${
                  activeSection === item.target.replace('#', '')
                    ? 'text-ai-cyan bg-ai-blue/10'
                    : 'text-ai-light hover:text-ai-cyan hover:bg-ai-blue/5'
                }`}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
            
            {/* Mobile Terminal Link */}
            <Link href={terminalLauncher.href}>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-base font-medium text-green-400 border border-green-400/30 rounded-lg hover:bg-green-400/10 hover:border-green-400 transition-all mt-4"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Terminal size={18} />
                {terminalLauncher.label}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
