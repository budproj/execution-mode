import { Popover, PopoverTrigger, PopoverContent, Box, Flex, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'

import KeyResultSectionOwner from 'src/components/KeyResult/Single/Sections/Owner/owner'
import { SupportTeamField } from 'src/components/KeyResult/Single/Sections/Owner/support-team-field'
import { KeyResultAvailableOwners } from 'src/components/KeyResult/Single/Sections/Owner/user-list'
import { User } from 'src/components/User/types'
import {
  Task,
  TASK_STATUS as ColumnType,
} from 'src/services/new-task-management/new-task-management.service'

import useColumnTasks from '../../Board/hooks/use-column-tasks'
import { TASK_UPDATES_DATA_KEY } from '../../hooks/use-get-task-updates'
import { BOARD_DOMAIN } from '../../hooks/use-team-tasks-board-data'

interface KeyResultSingleSectionOwnerWrapperProperties {
  readonly ownerId?: string
  readonly column: ColumnType
  readonly boardID: string
  readonly domain: BOARD_DOMAIN
  readonly identifier: string
  readonly task: Task
  teamMembers: User[]
}

export const TaskDrawerSectionOwnerWrapper = ({
  ownerId,
  boardID,
  column,
  domain,
  identifier,
  task,
  teamMembers,
}: KeyResultSingleSectionOwnerWrapperProperties): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const [owner, setOwner] = useState(ownerId)

  const { updateTask } = useColumnTasks(column, boardID, domain, identifier)

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true)
  }

  const handleClose = useCallback(() => {
    if (isOpen) setIsOpen(false)
  }, [isOpen])

  const onSelect = useCallback(
    (userID: string) => {
      const newTaskWithOwner: Partial<Task> = { owner: userID }
      updateTask(task.id, { id: task.id, ...newTaskWithOwner })
      setOwner(userID)
      queryClient.invalidateQueries({ queryKey: [`${TASK_UPDATES_DATA_KEY}:${task.id}`] })
      handleClose()
    },
    [handleClose, queryClient, task.id, updateTask],
  )

  return (
    <Flex direction="row" justifyContent="space-between" marginY="24px">
      <Flex gridGap={2} direction="column" flexGrow={1}>
        <Popover
          isLazy
          placement="bottom-start"
          isOpen={isOpen}
          size="md"
          onOpen={handleOpen}
          onClose={handleClose}
        >
          <Text color="gray.500" fontWeight={700} marginBottom="8px">
            RESPONSÁVEL
          </Text>
          <Flex direction="row">
            <PopoverTrigger>
              <Box>
                <KeyResultSectionOwner ownerId={owner} isEditing={isOpen} />
              </Box>
            </PopoverTrigger>
            <Box flexGrow={1} />
          </Flex>
          <PopoverContent width="md" h="full" overflow="hidden">
            <KeyResultAvailableOwners isFromTask onSelect={onSelect} />
          </PopoverContent>
        </Popover>
      </Flex>
      <Flex gridGap={2} direction="column" flexGrow={1}>
        <SupportTeamField
          isFromTask
          hasPermitionToUpdate
          teamMembers={teamMembers}
          task={task}
          updateTask={updateTask}
        />
      </Flex>
    </Flex>
  )
}
