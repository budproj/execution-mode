import React, { ReactElement } from 'react'
import Box from '@material-ui/core/Box'
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { useIntl } from 'react-intl'
import { Divider, styled } from '@material-ui/core'

import messages from './messages'

import Button from 'components/Layout/Button'
import { NotificationBell } from 'components/Icons'
import NamedAvatar from 'components/User/NamedAvatar/Component'

const AppBar = (): ReactElement => {
  const intl = useIntl()

  return (
    <Box px={4} py={3}>
      <MUIAppBar position={'static'} square={false} color={'transparent'} elevation={5}>
        <Toolbar>
          <Box py={2} display={'flex'} gridGap={40} flexGrow={1}>
            <Button>{intl.formatMessage(messages.overview)}</Button>
            <Button>{intl.formatMessage(messages.dashboard)}</Button>
            <Button>{intl.formatMessage(messages.keyResults)}</Button>
            <Button>{intl.formatMessage(messages.team)}</Button>
          </Box>

          <Box display={'flex'} gridGap={20} alignSelf={'stretch'} alignItems={'center'}>
            <Divider orientation={'vertical'} light flexItem />
            <NotificationBell />
            <Divider orientation={'vertical'} light flexItem />
            <NamedAvatar />
          </Box>
        </Toolbar>
      </MUIAppBar>
    </Box>
  )
}

export default AppBar
