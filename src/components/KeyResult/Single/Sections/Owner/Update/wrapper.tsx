import { Stack } from '@chakra-ui/react'
import React from 'react'

import { KeyResultSingleSectionOwnerUpdateProperties } from './interface'
import { KeyResultSingleSectionOwnerUpdateUserList } from './user-list'

export const KeyResultSingleSectionOwnerUpdateWrapper = ({
  keyResultID,
}: KeyResultSingleSectionOwnerUpdateProperties) => (
  <Stack spacing={4}>
    <KeyResultSingleSectionOwnerUpdateUserList />
  </Stack>
)
