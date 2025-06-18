# CN Robbins - Personal Portfolio

A modern, animated personal portfolio website built with Astro, featuring flashy animations and interactive elements.

## Features

- **Modern Design**: Clean, minimalist design with beautiful gradients and glassmorphism effects
- **Smooth Animations**: GSAP-powered animations including:
  - Loading screen with character animations
  - Scroll-triggered animations
  - Interactive 3D cube
  - Smooth page transitions
  - Custom cursor effects
- **Dark/Light Mode**: Theme toggle with smooth transitions
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Built with Astro for optimal loading speeds
- **Accessibility**: WCAG compliant with proper semantic HTML

## Tech Stack

- **Framework**: Astro
- **Styling**: Modern CSS with custom properties
- **Animations**: GSAP (GreenSock)
- **Typography**: Inter & JetBrains Mono
- **Deployment**: GitHub Pages via GitHub Actions

## Installation

1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)
   - Recommended version: 18.x or higher

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Customization

### Colors & Theme
Edit `src/styles/variables.scss` to customize:
- Color palette
- Typography settings
- Spacing values
- Animation timings

### Content
- Update personal information in `src/pages/index.astro`
- Modify navigation links in `src/layouts/Layout.astro`
- Add your projects to the featured work section

### Images
Place your images in the `public/images/` directory:
- `profile.jpg` - Your profile photo
- `project-1.jpg`, `project-2.jpg`, etc. - Project screenshots

## Deployment

The site automatically deploys to GitHub Pages when you push to the main branch. Make sure to:

1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"
3. Push your changes to the main branch

## Commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`     |
| `npm run build`        | Build your production site to `./dist/`         |
| `npm run preview`      | Preview your build locally, before deploying    |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |

## Performance Features

- Static site generation for fast loading
- Optimized images and assets
- Minimal JavaScript bundle
- CSS custom properties for theming
- Modern web standards (ES2022+)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License

---

Built with love using Astro and modern web technologies.