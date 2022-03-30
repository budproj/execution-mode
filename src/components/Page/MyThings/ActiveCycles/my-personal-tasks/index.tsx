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
import { useGetMyTasks } from 'src/components/Task/hooks/getTasks/get-tasks'
import { SingleTaskSkeleton } from 'src/components/Task/skeletons/single-task'
import { Task } from 'src/components/Task/types'

import messages from './messages'

const toggleCheckmark = () => {
  console.log('task updated')
}

const MyPersonalTasks = () => {
  const { tasks, loading, called } = useGetMyTasks()
  const intl = useIntl()

  const isLoaded = called && !loading

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
                taskId={task.id}
                description={task.description}
                toggleCheckmark={toggleCheckmark}
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
