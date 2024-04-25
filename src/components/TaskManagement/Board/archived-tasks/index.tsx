/* eslint-disable @typescript-eslint/no-empty-function */
import { Stack, Container, SimpleGrid, Spinner, Box, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Team } from 'src/components/Team/types'
import { Task } from 'src/services/task-management/task-management.service'

import { useRemoveTaskMutate } from '../../hooks/use-remove-task-mutate'
import { BOARD_DOMAIN, useTeamTasksBoardData } from '../../hooks/use-team-tasks-board-data'
import TaskCardComponent from '../components/task'

type ArchivedTasksProperties = {
  readonly teamId: Team['id']
  readonly searchTaskInput?: string
  handleArchive?: (task: Task) => void
}

const ArchivedTasksWrapper = ({
  teamId,
  searchTaskInput,
  handleArchive,
}: ArchivedTasksProperties) => {
  const { data: boardData, isError, isFetching } = useTeamTasksBoardData(teamId, true)

  const { mutate: removeTaskMutate } = useRemoveTaskMutate(BOARD_DOMAIN.TEAM, teamId)

  const filteredTasks = useMemo(() => {
    return searchTaskInput
      ? boardData?.tasks
          .filter((task) =>
            task.title.toLocaleLowerCase().includes(searchTaskInput.toLocaleLowerCase()),
          )
          .reverse()
      : boardData?.tasks.reverse()
  }, [boardData?.tasks, searchTaskInput])

  if (isError || !boardData) {
    console.error('Error fetching board data', isError)
    return (
      <Box width="100%">
        <Spinner size="xl" />
      </Box>
    )
  }

  return isFetching ? (
    <Spinner />
  ) : (
    <Stack w="100%" spacing={8}>
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="100%" paddingInlineEnd={0} padding={0}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 6 }}>
            {filteredTasks ? (
              filteredTasks.map((task, index) => (
                <TaskCardComponent
                  key={task._id}
                  task={task}
                  index={index}
                  isActive={false}
                  onArchive={handleArchive}
                  onDropHover={() => {}}
                  onUpdate={() => {}}
                  onDelete={() => removeTaskMutate(task._id)}
                />
              ))
            ) : (
              <Text> Não há nenhuma tarefa arquivada.</Text>
            )}
          </SimpleGrid>
        </Container>
      </DndProvider>
    </Stack>
  )
}

export default ArchivedTasksWrapper
