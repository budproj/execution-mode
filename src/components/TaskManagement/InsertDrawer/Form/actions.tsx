import { Button, Skeleton, Stack } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface FormActionsInterface {
  onClose?: () => void
  isLoading?: boolean
  editingTaskId?: string
}

export const FormActions = ({ onClose, isLoading, editingTaskId }: FormActionsInterface) => {
  const intl = useIntl()

  console.log({ editingTaskId })

  const { resetForm, submitForm, isSubmitting } = useFormikContext()

  const handleCancel = () => {
    console.log('CANCELOU')

    resetForm()
    if (onClose) onClose()
  }

  const handleSubmitForm = () => {
    submitForm()
  }

  return (
    <Stack flexGrow={1} alignItems="flex-end" justifyContent="center" direction="row" pt={16}>
      <Skeleton isLoaded={!isLoading} flexGrow={1}>
        <Button variant="outline" colorScheme="brand" w="100%" onClick={handleCancel}>
          {intl.formatMessage(messages.firstActionButtonLabel)}
        </Button>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} flexGrow={1}>
        <Button
          variant="solid"
          w="100%"
          colorScheme="brand"
          isLoading={isSubmitting}
          onClick={handleSubmitForm}
        >
          {intl.formatMessage(messages.secondActionButtonLabel)}
        </Button>
      </Skeleton>
    </Stack>
  )
}
