/**
 * Central Portfolio Data File
 * 
 * This file contains all the data for the portfolio website in a centralized structure.
 * Update information here once and it will be reflected across the entire application.
 */

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  color: string;
  achievements?: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;  // Made optional since some projects might not have images
  githubUrl?: string; // Made optional for projects without GitHub repositories
  demoUrl?: string;
  featured?: boolean; // Made optional with default true for backward compatibility
  color?: string;     // Support old format
  gradient?: string;  // Support new format used in Projects.tsx
  icon?: string;      // For displaying emoji icons in the Projects component
  accuracy?: string;  // For displaying accuracy/metrics in the Projects component
}

export interface Skill {
  name: string;
  icon: string;
  category: 'languages' | 'frameworks' | 'tools' | 'ml' | 'other';
  level: number; // 1-5 skill level
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  achievements?: string[];
}

export interface PersonalInfo {
  name: string;
  titles: string[]; // Used for typewriter animation
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  bio: string[];
  resumeUrl: string;
  avatarUrl: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  awards: Award[];
  education: Education[];
  socialLinks: SocialLink[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  }
}

const portfolioData: PortfolioData = {
  personalInfo: {
    name: 'A Akhil',
    titles: [
      'AI/ML Developer',
      'Research Scientist',
      'Deep Learning Engineer',
      'Innovation Catalyst'
    ],
    location: 'Kollemcode, Kanyakumari, Tamil Nadu',
    email: 'akhilarul324@gmail.com',
    phone: '[REDACTED]',
    github: 'A-Akhil',
    linkedin: 'a-akhil-16b396201',
    bio: [
      "I'm a passionate AI/ML developer and researcher currently pursuing B.Tech in Computer Science with specialization in AI-ML at SRM Institute of Science and Technology. My journey in artificial intelligence has been marked by groundbreaking research experiences at India's premier organizations.",
      "From developing AI models for defense applications at DRDO to creating recommendation engines for space technology at ISRO, my work spans across cutting-edge domains of artificial intelligence and machine learning."
    ],
    resumeUrl: '/resume.pdf',
    avatarUrl: '/images/profile.jpg',
  },
  
  experiences: [
    {
      title: 'Research Intern',
      company: 'Defence Research & Development Organisation (CAIR-DRDO)',
      location: 'India',
      period: 'December 2024 – Present',
      description: 'Developing an advanced web scraper leveraging LLM capabilities to efficiently extract and analyze data from websites.',
      technologies: ['Python', 'LLM', 'Web Scraping', 'Data Analysis'],
      color: 'from-red-500 to-red-600',
      achievements: ['Developed intelligent web scraping system', 'Integrated LLM for data processing']
    },
    {
      title: 'Intern',
      company: 'Indian Space Research Organisation (ISSDC-ISRO)',
      location: 'India',
      period: 'December 2024 – January 2025',
      description: 'Developed a recommendation engine for the PRADAN website by ISSDC, enhancing user experience and data accessibility for ISRO.',
      technologies: ['Python', 'Machine Learning', 'Recommendation Systems', 'Web Development'],
      color: 'from-blue-500 to-blue-600',
      achievements: ['Built recommendation system', 'Enhanced user experience for PRADAN platform']
    },
    {
      title: 'Research Intern',
      company: 'Defence Research & Development Organisation (CVRDE-DRDO)',
      location: 'India',
      period: 'July 2024 – August 2024',
      description: 'Developed an AI model achieving 92% accuracy in predicting the remaining lifespan of BLDC motors and identifying faults in real-time during operation for Armoured Fighting Vehicles (AFVs). Reduced diagnostic time by 80%.',
      technologies: ['AI/ML', 'Predictive Analytics', 'Real-time Systems', 'Python'],
      color: 'from-green-500 to-green-600',
      achievements: ['Achieved 92% accuracy in motor lifespan prediction', 'Developed AI models for industrial applications']
    },
    {
      title: 'Intern',
      company: 'Samsung R&D Institute',
      location: 'India',
      period: 'January 2024 – July 2024',
      description: 'Developed a Generative AI Large Language Model integrated with a web scraper that analyzed over 10,000 products and reviews, achieving 85% accuracy in sentiment analysis and data classification. Reduced processing time by 60%.',
      technologies: ['Generative AI', 'LLM', 'NLP', 'Sentiment Analysis', 'Web Scraping'],
      color: 'from-purple-500 to-purple-600',
      achievements: ['Built generative AI system', 'Achieved 85% accuracy in sentiment analysis']
    },
  ],
  
  projects: [
    {
      title: 'Machine Learning for Diabetic Prediction',
      description: 'Conducted a comparative study on Ridge, Lasso, and ElasticNet regression models, achieving a prediction accuracy of up to 88%. Implemented and optimized models in Java, processing datasets with over 10,000 patient records.',
      technologies: ['Java', 'Machine Learning', 'Data Analysis', 'Statistical Modeling'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true,
      gradient: 'from-blue-500 to-purple-600',
      icon: '🏥',
      accuracy: '88%',
    },
    {
      title: 'Advanced Traffic Sign Detection',
      description: 'A research paper introducing an innovative methodology for small object detection with a focus on traffic signs, achieving a reduction in detection errors by 79%. Conducted 100+ experiments using datasets containing over 50,000 images.',
      technologies: ['Python', 'Computer Vision', 'Deep Learning', 'Image Processing'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true,
      gradient: 'from-green-500 to-teal-600',
      icon: '🚦',
      accuracy: '79% error reduction',
    },
    {
      title: 'Real-time Parking Detection',
      description: 'Developed a real-time parking detection system to monitor 200+ parking slots using computer vision technology. Utilized Python and OpenCV to process live video feeds, detecting vacant spaces with 94% accuracy.',
      technologies: ['Python', 'OpenCV', 'Computer Vision', 'Real-time Processing'],
      githubUrl: 'https://github.com/A-Akhil/Real-time-parking-detection-using-machine-learning',
      demoUrl: '#',
      featured: true,
      gradient: 'from-cyan-500 to-blue-600',
      icon: '🚗',
      accuracy: '94%',
    },
    {
      title: 'Mental Health Assessment System',
      description: 'Developed a Flask web application to assess mental health for 1,000+ students, analyzing responses to pre-defined questions. Integrated an LLM via Ollama AI to generate scores with 95% accuracy.',
      technologies: ['Flask', 'Python', 'LLM', 'Ollama AI', 'Web Development'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true,
      gradient: 'from-pink-500 to-purple-600',
      icon: '🧠',
      accuracy: '95%',
    },
    {
      title: 'Cloud and Fog Removal using GAN',
      description: 'Enhanced satellite image clarity by 84% by optimizing ISRO\'s models for cloud and fog removal. Designed and implemented a GAN-based system leveraging SPANet architecture to process over 10,000 satellite images efficiently.',
      technologies: ['PyTorch', 'GAN', 'SPANet', 'Satellite Imagery', 'Deep Learning'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true,
      gradient: 'from-indigo-500 to-purple-600',
      icon: '🛰️',
      accuracy: '84% improvement',
    },
    {
      title: 'Real Time Crime Detection',
      description: 'Designed and implemented a Crime Detection system that analyzed live CCTV footage from 50+ cameras to identify suspicious activities. Achieved real-time classification of criminal activities with 90% accuracy.',
      technologies: ['Python', 'Machine Learning', 'Computer Vision', 'Django', 'Web3'],
      githubUrl: 'https://github.com/A-Akhil/Crime-Detection-using-Machine-Learning',
      demoUrl: '#',
      featured: true,
      gradient: 'from-red-500 to-orange-600',
      icon: '📹',
      accuracy: '90%',
    },
    {
      title: 'AI-Generated Text Detection System',
      description: 'Built an AI-Generated Text Detection System with 92% accuracy in distinguishing AI-generated from human-written text. Processed 50,000+ text samples to train and validate models for content moderation.',
      technologies: ['Python', 'Machine Learning', 'NLP', 'Text Analysis'],
      githubUrl: 'https://github.com/A-Akhil/ai-generated-text-detector',
      demoUrl: '#',
      featured: true,
      gradient: 'from-yellow-500 to-orange-600',
      icon: '📝',
      accuracy: '92%',
    },
    {
      title: 'Chat Application',
      description: 'Developed a cross-platform chat application enabling real-time communication for over 500 users. Integrated Firebase for real-time database synchronization, ensuring 99.9% uptime and instant message delivery.',
      technologies: ['Java', 'Firebase', 'Android', 'Real-time Database'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true,
      gradient: 'from-teal-500 to-cyan-600',
      icon: '💬',
      accuracy: '99.9% uptime',
    },
  ],
  
  skills: [
    { name: 'Python', icon: 'python', category: 'languages', level: 5 },
    { name: 'TensorFlow', icon: 'tensorflow', category: 'ml', level: 5 },
    { name: 'PyTorch', icon: 'pytorch', category: 'ml', level: 4 },
    { name: 'JavaScript', icon: 'javascript', category: 'languages', level: 4 },
    { name: 'TypeScript', icon: 'typescript', category: 'languages', level: 3 },
    { name: 'React', icon: 'react', category: 'frameworks', level: 4 },
    { name: 'Next.js', icon: 'nextjs', category: 'frameworks', level: 4 },
    { name: 'Docker', icon: 'docker', category: 'tools', level: 3 },
    { name: 'Git', icon: 'git', category: 'tools', level: 4 },
    { name: 'Scikit-Learn', icon: 'sklearn', category: 'ml', level: 5 },
    { name: 'Computer Vision', icon: 'opencv', category: 'ml', level: 4 },
    { name: 'NLP', icon: 'nlp', category: 'ml', level: 4 },
  ],
  
  awards: [
    {
      title: 'Best AI Research Paper',
      issuer: 'International Conference on AI & Robotics',
      date: 'October 2024',
      description: 'Awarded for groundbreaking research on autonomous systems with adaptive learning capabilities.',
      icon: 'award',
    },
    {
      title: 'Innovation Excellence Award',
      issuer: 'Samsung R&D Institute',
      date: 'June 2024',
      description: 'Recognized for developing an innovative approach to NLP that improved product performance by 30%.',
      icon: 'innovation',
    },
    {
      title: 'National Hackathon Winner',
      issuer: 'Ministry of Electronics & IT',
      date: 'March 2024',
      description: 'First place in a national-level hackathon focused on AI solutions for healthcare challenges.',
      icon: 'trophy',
    },
  ],
  
  education: [
    {
      institution: 'SRM Institute of Science and Technology',
      degree: 'B.Tech',
      field: 'Computer Science with AI-ML Specialization',
      period: '2022 - Present',
      location: 'Chennai, Tamil Nadu',
      achievements: [
        'CGPA: 9.5/10',
        'Member of AI Research Club',
        'Published 2 research papers in international journals'
      ]
    }
  ],

  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/A-Akhil', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/a-akhil-16b396201/', icon: 'linkedin' },
    { name: 'Email', url: 'mailto:akhilarul324@gmail.com', icon: 'mail' },
  ],
  
  seo: {
    title: 'A Akhil - AI/ML Developer & Researcher',
    description: 'Personal portfolio of A Akhil, an AI/ML Developer and Researcher with experience at DRDO, ISRO, and Samsung R&D.',
    keywords: ['AI', 'Machine Learning', 'Developer', 'Researcher', 'Portfolio', 'DRDO', 'ISRO', 'Samsung']
  }
};

export default portfolioData;
