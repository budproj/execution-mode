import { Theme } from '@material-ui/core'

import { MUIStyle } from 'themes/types'

import { ButtonProps as ButtonProperties } from './button'

const styles: MUIStyle = (theme: Theme) => ({
  root: {
    borderRadius: (properties: ButtonProperties) =>
      properties.rounded ? 40 : theme.shape.borderRadius,
  },

  contained: {
    textTransform: 'none',
  },

  text: {
    textTransform: 'none',
    color: (properties: ButtonProperties) =>
      properties.isActive ? theme.palette.primary.main : theme.palette.grey[500],

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
})

export default styles
