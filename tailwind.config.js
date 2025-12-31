/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    // Explicitly defining colors to match the Golden Anchor system
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
    // The strict six-step scale from Tiara Brand Guide
    spacing: {
      '0': '0',
      'px': '1px',
      '1': '0.25rem',   
      '1.5': '0.375rem', 
      '2': '0.5rem',    
      '3': '0.75rem',   
      '4': '1rem',      
      '6': '1.5rem',    
      '8': '2rem',
      '12': '3rem',     
      '16': '4rem',
      '24': '6rem',     
      'full': '100%',
      'screen': '100vh',
    },
    // Placing fontFamily at top level to ensure absolute control
    fontFamily: {
      sans: ['"Inter Display"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    extend: {
      borderRadius: {
        'sm': '0.25rem', 
        'DEFAULT': '1rem', 
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
