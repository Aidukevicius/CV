# Design Guidelines: Interactive Developer Portfolio

## Design Approach
**Reference-Based Design** inspired by aximoris.com - modern, sophisticated portfolio aesthetic with interactive elements and spatial depth. Focus on creating an immersive, game-integrated experience that showcases technical creativity.

## Layout System

### Three-Column Desktop Layout
- **Left Panel (25% width)**: Personal information sidebar, fixed position
- **Center Panel (50% width)**: Interactive game canvas + skill display area
- **Right Panel (25% width)**: Honeycomb project gallery, scrollable

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, and 12 consistently throughout (p-4, p-6, gap-8, m-12)

### Viewport Strategy
- Main portfolio: Full viewport height (100vh) with three-column grid
- CV page: Natural scroll height with fixed navigation dots

## Typography

**Font Selection**: Google Fonts via CDN
- **Primary**: Inter or DM Sans (clean, modern sans-serif)
  - Headings: 600-700 weight
  - Body: 400-500 weight
- **Accent**: Space Mono or JetBrains Mono for technical details/game stats
  - Used for: location, timestamps, game score

**Hierarchy**:
- Name/Hero: text-4xl to text-5xl, font-bold
- Section Headers: text-2xl, font-semibold
- Body Text: text-base, font-normal
- Labels/Meta: text-sm, font-medium
- Game UI/Stats: text-xs to text-sm, monospace font

## Component Library

### Left Panel Components
1. **Personal Header**
   - Large name display with subtle letter-spacing
   - 2-3 sentence intro paragraph (max-w-prose)
   - Location with icon + local time display
   - Spacing: gap-6 between elements

2. **Action Buttons**
   - Full-width buttons with gap-4 vertical spacing
   - "Contact Me" (primary style, mailto: link)
   - "View CV" (secondary style, navigates to CV page)
   - Button height: h-12

### Center Panel Components
1. **Game Canvas**
   - Canvas element taking ~70% of center panel height
   - Aspect ratio: 16:10 or similar
   - Bordered with subtle treatment

2. **Skills Display Area**
   - Grid layout below game (grid-cols-4 to grid-cols-6)
   - Skill badges: icon + label, collected as game progresses
   - Badge size: w-16 h-16 or similar
   - Spacing: gap-4

3. **Game UI Overlay**
   - Score counter (top-right of canvas)
   - Health/lives indicator
   - Controls hint (WASD + Mouse/Space) - bottom overlay

### Right Panel Components
1. **Honeycomb Project Grid**
   - Hexagonal buttons arranged in honeycomb pattern
   - Each hexagon contains project thumbnail/icon
   - Hover state: expands, reveals project title + brief description
   - Stagger effect on load

2. **Social Links Section**
   - Bottom of right panel
   - Smaller honeycomb buttons for GitHub, LinkedIn
   - Icons from Heroicons or Font Awesome
   - Hover: scale + glow effect

### CV Page Components
1. **CV Content Layout**
   - Single column, max-w-4xl centered
   - Sections: Header, Experience, Education, Skills, Projects
   - Section spacing: py-12 between major sections

2. **Navigation Dots**
   - Fixed position on right side
   - 6-8 dots representing CV sections
   - Active state indicator
   - Smooth scroll on click
   - Dot size: w-3 h-3, spacing: gap-3

## Interaction Patterns

### Hover States
- Honeycomb projects: Scale(1.15) + reveal info panel
- Social icons: Scale(1.1) + glow/shadow
- Buttons: Subtle lift effect
- CV navigation dots: Scale + fill transition

### Game Interactions
- WASD: Character movement (visual feedback on keypresses)
- Mouse aim: Crosshair follows cursor
- Shooting: Space or mouse click
- Bug defeat: Drop animation + skill badge collection
- Skill collection: Badge flies to skills display area

### Scroll Behavior
- Left/Right panels: Fixed on main page
- Center panel: Game fixed, skills area scrollable if needed
- CV page: Smooth scroll with intersection observer for dot navigation

## Animations

**Use Sparingly**:
- Initial load: Staggered fade-in for three panels (150ms delay between)
- Honeycomb hover: 200ms ease-out transform
- Skill badge collection: 400ms fly-in animation
- CV dot navigation: 300ms smooth scroll

## Visual Hierarchy

**Primary Focus**: Center game canvas draws immediate attention
**Secondary**: Left panel personal info and right panel projects compete equally
**Tertiary**: Bottom social links, subtle presence

**Depth Layers**:
1. Background: Deepest layer
2. Panels: Three distinct z-index layers
3. Game UI: Overlays on canvas
4. Hover states: Highest z-index when active

## Responsive Considerations

**Desktop-First** (optimized for 1920x1080+):
- Three-column grid maintained on large screens
- Minimum width: 1280px recommended

**Tablet/Mobile** (stack vertically):
- Left panel: Full width header section
- Center game: Full width, adjusted canvas size
- Right panel: Full width grid (2-3 columns)

## Images

**No large hero images** - this portfolio uses the interactive game as the visual centerpiece.

**Project Thumbnails**: 
- Honeycomb project buttons contain small preview images/screenshots
- Dimensions: 200x200px per honeycomb cell
- Format: WebP for performance

**Skill Icons**:
- Display below game when collected
- Use icon libraries (Font Awesome tech icons) or simple SVG badges
- Size: 32x32px to 48x48px

**Social Icons**:
- GitHub, LinkedIn logos in honeycomb buttons
- Size: 24x24px icons

## Accessibility
- Keyboard navigation for all interactive elements
- ARIA labels for game controls and navigation dots
- Focus indicators on all clickable elements
- Alt text for all project images