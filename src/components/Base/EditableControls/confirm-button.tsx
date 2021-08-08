import { ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import CheckIcon from 'src/components/Icon/Check'

import { EditableButton } from './base-button'
import messages from './messages'

interface ConfirmButtonProperties extends ButtonProps {
  isLoading: boolean
  isDisabled?: boolean
}

export const ConfirmButton = ({ isLoading, isDisabled, ...rest }: ConfirmButtonProperties) => {
  const intl = useIntl()

  return (
    <EditableButton
      isLoading={isLoading}
      isDisabled={isDisabled}
      aria-label={intl.formatMessage(messages.submitButtonDesc)}
      type="submit"
      _hover={{
        color: isLoading || isDisabled ? 'gray.500' : 'white',
        bg: isLoading || isDisabled ? 'gray.50' : 'green.500',
      }}
      {...rest}
    >
      <CheckIcon desc={intl.formatMessage(messages.submitButtonDesc)} fill="currentColor" />
    </EditableButton>
  )
}
