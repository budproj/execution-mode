import { Flex, Box, Heading, Text, Image } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface OverviewSummaryProperties {
  title: string
}

export const OverviewSummaryEmptyState = ({ title }: OverviewSummaryProperties) => {
  const intl = useIntl()

  return (
    <Flex justifyContent="space-between">
      <Box>
        <Heading size="lg">{title}</Heading>
        <Text color="new-gray.500" mt={2}>
          {intl.formatMessage(messages.emptyMessage)}
        </Text>
      </Box>

      <Image
        src="/images/bud-team-at-work.png"
        alt={intl.formatMessage(messages.emptyMessage)}
        maxW="110px"
        transform="scale(1.5)"
        mr={6}
      />
    </Flex>
  )
}
