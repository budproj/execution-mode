import { useMutation } from '@apollo/client'
import { HStack, Checkbox, Skeleton } from '@chakra-ui/react'
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
  refresh?: () => void
  index?: number
  checklistLength?: number
  onCreate?: () => void
}

export const KeyResultCheckMark = ({
  node,
  refresh,
  draftCheckMarks,
  index,
  checklistLength,
  onCreate,
}: KeyResultCheckMarkProperties) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isChecked, setIsChecked] = useState(node?.state === KeyResultCheckMarkState.CHECKED)
  const checkmarkIsBeingRemoved = useRecoilValue(checkMarkIsBeingRemovedAtom(node?.id))
  const removeCheckmarkButton = useRef<HTMLButtonElement>(null)

  const [toggleCheckMark, { loading: isToggling }] = useMutation(queries.TOGGLE_CHECK_MARK, {
    variables: {
      id: node?.id,
    },
    onCompleted: (data) => {
      setIsChecked(data.toggleCheckMark.state === KeyResultCheckMarkState.CHECKED)
      if (refresh) refresh()
    },
  })
  const [updateCheckMarkDescription, { loading: isUpdatingDescription }] = useMutation(
    queries.UPDATE_CHECK_MARK_DESCRIPTION,
    {
      onCompleted: () => {
        if (refresh) refresh()
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

  const handleMouseEnter = () => {
    if (!isHovering) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (isHovering) setIsHovering(false)
  }

  const handleEnterKey = () => {
    if (index && checklistLength && index === checklistLength - 1 && onCreate) onCreate()
  }

  useEffect(() => {
    setIsChecked(node?.state === KeyResultCheckMarkState.CHECKED)
  }, [node?.state, setIsChecked])

  return (
    <Skeleton isLoaded={isLoaded} w="full" fadeDuration={0}>
      <HStack alignItems="center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Checkbox
          isChecked={isChecked}
          isDisabled={isWaiting || !canUpdate}
          onChange={handleChange}
        />
        <EditableInputField
          autoFocus={isDraft}
          isWaiting={isWaiting}
          value={node?.description}
          isLoaded={isLoaded}
          startWithEditView={isDraft}
          isDisabled={!canUpdate}
          onSubmit={handleNewCheckMarkDescription}
          onPressedEnter={handleEnterKey}
        />
        <DeleteCheckMarkButton
          buttonRef={removeCheckmarkButton}
          checkMarkID={node?.id}
          refresh={refresh}
          isVisible={isHovering}
          canDelete={canDelete}
        />
      </HStack>
    </Skeleton>
  )
}
