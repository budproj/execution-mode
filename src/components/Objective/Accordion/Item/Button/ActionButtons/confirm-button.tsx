import { ButtonProps, IconButton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from 'src/components/Base/EditableControls/messages'
import CheckIcon from 'src/components/Icon/Check'

interface ConfirmButtonProperties extends ButtonProps {
  isLoading?: boolean
  isDisabled?: boolean
}

export const ConfirmButton = ({ isLoading, isDisabled, ...rest }: ConfirmButtonProperties) => {
  const intl = useIntl()

  return (
    <IconButton
      variant="solid"
      h={12}
      w={12}
      fontSize="2xl"
      borderColor="transparent"
      isLoading={isLoading}
      isDisabled={isDisabled}
      aria-label={intl.formatMessage(messages.submitButtonDesc)}
      type="submit"
      color="white"
      bg="brand.500"
      _hover={{
        bg: isLoading || isDisabled ? 'brand.500' : 'brand.400',
      }}
      _active={{
        bg: isLoading || isDisabled ? 'brand.500' : 'brand.300',
      }}
      icon={<CheckIcon desc={intl.formatMessage(messages.submitButtonDesc)} fill="currentColor" />}
      {...rest}
    />
  )
}
