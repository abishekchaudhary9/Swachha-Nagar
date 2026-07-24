/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [

    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    // ── Design token overrides from DESIGN.md ─────────────────────────────
    extend: {
      colors: {
        // Surface scale
        surface:                    '#f9f9f9',
        'surface-dim':              '#dadada',
        'surface-bright':           '#f9f9f9',
        'surface-container-lowest': '#ffffff',
        'surface-container-low':    '#f3f3f3',
        'surface-container':        '#eeeeee',
        'surface-container-high':   '#e8e8e8',
        'surface-container-highest':'#e2e2e2',
        'on-surface':               '#1a1c1c',
        'on-surface-variant':       '#3f4944',
        'inverse-surface':          '#2f3131',
        'inverse-on-surface':       '#f0f1f1',

        // Outline
        outline:                    '#6f7a74',
        'outline-variant':          '#bec9c3',

        // Primary (Fresh Green — citizen-facing)
        'surface-tint':             '#086b53',
        primary:                    '#005440',
        'on-primary':               '#ffffff',
        'primary-container':        '#0f6e56',
        'on-primary-container':     '#9aedcf',
        'inverse-primary':          '#84d6b9',
        'primary-fixed':            '#a0f3d4',
        'primary-fixed-dim':        '#84d6b9',
        'on-primary-fixed':         '#002117',
        'on-primary-fixed-variant': '#00513e',

        // Secondary (Deep Indigo — staff/admin-facing)
        secondary:                  '#5049c8',
        'on-secondary':             '#ffffff',
        'secondary-container':      '#6a63e3',
        'on-secondary-container':   '#fffbff',
        'secondary-fixed':          '#e3dfff',
        'secondary-fixed-dim':      '#c3c0ff',
        'on-secondary-fixed':       '#100069',
        'on-secondary-fixed-variant':'#3a30b2',

        // Tertiary (Warm Coral — urgent/pending)
        tertiary:                   '#832c0e',
        'on-tertiary':              '#ffffff',
        'tertiary-container':       '#a34324',
        'on-tertiary-container':    '#ffd3c6',
        'tertiary-fixed':           '#ffdbd0',
        'tertiary-fixed-dim':       '#ffb59e',
        'on-tertiary-fixed':        '#3a0b00',
        'on-tertiary-fixed-variant':'#802a0b',

        // Error
        error:                      '#ba1a1a',
        'on-error':                 '#ffffff',
        'error-container':          '#ffdad6',
        'on-error-container':       '#93000a',

        // Background / variant
        background:                 '#f9f9f9',
        'on-background':            '#1a1c1c',
        'surface-variant':          '#e2e2e2',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Typography tokens from DESIGN.md
        'display-lg':   ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg':  ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg-mobile': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'headline-md':  ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg':      ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md':      ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md':     ['14px', { lineHeight: '20px', letterSpacing: '0.01em', fontWeight: '500' }],
        'label-sm':     ['12px', { lineHeight: '16px', fontWeight: '600' }],
      },

      spacing: {
        // 4px base unit system from DESIGN.md
        xs:  '4px',
        sm:  '8px',
        md:  '16px',
        lg:  '24px',
        xl:  '32px',
        'container-margin': '20px',
        gutter: '16px',
      },

      borderRadius: {
        // Shape tokens from DESIGN.md
        sm:      '0.25rem',  // 4px
        DEFAULT: '0.5rem',   // 8px — "DEFAULT"
        md:      '0.75rem',  // 12px — standard cards/inputs
        lg:      '1rem',     // 16px — primary buttons / dashboard modules
        xl:      '1.5rem',   // 24px
        full:    '9999px',   // pill badges
      },

      boxShadow: {
        // Elevation tokens from DESIGN.md
        // Level 1 — Cards (8px blur, 12% opacity, tinted)
        'card-citizen': '0 2px 8px 0 rgba(0,84,64,0.12)',
        'card-admin':   '0 2px 8px 0 rgba(80,73,200,0.12)',
        // Level 2 — Modals / FABs (16px blur, 15% opacity)
        modal:          '0 4px 16px 0 rgba(0,0,0,0.15)',
      },

      minHeight: {
        tap: '48px',   // Minimum tap target per DESIGN.md accessibility rule
      },
    },
  },
  plugins: [],
};
