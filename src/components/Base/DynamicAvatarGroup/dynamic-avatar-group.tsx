import { Avatar, AvatarBadge, AvatarGroup, AvatarGroupProps } from '@chakra-ui/react'
import React from 'react'

import CrownIcon from 'src/components/Icon/Crown'
import { User } from 'src/components/User/types'

import AvatarGroupSkeleton from './skeleton'

export interface DynamicAvatarGroupProperties {
  skeletonNumOfAvatars: number
  size: AvatarGroupProps['size']
  max: AvatarGroupProps['max']
  selectedUserId?: string
  isSelectable?: boolean
  users?: Array<Partial<User>>
  onSelectUser?: (userId: string) => void
  isLoaded?: boolean
  isFromTeamPage?: boolean
  teamOwnerId?: string
}

const DynamicAvatarGroup = ({
  size,
  max,
  isLoaded,
  skeletonNumOfAvatars,
  selectedUserId,
  isSelectable = false,
  onSelectUser,
  users,
  isFromTeamPage = false,
  teamOwnerId,
}: DynamicAvatarGroupProperties) => {
  const handleSelectUser = (userId: string) => {
    if (onSelectUser) onSelectUser(userId)
  }

  console.log({ users })

  const targetUser = isSelectable ? selectedUserId ?? teamOwnerId : teamOwnerId

  return isLoaded || typeof isLoaded === 'undefined' ? (
    <AvatarGroup size={size} max={max}>
      {users
        ?.sort((a, b) => (a.id === targetUser ? -1 : b.id === targetUser ? 1 : 0)) // Put the owner or selected user always first
        .map((user, index) => (
          <Avatar
            key={user.id ?? `DYNAMIC_AVATAR_${user.fullName ?? user.firstName ?? 'USER'}_${index}`}
            cursor={isSelectable ? 'pointer' : 'default'}
            name={user.fullName ?? user.firstName}
            src={user.picture}
            filter={
              'grayscale(' +
              (selectedUserId ? (user.id === selectedUserId ? '0%' : '100%') : '0%') +
              ')'
            }
            onClick={() => handleSelectUser(user.id ?? '')}
          >
            {isFromTeamPage && teamOwnerId === user.id && (
              <AvatarBadge placement="bottom-start" border="none">
                <CrownIcon width="20px" height="20px" desc="" fill="yellow.500" />
              </AvatarBadge>
            )}
          </Avatar>
        ))}
    </AvatarGroup>
  ) : (
    <AvatarGroupSkeleton numOfAvatars={skeletonNumOfAvatars ?? max} />
  )
}

DynamicAvatarGroup.defaultProps = {
  size: 'md',
  max: 3,
  skeletonNumOfAvatars: 3,
}

export default DynamicAvatarGroup
