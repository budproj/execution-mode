import { Theme, createMuiTheme } from '@material-ui/core/styles'

import tokens from './tokens'

const theme: Theme = createMuiTheme({
  typography: {
    fontFamily: [tokens.fonts.base, tokens.fonts.fallback].join(','),
    fontSize: 16,
    h1: {
      fontSize: 35,
      fontWeight: 600,
      color: tokens.colors.grey800,
    },
    h2: {
      fontSize: 25,
      fontWeight: 600,
    },
    h3: {
      fontSize: 16,
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.1,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 600,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: 16,
      fontWeight: 500,
    },
    button: {
      fontSize: 15,
      fontWeight: 600,
    },
  },

  palette: {
    primary: {
      main: tokens.colors.blue500,
      dark: tokens.colors.blue800,
      light: tokens.colors.cyan50,
    },

    grey: {
      50: tokens.colors.grey50,
      100: tokens.colors.grey100,
      200: tokens.colors.grey200,
      300: tokens.colors.grey300,
      400: tokens.colors.grey400,
      500: tokens.colors.grey500,
      600: tokens.colors.grey600,
      700: tokens.colors.grey700,
      800: tokens.colors.grey800,
      900: tokens.colors.grey900,
    },

    success: {
      light: tokens.colors.green200,
      main: tokens.colors.green500,
      dark: tokens.colors.green700,
    },

    warning: {
      light: tokens.colors.yellow200,
      main: tokens.colors.yellow500,
      dark: tokens.colors.yellow700,
    },

    error: {
      light: tokens.colors.red200,
      main: tokens.colors.red500,
      dark: tokens.colors.red700,
    },

    background: {
      default: tokens.colors.white,
    },

    text: {
      primary: tokens.colors.grey500,
    },
  },

  shadows: [
    'none',
    '0px 4px 16px 0 rgba(129,147,171,.05)',
    '0px 4px 16px 0 rgba(129,147,171,.1)',
    '0px 4px 16px 0 rgba(129,147,171,.15)',
    '0px 4px 12px 0 rgba(129,147,171,.15)',
    '0px 4px 12px 0 rgba(129,147,171,.20)',
    '0px 4px 12px 0 rgba(129,147,171,.25)',
    '0px 4px 8px 0 rgba(129,147,171,.25)',
    '0px 4px 8px 0 rgba(129,147,171,.30)',
    '0px 4px 8px 0 rgba(129,147,171,.35)',
    '0px 4px 4px 0 rgba(129,147,171,.35)',
    '0px 4px 4px 0 rgba(129,147,171,.40)',
    '0px 4px 4px 0 rgba(129,147,171,.45)',
    '0px 8px 4px 0 rgba(129,147,171,.45)',
    '0px 8px 4px 0 rgba(129,147,171,.50)',
    '0px 8px 4px 0 rgba(129,147,171,.55)',
    '0px 12px 8px 0 rgba(129,147,171,.55)',
    '0px 12px 8px 0 rgba(129,147,171,.6)',
    '0px 12px 8px 0 rgba(129,147,171,.65)',
    '0px 16px 8px 0 rgba(129,147,171,.65)',
    '0px 16px 8px 0 rgba(129,147,171,.7)',
    '0px 16px 8px 0 rgba(129,147,171,.75)',
    '0px 20px 8px 0 rgba(129,147,171,.75)',
    '0px 20px 8px 0 rgba(129,147,171,.8)',
    '0px 20px 8px 0 rgba(129,147,171,.85)',
  ],
})

export default theme
