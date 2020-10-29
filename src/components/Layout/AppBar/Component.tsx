import React, { ReactElement } from 'react'
import Box from '@material-ui/core/Box'
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from 'components/Layout/Button'
import { useIntl } from 'react-intl'
import messages from './messages'

const AppBar = (): ReactElement => {
  const intl = useIntl()

  return (
    <Box px={4} py={3}>
      <MUIAppBar position={'static'} square={false} color={'transparent'} elevation={5}>
        <Toolbar>
          <Button>{intl.formatMessage(messages.overview)}</Button>
        </Toolbar>
      </MUIAppBar>
    </Box>
  )
}

export default AppBar
