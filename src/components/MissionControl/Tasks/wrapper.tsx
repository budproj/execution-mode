/* eslint-disable react/no-array-index-key */
import { Box, Fade, HStack, Text } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { GetUserTasksOutput } from 'src/services/mission-control/mission-control.service'

import { EmptyStateTasksList } from './empty-state-tasks-list'
import { getEnumKeyByValue, TASK_TEMPLATE } from './hooks/use-get-mission-control-tasks-config'
import messages from './messages'
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
  const intl = useIntl()

  const getUserTasks = useCallback(async () => {
    const { missionControl } = await servicesPromise
    const data = await missionControl.getUserTasks({ userID, teamID })
    setTasks(data)
  }, [servicesPromise, userID, teamID])

  useEffect(() => {
    getUserTasks()
  }, [getUserTasks])

  const tasksSliced = useMemo(() => {
    return tasks
      .slice(0, 3)
      .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
  }, [tasks])

  const emptyBoxesToAppear = new Array(Math.abs(tasksSliced.length - 3)).fill(
    Math.abs(tasksSliced.length - 3),
  )

  return tasksSliced.length > 0 ? (
    <Fade in style={{ width: '100%' }}>
      <Text color="white" fontWeight="bold" fontSize={14} textTransform="uppercase" mb={2}>
        {intl.formatMessage(messages.listTasksSectionTitle)}
      </Text>
      <HStack gap={5} alignItems="flex-start">
        {tasksSliced.map((task) => {
          const templateKey = getEnumKeyByValue(TASK_TEMPLATE, task.templateId)

          return (
            templateKey && (
              <TasksListItem
                key={`${task.templateId}-${task.userId}-${task.weekId}-${teamID}`}
                teamID={teamID}
                template={TASK_TEMPLATE[templateKey]}
                completed={task.completed}
                userId={userID}
              />
            )
          )
        })}
        {emptyBoxesToAppear.map((_test, index) => (
          <Box key={index} w="100%" h={200} border="2px dotted #C5C5FF" borderRadius={10} />
        ))}
      </HStack>
    </Fade>
  ) : (
    <Fade in style={{ width: '100%' }}>
      <Text color="white" fontWeight="bold" fontSize={14} textTransform="uppercase" mb={2}>
        {intl.formatMessage(messages.listTasksSectionTitle)}
      </Text>
      <HStack gap={5}>
        <EmptyStateTasksList />
        <Box w="100%" h={200} border="2px dotted #C5C5FF" borderRadius={10} />
        <Box w="100%" h={200} border="2px dotted #C5C5FF" borderRadius={10} />
      </HStack>
    </Fade>
  )
}
