import { Divider, Flex } from '@chakra-ui/react'
import React from 'react'

import SettingsAccountBodyPersonalInformations from './PersonalInformations'
import SettingsAccountBodySocialMedia from './SocialMedia'

const SettingsAccountBody = () => (
  <Flex direction="column" gridGap={6}>
    <SettingsAccountBodyPersonalInformations />
    <Divider borderColor="black.200" />
    <SettingsAccountBodySocialMedia />
  </Flex>
)

export default SettingsAccountBody
