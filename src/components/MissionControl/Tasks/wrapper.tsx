import { Fade, HStack, Text } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { GetUserTasksOutput } from 'src/services/mission-control/mission-control.service'

import { getEnumKeyByValue, TASK_TEMPLATE } from './hooks/use-get-mission-control-tasks-config'
import { TasksListItem } from './tasks-list-item'

interface MissionControlTasksWrapperProperties {
  userID: string
  teamID: string
}

export const MissionControlTasksWrapper = ({
  userID,
  teamID,
}: MissionControlTasksWrapperProperties) => {
  const { servicesPromise } = useContext(ServicesContext)
  const [tasks, setTasks] = useState<GetUserTasksOutput>([])

  const getUserTasks = useCallback(async () => {
    const { missionControl } = await servicesPromise
    const data = await missionControl.getUserTasks({ userID, teamID })
    setTasks(data)
  }, [servicesPromise, userID, teamID])

  useEffect(() => {
    getUserTasks()
  }, [getUserTasks])

  return (
    <Fade in={tasks.length > 0}>
      <Text color="white" fontWeight="bold" fontSize={14} textTransform="uppercase" mb={2}>
        desafios e Tarefas da semana
      </Text>
      <HStack gap={10}>
        {tasks.slice(0, 3).map((task) => {
          const templateKey = getEnumKeyByValue(TASK_TEMPLATE, task.templateId)

          return (
            templateKey && (
              <TasksListItem
                key={task.templateId}
                teamID={teamID}
                template={TASK_TEMPLATE[templateKey]}
                completed={task.completed}
              />
            )
          )
        })}
      </HStack>
    </Fade>
  )
}
