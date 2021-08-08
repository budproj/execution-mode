import { ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TimesIcon from 'src/components/Icon/Times'

import { EditableButton } from './base-button'
import messages from './messages'

interface CancelButtonProperties extends ButtonProps {
  onCancel: () => void
}

export const CancelButton = ({ onCancel, ...rest }: CancelButtonProperties) => {
  const intl = useIntl()

  return (
    <EditableButton
      aria-label={intl.formatMessage(messages.cancelButtonDesc)}
      _hover={{
        color: 'white',
        bg: 'red.500',
      }}
      onClick={onCancel}
      {...rest}
    >
      <TimesIcon desc={intl.formatMessage(messages.cancelButtonDesc)} fill="currentColor" />
    </EditableButton>
  )
}
