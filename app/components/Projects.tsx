'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { getPortfolioData } from '@/app/utils/getPortfolioData';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { projects } = getPortfolioData();

  const featuredProjects = projects.items.filter((project) => project.featured !== false);

  const formattedProjects = featuredProjects.map((project, index) => ({
    title: project.title,
    description: project.description,
    technologies: project.technologies ?? [],
    github: project.githubUrl ?? '#',
    demo: project.demoUrl ?? '#',
    metric: project.metric,
    gradient: project.gradient ?? `from-ai-blue to-ai-purple`,
    icon: project.icon ?? '🔬',
    key: `${project.title}-${index}`,
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
            {projects.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ai-cyan to-ai-blue mx-auto mb-8"></div>
          <p className="text-xl text-ai-light/70 max-w-3xl mx-auto">
            {projects.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formattedProjects.map((project, index) => (
            <motion.div
              key={project.key}
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
                    {project.demo !== '#' && project.demo ? (
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
                    ) : null}
                  </div>
                </div>

                {/* Title and Accuracy */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-ai-light mb-2 group-hover:text-ai-cyan transition-colors">
                    {project.title}
                  </h3>
                  {project.metric?.value ? (
                    <div className="inline-block px-3 py-1 bg-ai-cyan/20 text-ai-cyan rounded-full text-sm font-semibold">
                      {project.metric.label ? `${project.metric.label}: ` : ''}
                      {project.metric.value}
                    </div>
                  ) : null}
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
          {projects.cta ? (
            <motion.a
              href={projects.cta.target}
              target={projects.cta.newTab ? '_blank' : undefined}
              rel={projects.cta.newTab ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-ai-blue to-ai-purple text-white font-semibold rounded-full hover-glow transition-all duration-300"
            >
              <FaGithub />
              {projects.cta.label}
            </motion.a>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
