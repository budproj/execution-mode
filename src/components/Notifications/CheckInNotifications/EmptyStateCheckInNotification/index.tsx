import { Box } from '@chakra-ui/react'
import React from 'react'

import { EmptyState } from 'src/components/Base'

import messages from './messages'

const EmptyStateThisWeekNotifications = () => {
  return (
    <Box padding="50px 0px">
      <EmptyState
        imageKey="zen-girl"
        labelMessage={messages.emptyStateThisWeekNotifications}
        headerMessage={messages.emptyStateThisWeekNotificationsTitle}
        maxW="300px"
        fontSize="14px"
      />
    </Box>
  )
}

export default EmptyStateThisWeekNotifications
