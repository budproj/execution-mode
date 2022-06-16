import { Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import React, { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import TreeDotsIcon from 'src/components/Icon/TreeDots'
import { DeactivateUser } from 'src/components/User/Profile/Body/BottomActions/DeactivateUser/deactivate-user'
import UsersTableListBodyColumnBase, {
  UsersTableListBodyColumnBaseProperties,
} from 'src/components/User/TableList/Body/Columns/Base'
import { useGetUsers } from 'src/components/User/hooks/getUsers'
import { useResetUserPassword } from 'src/components/User/hooks/resetUserPassword'
import { User } from 'src/components/User/types'
import { seeDetailsUserSidebarViewMode } from 'src/state/recoil/user/see-deatils-user-sidebar-view-mode'

import messages from './messages'

export interface UsersTableListBodyColumnActionsProperties
  extends UsersTableListBodyColumnBaseProperties {
  id?: User['id']
  canEdit: boolean
  isActive?: boolean
}

const UsersTableListBodyColumnActions = ({
  id,
  isActive,
  canEdit,
}: UsersTableListBodyColumnActionsProperties): ReactElement => {
  const intl = useIntl()
  const { resetUserPassword, loading, error, data } = useResetUserPassword()
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
  const { refetch } = useGetUsers()
  const [_, setIsOpened] = useRecoilState(seeDetailsUserSidebarViewMode)
  const toast = useToast()

  const openDeactivateModal = () => {
    if (!isDeactivateModalOpen) setIsDeactivateModalOpen(true)
  }

  const closeDeactivateModal = () => {
    if (isDeactivateModalOpen) setIsDeactivateModalOpen(false)
  }

  const openSeeDatailsUserSidebar = () => {
    setIsOpened({ isOpened: true, userId: id })
  }

  const handleResetUserPassoword = async () => {
    await resetUserPassword({ variables: { id } })
  }

  const onUserDeactivation = async () => refetch()

  useEffect(() => {
    if (!loading) {
      if (error) {
        toast({
          title: intl.formatMessage(messages.unknownErrorToastMessage),
          status: 'error',
        })
      } else if (data) {
        toast({
          status: 'success',
          title: intl.formatMessage(messages.successSendEmailToResetPasswordToastMessage),
        })
      }
    }
  }, [loading, error, data, toast, intl])

  return (
    <UsersTableListBodyColumnBase preventLineClick>
      <Menu isLazy placement="auto-end" variant="action-list">
        <MenuButton
          disabled={!isActive || !canEdit}
          cursor={isActive && canEdit ? 'pointer' : 'default'}
          ml={2.5}
          color="new-gray.500"
          _hover={
            isActive && canEdit
              ? {
                  color: 'brand.500',
                }
              : undefined
          }
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
          <MenuItem onClick={handleResetUserPassoword}>
            {intl.formatMessage(messages.secondMenuItemOption)}
          </MenuItem>
          <MenuItem onClick={openDeactivateModal}>
            {intl.formatMessage(messages.thirdMenuItemOption)}
          </MenuItem>
        </MenuList>
      </Menu>

      <DeactivateUser
        userID={id}
        showButton={false}
        isOpen={isDeactivateModalOpen}
        confirmationLabel={intl.formatMessage(messages.confirmationDeactivateUserLabel)}
        onClose={closeDeactivateModal}
        onUserDeactivation={onUserDeactivation}
      />
    </UsersTableListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnActions
