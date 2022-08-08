import { Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import EmptyAvatarIcon from 'src/components/Icon/EmptyAvatar/empty-avatar'
import { NamedAvatar } from 'src/components/User'
import { User } from 'src/components/User/types'

import messages from '../messages'

import SelectMultipleUsersState from './select-multiple-state'

interface PlaceholderInputProperties {
  qtdUsers: number
  selectedUserId?: User['id']
}

const PlaceholderInput = ({ qtdUsers, selectedUserId }: PlaceholderInputProperties) => {
  const intl = useIntl()

  return qtdUsers > 0 ? (
    qtdUsers === 1 ? (
      <NamedAvatar userID={selectedUserId} avatarSize="32px" displaySubtitle={false} />
    ) : (
      <SelectMultipleUsersState qtdUsers={qtdUsers} />
    )
  ) : (
    <Box
      display="flex"
      alignItems="center"
      gap={4}
      color="new-gray.600"
      fontSize={14}
      fontWeight={400}
    >
      <EmptyAvatarIcon desc="dsadsa" />
      {intl.formatMessage(messages.inputEmptyState)}
    </Box>
  )
}

export default PlaceholderInput
