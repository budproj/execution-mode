import { useQuery } from '@apollo/client'
import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

import { GraphQLEffect } from 'src/components/types'

import {
  SettingsSidebarCompanyMenuSectionPreferences,
  SettingsSidebarMyAccountMenuSectionPreferences,
  SettingsSidebarTermsMenuSectionPreferences,
} from './Section'
import queries from './queries.gql'

const SettingsSidebarMenu = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)

  useQuery(queries.GET_USER_SIDEBAR_PERMISSIONS, {
    onCompleted: (data) => {
      if (data.permissions.cycle.read === GraphQLEffect.ALLOW) setIsAuthorized(true)
    },
  })

  return (
    <Box width="xs" py={4}>
      <Flex gridGap={3} direction="column" gap={12}>
        <SettingsSidebarMyAccountMenuSectionPreferences />
        {isAuthorized && <SettingsSidebarCompanyMenuSectionPreferences />}
        <SettingsSidebarTermsMenuSectionPreferences />
      </Flex>
    </Box>
  )
}

export default SettingsSidebarMenu
