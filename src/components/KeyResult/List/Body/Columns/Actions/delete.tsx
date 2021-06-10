import { IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { ConfirmationDialog } from '../../../../../Base/ConfirmationDialog/wrapper'
import { TrashBinOutlineIcon } from '../../../../../Icon/TrashBinOutline/trash-bin-outline'

import messages from './messages'

interface DeleteActionProperties {
  id?: string
}

export const DeleteAction = ({ id }: DeleteActionProperties) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const intl = useIntl()

  const handleOpen = () => {
    if (!isDialogOpen) setIsDialogOpen(true)
  }

  const handleClose = () => {
    if (isDialogOpen) setIsDialogOpen(false)
  }

  return (
    <>
      <IconButton
        aria-label={intl.formatMessage(messages.deleteIconDesc)}
        fontSize="lg"
        w={12}
        h={12}
        variant="solid"
        bg="black.100"
        color="gray.500"
        _hover={{
          bg: 'red.500',
          color: 'white',
        }}
        onClick={handleOpen}
      >
        <TrashBinOutlineIcon
          desc={intl.formatMessage(messages.deleteIconDesc)}
          fill="currentColor"
        />
      </IconButton>

      <ConfirmationDialog
        dangerousAction
        isOpen={isDialogOpen}
        type={intl.formatMessage(messages.deleteDialogType)}
        description={intl.formatMessage(messages.deleteFirstDialogDescription)}
        onClose={handleClose}
      />
    </>
  )
}
