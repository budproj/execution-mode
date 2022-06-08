import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import SettingsPage from 'src/components/Page/Settings'
import { SETTINGS_PATHS } from 'src/components/Settings/constants'
import { GraphQLEffect } from 'src/components/types'

import queries from './queries.gql'

const SettingsCyclesIndex = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { push } = useRouter()

  useQuery(queries.GET_USER_SETTINGS_PERMISSIONS, {
    onCompleted: (data) => {
      if (data.permissions.cycle.create === GraphQLEffect.DENY) push('/')
      else setIsAuthorized(true)
    },
  })

  return isAuthorized && <SettingsPage path={SETTINGS_PATHS.USERS} />
}

export default SettingsCyclesIndex
