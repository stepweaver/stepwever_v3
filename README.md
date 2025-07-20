# λstepweaver - Growth Systems for Fast-Moving Businesses

A modern, terminal-themed portfolio website built with Next.js 15 and React 19, showcasing data pipelines, automations, and high-impact web experiences.

## 🚀 Features

- **Terminal Aesthetic**: Retro terminal/CRT design with authentic glitch effects
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance Optimized**: Image optimization, scroll throttling, and component memoization
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support
- **Error Handling**: Comprehensive error boundaries and graceful fallbacks
- **Modern Stack**: Next.js 15, React 19, Tailwind CSS 4

## 🛠 Tech Stack

- **Framework**: Next.js 15.4.1
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **Fonts**: IBM 3270, OCRA (custom), Geist (Google Fonts)
- **Build Tool**: Turbopack
- **Linting**: ESLint with Next.js config

## 📁 Project Structure

```
stepweaver_v3/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout with error boundary
│   ├── page.jsx           # Home page
│   ├── globals.css        # Global styles and CSS variables
│   └── fonts/             # Custom font files
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── GlitchButton/ # Terminal-style buttons
│   │   └── TerminalWindow/ # Terminal window wrapper
│   ├── Hero/             # Hero section
│   ├── About/            # About section
│   ├── WhyWorkWithUs/    # Value proposition
│   ├── SuccessStories/   # Case studies
│   ├── ProjectCard/      # Project showcase cards
│   ├── BackgroundCanvas/ # Animated background
│   ├── ErrorBoundary.jsx # Error handling
│   └── LoadingSpinner.jsx # Loading states
├── public/               # Static assets
│   └── images/           # Optimized images
└── styles/               # CSS modules and animations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd stepweaver_v3
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors

- **Terminal Green**: `#00ff41` - Primary accent
- **Terminal Dark**: `#0d1211` - Background
- **Terminal Light**: `#131918` - Secondary background
- **Terminal Text**: `#e2e2e2` - Primary text
- **Terminal Cyan**: `#56b6c2` - Secondary accent
- **Terminal Magenta**: `#ff55ff` - Tertiary accent

### Typography

- **IBM 3270**: Terminal-style monospace for headings
- **OCRA**: OCR-style font for body text
- **Geist**: Modern sans-serif for UI elements

### Animations

- **Glitch Effects**: Authentic terminal glitch animations
- **CRT Effects**: Scanlines, vignette, and glow effects
- **Scroll Animations**: Color transitions based on scroll position

## 🔧 Development Guidelines

### Component Structure

- Use functional components with hooks
- Implement memoization for performance-critical components
- Follow the terminal aesthetic consistently
- Include proper accessibility attributes

### Styling

- Use Tailwind CSS classes for styling
- Leverage CSS variables for theming
- Implement responsive design patterns
- Maintain the terminal aesthetic

### Performance

- Optimize images with Next.js Image component
- Implement scroll throttling for smooth animations
- Use component memoization where appropriate
- Minimize bundle size with code splitting

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Stephen Weaver** - Founder of λstepweaver

- Website: [stepweaver.dev](https://stepweaver.dev)
- Focus: Data pipelines, automations, and high-impact web experiences

---

Built with ❤️ and lots of ☕ (even though Stephen doesn't drink coffee)
