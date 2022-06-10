import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import TreeDotsIcon from 'src/components/Icon/TreeDots'
import UsersTableListBodyColumnBase, {
  UsersTableListBodyColumnBaseProperties,
} from 'src/components/User/ListTable/Body/Columns/Base'
import { User } from 'src/components/User/types'

import messages from './messages'

export interface UsersTableListBodyColumnActionsProperties
  extends UsersTableListBodyColumnBaseProperties {
  id?: User['id']
  isActive?: boolean
}

const UsersTableListBodyColumnActions = ({
  id,
}: UsersTableListBodyColumnActionsProperties): ReactElement => {
  const intl = useIntl()

  return (
    <UsersTableListBodyColumnBase preventLineClick>
      <Menu isLazy placement="auto-end" variant="action-list">
        <MenuButton
          ml={2.5}
          color="new-gray.500"
          _hover={{
            color: 'brand.500',
          }}
        >
          <TreeDotsIcon
            fill="currentColor"
            fontSize="2xl"
            style={{ transform: 'rotate(90deg)' }}
            desc={intl.formatMessage(messages.optionsButtonDesc)}
          />
        </MenuButton>
        <MenuList>
          <MenuItem>{intl.formatMessage(messages.firstMenuItemOption)}</MenuItem>
          <MenuItem>{intl.formatMessage(messages.secondMenuItemOption)}</MenuItem>
          <MenuItem>{intl.formatMessage(messages.thirdMenuItemOption)}</MenuItem>
        </MenuList>
      </Menu>
    </UsersTableListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnActions
