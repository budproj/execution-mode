import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import HistoryIcon from 'src/components/Icon/History'
import RedoIcon from 'src/components/Icon/Redo'
import ArchivedTasksWrapper from 'src/components/TaskManagement/Board/archived-tasks'
import BoardWrapper from 'src/components/TaskManagement/Board/wrapper'
import { TaskInsertDrawer } from 'src/components/TaskManagement/InsertDrawer/wrapper'
import { TaskDrawer } from 'src/components/TaskManagement/TaskDrawer'
import { BOARD_DOMAIN } from 'src/components/TaskManagement/hooks/use-team-tasks-board-data'
import { useUpdateTaskMutate } from 'src/components/TaskManagement/hooks/use-update-task-mutate'
import { Team } from 'src/components/Team/types'
import { Task } from 'src/services/task-management/task-management.service'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { isArchivedBoardAtom } from 'src/state/recoil/task-management/board/is-archived-board'
import { teamAtomFamily } from 'src/state/recoil/team'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

import messages from './messages'

interface BoardTabContentProperties {
  readonly teamId: Team['id']
  readonly isLoading?: boolean
}

const TasksTabContent = ({ teamId, isLoading }: BoardTabContentProperties) => {
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdHighlight)
  const [isArchivedBoard, setIsArchivedBoard] = useRecoilState(isArchivedBoardAtom)
  const { mutate: updateTaskMutate } = useUpdateTaskMutate(BOARD_DOMAIN.TEAM, teamId)
  const { dispatch: dispatchArchiveTask } = useEvent(EventType.ARCHIVE_TASK)
  const { dispatch: dispatchUnarchiveTask } = useEvent(EventType.UNARCHIVE_TASK)
  const { dispatch: dispatchArchivedTasksButtonClick } = useEvent(
    EventType.ARCHIVED_TASKS_BUTTON_CLICK,
  )
  const { dispatch: dispatchUnarchivedTasksButtonClick } = useEvent(
    EventType.UNARCHIVED_TASKS_BUTTON_CLICK,
  )

  const team = useRecoilValue(teamAtomFamily(teamId))
  const [searchTaskInput, setSearchTaskInput] = useState<string>()

  const intl = useIntl()
  // TODO: remove this
  console.log({ isLoading })

  useEffect(() => {
    setSelectedTeamId(teamId)
  }, [setSelectedTeamId, teamId])

  const handleArchive = (task: Task) => {
    if (isArchivedBoard) {
      dispatchUnarchiveTask({})
    } else {
      dispatchArchiveTask({})
    }

    const updatedTask: Partial<Task> = { _id: task._id, active: Boolean(isArchivedBoard) }
    updateTaskMutate(updatedTask)
  }

  return (
    <Stack direction="column" spacing={8} maxH="100%">
      <HStack width="100%" alignItems="center" justifyContent="space-between">
        <Text color="new-gray.900" fontSize={24} fontWeight="bold">
          {intl.formatMessage(messages.boardTabHeaderTitle, { team: team?.name })}
        </Text>
        <HStack alignItems="center">
          <Box maxW={320} minW={320} w="100%">
            <SearchBar
              placeholder={intl.formatMessage(messages.searchTaskInput)}
              onSearch={setSearchTaskInput}
            />
          </Box>
          <a
            href="https://bit.ly/sugestoestmanager"
            target="_blank"
            style={{ textDecoration: 'none' }}
            rel="noreferrer"
          >
            <Button
              bg="#525F7F"
              color="black.50"
              _hover={{ background: 'brand.400', color: 'black.50' }}
              paddingY={2}
            >
              Dar sugestão
            </Button>
          </a>
          <Button
            bg={isArchivedBoard ? 'brand.500' : 'new-gray.300'}
            _hover={{ background: 'new-gray.400', color: 'new-gray.800' }}
            color={isArchivedBoard ? 'white' : 'new-gray.800'}
            leftIcon={
              isArchivedBoard ? (
                <RedoIcon w="1.3em" h="1.3em" desc="teste" fill="currentColor" />
              ) : (
                <HistoryIcon w="1.3em" h="1.3em" desc="teste" fill="currentColor" />
              )
            }
            paddingY={2}
            width="100%"
            onClick={() => {
              setIsArchivedBoard(!isArchivedBoard)
              if (isArchivedBoard) {
                dispatchUnarchivedTasksButtonClick({})
              } else {
                dispatchArchivedTasksButtonClick({})
              }
            }}
          >
            {isArchivedBoard ? 'Voltar para tarefas ativas' : 'Tarefas arquivadas'}
          </Button>
        </HStack>
      </HStack>
      {isArchivedBoard ? (
        <ArchivedTasksWrapper
          teamId={teamId}
          searchTaskInput={searchTaskInput}
          handleArchive={handleArchive}
        />
      ) : (
        <BoardWrapper
          teamId={teamId}
          searchTaskInput={searchTaskInput}
          handleArchive={handleArchive}
        />
      )}

      <TaskInsertDrawer />
      <TaskDrawer teamId={teamId} />
    </Stack>
  )
}

export default TasksTabContent
