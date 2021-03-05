import { Menu, MenuButton, MenuList, Button, ButtonProps, Divider, Box } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { HELPDESK_NEW_TICKET_URL, HELPDESK_URL } from 'src/components/Base/SupportButton/constants'
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
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleClickCapture = () => {
    handleClose()
  }

  return (
    <Menu isOpen={isOpen} onClose={handleClose}>
      <MenuButton onClick={handleOpen}>
        <Me />
      </MenuButton>
      <MenuList p={0} w="xs">
        <Box p={2}>
          <IntlLink href="/settings/my-account">
            <UserMenuButton onClickCapture={handleClickCapture}>
              {intl.formatMessage(messages.firstOption)}
            </UserMenuButton>
          </IntlLink>

          <Link href={HELPDESK_URL}>
            <UserMenuButton>
              <a target="_blank">{intl.formatMessage(messages.secondOption)}</a>
            </UserMenuButton>
          </Link>

          <Link href={HELPDESK_NEW_TICKET_URL}>
            <UserMenuButton>
              <a target="_blank">{intl.formatMessage(messages.thirdOption)}</a>
            </UserMenuButton>
          </Link>
        </Box>

        <Divider pt={4} borderColor="black.200" />

        <Box p={2}>
          <UserLogout />
        </Box>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
