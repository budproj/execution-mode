import { Flex, Tag, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import newTagMessages from 'src/components/Base/MainAppBar/messages'

import messages from './messages'

export const KeyResultHistory = (): JSX.Element => {
  const intl = useIntl()
  return (
    <Box px={8} pt={4}>
      <Flex>
        <Text marginRight="5px" color="new-gray.800" fontWeight={700}>
          {intl.formatMessage(messages.spotlightTitle)}
        </Text>
        <Tag size="sm" variant="solid" colorScheme="brand" ml={1}>
          {intl.formatMessage(newTagMessages.newItem)}
        </Tag>
      </Flex>
    </Box>
  )
}
