import { Divider, Stack } from '@chakra-ui/react'
import React from 'react'

import { User } from 'src/components/User/types'

import SettingsAccountBodyPersonalInformations from './PersonalInformations'
import SettingsAccountBodySocialMedia from './SocialMedia'

export interface SettingsAccountBodyProperties {
  isLoaded: boolean
  userID?: User['id']
}

const SettingsAccountBody = ({ userID, isLoaded }: SettingsAccountBodyProperties) => (
  <Stack direction="column" spacing={6}>
    <SettingsAccountBodyPersonalInformations userID={userID} isLoaded={isLoaded} />
    <Divider borderColor="black.200" />
    <SettingsAccountBodySocialMedia userID={userID} isLoaded={isLoaded} />
  </Stack>
)

export default SettingsAccountBody
