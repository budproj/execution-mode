import { Box, Divider, Tag, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import MyTasksEmptyState from './empty-state'
import messages from './messages'

const MyTasks = () => {
  const intl = useIntl()

  return (
    <Box>
      <Text fontSize="xl">
        {intl.formatMessage(messages.myTasksTitle)}
        <Tag size="sm" variant="solid" colorScheme="brand" ml={1}>
          {intl.formatMessage(messages.newTag)}
        </Tag>
      </Text>
      <Divider mt={9} />
      <MyTasksEmptyState />
    </Box>
  )
}

export default MyTasks
