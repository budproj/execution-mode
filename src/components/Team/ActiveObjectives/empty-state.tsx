import { Flex, Stack } from '@chakra-ui/layout'
import { Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { EmptyState } from '../../Base'

import messages from './messages'

export const TeamActiveObjectivesEmptyState = () => {
  const intl = useIntl()

  return (
    <Stack spacing={4} h="full">
      <Heading fontSize="sm" color="gray.500" textTransform="uppercase">
        {intl.formatMessage(messages.emptyStateTitle)}
      </Heading>

      <Flex bg="white" w="full" h="full" alignContent="center" justifyContent="center" p={16}>
        <EmptyState imageKey="pages" labelMessage={messages.emptyStateMessage} />
      </Flex>
    </Stack>
  )
}
