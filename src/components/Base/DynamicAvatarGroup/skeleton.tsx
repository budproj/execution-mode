import { Avatar, AvatarGroup, SkeletonCircle } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

export interface AvatarGroupSkeletonProperties {
  numOfAvatars: number
}

const AvatarGroupSkeleton = ({ numOfAvatars }: AvatarGroupSkeletonProperties) => (
  <AvatarGroup size="4xs">
    {
      // eslint-disable-next-line unicorn/no-null
      new Array(numOfAvatars).fill(null).map(() => (
        <SkeletonCircle key={`SKELETON_AVATAR_${uniqueId()}`}>
          <Avatar />
        </SkeletonCircle>
      ))
    }
  </AvatarGroup>
)

export default AvatarGroupSkeleton
