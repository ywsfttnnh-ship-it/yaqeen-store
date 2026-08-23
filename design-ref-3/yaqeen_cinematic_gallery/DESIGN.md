---
name: Yaqeen Cinematic Gallery
colors:
  surface: '#161311'
  surface-dim: '#161311'
  surface-bright: '#3c3836'
  surface-container-lowest: '#100e0c'
  surface-container-low: '#1e1b19'
  surface-container: '#221f1d'
  surface-container-high: '#2d2927'
  surface-container-highest: '#383432'
  on-surface: '#e9e1dd'
  on-surface-variant: '#d3c4b9'
  inverse-surface: '#e9e1dd'
  inverse-on-surface: '#33302d'
  outline: '#9b8e85'
  outline-variant: '#4f453d'
  surface-tint: '#e5bf9f'
  primary: '#e5bf9f'
  on-primary: '#432b14'
  primary-container: '#8d6e52'
  on-primary-container: '#fffbfa'
  inverse-primary: '#75593e'
  secondary: '#cac6c5'
  on-secondary: '#313030'
  secondary-container: '#484646'
  on-secondary-container: '#b8b4b3'
  tertiary: '#b2cadb'
  on-tertiary: '#1c3340'
  tertiary-container: '#607786'
  on-tertiary-container: '#fafcff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcbf'
  primary-fixed-dim: '#e5bf9f'
  on-primary-fixed: '#2b1703'
  on-primary-fixed-variant: '#5c4129'
  secondary-fixed: '#e6e1e0'
  secondary-fixed-dim: '#cac6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#484646'
  tertiary-fixed: '#cee6f7'
  tertiary-fixed-dim: '#b2cadb'
  on-tertiary-fixed: '#051e2a'
  on-tertiary-fixed-variant: '#334a57'
  background: '#161311'
  on-background: '#e9e1dd'
  surface-variant: '#383432'
  charcoal-surface: '#2D2D2D'
  gold-leaf: '#C5A059'
  sand-muted: '#E5D9D1'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-xl:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 80px
  section-gap: 160px
---

## Brand & Style

The design system is engineered to transform a commercial catalog into a high-end digital gallery. It targets an affluent demographic looking for SPC Parquet and premium stone finishes, evoking a sense of permanence, weight, and architectural precision.

The aesthetic follows a **Cinematic 3D Minimalism** style. It utilizes floating layers, deep ambient shadows, and glassmorphism to create a physical sense of depth, as if the product samples are suspended in a curated space. Asymmetric layouts and oversized editorial typography break the traditional retail grid, positioning the store as a design authority rather than a mere warehouse.

**Key Visual Principles:**
- **Atmospheric Depth:** Using Z-axis layering to separate navigation, content, and background.
- **Materiality:** Translating stone and wood textures into UI through subtle grain overlays and light-refracting glass.
- **RTL-First Composition:** All visual weight and motion paths are optimized for Arabic reading patterns, moving from top-right to bottom-left.

## Colors

The palette is rooted in natural architectural materials. The **Primary (Warm Sand/Wood)** color is used for call-to-actions and highlights, reflecting the warmth of SPC Parquet. The **Neutral (Obsidian)** provides a deep, cinematic backdrop that allows product photography to "pop" with 3D intensity.

**Secondary (Off-White)** is used sparingly for high-contrast typography and delicate borders. **Charcoal Surface** is reserved for floating UI elements and cards, creating a subtle distinction from the background without losing the dark-mode immersion. **Gold Leaf** is an accent reserved for premium badges, price tags, and hover states to signify luxury.

## Typography

The typography strategy pairs expressive, bold Arabic-compatible display faces with highly legible, modern sans-serifs for technical data.

- **Headlines:** Use *Plus Jakarta Sans* (or its Arabic equivalent) for high-impact, editorial titles. These should be treated as graphic elements, often overlapping images or bleeding off the container edges.
- **Body:** *Be Vietnam Pro* provides a clean, contemporary feel that balances the weight of the headlines. It ensures that technical specifications of stone and flooring are readable.
- **Labels:** *IBM Plex Sans* is used for UI metadata, price points, and navigation, offering a structured, professional tone.

**RTL Note:** Increase line height by 10-15% for Arabic scripts to maintain breathing room between complex character descenders and ascenders.

## Layout & Spacing

This design system rejects the "dense grid" in favor of an **Asymmetric Editorial Layout**. Elements should feel like they have weight and gravity, with significant vertical breathing room (Section Gaps) to emphasize the premium nature of the products.

- **The Float Rule:** Content cards should rarely be flush with one another. Use varying Z-index offsets and staggered margins to create a "drifting" effect.
- **Grid:** While based on a 12-column system, elements often span 5 or 7 columns to create visual tension.
- **Mobile Adaptivity:** On mobile, the layout collapses into a single-column "Feed" where large-format imagery takes precedence over text, utilizing the full screen width to showcase textures.

## Elevation & Depth

Depth is the defining characteristic of this design system. It is achieved through **Tonal Layering** and **Directional Lighting.**

- **The Base:** Deepest black/charcoal (`#171412`).
- **Floating Cards:** Use a subtle gradient from `#2D2D2D` to a slightly lighter tint, combined with a **Backdrop Blur (20px)** and a 1px inner border of `#FFFFFF` at 10% opacity (the "Glass" edge).
- **Shadows:** Use large, soft ambient shadows. Instead of pure black shadows, use a tinted shadow (`rgba(0,0,0, 0.4)`) with a blur radius of 40px-60px to simulate elements hovering far above the surface.
- **Interactive Depth:** On hover, elements should "lift" closer to the viewer (increase scale by 2% and increase shadow spread).

## Shapes

The shape language reflects the high-end finishing of the products—precise but welcoming. 

- **Primary Surfaces:** Large cards and product containers use **1rem (16px) roundedness**, suggesting a softened architectural edge.
- **Secondary UI:** Buttons and input fields follow the same radius to maintain consistency.
- **Accent Elements:** Occasional use of full pill-shapes for "New Arrival" tags or category chips to provide a organic contrast to the structural grid.

## Components

### Buttons
Buttons are treated as "Architectural Blocks." Primary buttons feature a solid `Gold Leaf` or `Primary Sand` background with dark text. Secondary buttons are "Ghost" style with a glassmorphism blur and a 1px border.

### Product Cards
Cards do not have visible borders. They rely on the `Charcoal Surface` and `Deep Shadows` for definition. Product images within cards should feature a "Floating" shadow, making the stone or parquet sample appear to sit *on top* of the card.

### Filter Chips
Pill-shaped with a dark glass background. When active, they glow with a subtle primary-colored outer shadow.

### Input Fields
Fields are minimalist—just a bottom border of 2px that glows gold when focused. Backgrounds are semi-transparent charcoal to maintain the dark-mode aesthetic.

### Gallery View
Unlike a standard shop, the product gallery uses a "Masonry" or "Staggered" layout where vertical and horizontal items mix, mirroring the way stone slabs are displayed in a physical showroom.