import { ButtonProps, IconButton, useEditableControls } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TimesIcon from 'src/components/Icon/Times'

import messages from './messages'

interface CancelButtonProperties extends ButtonProps {
  onCancel?: () => void
}

export const CancelButton = ({ onCancel, onClick, ...rest }: CancelButtonProperties) => {
  const { getCancelButtonProps } = useEditableControls()

  const intl = useIntl()

  return (
    <IconButton
      variant="solid"
      h={12}
      w={12}
      fontSize="2xl"
      bg="black.100"
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
      icon={<TimesIcon desc={intl.formatMessage(messages.cancelButtonDesc)} fill="currentColor" />}
      onClick={onCancel ?? onClick}
      {...getCancelButtonProps()}
      {...rest}
    />
  )
}
