import { useAuth0 } from '@auth0/auth0-react'
import { Box, CircularProgress } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'

import logger from 'lib/logger'

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

  return isLoading || !isAuthenticated ? (
    <Box
      display="flex"
      alignContent="center"
      justifyContent="center"
      height="100vh"
      flexDirection="column"
      alignItems="center"
    >
      <CircularProgress size={60} />
    </Box>
  ) : (
    children
  )
}

export default Auth0Gatekeeper
