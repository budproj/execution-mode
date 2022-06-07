import {
  Box,
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import InfoCircleIcon from 'src/components/Icon/InfoCircle'
import SingleTask from 'src/components/Task'
import { AddTask } from 'src/components/Task/add-task'
import { useDeleteTask, useGetMyTasks, useToggleTask } from 'src/components/Task/hooks'
import { SingleTaskSkeleton } from 'src/components/Task/skeletons/single-task'
import { Task } from 'src/components/Task/types'

import { EmptyPersonalTasks } from './empty'
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
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border={0}>
        <AccordionButton
          _hover={{}}
          _focus={{ boxShadow: 'none' }}
          borderBottom="1px solid"
          borderBottomColor="new-gray.400"
          py={4}
          px={0}
        >
          <Flex flex="1" textAlign="left">
            <Heading
              as="h2"
              fontSize="xl"
              textTransform="uppercase"
              fontWeight="bold"
              color="new-gray.800"
            >
              {intl.formatMessage(messages.personalTasksHeading)}
            </Heading>

            <TooltipWithDelay
              mt={2}
              label={intl.formatMessage(messages.personalTasksTooltip)}
              placement="bottom"
              offset={[0, -2]}
              maxW="430px"
            >
              <Box transform="translate(0, -2px)" ml={2}>
                <InfoCircleIcon
                  fill="gray.400"
                  stroke="gray.400"
                  cursor="help"
                  desc={intl.formatMessage(messages.personalTasksTooltip)}
                />
              </Box>
            </TooltipWithDelay>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} px={0}>
          {isLoaded && tasks.length > 0 ? (
            <>
              {tasks.map((task: Task) => (
                <SingleTask
                  key={task.id}
                  task={task}
                  onCheckboxClick={onCheckboxClick}
                  onTaskDelete={onTaskDelete}
                />
              ))}
              <AddTask buttonText={intl.formatMessage(messages.addPersonalTasksButtonLabel)} />
            </>
          ) : isLoaded ? (
            <EmptyPersonalTasks />
          ) : (
            <SingleTaskSkeleton repeat={3} />
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default MyPersonalTasks
