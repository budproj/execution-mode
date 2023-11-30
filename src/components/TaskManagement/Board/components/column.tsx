import { Badge, Box, Circle, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useIntl } from 'react-intl'

import PlusIcon from 'src/components/Icon/Plus'
import { Team } from 'src/components/Team/types'
import {
  Task as TaskModel,
  TASK_STATUS as ColumnType,
} from 'src/services/task-management/task-management.service'

import useColumnDrop from '../hooks/use-column-drop'
import useColumnTasks from '../hooks/use-column-tasks'
import messages from '../messages'

import Task from './task'

const StyledCircleButton = styled(Circle)`
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: auto;
  max-width: 18px;
  padding: 2px 4px;
  -webkit-transition: max-width 0.5s;
  transition: max-width padding 0.5s;
  .expandbtntext {
    display: none;
    line-height: 0;
  }

  &:hover {
    max-width: 120px;
    gap: 4px;
    .expandbtntext {
      display: block;
      white-space: nowrap;
    }
  }

  > div {
    font-size: 0.8em;
    display: flex;
    align-items: center;
  }
`

const ColumnColorScheme: Record<ColumnType, string> = {
  PENDING: 'new-gray.600',
  TO_DO: 'yellow.600',
  DOING: 'green.500',
  DONE: 'brand.500',
}

const headerColumnMessage = new Map([
  [ColumnType.PENDING, messages.pendingColumnHeading],
  [ColumnType.TO_DO, messages.todoColumnHeading],
  [ColumnType.DOING, messages.doingColumnHeading],
  [ColumnType.DONE, messages.doneColumnHeading],
])

type ColumnProperties = {
  column: ColumnType
  teamId: Team['id']
  tasks: TaskModel[]
}

const Column = ({ column, teamId, tasks }: ColumnProperties) => {
  const intl = useIntl()
  const header = headerColumnMessage.get(column)

  const { addEmptyTask, deleteTask, dropTaskFrom, swapTasks, updateTask } = useColumnTasks(
    column,
    teamId,
  )

  const { dropReference, isOver } = useColumnDrop(column, dropTaskFrom)

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDropHover={swapTasks}
      onUpdate={updateTask}
      onDelete={deleteTask}
    />
  ))

  return (
    <Box>
      <HStack alignItems="center" mb={4} justifyContent="space-between">
        <Heading fontSize="md" letterSpacing="wide">
          {header && (
            <Badge
              py={1}
              px={3}
              borderRadius={100}
              backgroundColor={ColumnColorScheme[column]}
              color="white"
              textTransform="uppercase"
            >
              {intl.formatMessage(header)}
            </Badge>
          )}
        </Heading>
        <StyledCircleButton
          _hover={{ backgroundColor: 'brand.200' }}
          cursor="pointer"
          border="1.5px solid"
          borderColor="brand.500"
          onClick={addEmptyTask}
        >
          <Box>
            <PlusIcon desc="1231" w="0.6em" fill="brand.500" stroke="brand.500" />
          </Box>
          <Text className="expandbtntext" color="brand.500" fontWeight="500">
            {intl.formatMessage(messages.addTaskButton)}
          </Text>
        </StyledCircleButton>
      </HStack>
      <Stack
        ref={dropReference}
        direction={{ base: 'row', md: 'column' }}
        minH="md"
        h="full"
        py={4}
        mt={2}
        spacing={4}
        rounded="lg"
        overflow="auto"
        bgColor={isOver ? 'brand.50' : 'none'}
      >
        {ColumnTasks}
      </Stack>
    </Box>
  )
}

export default Column
