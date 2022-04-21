import { useMutation } from '@apollo/client'
import {
  Box,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

import myTasksQueries from 'src/components/Page/MyThings/ActiveCycles/my-tasks/queries.gql'
import { NamedAvatar } from 'src/components/User'
import { AllReachableUsers } from 'src/components/User/AllReachableUsers/wrapper'

import { EventType } from '../../../../../../state/hooks/useEvent/event-type'
import { Feature } from '../../../../../../state/hooks/useEvent/feature'
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
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { dispatch } = useEvent(EventType.UPDATED_KEY_RESULT_CHECK_MARK_ASSIGNEE, {
    feature: Feature.CHECK_MARK,
  })

  const [changeAssigned] = useMutation(queries.UPDATE_ASSIGNED_CHECKMARK, {
    refetchQueries: [myTasksQueries.GET_KRS_WITH_MY_CHECKMARKS],
  })

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
  }

  return (
    <Popover
      isLazy
      placement="bottom-end"
      size="md"
      isOpen={canUpdate && isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
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
            isEditting={isOpen}
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
