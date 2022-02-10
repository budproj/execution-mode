import { Stack, Text } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Scrollbars } from 'rc-scrollbars'
import React, { ReactElement, useRef } from 'react'
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
  showUserCard?: boolean
  emptyState?: ReactElement
}

export const UserList = ({
  users,
  onUserClick,
  avatarSubtitleType,
  showUserCard,
  isLoading,
  emptyState,
}: UserListProperties) => {
  const cardReference = useRef<HTMLDivElement>(null)
  const intl = useIntl()
  const handleUserClick = (userID: string) => async () => {
    if (onUserClick) await onUserClick(userID)
  }

  emptyState ??= <Text color="black.600">{intl.formatMessage(messages.emptyState)}</Text>

  return (
    <>
      <Box ref={cardReference} />
      <Scrollbars autoHeight>
        <Stack spacing={4}>
          {isLoading ? (
            <UserListSkeleton />
          ) : users.length > 0 ? (
            users.map((user) => (
              <NamedAvatar
                key={user.id}
                showCard={showUserCard}
                canHover={Boolean(onUserClick)}
                userID={user.id}
                subtitleType={avatarSubtitleType}
                cardPortalReference={cardReference}
                onClick={handleUserClick(user.id)}
              />
            ))
          ) : (
            emptyState
          )}
        </Stack>
      </Scrollbars>
    </>
  )
}
