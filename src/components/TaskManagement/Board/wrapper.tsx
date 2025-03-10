import { Stack, Container, SimpleGrid, Spinner, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useRecoilValue } from 'recoil'

import CustomAvatarGroup from 'src/components/Base/DynamicAvatarGroup/custom-avatar-group'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import {
  Task,
  TASK_STATUS as ColumnType,
} from 'src/services/new-task-management/new-task-management.service'
import { teamAtomFamily } from 'src/state/recoil/team'

import { useTeamTasksData } from '../hooks/new-task/use-get-team-tasks'

import TaskColumnComponent from './components/column'
import loadOwnersAndSupportTeam from './hooks/use-load-owners-and-support-team'

type BoardWrapperProperties = {
  readonly teamId: Team['id']
  readonly searchTaskInput?: string
  isSpinnerLoading?: boolean
}

const BoardWrapper = ({ teamId, searchTaskInput, isSpinnerLoading }: BoardWrapperProperties) => {
  const router = useRouter()

  const { data: boardData, isError, isFetching, refetch } = useTeamTasksData(teamId, router.query)

  useEffect(() => {
    if (router.isReady) {
      refetch()
    }
  }, [router, refetch])

  const [selectedUser, setSelectedUser] = useState<string>()
  const [ownersAndSupportTeamMembers, setOwnersAndSupportTeamTask] = useState<User[]>([])

  const team = useRecoilValue(teamAtomFamily(teamId))

  const tasks = useMemo(
    () => ({
      pending: boardData?.filter((task) => task.status === ColumnType.pending) ?? [],
      toDo: boardData?.filter((task) => task.status === ColumnType.toDo) ?? [],
      doing: boardData?.filter((task) => task.status === ColumnType.doing) ?? [],
      done: boardData?.filter((task) => task.status === ColumnType.done) ?? [],
    }),
    [boardData],
  )

  useEffect(() => {
    const ownersAndSupportTeam = loadOwnersAndSupportTeam(tasks)
    setOwnersAndSupportTeamTask(ownersAndSupportTeam)
  }, [setOwnersAndSupportTeamTask, tasks])

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

  return isFetching && isSpinnerLoading ? (
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
              tasks={filteredTasks[ColumnType.pending]}
              teamID={teamId}
            />
            <TaskColumnComponent
              column={ColumnType.toDo}
              tasks={filteredTasks[ColumnType.toDo]}
              teamID={teamId}
            />
            <TaskColumnComponent
              column={ColumnType.doing}
              tasks={filteredTasks[ColumnType.doing]}
              teamID={teamId}
            />
            <TaskColumnComponent
              column={ColumnType.done}
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
