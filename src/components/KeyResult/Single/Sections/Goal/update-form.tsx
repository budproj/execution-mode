import { Stack } from '@chakra-ui/layout'
import React from 'react'

interface KeyResultSingleSectionGoalUpdateFormInterface {
  keyResultID?: string
}

export const KeyResultSingleSectionGoalUpdateForm = ({
  keyResultID,
}: KeyResultSingleSectionGoalUpdateFormInterface) => (
  <Stack>
    <p>{keyResultID}</p>
  </Stack>
)
