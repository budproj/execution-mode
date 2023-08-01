import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import React, { ReactElement, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import PageLoading from 'src/components/Base/PageLoading'
import authzAtom from 'src/state/recoil/authz/atom'

export interface AuthzGatekeeperProperties {
  children: ReactElement
}

const AuthzGatekeeper = ({ children }: AuthzGatekeeperProperties): ReactElement => {
  const { isLoading, isAuthenticated, user } = useAuth0()
  const setAuthzUser = useSetRecoilState(authzAtom)

  useEffect(() => {
    setAuthzUser(user)
  }, [user, setAuthzUser])

  return isLoading || !isAuthenticated ? <PageLoading /> : children
}

export default withAuthenticationRequired(AuthzGatekeeper)
