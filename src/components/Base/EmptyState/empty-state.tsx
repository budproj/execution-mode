import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import messages from './messages'

export interface EmptyStateProperties {
  labelMessage: MessageDescriptor
}

const EmptyState = ({ labelMessage }: EmptyStateProperties) => {
  const intl = useIntl()

  return (
    <Flex alignItems="center" gridGap={8} direction="column" h="200px">
      <Box>
        <Image src="/images/bud-team-at-work.png" alt={intl.formatMessage(messages.imageAlt)} />
      </Box>
      <Text color="gray.300">{intl.formatMessage(labelMessage)}</Text>
    </Flex>
  )
}

export default EmptyState
