import { Stack } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { User } from 'src/components/User/types'
import meAtom from 'src/state/recoil/user/me'

import { BottomActions } from './BottomActions/wrapper'
import { UserProfileBodyPersonalInformations } from './PersonalInformations/wrapper'
import { UserProfileBodySocialMedia } from './SocialMedia/wrapper'

export interface UserProfileBodyProperties {
  isLoaded: boolean
  userID?: User['id']
  canUpdate?: boolean
  canDelete?: boolean
  onUserDeactivation?: () => void
  onRemove?: () => void
}

export const UserProfileBody = ({
  userID,
  isLoaded,
  canUpdate,
  canDelete,
  onUserDeactivation,
  onRemove,
}: UserProfileBodyProperties) => {
  const myUserID = useRecoilValue(meAtom)
  const isMyUser = myUserID === userID

  return (
    <Stack direction="column" spacing={6} h="full">
      <UserProfileBodyPersonalInformations
        userID={userID}
        isLoaded={isLoaded}
        isMyUser={isMyUser}
        canUpdate={canUpdate}
        canDelete={canDelete}
        onRemove={onRemove}
      />
      <UserProfileBodySocialMedia
        userID={userID}
        isLoaded={isLoaded}
        isMyUser={isMyUser}
        canUpdate={canUpdate}
      />
      <BottomActions
        userID={userID}
        canDelete={canDelete}
        onUserDeactivation={onUserDeactivation}
      />
    </Stack>
  )
}
