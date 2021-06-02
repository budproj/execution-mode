import React from 'react'

import { NamedAvatar } from 'src/components/User/index'

export interface UserListSkeletonProperties {
  numberOfSkeletons?: number
}

export const UserListSkeleton = ({ numberOfSkeletons }: UserListSkeletonProperties) => (
  <>
    {[...new Array(numberOfSkeletons ?? 3)].map(() => (
      <NamedAvatar key={Math.random()} isLoading />
    ))}
  </>
)
