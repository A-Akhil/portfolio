'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTrophy, FaMedal, FaAward, FaStar } from 'react-icons/fa';
import { getPortfolioData } from '@/app/utils/getPortfolioData';

const iconMap: Record<string, typeof FaAward> = {
  FaTrophy,
  FaMedal,
  FaAward,
  FaStar,
};

const getHighlightColor = (gradient: string) => {
  if (gradient.includes('yellow')) return '#FFD700';
  if (gradient.includes('blue')) return '#00CCFF';
  if (gradient.includes('green')) return '#00FF88';
  if (gradient.includes('purple')) return '#8B00FF';
  if (gradient.includes('red')) return '#FF4444';
  return '#00CCFF';
};

const Awards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { awards } = getPortfolioData();
  const awardsList = awards.items ?? [];
  const stats = awards.stats ?? [];

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
            {awards.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ai-cyan to-ai-blue mx-auto mb-8"></div>
          <p className="text-xl text-ai-light/70 max-w-3xl mx-auto">
            {awards.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awardsList.map((award, index) => {
            const gradient = award.gradient ?? 'from-ai-blue to-ai-purple';
            const AwardIcon = iconMap[award.icon ?? ''] ?? FaAward;
            const highlightColor = getHighlightColor(gradient);

            return (
              <motion.div
                key={`${award.title}-${award.year ?? index}`}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -15 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="group relative bg-ai-gray/30 backdrop-blur-sm border border-ai-blue/20 rounded-2xl overflow-hidden hover:border-ai-cyan/50 transition-all duration-300"
                style={{ perspective: '1000px' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`p-3 rounded-full bg-gradient-to-r ${gradient} text-white`}
                    >
                      <AwardIcon size={24} />
                    </motion.div>
                    {award.year ? (
                      <span className="text-ai-cyan font-semibold text-sm bg-ai-blue/20 px-3 py-1 rounded-full">
                        {award.year}
                      </span>
                    ) : null}
                  </div>

                  {award.position ? (
                    <div className="mb-4">
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${gradient} shadow-lg`}>
                        {award.position}
                      </span>
                    </div>
                  ) : null}

                  <h3 className="text-lg font-bold text-ai-light mb-2 group-hover:text-ai-cyan transition-colors">
                    {award.title}
                  </h3>

                  {award.level ? (
                    <p className="text-ai-cyan text-sm font-semibold mb-4">
                      {award.level}
                    </p>
                  ) : null}

                  {award.description ? (
                    <p className="text-ai-light/70 text-sm leading-relaxed">
                      {award.description}
                    </p>
                  ) : null}

                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-ai-cyan/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-ai-blue/10 to-transparent rounded-tr-full"></div>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${highlightColor}, transparent)`,
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>

        {stats.length ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 1 }}
            className={`mt-16 grid gap-8 ${stats.length >= 3 ? 'grid-cols-3' : stats.length === 2 ? 'grid-cols-2' : 'grid-cols-1'} text-center`}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={`${stat.label}-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-ai-cyan mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-ai-light/70 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default Awards;
