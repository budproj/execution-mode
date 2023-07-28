import flagsmith from 'flagsmith'
import { FlagsmithProvider as FlagsmithProviderInternal, useFlagsmith } from 'flagsmith/react'
import React, { ReactElement, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import getConfig from 'src/config'

import { myselfAtom } from '../../../state/recoil/shared/atoms'

type FlagsmithProviderProperties = {
  readonly children: ReactElement
}

const config = getConfig()

const FlagsmithIdentifier = ({ children }: FlagsmithProviderProperties) => {
  const myself = useRecoilValue(myselfAtom)

  const flagsmithInstance = useFlagsmith()

  useEffect(() => {
    if (myself) {
      flagsmithInstance.identify(myself.email, {
        userId: myself.id,
        email: myself.email,
        companyId: myself.companies.edges[0].node.id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myself?.id])

  return children
}

export const FlagsmithProvider = ({ children }: FlagsmithProviderProperties) => {
  return (
    <FlagsmithProviderInternal
      options={{
        environmentID: config.publicRuntimeConfig.flagsmith.clientSideKey,
      }}
      flagsmith={flagsmith}
    >
      <FlagsmithIdentifier>{children}</FlagsmithIdentifier>
    </FlagsmithProviderInternal>
  )
}
