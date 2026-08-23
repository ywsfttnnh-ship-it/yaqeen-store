---
name: Timeless Architectural Elegance
colors:
  surface: '#fdf8f7'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f1'
  surface-container: '#f1edec'
  surface-container-high: '#ece7e6'
  surface-container-highest: '#e6e1e0'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4d4541'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#7f7570'
  outline-variant: '#d0c4be'
  surface-tint: '#635d5a'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1f1b19'
  on-primary-container: '#8a827f'
  inverse-primary: '#cec5c1'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eae1dd'
  primary-fixed-dim: '#cec5c1'
  on-primary-fixed: '#1f1b19'
  on-primary-fixed-variant: '#4b4643'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fdf8f7'
  on-background: '#1c1b1b'
  surface-variant: '#e6e1e0'
  oak-warm: '#8D6E52'
  stone-gray: '#4A4A4A'
  linen-beige: '#F5F2ED'
  marble-white: '#FDFDFD'
  ash-charcoal: '#2D2D2D'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  section-title:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  price-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
  component-padding-lg: 24px
  component-padding-sm: 12px
---

## Brand & Style

The design system is centered on the concepts of **Architectural Luxury** and **Material Integrity**. It targets a sophisticated audience of homeowners, interior designers, and architects who value durability as much as aesthetic refinement. The UI must evoke a sense of calm, permanence, and professional expertise.

The visual direction follows a **Modern Minimalism** approach with **Tactile/Skeuomorphic** accents. While the interface remains clean and spacious, it uses subtle textures and depth to mimic the physical properties of luxury flooring and wall coverings—stone, wood, and marble. The layout is unapologetically high-end, favoring editorial-style compositions over standard e-commerce density. Every interaction should feel deliberate, smooth, and premium.

## Colors

The palette is derived from natural, raw materials used in high-end construction.

- **Primary (Dark Chocolate/Near-Black):** Used for typography and structural elements to provide a grounded, authoritative feel.
- **Secondary (Subtle Gold):** Reserved for accenting excellence—logos, price highlights, and premium badges. It is a metallic, muted gold rather than a bright yellow.
- **Neutral/Background:** A sophisticated "Linen Beige" replaces harsh whites to create a softer, more luxurious canvas.
- **Named Material Colors:** These are used for semantic categorization of products. "Oak Warm" for wood collections, "Stone Gray" for masonry, and "Ash Charcoal" for slate and modern industrial finishes.

The overall tone is low-chroma and high-contrast, ensuring that product photography—the hero of the experience—stands out vividly against the neutral environment.

## Typography

This design system utilizes a multi-font strategy to balance modern tech with humanist warmth. 

1.  **Headlines (Plus Jakarta Sans):** Chosen for its clean, geometric but approachable character. It provides the "premium" feel required for large display text.
2.  **Body (Be Vietnam Pro):** Offers exceptional readability for descriptions and technical specifications. It feels contemporary and efficient.
3.  **Labels (IBM Plex Sans):** Used for technical metadata (dimensions, SKU codes) to provide a structured, engineering-led aesthetic.

**RTL Considerations:** When rendered in Arabic, the system should use high-quality Naskh-based variants of these styles to maintain the same weight and optical balance. Headlines should feel "weighted" and prestigious, while body text must maintain generous line-height (minimum 1.6) to accommodate Arabic script descenders.

## Layout & Spacing

The layout philosophy is based on a **Fixed Grid with Generous Whitespace**. 

- **Desktop:** A 12-column grid with wide 32px gutters. Margins are intentionally large (64px) to frame the content like a high-end magazine.
- **Sectioning:** A vertical "Section Gap" of 120px is used to separate distinct product categories, ensuring the user is never overwhelmed by too many choices at once.
- **Rhythm:** Elements follow an 8px base unit for internal component spacing, but larger layout moves use 24px and 48px increments to maintain a sense of "breathability."
- **RTL Flow:** The layout mirrors perfectly for Arabic, with a right-to-left priority for navigation, breadcrumbs, and product details.

## Elevation & Depth

To reflect the physical nature of flooring and stone, depth is conveyed through **Tonal Layers** and **Ambient Shadows**.

- **Surface Levels:** 
    - *Level 0 (Background):* Linen Beige.
    - *Level 1 (Cards/Inputs):* Marble White with a 1px border in a slightly darker beige (#E8E4DE).
- **Shadows:** Use extremely soft, long-range shadows to imply that objects are resting naturally on a surface. Avoid heavy black shadows; use a "tinted shadow" approach (e.g., a dark brown tint with 4% opacity).
- **Interactions:** Upon hover, product cards should lift slightly (elevation increase) and the border-color should shift to the subtle gold accent.

## Shapes

The shape language is **Structured and Soft**. 

A roundedness of `1` (0.25rem - 0.75rem) is selected. This choice reflects the "softened edges" of high-quality finished stone and wood. Completely sharp edges (0px) feel too aggressive and industrial, while pill-shapes feel too casual. The "Soft" setting provides a professional, architectural precision that feels safe and modern. 

- **Primary Buttons:** Subtle 4px radius.
- **Product Images:** 8px radius to soften the high-contrast photography.
- **Badges:** 2px radius for a crisp, "tag-like" appearance.

## Components

### Buttons
- **Primary:** Solid "Primary Dark" background with "Marble White" text. No icons unless they are directional (arrows).
- **Secondary:** Outlined in "Primary Dark" with 1px thickness.
- **Call to Action (WhatsApp):** Uses a sophisticated dark-green variant or the "Primary Dark" with a WhatsApp icon in gold, avoiding the standard bright green to maintain the luxury feel.

### Product Cards
Cards are the heart of the system. They feature:
- Large-format imagery with an aspect ratio of 4:5.
- Technical specs (e.g., 1220×180mm) shown in "Label-Caps" typography at the top.
- Floating "New" or "Bestseller" badges in the top-right (RTL).
- Price displayed in the Israeli Shekel (₪) using the "Price-Display" typographic style.

### Input Fields
Minimalist design with only a bottom border (2px) that transitions from beige to gold when focused. Labels stay above the input at all times in "Label-Caps".

### Navigation
A "Ghost" header that becomes semi-transparent "Marble White" on scroll. Top-level categories are spaced widely, using "Label-Caps" with a gold underline for the active state.

### Lists & Features
Technical features (e.g., "Water Resistant," "25 Year Warranty") are presented with custom-drawn, thin-stroke monochromatic icons rather than generic emojis or stock icons.