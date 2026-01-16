# Mystical Nordic Rune Oracle - Design Guidelines

## Design Approach
**Reference-Based**: Drawing from mystical/spiritual apps (Co-Star, The Pattern) combined with Nordic aesthetic influences. Dark, atmospheric interface with ancient mysticism meets modern minimalism.

## Typography
**Primary Font**: Cinzel (headers, rune names, ritual actions) - weights: 400, 600, 700
**Secondary Font**: Cormorant Garamond (body text, descriptions, atmospheric copy) - weights: 300, 400, 500, 600

Hierarchy:
- Main Title: Cinzel Bold, text-5xl to text-7xl, tracking-wider
- Section Headers: Cinzel Semibold, text-2xl to text-4xl, tracking-wide  
- Rune Names: Cinzel Regular, text-xl to text-3xl, tracking-widest
- Body/Descriptions: Cormorant Garamond Light/Regular, text-lg to text-xl, leading-relaxed
- Microcopy: Cormorant Garamond Regular, text-base

## Layout System
**Spacing**: Tailwind units of 4, 6, 8, 12, 16, 24 for consistent rhythm (e.g., p-8, gap-12, my-16)
**Container**: max-w-6xl centered for main content, full-bleed for atmospheric sections

## Images

**Hero Section (Full Viewport)**:
Large atmospheric background image: Misty Nordic landscape with ancient stone formations, runic carvings, or aurora borealis. Dark, moody, high contrast with mysterious fog/mist. Image should be darkened (overlay: bg-black/40) to ensure text legibility.

**Accent Images**:
- Rune stone textures for card backgrounds (subtle, low opacity overlays)
- Close-up Nordic patterns/carvings for decorative sections
- Atmospheric smoke/mist particles (subtle background elements)

## Component Library

**"Start Ritual" Button (Hero CTA)**:
- Large, prominent button with blurred glass-morphism background (backdrop-blur-md, bg-white/10)
- Border: 1px solid white/20
- Cinzel font, tracking-widest, uppercase
- Padding: px-12 py-4
- Glow effect with subtle shadow

**Secondary Buttons**:
- Outlined style with thin borders
- Hover: subtle glow, border brightens

**Cards (Rune Display)**:
- Dark backgrounds with subtle borders (border-white/10)
- Runic symbol centered at top
- Rune name below in Cinzel
- Interpretation text in Cormorant Garamond
- Padding: p-8

**Navigation** (if multi-page):
- Minimal top bar, Cinzel for nav items
- Subtle divider lines between sections

## Welcome Screen Layout

**Full-Viewport Hero Section**:
- Background: Large mystical Nordic landscape image (described above)
- Centered content with vertical centering
- App title/logo at top-third: Large Cinzel text with letter-spacing, possibly incorporating Nordic rune symbols
- Tagline below: Cormorant Garamond italic, smaller, atmospheric copy ("Unveil ancient wisdom" or similar)
- "Start Ritual" button prominently centered below tagline
- Subtle Nordic pattern border or divider elements (thin lines with runic accents)

**Below Hero** (Optional scrollable content):
- Brief introduction section: 2-column layout (md breakpoint)
  - Left: "What is the Rune Oracle" - Cormorant Garamond description
  - Right: Symbolic rune imagery or pattern
- Featured runes preview: 3-column grid of rune cards (1 column mobile, 2 tablet, 3 desktop)
- Footer: Minimal with subtle Nordic knotwork divider

**Atmospheric Elements**:
- Particle effects (CSS-based subtle animations): floating runes, gentle fog movement
- Vignette effect on edges to draw focus center
- Subtle gradient overlays on dark backgrounds (deep blues, purples mixing with blacks)

**Spacing Rhythm**:
- Hero section: Full viewport height (min-h-screen)
- Content sections: py-24 desktop, py-16 mobile
- Inter-section spacing: mb-16 between major blocks
- Card gaps: gap-8 in grids

This creates an immersive, ritualistic entry experience with the hero image establishing immediate mystical atmosphere, the glass-morphism button inviting interaction, and supporting content building anticipation for the oracle experience.