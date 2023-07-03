import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from 'src/components/Base/EditableControls/messages'
import CheckIcon from 'src/components/Icon/Check'
import { ObjectiveMode } from 'src/components/Objective/types'

import actionMessages from './messages'

interface ConfirmButtonProperties extends ButtonProps {
  isLoading?: boolean
  mode?: ObjectiveMode
  isDisabled?: boolean
}

export const ConfirmButton = ({
  isLoading,
  mode,
  isDisabled,
  ...rest
}: ConfirmButtonProperties) => {
  const intl = useIntl()

  return (
    <Button
      variant="solid"
      fontSize="14px"
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
    >
      {intl.formatMessage(actionMessages.submitButton, { mode })}
    </Button>
  )
}
