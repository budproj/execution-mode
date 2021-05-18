import React, { ReactElement } from 'react'

import Page from 'src/components/Base/Page'
import UnderMaintenanceErrorPage from 'src/components/Page/Errors/UnderMaintenance'
import getConfig from 'src/config'

export interface MaintenanceGatekeeperProperties {
  children: ReactElement | ReactElement[]
}

const MaintenanceGatekeeper = ({ children }: MaintenanceGatekeeperProperties) => {
  const { publicRuntimeConfig } = getConfig()
  const isUnderMaintenance = publicRuntimeConfig.maintenanceMode.enabled

  return (
    <Page appBarVariant={isUnderMaintenance ? 'onlyLogotype' : 'default'}>
      {isUnderMaintenance ? <UnderMaintenanceErrorPage /> : children}
    </Page>
  )
}

export default MaintenanceGatekeeper
