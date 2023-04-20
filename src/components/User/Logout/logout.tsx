import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

const UserLogout = () => {
  const intl = useIntl()
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({ returnTo: window.location.origin })
  }

  return (
    <Button
      colorScheme="brand"
      color="brand.500"
      id="logout-button"
      p={2}
      w="100%"
      variant="ghost"
      fontWeight={400}
      onClick={handleLogout}
    >
      {intl.formatMessage(messages.label)}
    </Button>
  )
}

export default UserLogout
