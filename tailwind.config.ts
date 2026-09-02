import type { Config } from 'tailwindcss';

/**
 * Tokens are mirrored as CSS custom properties in app/globals.css so that
 * light and dark mode swap without duplicating every utility. Tailwind reads
 * the variables; the variables are the single source of truth.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Fluid, clamp-based. Min is the mobile size, max the desktop size.
        'display-xl': ['clamp(3.25rem, 9.6vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.032em' }],
        'display-lg': ['clamp(2.25rem, 5.6vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3.4vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.375rem, 2.1vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.125rem, 1.6vw, 1.5rem)', { lineHeight: '1.45', letterSpacing: '-0.01em' }],
        body: ['clamp(0.9375rem, 1.05vw, 1.0625rem)', { lineHeight: '1.65' }],
        meta: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        metric: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
      },
      maxWidth: {
        measure: '62ch',
        'measure-sm': '48ch',
        shell: '96rem',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'clamp(4.5rem, 9vw, 9.5rem)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      zIndex: {
        nav: '40',
        overlay: '50',
        grain: '60',
      },
    },
  },
  plugins: [],
};

export default config;
