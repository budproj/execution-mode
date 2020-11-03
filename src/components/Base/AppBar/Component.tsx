import React, { ReactElement } from 'react'
import Box from '@material-ui/core/Box'
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { useIntl } from 'react-intl'
import { styled } from '@material-ui/core'

import ToolbarMenuItem from '../ToolbarMenuItem/Component'

import messages from './messages'

import {
  NotificationBell as NotificationIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
} from 'components/Icons'
import NamedAvatar from 'components/User/NamedAvatar/Component'
import Logotype from 'components/Base/Logotype/Component'

const StyledAppBar = styled(MUIAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
}))

const StyledToolbar = styled(Toolbar)({
  display: 'inline-grid',
  gridTemplateColumns: '1fr 5fr 2fr',
})

const AppBar = (): ReactElement => {
  const intl = useIntl()

  return (
    <StyledAppBar position={'sticky'} elevation={1}>
      <StyledToolbar>
        <Logotype />

        <Box py={2} display={'flex'} gridGap={55} flexGrow={1}>
          <ToolbarMenuItem label={intl.formatMessage(messages.dashboard)} href={'/'} />
          <ToolbarMenuItem label={intl.formatMessage(messages.keyResults)} href={'/keyResults'} />
          <ToolbarMenuItem label={intl.formatMessage(messages.item)} href={'#'} />
          <ToolbarMenuItem label={intl.formatMessage(messages.item)} href={'#'} />
        </Box>

        <Box display={'flex'} gridGap={20} alignItems={'center'} justifyContent={'flex-end'}>
          <SearchIcon />
          <NotificationIcon />
          <SettingsIcon />

          <NamedAvatar />
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default AppBar
