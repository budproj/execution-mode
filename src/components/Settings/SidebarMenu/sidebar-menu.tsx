import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

import { SettingsSidebarMenuSectionDefinitions } from './Section'

const SettingsSidebarMenu = () => (
  <Box width="xs">
    <Flex gridGap={3} direction="column">
      <SettingsSidebarMenuSectionDefinitions />
    </Flex>
  </Box>
)

export default SettingsSidebarMenu
