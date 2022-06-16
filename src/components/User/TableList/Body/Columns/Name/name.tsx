import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import NamedAvatar from 'src/components/User/NamedAvatar'
import UsersTableListBodyColumnBase, {
  UsersTableListBodyColumnBaseProperties,
} from 'src/components/User/TableList/Body/Columns/Base'
import { User, UserStatus } from 'src/components/User/types'
import buildPartialSelector from 'src/state/recoil/user/build-partial-selector'

export interface UsersTableListBodyColumnNameProperties
  extends UsersTableListBodyColumnBaseProperties {
  id?: User['id']
}

const stateOfUserSelector = buildPartialSelector<User['status']>('status')

const UsersTableListBodyColumnName = ({
  id,
}: UsersTableListBodyColumnNameProperties): ReactElement => {
  const isActive = useRecoilValue(stateOfUserSelector(id)) === UserStatus.ACTIVE

  return (
    <UsersTableListBodyColumnBase>
      <NamedAvatar
        isStatic
        subtitleType="role"
        userID={id}
        canHover={false}
        nameColor={isActive ? '#525F7F' : 'new-gray.500'}
        isUserNotActive={!isActive}
      />
    </UsersTableListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnName
