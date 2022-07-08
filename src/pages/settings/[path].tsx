import { useQuery } from '@apollo/client/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import SettingsPage from 'src/components/Page/Settings'
import { CompanyMenuProperties } from 'src/components/Settings/SidebarMenu/Section/Company/company'
import { SETTINGS_PATHS } from 'src/components/Settings/constants'

import queries from './queries.gql'

const SettingsIndex = () => {
  const router = useRouter()
  const queryPath = router.query?.path
  const [path] = Array.isArray(queryPath) ? queryPath : [queryPath]
  const [permissions, setPermissions] = useState<CompanyMenuProperties['permissions']>()

  useQuery(queries.GET_USER_SETTINGS_PERMISSIONS, {
    onCompleted: (data) => {
      setPermissions(data.permissions)
    },
  })

  const paths = new Map([
    ['my-profile', SETTINGS_PATHS.MY_PROFILE],
    ['cycles', SETTINGS_PATHS.CYCLES],
    ['users', SETTINGS_PATHS.USERS],
  ])

  const currentPath = paths.get(path ?? SETTINGS_PATHS.MY_PROFILE)

  return <SettingsPage path={currentPath} permissions={permissions} />
}

export default SettingsIndex
