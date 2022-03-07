import { Box } from '@chakra-ui/react'
import React from 'react'

import { EmptyState } from 'src/components/Base'

import messages from './messages'

const MyTasksEmptyState = () => {
  return (
    <Box mt={20}>
      <EmptyState
        imageKey="check-item"
        headerMessage={messages.tasksEmptyStateHeader}
        labelMessage={messages.tasksEmptyStateMessage}
        py={0}
      />
    </Box>
  )
}

export default MyTasksEmptyState
