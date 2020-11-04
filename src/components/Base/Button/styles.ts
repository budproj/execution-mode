import { Theme } from '@material-ui/core'

import { MUIStyle } from 'state/hooks/useClasses'

const styles: MUIStyle = (theme: Theme) => ({
  root: {
    borderRadius: (props) => (props.rounded ? 40 : theme.shape.borderRadius),
  },

  contained: {
    textTransform: 'none',
  },

  text: {
    textTransform: 'none',
    color: (props) => (props.isActive ? theme.palette.primary.main : theme.palette.grey[500]),

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
})

export default styles
