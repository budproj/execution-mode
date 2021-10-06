import { Stack } from '@chakra-ui/layout'
import React from 'react'

import { DeactivateUser } from './deactivate-user'

type BottomActionsProperties = {
  userID?: string
}

export const BottomActions = ({ userID }: BottomActionsProperties) => (
  <Stack flexGrow={1} justifyContent="flex-end">
    <DeactivateUser userID={userID} />
  </Stack>
)
