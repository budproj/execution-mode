import { Stack } from '@chakra-ui/layout'
import React from 'react'

import { NamedAvatar } from 'src/components/User'

import { KeyResultSingleSectionOwnerUpdateUserListProperties } from './interface'

export const KeyResultSingleSectionOwnerUpdateUserList = ({
  users,
}: KeyResultSingleSectionOwnerUpdateUserListProperties) => (
  <Stack spacing={4}>
    {users.map((user) => (
      <NamedAvatar key={user.id} canHover userID={user.id} subtitleType="team" />
    ))}
  </Stack>
)
