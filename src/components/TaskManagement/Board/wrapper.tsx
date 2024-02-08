import { Stack, Container, SimpleGrid } from '@chakra-ui/react'
import React, { useCallback, useMemo, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useRecoilValue } from 'recoil'

import CustomAvatarGroup from 'src/components/Base/DynamicAvatarGroup/custom-avatar-group'
import { Team } from 'src/components/Team/types'
import {
  Task,
  TASK_STATUS as ColumnType,
} from 'src/services/task-management/task-management.service'
import { teamAtomFamily } from 'src/state/recoil/team'

import { useTeamTasksBoardData } from '../hooks/use-team-tasks-board-data'

import Column from './components/column'
import useLoadUsers from './hooks/use-load-users'

type BoardWrapperProperties = {
  teamId: Team['id']
  searchTaskInput?: string
}

const BoardWrapper = ({ teamId, searchTaskInput }: BoardWrapperProperties) => {
  const { data: boardData, isError } = useTeamTasksBoardData(teamId)

  const [selectedUser, setSelectedUser] = useState<string>()
  const ownersAndSupportTeamMembers = useLoadUsers(teamId)
  const team = useRecoilValue(teamAtomFamily(teamId))

  const tasks = useMemo(
    () => ({
      pending: boardData?.tasks.filter((task) => task.status === ColumnType.pending) ?? [],
      toDo: boardData?.tasks.filter((task) => task.status === ColumnType.toDo) ?? [],
      doing: boardData?.tasks.filter((task) => task.status === ColumnType.doing) ?? [],
      done: boardData?.tasks.filter((task) => task.status === ColumnType.done) ?? [],
    }),
    [boardData],
  )

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
    return <div>Error fetching board data</div>
  }

  return (
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
            <Column
              column={ColumnType.pending}
              boardID={boardData._id}
              tasks={filteredTasks[ColumnType.pending]}
              teamID={teamId}
            />
            <Column
              column={ColumnType.toDo}
              boardID={boardData._id}
              tasks={filteredTasks[ColumnType.toDo]}
              teamID={teamId}
            />
            <Column
              column={ColumnType.doing}
              boardID={boardData._id}
              tasks={filteredTasks[ColumnType.doing]}
              teamID={teamId}
            />
            <Column
              column={ColumnType.done}
              boardID={boardData._id}
              tasks={filteredTasks[ColumnType.done]}
              teamID={teamId}
            />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </Stack>
  )
}

export default BoardWrapper
