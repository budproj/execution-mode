import React, { ReactElement } from 'react'
import Box from '@material-ui/core/Box'
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from 'components/Layout/Button'

const AppBar = (): ReactElement => (
  <Box px={4} py={3}>
    <MUIAppBar position={'static'} square={false} color={'transparent'} elevation={5}>
      <Toolbar>
        <Button>Overview</Button>
      </Toolbar>
    </MUIAppBar>
  </Box>
)

export default AppBar
