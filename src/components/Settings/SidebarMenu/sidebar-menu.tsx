import { useQuery } from '@apollo/client'
import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

import { GraphQLEffect } from 'src/components/types'

import {
  SettingsSidebarCompanyMenuSectionPreferences,
  SettingsSidebarMyAccountMenuSectionPreferences,
} from './Section'
import { CompanyMenuProperties } from './Section/Company/company'
import queries from './queries.gql'

const SettingsSidebarMenu = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [permissions, setPermissions] = useState<CompanyMenuProperties['permissions']>()

  useQuery<CompanyMenuProperties>(queries.GET_USER_SIDEBAR_PERMISSIONS, {
    onCompleted: (data) => {
      const { permissions } = data
      const isAuthroziedToSeeCompanyMenu = Object.values(permissions).some((permission) => {
        return permission.read === GraphQLEffect.ALLOW
      })
      if (isAuthroziedToSeeCompanyMenu) setIsAuthorized(true)
      setPermissions(permissions)
    },
  })

  return (
    <Box width="xs" py={4}>
      <Flex gridGap={3} direction="column" gap={12}>
        <SettingsSidebarMyAccountMenuSectionPreferences />
        {isAuthorized && permissions && (
          <SettingsSidebarCompanyMenuSectionPreferences permissions={permissions} />
        )}
      </Flex>
    </Box>
  )
}

export default SettingsSidebarMenu
