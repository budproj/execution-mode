import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { AddTask } from 'src/components/Task/add-task'

import messages from './messages'

export const EmptyPersonalTasks = () => {
  const intl = useIntl()

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" py={12}>
      <Text color="new-gray.700" fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
        {intl.formatMessage(messages.emptyTitle)}
      </Text>
      <Text color="gray.300" textAlign="center" maxWidth="360px" mb={5}>
        {intl.formatMessage(messages.emptySubTitle)}
      </Text>
      <AddTask
        w="full"
        display="flex"
        flexDirection="column"
        buttonText={intl.formatMessage(messages.addPersonalTasksButtonLabel)}
      />
    </Flex>
  )
}
