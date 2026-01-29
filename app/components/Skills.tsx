'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getPortfolioData } from '@/app/utils/getPortfolioData';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { skills } = getPortfolioData();

  const skillCategories = skills.categories ?? [];
  const coreCompetencies = skills.coreCompetencies ?? [];

  return (
    <section id="skills" className="py-20 px-4 relative bg-ai-gray/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            {skills.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ai-cyan to-ai-blue mx-auto mb-8"></div>
          <p className="text-xl text-ai-light/70 max-w-3xl mx-auto">
            {skills.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id ?? category.label ?? `category-${categoryIndex}`}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="bg-ai-gray/30 backdrop-blur-sm border border-ai-blue/20 rounded-2xl p-6 hover:border-ai-cyan/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-ai-cyan mb-6 text-center">
                {category.label}
              </h3>
              
              <div className="space-y-6">
                {category.skills?.map((skill, skillIndex) => {
                  const level = typeof skill.level === 'number' ? skill.level : 0;
                  const icon = skill.icon ?? '✨';
                  return (
                    <motion.div
                      key={`${skill.name}-${skillIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                      className="relative"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{icon}</span>
                          <span className="text-ai-light font-medium">{skill.name}</span>
                        </div>
                        <span className="text-ai-cyan font-semibold">{level}%</span>
                      </div>
                      
                      <div className="w-full bg-ai-dark/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-ai-cyan to-ai-blue rounded-full relative"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${level}%` } : { width: 0 }}
                          transition={{ duration: 1.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.5 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-ai-cyan to-ai-blue animate-pulse opacity-75"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Skill Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-ai-light mb-8">Core Competencies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {coreCompetencies.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-4 py-2 bg-gradient-to-r from-ai-blue/20 to-ai-purple/20 text-ai-cyan rounded-full text-sm font-medium border border-ai-blue/30 hover:border-ai-cyan/50 cursor-default transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
