import { Stack } from '@chakra-ui/react'
import React from 'react'

import { KeyResultCheckMark } from './check-mark'

export const KeyResultChecklistSkeleton = () => (
  <Stack>
    <KeyResultCheckMark />
    <KeyResultCheckMark />
    <KeyResultCheckMark />
  </Stack>
)
