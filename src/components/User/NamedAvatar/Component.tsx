import { Avatar, Box, Typography } from '@material-ui/core'
import React from 'react'

const NamedAvatar = () => (
  <Box display={'flex'} alignItems={'center'} gridGap={15}>
    <Typography>Bruno Delorence</Typography>
    <Avatar>B</Avatar>
  </Box>
)

export default NamedAvatar
