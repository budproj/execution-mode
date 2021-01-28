import React, { ReactElement } from 'react'

import Page from 'src/components/Base/Page'
import UnderMaintenance from 'src/components/Base/UnderMaintenance'
import getConfig from 'src/config'

export interface MaintenanceGatekeeperProperties {
  children: ReactElement | ReactElement[]
}

const MaintenanceGatekeeper = ({ children }: MaintenanceGatekeeperProperties) => {
  const { publicRuntimeConfig } = getConfig()
  const isUnderMaintenance = publicRuntimeConfig.underMaintenance

  return (
    <Page hideAppBar={isUnderMaintenance}>
      {isUnderMaintenance ? <UnderMaintenance /> : children}
    </Page>
  )
}

export default MaintenanceGatekeeper
