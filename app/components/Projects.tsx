'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaCode, FaBrain } from 'react-icons/fa';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'Machine Learning for Diabetic Prediction',
      description: 'Conducted a comparative study on Ridge, Lasso, and ElasticNet regression models, achieving a prediction accuracy of up to 88%. Implemented and optimized models in Java, processing datasets with over 10,000 patient records.',
      technologies: ['Java', 'Machine Learning', 'Data Analysis', 'Statistical Modeling'],
      accuracy: '88%',
      github: '#',
      demo: '#',
      gradient: 'from-blue-500 to-purple-600',
      icon: '🏥',
    },
    {
      title: 'Advanced Traffic Sign Detection',
      description: 'A research paper introducing an innovative methodology for small object detection with a focus on traffic signs, achieving a reduction in detection errors by 79%. Conducted 100+ experiments using datasets containing over 50,000 images.',
      technologies: ['Python', 'Computer Vision', 'Deep Learning', 'Image Processing'],
      accuracy: '79% error reduction',
      github: '#',
      demo: '#',
      gradient: 'from-green-500 to-teal-600',
      icon: '🚦',
    },
    {
      title: 'Real-time Parking Detection',
      description: 'Developed a real-time parking detection system to monitor 200+ parking slots using computer vision technology. Utilized Python and OpenCV to process live video feeds, detecting vacant spaces with 94% accuracy.',
      technologies: ['Python', 'OpenCV', 'Computer Vision', 'Real-time Processing'],
      accuracy: '94%',
      github: 'https://github.com/A-Akhil/Real-time-parking-detection-using-machine-learning',
      demo: '#',
      gradient: 'from-cyan-500 to-blue-600',
      icon: '🚗',
    },
    {
      title: 'Mental Health Assessment System',
      description: 'Developed a Flask web application to assess mental health for 1,000+ students, analyzing responses to pre-defined questions. Integrated an LLM via Ollama AI to generate scores with 95% accuracy.',
      technologies: ['Flask', 'Python', 'LLM', 'Ollama AI', 'Web Development'],
      accuracy: '95%',
      github: '#',
      demo: '#',
      gradient: 'from-pink-500 to-purple-600',
      icon: '🧠',
    },
    {
      title: 'Cloud and Fog Removal using GAN',
      description: 'Enhanced satellite image clarity by 84% by optimizing ISRO\'s models for cloud and fog removal. Designed and implemented a GAN-based system leveraging SPANet architecture to process over 10,000 satellite images efficiently.',
      technologies: ['PyTorch', 'GAN', 'SPANet', 'Satellite Imagery', 'Deep Learning'],
      accuracy: '84% improvement',
      github: '#',
      demo: '#',
      gradient: 'from-indigo-500 to-purple-600',
      icon: '🛰️',
    },
    {
      title: 'Real Time Crime Detection',
      description: 'Designed and implemented a Crime Detection system that analyzed live CCTV footage from 50+ cameras to identify suspicious activities. Achieved real-time classification of criminal activities with 90% accuracy.',
      technologies: ['Python', 'Machine Learning', 'Computer Vision', 'Django', 'Web3'],
      accuracy: '90%',
      github: 'https://github.com/A-Akhil/Crime-Detection-using-Machine-Learning',
      demo: '#',
      gradient: 'from-red-500 to-orange-600',
      icon: '📹',
    },
    {
      title: 'AI-Generated Text Detection System',
      description: 'Built an AI-Generated Text Detection System with 92% accuracy in distinguishing AI-generated from human-written text. Processed 50,000+ text samples to train and validate models for content moderation.',
      technologies: ['Python', 'Machine Learning', 'NLP', 'Text Analysis'],
      accuracy: '92%',
      github: 'https://github.com/A-Akhil/ai-generated-text-detector',
      demo: '#',
      gradient: 'from-yellow-500 to-orange-600',
      icon: '📝',
    },
    {
      title: 'Chat Application',
      description: 'Developed a cross-platform chat application enabling real-time communication for over 500 users. Integrated Firebase for real-time database synchronization, ensuring 99.9% uptime and instant message delivery.',
      technologies: ['Java', 'Firebase', 'Android', 'Real-time Database'],
      accuracy: '99.9% uptime',
      github: '#',
      demo: '#',
      gradient: 'from-emerald-500 to-green-600',
      icon: '💬',
    },
  ];

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
          {projects.map((project, index) => (
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
