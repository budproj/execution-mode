import { ButtonProps, Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from 'src/components/Base/EditableControls/messages'

import actionMessages from './messages'

interface CancelButtonProperties extends ButtonProps {
  onCancel?: () => void
}

export const CancelButton = ({ onCancel, onClick, ...rest }: CancelButtonProperties) => {
  const intl = useIntl()

  return (
    <Button
      variant="solid"
      bg="black.100"
      fontSize="14px"
      color="gray.500"
      borderColor="transparent"
      aria-label={intl.formatMessage(messages.cancelButtonDesc)}
      _hover={{
        color: 'white',
        bg: 'red.500',
      }}
      _active={{
        color: 'white',
        bg: 'red.400',
      }}
      onClick={onCancel ?? onClick}
      {...rest}
    >
      {intl.formatMessage(actionMessages.cancelButton)}
    </Button>
  )
}
