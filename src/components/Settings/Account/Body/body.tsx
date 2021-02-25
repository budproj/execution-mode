import { Flex } from '@chakra-ui/react'
import React from 'react'

import SettingsAccountBodyPersonalInformations from './PersonalInformations'

const SettingsAccountBody = () => (
  <Flex direction="column" gridGap={4}>
    <SettingsAccountBodyPersonalInformations />
  </Flex>
)

export default SettingsAccountBody
