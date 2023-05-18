import { Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

type ActionsProperties = {
  confirmationLabel?: string
  cancelationLabel?: string
  colorScheme?: string
  onConfirm: () => void
  onCancel: () => void
}

export const Actions = ({
  confirmationLabel,
  cancelationLabel,
  onConfirm,
  colorScheme,
  onCancel,
}: ActionsProperties) => {
  const intl = useIntl()
  const confirmButtonColor = colorScheme ?? 'red'

  confirmationLabel ??= intl.formatMessage(messages.defaultConfirmationLabel)
  cancelationLabel ??= intl.formatMessage(messages.defaultCancelationLabel)

  return (
    <Stack w="full">
      <Button
        variant="solid"
        colorScheme={confirmButtonColor}
        textTransform="uppercase"
        onClick={onConfirm}
      >
        {confirmationLabel}
      </Button>
      <Button variant="text" colorScheme="brand" textTransform="uppercase" onClick={onCancel}>
        {cancelationLabel}
      </Button>
    </Stack>
  )
}
