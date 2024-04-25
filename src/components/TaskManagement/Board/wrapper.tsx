import { Stack, Container, SimpleGrid, Spinner, Box } from '@chakra-ui/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import CustomAvatarGroup from 'src/components/Base/DynamicAvatarGroup/custom-avatar-group'
import { Team } from 'src/components/Team/types'
import {
  Task,
  TASK_STATUS as ColumnType,
} from 'src/services/task-management/task-management.service'
import { ownersAndSupportTeamTaskAtom } from 'src/state/recoil/task-management/board/owners-and-support-team-task'
import { teamAtomFamily } from 'src/state/recoil/team'
import { usersCompany } from 'src/state/recoil/team/users-company'

import { useTeamTasksBoardData } from '../hooks/use-team-tasks-board-data'

import TaskColumnComponent from './components/column'
import loadOwnersAndSupportTeam from './hooks/use-load-owners-and-support-team'

type BoardWrapperProperties = {
  readonly teamId: Team['id']
  readonly searchTaskInput?: string
  handleArchive?: (task: Task) => void
}

const BoardWrapper = ({ teamId, searchTaskInput, handleArchive }: BoardWrapperProperties) => {
  const { data: boardData, isError, isFetching } = useTeamTasksBoardData(teamId)

  const [selectedUser, setSelectedUser] = useState<string>()
  const team = useRecoilValue(teamAtomFamily(teamId))
  const companyUsers = useRecoilValue(usersCompany)
  const setOwnersAndSupportTeamTask = useSetRecoilState(ownersAndSupportTeamTaskAtom)
  const ownersAndSupportTeamMembers = useRecoilValue(ownersAndSupportTeamTaskAtom)

  const tasks = useMemo(
    () => ({
      pending: boardData?.tasks.filter((task) => task.status === ColumnType.pending) ?? [],
      toDo: boardData?.tasks.filter((task) => task.status === ColumnType.toDo) ?? [],
      doing: boardData?.tasks.filter((task) => task.status === ColumnType.doing) ?? [],
      done: boardData?.tasks.filter((task) => task.status === ColumnType.done) ?? [],
    }),
    [boardData],
  )
  useEffect(() => {
    const ownersAndSupportTeam = loadOwnersAndSupportTeam(tasks, companyUsers)
    setOwnersAndSupportTeamTask(ownersAndSupportTeam)
  }, [companyUsers, setOwnersAndSupportTeamTask, tasks])

  const handleSelectUser = useCallback((userId: string) => {
    setSelectedUser((previousSelectedUser) => {
      if (previousSelectedUser === userId) return
      return userId
    })
  }, [])

  const filteredTasks = useMemo(
    () =>
      Object.values(ColumnType).reduce(
        (accumulator: { [key in ColumnType]: Task[] }, columnType: ColumnType) => {
          const columnTasks = selectedUser
            ? tasks[columnType].filter((task) => task.owner === selectedUser)
            : tasks[columnType]

          const columTasksByContent = searchTaskInput
            ? columnTasks.filter((task) =>
                task.title.toLocaleLowerCase().includes(searchTaskInput.toLocaleLowerCase()),
              )
            : columnTasks
          return { ...accumulator, [columnType]: columTasksByContent }
        },
        {
          [ColumnType.pending]: [],
          [ColumnType.toDo]: [],
          [ColumnType.doing]: [],
          [ColumnType.done]: [],
        },
      ),
    [searchTaskInput, selectedUser, tasks],
  )

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
      <CustomAvatarGroup
        max={5}
        selectedUserId={selectedUser}
        teamOwnerId={ownersAndSupportTeamMembers.find((user) => user.id === team?.ownerId)?.id}
        users={ownersAndSupportTeamMembers}
        onSelectUser={handleSelectUser}
      />
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="100%" paddingInlineEnd={0} padding={0}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 6 }}>
            <TaskColumnComponent
              column={ColumnType.pending}
              boardID={boardData._id}
              tasks={filteredTasks[ColumnType.pending]}
              teamID={teamId}
              order={boardData.order[ColumnType.pending]}
              handleArchive={handleArchive}
            />
            <TaskColumnComponent
              column={ColumnType.toDo}
              boardID={boardData._id}
              tasks={filteredTasks[ColumnType.toDo]}
              order={boardData.order[ColumnType.toDo]}
              teamID={teamId}
              handleArchive={handleArchive}
            />
            <TaskColumnComponent
              column={ColumnType.doing}
              boardID={boardData._id}
              tasks={filteredTasks[ColumnType.doing]}
              order={boardData.order[ColumnType.doing]}
              teamID={teamId}
              handleArchive={handleArchive}
            />
            <TaskColumnComponent
              column={ColumnType.done}
              boardID={boardData._id}
              tasks={filteredTasks[ColumnType.done]}
              order={boardData.order[ColumnType.done]}
              teamID={teamId}
              handleArchive={handleArchive}
            />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </Stack>
  )
}

export default BoardWrapper
