import { DrawerHeader, Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

interface KeyResultInsertOrUpdateDrawerHeaderProperties {
  isEditing?: boolean
}

export const KeyResultInsertOrUpdateDrawerHeader = ({
  isEditing,
}: KeyResultInsertOrUpdateDrawerHeaderProperties) => {
  const intl = useIntl()

  return (
    <DrawerHeader bg="gray.50" p={8}>
      <Heading as="h2" color="gray.500" fontSize="2xl" fontWeight={500}>
        {intl.formatMessage(isEditing ? messages.editTitle : messages.createTitle)}
      </Heading>
    </DrawerHeader>
  )
}
