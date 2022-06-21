import { Flex } from '@chakra-ui/react'
import React from 'react'

import NotificationsButton from 'src/components/Base/NotificationsButton'
import SettingsButton from 'src/components/Base/SettingsButton'
import SupportButton from 'src/components/Base/SupportButton'

const MainAppBarHelperButtons = () => (
  <Flex gap={1}>
    <NotificationsButton />
    <SupportButton />
    <SettingsButton />
  </Flex>
)

export default MainAppBarHelperButtons
