'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import type { IconType } from 'react-icons';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaDownload, FaLink } from 'react-icons/fa';
import { getPortfolioData } from '@/app/utils/getPortfolioData';
import type { CtaButton } from '@/app/types/portfolioData';

const Hero = () => {
  const { hero, profile } = getPortfolioData();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const iconMap: Record<string, IconType> = {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaPhone,
  };

  const floatingIcons = hero.floatingIcons.length
    ? hero.floatingIcons
    : [
        { emoji: '🧠', positionClass: 'absolute top-20 left-10 text-ai-cyan opacity-20', animationDelay: 0 },
        { emoji: '⚡', positionClass: 'absolute top-40 right-20 text-ai-green opacity-20', animationDelay: 1 },
        { emoji: '🤖', positionClass: 'absolute bottom-40 left-20 text-ai-purple opacity-20', animationDelay: 2 },
        { emoji: '💡', positionClass: 'absolute bottom-20 right-10 text-ai-blue opacity-20', animationDelay: 3 },
      ];

  const floatingSizeClasses = ['text-6xl', 'text-5xl', 'text-7xl', 'text-6xl'];

  const handleScroll = (target: string) => {
    const selector = target.startsWith('#') ? target.slice(1) : target;
    const element = document.getElementById(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCtaContent = (cta: CtaButton) => (
    <>
      {cta.action === 'download' && <FaDownload />}
      {cta.label}
    </>
  );

  const renderCta = (cta: CtaButton, variant: 'primary' | 'secondary') => {
    const baseMotionProps = {
      whileHover: { scale: 1.05, ...(variant === 'primary' ? { boxShadow: '0 0 30px #00CCFF' } : {}) },
      whileTap: { scale: 0.95 },
    } as const;

    const className =
      variant === 'primary'
        ? 'px-8 py-4 bg-gradient-to-r from-ai-cyan to-ai-blue text-white font-semibold rounded-full hover-glow transition-all duration-300 flex items-center gap-3'
        : 'px-8 py-4 border-2 border-ai-cyan text-ai-cyan font-semibold rounded-full hover:bg-ai-cyan hover:text-ai-dark transition-all duration-300';

    if (cta.action === 'scroll') {
      return (
        <motion.button
          key={`${cta.label}-${cta.target}`}
          {...baseMotionProps}
          className={className}
          onClick={() => handleScroll(cta.target)}
        >
          {renderCtaContent(cta)}
        </motion.button>
      );
    }

    const isExternal = cta.action === 'external';
    const href = cta.target || '#';
    const target = cta.newTab || isExternal ? '_blank' : undefined;
    const rel = target ? 'noopener noreferrer' : undefined;

    return (
      <motion.a
        key={`${cta.label}-${cta.target}`}
        {...baseMotionProps}
        href={href}
        download={cta.action === 'download' ? cta.downloadName : undefined}
        target={target}
        rel={rel}
        className={`${className}${variant === 'primary' ? '' : ' flex items-center gap-3 justify-center'}`}
      >
        {renderCtaContent(cta)}
      </motion.a>
    );
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating AI/ML Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <motion.div
            key={`${icon.emoji}-${index}`}
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: icon.animationDelay ?? index,
            }}
            className={icon.positionClass}
          >
            <div className={floatingSizeClasses[index % floatingSizeClasses.length]}>{icon.emoji}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 max-w-4xl mx-auto px-4"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="text-2xl md:text-4xl font-light mb-8 h-20"
        >
          <TypeAnimation
            sequence={
              profile.titles.flatMap((title) => [title, 2000])
            }
            wrapper="span"
            speed={50}
            className="text-ai-cyan"
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-ai-light/80 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {hero.subtitle || profile.summary}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
        >
          {renderCta(hero.ctaPrimary, 'primary')}
          {hero.ctaSecondary ? renderCta(hero.ctaSecondary, 'secondary') : null}
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-8"
        >
          {hero.socialLinks.map((link, index) => {
            const IconComponent = iconMap[link.icon] ?? FaLink;
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-ai-light/60 hover:text-ai-cyan transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                aria-label={link.label}
              >
                <IconComponent />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-ai-cyan rounded-full flex justify-center">
            <div className="w-1 h-3 bg-ai-cyan rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
