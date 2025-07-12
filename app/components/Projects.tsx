'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaCode, FaBrain } from 'react-icons/fa';
import portfolioData from '../data/portfolioData';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Use projects from centralized data source
  const { projects } = portfolioData;
  
  // Map to the format expected by the component
  const formattedProjects = projects.map(project => ({
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    accuracy: project.accuracy || '',
    github: project.githubUrl || '#',
    demo: project.demoUrl || '#',
    gradient: project.gradient || project.color || 'from-blue-500 to-purple-600', // Use gradient or fallback to color
    icon: project.icon || '🔬', // Default icon if none provided
  }));

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ai-cyan to-ai-blue mx-auto mb-8"></div>
          <p className="text-xl text-ai-light/70 max-w-3xl mx-auto">
            Innovative AI/ML solutions solving real-world problems across various domains
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formattedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-ai-gray/30 backdrop-blur-sm border border-ai-blue/20 rounded-2xl overflow-hidden hover:border-ai-cyan/50 transition-all duration-300"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-6">
                {/* Project Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{project.icon}</div>
                  <div className="flex gap-3">
                    {project.github !== '#' && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-ai-light/60 hover:text-ai-cyan transition-colors"
                      >
                        <FaGithub size={20} />
                      </motion.a>
                    )}
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-ai-light/60 hover:text-ai-cyan transition-colors"
                    >
                      <FaExternalLinkAlt size={18} />
                    </motion.a>
                  </div>
                </div>

                {/* Title and Accuracy */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-ai-light mb-2 group-hover:text-ai-cyan transition-colors">
                    {project.title}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-ai-cyan/20 text-ai-cyan rounded-full text-sm font-semibold">
                    {project.accuracy}
                  </div>
                </div>

                {/* Description */}
                <p className="text-ai-light/70 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-ai-blue/20 text-ai-light/80 rounded text-xs font-medium border border-ai-blue/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-ai-cyan/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/A-Akhil"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-ai-blue to-ai-purple text-white font-semibold rounded-full hover-glow transition-all duration-300"
          >
            <FaGithub />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
