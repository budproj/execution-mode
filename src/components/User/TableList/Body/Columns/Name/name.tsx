import React, { ReactElement } from 'react'

import NamedAvatar from 'src/components/User/NamedAvatar'
import UsersTableListBodyColumnBase, {
  UsersTableListBodyColumnBaseProperties,
} from 'src/components/User/TableList/Body/Columns/Base'
import { User } from 'src/components/User/types'

export interface UsersTableListBodyColumnNameProperties
  extends UsersTableListBodyColumnBaseProperties {
  id?: User['id']
  isActive?: boolean
}

const UsersTableListBodyColumnName = ({
  id,
  isActive,
}: UsersTableListBodyColumnNameProperties): ReactElement => {
  return (
    <UsersTableListBodyColumnBase>
      <NamedAvatar
        isStatic
        subtitleType="role"
        userID={id}
        canHover={false}
        nameColor={isActive ? '#525F7F' : 'new-gray.500'}
        isUserActive={isActive}
      />
    </UsersTableListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnName
