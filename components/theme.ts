"use client"

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1851DF',
    },
    secondary: {
      main: '#D4C8BE',
    },
    info: {
      main: 'rgba(184, 146, 106, 0.1)'
    }
  },
  typography: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '52px',
      color: '#2D2D2B',
      fontWeight: '700',
      lineHeight: '52px',
      '@media (max-width:900px)': {
        fontSize: '36px',
        lineHeight: '40px',
      },
    },
    h2: {
      fontSize: '42px',
      color: '#2D2D2B',
      fontWeight: '700',
      lineHeight: '44px',
      '@media (max-width:900px)': {
        fontSize: '34px',
        lineHeight: '38px',
      },
    },
    h3: {
      fontSize: '32px',
      color: '#2D2D2B',
      fontWeight: '700',
      lineHeight: '34px',
      '@media (max-width:900px)': {
        fontSize: '28px',
        lineHeight: '34px',
      },
    },
    h4: {
      fontSize: '26px',
      textAlign: 'center',
      fontWeight: '600',
      lineHeight: '30px',
      color: '#2D2D2B',
      '@media (max-width:900px)': {
        fontSize: '24px',
        lineHeight: '28px',
      },
    },
    h5: {
        fontSize: '22px',
        fontWeight: '600',
        lineHeight: '28px',
        color: '#2D2D2B',
        '@media (max-width:900px)': {
          fontSize: '24px',
          lineHeight: '28px',
        },
      },
    h6: {
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: '24px',
      color: '#2D2D2B',
      '@media (max-width:900px)': {
        fontSize: '16px',
        lineHeight: '18px',
      },
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '17px',
      color: '#5D5D5B',
      '@media (max-width:900px)': {
        fontSize: '16px',
        lineHeight: '22px',
      },
    },
    subtitle2: {
      fontSize: '20px',
      fontWeight: '500',
      lineHeight: '28px',
      color: '#2D2D2B',
      '@media (max-width:900px)': {
        fontSize: '16px',
        lineHeight: '22px',
      },
    },
  },  
});

export default theme;