import { Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import UsersTableListBodyColumnBase, {
  UsersTableListBodyColumnBaseProperties,
} from 'src/components/User/TableList/Body/Columns/Base'
import NamedAvatar from 'src/components/User/NamedAvatar'
import { User } from 'src/components/User/types'

export interface UsersTableListBodyColumnNameProperties
  extends UsersTableListBodyColumnBaseProperties {
  id?: User['id']
}

const UsersTableListBodyColumnName = ({
  id,
}: UsersTableListBodyColumnNameProperties): ReactElement => {
  return (
    <UsersTableListBodyColumnBase>
      <Text fontWeight={400} color="#525F7F" fontSize="14px">
        <NamedAvatar subtitleType="role" userID={id} isEditting={false} />
      </Text>
    </UsersTableListBodyColumnBase>
  )
}

export default UsersTableListBodyColumnName
