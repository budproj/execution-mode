import { Menu, MenuButton, MenuList, Button, ButtonProps, Divider, Box } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'

import { HELPDESK_URL } from 'src/components/Base/SupportButton/constants'
import { Me } from 'src/components/User'
import UserLogout from 'src/components/User/Logout'

import IntlLink from '../../IntlLink'

import messages from './messages'

const UserMenuButton = (properties: ButtonProps) => (
  <Button
    colorScheme="gray"
    p={2}
    fontWeight={400}
    w="100%"
    justifyContent="flex-start"
    variant="ghost"
    {...properties}
  />
)

const UserMenu = () => {
  const intl = useIntl()

  return (
    <Menu>
      <MenuButton>
        <Me />
      </MenuButton>
      <MenuList p={0} w="xs">
        <Box p={2}>
          <UserMenuButton>
            <IntlLink href="/my-profile">{intl.formatMessage(messages.firstOption)}</IntlLink>
          </UserMenuButton>
          <UserMenuButton>
            <Link href={HELPDESK_URL}>
              <a target="_blank">{intl.formatMessage(messages.secondOption)}</a>
            </Link>
          </UserMenuButton>
        </Box>

        <Divider pt={4} borderColor="gray.200" />

        <Box p={2}>
          <UserLogout />
        </Box>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
