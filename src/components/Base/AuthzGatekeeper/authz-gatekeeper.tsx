import { useAuth0 } from '@auth0/auth0-react'
import React, { ReactElement, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import logger from 'lib/logger'
import PageLoading from 'src/components/Base/PageLoading'
import authzAtom from 'src/state/recoil/authz/atom'

const component = 'AuthzGatekeeper'

export interface AuthzGatekeeperProperties {
  children: ReactElement
}

const AuthzGatekeeper = ({ children }: AuthzGatekeeperProperties): ReactElement => {
  const { isLoading, isAuthenticated, loginWithRedirect, user } = useAuth0()
  const setAuthzUser = useSetRecoilState(authzAtom)

  useEffect(() => {
    if (!isLoading && !isAuthenticated)
      loginWithRedirect().catch((error) =>
        logger.error('Could not redirect user to auth. Reason:', { data: error, component }),
      )
  }, [isLoading, isAuthenticated, loginWithRedirect])

  useEffect(() => {
    setAuthzUser(user)
  }, [user, setAuthzUser])

  return isLoading || !isAuthenticated ? <PageLoading /> : children
}

export default AuthzGatekeeper
