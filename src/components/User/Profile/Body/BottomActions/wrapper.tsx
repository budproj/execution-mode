import { Stack } from '@chakra-ui/layout'
import React from 'react'

import { DeactivateUser } from './DeactivateUser/deactivate-user'

interface BottomActionsProperties {
  userID?: string
  canDelete?: boolean
  onUserDeactivation?: () => void
}

export const BottomActions = ({
  userID,
  canDelete,
  onUserDeactivation,
}: BottomActionsProperties) => (
  <Stack flexGrow={1} justifyContent="flex-end">
    {canDelete && <DeactivateUser userID={userID} onUserDeactivation={onUserDeactivation} />}
  </Stack>
)
