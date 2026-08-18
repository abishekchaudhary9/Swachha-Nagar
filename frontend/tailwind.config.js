/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // ── Design tokens from hello/ reference (styles.css @theme) ──────────
      colors: {
        // Surfaces
        surface:                    '#f9faf6',
        'surface-bright':           '#f9faf6',
        'surface-dim':              '#d9dad7',
        'surface-container-lowest': '#ffffff',
        'surface-container-low':    '#f3f4f0',
        'surface-container':        '#edeeea',
        'surface-container-high':   '#e7e9e5',
        'surface-container-highest':'#e2e3df',
        'surface-variant':          '#e2e3df',
        'on-surface':               '#1a1c1a',
        'on-surface-variant':       '#404945',
        'inverse-surface':          '#2e312f',
        'inverse-on-surface':       '#f0f1ed',

        // Outline
        outline:                    '#717975',
        'outline-variant':          '#c0c8c4',

        // Primary (deep green)
        'surface-tint':             '#3a675a',
        primary:                    '#00261e',
        'on-primary':               '#ffffff',
        'primary-container':        '#0b3d32',
        'on-primary-container':     '#79a899',
        'primary-fixed':            '#bceddc',
        'primary-fixed-dim':        '#a1d0c1',
        'on-primary-fixed':         '#002019',
        'on-primary-fixed-variant': '#204e43',
        'inverse-primary':          '#a1d0c1',

        // Secondary (neutral gray)
        secondary:                  '#5a605d',
        'on-secondary':             '#ffffff',
        'secondary-container':      '#dfe4e0',
        'on-secondary-container':   '#606663',
        'secondary-fixed':          '#dfe4e0',
        'secondary-fixed-dim':      '#c3c8c4',
        'on-secondary-fixed':       '#181d1b',
        'on-secondary-fixed-variant':'#434845',

        // Tertiary (mint)
        tertiary:                   '#00261b',
        'on-tertiary':              '#ffffff',
        'tertiary-container':       '#003e2e',
        'on-tertiary-container':    '#3cb18d',
        'tertiary-fixed':           '#87f7cf',
        'tertiary-fixed-dim':       '#6adab4',
        'on-tertiary-fixed':        '#002117',
        'on-tertiary-fixed-variant':'#00513d',

        // Error
        error:                      '#ba1a1a',
        'on-error':                 '#ffffff',
        'error-container':          '#ffdad6',
        'on-error-container':       '#93000a',

        // Background
        background:                 '#f9faf6',
        'on-background':            '#1a1c1a',
      },

      fontFamily: {
        'display-lg': ['Manrope', 'sans-serif'],
        'display-lg-mobile': ['Manrope', 'sans-serif'],
        'headline-md': ['Manrope', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        button: ['Inter', 'sans-serif'],
        'label-caps': ['JetBrains Mono', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display-lg':       ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg-mobile':['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-md':      ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'body-lg':          ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md':          ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'button':           ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'label-caps':       ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '500' }],
      },

      spacing: {
        base:         '4px',
        'stack-sm':   '8px',
        'stack-md':   '16px',
        'stack-lg':   '32px',
        gutter:       '24px',
        'margin-mobile': '16px',
        'margin-desktop':'40px',
      },

      maxWidth: {
        'container-max': '1280px',
      },

      borderRadius: {
        DEFAULT: '0.5rem',
        lg:      '0.5rem',
        xl:      '0.75rem',
      },
    },
  },
  plugins: [],
};
