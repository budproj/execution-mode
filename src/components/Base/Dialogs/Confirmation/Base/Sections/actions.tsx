import { Button } from '@chakra-ui/button'
import { Stack } from '@chakra-ui/layout'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

type ActionsProperties = {
  confirmationLabel?: string
  cancelationLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export const Actions = ({
  confirmationLabel,
  cancelationLabel,
  onConfirm,
  onCancel,
}: ActionsProperties) => {
  const intl = useIntl()

  confirmationLabel ??= intl.formatMessage(messages.defaultConfirmationLabel)
  cancelationLabel ??= intl.formatMessage(messages.defaultCancelationLabel)

  return (
    <Stack w="full">
      <Button variant="solid" colorScheme="red" textTransform="uppercase" onClick={onConfirm}>
        {confirmationLabel}
      </Button>
      <Button variant="text" colorScheme="brand" textTransform="uppercase" onClick={onCancel}>
        {cancelationLabel}
      </Button>
    </Stack>
  )
}
