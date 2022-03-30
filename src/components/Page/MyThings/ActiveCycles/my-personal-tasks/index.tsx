import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import SingleTask from 'src/components/Task'
import { AddTask } from 'src/components/Task/add-task'
import { useDeleteTask } from 'src/components/Task/hooks/deleteTask/delete-task'
import { useGetMyTasks } from 'src/components/Task/hooks/getTasks/get-tasks'
import { useToggleTask } from 'src/components/Task/hooks/toggleTask/toggle-task'
import { SingleTaskSkeleton } from 'src/components/Task/skeletons/single-task'
import { Task } from 'src/components/Task/types'

import messages from './messages'

const MyPersonalTasks = () => {
  const { tasks, loading, called } = useGetMyTasks()
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
    <Accordion allowToggle reduceMotion defaultIndex={0}>
      <AccordionItem border={0}>
        <AccordionButton
          p={0}
          mb={3}
          _hover={{}}
          _focus={{ boxShadow: 'none' }}
          justifyContent="space-between"
        >
          <Text fontWeight={600} pl="0.5rem">
            {intl.formatMessage(messages.personalTasksHeading)}
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={0}>
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
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default MyPersonalTasks
