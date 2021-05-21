import React from 'react'

import { NamedAvatar } from 'src/components/User/index'

import { KeyResultSingleSectionOwnerUpdateUserListSkeletonProperties } from '../../KeyResult/Single/Sections/Owner/Update/interface'

export const UserListSkeleton = ({
  numberOfSkeletons,
}: KeyResultSingleSectionOwnerUpdateUserListSkeletonProperties) => (
  <>
    {[...new Array(numberOfSkeletons ?? 3)].map(() => (
      <NamedAvatar key={Math.random()} isLoading />
    ))}
  </>
)
