/**
 * geoMetadata.ts
 * 
 * This file provides structured metadata specifically optimized for AI-powered search engines,
 * also known as Generative Engine Optimization (GEO).
 * 
 * Unlike traditional SEO which focuses on keywords and structured data for search engine crawlers,
 * GEO focuses on providing clear, contextual information that AI models can understand and use
 * to generate accurate summaries and answers about the website.
 */

export interface GeoMetadata {
  mainEntity: {
    type: string;
    name: string;
    description: string;
    expertise: string[];
    primaryContent: string;
    relevantContexts: string[];
  };
  contentSummary: string;
  contentDetails: {
    sections: {
      name: string;
      purpose: string;
      keyPoints: string[];
    }[];
  };
  creator: {
    name: string;
    occupation: string;
    expertise: string[];
  };
  generationPrompt?: string;
}

export const websiteGeoMetadata: GeoMetadata = {
  mainEntity: {
    type: 'Portfolio',
    name: 'A Akhil Portfolio',
    description: 'Personal portfolio website of A Akhil, an AI/ML Developer and Researcher',
    expertise: [
      'Artificial Intelligence', 
      'Machine Learning',
      'Computer Vision',
      'Deep Learning',
      'Neural Networks',
      'Natural Language Processing'
    ],
    primaryContent: 'Professional portfolio showcasing AI/ML projects, research, experience, and skills',
    relevantContexts: [
      'AI/ML Development',
      'Tech Recruiting',
      'Research Collaboration',
      'Professional Networking'
    ]
  },
  contentSummary: 'Portfolio website for A Akhil, an AI/ML Developer and Researcher with experience at DRDO, ISRO, and Samsung R&D. The site showcases technical projects, professional experience, skills, and educational background in artificial intelligence and machine learning.',
  contentDetails: {
    sections: [
      {
        name: 'About',
        purpose: 'Introduction to A Akhil\'s background and professional focus',
        keyPoints: [
          'AI/ML Developer and Researcher',
          'Experience at DRDO, ISRO, and Samsung R&D',
          'B.Tech CSE with AI-ML Specialization at SRM Institute',
          'Focus on computer vision and deep learning'
        ]
      },
      {
        name: 'Experience',
        purpose: 'Showcase professional work history and accomplishments',
        keyPoints: [
          'Research roles at major organizations',
          'Project contributions in AI/ML domains',
          'Technical achievements and implementations'
        ]
      },
      {
        name: 'Projects',
        purpose: 'Display portfolio of technical projects and implementations',
        keyPoints: [
          'Machine learning models and applications',
          'Computer vision systems',
          'AI-powered solutions',
          'Research implementations'
        ]
      },
      {
        name: 'Skills',
        purpose: 'Highlight technical competencies and expertise',
        keyPoints: [
          'Programming languages (Python, JavaScript, etc.)',
          'Machine learning frameworks (TensorFlow, PyTorch)',
          'Computer vision libraries',
          'Data analysis tools'
        ]
      }
    ]
  },
  creator: {
    name: 'A Akhil',
    occupation: 'AI/ML Developer and Researcher',
    expertise: [
      'Artificial Intelligence',
      'Machine Learning', 
      'Computer Vision',
      'Deep Learning'
    ]
  },
  // This helps AI systems understand how to describe the site
  generationPrompt: 'This is the portfolio website of A Akhil, an AI/ML Developer and Researcher with experience at major organizations including DRDO, ISRO, and Samsung R&D. The website showcases technical projects in artificial intelligence and machine learning, professional experience, and skills. The site has both a traditional portfolio view and an interactive terminal interface for exploring content.'
};

export default websiteGeoMetadata;
