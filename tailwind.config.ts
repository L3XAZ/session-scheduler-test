import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        kaisei: ['var(--font-kaisei)'],
      },

      colors: {
        brand: {
          primary: '#E28F11',
          secondary: '#AA580D',
          mobile: '#F29B18',
          dark: '#944700',

          accentFill: '#AD5707',
          accentStroke: '#FFAD32',

          black: '#16171B',
        },

        surface: {
          base: '#FFFFFF',
          subtle: '#F7F7FC',
          hover: '#F7F7FC',
          active: '#EEEAF7',
        },

        text: {
          primary: '#16171B',
          secondary: '#8F91A1',
          muted: '#C0C1D1',
          white: '#FFFFFF',
        },

        accent: {
          light: '#FFEFF2',
          DEFAULT: '#F598A5',
          dark: '#F14C6E',
        },

        state: {
          selectedBg: '#F7F7FC',
          selectedBorder: '#E2D9F3',
          selectedText: '#DE3A6B',
        },

        border: {
          base: '#E8EBF4',
          subtle: '#E8EBF4',
          default: '#D6D9E7',
          header: 'rgba(255,255,255,0.4)',
        },
      },

      borderRadius: {
        card: '16px',
        sheet: '24px',
        pill: '100px',
        sm: '8px',
      },

      boxShadow: {
        card: '0 20px 52px rgba(0,0,0,0.25)',
      },

      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },

      fontSize: {
        title3: ['28px', '41px'],
        paragraph: ['14px', '21px'],
        paragraphLg: ['16px', '24px'],
        pill: ['16px', '24px'],
        timePill: ['14px', '21px'],
      },
    },
  },

  plugins: [],
};

export default config;
