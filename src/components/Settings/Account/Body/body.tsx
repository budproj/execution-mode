import { Divider, Flex } from '@chakra-ui/react'
import React from 'react'

import { User } from 'src/components/User/types'

import SettingsAccountBodyPersonalInformations from './PersonalInformations'
import SettingsAccountBodySocialMedia from './SocialMedia'

export interface SettingsAccountBodyProperties {
  userID?: User['id']
  loading?: boolean
}

const SettingsAccountBody = ({ userID, loading }: SettingsAccountBodyProperties) => (
  <Flex direction="column" gridGap={6}>
    <SettingsAccountBodyPersonalInformations userID={userID} loading={loading} />
    <Divider borderColor="black.200" />
    <SettingsAccountBodySocialMedia />
  </Flex>
)

export default SettingsAccountBody
