'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';
import portfolioData from '../data/portfolioData';

const OpenSource: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { openSourceContributions } = portfolioData;

  return (
    <section id="opensource" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-ai-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-ai-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Open Source Contributions</span>
          </h2>
          <p className="text-ai-light/70 text-lg max-w-2xl mx-auto">
            Contributing to the open source community and collaborative development
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {openSourceContributions.map((contribution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-ai-gray/20 backdrop-blur-sm border border-ai-blue/20 rounded-xl p-6 hover:border-ai-green/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ai-green to-ai-cyan flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaGithub size={28} className="text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-ai-light group-hover:text-ai-green transition-colors">
                        {contribution.project}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-ai-light/60">
                        <span className="font-semibold text-ai-green/80">{contribution.role}</span>
                        <span className="text-sm">•</span>
                        <span>{contribution.year}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-ai-light/70 leading-relaxed mb-4">
                    {contribution.description}
                  </p>

                  {contribution.prUrl && (
                    <a
                      href={contribution.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ai-green/10 border border-ai-green/30 text-ai-green hover:bg-ai-green/20 hover:border-ai-green/50 transition-all duration-300 group/link"
                    >
                      <FaCodeBranch size={16} />
                      <span className="font-semibold">View Pull Request</span>
                      <FaExternalLinkAlt size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
