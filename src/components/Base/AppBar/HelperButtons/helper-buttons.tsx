import { Flex } from '@chakra-ui/react'
import React from 'react'

import SupportButton from 'src/components/Base/SupportButton'

import SettingsButton from '../../SettingsButton'

const AppBarHelperButtons = () => (
  <Flex>
    <SupportButton />
    <SettingsButton />
  </Flex>
)

export default AppBarHelperButtons
