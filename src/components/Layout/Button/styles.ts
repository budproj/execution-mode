import { Theme } from '@material-ui/core'

import { MUIStyle } from 'hooks/useClasses'

const styles: MUIStyle = (theme: Theme) => ({
  text: {
    textTransform: 'none',
    fontWeight: 500,
    color: theme.palette.grey[500],

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
})

export default styles
