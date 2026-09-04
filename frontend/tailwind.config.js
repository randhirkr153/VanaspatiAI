/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#063B22',
          50: '#F0F9F4',
          100: '#DCFCE7',
          700: '#0F5432',
          800: '#0B472A',
          900: '#063B22',
          950: '#032314',
        },
        plant: {
          primary: '#16A34A',
          bright: '#22C55E',
          light: '#DCFCE7',
          bg: '#F8FAF7',
          text: '#102A1B',
          accent: '#FACC15',
          orange: '#FF652F',
          orangeHover: '#E5531D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
