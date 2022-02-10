import { Button, Stack } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface FormActionsInterface {
  onClose?: () => void
}

export const FormActions = ({ onClose }: FormActionsInterface) => {
  const intl = useIntl()
  const { resetForm, submitForm, isSubmitting } = useFormikContext()

  const handleCancel = () => {
    resetForm()
    if (onClose) onClose()
  }

  return (
    <Stack flexGrow={1} alignItems="flex-end" justifyContent="center" direction="row" pt={16}>
      <Button variant="outline" flexGrow={1} colorScheme="brand" onClick={handleCancel}>
        {intl.formatMessage(messages.firstActionButtonLabel)}
      </Button>
      <Button
        variant="solid"
        flexGrow={1}
        colorScheme="brand"
        isLoading={isSubmitting}
        onClick={submitForm}
      >
        {intl.formatMessage(messages.secondActionButtonLabel)}
      </Button>
    </Stack>
  )
}
