import { Badge, Box, Button, Circle, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useResetRecoilState } from 'recoil'

import PlusIcon from 'src/components/Icon/Plus'
import {
  Task,
  Task as TaskModel,
  TASK_STATUS as ColumnType,
} from 'src/services/task-management/task-management.service'
import { taskDrawerAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer'

import { BOARD_DOMAIN } from '../../hooks/use-team-tasks-board-data'
import useColumnDrop from '../hooks/use-column-drop'
import useColumnTasks from '../hooks/use-column-tasks'
import messages from '../messages'
import { ColumnColorScheme, headerColumnMessage } from '../utils/helpers'

import ArchiveAndDeleteMenu from './archive-and-delete-menu'
import TaskCardComponent from './task'

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

type ColumnProperties = {
  readonly column: ColumnType
  readonly boardID: string
  readonly tasks: TaskModel[]
  readonly teamID: string
  readonly order: string[]
  handleArchive?: (task: Task) => void
}

const TaskColumnComponent = ({
  column,
  boardID,
  tasks,
  teamID,
  order,
  handleArchive,
}: ColumnProperties) => {
  const intl = useIntl()
  const header = headerColumnMessage.get(column)

  const resetTaskDrawer = useResetRecoilState(taskDrawerAtom)

  const {
    openInsertDrawerTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
    updateTask,
    columnTasks,
    setColumnTasks,
  } = useColumnTasks(column, boardID, BOARD_DOMAIN.TEAM, teamID)

  const { dropReference, isOver } = useColumnDrop(column, dropTaskFrom)

  const tasksInOrder = useMemo(() => {
    const taskMap = new Map(tasks.map((task) => [task._id, task]))

    const reorderedTasks = order
      .map((id) => taskMap.get(id))
      .filter((task): task is TaskModel => Boolean(task))

    return reorderedTasks
  }, [order, tasks])

  const ColumnTasksComponents = columnTasks.map((task, index) => (
    <TaskCardComponent
      key={task._id}
      task={task}
      index={index}
      onDropHover={swapTasks}
      onUpdate={updateTask}
      onDelete={deleteTask}
      onArchive={handleArchive}
    />
  ))

  const handleAddNewTaskClickButton = () => {
    openInsertDrawerTask()
    resetTaskDrawer()
  }

  useEffect(() => {
    setColumnTasks(tasksInOrder)
  }, [setColumnTasks, tasksInOrder])

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
        <Flex gap="5px" alignItems="center">
          <StyledCircleButton
            _hover={{ backgroundColor: 'brand.100' }}
            cursor="pointer"
            border="1.5px solid"
            borderColor="brand.500"
            maxHeight="18px"
            onClick={handleAddNewTaskClickButton}
          >
            <Box>
              <PlusIcon desc="1231" w="0.6em" fill="blue" stroke="brand.500" />
            </Box>
            <Text className="expandbtntext" color="brand.500" fontWeight="500">
              {intl.formatMessage(messages.addTaskButton)}
            </Text>
          </StyledCircleButton>
          <ArchiveAndDeleteMenu boardDomain={BOARD_DOMAIN.TEAM} teamId={teamID} ids={order} />
        </Flex>
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
        {ColumnTasksComponents}
        {ColumnTasksComponents.length > 0 && (
          <Button
            fontSize={14}
            color="brand.500"
            fontWeight="bold"
            _hover={{ color: 'brand.300' }}
            onClick={handleAddNewTaskClickButton}
          >
            + Nova Tarefa
          </Button>
        )}
      </Stack>
    </Box>
  )
}

export default TaskColumnComponent
