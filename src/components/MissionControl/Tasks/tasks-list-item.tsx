import { VStack } from '@chakra-ui/react'
import React from 'react'

import { TaskCard } from 'src/components/Base/TasksCard/wrapper'

import {
  TASK_TEMPLATE,
  useGetMissionControlTasksConfig,
} from './hooks/use-get-mission-control-tasks-config'

interface TaskCardProperties {
  template: TASK_TEMPLATE
}

export const TasksListIteam = ({ template }: TaskCardProperties) => {
  const config = useGetMissionControlTasksConfig(template)

  return (
    <TaskCard.Root>
      <VStack gap={1}>
        <TaskCard.Content title={config.content.title} subtitle={config.content.description} />
        <TaskCard.Actions
          role={config.actions.role}
          label={config.actions.label}
          w="100%"
          textAlign="center"
          py={2}
        />
      </VStack>
      <VStack justifyContent="space-between">
        <TaskCard.Icon>{config.icon}</TaskCard.Icon>
        <TaskCard.Delta value={2.4} />
      </VStack>
    </TaskCard.Root>
  )
}
