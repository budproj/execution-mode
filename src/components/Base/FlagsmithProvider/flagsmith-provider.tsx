import { useQuery } from '@apollo/client'
import flagsmith from 'flagsmith'
import { FlagsmithProvider as FlagsmithProviderInternal, useFlagsmith } from 'flagsmith/react'
import React, { ReactElement } from 'react'

import getConfig from 'src/config'

import queries from './get-user-traits.gql'

type FlagsmithProviderProperties = {
  children: ReactElement
}

const config = getConfig()

const FlagsmithIdentifier = ({ children }: FlagsmithProviderProperties) => {
  const { data, loading } = useQuery(queries.GET_USER_TRAITS)
  const flagsmithInstance = useFlagsmith()

  if (!loading) {
    flagsmithInstance.identify(`user_${data.me.id as string}`, {
      userId: data.me.id,
      companyId: data.me.companies.edges[0].node.id,
    })
  }

  return loading ? <div /> : children
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
