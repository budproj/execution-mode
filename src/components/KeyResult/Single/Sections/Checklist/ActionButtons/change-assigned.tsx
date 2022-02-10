import { useMutation } from '@apollo/client'
import { Box, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React, { useState } from 'react'

import { NamedAvatar } from 'src/components/User'
import { AllReachableUsers } from 'src/components/User/AllReachableUsers/wrapper'

import { EventType } from '../../../../../../state/hooks/useEvent/event-type'
import { useEvent } from '../../../../../../state/hooks/useEvent/hook'

import queries from './queries.gql'

interface ChangeAssignedCheckMarkButtonProperties {
  keyResultID?: string
  checkMarkId?: string
  assignedUserId?: string
  canUpdate?: boolean
  onUpdate?: () => void
}

export const ChangeAssignedCheckMarkButton = ({
  keyResultID,
  checkMarkId,
  assignedUserId,
  canUpdate,
  onUpdate,
}: ChangeAssignedCheckMarkButtonProperties) => {
  const { dispatch } = useEvent(EventType.UPDATED_KEY_RESULT_CHECK_MARK_ASSIGNEE)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [changeAssigned] = useMutation(queries.UPDATE_ASSIGNED_CHECKMARK)

  const handleChange = async (newAssignedUserId: string | string[]) => {
    if (Array.isArray(newAssignedUserId)) throw new Error('Cannot parse string array')

    dispatch({
      keyResultID,
      checkMarkID: checkMarkId,
      previousAssigneeUserID: assignedUserId,
      newAssigneeUserID: newAssignedUserId,
    })

    await changeAssigned({
      variables: {
        checkMarkId,
        assignedUserId: newAssignedUserId,
      },
    })

    if (onUpdate) onUpdate()

    onClose()
  }

  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)

  return (
    <Popover placement="bottom-end" size="md" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <PopoverTrigger>
        <Box>
          <NamedAvatar
            userID={assignedUserId}
            avatarSize={8}
            displaySubtitle={false}
            horizontalGap={2}
            nameColor="gray.500"
            showName={false}
            canEdit={canUpdate}
            canHover={canUpdate}
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent width="md" h="full" overflow="hidden">
        <PopoverBody>
          <AllReachableUsers avatarSubtitleType="role" onSelect={handleChange} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
