import { useQuery } from '@apollo/client'
import flagsmith from 'flagsmith'
import { FlagsmithProvider as FlagsmithProviderInternal } from 'flagsmith/react'
import React, { ReactElement } from 'react'

import getConfig from 'src/config'

import queries from './get-user-traits.gql'

type FlagsmithProviderProperties = {
  children: ReactElement
}

const config = getConfig()

export const FlagsmithProvider = ({ children }: FlagsmithProviderProperties) => {
  const { data, loading } = useQuery(queries.GET_USER_TRAITS)

  if (!loading) {
    flagsmith.identify('undefined', {
      userId: data.me.id,
      companyId: data.me.companies.edges[0].node.id,
    })
  }

  return (
    <FlagsmithProviderInternal
      options={{
        environmentID: config.publicRuntimeConfig.flagsmith.clientSideKey,
      }}
      flagsmith={flagsmith}
    >
      {loading ? <div /> : children}
    </FlagsmithProviderInternal>
  )
}
