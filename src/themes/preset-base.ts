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
    '0px 20px 8px 0 rgba(129,147,171,.9)',
  ],
})

export default theme
