import { VStack } from '@chakra-ui/react'
import React from 'react'

import { TaskCard } from 'src/components/Base/TasksCard/wrapper'

import {
  TASK_TEMPLATE,
  useGetMissionControlTasksConfig,
} from './hooks/use-get-mission-control-tasks-config'

interface TaskCardProperties {
  template: TASK_TEMPLATE
  completed: boolean
  teamID: string
  userId: string
}

export const TasksListItem = ({ template, completed, teamID, userId }: TaskCardProperties) => {
  const config = useGetMissionControlTasksConfig(template, completed, teamID, userId)

  return (
    <TaskCard.Root completed={completed} action={config.action}>
      <VStack alignItems="flex-start" justifyContent="space-between">
        <TaskCard.Content
          completed={completed}
          title={config.content.title}
          subtitle={config.content.description}
        />
        <TaskCard.Actions
          role={config.actions.role}
          completed={completed}
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
