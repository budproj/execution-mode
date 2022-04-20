import { Box } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { Accordion } from 'src/components/Base/Accordion/index'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import InfoCircleIcon from 'src/components/Icon/InfoCircle'
import SingleTask from 'src/components/Task'
import { AddTask } from 'src/components/Task/add-task'
import { useDeleteTask, useGetMyTasks, useToggleTask } from 'src/components/Task/hooks'
import { SingleTaskSkeleton } from 'src/components/Task/skeletons/single-task'
import { Task } from 'src/components/Task/types'

import messages from './messages'

const MyPersonalTasks = () => {
  const { tasks, loading, called } = useGetMyTasks()
  const { toggleTask } = useToggleTask()
  const { deleteTask } = useDeleteTask()
  const intl = useIntl()

  const isLoaded = called && !loading

  const onCheckboxClick = useCallback(
    async (taskId: Task['id']) => {
      await toggleTask({ variables: { id: taskId } })
    },
    [toggleTask],
  )

  const onTaskDelete = useCallback(
    async (taskId: Task['id']) => {
      await deleteTask({ variables: { id: taskId } })
    },
    [deleteTask],
  )

  return (
    <Accordion
      title={
        <>
          {intl.formatMessage(messages.personalTasksHeading)}
          <TooltipWithDelay
            mt={2}
            label={intl.formatMessage(messages.personalTasksTooltip)}
            placement="bottom"
            offset={[0, -2]}
            maxW="430px"
          >
            <Box display="inline-block" transform="translate(10px, -2px)">
              <InfoCircleIcon
                fill="gray.400"
                stroke="gray.400"
                cursor="help"
                desc={intl.formatMessage(messages.personalTasksTooltip)}
              />
            </Box>
          </TooltipWithDelay>
        </>
      }
    >
      {isLoaded ? (
        tasks.map((task: Task) => (
          <SingleTask
            key={task.id}
            task={task}
            onCheckboxClick={onCheckboxClick}
            onTaskDelete={onTaskDelete}
          />
        ))
      ) : (
        <SingleTaskSkeleton repeat={3} />
      )}
      <AddTask buttonText={intl.formatMessage(messages.addPersonalTasksButtonLabel)} />
    </Accordion>
  )
}

export default MyPersonalTasks
