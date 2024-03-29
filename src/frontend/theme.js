import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#959595' },
    secondary: { main: '#404040' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 660,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiInput: {
      root: {
        color: 'white',
      },
      underline: {
        '&:before': {
          borderBottom: `3px solid #3D3D3D`,
        },
        '&:hover:not($disabled):before': {
          borderBottom: `3px solid #3D3D3D`,
        },
      },
    },
  },
  typography: {
    fontFamily: ['Arial'].join(','),
    h2: {
      color: '#fafafa',
      fontSize: '2.6rem',
      fontWeight: '500',
    },
    h3: {
      color: 'white',
      fontWeight: '600',
      fontSize: '2.2rem',
    },
    body1: {
      color: '#fafafa',
      fontSize: '1.5rem',
    },
    body2: {
      color: '#fafafa',
      fontSize: '1.8rem',
    },
    caption: {
      color: '#d9d9d9',
      fontSize: '1.5rem',
    },
    subtitle1: {
      color: '#6C6C6C',
      fontSize: '1.3rem',
    },
    // this one is used for red error text
    subtitle2: {
      color: '#f44336',
      fontSize: '1.5rem',
    },
    button: {
      fontWeight: '600',
      fontSize: '1.2rem',
      color: '#CCCCCC',
    },
  },
})

export default theme
