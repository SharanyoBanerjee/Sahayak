/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper:   '#F5F0E8',
        card:    '#FFFFFF',
        wash:    '#EDE8DC',
        rule:    '#D4CFC3',
        mute:    '#7A7A6C',
        'ink-2': '#2D3A2E',
        ink:     '#1B4332',
        accent:  '#2D6A4F',
        'accent-light': '#D4E7D0',
        cream:   '#F5F0E8',
        forest:  '#1B4332',
        'forest-light': '#2D6A4F',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:  ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)',
        lift: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      letterSpacing: {
        label: '0.08em',
      },
    },
  },
  plugins: [],
}
