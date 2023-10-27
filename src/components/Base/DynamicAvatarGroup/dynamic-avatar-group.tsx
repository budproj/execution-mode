import { Avatar, AvatarBadge, AvatarGroup, AvatarGroupProps } from '@chakra-ui/react'
import React from 'react'

import CrownIcon from 'src/components/Icon/Crown'
import { User } from 'src/components/User/types'

import AvatarGroupSkeleton from './skeleton'

export interface DynamicAvatarGroupProperties {
  skeletonNumOfAvatars: number
  size: AvatarGroupProps['size']
  max: AvatarGroupProps['max']
  users?: Array<Partial<User>>
  isLoaded?: boolean
  isFromTeamPage?: boolean
  teamOwnerId?: string
}

const DynamicAvatarGroup = ({
  size,
  max,
  isLoaded,
  skeletonNumOfAvatars,
  users,
  isFromTeamPage = false,
  teamOwnerId,
}: DynamicAvatarGroupProperties) =>
  isLoaded || typeof isLoaded === 'undefined' ? (
    <AvatarGroup size={size} max={max}>
      {users
        ?.sort((a, b) => (a.id === teamOwnerId ? -1 : b.id === teamOwnerId ? 1 : 0)) // Put the owner always first
        .map((user, index) => (
          <Avatar
            key={user.id ?? `DYNAMIC_AVATAR_${user.fullName ?? user.firstName ?? 'USER'}_${index}`}
            name={user.fullName ?? user.firstName}
            src={user.picture}
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

DynamicAvatarGroup.defaultProps = {
  size: 'md',
  max: 3,
  skeletonNumOfAvatars: 3,
}

export default DynamicAvatarGroup
