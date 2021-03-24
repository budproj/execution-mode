import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import ReloadIcon from 'src/components/Icon/Reload'

import messages from './messages'

const ResetButton = (properties: ButtonProps) => {
  const intl = useIntl()

  return (
    <Button
      color="gray.400"
      colorScheme="brand"
      leftIcon={
        <ReloadIcon fill="currentColor" desc={intl.formatMessage(messages.resetIconDesc)} />
      }
      {...properties}
    >
      {intl.formatMessage(messages.label)}
    </Button>
  )
}

export default ResetButton
