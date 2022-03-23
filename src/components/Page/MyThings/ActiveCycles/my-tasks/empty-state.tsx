import { Box, Divider } from '@chakra-ui/react'
import React from 'react'

import { EmptyState } from 'src/components/Base'

import messages from './messages'

const MyTasksEmptyState = () => {
  return (
    <>
      <Divider my="3.5rem" borderColor="new-gray.400" opacity="1" />
      <Box mt={20} maxWidth="300px" mx="auto">
        <EmptyState
          imageKey="check-item"
          headerMessage={messages.tasksEmptyStateHeader}
          labelMessage={messages.tasksEmptyStateMessage}
          py={0}
        />
      </Box>
    </>
  )
}

export default MyTasksEmptyState
