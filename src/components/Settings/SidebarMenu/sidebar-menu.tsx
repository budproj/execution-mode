import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

import { SettingsSidebarMenuSectionPreferences } from './Section'

const SettingsSidebarMenu = () => (
  <Box width="xs">
    <Flex gridGap={3} direction="column">
      <SettingsSidebarMenuSectionPreferences />
    </Flex>
  </Box>
)

export default SettingsSidebarMenu
