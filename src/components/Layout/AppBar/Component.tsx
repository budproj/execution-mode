import React, { ReactElement } from 'react'
import Box from '@material-ui/core/Box'
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from 'components/Layout/Button'
import { useIntl } from 'react-intl'
import messages from './messages'
import { Divider, styled } from '@material-ui/core'
import { NotificationBell } from 'components/Icons'

const MenuBox = styled(Box)({
  flexGrow: 1,
  display: 'inline-grid',
  gridTemplateColumns: 'repeat(4, 1fr) 8fr',
  justifyItems: 'start',
})

const UserBox = styled(Box)({
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyItems: 'center',
  display: 'inline-grid',
  gridTemplateColumns: '2fr 1fr 2fr 5fr',
})

const AppBar = (): ReactElement => {
  const intl = useIntl()

  return (
    <Box px={4} py={3}>
      <MUIAppBar position={'static'} square={false} color={'transparent'} elevation={5}>
        <Toolbar>
          <MenuBox py={2}>
            <Button>{intl.formatMessage(messages.overview)}</Button>
            <Button>{intl.formatMessage(messages.dashboard)}</Button>
            <Button>{intl.formatMessage(messages.keyResults)}</Button>
            <Button>{intl.formatMessage(messages.team)}</Button>
          </MenuBox>

          <UserBox>
            <Divider orientation={'vertical'} light />
            <NotificationBell />
            <Divider orientation={'vertical'} light />
          </UserBox>
        </Toolbar>
      </MUIAppBar>
    </Box>
  )
}

export default AppBar
