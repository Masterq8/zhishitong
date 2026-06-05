/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#367BFF',
          light: '#5B8CFF',
          hover: '#2554D9',
        },
        accent: {
          purple: '#7B5CFF',
          green: '#39C589',
          amber: '#FFB86C',
        },
        bg: {
          DEFAULT: '#F8FBFF',
          light: '#F4F8FF',
          lighter: '#EEF6FF',
          cardBlue: '#F0F6FF',
          cardPurple: '#F7F3FF',
          cardGreen: '#F1FBF7',
          cardOrange: '#FFF7F0',
        },
        glass: {
          border: 'rgba(54, 123, 255, 0.12)',
          bg: 'rgba(255, 255, 255, 0.65)',
          shadow: 'rgba(54, 123, 255, 0.06)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'glass': '24px',
        'card': '14px',
      },
      boxShadow: {
        'glass': '0 4px 24px rgba(54, 123, 255, 0.06), 0 1px 4px rgba(54, 123, 255, 0.04)',
        'glass-lg': '0 8px 40px rgba(54, 123, 255, 0.08), 0 2px 8px rgba(54, 123, 255, 0.04)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
      },
      spacing: {
        'page': '80px',     // page horizontal margin
        'section': '36px',  // vertical section gap
        'card-gap': '24px', // gap between cards
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
