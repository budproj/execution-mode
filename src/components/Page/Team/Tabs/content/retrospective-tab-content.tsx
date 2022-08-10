import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

const RetrospectiveTabContent = () => {
  const intl = useIntl()

  return (
    <Stack spacing={10}>
      <Flex alignItems="center" justifyContent="space-between">
        <Stack direction="column" spacing={1}>
          <Text fontSize={28} fontWeight="medium" color="new-gray.800">
            {intl.formatMessage(messages.tabRetrospectivePageTitle)}
          </Text>
          <Text fontSize={14} color="new-gray.600">
            {intl.formatMessage(messages.tabRetrospectivePageDescription)}
          </Text>
        </Stack>
        <Button
          bg="brand.500"
          color="black.50"
          _hover={{ background: 'brand.400', color: 'black.50' }}
        >
          {intl.formatMessage(messages.tabRetrospectiveAnswerButton)}
        </Button>
      </Flex>
      <Box w="100%" height="50vh" bg="white" borderRadius={15} />
    </Stack>
  )
}

export default RetrospectiveTabContent
