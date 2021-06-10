import { AlertDialog, AlertDialogContent, AlertDialogOverlay, Heading } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface ConfirmationDialogProperties {
  isOpen: boolean
  onClose: () => void
  type: string
  keyword?: string
  dangerousAction?: boolean
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  type,
  keyword,
  dangerousAction,
}: ConfirmationDialogProperties) => {
  const [isDangerousDialogOpen, setIsDangerousDialogOpen] = useState(false)
  const intl = useIntl()
  const cancelReference = useRef<any>()
  const dangerousDialogCancelReference = useRef<any>()

  keyword ??= intl.formatMessage(messages.defaultKeyword)

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelReference} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <Heading as="h2">
            {intl.formatMessage(messages.firstDialogTitle, {
              type,
            })}
          </Heading>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
