/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F8A4C",
        "primary-dark": "#0F4D2A",
        accent: "#F2A65A",
        info: "#356A96",
        warning: "#E24D3D",
        page: "#F7F5EE",
        surface: "#FFFFFF",
        body: "#1C2B22",
        muted: "#5B6B62",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
