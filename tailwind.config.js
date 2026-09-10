/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'cfm-dark': '#1A3A2A',
        'cfm-mid': '#2C5F2D',
        'cfm-emerald': '#0A7F3C',
        'cfm-light': '#71BD43',
        'cfm-bg': '#F2F7F4',
        'cfm-success': '#16A34A',
        'cfm-amber': '#D97706',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        'pulse-border': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(45,138,94,0.5)' },
          '50%': { boxShadow: '0 0 0 16px rgba(45,138,94,0)' },
        },
        'flash-green': {
          '0%': { backgroundColor: 'rgba(22,163,74,0)' },
          '15%': { backgroundColor: 'rgba(22,163,74,0.95)' },
          '100%': { backgroundColor: 'rgba(22,163,74,0.95)' },
        },
        'flash-red': {
          '0%': { backgroundColor: 'rgba(220,38,38,0)' },
          '15%': { backgroundColor: 'rgba(220,38,38,0.95)' },
          '100%': { backgroundColor: 'rgba(220,38,38,0.95)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.4)', opacity: '0' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-border': 'pulse-border 1.6s ease-in-out infinite',
        'flash-green': 'flash-green 0.4s ease-out forwards',
        'flash-red': 'flash-red 0.4s ease-out forwards',
        'pop-in': 'pop-in 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.35s ease-out forwards',
      },
    },
  },
  plugins: [],
}
