// tailwind.config.js

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: 
    {zIndex: {
      '100': '100',
    },
    animation: {
      tilt: 'pulse  0.6s linear infinite'
    },
    keyframes: {
      tilt: {
        '0%, 50%, 75%': { transform: 'rotate(0deg)' },
        '50%': { transform: 'scale(5.5rem)' },
        '75%': { transform: 'scaleY(.5)'},
}
},
      backgroundImage:  {
        'gradient-red': 'linear-gradient(to right, rgba(97, 28, 21, 1), rgba(225, 42, 24, 1))',
      },
      colors: {
        
        myred: {
          light: '#AF4444',
          default: '#AF0707',
          dark: '#03045e',
        },
        mywhite: {
          light: '#FFFFFF',
          default: '#F2F2F2',
        },
        myblack:{
          dafault: '#252525',
        }
        
        // Добавьте другие цвета по вашему выбору
      },
    },
  },
  plugins: [require('daisyui'),require('tailwindcss-textshadow')],
  daisyui: {
    themes: ['light'],
  },
};

export default config;
