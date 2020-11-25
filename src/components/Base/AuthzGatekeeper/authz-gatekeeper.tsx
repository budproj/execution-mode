import { useAuth0 } from '@auth0/auth0-react'
import React, { ReactElement, useEffect } from 'react'

import logger from 'lib/logger'

import PageLoading from '../PageLoading'

const component = 'AuthzGatekeeper'

export interface AuthzGatekeeperProperties {
  children: ReactElement
}

const AuthzGatekeeper = ({ children }: AuthzGatekeeperProperties): ReactElement => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect((): void => {
    if (!isLoading && !isAuthenticated)
      loginWithRedirect().catch((error) =>
        logger.error('Could not redirect user to auth. Reason:', { data: error, component }),
      )
  }, [isLoading, isAuthenticated, loginWithRedirect])

  return isLoading || !isAuthenticated ? <PageLoading /> : children
}

export default AuthzGatekeeper
