import { ButtonProps, HStack, useEditableControls } from '@chakra-ui/react'
import React from 'react'

import { CancelButton } from './cancel-button'
import { ConfirmButton } from './confirm-button'
import { EditButton } from './edit-button'

type EditableControlsProperties = {
  isHovering?: boolean
  isLocked?: boolean
}

export const EditableControls = ({ isHovering, isLocked }: EditableControlsProperties) => {
  const { isEditing, getEditButtonProps, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls()
  const commonProperties: ButtonProps = {
    fontSize: 'md',
    h: 10,
    w: 10,
  }

  return isEditing ? (
    <HStack>
      <CancelButton {...getCancelButtonProps()} {...commonProperties} />
      <ConfirmButton {...getSubmitButtonProps()} {...commonProperties} />
    </HStack>
  ) : (
    <EditButton
      className="editable-input-value__edit-button"
      isHovering={isHovering}
      isLocked={isLocked}
      {...getEditButtonProps()}
      {...commonProperties}
    />
  )
}
