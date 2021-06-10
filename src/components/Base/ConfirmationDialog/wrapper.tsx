import { AlertDialog, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'
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

export const ConfirmationDialog = ({
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

  const handleDangerousConfirmation = () => {
    setIsShowingDangerousConfirmation(true)
  }

  const handleConfirmation = dangerousAction ? handleDangerousConfirmation : onConfirm

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelReference} size="2xl" onClose={onClose}>
      <AlertDialogOverlay>
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
