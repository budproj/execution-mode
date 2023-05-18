import { AlertDialog, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'
import React, { useRef } from 'react'

import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'

import { Actions } from './Sections/actions'
import { StyledDescription } from './Sections/description'
import { Header } from './Sections/header'
import { ConfirmationDialogProperties } from './interface'

export const ConfirmationDialog = ({
  isOpen,
  title,
  description,
  descriptionComponent,
  confirmationLabel,
  confirmButtonColorScheme,
  headerColorScheme,
  onConfirm,
  onClose,
}: ConfirmationDialogProperties) => {
  const cancelReference = useRef<any>()

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelReference}
      size="2xl"
      portalProps={{ appendToParentPortal: false }}
      onClose={onClose}
    >
      <ColorizedOverlay Component={AlertDialogOverlay}>
        <AlertDialogContent p={12} display="flex" gridGap={6} alignItems="center">
          <Header title={title} colorScheme={headerColorScheme} />
          {descriptionComponent ?? <StyledDescription>{description}</StyledDescription>}
          <Actions
            confirmationLabel={confirmationLabel}
            colorScheme={confirmButtonColorScheme}
            onConfirm={onConfirm}
            onCancel={onClose}
          />
        </AlertDialogContent>
      </ColorizedOverlay>
    </AlertDialog>
  )
}
