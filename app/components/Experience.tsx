'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import portfolioData from '../data/portfolioData';

const Experience = () => {
  const { experiences } = portfolioData;
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 px-4 relative bg-ai-gray/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ai-cyan to-ai-blue mx-auto mb-8"></div>
          <p className="text-xl text-ai-light/70 max-w-3xl mx-auto">
            My journey through prestigious research organizations, contributing to cutting-edge AI/ML solutions
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ai-cyan via-ai-blue to-ai-purple transform md:-translate-x-px"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-ai-cyan to-ai-blue rounded-full transform md:-translate-x-2 z-10 border-4 border-ai-dark">
                  <div className="absolute inset-0 bg-gradient-to-r from-ai-cyan to-ai-blue rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-ai-gray/40 backdrop-blur-sm border border-ai-blue/30 rounded-2xl p-6 hover:border-ai-cyan/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${exp.color}`}></div>
                      <span className="text-sm text-ai-cyan font-medium">{exp.period}</span>
                    </div>

                    <h3 className="text-xl font-bold text-ai-light mb-2">{exp.title}</h3>
                    <h4 className="text-lg font-semibold text-ai-cyan mb-3">{exp.company}</h4>
                    
                    <div className="flex items-center text-ai-light/60 text-sm mb-4">
                      <FaMapMarkerAlt className="mr-2" />
                      {exp.location}
                    </div>

                    <p className="text-ai-light/80 leading-relaxed mb-6">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-ai-blue/20 text-ai-cyan rounded-full text-xs font-medium border border-ai-blue/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
