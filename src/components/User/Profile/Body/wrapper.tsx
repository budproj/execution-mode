import { Divider, Stack } from '@chakra-ui/react'
import React from 'react'

import { User } from 'src/components/User/types'

import { UserProfileBodyPersonalInformations } from './PersonalInformations/wrapper'
import { UserProfileBodySocialMedia } from './SocialMedia/wrapper'

export interface UserProfileBodyProperties {
  isLoaded: boolean
  userID?: User['id']
}

export const UserProfileBody = ({ userID, isLoaded }: UserProfileBodyProperties) => (
  <Stack direction="column" spacing={6}>
    <UserProfileBodyPersonalInformations userID={userID} isLoaded={isLoaded} />
    <Divider borderColor="black.200" />
    <UserProfileBodySocialMedia userID={userID} isLoaded={isLoaded} />
  </Stack>
)
