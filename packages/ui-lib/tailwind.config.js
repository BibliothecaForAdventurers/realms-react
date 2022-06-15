const tailwindColors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * Return tailwind v3 non-deprecated colors
 * PS: code is dirty cause tailwind colors have getters on them
 *     that will log a warning when accessing the object key
 * @type {Record<string, string | Record<string, string>>}
 */
const tailwindV3Colors = Object.entries(
  Object.getOwnPropertyDescriptors(tailwindColors)
)
  .filter(
    ([, desc]) =>
      Object.prototype.hasOwnProperty.call(desc, 'value') &&
      typeof desc.value !== 'function'
  )
  .reduce((acc, [key]) => {
    if (
      !['coolGray', 'lightBlue', 'warmGray', 'trueGray', 'blueGray'].includes(
        key
      )
    ) {
      acc[key] = tailwindColors[key];
    }
    return acc;
  }, {});

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'text-[#838383]',
    'text-[#00DC82]',
    'text-[#2e82ff]',
    'text-[#c13cff]',
    'text-[#f8b73e]',
    'text-[#ff44b7]',
    'bg-[#838383]',
    'bg-[#00DC82]',
    'bg-[#2e82ff]',
    'bg-[#c13cff]',
    'bg-[#f8b73e]',
    'bg-[#ff44b7]',
  ],
  theme: {
    extend: {
      strokeWidth: {
        8: '8px',
      },
      letterSpacing: {
        veryWide: '0.165em',
      },
      fontFamily: {
        display: ['EB Garamond', 'serif'],
        body: ['Inconsolata', 'monospace'],
      },
      backgroundImage: {
        hero: "url('/cover.jpg')",
        texture:
          "linear-gradient(to right bottom, rgba('#7ed56f',0.8), rgba('#28b485',0.8)), url('/texture-button.png')",
        conic: 'conic-gradient(var(--tw-gradient-stops))',
        'conic-to-t': 'conic-gradient(at top, var(--tw-gradient-stops))',
        'conic-to-b': 'conic-gradient(at bottom, var(--tw-gradient-stops))',
        'conic-to-l': 'conic-gradient(at left, var(--tw-gradient-stops))',
        'conic-to-r': 'conic-gradient(at right, var(--tw-gradient-stops))',
        'conic-to-tl': 'conic-gradient(at top left, var(--tw-gradient-stops))',
        'conic-to-tr': 'conic-gradient(at top right, var(--tw-gradient-stops))',
        'conic-to-bl':
          'conic-gradient(at bottom left, var(--tw-gradient-stops))',
        'conic-to-br':
          'conic-gradient(at bottom right, var(--tw-gradient-stops))',
        radial: 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'radial-at-t':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        'radial-at-b':
          'radial-gradient(ellipse at bottom, var(--tw-gradient-stops))',
        'radial-at-l':
          'radial-gradient(ellipse at left, var(--tw-gradient-stops))',
        'radial-at-r':
          'radial-gradient(ellipse at right, var(--tw-gradient-stops))',
        'radial-at-tl':
          'radial-gradient(ellipse at top left, var(--tw-gradient-stops))',
        'radial-at-tr':
          'radial-gradient(ellipse at top right, var(--tw-gradient-stops))',
        'radial-at-bl':
          'radial-gradient(ellipse at bottom left, var(--tw-gradient-stops))',
        'radial-at-br':
          'radial-gradient(ellipse at bottom right, var(--tw-gradient-stops))',
      },
      colors: {
        gray: {
          100: '#edece9',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#676767',
          700: '#616161',
          800: '#424242',
          900: '#161619',
          1000: '#0e0e0e',
        },
        off: {
          100: '#F9F7F1',
          200: '#8D795B',
        },
        /* Crypts and Caverns color styles */
        desert: {
          /* Desert Oasis */ main: '#F3D899',
          door: '#00A29D',
          point: '#FAAA00',
        },
        temple: {
          /* Stone Temple */ main: '#967E67',
          door: '#006669',
          point: '#3C2A1A',
        },
        forest: {
          /* Forest Ruins */ main: '#2F590E',
          door: '#C55300',
          point: '#802F1A',
        },
        mountain: {
          /* Mountain Deep */ main: '#cf9479',
          door: '#FFA800',
          point: '#802F1A',
        },
        underwater: {
          /* Underwater Keeps */ main: '#006669',
          door: '#F9B569',
          point: '#967E67',
        },
        ember: {
          /* Ember's Glow */ main: '#5D0503',
          door: '#FF1800',
          point: '#B75700',
        },
        order: {
          power: '#F4B547',
          giants: '#EB544D',
          titans: '#EC68A8',
          skill: '#706DFF',
          perfection: '#8E35FF',
          twins: '#0020C6',
          reflection: '#00A2AA',
          detection: '#139757',
          fox: '#D47230',
          vitriol: '#59A509',
          brilliance: '#7DFFBA',
          enlightenment: '#1380FF',
          protection: '#00C3A1',
          fury: '#82005E',
          rage: '#C74800',
          anger: '#89192D',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
