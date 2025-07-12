'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import portfolioData from '../data/portfolioData';

const About = () => {
  const { personalInfo, experiences, projects } = portfolioData;
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: `${experiences.length}+`, label: 'Research Internships' },
    { number: `${projects.length}+`, label: 'AI/ML Projects' },
  ];

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ai-cyan to-ai-blue mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index} className="text-lg text-ai-light/80 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <p className="text-lg text-ai-light/80 leading-relaxed">
              My expertise spans machine learning, deep learning, computer vision, natural language processing, 
              and full-stack development. I believe in the power of AI to solve real-world problems and 
              create meaningful impact.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {['Python', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'React', 'Node.js'].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="px-4 py-2 bg-ai-blue/20 text-ai-cyan rounded-full text-sm font-medium border border-ai-blue/30 hover:bg-ai-blue/30 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center p-6 bg-ai-gray/30 rounded-2xl border border-ai-blue/20 hover:border-ai-cyan/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-bold text-ai-cyan mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-ai-light/70 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
