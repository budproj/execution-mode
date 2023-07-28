import { useMutation } from '@apollo/client'
import {
  Box,
  Checkbox,
  EditablePreviewProps,
  Flex,
  HStack,
  Skeleton,
  VStack,
  Text,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { EditableInputField } from 'src/components/Base'
import {
  KeyResultCheckMark as KeyResultCheckMarkType,
  KeyResultCheckMarkState,
} from 'src/components/KeyResult/types'
import myTasksQueries from 'src/components/Page/MyThings/ActiveCycles/my-tasks/queries.gql'
import { GraphQLEffect } from 'src/components/types'
import { checkMarkIsBeingRemovedAtom } from 'src/state/recoil/key-result/checklist'

import { EventType } from '../../../../../state/hooks/useEvent/event-type'
import { Feature } from '../../../../../state/hooks/useEvent/feature'
import { useEvent } from '../../../../../state/hooks/useEvent/hook'
import { myselfAtom } from '../../../../../state/recoil/shared/atoms'

import { ChangeAssignedCheckMarkButton } from './ActionButtons/change-assigned'
import { DeleteCheckMarkButton } from './ActionButtons/delete-checkmark'
import queries from './queries.gql'

interface KeyResultCheckMarkProperties {
  keyResultID?: string
  draftCheckMarks?: string[]
  node?: Partial<KeyResultCheckMarkType>
  onUpdate?: () => void
  index?: number
  checklistLength?: number
  onCreate?: () => void
  isEditable?: boolean
  checkPolicy?: boolean
}

const StyledKeyResultCheckMark = styled(HStack)`
  & .deleteCheckMarkButton {
    opacity: 0;
  }

  &:hover .deleteCheckMarkButton {
    opacity: 1;
  }
`

export const KeyResultCheckMark = ({
  keyResultID,
  node,
  onUpdate,
  draftCheckMarks,
  index,
  checklistLength,
  onCreate,
  isEditable = true,
  checkPolicy = true,
}: KeyResultCheckMarkProperties) => {
  const { dispatch: dispatchToggleEvent } = useEvent(EventType.TOGGLED_KEY_RESULT_CHECK_MARK, {
    feature: Feature.CHECK_MARK,
  })
  const { dispatch: dispatchUpdateTitleEvent } = useEvent(
    EventType.UPDATED_KEY_RESULT_CHECK_MARK_TITLE,
    {
      feature: Feature.CHECK_MARK,
    },
  )
  const [isEditing, setIsEditing] = useState(false)
  const [isChecked, setIsChecked] = useState(node?.state === KeyResultCheckMarkState.CHECKED)
  const checkmarkIsBeingRemoved = useRecoilValue(checkMarkIsBeingRemovedAtom(node?.id))
  const removeCheckmarkButton = useRef<HTMLButtonElement>(null)
  const myself = useRecoilValue(myselfAtom)
  const [toggleCheckMark, { loading: isToggling }] = useMutation(queries.TOGGLE_CHECK_MARK, {
    variables: {
      id: node?.id,
    },
    onCompleted: (data) => {
      setIsChecked(data.toggleCheckMark.state === KeyResultCheckMarkState.CHECKED)
      if (onUpdate) onUpdate()
    },
  })
  const [updateCheckMarkDescription, { loading: isUpdatingDescription }] = useMutation(
    queries.UPDATE_CHECK_MARK_DESCRIPTION,
    {
      refetchQueries: [
        myTasksQueries.GET_KRS_WITH_MY_CHECKMARKS,
        {
          variables: {
            ...(myself?.id ? { userID: myself?.id } : {}),
          },
        },
      ],
      onCompleted: () => {
        if (onUpdate) onUpdate()
      },
    },
  )

  const isLoaded = Boolean(node)
  const isDraft = typeof node?.id === 'undefined' ? false : draftCheckMarks?.includes(node.id)
  const isWaiting = isToggling || isUpdatingDescription || checkmarkIsBeingRemoved

  const canUpdate = checkPolicy ? node?.policy?.update === GraphQLEffect.ALLOW : true
  const canDelete = checkPolicy ? node?.policy?.delete === GraphQLEffect.ALLOW : true

  const handleChange = async () => {
    dispatchToggleEvent({
      keyResultID,
      checkMarkID: node?.id,
      previousState: isChecked
        ? KeyResultCheckMarkState.CHECKED
        : KeyResultCheckMarkState.UNCHECKED,
      newState: isChecked ? KeyResultCheckMarkState.UNCHECKED : KeyResultCheckMarkState.CHECKED,
    })

    await toggleCheckMark()
  }

  const handleNewCheckMarkDescription = async (description: string) => {
    const isEmpty = !description || description.trim() === ''

    if (isEmpty) removeCheckmarkButton.current?.click()

    if (!isEmpty && node?.description !== description)
      await updateCheckMarkDescription({
        variables: {
          id: node?.id,
          description,
        },
      })

    if (description !== node?.description)
      dispatchUpdateTitleEvent({
        keyResultID,
        checkMarkID: node?.id,
        newTitleLength: description.length,
      })
  }

  const handleCancelDescription = (oldDescription?: string) => {
    const isEmpty = !oldDescription || oldDescription.trim() === ''
    if (isEmpty) removeCheckmarkButton.current?.click()
  }

  const handleEnterKey = (value?: string) => {
    const isEmpty = !value || value.trim() === ''
    if (
      typeof index !== 'undefined' &&
      checklistLength &&
      index === checklistLength - 1 &&
      !isEmpty &&
      onCreate
    )
      onCreate()
  }

  const handleStartEdit = () => {
    if (isEditable) setIsEditing(true)
  }

  const handleStopEdit = () => {
    if (isEditable) setIsEditing(false)
  }

  const checkedProperties: EditablePreviewProps = {
    color: 'new-gray.800',
    textDecoration: 'line-through',
  }

  useEffect(() => {
    setIsChecked(node?.state === KeyResultCheckMarkState.CHECKED)
  }, [node?.state, setIsChecked])

  return (
    <Skeleton isLoaded={isLoaded} w="full" fadeDuration={0}>
      <StyledKeyResultCheckMark alignItems="center">
        <Box py={1} display={isEditing ? 'none' : undefined}>
          <Checkbox
            isChecked={isChecked}
            isDisabled={isWaiting || !canUpdate}
            onChange={handleChange}
          />
        </Box>
        <VStack marginLeft={0} spacing={0} align="stretch" w="full">
          <EditableInputField
            autoFocus={isDraft}
            isWaiting={isWaiting}
            value={node?.description}
            isLoaded={isLoaded}
            startWithEditView={isDraft}
            isDisabled={!isEditable || !canUpdate}
            previewProperties={isChecked ? checkedProperties : undefined}
            onSubmit={handleNewCheckMarkDescription}
            onCancel={handleCancelDescription}
            onPressedEnter={handleEnterKey}
            onStartEdit={handleStartEdit}
            onStopEdit={handleStopEdit}
          />
          <Text
            fontSize="sm"
            color="new-gray.600"
            display={isEditing ? 'none' : undefined}
            lineHeight="0.7rem"
          >
            {node?.assignedUser?.fullName}
          </Text>
        </VStack>
        <Flex gap={2} alignItems="center" display={isEditing ? 'none' : undefined}>
          <DeleteCheckMarkButton
            buttonRef={removeCheckmarkButton}
            className="deleteCheckMarkButton"
            keyResultID={keyResultID}
            checkMarkID={node?.id}
            canDelete={canDelete}
            onDelete={onUpdate}
          />
          <ChangeAssignedCheckMarkButton
            keyResultID={keyResultID}
            checkMarkId={node?.id}
            assignedUserId={node?.assignedUser?.id}
            canUpdate={checkPolicy ? canUpdate : false}
            onUpdate={onUpdate}
          />
        </Flex>
      </StyledKeyResultCheckMark>
    </Skeleton>
  )
}
