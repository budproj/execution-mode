import { Box } from '@chakra-ui/react'
import React from 'react'

import { EmptyState } from 'src/components/Base'
import { User } from 'src/components/User/types'

import messages from './messages'

interface EmptyTasksProperties {
  username?: User['firstName']
}

const MyTasksEmptyState = ({ username }: EmptyTasksProperties) => {
  const headerMessage = username ? undefined : messages.tasksEmptyStateHeader
  const labelMessage = username
    ? messages.userTasksEmptyStateMessage
    : messages.tasksEmptyStateMessage

  return (
    <Box mt={20} maxWidth="300px" mx="auto">
      <EmptyState
        imageKey="check-item"
        headerMessage={headerMessage}
        labelMessage={labelMessage}
        messageTranslationOptions={{ username }}
        py={0}
      />
    </Box>
  )
}

export default MyTasksEmptyState
