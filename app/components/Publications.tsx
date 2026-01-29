'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { getPortfolioData } from '../utils/getPortfolioData';

const Publications: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { publications = [] } = getPortfolioData();

  if (!publications || publications.length === 0) {
    return null;
  }

  return (
    <section id="publications" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-ai-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-ai-purple/5 rounded-full blur-3xl" />
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
            <span className="gradient-text">Research Publications</span>
          </h2>
          <p className="text-ai-light/70 text-lg max-w-2xl mx-auto">
            Academic contributions to AI/ML research and open datasets
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {publications.map((publication, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-ai-gray/20 backdrop-blur-sm border border-ai-blue/20 rounded-xl p-8 hover:border-ai-cyan/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ai-cyan to-ai-blue flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaFileAlt size={24} className="text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-ai-light mb-2 group-hover:text-ai-cyan transition-colors">
                    {publication.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-ai-light/60">
                    <span className="font-semibold text-ai-cyan/80">{publication.venue}</span>
                    <span className="text-sm">•</span>
                    <span>{publication.date}</span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {publication.description.map((item, idx) => (
                      <li key={idx} className="text-ai-light/70 flex items-start gap-2">
                        <span className="text-ai-cyan mt-1 flex-shrink-0">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {publication.doiUrl && (
                    <a
                      href={publication.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-ai-cyan hover:text-ai-blue transition-colors group/link"
                    >
                      <span className="font-semibold">DOI: {publication.doi}</span>
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

export default Publications;
