/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#19376D',
          50: '#E8EDF5',
          100: '#D1DAEA',
          200: '#A3B5D5',
          300: '#7590C0',
          400: '#476BAA',
          500: '#19376D',
          600: '#142C58',
          700: '#0F2144',
          800: '#0A1730',
          900: '#050C1C',
        },
        cream: {
          DEFAULT: '#F8F3EA',
          50: '#FDFBF7',
          100: '#F8F3EA',
          200: '#F2EADB',
        },
        beige: {
          DEFAULT: '#EADBC8',
          100: '#EADBC8',
        },
        sand: {
          DEFAULT: '#DCC5A5',
          100: '#DCC5A5',
          200: '#CDB388',
        },
        border: {
          DEFAULT: '#E7E0D7',
          soft: '#E7E0D7',
        },
        ink: {
          DEFAULT: '#1B1B1B',
          soft: '#6B7280',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(25,55,109,0.04), 0 4px 16px rgba(25,55,109,0.06)',
        card: '0 2px 8px rgba(25,55,109,0.05), 0 12px 32px rgba(25,55,109,0.08)',
        lift: '0 8px 24px rgba(25,55,109,0.12), 0 24px 56px rgba(25,55,109,0.16)',
        glow: '0 0 0 1px rgba(25,55,109,0.08), 0 8px 32px rgba(25,55,109,0.18)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.6)',
      },
      backgroundImage: {
        'cream-beige': 'linear-gradient(135deg, #F8F3EA 0%, #EADBC8 100%)',
        'navy-fade': 'linear-gradient(180deg, rgba(25,55,109,0.06) 0%, rgba(25,55,109,0) 100%)',
        'sand-cream': 'linear-gradient(135deg, #DCC5A5 0%, #F8F3EA 100%)',
        'navy-radial': 'radial-gradient(circle at top, rgba(25,55,109,0.12), transparent 60%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '33%': { transform: 'translate(30px,-20px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px,20px) rotate(240deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        shimmer: 'shimmer 2s infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        aurora: 'aurora 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
