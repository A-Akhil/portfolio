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

All portfolio information now lives in a single JSON file: `app/data/portfolio.json`.

To update your information:

1. Edit the JSON structure in `app/data/portfolio.json`. Each top-level key mirrors a site section (e.g., `hero`, `about`, `experience`, `projects`, `skills`, `awards`, `contact`, `seo`).
2. Run the validation script to ensure your changes conform to the schema:
   ```bash
   npm run "validate:data"
   ```
3. Review the console output; the script reports detailed paths for any schema violations. A green check message means the data is safe to commit.

Reference files:

- `app/utils/portfolioSchema.ts`: Zod schema defining the expected JSON shape.
- `app/utils/portfolioNormalizer.ts`: Applies defaults for optional fields so UI components stay lean.
- `app/utils/getPortfolioData.ts`: Loader that parses, validates, caches, and exports the centralized data for both UI and terminal features.

No component edits are required for simple content updates—modify the JSON, validate, and the site consumes the new data automatically once the refactor is complete.

## 🏗️ Project Structure

```
├── app/
│   ├── components/     # React components
│   ├── data/
│   │   └── portfolio.json        # Centralized portfolio content
│   ├── utils/
│   │   ├── getPortfolioData.ts    # Validated loader & cache
│   │   ├── portfolioNormalizer.ts # Normalization helpers
│   │   └── portfolioSchema.ts     # Zod schema definition
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

1. Update personal information in `app/data/portfolio.json` (and run `npm run "validate:data"`).
2. Modify color scheme in `tailwind.config.js`.
3. Add/remove sections as needed—adjust the schema and JSON before touching components.
4. Customize animations in component files.

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
