# Design Guidelines: Gen-Z Dark Rave Portfolio

## Design Approach
**Reference-Based:** Drawing from cyberpunk aesthetics, Awwwards-winning portfolios (like Bruno Simon's, Aristide Benoist), and dark rave culture. This is an experience-focused, visually-differentiated portfolio where animation and visual identity are primary differentiators.

## Core Design Principles
1. **Maximum Impact:** Every section should be a statement piece with bold 3D elements and animations
2. **Controlled Chaos:** Structured layouts with explosive visual energy
3. **Immersive Experience:** Full viewport sections with depth and layering
4. **Tech-Forward:** Showcase technical prowess through the design itself

---

## Typography

**Primary Font:** "Space Grotesk" or "Orbitron" (futuristic, geometric)
**Secondary Font:** "Inter" or "DM Sans" (readable body text)

**Hierarchy:**
- H1: 4xl to 7xl, font-weight 700-800, tracking tight, text-shadow with neon glow
- H2: 3xl to 5xl, font-weight 600-700, neon accent underlines
- H3: xl to 3xl, font-weight 600, subtle glow effects
- Body: base to lg, font-weight 400-500, slightly increased line-height for readability
- Labels/Tags: xs to sm, uppercase, tracking wide, font-weight 600

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 (p-4, m-8, gap-12, etc.)

**Section Structure:**
- Full viewport sections (min-h-screen) for Hero, Skills, Projects
- Natural height sections with min-h-[80vh] for Experience, Education
- Generous vertical padding: py-20 to py-32 on desktop, py-12 to py-16 on mobile
- Container max-width: max-w-7xl with px-6 to px-12 horizontal padding

**Grid Systems:**
- Projects: 3-column grid on desktop (grid-cols-3), 2-col tablet, 1-col mobile
- Skills: 4-6 column grid for tech icons
- Experience/Education: Single column timeline with alternating card placements

---

## Component Library

### Navigation
Fixed header with glassmorphism backdrop (backdrop-blur-xl), horizontal menu with animated underline indicators, hamburger menu transforms into full-screen overlay on mobile with staggered menu item animations

### Hero Section
Full viewport with Three.js particle background, centered content with animated heading (typewriter or glitch effect), floating 3D geometric shapes, scroll indicator with pulsing animation, CTA buttons with glowing borders and hover scale effects

### Skills Section
Hexagonal or card-based tech stack grid, each skill card has icon, name, proficiency indicator, hover reveals animated progress bar or rotating 3D icon, categorized by type (Frontend, Backend, Tools) with section dividers

### Projects Showcase
3D card grid with tilt-on-hover effects, each card shows project thumbnail with gradient overlay, tech stack tags as neon pills at bottom, flip animation reveals project details and action buttons (Live Demo, GitHub), featured project gets larger spotlight treatment

### Experience Timeline
Vertical timeline with neon connecting line, experience cards alternate left/right on desktop (single column mobile), each card contains company logo, role, duration, key achievements as animated bullet points, hover triggers glow effect on timeline node

### Education Section
Similar timeline structure to experience, institutional logos with dates, degree details, notable achievements, animated on scroll reveal

### Contact Section
Centered layout with social media icons as glowing orbs with ripple hover effects, email contact with animated envelope icon, background features subtle 3D grid or wave animation

---

## Visual Treatment

**Color Palette (Neon Dark Rave):**
- Background: Deep blacks (#0a0a0f, #080808)
- Primary Neons: Electric Purple (#9D4EDD), Cyan (#00D9FF), Hot Pink (#FF006E), Lime Green (#39FF14)
- Accent: Orange (#FF5722) for CTAs
- Text: White/Off-white for primary, gray-400 for secondary

**Effects:**
- Glassmorphism: bg-white/5 with backdrop-blur-lg and border border-white/10
- Neon Glow: box-shadow with color-matched glow (0 0 20px color, 0 0 40px color)
- CRT Scanlines: Subtle overlay on hero section
- Chromatic Aberration: On hover states for text/images
- Grain Texture: Subtle noise overlay on dark backgrounds

---

## Animations

**Page Transitions (Barba.js):**
Liquid morphing transitions between routes, wipe effects with neon trail, 0.8-1.2s duration

**Scroll Animations:**
Parallax on background elements, fade-up with stagger for card grids, progress indicators for scrollable sections, smooth scroll with easing

**Micro-interactions:**
Button hover: scale + glow intensify, Card hover: lift + tilt (transform: rotateX/Y), Skill bars: fill animation on viewport entry, Cursor trail with particle effects following mouse

**Three.js Background:**
Rotating particle field, geometric shapes (pyramids, cubes) floating with slow rotation, interactive - particles react to mouse movement with magnetic effect, color shifts based on scroll position

---

## Images

**Hero Background:** Abstract 3D render or dark cityscape with neon accents (use as texture, not focal point - Three.js overlay dominates)

**Project Thumbnails:** High-quality screenshots or mockups with 16:9 aspect ratio, gradient overlay in project brand colors

**Company/School Logos:** Clean SVG logos on transparent background, apply neon glow on hover

**Profile Image (if used):** Futuristic treatment - holographic border, floating geometric frame, subtle animation

All images should maintain the dark rave aesthetic with high contrast and neon accent integration.