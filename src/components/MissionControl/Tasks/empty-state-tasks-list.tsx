import { VStack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { TaskCard } from 'src/components/Base/TasksCard/wrapper'
import { DangerActionIcon } from 'src/components/Icon'

import messages from './messages'

export const EmptyStateTasksList = () => {
  const intl = useIntl()

  return (
    <TaskCard.Root completed border="2px dotted #C5C5FF">
      <VStack alignItems="flex-start" justifyContent="space-between">
        <TaskCard.Content
          completed
          title={intl.formatMessage(messages.emptyTasksMessageTitle)}
          subtitle={intl.formatMessage(messages.emptyTasksMessageDescription)}
        />
      </VStack>
      <VStack justifyContent="space-between">
        <TaskCard.Icon
          bg="gray.300"
          w="35px"
          h="35px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <DangerActionIcon desc="teste" w="20px" marginBottom="3px" color="gray.500" />
        </TaskCard.Icon>
      </VStack>
    </TaskCard.Root>
  )
}
