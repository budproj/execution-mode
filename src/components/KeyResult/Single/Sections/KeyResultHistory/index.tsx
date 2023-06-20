import { Flex, Tag, Text, Box } from '@chakra-ui/react'
import React from 'react'

import { EmptyState } from 'src/components/Base'

import messages from './messages'

interface KeyResultHistoryProperties {
  keyResultID?: string
}

export const KeyResultHistory = ({ keyResultID }: KeyResultHistoryProperties): JSX.Element => {
  const hasHistory = true

  return (
    <Box>
      <Flex>
        <Text color="new-gray.800" fontWeight={700}>
          SPOTLIGHT | {keyResultID}
        </Text>
        <Tag size="sm" variant="solid" colorScheme="brand" ml={1}>
          novo!
        </Tag>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        {hasHistory && <EmptyState labelMessage={messages.emptyState} imageKey="cat-hanging-out" />}
      </Flex>
    </Box>
  )
}
