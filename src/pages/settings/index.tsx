import React from 'react'

import SettingsPage from 'src/components/Page/Settings'
import { SETTINGS_PATHS } from 'src/components/Settings/constants'

const SettingsIndex = () => {
  const noPermission = {
    user: {},
    cycle: {},
  }

  return <SettingsPage path={SETTINGS_PATHS.MY_PROFILE} permissions={noPermission} />
}

export default SettingsIndex
