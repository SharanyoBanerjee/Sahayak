/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#FFF8E7",
        card: "#FFFFFF",
        green: "#3DDC84",
        tomato: "#FF5A4E",
        sun: "#FFD23F",
        sky: "#6EC5FF",
        lilac: "#C7A6FF",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        brutal: '6px 6px 0 #111111',
        'brutal-hover': '9px 9px 0 #111111',
        'brutal-sm': '3px 3px 0 #111111',
        'brutal-lg': '8px 8px 0 #111111',
      },
      borderRadius: {
        brutal: '14px',
      },
    },
  },
  plugins: [],
}
