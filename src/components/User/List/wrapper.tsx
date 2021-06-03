import { Stack, Text } from '@chakra-ui/layout'
import { Scrollbars } from 'rc-scrollbars'
import React from 'react'
import { useIntl } from 'react-intl'

import { NamedAvatar } from 'src/components/User'

import { NamedAvatarSubtitleType } from '../NamedAvatar/types'
import { User } from '../types'

import messages from './messages'
import { UserListSkeleton } from './skeleton'

interface UserListProperties {
  users: User[]
  onUserClick?: (userID: string) => void | Promise<void>
  avatarSubtitleType?: NamedAvatarSubtitleType
  isLoading?: boolean
}

export const UserList = ({
  users,
  onUserClick,
  avatarSubtitleType,
  isLoading,
}: UserListProperties) => {
  const intl = useIntl()
  const handleUserClick = (userID: string) => async () => {
    if (onUserClick) await onUserClick(userID)
  }

  return (
    <Scrollbars autoHeight>
      <Stack spacing={4}>
        {isLoading ? (
          <UserListSkeleton />
        ) : users.length > 0 ? (
          users.map((user) => (
            <NamedAvatar
              key={user.id}
              canHover={Boolean(onUserClick)}
              userID={user.id}
              subtitleType={avatarSubtitleType}
              onClick={handleUserClick(user.id)}
            />
          ))
        ) : (
          <Text color="black.600">{intl.formatMessage(messages.emptyState)}</Text>
        )}
      </Stack>
    </Scrollbars>
  )
}
