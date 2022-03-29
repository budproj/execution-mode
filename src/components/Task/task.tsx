import { Box, Checkbox, EditablePreviewProps, HStack, Skeleton } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'

import { EditableInputField } from 'src/components/Base'

interface KeyResultCheckMarkProperties {
  description: string
  isLoaded?: boolean
  toggleCheckmark: () => void
}

const handleSubmit = (taskName: string | undefined) => {
  console.log('task updated', taskName)
}

const StyledKeyResultCheckMark = styled(HStack)`
  & .deleteCheckMarkButton {
    opacity: 0;
  }

  &:hover .deleteCheckMarkButton {
    opacity: 1;
  }
`

export const SingleTask = ({
  description,
  isLoaded = true,
  toggleCheckmark: customToogleCheckmark,
}: KeyResultCheckMarkProperties) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleStartEdit = () => {
    setIsEditing(true)
  }

  const handleStopEdit = () => {
    setIsEditing(false)
  }

  const toggleCheckmark = () => {
    setIsChecked(!isChecked)

    if (customToogleCheckmark) {
      customToogleCheckmark()
    }
  }

  const checkedProperties: EditablePreviewProps = {
    color: 'new-gray.800',
    textDecoration: 'line-through',
  }

  return (
    <Skeleton isLoaded={isLoaded} w="full" fadeDuration={0}>
      <StyledKeyResultCheckMark alignItems="center">
        <Box py={1} mr={2} display={isEditing ? 'none' : undefined}>
          <Checkbox isChecked={isChecked} isDisabled={false} onChange={toggleCheckmark} />
        </Box>
        <EditableInputField
          isLoaded={isLoaded}
          autoFocus={false}
          isWaiting={false}
          value={description}
          startWithEditView={false}
          isDisabled={false}
          previewProperties={isChecked ? checkedProperties : undefined}
          onSubmit={handleSubmit}
          onCancel={handleStopEdit}
          onPressedEnter={handleSubmit}
          onStartEdit={handleStartEdit}
          onStopEdit={handleStopEdit}
        />
      </StyledKeyResultCheckMark>
    </Skeleton>
  )
}
