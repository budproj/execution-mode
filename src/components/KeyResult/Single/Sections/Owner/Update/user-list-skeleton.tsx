import { Stack } from '@chakra-ui/react'
import React from 'react'

import { NamedAvatar } from 'src/components/User'

import { KeyResultSingleSectionOwnerUpdateUserListSkeletonProperties } from './interface'

export const KeyResultSingleSectionOwnerUpdateUserListSkeleton = ({
  numberOfSkeletons,
}: KeyResultSingleSectionOwnerUpdateUserListSkeletonProperties) => (
  <Stack spacing={4}>
    {[...new Array(numberOfSkeletons ?? 3)].map(() => (
      <NamedAvatar key={Math.random()} isLoading />
    ))}
  </Stack>
)
