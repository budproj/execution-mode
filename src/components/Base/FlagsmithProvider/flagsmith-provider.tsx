import flagsmith from 'flagsmith'
import { FlagsmithProvider as FlagsmithProviderInternal } from 'flagsmith/react'
import React, { ReactElement } from 'react'

import getConfig from 'src/config'

type FlagsmithProviderProperties = {
  children: ReactElement
}

const config = getConfig()

export const FlagsmithProvider = ({ children }: FlagsmithProviderProperties) => (
  <FlagsmithProviderInternal
    options={{
      environmentID: config.publicRuntimeConfig.flagsmith.clientSideKey,
    }}
    flagsmith={flagsmith}
  >
    {children}
  </FlagsmithProviderInternal>
)
