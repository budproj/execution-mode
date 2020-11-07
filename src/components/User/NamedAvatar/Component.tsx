import { Avatar, Box, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

const NamedAvatar = (): ReactElement => (
  <Box display={'flex'} alignItems={'center'} gridGap={15}>
    <Avatar>B</Avatar>

    <Box>
      <Typography color={'textPrimary'} variant={'body2'}>
        Bruno Delorence
      </Typography>
      <Typography color={'textPrimary'} variant={'subtitle1'}>
        Apple
      </Typography>
    </Box>
  </Box>
)

export default NamedAvatar
