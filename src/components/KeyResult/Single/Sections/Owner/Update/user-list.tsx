import { Stack, Text } from '@chakra-ui/layout'
import React from 'react'
import { useIntl } from 'react-intl'

import { NamedAvatar } from 'src/components/User'

import { KeyResultSingleSectionOwnerUpdateUserListProperties } from './interface'
import messages from './messages'

export const KeyResultSingleSectionOwnerUpdateUserList = ({
  users,
}: KeyResultSingleSectionOwnerUpdateUserListProperties) => {
  const intl = useIntl()

  return (
    <Stack spacing={4}>
      {users.length > 0 ? (
        users.map((user) => (
          <NamedAvatar key={user.id} canHover userID={user.id} subtitleType="team" />
        ))
      ) : (
        <Text color="black.600">{intl.formatMessage(messages.emptyState)}</Text>
      )}
    </Stack>
  )
}
