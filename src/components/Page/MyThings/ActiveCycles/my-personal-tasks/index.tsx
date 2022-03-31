import React from 'react'
import { useIntl } from 'react-intl'

import { Accordion } from 'src/components/Base/Accordion/index'
import SingleTask from 'src/components/Task'
import { AddTask } from 'src/components/Task/add-task'
import { TASK_STATUS } from 'src/components/Task/constants'
import { useDeleteTask, useGetMyTasks, useToggleTask } from 'src/components/Task/hooks'
import { SingleTaskSkeleton } from 'src/components/Task/skeletons/single-task'
import { Task } from 'src/components/Task/types'

import messages from './messages'

interface MyPersonalTasksProperties {
  taskState?: string
}

const MyPersonalTasks = ({ taskState }: MyPersonalTasksProperties) => {
  const stateCheck = taskState === TASK_STATUS.UNCHECKED
  const { tasks, loading, called } = useGetMyTasks({ onlyUnchecked: stateCheck })
  const { toggleTask } = useToggleTask()
  const { deleteTask } = useDeleteTask()
  const intl = useIntl()

  const isLoaded = called && !loading

  const onCheckboxClick = (taskId: Task['id']) => {
    toggleTask({ variables: { id: taskId } })
  }

  const onTaskDelete = (taskId: Task['id']) => {
    deleteTask({ variables: { id: taskId } })
  }

  return (
    <Accordion title={intl.formatMessage(messages.personalTasksHeading)}>
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
