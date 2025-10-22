'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPaperPlane, FaUser, FaEnvelope, FaComment, FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa';
import { getPortfolioData } from '@/app/utils/getPortfolioData';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const { contact } = getPortfolioData();
  const contactForm = contact.form ?? {};
  const contactMethods = contact.methods ?? [];
  const contactLocation = contact.location;
  const contactFooter = contact.footer;

  const iconMap: Record<string, typeof FaPaperPlane> = {
    FaEnvelope,
    FaPhone,
    FaLinkedin,
    FaGithub,
    email: FaEnvelope,
    phone: FaPhone,
    linkedin: FaLinkedin,
    github: FaGithub,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    
    setIsSubmitting(false);
    alert(contactForm.successMessage ?? "Message sent successfully! I'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-20 px-4 relative bg-ai-gray/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            {contact.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ai-cyan to-ai-blue mx-auto mb-8"></div>
          <p className="text-xl text-ai-light/70 max-w-3xl mx-auto">
            {contact.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-ai-gray/30 backdrop-blur-sm border border-ai-blue/20 rounded-2xl p-8 hover:border-ai-cyan/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-ai-light mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <FaUser className="absolute left-4 top-4 text-ai-cyan" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={contactForm.namePlaceholder ?? 'Your Name'}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-ai-dark/50 border border-ai-blue/30 rounded-lg text-ai-light placeholder-ai-light/50 focus:border-ai-cyan focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-4 text-ai-cyan" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={contactForm.emailPlaceholder ?? 'Your Email'}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-ai-dark/50 border border-ai-blue/30 rounded-lg text-ai-light placeholder-ai-light/50 focus:border-ai-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-3 bg-ai-dark/50 border border-ai-blue/30 rounded-lg text-ai-light placeholder-ai-light/50 focus:border-ai-cyan focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <FaComment className="absolute left-4 top-4 text-ai-cyan" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={contactForm.messagePlaceholder ?? 'Your Message'}
                  rows={6}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-ai-dark/50 border border-ai-blue/30 rounded-lg text-ai-light placeholder-ai-light/50 focus:border-ai-cyan focus:outline-none transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-ai-cyan to-ai-blue text-white font-semibold rounded-lg hover-glow transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    {contactForm.submitLabel ?? 'Send Message'}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-ai-light mb-6">Contact Information</h3>
              <p className="text-ai-light/70 leading-relaxed mb-8">
                I&apos;m always excited to discuss new opportunities, research collaborations, 
                or innovative AI/ML projects. Feel free to reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((info, index) => {
                const gradient = info.gradient ?? 'from-ai-cyan to-ai-blue';
                const Icon = iconMap[info.icon ?? info.type ?? ''] ?? FaPaperPlane;
                const href = info.href ?? '#';
                return (
                <motion.a
                  key={`${info.label ?? info.type}-${index}`}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-4 p-4 bg-ai-gray/20 rounded-xl border border-ai-blue/20 hover:border-ai-cyan/50 transition-all duration-300 group"
                >
                  <div className={`p-3 rounded-full bg-gradient-to-r ${gradient} text-white group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="text-ai-light/60 text-sm font-medium">{info.label ?? info.type}</div>
                    <div className="text-ai-light font-semibold">{info.value}</div>
                  </div>
                </motion.a>
                );
              })}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 p-6 bg-ai-gray/20 rounded-xl border border-ai-blue/20"
            >
              <h4 className="text-lg font-semibold text-ai-cyan mb-2">{contactLocation?.headline ?? 'Location'}</h4>
              {contactLocation?.body?.map((line, lineIndex) => {
                const lineClasses = lineIndex === 0 ? 'text-ai-light/70' : 'text-ai-light/60 text-sm mt-2';
                return (
                  <p key={`${line}-${lineIndex}`} className={lineClasses}>
                    {line}
                  </p>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16 pt-8 border-t border-ai-blue/20"
        >
          <p className="text-ai-light/60">
            {contactFooter}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
