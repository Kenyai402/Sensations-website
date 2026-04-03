# Sensations - Art & Music Therapy Community Platform

## Overview
Sensations is a modern, responsive web platform for a youth-focused mental health and art/music therapy initiative based in Nairobi, Kenya. The platform empowers young people through creative expression and community healing, inspired by the "Akili Yangu Raha Yangu" project.

## Project Purpose
Sensations creates a safe, welcoming digital sanctuary where young people can:
- Discover healing through art and music therapy
- Access mental wellness resources and programs
- Connect with a supportive community
- Express themselves authentically
- Learn about evidence-based therapeutic practices

## Website Structure

### Components
```
components/
├── Navbar.tsx          - Fixed navigation with brand logo and CTAs
├── Hero.tsx            - Hero section with expressive headline and youth messaging
├── About.tsx           - Mission, vision, values, and healing modalities
├── Events.tsx          - Upcoming therapy sessions and workshops
├── Gallery.tsx         - Creative expression gallery with filtering
├── Testimonials.tsx    - Impact stories and community testimonials
├── Contact.tsx         - Newsletter signup and contact form
└── Footer.tsx          - Navigation and legal links
```

### Pages
- **app/page.tsx** - Home page combining all components
- **app/layout.tsx** - Root layout with Playfair Display & Lato fonts
- **app/globals.css** - Global styles with custom color palette

## Design System

### Color Palette
Carefully chosen to feel creative yet grounding:

**Primary Colors:**
- **Soft Lavender** (`--lavender`): Calming, therapeutic, introspective
- **Warm Coral** (`--coral`): Warm, welcoming, hopeful, energizing
- **Muted Teal** (`--teal`): Grounding, healing, authentic

**Neutral Colors:**
- **Warm Cream** (`--cream`): Inviting, safe, comfortable background
- **Light Grey** (`--light-gray`): Subtle contrast, readability

**Accent Color:**
- **Sunflower Yellow** (`--sunflower`): Joy, energy, highlights

### Typography
- **Headings**: Playfair Display (expressive, elegant, modern-artistic)
- **Body Text**: Lato (clean, readable, accessible, welcoming)

### Design Tokens
All colors are defined as CSS custom properties in `globals.css` for easy theming and consistency.

## Key Sections

### 1. Hero Section
- Emotionally resonant headline: "Transform Through Creative Expression"
- Youth-focused messaging emphasizing community empowerment
- Subtle background animations with gradient circles
- Dual CTAs: "Join a Session" and "Explore Our Mission"
- Social proof: "Trusted by 1000+ young people"

### 2. About Section
- **Mission**: Using art and music as tools for transformation
- **Core Values**: Integrity, honesty, humility, courage
- **Healing Modalities**:
  - Art Therapy
  - Music Therapy
  - Group Sessions
  - Individual Care
- Evidence-based approach with licensed therapists

### 3. Events/Programs
- **Art Therapy**: Acrylic, watercolor, pottery, drawing sessions
- **Music Therapy**: Cello sessions, sound baths, piano reflections
- **Group Healing**: Rhythm circles, communal sessions
- Dynamic event cards with date blocks, categories, time/location, spot availability

### 4. Gallery/Creative Expression
- Masonry grid showcasing art and music therapy outcomes
- Category filtering (All, Art, Music, Workshop)
- Emphasizes transformation through creative expression

### 5. Testimonials & Impact
- **Main Testimonials**: Three featured testimonials from youth participants
- **Quick Testimonials**: Six brief powerful quotes from community members
- **Impact Metrics**:
  - 1,000+ youth reached
  - 4,500+ artworks created
  - 850+ healing sessions
  - 98% would recommend

### 6. Community Connection
- Newsletter signup with youth empowerment messaging
- Contact form for inquiries
- Location and contact information
- Social media links

### 7. Footer
- Brand info and mission statement
- Navigation links
- Social media
- Legal links

## Features

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive layouts for all screen sizes
- Touch-friendly navigation

### Accessibility
- Semantic HTML elements
- ARIA labels and roles
- Screen reader optimized text
- High contrast color combinations
- Readable font sizes

### Interactive Elements
- Smooth scroll navigation
- Hover effects on cards
- Category filtering in gallery
- Testimonial carousel
- Mobile hamburger menu
- Form interactions

### Visual Design
- Smooth gradients and blended backgrounds
- Subtle animations (bounce, pulse effects)
- Custom rounded corners (0.75rem radius)
- Consistent spacing using Tailwind gap utilities
- Professional shadow system

## User Journey

1. **Discovery** - Hero section captures attention with youth-focused messaging
2. **Education** - About section explains mission, values, and modalities
3. **Exploration** - Events and Gallery showcase available programs
4. **Social Proof** - Testimonials demonstrate real transformation
5. **Engagement** - Contact and Newsletter sections enable participation
6. **Connection** - Footer provides multiple contact pathways

## Target Audience

**Primary**: Young people (ages 15-25) seeking:
- Mental health support and emotional wellness
- Safe space for self-expression
- Community connection
- Creative healing modalities

**Secondary**: 
- Parents/guardians looking for therapeutic resources
- Organizations interested in partnership
- Mental health practitioners

## Technical Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **Fonts**: Google Fonts (Playfair Display, Lato)
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Color Implementation Examples

```tsx
// Primary buttons use coral
className="bg-coral hover:bg-coral/90 text-white"

// Secondary buttons use teal
className="border-teal text-teal hover:bg-teal hover:text-white"

// Accent elements use sunflower yellow
className="bg-sunflower"

// Backgrounds use cream
className="bg-cream"
```

## Customization Guide

### To change the color palette:
Edit `globals.css` and update the CSS custom properties:
```css
--lavender: oklch(0.82 0.08 290);
--coral: oklch(0.75 0.15 25);
--teal: oklch(0.65 0.1 195);
--cream: oklch(0.97 0.01 90);
--light-gray: oklch(0.92 0 0);
--sunflower: oklch(0.88 0.18 90);
```

### To update fonts:
Edit `layout.tsx` to import different fonts and update `globals.css` to apply them.

### To modify content:
Each component contains its own data objects (testimonials, modalities, events, etc.) that can be easily updated without touching component logic.

## Brand Values

The design embodies Sensations' core principles:

- **Integrity**: Honest representation of therapeutic practices
- **Honesty**: Authentic testimonials and real community stories
- **Humility**: Welcoming, non-judgmental tone
- **Courage**: Bold, expressive visual design encouraging self-discovery

## Accessibility Compliance

- WCAG 2.1 AA compliant color contrasts
- Semantic HTML structure
- Screen reader friendly
- Keyboard navigable
- Mobile accessible

## Future Enhancements

Potential additions:
- Session booking integration
- User profiles and progress tracking
- Blog/resources section
- Volunteer portal
- Community forum
- Online session capabilities
- Payment integration
- Analytics dashboard

## Getting Started

1. Install dependencies: `npm install` or `pnpm install`
2. Run development server: `npm run dev`
3. Open `http://localhost:3000` in browser
4. Navigate and explore the platform

## Deployment

Deploy to Vercel with:
```bash
vercel
```

Or use GitHub integration for auto-deployment on push.

## Contact & Support

For inquiries about Sensations:
- Visit the Contact section on the website
- Subscribe to the newsletter for updates
- Reach out through social media links in footer

---

**Sensations - Empowering youth through creative expression and community healing.**
