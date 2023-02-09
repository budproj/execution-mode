import { Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from '../messages'

const LastRetrospectiveAnswerOverviewEmptyState = () => {
  const intl = useIntl()

  return (
    <Text fontSize={14} color="new-gray.700" maxW="105px" textAlign="center">
      {intl.formatMessage(messages.lastRetrospectiveAnswerOverviewEmptyStateMessage)}
    </Text>
  )
}

export default LastRetrospectiveAnswerOverviewEmptyState
