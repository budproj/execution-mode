import { Badge, Box, Circle, Heading, HStack, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import PlusIcon from 'src/components/Icon/Plus'

import useColumnDrop from '../hooks/use-column-drop'
import useColumnTasks from '../hooks/use-column-tasks'
import messages from '../messages'
import { ColumnType } from '../utils/enums'

import Task from './task'

const ColumnColorScheme: Record<ColumnType, string> = {
  Pending: 'new-gray.600',
  ToDo: 'yellow.600',
  Doing: 'green.500',
  Done: 'brand.500',
}

const headerColumnMessage = new Map([
  [ColumnType.PENDING, messages.pendingColumnHeading],
  [ColumnType.TO_DO, messages.todoColumnHeading],
  [ColumnType.DOING, messages.doingColumnHeading],
  [ColumnType.DONE, messages.doneColumnHeading],
])

const Column = ({ column }: { column: ColumnType }) => {
  const intl = useIntl()
  const header = headerColumnMessage.get(column)

  const { tasks, addEmptyTask, deleteTask, dropTaskFrom, swapTasks, updateTask } =
    useColumnTasks(column)

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
        <Circle
          _hover={{ backgroundColor: 'brand.200' }}
          cursor="pointer"
          border="1.5px solid"
          borderColor="brand.500"
          size={6}
          onClick={addEmptyTask}
        >
          <PlusIcon desc="1231" w="0.6em" fill="brand.500" stroke="brand.500" />
        </Circle>
      </HStack>
      <Stack
        ref={dropReference}
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        {ColumnTasks}
      </Stack>
    </Box>
  )
}

export default Column
