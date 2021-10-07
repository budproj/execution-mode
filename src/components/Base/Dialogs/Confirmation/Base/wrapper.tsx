import { AlertDialog, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'
import React, { useRef } from 'react'

import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'

import { Header } from './Sections/header'
import { ConfirmationDialogProperties } from './interface'

export const ConfirmationDialog = ({
  isOpen,
  title,
  headerImageURL,
  HeaderImageWrapper,
  description,
  descriptionComponent,
  onClose,
  onConfirm,
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
        <AlertDialogContent px={8} py={16} display="flex" gridGap={6} alignItems="center">
          <Header imageURL={headerImageURL} Wrapper={HeaderImageWrapper} title={title} />
          {descriptionComponent ?? description}
        </AlertDialogContent>
      </ColorizedOverlay>
    </AlertDialog>
  )
}
