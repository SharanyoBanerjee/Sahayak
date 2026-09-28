/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper:   '#F3EEE4', // page background
        card:    '#FAF7F0', // card surface
        wash:    '#E9E2D3', // subtle fills, zebra stripes
        rule:    '#CFC5B3', // hairline borders
        mute:    '#857A6A', // secondary text
        'ink-2': '#4A4036', // body text
        ink:     '#241E18', // headings, primary buttons
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans:  ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono:  ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        lift: '0 1px 0 #CFC5B3, 0 8px 20px -14px rgba(36, 30, 24, 0.35)',
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '6px',
      },
      letterSpacing: {
        label: '0.08em',
      },
    },
  },
  plugins: [],
}
