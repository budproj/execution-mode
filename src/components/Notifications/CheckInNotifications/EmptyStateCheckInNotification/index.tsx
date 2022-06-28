import { Box } from '@chakra-ui/react'
import React from 'react'

import { EmptyState } from 'src/components/Base'

import messages from './messages'

const EmptyStateCheckInNotifications = () => {
  return (
    <Box padding="50px 0px">
      <EmptyState
        imageKey="people-with-pages"
        labelMessage={messages.emptyStateCheckInNotifications}
      />
    </Box>
  )
}

export default EmptyStateCheckInNotifications
