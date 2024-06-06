// tailwind.config.js

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage:  {
        'gradient-red': 'linear-gradient(to right, rgba(97, 28, 21, 1), rgba(225, 42, 24, 1))',
      },
      colors: {
        bgColorRed: 'var(--bg-color-red)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
};

export default config;
