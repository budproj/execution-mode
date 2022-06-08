import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import SettingsPage from 'src/components/Page/Settings'
import { CompanyMenuProperties } from 'src/components/Settings/SidebarMenu/Section/Company/company'
import { SETTINGS_PATHS } from 'src/components/Settings/constants'
import { GraphQLEffect } from 'src/components/types'

import queries from './queries.gql'

const SettingsCyclesIndex = () => {
  const [permissions, setPermissions] = useState<CompanyMenuProperties['permissions']>()

  const { push } = useRouter()

  useQuery(queries.GET_USER_SETTINGS_PERMISSIONS, {
    onCompleted: (data) => {
      if (data.permissions.cycle.read === GraphQLEffect.DENY) push('/')
      setPermissions(data.permissions)
    },
  })

  return (
    permissions?.cycle?.read === GraphQLEffect.ALLOW && (
      <SettingsPage path={SETTINGS_PATHS.CYCLES} permissions={permissions} />
    )
  )
}

export default SettingsCyclesIndex
