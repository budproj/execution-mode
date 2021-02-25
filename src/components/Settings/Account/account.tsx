import { Divider, Flex } from '@chakra-ui/react'
import React from 'react'

import SettingsAccountBody from './Body'
import SettingsAccountHeader from './Header'

const SettingsProfile = () => (
  <Flex py={4} gridGap={6} direction="column" w="full">
    <SettingsAccountHeader />
    <Divider borderColor="black.200" />
    <SettingsAccountBody />
  </Flex>
)

export default SettingsProfile
