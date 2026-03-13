/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36aaf6',
          500: '#0c8ee7',
          600: '#006fc5',
          700: '#0158a0',
          800: '#064b84',
          900: '#0b3f6d',
        },
        xp: {
          gold: '#f59e0b',
          light: '#fef3c7',
        },
        success: {
          DEFAULT: '#22c55e',
          light: '#dcfce7',
        },
        danger: {
          DEFAULT: '#ef4444',
          light: '#fee2e2',
        },
        heart: '#f43f5e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'shake': 'shake 0.4s ease-in-out',
        'pulse-once': 'pulse 0.6s ease-in-out 1',
        'xp-pop': 'xpPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '70%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-5px)' },
          '80%': { transform: 'translateX(5px)' },
        },
        xpPop: {
          '0%': { transform: 'scale(0) translateY(0)', opacity: 1 },
          '60%': { transform: 'scale(1.2) translateY(-20px)', opacity: 1 },
          '100%': { transform: 'scale(1) translateY(-40px)', opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
