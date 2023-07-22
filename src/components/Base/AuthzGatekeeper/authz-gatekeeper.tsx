import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import React, { ReactElement, useEffect, useMemo } from 'react'
import { useSetRecoilState } from 'recoil'

import PageLoading from 'src/components/Base/PageLoading'
import authzAtom from 'src/state/recoil/authz/atom'
import { AuthzUser } from 'src/state/recoil/authz/types'

export interface AuthzGatekeeperProperties {
  children: ReactElement
}

const AuthzGatekeeper = ({ children }: AuthzGatekeeperProperties): ReactElement => {
  const { isLoading, isAuthenticated, user } = useAuth0()
  const setAuthzUser = useSetRecoilState(authzAtom)

  useEffect(() => {
    setAuthzUser(user as AuthzUser)
  }, [user, setAuthzUser])

  return useMemo(
    () => (isLoading || !isAuthenticated ? <PageLoading /> : children),
    [isLoading, isAuthenticated, children],
  )
}

export default withAuthenticationRequired(AuthzGatekeeper)
