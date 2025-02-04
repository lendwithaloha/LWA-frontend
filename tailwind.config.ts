import type { Config } from 'tailwindcss';
import { darkTheme, lightTheme } from './styles/theme';
const { fontFamily } = require('tailwindcss/defaultTheme');
export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-slide-in': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        }
      },
      animation: {
        'fade-slide-in': 'fade-slide-in 0.5s ease-out'
      },
      colors: {
        primaryColor: lightTheme.colors.primary,
        background: lightTheme.colors.background,
        text: lightTheme.colors.text,
        backgroundLight: lightTheme.colors.bakcgroundLight,
        homeGray: lightTheme.colors.homeGray,
        homePrimary: lightTheme.colors.homePrimary,
        homeBackground: lightTheme.colors.homeBackground,
        homeBorder: lightTheme.colors.homeBorder,
        homeSecondary: lightTheme.colors.homeSecondary,
        homeWhite: lightTheme.colors.homeWhite,
        secondary: lightTheme.colors.secondary,
        primaryLight: lightTheme.colors.primaryLight,
        primaryWhite: lightTheme.colors.primaryWhite,
        'dark-primaryColor': darkTheme.palette.primary.main,
        'dark-secondaryColor': darkTheme.palette.secondary.main
      },
      screens: {
        'hsm': { 'raw': '(min-height: 500px)' },
        'hmd': { 'raw': '(min-height: 450px)' },
        'hlg': { 'raw': '(min-height: 650px)' },
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      spacing: {
        small: lightTheme.spacing.small,
        medium: lightTheme.spacing.medium,
        large: lightTheme.spacing.large,
      },
    },
  },
  plugins: [],
} satisfies Config;


