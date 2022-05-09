import { useMutation } from '@apollo/client'
import { MenuItem, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { DangerousActionConfirmationDialog } from 'src/components/Base/Dialogs/Confirmation/DangerousAction/wrapper'

import { DeleteResult } from '../../../../../types'

import messages from './messages'
import queries from './queries.gql'

interface DeleteActionProperties {
  id?: string
  onDelete?: (id?: string) => void
}

interface DeleteKeyResultMutationResult {
  deleteKeyResult: DeleteResult
}

export const DeleteAction = ({ id, onDelete }: DeleteActionProperties) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const intl = useIntl()
  const toast = useToast()
  const [deleteKeyResult, { data, error }] = useMutation<DeleteKeyResultMutationResult>(
    queries.DELETE_KEY_RESULT,
    {
      variables: {
        keyResultID: id,
      },
    },
  )

  const handleOpen = () => {
    if (!isDialogOpen) setIsDialogOpen(true)
  }

  const handleClose = () => {
    if (isDialogOpen) setIsDialogOpen(false)
  }

  const handleDelete = async () => {
    await deleteKeyResult()
    if (onDelete) onDelete(id)
  }

  useEffect(() => {
    if (data) {
      toast({
        title: intl.formatMessage(messages.deleteSuccessToastMessage),
        status: 'success',
      })
    }
  }, [data, toast, intl])

  useEffect(() => {
    if (error) {
      toast({
        title: intl.formatMessage(messages.deleteErrorToastMessage),
        status: 'error',
      })
    }
  }, [error, toast, intl])

  return (
    <>
      <MenuItem onClick={handleOpen}>{intl.formatMessage(messages.deleteButtonMessage)}</MenuItem>
      <DangerousActionConfirmationDialog
        isOpen={isDialogOpen}
        keyword={intl.formatMessage(messages.deleteDialogKeyword)}
        firstStageTitle={intl.formatMessage(messages.deleteDialogFirstStageTitle)}
        firstStageDescription={intl.formatMessage(messages.deleteDialogFirstStageDescription)}
        confirmationLabel={intl.formatMessage(messages.deleteDialogConfirmationLabel)}
        onConfirm={handleDelete}
        onClose={handleClose}
      />
    </>
  )
}
