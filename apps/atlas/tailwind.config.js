const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui-lib/src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'border-order-perfection',
    'border-order-power',
    'border-order-giants',
    'border-order-titans',
    'border-order-skill',
    'border-order-perfection',
    'border-order-twins',
    'border-order-reflection',
    'border-order-detection',
    'border-order-fox',
    'border-order-vitriol',
    'border-order-brilliance',
    'border-order-enlightenment',
    'border-order-protection',
    'border-order-fury',
    'border-order-rage',
    'border-order-anger',
    'bg-order-perfection',
    'bg-order-power',
    'bg-order-giants',
    'bg-order-titans',
    'bg-order-skill',
    'bg-order-perfection',
    'bg-order-twins',
    'bg-order-reflection',
    'bg-order-detection',
    'bg-order-fox',
    'bg-order-vitriol',
    'bg-order-brilliance',
    'bg-order-enlightenment',
    'bg-order-protection',
    'bg-order-fury',
    'bg-order-rage',
    'bg-order-anger',

    'text-order-secondary-perfection',
    'text-order-secondary-power',
    'text-order-secondary-giants',
    'text-order-secondary-titans',
    'text-order-secondary-skill',
    'text-order-secondary-perfection',
    'text-order-secondary-twins',
    'text-order-secondary-reflection',
    'text-order-secondary-detection',
    'text-order-secondary-fox',
    'text-order-secondary-vitriol',
    'text-order-secondary-brilliance',
    'text-order-secondary-enlightenment',
    'text-order-secondary-protection',
    'text-order-secondary-fury',
    'text-order-secondary-rage',
    'text-order-secondary-anger',

    'text-[#838383]',
    'text-[#00DC82]',
    'text-[#2e82ff]',
    'text-[#c13cff]',
    'text-[#f8b73e]',
    'text-[#ff44b7]',
    'text-[#74787a]',
    'text-[#bd9e3a]',
    'text-[#515151]',
    'bg-[#838383]',
    'bg-[#00DC82]',
    'bg-[#2e82ff]',
    'bg-[#c13cff]',
    'bg-[#f8b73e]',
    'bg-[#ff44b7]',
    'bg-[#74787a]',
    'bg-[#bd9e3a]',
    'bg-[#515151]',
    'bg-[#3D3D3D]',
    'space-x-16',
    'border-b-4',
    'border-transparent',
    'bg-hero',
    'bg-bank',
    'bg-realm',
    'bg-crypt',
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
        lords: ['Lords', 'serif'],
      },
      zIndex: {
        50: '50',
        100: '100',
      },
      backgroundImage: {
        texture: "url('/texture-button.png')",
        hero: "linear-gradient(0deg, rgba(184,184,184,0.75), rgba(184,184,184,0.75)), url('/cover.jpg')",
        bank: "linear-gradient(0deg, rgba(184,184,184,0.75), rgba(184,184,184,0.75)), url('/bank.jpg')",
        realm:
          "linear-gradient(0deg, rgba(184,184,184,0.75), rgba(184,184,184,0.75)), url('/realm.jpg')",
        crypt:
          "linear-gradient(0deg, rgba(184,184,184,0.75), rgba(184,184,184,0.75)), url('/crypt.jpg')",
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
          600: '#757575',
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
        'order-secondary': {
          power: '#fff',
          giants: '#fff',
          titans: '#fff',
          skill: '#fff',
          perfection: '#fff',
          twins: '#fff',
          reflection: '#fff',
          detection: '#fff',
          fox: '#fff',
          vitriol: '#fff',
          brilliance: '#007238',
          enlightenment: '#fff',
          protection: '#fff',
          fury: '#fff',
          rage: '#fff',
          anger: '#fff',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#616161',
            h1: {
              color: '#616161',
            },
            h2: {
              color: '#616161',
            },
            h3: {
              color: '#616161',
            },
            h4: {
              color: '#616161',
            },
            button: {
              color: '#74787a',
              '&:hover': {
                color: '#2e82ff',
              },
            },
            strong: {
              color: '#74787a',
            },
          },
        },
      },
    },
  },
  plugins: [
    'tailwindcss',
    'autoprefixer',
    'postcss-100vh-fix',
    require('@tailwindcss/typography'),

    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',

          params: 'url-prefix()',
        });

        isFirefoxRule.append(container.nodes);

        container.append(isFirefoxRule);

        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
};
