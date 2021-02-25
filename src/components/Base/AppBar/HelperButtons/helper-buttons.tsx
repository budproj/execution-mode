import { Flex } from '@chakra-ui/react'
import React from 'react'

import SettingsButton from 'src/components/Base/SettingsButton'
import SupportButton from 'src/components/Base/SupportButton'

const AppBarHelperButtons = () => (
  <Flex>
    <SupportButton />
    <SettingsButton />
  </Flex>
)

export default AppBarHelperButtons
