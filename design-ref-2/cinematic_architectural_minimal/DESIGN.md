---
name: Cinematic Architectural Minimal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#d3c4b9'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#9b8e85'
  outline-variant: '#4f453d'
  surface-tint: '#e5bf9f'
  primary: '#e5bf9f'
  on-primary: '#432b14'
  primary-container: '#8d6e52'
  on-primary-container: '#fffbfa'
  inverse-primary: '#75593e'
  secondary: '#e9c176'
  on-secondary: '#412d00'
  secondary-container: '#604403'
  on-secondary-container: '#dab36a'
  tertiary: '#ccc5c1'
  on-tertiary: '#33302d'
  tertiary-container: '#787370'
  on-tertiary-container: '#fffbfa'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcbf'
  primary-fixed-dim: '#e5bf9f'
  on-primary-fixed: '#2b1703'
  on-primary-fixed-variant: '#5c4129'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e9e1dd'
  tertiary-fixed-dim: '#ccc5c1'
  on-tertiary-fixed: '#1e1b19'
  on-tertiary-fixed-variant: '#4a4643'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
  sand-light: '#FDF8F7'
  charcoal-depth: '#0D0B0A'
  champagne-glimmer: '#D9BD89'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  arabic-headline:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 64px
  arabic-body:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 20px
  layer-gap: 120px
---

## Brand & Style

The design system is rooted in the intersection of architectural precision and cinematic storytelling. It targets a high-end clientele seeking sophistication, durability, and a sense of permanence in interior design. The personality is authoritative yet welcoming—balancing the "weight" of stone and wood with the "light" of open, expansive spaces.

The visual style is a fusion of **Minimalism** and **Glassmorphism**, elevated by **Tactile** depth. We utilize heavy whitespace to allow high-resolution textures of SPC flooring and soft stone to breathe. Layered compositions and asymmetric layouts create a sense of bespoke curation, moving away from standard grid-locked e-commerce towards a premium digital showroom. Depth is communicated through subtle light-leaks, soft shadows, and multi-layered surfaces that mimic physical architectural materials.

## Colors

The palette is derived from raw, premium construction materials. The core experience is **Dark Mode**, utilizing `#171412` (Obsidian) as the foundation to create a cinematic backdrop that makes product textures "pop." 

- **Primary (Natural Wood):** `#8D6E52` is used for interactive elements and key thematic blocks, providing warmth.
- **Secondary (Champagne Gold):** `#C5A059` is reserved for high-value accents, badges, and "Premium" signifiers.
- **Backgrounds:** We utilize a tiered dark system. `charcoal-depth` for the lowest layer, moving up to the neutral `#2D2D2D` for cards and containers.
- **Typography:** Use `sand-light` (`#FDF8F7`) for high-contrast readability against dark backgrounds, ensuring an off-white softness that avoids eye strain.

## Typography

The typography strategy focuses on a high-contrast hierarchy. **Plus Jakarta Sans** provides a modern, geometric clarity for English displays, while **IBM Plex Sans Arabic** is used for its structural integrity and "architectural" feel in Arabic script.

**Display** styles should be used sparingly for hero sections, often with negative letter spacing to create a tight, editorial look. **Inter** is the workhorse for technical specifications and product descriptions, providing a neutral, utilitarian balance to the more expressive display faces. For a truly luxury feel, utilize the `label-caps` for category headers and overlines.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid**. On desktop, content is centered within a 1440px container, but background textures and "bleeding" images extend to the viewport edges to maintain a cinematic feel.

We employ an **Asymmetric Grid**. Rather than standard 4-column product rows, we use staggered 2-column or 3-column layouts with varied vertical offsets (the `layer-gap`) to mimic the way interior design elements are layered in a physical space. Large-scale imagery should often break the grid, overlapping with typography or adjacent containers to create a 3D depth effect. 

Spacing is generous; we prioritize breathing room over information density.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Glassmorphism**.
- **Level 0 (Base):** Deepest charcoal `#0D0B0A`.
- **Level 1 (Surfaces):** Neutral `#2D2D2D` with a subtle 1px inner border of `primary_color_hex` at 10% opacity.
- **Level 2 (Interaction):** Components that "float" use a backdrop filter (blur: 20px) and a semi-transparent fill of `#171412` at 80% opacity.
- **Shadows:** Avoid standard black dropshadows. Use "Ambient Glows"—extra-diffused (40px-60px blur) shadows with a slight tint of the primary wood tone (`#8D6E52`) at very low opacity (5-8%) to simulate warmth reflecting off a dark floor.

## Shapes

To maintain an architectural and premium feel, we use **Soft** roundedness (`0.25rem`). This sharp-but-not-harsh geometry reflects the precision of cut stone and SPC planks. 

- **Cards:** Use `rounded-lg` (0.5rem) for a subtle container feel.
- **CTAs:** Buttons should remain strictly rectangular or use the base `roundedness` (0.25rem) to signify structural stability. 
- **Icons:** Use linear, thin-stroke icons with square terminals to match the typography's structural nature.

## Components

### Buttons
Primary buttons use a solid fill of `primary_color_hex` with `sand-light` text. Hover states should trigger a slight "lift" (Y-axis translation) and an increase in the ambient glow shadow. Secondary buttons are "Ghost" style with a `secondary_color_hex` border and no fill.

### Cards (Material Showcases)
Cards are the heart of this system. They should feature a large image area with a 1:1.5 aspect ratio. The product title should overlap the bottom edge of the image in a glassmorphic container to create a 3D layered effect.

### Input Fields
Inputs are minimalist: a single bottom border in `#FDF8F7` (20% opacity). On focus, the border transitions to `secondary_color_hex` (Gold) and the label floats upwards using the `label-caps` style.

### Navigation
A sticky, glassmorphic top bar. Use high blur (30px) and a thin bottom border. The logo should be centered to reinforce the high-end editorial boutique feel.

### Product Detail Layers
Instead of a standard scroll, use horizontal "plank" sections for technical details, where the background texture of the section matches the product material (e.g., a Soft Stone texture background for Soft Stone products).