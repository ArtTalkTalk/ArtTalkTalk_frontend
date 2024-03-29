import type { Config } from 'tailwindcss';

const createPxEntries = (size: number) => {
  return {
    0: '0',
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i}`]: `${i / 16}rem` };
    }),
  };
};

const PX_ENTRIES_10 = createPxEntries(10);
const PX_ENTRIES_100 = createPxEntries(100);
const PX_ENTRIES_1000 = createPxEntries(1000);

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderWidth: PX_ENTRIES_10,
    fontSize: PX_ENTRIES_100,
    // spacing values are inherited by the 'padding', 'margin', 'height', 'maxHeight', 'flex-basis', 'gap', 'inset', 'space', 'translate', 'scrollMargin', 'scrollPadding', and 'textIndent'.
    spacing: PX_ENTRIES_1000,
    fontWeight: {
      light: '300',
      DEFAULT: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    zIndex: {
      zero: '0',
      first: '10',
      second: '20',
      third: '30',
      beforeInfinite: '9980',
      infinite: '9990',
      toast: '9999', // Do not use!!
    },
    borderRadius: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      ml: '1.5rem',
      lg: '2rem', // 추후 수정 가능
      xl: '12.5rem',
      full: '9999px',
    },
    colors: {
      transparent: 'transparent',
      primary: {
        DEFAULT: 'var(--primary-400)',
        1: 'var(--primary-50)',
        2: 'var(--primary-100)',
        3: 'var(--primary-200)',
        4: 'var(--primary-300)',
        5: 'var(--primary-500)',
        6: 'var(--primary-600)',
        7: 'var(--primary-700)',
        8: 'var(--primary-800)',
        9: 'var(--primary-900)',
      },
      green: {
        DEFAULT: 'rgb(var(--green) / <alpha-value>)',
        light: 'rgb(var(--green-light) / <alpha-value>)',
      },
      purple: {
        DEFAULT: 'rgb(var(--purple) / <alpha-value>)',
        light: 'rgb(var(--purple-light) / <alpha-value>)',
      },
      orange: {
        DEFAULT: 'rgb(var(--orange) / <alpha-value>)',
        light: 'rgb(var(--orange-light) / <alpha-value>)',
      },
      blue: {
        DEFAULT: 'rgb(var(--blue) / <alpha-value>)',
        light: 'rgb(var(--blue-light) / <alpha-value>)',
        hoverLight: 'rgb(var(--blue-hover-light) / <alpha-value>)',
      },
      black: 'var(--black)',
      white: 'var(--white)',
      gray: {
        1: 'var(--gray-50)',
        2: 'var(--gray-100)',
        3: 'var(--gray-200)',
        4: 'var(--gray-300)',
        5: 'var(--gray-400)',
        6: 'var(--gray-500)',
        7: 'var(--gray-600)',
        8: 'var(--gray-700)',
        9: 'var(--gray-800)',
      },
    },
    screens: {
      sm: { max: '475px' },
      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }
    },
    extend: {
      height: {
        screen: '100dvh', //dvh를 애용합시다!
      },
      keyframes: {
        textLoop: {
          '0%': { '-webkit-transform': 'translate3d(0, 0, 0)', transform: 'translate3d(0, 0, 0)' },
          '100%': { '-webkit-transform': 'translate3d(-100%, 0, 0)', transform: 'translate3d(-100%, 0, 0)' },
        },
      },
      animation: {
        textLoop: 'textLoop 10s linear infinite',
      },
      boxShadow: {
        top: '0 -4px 6px -1px rgba(0, 0, 0, 0.18)',
      },
      backdropBlur: {
        'custom-blur': '2.5px',
      },
      gridTemplateRows: {
        '3/96': 'repeat(3, minmax(0, 96px))',
      },
    },
  },
  plugins: [],
};
export default config;
