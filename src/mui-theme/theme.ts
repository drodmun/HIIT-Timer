import { createTheme } from '@mui/material';

const theme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 }
  },
  direction: 'ltr',
  mixins: {
    toolbar: {
      maxHeight: 160,
      background: 'transparent',
      // background: '#0d174d',
      color: '#ffffff'
    }
  },
  palette: {
    common: { black: '#000', white: '#fff' },
    primary: {
      light: '#8bf5ff',
      main: '#4fc2f7',
      dark: '#0092c4',
      contrastText: '#000000'
    },
    secondary: {
      light: '#ff5bde',
      main: '#cb18ac',
      dark: '#96007c',
      contrastText: '#fff'
    },
    error: {
      light: '#EE647B',
      main: '#E62143',
      dark: '#D50B1E',
      contrastText: '#fff'
    },
    warning: {
      light: '#FDD44D',
      main: '#FCC100',
      dark: '#F08724',
      contrastText: '#000000de'
    },
    info: {
      light: '#4D9ABB',
      main: '#2685AD',
      dark: '#004070',
      contrastText: '#fff'
    },
    success: {
      light: '#81c784',
      main: '#51AE32',
      dark: '#388e3c',
      contrastText: '#fff'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A700: '#616161',
      A400: '#303030',
      A200: '#aaaaaa',
      A100: '#d5d5d5'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: '#000000de',
      secondary: '#0000008a',
      disabled: '#00000061'
    },
    divider: '#0000001f',
    background: { paper: '#fafafa', default: '#fafafa' },
    action: {
      active: '#0000008a',
      hover: '#00000014',
      hoverOpacity: 0.08,
      selected: '#00000024',
      selectedOpacity: 0.08,
      disabled: '#00000042',
      disabledBackground: '#0000001f',
      disabledOpacity: 0.38,
      focus: '#0000001f',
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  },
  shadows: [
    'none',
    '0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px #00000024,0px 2px 1px -1px #0000001f',
    '0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px #00000024,0px 3px 1px -2px #0000001f',
    '0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px #00000024,0px 3px 3px -2px #0000001f',
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px #00000024,0px 1px 10px 0px #0000001f',
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px #00000024,0px 1px 14px 0px #0000001f',
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px #00000024,0px 1px 18px 0px #0000001f',
    '0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px #00000024,0px 2px 16px 1px #0000001f',
    '0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px #00000024,0px 3px 14px 2px #0000001f',
    '0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px #00000024,0px 3px 16px 2px #0000001f',
    '0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px #00000024,0px 4px 18px 3px #0000001f',
    '0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px #00000024,0px 4px 20px 3px #0000001f',
    '0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px #00000024,0px 5px 22px 4px #0000001f',
    '0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px #00000024,0px 5px 24px 4px #0000001f',
    '0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px #00000024,0px 5px 26px 4px #0000001f',
    '0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px #00000024,0px 6px 28px 5px #0000001f',
    '0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px #00000024,0px 6px 30px 5px #0000001f',
    '0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px #00000024,0px 6px 32px 5px #0000001f',
    '0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px #00000024,0px 7px 34px 6px #0000001f',
    '0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px #00000024,0px 7px 36px 6px #0000001f',
    '0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px #00000024,0px 8px 38px 7px #0000001f',
    '0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px #00000024,0px 8px 40px 7px #0000001f',
    '0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px #00000024,0px 8px 42px 7px #0000001f',
    '0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px #00000024,0px 9px 44px 8px #0000001f',
    '0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px #00000024,0px 9px 46px 8px #0000001f'
  ],
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Source Sans 3", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 300,
      fontSize: '6rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em'
    },
    h2: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 300,
      fontSize: '3.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em'
    },
    h3: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 400,
      fontSize: '3rem',
      '@media (max-width:600px)': {
        fontSize: '1.85rem'
      },
      lineHeight: 1.167,
      letterSpacing: '0em'
    },
    h4: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 400,
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1rem'
      },
      lineHeight: 1.235,
      letterSpacing: '0.00735em'
    },
    h5: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 400,
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '0.9rem'
      },
      lineHeight: 1.334,
      letterSpacing: '0em'
    },
    h6: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      '@media (max-width:600px)': {
        fontSize: '0.8rem'
      },
      lineHeight: 1.6,
      letterSpacing: '0.0075em'
    },
    subtitle1: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.8rem'
      },
      lineHeight: 1.75,
      letterSpacing: '0.00938em'
    },
    subtitle2: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 500,
      fontSize: '0.875rem',
      '@media (max-width:600px)': {
        fontSize: '0.6rem'
      },
      lineHeight: 1.57,
      letterSpacing: '0.00714em'
    },
    body1: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.775rem'
      },
      lineHeight: 1.5,
      letterSpacing: '0.00938em'
    },
    body2: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      '@media (max-width:600px)': {
        fontSize: '0.6rem'
      },
      lineHeight: 1.43,
      letterSpacing: '0.01071em'
    },
    button: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 500,
      fontSize: '0.875rem',
      '@media (max-width:600px)': {
        fontSize: '0.775rem'
      },
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase'
    },
    caption: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em'
    },
    overline: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
      textDecoration: 'underline'
    }
  },
  spacing: 8,
  shape: { borderRadius: 4 },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    }
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  }
});

export default theme;
