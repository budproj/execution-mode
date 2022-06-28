import React, { ReactElement } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import NamedAvatar from 'src/components/User/NamedAvatar'
import UsersTableListBodyColumnBase, {
  UsersTableListBodyColumnBaseProperties,
} from 'src/components/User/TableList/Body/Columns/Base'
import { User, UserStatus } from 'src/components/User/types'
import buildPartialSelector from 'src/state/recoil/user/build-partial-selector'
import { seeDetailsUserSidebarViewMode } from 'src/state/recoil/user/see-deatils-user-sidebar-view-mode'

export interface UsersTableListBodyColumnNameProperties
  extends UsersTableListBodyColumnBaseProperties {
  id?: User['id']
}

const stateOfUserSelector = buildPartialSelector<User['status']>('status')

const UsersTableListBodyColumnName = ({
  id,
}: UsersTableListBodyColumnNameProperties): ReactElement => {
  const isActive = useRecoilValue(stateOfUserSelector(id)) === UserStatus.ACTIVE
  const [_, setIsOpened] = useRecoilState(seeDetailsUserSidebarViewMode)

  const openSeeDatailsUserSidebar = () => {
    setIsOpened({ isOpened: true, userId: id })
  }

  return (
    <UsersTableListBodyColumnBase
      width="max-content"
      _hover={isActive ? { opacity: '60%', transition: '0.08s' } : undefined}
    >
      <NamedAvatar
        isStatic
        subtitleType="role"
        userID={id}
        canHover={isActive}
        isEditting={isActive}
        nameColor={isActive ? '#525F7F' : 'new-gray.500'}
        isUserNotActive={!isActive}
        onClick={isActive ? openSeeDatailsUserSidebar : undefined}
      />
    </UsersTableListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnName
