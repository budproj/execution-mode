import { HStack } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useState } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { GetUserTasksOutput } from 'src/services/mission-control/mission-control.service'

import { getEnumKeyByValue, TASK_TEMPLATE } from './hooks/use-get-mission-control-tasks-config'
import { TasksListIteam } from './tasks-list-item'

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
    <HStack gap={6}>
      {tasks.slice(0, 3).map((task) => {
        const templateKey = getEnumKeyByValue(TASK_TEMPLATE, task.templateId)

        return (
          templateKey && (
            <TasksListIteam key={task.templateId} template={TASK_TEMPLATE[templateKey]} />
          )
        )
      })}
    </HStack>
  )
}
