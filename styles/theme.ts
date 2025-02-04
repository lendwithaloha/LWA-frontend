
'use client'
import { createTheme } from '@mui/material/styles';
import {Inter} from 'next/font/google/index'

const theme = createTheme({
  typography: {
    fontFamily: 'Inter',
  },
});



export default theme;
export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0070f3',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333',
    },
  },
  typography: {
    fontFamily: "'Arial', sans-serif",
    h1: {
      fontFamily: `${Inter}`,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#07121E',
    },
    secondary: {
      main: '#ECEEF0',
    },
    background: {
      default: '#07121E',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Arial', sans-serif",
    h1: {
      fontFamily: "'Georgia', serif",
    },
  },
});





export const lightTheme = {
  colors: {
    primary: '#0070f3',
    background: '#fafafa',
    bakcgroundLight:'#F9F9FC',
    text: '#333',
    secondary: '#ff4081',
    homePrimary: '#1976D2',
    homeSecondary:'#202428',
    homeWhite:'#FBFDFF',
    homeGray: '#5E656B',
    homeBackground:'#EAF3FD',
    homeBorder:'#B8D5F9',
    primaryLight:'#DCECFF',
    primaryWhite:'#F5F9FF'
  },
  fonts: {
    body: `${Inter}`,
    heading: `${Inter}`,
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '32px',
  },
};


