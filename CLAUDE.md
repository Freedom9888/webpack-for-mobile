# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with webpack-dev-server on port 3000 (allows network access on 0.0.0.0)
- `npm run start` - Alternative dev server command using webpack serve
- `npm run build` - Production build with optimizations
- `npm run builddev` - Development build without dev server
- `eslint --fix src/**/*.{js,jsx,ts,tsx}` - Lint and auto-fix TypeScript/React files
- `prettier --write src/**/*.{js,jsx,ts,tsx}` - Format code with Prettier

## Architecture Overview

This is a mobile-first React TypeScript application using webpack for bundling and SWC for fast compilation.

### Build Configuration
- **Bundler**: Custom webpack config optimized for mobile development
- **Compiler**: SWC (faster than Babel) for TypeScript/JSX compilation
- **CSS**: Support for both CSS Modules (`.module.scss/.css`) and regular CSS
- **Mobile Optimization**: PostCSS with px-to-viewport plugin converting `rpx` units to `vw` (750px design width)
- **Code Splitting**: Automatic chunk splitting with common utilities extracted
- **Externals**: React and ReactDOM loaded via CDN to reduce bundle size

### Project Structure
- `src/index.tsx` - Application entry point
- `src/App.tsx` - Main app component with lazy-loaded page routing
- `src/pages/` - Page components (Home, About, Invest) using React.lazy
- `src/components/` - Reusable components like CountDown
- `src/utils/` - Utility functions
- CSS Modules use `.module.scss` or `.module.css` extension

### Key Technologies
- React 18 with TypeScript
- CSS Modules for component-scoped styling
- Lodash utilities (particularly debounce)
- Mobile-responsive design with viewport units
- Code splitting and lazy loading for performance

### Development Setup
- Dev server runs on port 3000 with network access enabled
- Hot reload and source maps in development
- Gzip compression and bundle analysis enabled
- ESLint + Prettier with Husky hooks for code quality
- lint-staged runs on pre-commit for staged files only

### Production Optimizations
- Console statements removed in production builds
- CSS and JS minification
- Automatic chunk splitting for better caching
- Gzip compression for assets >1KB