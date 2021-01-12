import { Avatar, AvatarGroup, AvatarGroupProps } from '@chakra-ui/react'
import React from 'react'

import { User } from 'src/components/User/types'

import AvatarGroupSkeleton from './skeleton'

export interface DynamicAvatarGroupProperties {
  skeletonNumOfAvatars: number
  size: AvatarGroupProps['size']
  max: AvatarGroupProps['max']
  users?: Array<Partial<User>>
  isLoaded?: boolean
}

const DynamicAvatarGroup = ({
  size,
  max,
  isLoaded,
  skeletonNumOfAvatars,
  users,
}: DynamicAvatarGroupProperties) =>
  isLoaded || typeof isLoaded === 'undefined' ? (
    <AvatarGroup size={size} max={max}>
      {users?.map((user, index) => (
        <Avatar
          key={user.id ?? `DYNAMIC_AVATAR_${user.fullName ?? user.firstName ?? 'USER'}_${index}`}
          name={user.fullName ?? user.firstName}
          src={user.picture}
        />
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
