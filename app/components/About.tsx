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

          {/* Profile Image and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mb-6"
            >
              {/* Decorative border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-ai-cyan via-ai-blue to-ai-purple opacity-70 blur-sm animate-pulse"></div>
              
              {/* Image - Full rectangular image */}
              <img 
                src={personalInfo.avatarUrl} 
                alt="A Akhil" 
                className="max-w-full w-80 object-cover border-2 border-ai-dark relative z-10"
              />
            </motion.div>
            
            {/* Stats below image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-ai-gray/30 px-8 py-4 rounded-lg border border-ai-blue/30 shadow-lg mt-4"
            >
              <div className="flex gap-8 text-center">
                <div>
                  <span className="text-ai-cyan text-2xl font-bold">{experiences.length}+</span>
                  <span className="text-ai-light/70 text-sm block">Research Roles</span>
                </div>
                <div className="h-12 w-px bg-ai-blue/30"></div>
                <div>
                  <span className="text-ai-cyan text-2xl font-bold">{projects.length}+</span>
                  <span className="text-ai-light/70 text-sm block">AI/ML Projects</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
