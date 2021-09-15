import { Divider, Stack } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { User } from 'src/components/User/types'
import meAtom from 'src/state/recoil/user/me'

import { UserProfileBodyPersonalInformations } from './PersonalInformations/wrapper'
import { UserProfileBodySocialMedia } from './SocialMedia/wrapper'

export interface UserProfileBodyProperties {
  isLoaded: boolean
  userID?: User['id']
}

export const UserProfileBody = ({ userID, isLoaded }: UserProfileBodyProperties) => {
  const myUserID = useRecoilValue(meAtom)
  const isMyUser = myUserID === userID

  return (
    <Stack direction="column" spacing={6}>
      <UserProfileBodyPersonalInformations
        userID={userID}
        isLoaded={isLoaded}
        isMyUser={isMyUser}
      />
      <Divider borderColor="black.200" />
      <UserProfileBodySocialMedia userID={userID} isLoaded={isLoaded} isMyUser={isMyUser} />
    </Stack>
  )
}
