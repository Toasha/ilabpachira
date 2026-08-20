/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pachira: {
          50: '#f4f9f2',
          100: '#e5f2e1',
          200: '#cee5c6',
          300: '#b5db9f',
          400: '#9ac681', // テーマカラー
          500: '#7fae64',
          600: '#628e4b',
          700: '#4c6f3b',
          800: '#3d5930',
          900: '#334929',
          bg: '#e9f2e6',
          darkShadow: '#b8cbb3',
          lightShadow: '#ffffff',
          text: '#2c3e29',
          textMuted: '#687d64'
        }
      },
      boxShadow: {
        'neu-flat': '8px 8px 16px #b8cbb3, -8px -8px 16px #ffffff',
        'neu-flat-sm': '4px 4px 10px #b8cbb3, -4px -4px 10px #ffffff',
        'neu-pressed': 'inset 4px 4px 8px #b8cbb3, inset -4px -4px 8px #ffffff',
        'neu-pressed-deep': 'inset 6px 6px 12px #a4b79f, inset -6px -6px 12px #ffffff',
        'neu-green-flat': '6px 6px 14px #7a9e66, -6px -6px 14px #baee9c',
        'neu-green-pressed': 'inset 4px 4px 8px #6f905c, inset -4px -4px 8px #c5fc9e',
      },
      fontFamily: {
        sans: ['"Outfit"', '"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
