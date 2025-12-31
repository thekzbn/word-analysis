/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      purity: 'var(--purity)',
      serenity: 'var(--serenity)',
      depth: 'var(--depth)',
      radiance: 'var(--radiance)',
      heritage: 'var(--heritage)',
      void: '#121212',
      white: '#ffffff',
      black: '#000000',
    },
    fontFamily: {
      sans: ['"Inter Variable"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI Variable Display"', '"Segoe UI"', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    // The strict six-step scale from Tiara Brand Guide
    spacing: {
      '0': '0',
      'px': '1px',
      '1': '0.25rem', // Tiny inline gaps
      '2': '0.5rem',  // Button padding
      '3': '0.75rem', // Standard component padding / Text gaps
      '4': '1rem',    // Medium groups / Inter-card gap
      '6': '1.5rem',  // Major section breaks / Container padding
      '8': '2rem',
      '12': '3rem',   // Hero to content
      '16': '4rem',
      '24': '6rem',   // Big padding
      'full': '100%',
      'screen': '100vh',
    },
    extend: {
      borderRadius: {
        'sm': '0.25rem', // Small UI elements
        'DEFAULT': '1rem', // Main cards
        'none': '0',
      },
      maxWidth: {
        'readable': '42.5rem', 
      },
      transitionTimingFunction: {
        'tiara': 'cubic-bezier(0.57, -0.01, 0.21, 0.89)',
      },
      transitionDuration: {
        'DEFAULT': '500ms',
      },
      letterSpacing: {
        'tight': '-0.02em',
      },
      fontSize: {
        'caption': ['0.875rem', { lineHeight: '1.25rem' }],
      }
    },
  },
  plugins: [],
}
