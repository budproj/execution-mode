import { Heading } from '@chakra-ui/react'
import { DrawerHeader } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export const CreateUserSidebarHeader = () => {
  const intl = useIntl()

  return (
    <DrawerHeader bg="gray.50" py={6}>
      <Heading color="gray.500" fontWeight={500} fontSize="2xl">
        {intl.formatMessage(messages.title)}
      </Heading>
    </DrawerHeader>
  )
}
