import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

const UserLogout = () => {
  const intl = useIntl()
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout()
  }

  return (
    <Button
      color="gray.400"
      p={2}
      w="100%"
      justifyContent="flex-start"
      variant="none"
      _hover={{ bg: 'black.100' }}
      onClick={handleLogout}
    >
      {intl.formatMessage(messages.label)}
    </Button>
  )
}

export default UserLogout
