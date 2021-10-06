import { AlertDialog, AlertDialogContent, AlertDialogOverlay, useToken } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

import { ConfirmationMessage } from './confirmation-message'
import { DangerousMessage } from './dangerous-message'

interface ConfirmationDialogProperties {
  isOpen: boolean
  onClose: () => void
  type: string
  onConfirm: () => void
  keyword?: string
  dangerousAction?: boolean
  description?: string
}

export const ConfirmDeleteDialog = ({
  isOpen,
  onClose,
  type,
  onConfirm,
  keyword,
  dangerousAction,
  description,
}: ConfirmationDialogProperties) => {
  const [isShowingDangeousConfirmation, setIsShowingDangerousConfirmation] = useState(false)
  const cancelReference = useRef<any>()
  const [newGray800]: string[] = useToken('colors', ['new-gray.800'])

  // This is a hack to possible use transparency in our color palette
  // 80 is the alfa channel for 50% transparency
  // TODO: modify our color palette to use transparencies
  const newGray800WithTransparency = `${newGray800}80`

  const handleDangerousConfirmation = () => {
    setIsShowingDangerousConfirmation(true)
  }

  const handleConfirmation = dangerousAction ? handleDangerousConfirmation : onConfirm

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelReference}
      size="2xl"
      portalProps={{ appendToParentPortal: false }}
      onClose={onClose}
    >
      <AlertDialogOverlay backgroundColor={newGray800WithTransparency}>
        <AlertDialogContent px={8} py={16} display="flex" gridGap={8} alignItems="center">
          {isShowingDangeousConfirmation ? (
            <DangerousMessage
              keyword={keyword}
              type={type}
              onClose={onClose}
              onConfirm={onConfirm}
            />
          ) : (
            <ConfirmationMessage
              description={description}
              type={type}
              onConfirm={handleConfirmation}
              onClose={onClose}
            />
          )}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
