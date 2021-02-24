import { Flex, Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface CheckInFormActionsProperties {
  isLoading?: boolean
  showCancelButton?: boolean
  onCancel?: () => void
}

const Actions = ({ isLoading, showCancelButton, onCancel }: CheckInFormActionsProperties) => {
  const intl = useIntl()

  return (
    <Flex gridGap={4}>
      {showCancelButton && (
        <Button variant="solid" w="100%" colorScheme="black" onClick={onCancel}>
          {intl.formatMessage(messages.cancelButtonLabel)}
        </Button>
      )}
      <Button
        variant="solid"
        type="submit"
        isLoading={isLoading}
        w="100%"
        gridColumn={2}
        colorScheme="brand"
      >
        {intl.formatMessage(messages.saveButtonLabel)}
      </Button>
    </Flex>
  )
}

export default Actions
