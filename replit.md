# Nordic Magic Oracle

## Overview

A mystical Nordic rune-based oracle web application that allows users to select a rune and receive a unique discount code for magical services. The application features client-side browser fingerprinting for fraud prevention, ensuring each user can only claim one discount code. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom dark Nordic theme, CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for ritualistic reveal animations
- **Build Tool**: Vite with React plugin

The frontend follows a component-based architecture with pages in `client/src/pages/`, reusable components in `client/src/components/`, and UI primitives in `client/src/components/ui/`. Custom hooks handle fingerprinting, oracle consultation, and mobile detection.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for TypeScript execution
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Build**: esbuild for production bundling with selective dependency bundling

The server uses a clean separation with routes registered in `server/routes.ts`, database operations in `server/storage.ts`, and static file serving in `server/static.ts`. Development uses Vite middleware for HMR.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's schema builder
- **Validation**: drizzle-zod for generating Zod schemas from database tables
- **Tables**: 
  - `claims`: Stores discount code claims with fingerprint hash, IP hash, benefit tier
  - `attempts`: Tracks consultation attempts by IP hash for rate limiting

### Fraud Prevention System
- **Browser Fingerprinting**: Client-side fingerprint generation using Web Crypto API (SHA-256)
- **Signals collected**: User agent, language, timezone, screen dimensions, color depth, canvas fingerprint
- **IP Hashing**: Server-side IP address hashing for rate limiting
- **One-claim-per-fingerprint**: Duplicate claims blocked at database level

### Probability-Based Benefit System
The oracle uses weighted random distribution for discount tiers:
- 0.5% → Free Spell
- 5% → 25% discount
- 10% → 20% discount
- 20% → 15% discount
- 30% → 10% discount
- Remainder → 5% discount
Suspicious activity (detected via IP rate limiting) forces the lowest tier.

### Shared Code Architecture
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Database schema and TypeScript types
- `routes.ts`: API route definitions with Zod input/output schemas

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `NEON_DATABASE_URL` environment variable
- **Connection**: pg Pool with SSL enabled, managed through Drizzle ORM
- **Migrations**: Drizzle Kit for schema push (`npm run db:push`)

### UI/Component Libraries
- **Radix UI**: Full suite of accessible primitive components
- **shadcn/ui**: Pre-configured component library (New York style)
- **Framer Motion**: Animation library for mystic transitions
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Development server and build tool
- **Replit plugins**: Runtime error overlay, cartographer, dev banner (development only)

### Fonts
- **Cinzel**: Display font for headings (via Google Fonts)
- **Cormorant Garamond**: Serif font for body text (via Google Fonts)

### Session Management
- **connect-pg-simple**: PostgreSQL session store (available in dependencies)
- **express-session**: Session middleware (available in dependencies)