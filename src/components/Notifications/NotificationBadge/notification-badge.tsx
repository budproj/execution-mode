import { Box, StyleProps } from '@chakra-ui/react'
import React from 'react'

export interface NotificationBadgeProperties extends StyleProps {
  notificationCount: number
  hasBorder?: boolean
}

export const NotificationBadge = ({
  notificationCount,
  hasBorder,
  ...rest
}: NotificationBadgeProperties) => {
  const fontSize = notificationCount > 9 ? '10px' : '12px'

  return (
    <Box
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize={fontSize}
      lineHeight={fontSize}
      fontWeight="bold"
      bgColor="#FF616A"
      borderRadius="50%"
      minWidth="16px"
      minHeight="16px"
      outline={hasBorder ? '2px solid white' : undefined}
      {...rest}
    >
      {notificationCount}
    </Box>
  )
}
