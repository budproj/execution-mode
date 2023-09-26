import { VStack } from '@chakra-ui/react'
import React from 'react'

import { TaskCard } from 'src/components/Base/TasksCard/wrapper'
import { DangerActionIcon } from 'src/components/Icon'

export const EmptyStateTasksList = () => {
  return (
    <TaskCard.Root completed border="2px dotted #C5C5FF">
      <VStack alignItems="flex-start" justifyContent="space-between">
        <TaskCard.Content
          completed
          title="Não há tarefas pra você nesse time"
          subtitle="Ainda não há tarefas designadas para você nesse time."
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
