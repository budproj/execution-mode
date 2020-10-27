import { createMuiTheme, Theme } from '@material-ui/core/styles'

import tokens from './tokens'

const theme: Theme = createMuiTheme({
  typography: {
    fontFamily: [tokens.fonts.base, tokens.fonts.fallback].join(','),
    fontSize: 14,
    h1: {
      fontSize: 35,
      fontWeight: 500,
    },
    h2: {
      fontSize: 25,
      fontWeight: 500,
    },
    h3: {
      fontSize: 16,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 12,
      fontWeight: 500,
    },
    body1: {
      fontSize: 16,
      fontWeight: 300,
    },
    button: {
      fontSize: 16,
      fontWeight: 500,
    },
  },

  shadows: [
    'none',
    '0px 4px 4px 0 rgba(129,147,171,.35)',
    '0px 4px 8px 0 rgba(129,147,171,.3)',
    '0px 4px 12px 0 rgba(129,147,171,.2)',
  ],
})

export default theme
