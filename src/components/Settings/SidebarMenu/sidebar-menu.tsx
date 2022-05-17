import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

import {
  SettingsSidebarCompanyMenuSectionPreferences,
  SettingsSidebarMyAccountMenuSectionPreferences,
  SettingsSidebarTermsMenuSectionPreferences,
} from './Section'

interface SettingsSidebarMenuProperties {
  props: (argument: string) => void
}

const SettingsSidebarMenu = ({ props }: SettingsSidebarMenuProperties) => {
  const { route } = useRouter()
  props(route)

  return (
    <Box width="xs" py={4}>
      <Flex gridGap={3} direction="column" gap={12}>
        <SettingsSidebarMyAccountMenuSectionPreferences />
        <SettingsSidebarCompanyMenuSectionPreferences />
        <SettingsSidebarTermsMenuSectionPreferences />
      </Flex>
    </Box>
  )
}

export default SettingsSidebarMenu
