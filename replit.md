# Interactive Developer Portfolio

## Overview

This is an interactive developer portfolio website built as a full-stack web application. The portfolio features a unique bug shooter game integrated into the main interface, allowing visitors to interact with the developer's skills in a playful way. The application showcases projects, experience, and skills through a modern, game-integrated design inspired by aximoris.com.

The portfolio consists of two main pages:
- **Home Page**: A three-column layout featuring personal information, an interactive bug shooter game, and a honeycomb project gallery
- **CV Page**: A traditional scrollable resume with navigation dots

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**UI Component Library**: Shadcn UI components built on top of Radix UI primitives, providing a comprehensive set of accessible, customizable components. The design system uses the "new-york" style variant with CSS variables for theming.

**Styling**: TailwindCSS with a custom configuration featuring:
- Dark theme as the default color scheme (neutral base colors)
- Custom utility classes for hover effects (`hover-elevate`, `active-elevate-2`)
- Google Fonts integration (Inter for primary text, Space Mono for monospace/technical elements)
- Custom spacing system using Tailwind units (4, 6, 8, 12)

**Routing**: Wouter for client-side routing, providing a lightweight alternative to React Router.

**State Management**: React Query (TanStack Query) for server state management with custom query client configuration. Local component state managed with React hooks.

**Layout Strategy**:
- Desktop: Three-column grid layout (25% left sidebar, 50% center game area, 25% right projects panel)
- Mobile: Single-column vertical stack with sticky header and fullscreen game option
- Responsive breakpoint at 768px (lg: prefix)

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Development Setup**: Custom Vite middleware integration for hot module replacement in development. Production builds bundle the server code using esbuild.

**Storage Layer**: Abstract storage interface (IStorage) with in-memory implementation (MemStorage). The interface is designed to be swapped with a database-backed implementation without changing application code.

**API Design**: RESTful endpoints prefixed with `/api`. The route registration system is modular and designed for easy expansion.

### Data Storage Solutions

**Database ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless driver.

**Schema Definition**: Type-safe schema definitions in `shared/schema.ts` using Drizzle's schema builder. Includes Zod integration for runtime validation through `drizzle-zod`.

**Current Schema**: Basic user table with:
- UUID primary key (auto-generated)
- Username (unique, required)
- Password (required)

**Migration Strategy**: Drizzle Kit configured to output migrations to `./migrations` directory with `db:push` script for schema updates.

**Note**: The application currently uses an in-memory storage implementation but is architected to easily integrate PostgreSQL through the existing Drizzle configuration.

### Authentication and Authorization

**Current State**: Basic user schema exists, but no authentication middleware is implemented. The storage interface includes methods for user creation and retrieval by username or ID.

**Designed For**: Future implementation of session-based or token-based authentication. The Express server includes middleware for JSON body parsing with raw body access for webhook verification scenarios.

### Component Architecture

**Custom Interactive Components**:
- **BugShooterGame**: Canvas-based game with particle effects, power-ups, and skill collection mechanics
- **HoneycombButton**: SVG-based hexagonal buttons with glow effects and hover animations
- **LocationMap**: Animated canvas showing location with grid overlay
- **CVNavDots**: Scroll-based navigation with smooth scrolling to CV sections
- **ProjectsGrid**: Circular arrangement of honeycomb project cards with hexagonal background pattern

**Design Principles**:
- Component isolation with example files in `components/examples/`
- TypeScript interfaces for all props
- Accessibility features (ARIA labels, semantic HTML)
- Test IDs on interactive elements for testing

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Complete suite of accessible component primitives (accordion, dialog, dropdown, popover, etc.)
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx + tailwind-merge**: Conditional className utilities

### Development Tools
- **Replit Plugins**: 
  - Runtime error modal overlay
  - Cartographer for code navigation
  - Dev banner for development environment

### Build Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server-side bundling for production
- **PostCSS**: CSS processing with Autoprefixer
- **TypeScript**: Type checking across client, server, and shared code

### Utilities
- **wouter**: Lightweight client-side routing
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation

### Server Dependencies
- **connect-pg-simple**: PostgreSQL session store (configured but not currently used)
- **@neondatabase/serverless**: Neon serverless PostgreSQL driver

### Form Handling
- **React Hook Form**: Form state management (dependency present, not currently implemented)
- **@hookform/resolvers**: Validation resolver integration
- **Zod**: Schema validation library integrated with Drizzle

### Carousel/Animation
- **embla-carousel-react**: Touch-friendly carousel component (dependency present)
- **vaul**: Drawer component for mobile interfaces

**Note**: Several dependencies are included but not actively used in the current implementation, suggesting planned features or experimentation during development.