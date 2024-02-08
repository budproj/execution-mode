import { Badge, Box, Button, Circle, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useIntl } from 'react-intl'

import PlusIcon from 'src/components/Icon/Plus'
import {
  Task as TaskModel,
  TASK_STATUS as ColumnType,
} from 'src/services/task-management/task-management.service'

import { BOARD_DOMAIN } from '../../hooks/use-team-tasks-board-data'
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
  pending: 'new-gray.600',
  toDo: 'yellow.600',
  doing: 'green.500',
  done: 'brand.500',
}

const headerColumnMessage = new Map([
  [ColumnType.pending, messages.pendingColumnHeading],
  [ColumnType.toDo, messages.todoColumnHeading],
  [ColumnType.doing, messages.doingColumnHeading],
  [ColumnType.done, messages.doneColumnHeading],
])

type ColumnProperties = {
  column: ColumnType
  boardID: string
  tasks: TaskModel[]
  teamID: string
}

const Column = ({ column, boardID, tasks, teamID }: ColumnProperties) => {
  const intl = useIntl()
  const header = headerColumnMessage.get(column)

  const { addEmptyTask, openInsertDrawerTask, deleteTask, dropTaskFrom, swapTasks, updateTask } =
    useColumnTasks(column, boardID, BOARD_DOMAIN.TEAM, teamID)

  const { dropReference, isOver } = useColumnDrop(column, dropTaskFrom)

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task._id}
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
          _hover={{ backgroundColor: 'brand.100' }}
          cursor="pointer"
          border="1.5px solid"
          borderColor="brand.500"
          onClick={openInsertDrawerTask}
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
        bgColor={isOver ? 'brand.200' : 'none'}
      >
        {ColumnTasks}
        {ColumnTasks.length > 0 && (
          <Button
            fontSize={14}
            color="brand.500"
            fontWeight="bold"
            _hover={{ color: 'brand.300' }}
            onClick={addEmptyTask}
          >
            + Nova Tarefa
          </Button>
        )}
      </Stack>
    </Box>
  )
}

export default Column
