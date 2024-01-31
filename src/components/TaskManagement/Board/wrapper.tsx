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

import { useBoardData } from '../hooks/use-board-data'

import Column from './components/column'
import useLoadUsers from './hooks/use-load-users'
import useTaskCollection from './hooks/use-task-collection'

type BoardWrapperProperties = {
  teamId: Team['id']
  searchTaskInput?: string
}

const BoardWrapper = ({ teamId, searchTaskInput }: BoardWrapperProperties) => {
  const [tasks, _] = useTaskCollection()
  const { data: issoRetornouDoTMS } = useBoardData(teamId)
  const [selectedUser, setSelectedUser] = useState<string>()
  const ownersAndSupportTeamMembers = useLoadUsers(teamId)
  const team = useRecoilValue(teamAtomFamily(teamId))

  console.log({ issoRetornouDoTMS })
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
          [ColumnType.PENDING]: [],
          [ColumnType.TO_DO]: [],
          [ColumnType.DOING]: [],
          [ColumnType.DONE]: [],
        },
      ),
    [searchTaskInput, selectedUser, tasks],
  )

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
              column={ColumnType.PENDING}
              teamId={teamId}
              tasks={filteredTasks[ColumnType.PENDING]}
            />
            <Column
              column={ColumnType.TO_DO}
              teamId={teamId}
              tasks={filteredTasks[ColumnType.TO_DO]}
            />
            <Column
              column={ColumnType.DOING}
              teamId={teamId}
              tasks={filteredTasks[ColumnType.DOING]}
            />
            <Column
              column={ColumnType.DONE}
              teamId={teamId}
              tasks={filteredTasks[ColumnType.DONE]}
            />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </Stack>
  )
}

export default BoardWrapper
