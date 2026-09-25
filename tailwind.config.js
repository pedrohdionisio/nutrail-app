/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      lime: {
        400: '#E8FB86',
        500: '#BEF264',
        600: '#A2E635',
        700: '#64A30D',
        800: '#1A2E05',
        900: '#022C22'
      },
      support: {
        ambar: '#FFFF00',
        green: '#10B981',
        orange: '#F4A462',
        red: '#EF4444',
        teal: '#2A9D90',
        tomato: '#E76E50',
        yellow: '#E8C468'
      },
      gray: {
        100: '#FAFAFA',
        200: '#F4F4F5',
        300: '#F3F4F6',
        400: '#E4E4E7',
        500: '#D9D9D9',
        600: '#A1A1AA',
        700: '#71717A'
      },
      black: {
        600: '#1E293B',
        700: '#18181B',
        800: '#09090B',
        900: '#000000'
      }
    },
    extend: {
      spacing: {
        13: '52px'
      },
      fontFamily: {
        'host-grotesk-regular': ['HostGrotesk_400Regular'],
        'host-grotesk-medium': ['HostGrotesk_500Medium'],
        'host-grotesk-semibold': ['HostGrotesk_600SemiBold']
      },
      fontSize: {
        caption: ['16px', { lineHeight: '16px', letterSpacing: '1.28px' }],
        'title-1': ['32px', { lineHeight: '32px', letterSpacing: '-0.32px' }],
        'title-2': ['16px', { lineHeight: '24px' }],
        'body-xl': ['20px', { lineHeight: '24px' }],
        body: ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'body-xs': ['12px', { lineHeight: '12px' }]
      }
    }
  },
  plugins: []
};
