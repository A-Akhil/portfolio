'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaDownload } from 'react-icons/fa';

const Hero = () => {
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

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating AI/ML Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-20 left-10 text-ai-cyan opacity-20"
        >
          <div className="text-6xl">🧠</div>
        </motion.div>
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          className="absolute top-40 right-20 text-ai-green opacity-20"
        >
          <div className="text-5xl">⚡</div>
        </motion.div>
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
          className="absolute bottom-40 left-20 text-ai-purple opacity-20"
        >
          <div className="text-7xl">🤖</div>
        </motion.div>
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 3 } }}
          className="absolute bottom-20 right-10 text-ai-blue opacity-20"
        >
          <div className="text-6xl">💡</div>
        </motion.div>
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
          <span className="gradient-text">A Akhil</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="text-2xl md:text-4xl font-light mb-8 h-20"
        >
          <TypeAnimation
            sequence={[
              'AI/ML Developer',
              2000,
              'Research Scientist',
              2000,
              'Deep Learning Engineer',
              2000,
              'Innovation Catalyst',
              2000,
            ]}
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
          I am a machine learning engineer who builds things that matter.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00CCFF" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-ai-cyan to-ai-blue text-white font-semibold rounded-full hover-glow transition-all duration-300 flex items-center gap-3"
          >
            <FaDownload />
            Download Resume
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-ai-cyan text-ai-cyan font-semibold rounded-full hover:bg-ai-cyan hover:text-ai-dark transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-8"
        >
          {[
            { icon: FaGithub, href: 'https://github.com/A-Akhil', label: 'GitHub' },
            { icon: FaLinkedin, href: 'https://linkedin.com/in/a-akhil-16b396201/', label: 'LinkedIn' },
            { icon: FaEnvelope, href: 'mailto:akhilarul324@gmail.com', label: 'Email' },
            { icon: FaPhone, href: 'tel:[REDACTED]', label: 'Phone' },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-ai-light/60 hover:text-ai-cyan transition-colors duration-300"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <social.icon />
            </motion.a>
          ))}
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
