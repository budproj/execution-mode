import { useAuth0 } from '@auth0/auth0-react'
import React, { createContext, ReactElement } from 'react'

import getConfig from 'src/config'
import { getServices, Services as ServicesType } from 'src/services'

interface ServicesProperties {
  servicesPromise: Promise<ServicesType>
}

export const ServicesContext = createContext<ServicesProperties>({} as ServicesProperties)

interface ChildrenProperty {
  children: ReactElement
}

const config = getConfig()

export const ServicesProvider = ({ children }: ChildrenProperty) => {
  const { getAccessTokenSilently } = useAuth0()

  const getToken = async () => getAccessTokenSilently(config.publicRuntimeConfig.auth0)
  const servicesPromise = getServices(getToken, config)

  return <ServicesContext.Provider value={{ servicesPromise }}>{children}</ServicesContext.Provider>
}
