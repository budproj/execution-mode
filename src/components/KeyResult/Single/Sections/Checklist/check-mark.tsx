import { useMutation } from '@apollo/client'
import { HStack, Checkbox, Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { EditableInputField } from 'src/components/Base'
import {
  KeyResultCheckMark as KeyResultCheckMarkType,
  KeyResultCheckMarkState,
} from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'

import { DeleteCheckMarkButton } from './ActionButtons/delete-checkmark'
import queries from './queries.gql'

interface KeyResultCheckMarkProperties {
  draftCheckMarks?: string[]
  node?: Partial<KeyResultCheckMarkType>
  refresh?: () => void
}

export const KeyResultCheckMark = ({
  node,
  refresh,
  draftCheckMarks,
}: KeyResultCheckMarkProperties) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isChecked, setIsChecked] = useState(node?.state === KeyResultCheckMarkState.CHECKED)
  const [toggleCheckMark, { loading }] = useMutation(queries.TOGGLE_CHECK_MARK, {
    variables: {
      id: node?.id,
    },
    onCompleted: (data) => {
      setIsChecked(data.toggleCheckMark.state === KeyResultCheckMarkState.CHECKED)
    },
  })

  const isLoaded = Boolean(node)
  const isDraft = typeof node?.id === 'undefined' ? false : draftCheckMarks?.includes(node.id)
  const canUpdate = node?.policy?.update === GraphQLEffect.ALLOW

  const handleChange = async () => {
    await toggleCheckMark()
    if (refresh) refresh()
  }

  const handleMouseEnter = () => {
    if (!isHovering) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (isHovering) setIsHovering(false)
  }

  useEffect(() => {
    setIsChecked(node?.state === KeyResultCheckMarkState.CHECKED)
  }, [node?.state, setIsChecked])

  return (
    <Skeleton isLoaded={isLoaded} w="full" fadeDuration={0}>
      <HStack alignItems="center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Checkbox
          isChecked={isChecked}
          isDisabled={loading || !canUpdate}
          onChange={handleChange}
        />
        <EditableInputField
          autoFocus={isDraft}
          isWaiting={loading}
          value={node?.description}
          isLoaded={isLoaded}
          startWithEditView={isDraft}
        />
        <DeleteCheckMarkButton checkMarkID={node?.id} refresh={refresh} isVisible={isHovering} />
      </HStack>
    </Skeleton>
  )
}
