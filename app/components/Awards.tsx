'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTrophy, FaMedal, FaAward, FaStar } from 'react-icons/fa';

const Awards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const awards = [
    {
      title: 'MIT Anna University Hackathon',
      level: 'National Level',
      position: '1st Prize',
      description: 'Won First Prize at the national-level MIT Anna University Hackathon, competing against top teams from across the college.',
      icon: FaTrophy,
      color: 'from-yellow-400 to-yellow-600',
      year: '2025',
    },
    {
      title: 'IEEE GRSS Hackathon for Data Driven AI in Remote Sensing',
      level: 'College Level',
      position: '1st Prize',
      description: 'Won First Prize at the college-level IEEE GRSS Hackathon for Data-Driven AI in Remote Sensing, supported by NASA.',
      icon: FaTrophy,
      color: 'from-blue-400 to-blue-600',
      year: '2025',
    },
    {
      title: 'Smart Campus Hackathon',
      level: 'College Level',
      position: '1st Place',
      description: 'Secured First Place in Smart Campus Hackathon organized by SRM Institute of Science and Technology, competing against 100+ teams.',
      icon: FaMedal,
      color: 'from-green-400 to-green-600',
      year: '2023',
    },
    {
      title: 'Smart India Hackathon',
      level: 'National Level',
      position: 'Semi-Finalist',
      description: 'Advanced to the semi-final round in Smart India Hackathon, out of 2,000+ teams nationwide.',
      icon: FaAward,
      color: 'from-purple-400 to-purple-600',
      year: '2024',
    },
    {
      title: 'Dark Pattern Buster Hackathon',
      level: 'National Level',
      position: 'Finalist',
      description: 'Selected for the final round in Dark Pattern Buster Hackathon, among 5000+ participants.',
      icon: FaStar,
      color: 'from-red-400 to-red-600',
      year: '2023',
    },
  ];

  return (
    <section id="awards" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Awards & Recognition
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ai-cyan to-ai-blue mx-auto mb-8"></div>
          <p className="text-xl text-ai-light/70 max-w-3xl mx-auto">
            Recognition for excellence in AI/ML innovation and competitive programming
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -15 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-ai-gray/30 backdrop-blur-sm border border-ai-blue/20 rounded-2xl overflow-hidden hover:border-ai-cyan/50 transition-all duration-300"
              style={{ perspective: '1000px' }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative p-6">
                {/* Icon and Year */}
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 rounded-full bg-gradient-to-r ${award.color} text-white`}
                  >
                    <award.icon size={24} />
                  </motion.div>
                  <span className="text-ai-cyan font-semibold text-sm bg-ai-blue/20 px-3 py-1 rounded-full">
                    {award.year}
                  </span>
                </div>

                {/* Position Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${award.color} shadow-lg`}>
                    {award.position}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-ai-light mb-2 group-hover:text-ai-cyan transition-colors">
                  {award.title}
                </h3>

                {/* Level */}
                <p className="text-ai-cyan text-sm font-semibold mb-4">
                  {award.level}
                </p>

                {/* Description */}
                <p className="text-ai-light/70 text-sm leading-relaxed">
                  {award.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-ai-cyan/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-ai-blue/10 to-transparent rounded-tr-full"></div>
              </div>

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${award.color.includes('yellow') ? '#FFD700' : award.color.includes('blue') ? '#00CCFF' : award.color.includes('green') ? '#00FF88' : award.color.includes('purple') ? '#8B00FF' : '#FF4444'}, transparent)`,
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-3 gap-8"
        >
          {[
            { number: '5+', label: 'Total Awards' },
            { number: '3', label: 'First Prizes' },
            { number: '2', label: 'Semi-Final Positions' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              className="text-center"
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
    </section>
  );
};

export default Awards;
