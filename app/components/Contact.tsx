'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPaperPlane, FaUser, FaEnvelope, FaComment, FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa';

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
    alert('Message sent successfully! I\'ll get back to you soon.');
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'akhilarul324@gmail.com',
      href: 'mailto:akhilarul324@gmail.com',
      color: 'from-red-400 to-red-600',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '[REDACTED]',
      href: 'tel:[REDACTED]',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'a-akhil-16b396201',
      href: 'https://linkedin.com/in/a-akhil-16b396201/',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'A-Akhil',
      href: 'https://github.com/A-Akhil',
      color: 'from-gray-400 to-gray-600',
    },
  ];

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
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ai-cyan to-ai-blue mx-auto mb-8"></div>
          <p className="text-xl text-ai-light/70 max-w-3xl mx-auto">
            Ready to innovate together? Let's discuss your next AI/ML project or research collaboration
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
                    placeholder="Your Name"
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
                    placeholder="Your Email"
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
                  placeholder="Your Message"
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
                    Send Message
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
                I'm always excited to discuss new opportunities, research collaborations, 
                or innovative AI/ML projects. Feel free to reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-4 p-4 bg-ai-gray/20 rounded-xl border border-ai-blue/20 hover:border-ai-cyan/50 transition-all duration-300 group"
                >
                  <div className={`p-3 rounded-full bg-gradient-to-r ${info.color} text-white group-hover:scale-110 transition-transform`}>
                    <info.icon size={20} />
                  </div>
                  <div>
                    <div className="text-ai-light/60 text-sm font-medium">{info.label}</div>
                    <div className="text-ai-light font-semibold">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 p-6 bg-ai-gray/20 rounded-xl border border-ai-blue/20"
            >
              <h4 className="text-lg font-semibold text-ai-cyan mb-2">Location</h4>
              <p className="text-ai-light/70">
                Kollemcode, Kanyakumari, Tamil Nadu, India
              </p>
              <p className="text-ai-light/60 text-sm mt-2">
                Currently studying at SRM Institute of Science and Technology, Chennai
              </p>
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
            © 2025 A Akhil. Designed with ❤️ by A Akhil. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
