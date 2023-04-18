/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slide-in 7s linear alternate forwards',
      },

      colors: {
        bordergray: '#BFBDBD',
        textgray: ' #505050',
      },

      fontFamily: {
        dmsans: 'DM Sans, sans-serif',
      },

      keyframes: {
        'slide-in': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },

          ' 1%': {
            transform: 'translateY(0%)',
            opacity: 1,
          },

          '99%': {
            transform: 'translateY(0%)',
            opacity: 1,
          },

          '100%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
        },
        'loading-spin': {
          '0%': { strokeDashoffset: '306' },
          '50%': { strokeDasharray: '40, 134' },
          '100%': {
            strokeDasharray: '1, 174',
            strokeDashoffset: '132',
          },
        },
      },
    },
  },
  plugins: [],
};
