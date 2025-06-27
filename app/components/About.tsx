'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: '4+', label: 'Research Internships' },
    { number: '15+', label: 'AI/ML Projects' },
    { number: '92%', label: 'Best Model Accuracy' },
    { number: '5+', label: 'National Awards' },
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
            <p className="text-lg text-ai-light/80 leading-relaxed">
              I'm a passionate AI/ML developer and researcher currently pursuing B.Tech in Computer Science 
              with specialization in AI-ML at SRM Institute of Science and Technology. My journey in 
              artificial intelligence has been marked by groundbreaking research experiences at India's 
              premier organizations.
            </p>

            <p className="text-lg text-ai-light/80 leading-relaxed">
              From developing AI models for defense applications at <span className="text-ai-cyan font-semibold">DRDO</span> 
              to creating recommendation engines for space technology at <span className="text-ai-green font-semibold">ISRO</span>, 
              and building large language models at <span className="text-ai-purple font-semibold">Samsung R&D</span>, 
              I've consistently delivered innovative solutions that push the boundaries of what's possible.
            </p>

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
