import { Box, Flex, Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface CheckInFormActionsProperties {
  isLoading?: boolean
  onCancel?: () => void
}

const Actions = ({ isLoading, onCancel }: CheckInFormActionsProperties) => {
  const intl = useIntl()

  return (
    <Box>
      <Flex gridGap={4}>
        <Button variant="outline" w="100%" onClick={onCancel}>
          {intl.formatMessage(messages.cancelButtonLabel)}
        </Button>
        <Button variant="solid" type="submit" isLoading={isLoading} w="100%">
          {intl.formatMessage(messages.saveButtonLabel)}
        </Button>
      </Flex>
    </Box>
  )
}

export default Actions
