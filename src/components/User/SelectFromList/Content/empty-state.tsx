import { Stack, Button } from '@chakra-ui/react'
import { MessageDescriptor } from '@formatjs/intl'
import React from 'react'
import { useIntl } from 'react-intl'

import { UserEmptyState } from '../../EmptyState/wrapper'

import messages from './messages'

type SelectUserFromListEmptyStateProperties = {
  title?: MessageDescriptor
  hasCreatePermission?: boolean
  onCreateStart: () => void
}

export const SelectUserFromListEmptyState = ({
  title,
  hasCreatePermission,
  onCreateStart,
}: SelectUserFromListEmptyStateProperties) => {
  const intl = useIntl()

  return (
    <Stack pt={2} pb={8} spacing={0}>
      <UserEmptyState title={title} py={0} />
      {hasCreatePermission && (
        <Button variant="text" colorScheme="brand" onClick={onCreateStart}>
          {intl.formatMessage(messages.createNewUserButtonLabel)}
        </Button>
      )}
    </Stack>
  )
}
