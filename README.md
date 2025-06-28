# A Akhil - AI/ML Developer Portfolio

A modern, animated portfolio website showcasing AI/ML expertise, research experience, and innovative projects.

## 🚀 Features

- **Futuristic AI/ML Theme**: Neural network backgrounds, particle animations, and tech-inspired design
- **Interactive Animations**: Smooth page transitions, hover effects, and scroll-triggered animations
- **Responsive Design**: Optimized for all devices and screen sizes
- **Performance Optimized**: Built with Next.js for fast loading and SEO
- **Modern Tech Stack**: React 18, Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Centralized Data Management**: Single source of truth for all portfolio content

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js
- **Icons**: React Icons
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/A-Akhil/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Updating Portfolio Content

All portfolio information is centralized in a single file: `app/data/portfolioData.ts`

To update your information:

1. Edit the `portfolioData` object in this file
2. Content is organized by sections:
   - `personalInfo`: Basic information, bio, and contact details
   - `experiences`: Work and research experiences
   - `projects`: Featured projects with descriptions
   - `skills`: Technical skills categorized by type
   - `awards`: Awards and recognitions
   - `education`: Educational background

No need to modify individual components - just update this file and changes will be reflected across the entire site!

## 🏗️ Project Structure

```
├── app/
│   ├── components/     # React components
│   ├── data/
│   │   └── portfolioData.ts  # Centralized portfolio data
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── public/             # Static assets
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── next.config.js      # Next.js configuration
```

## 🎨 Components

- **Hero**: Animated introduction with typing effects
- **About**: Personal information with animated statistics
- **Experience**: Timeline of research positions
- **Projects**: Interactive project showcase
- **Skills**: Animated skill bars and competencies
- **Awards**: Achievement cards with hover effects
- **Contact**: Interactive contact form

## 🚀 Deployment

The site is optimized for deployment on Vercel:

```bash
npm run build
npm start
```

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Smooth animations across devices

## 🔧 Customization

1. Update personal information in components
2. Modify color scheme in `tailwind.config.js`
3. Add/remove sections as needed
4. Customize animations in component files

## 📊 Performance

- Lighthouse Score: 95+
- Core Web Vitals optimized
- Image optimization with Next.js
- Code splitting and lazy loading

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

[![Contributors](https://contrib.rocks/image?repo=A-Akhil/CertiMaster)](https://github.com/A-Akhil/CertiMaster/graphs/contributors)

## License
This project is licensed under the MIT License. See the LICENSE file for details.

<div align="center">

## Please support the development by donating.

[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/aakhil)

</div>
