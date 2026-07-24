---
name: Civic Pulse
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#3f4944'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#6f7a74'
  outline-variant: '#bec9c3'
  surface-tint: '#086b53'
  primary: '#005440'
  on-primary: '#ffffff'
  primary-container: '#0f6e56'
  on-primary-container: '#9aedcf'
  inverse-primary: '#84d6b9'
  secondary: '#5049c8'
  on-secondary: '#ffffff'
  secondary-container: '#6a63e3'
  on-secondary-container: '#fffbff'
  tertiary: '#832c0e'
  on-tertiary: '#ffffff'
  tertiary-container: '#a34324'
  on-tertiary-container: '#ffd3c6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a0f3d4'
  primary-fixed-dim: '#84d6b9'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#00513e'
  secondary-fixed: '#e3dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#100069'
  on-secondary-fixed-variant: '#3a30b2'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59e'
  on-tertiary-fixed: '#3a0b00'
  on-tertiary-fixed-variant: '#802a0b'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The design system is built on the pillars of transparency, civic duty, and operational efficiency. It bridges the gap between community members and municipal staff, necessitating a visual language that is both approachable for citizens and rigorous for administrators.

The chosen style is **Corporate Modern with a Soft Edge**. It leverages high-density information layouts common in SaaS, but softens the technical "coldness" with generous whitespace, organic rounded corners, and a nature-inspired primary palette. This creates an environment that feels official yet responsive, moving away from the "gray" reputation of traditional government software toward a modern, high-performance utility.

## Colors

This design system utilizes a purposeful color split to distinguish user contexts. **Fresh Green** is the primary driver for citizen-facing actions, symbolizing growth and cleanliness. **Deep Indigo** is reserved for administrative and logistical interfaces, conveying authority and data-driven stability.

**Warm Coral** serves a dual purpose as an accent for urgent alerts and a status indicator for "Pending" or "In-Progress" items. To maintain a clean, civic feel, these colors are set against an **Off-White (#FAFAFA)** background to reduce eye strain during long periods of use, while UI components reside on pure white surfaces to create subtle, natural contrast.

## Typography

The design system utilizes **Inter** for its exceptional legibility in both data-heavy tables and mobile reporting forms. The type scale emphasizes a clear hierarchy:

- **Headlines:** Use a tighter letter-spacing and semi-bold weights to anchor page sections.
- **Body Copy:** Set with generous line height (1.5x) to ensure reports and instructions remain readable in outdoor lighting conditions.
- **Labels:** Small, uppercase labels are used for status badges and metadata categories to distinguish them clearly from interactive body text.

## Layout & Spacing

The layout philosophy follows a **Fluid-Fixed Hybrid**. On desktop, administrative dashboards use a 12-column fluid grid with 24px gutters to maximize data density. On mobile, the system shifts to a single-column layout with 20px safe margins to prevent accidental taps near the bezel.

Spacing follows a 4px base unit. For mobile reporting tools, the design system mandates a minimum tap target height of 48px for all interactive elements, with 16px (md) padding between vertical form fields to ensure accessibility for users in the field.

## Elevation & Depth

To maintain a clean and trustworthy aesthetic, this design system avoids heavy shadows. Instead, it uses **Ambient Shadows** and **Tonal Layers**:

- **Level 1 (Cards):** A very soft, 12% opacity shadow with an 8px blur, tinted with the Primary color (Green) for citizen items or Secondary (Indigo) for admin items.
- **Level 2 (Modals/Floating Action Buttons):** A more pronounced 16px blur with 15% opacity to indicate direct interactivity.
- **Depth via Border:** For form inputs and inactive cards, a subtle 1px stroke (#E2E8F0) is used instead of a shadow to keep the UI feeling flat and organized.

## Shapes

The shape language is defined by **Rounded (2)** geometry. Standard containers like cards and input fields use a 12px (`0.5rem`) radius to evoke friendliness. Larger interactive components like "Report Waste" buttons or primary dashboard modules use 16px (`1rem`) to feel distinct and modern. 

Status badges and tags utilize a fully rounded "pill" shape to contrast against the more structural rectangularity of the cards and forms.

## Components

### Buttons & Controls
- **Primary Citizen Button:** Solid Fresh Green with white text; 12px radius; 48px height minimum.
- **Primary Admin Button:** Solid Deep Indigo; used exclusively for management actions like "Assign Task."
- **Ghost Buttons:** 1px stroke in Primary or Secondary color; used for secondary actions like "Cancel" or "View Details."

### Form Inputs
- Fields must feature high-contrast 1px borders. 
- **Active State:** Border color shifts to Primary color with a 2px outer glow.
- **Labels:** Always persistent above the field (no floating labels) to maximize clarity for users in stressful or hurried situations.

### Status Badges
- **Pending:** Warm Coral background (15% opacity) with dark coral text.
- **Completed:** Fresh Green background (15% opacity) with dark green text.
- **High Priority:** Solid Warm Coral with white text.

### Data Cards
- Pure white background (#FFFFFF) with a 12px corner radius and a Level 1 ambient shadow.
- Content is structured with a header row (Status Badge + Date) followed by a body description and an optional map snippet or photo attachment.

### Interactive Maps
- Maps should use a "Light Grey" base style to ensure markers (Green/Indigo) remain the focal point.
- Marker clusters use the Primary color with a white stroke.