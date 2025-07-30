import { Text, Flex, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { DynamicAvatarGroup } from 'src/components/Base'
import PlusIcon from 'src/components/Icon/Plus'
import { User } from 'src/components/User/types'
import { Except } from 'src/helpers/except'
import { TaskUpdate } from 'src/services/task-management/@types/task-update.type'
import { Task } from 'src/services/task-management/@types/task.type'

import { SupportTeamPopover } from './SupportTeamPopOver'
import messages from './locale/messages'

type SupportTeamFieldProperties = {
  readonly hasPermitionToUpdate?: boolean
  readonly ownerName?: string
  readonly updateTask?: (id: string, updatedTask: Except<Partial<TaskUpdate>, 'id'>) => void
  readonly task?: Task
  teamMembers?: User[]
}

export const SupportTeamField = ({
  hasPermitionToUpdate,
  ownerName,
  updateTask,
  task,
  teamMembers,
}: SupportTeamFieldProperties) => {
  const intl = useIntl()

  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [supportTeam, setSupportTeam] = useState<User[]>()

  useEffect(() => {
    if (task?.supportTeam) {
      setSupportTeam([...task.supportTeam])
      setIsLoaded(true)
    }
  }, [task])

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => hasPermitionToUpdate && setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const addUser = (userId: string) => {
    onAddSupportTeamInTask(userId)
    handleClose()
  }

  const removeUser = (userId: string) => {
    onRemoveSupportTeamInTask(userId)
    handleClose()
  }

  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => hasPermitionToUpdate && setIsHovering(true)
  const handleMouseLeave = () => hasPermitionToUpdate && setIsHovering(false)

  const onAddSupportTeamInTask = useCallback(
    (userID: string) => {
      const supportTeamIds = supportTeam?.map((member) => member.id) ?? []
      const newSupportTeam = [...supportTeamIds, userID]
      const newTaskWithSupportTeam: Partial<TaskUpdate> = {
        supportTeam: newSupportTeam,
      }

      if (updateTask && task) {
        updateTask(task.id, { id: task.id, ...newTaskWithSupportTeam })
      }

      const member = teamMembers?.find((member) => member.id === userID)

      if (teamMembers && member) {
        setSupportTeam(teamMembers?.filter((member) => newSupportTeam.includes(member.id)))
      }

      handleClose()
    },
    [supportTeam, setSupportTeam, task, teamMembers, updateTask],
  )

  const onRemoveSupportTeamInTask = useCallback(
    (userID: string) => {
      const supportTeamIds = supportTeam?.map((member) => member.id) ?? []

      const newSupportTeam = supportTeamIds.filter((member) => member !== userID)
      const newTaskWithSupportTeam: Partial<TaskUpdate> = {
        supportTeam: newSupportTeam,
      }

      if (updateTask && task) {
        updateTask(task.id, { id: task.id, ...newTaskWithSupportTeam })
      }

      if (teamMembers) {
        setSupportTeam(teamMembers?.filter((member) => newSupportTeam.includes(member.id)))
      }

      handleClose()
    },
    [supportTeam, setSupportTeam, task, teamMembers, updateTask],
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
      <Text color="gray.500" fontWeight={700} marginBottom="8px" textTransform="uppercase">
        {intl.formatMessage(messages.supportTeam)}
      </Text>
      <PopoverTrigger>
        <Flex
          direction="row"
          flexWrap="nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isLoaded && hasPermitionToUpdate && (
            <>
              <DynamicAvatarGroup users={supportTeam ?? []} isLoaded={isLoaded} />
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
            </>
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
