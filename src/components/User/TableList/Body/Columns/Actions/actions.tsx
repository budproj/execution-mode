import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import TreeDotsIcon from 'src/components/Icon/TreeDots'
import { DeactivateUser } from 'src/components/User/Profile/Body/BottomActions/DeactivateUser/deactivate-user'
import UsersTableListBodyColumnBase, {
  UsersTableListBodyColumnBaseProperties,
} from 'src/components/User/TableList/Body/Columns/Base'
import { User } from 'src/components/User/types'
import { seeDetailsUserSidebarViewMode } from 'src/state/recoil/user/see-deatils-user-sidebar-view-mode'

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
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
  const [_, setIsOpened] = useRecoilState(seeDetailsUserSidebarViewMode)

  const openDeactivateModal = () => {
    if (!isDeactivateModalOpen) setIsDeactivateModalOpen(true)
  }

  const closeDeactivateModal = () => {
    if (isDeactivateModalOpen) setIsDeactivateModalOpen(false)
  }

  const openSeeDatailsUserSidebar = () => {
    setIsOpened({ isOpened: true, userId: id })
  }

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
          <MenuItem onClick={openSeeDatailsUserSidebar}>
            {intl.formatMessage(messages.firstMenuItemOption)}
          </MenuItem>
          <MenuItem>{intl.formatMessage(messages.secondMenuItemOption)}</MenuItem>
          <MenuItem onClick={openDeactivateModal}>
            {intl.formatMessage(messages.thirdMenuItemOption)}
          </MenuItem>
        </MenuList>
      </Menu>

      <DeactivateUser
        userID={id}
        showButton={false}
        isOpen={isDeactivateModalOpen}
        onClose={closeDeactivateModal}
      />
    </UsersTableListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnActions
