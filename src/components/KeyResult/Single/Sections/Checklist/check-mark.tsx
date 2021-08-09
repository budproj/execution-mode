import { useMutation } from '@apollo/client'
import { HStack, Checkbox, Skeleton, Box } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { EditableInputField } from 'src/components/Base'
import {
  KeyResultCheckMark as KeyResultCheckMarkType,
  KeyResultCheckMarkState,
} from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { checkMarkIsBeingRemovedAtom } from 'src/state/recoil/key-result/checklist'

import { DeleteCheckMarkButton } from './ActionButtons/delete-checkmark'
import queries from './queries.gql'

interface KeyResultCheckMarkProperties {
  draftCheckMarks?: string[]
  node?: Partial<KeyResultCheckMarkType>
  onUpdate?: () => void
  index?: number
  checklistLength?: number
  onCreate?: () => void
}

export const KeyResultCheckMark = ({
  node,
  onUpdate,
  draftCheckMarks,
  index,
  checklistLength,
  onCreate,
}: KeyResultCheckMarkProperties) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isChecked, setIsChecked] = useState(node?.state === KeyResultCheckMarkState.CHECKED)
  const checkmarkIsBeingRemoved = useRecoilValue(checkMarkIsBeingRemovedAtom(node?.id))
  const removeCheckmarkButton = useRef<HTMLButtonElement>(null)

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
      onCompleted: () => {
        if (onUpdate) onUpdate()
      },
    },
  )

  const isLoaded = Boolean(node)
  const isDraft = typeof node?.id === 'undefined' ? false : draftCheckMarks?.includes(node.id)
  const isWaiting = isToggling || isUpdatingDescription || checkmarkIsBeingRemoved

  const canUpdate = node?.policy?.update === GraphQLEffect.ALLOW
  const canDelete = node?.policy?.delete === GraphQLEffect.ALLOW

  const handleChange = async () => {
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
  }

  const handleCancelDescription = (oldDescription?: string) => {
    const isEmpty = !oldDescription || oldDescription.trim() === ''
    if (isEmpty) removeCheckmarkButton.current?.click()
  }

  const handleMouseEnter = () => {
    if (!isHovering) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (isHovering) setIsHovering(false)
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
    setIsEditing(true)
  }

  const handleStopEdit = () => {
    setIsEditing(false)
  }

  useEffect(() => {
    setIsChecked(node?.state === KeyResultCheckMarkState.CHECKED)
  }, [node?.state, setIsChecked])

  return (
    <Skeleton isLoaded={isLoaded} w="full" fadeDuration={0}>
      <HStack
        alignItems="flex-start"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box py={1}>
          <Checkbox
            isChecked={isChecked}
            isDisabled={isWaiting || !canUpdate}
            onChange={handleChange}
          />
        </Box>
        <EditableInputField
          autoFocus={isDraft}
          isWaiting={isWaiting}
          value={node?.description}
          isLoaded={isLoaded}
          startWithEditView={isDraft}
          isDisabled={!canUpdate}
          onSubmit={handleNewCheckMarkDescription}
          onCancel={handleCancelDescription}
          onPressedEnter={handleEnterKey}
          onStartEdit={handleStartEdit}
          onStopEdit={handleStopEdit}
        />
        <DeleteCheckMarkButton
          buttonRef={removeCheckmarkButton}
          checkMarkID={node?.id}
          isVisible={isHovering && !isEditing}
          canDelete={canDelete}
          onDelete={onUpdate}
        />
      </HStack>
    </Skeleton>
  )
}
