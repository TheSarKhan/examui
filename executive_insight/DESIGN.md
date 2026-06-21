---
name: Executive Insight
colors:
  surface: '#fbf8fc'
  surface-dim: '#dbd9dc'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#efedf0'
  surface-container-high: '#e9e7eb'
  surface-container-highest: '#e4e2e5'
  on-surface: '#1b1b1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#303033'
  inverse-on-surface: '#f2f0f3'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4e5e81'
  primary: '#031635'
  on-primary: '#ffffff'
  primary-container: '#1a2b4b'
  on-primary-container: '#8293b8'
  inverse-primary: '#b6c6ef'
  secondary: '#006492'
  on-secondary: '#ffffff'
  secondary-container: '#58bcfd'
  on-secondary-container: '#004a6d'
  tertiary: '#231400'
  on-tertiary: '#ffffff'
  tertiary-container: '#3e2700'
  on-tertiary-container: '#b08d5b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#b6c6ef'
  on-primary-fixed: '#081b3a'
  on-primary-fixed-variant: '#364768'
  secondary-fixed: '#cae6ff'
  secondary-fixed-dim: '#8ccdff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004b6f'
  tertiary-fixed: '#ffddb1'
  tertiary-fixed-dim: '#e8c08a'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#5d4217'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e2e5'
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
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  sidebar-width: 280px
---

## Brand & Style

This design system is built for a high-stakes Corporate Assessment Platform where clarity, authority, and reliability are paramount. The brand personality is **composed, analytical, and professional**, designed to instill confidence in stakeholders while remaining approachable for daily users.

The visual direction follows a **Corporate Modern** aesthetic. It prioritizes information density without clutter, utilizing generous white space and a structured grid to manage complex data. The interface avoids unnecessary decorative elements, instead using subtle depth and precise typography to guide the user’s eye through the assessment workflow. It is a tool of precision, balancing the weight of enterprise software with the fluidity of modern SaaS.

## Colors

The palette is anchored by **Deep Corporate Blue**, providing a foundation of stability and authority. **Professional Teal** is used strategically for primary actions and focused accents, creating a vibrant contrast that feels modern and energetic.

- **Primary (#1A2B4B):** Used for navigation backgrounds, primary headers, and foundational UI elements.
- **Secondary (#2D9CDB):** Reserved for call-to-actions, active states, and highlighting key progress metrics.
- **Functional Colors:** Success, Warning, and Error colors are slightly desaturated to maintain the professional tone while ensuring critical status information is immediately recognizable.
- **Neutral Scale:** A slate-based neutral palette ensures that grey elements feel cohesive with the blue primary tones, avoiding "dead" greys.
- **Dark Mode:** In dark mode, the background shifts to a deep navy-slate (#0F172A), with surface containers using subtle lighters tints to maintain depth.

## Typography

**Inter** is the sole typeface, chosen for its exceptional legibility in data-heavy environments and its neutral, systematic character. 

The type hierarchy is strictly enforced to ensure complex assessment forms and reports remain readable. **Display** and **Headline** roles use a tighter letter-spacing and heavier weights to command attention. **Body** text uses a standard weight for maximum readability over long periods. **Labels** utilize a slightly heavier weight and uppercase styling for small-scale metadata, ensuring categorization is clear even at 12px.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for the main content area, paired with a **fixed left-hand navigation sidebar**. 

- **Desktop:** The content area is centered with a max-width of 1440px to prevent line lengths from becoming unreadable on ultra-wide monitors. Gutters are fixed at 24px.
- **Tablet:** The sidebar collapses into an icon-only rail or a hidden drawer to maximize the assessment workspace. 
- **Mobile:** The layout reflows to a single column with 16px side margins. 

Spacing follows a strict 4px base unit. Internal card padding should default to `lg` (24px) to maintain the "generous whitespace" feel required for a sophisticated enterprise experience.

## Elevation & Depth

Visual hierarchy is achieved through a combination of **Tonal Layering** and **Ambient Shadows**.

1.  **Floor:** The main background uses the lightest neutral/blue tint.
2.  **Raised:** Cards and primary containers use white (or deep slate in dark mode) with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.05)).
3.  **Overlay:** Modals and dropdowns use a more pronounced shadow and a 1px border in a slightly darker neutral to ensure separation from the raised cards.

In Dark Mode, shadows are replaced by subtle inner-borders and slightly lighter surface fills to indicate elevation, as shadows are less effective on dark backgrounds.

## Shapes

The shape language is defined by a **Rounded** aesthetic (8px default). This provides a modern, approachable feel that softens the "coldness" often associated with corporate software.

- **Components:** Buttons, Input fields, and Cards all share the 8px (`0.5rem`) radius.
- **Large Elements:** Featured dashboards or hero cards may use `rounded-lg` (16px) to create a distinct visual focal point.
- **Interactive Elements:** Checkboxes use a smaller 4px radius to maintain a crisp, functional appearance.

## Components

### Buttons
- **Primary:** Solid Teal background with white text. High contrast, 8px radius.
- **Secondary:** Transparent background with a Corporate Blue border and text.
- **Ghost:** No border or background; text-only until hover. Used for tertiary actions.

### Cards
Cards are the primary container for assessment data. They must feature a white background, the 8px radius, and the ambient shadow defined in Elevation. Headers within cards should have a subtle bottom border (1px) to separate metadata from content.

### Inputs & Form Fields
Fields use a 1px border (#CBD5E1) that shifts to Teal on focus. Labels sit clearly above the input in `label-md` style. Error states use a red border and a small helper text below.

### Navigation Sidebar
The sidebar uses the Primary Deep Blue (#1A2B4B) background. Active states are indicated by a teal vertical bar on the left edge and a subtle highlight behind the menu text. Icons should be line-art style for a clean, professional look.

### Data Visualization
Charts should utilize the primary color scale (Teal and Blue) for single-data series, and an extended palette of Success Green and Warning Orange for comparative metrics. Grid lines in charts must be extremely subtle (neutral-100).