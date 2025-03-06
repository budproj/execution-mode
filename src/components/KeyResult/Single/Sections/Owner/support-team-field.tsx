import { useMutation } from '@apollo/client'
import { Text, Flex, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { DynamicAvatarGroup } from 'src/components/Base'
import PlusIcon from 'src/components/Icon/Plus'
import GET_KEY_RESULTS_HIGHLIGHTS from 'src/components/Page/Team/Highlights/get-key-results-highlights.gql'
import GET_NO_RELATED_MEMBERS from 'src/components/Page/Team/Highlights/hooks/getNoRelatedMembers/get-no-related-members.gql'
import { User } from 'src/components/User/types'
import { Except } from 'src/helpers/except'
import { Task } from 'src/services/new-task-management/new-task-management.service'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { ownersAndSupportTeamTaskAtom } from 'src/state/recoil/task-management/board/owners-and-support-team-task'
import { taskSupportTeamAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-support-team'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'
import queries from './queries.gql'
import { SupportTeamPopover } from './support-team-popover'

type SupportTeamFieldProperties = {
  readonly supportTeamMembers?: User[]
  readonly hasPermitionToUpdate?: boolean
  readonly keyResultId?: string
  readonly ownerName?: string
  readonly isFromTask?: boolean
  readonly updateTask?: (
    id: string,
    teamId: string,
    updatedTask: Except<Partial<Task>, 'id'>,
  ) => void
  readonly task?: Task
  teamMembers?: User[]
}

export const SupportTeamField = ({
  supportTeamMembers,
  hasPermitionToUpdate,
  keyResultId,
  ownerName,
  isFromTask,
  updateTask,
  task,
  teamMembers,
}: SupportTeamFieldProperties) => {
  const intl = useIntl()
  const teamId = useRecoilValue(selectedTeamIdHighlight)

  const [taskSupportTeamMembers, setTaskSupportTeam] = useRecoilState(taskSupportTeamAtom)
  const setOwnersAndSupportTeamTask = useSetRecoilState(ownersAndSupportTeamTaskAtom)
  const supportTeam = isFromTask ? [...taskSupportTeamMembers] : supportTeamMembers

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => hasPermitionToUpdate && setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultId))
  const [addUserToSupportTeam] = useMutation(queries.ADD_USER, {
    onCompleted: (data) =>
      setKeyResult({
        ...keyResult,
        ...data.addUserAsSupportTeamToKeyResult,
      }),
    refetchQueries: [
      {
        query: GET_NO_RELATED_MEMBERS,
        variables: { teamId },
      },
      {
        query: GET_KEY_RESULTS_HIGHLIGHTS,
        variables: { teamId },
      },
    ],
  })

  const addUser = (userId: string) => {
    if (isFromTask && task) {
      onAddSupportTeamInTask(userId)
      handleClose()
      return
    }

    void addUserToSupportTeam({ variables: { keyResultId, userId } })
    handleClose()
  }

  const [removeUserToSupportTeam] = useMutation(queries.REMOVE_USER, {
    onCompleted: (data) =>
      setKeyResult({
        ...keyResult,
        ...data.removeUserAsSupportTeamToKeyResult,
      }),

    refetchQueries: [
      {
        query: GET_NO_RELATED_MEMBERS,
        variables: { teamId },
      },
      {
        query: GET_KEY_RESULTS_HIGHLIGHTS,
        variables: { teamId },
      },
    ],
  })

  const removeUser = (userId: string) => {
    if (isFromTask && task) {
      onRemoveSupportTeamInTask(userId)
      handleClose()
      return
    }

    void removeUserToSupportTeam({ variables: { keyResultId, userId } })
    handleClose()
  }

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => hasPermitionToUpdate && setIsHovering(true)
  const handleMouseLeave = () => hasPermitionToUpdate && setIsHovering(false)

  const isLoaded = Boolean(supportTeam)

  const onAddSupportTeamInTask = useCallback(
    (userID: string) => {
      const supportTeamIds = taskSupportTeamMembers.map((member) => member.id)
      const newSupportTeam = [...supportTeamIds, userID]
      const newTaskWithSupportTeam: Partial<Task> = {
        supportTeam: newSupportTeam,
      }

      if (updateTask && task) {
        updateTask(task.id, teamId, { id: task.id, ...newTaskWithSupportTeam })
      }

      const member = teamMembers?.find((member) => member.id === userID)

      if (teamMembers && member) {
        setTaskSupportTeam(teamMembers?.filter((member) => newSupportTeam.includes(member.id)))
        setOwnersAndSupportTeamTask((owners) => [...owners, member])
      }

      handleClose()
    },
    [
      setOwnersAndSupportTeamTask,
      setTaskSupportTeam,
      task,
      taskSupportTeamMembers,
      teamMembers,
      updateTask,
      teamId,
    ],
  )

  const onRemoveSupportTeamInTask = useCallback(
    (userID: string) => {
      const supportTeamIds = taskSupportTeamMembers.map((member) => member.id)

      const newSupportTeam = supportTeamIds.filter((member) => member !== userID)
      const newTaskWithSupportTeam: Partial<Task> = {
        supportTeam: newSupportTeam,
      }
      if (updateTask && task) {
        updateTask(task.id, teamId, { id: task.id, ...newTaskWithSupportTeam })
      }

      if (teamMembers) {
        setTaskSupportTeam(teamMembers?.filter((member) => newSupportTeam.includes(member.id)))
      }

      handleClose()
    },
    [setTaskSupportTeam, task, taskSupportTeamMembers, teamMembers, updateTask, teamId],
  )

  return (
    <Popover
      isLazy
      placement="bottom-start"
      isOpen={isOpen}
      size="md"
      onOpen={handleOpen}
      onClose={handleClose}
    >
      {isFromTask ? (
        <Text color="gray.500" fontWeight={700} marginBottom="8px">
          TIME DE APOIO
        </Text>
      ) : (
        <KeyResultSectionHeading>
          {intl.formatMessage(messages.supportTeam)}
        </KeyResultSectionHeading>
      )}
      <PopoverTrigger>
        <Flex
          direction="row"
          flexWrap="nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <DynamicAvatarGroup users={supportTeam ?? []} isLoaded={isLoaded} />
          {isLoaded && hasPermitionToUpdate && (
            <Flex alignItems="center">
              <Flex
                w={12}
                h={12}
                marginRight="0.5em"
                justifyContent="center"
                alignItems="center"
                background="new-gray.200"
                borderColor={isHovering ? 'brand.500' : 'new-gray.500'}
                borderRadius="full"
                borderWidth={2}
                borderStyle="dashed"
              >
                <PlusIcon
                  w="0.6em"
                  h="0.6em"
                  fill={isHovering ? 'brand.500' : 'new-gray.500'}
                  desc={intl.formatMessage(messages.addSupportTeam)}
                />
              </Flex>
              <Text color={isHovering ? 'brand.500' : 'new-gray.700'}>
                {supportTeam?.length ? '' : intl.formatMessage(messages.add)}
              </Text>
            </Flex>
          )}
        </Flex>
      </PopoverTrigger>
      <PopoverContent width="md" h="full">
        <SupportTeamPopover
          supportTeamMembers={supportTeam}
          addUser={addUser}
          removeUser={removeUser}
          ownerName={ownerName}
        />
      </PopoverContent>
    </Popover>
  )
}
