import { useAuth0 } from '@auth0/auth0-react'
import React, { ReactElement, useEffect } from 'react'

import logger from 'lib/logger'

import PageLoading from '../PageLoading'

const component = 'Auth0Gatekeeper'

export interface Auth0GatekeeperProperties {
  children: ReactElement
}

const Auth0Gatekeeper = ({ children }: Auth0GatekeeperProperties): ReactElement => {
  const { isLoading, isAuthenticated, loginWithRedirect, user } = useAuth0()

  console.log(user)

  useEffect((): void => {
    if (!isLoading && !isAuthenticated)
      loginWithRedirect().catch((error) =>
        logger.error('Could not redirect user to auth. Reason:', { data: error, component }),
      )
  }, [isLoading, isAuthenticated, loginWithRedirect])

  return isLoading || !isAuthenticated ? <PageLoading /> : children
}

export default Auth0Gatekeeper
