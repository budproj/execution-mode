import { uniqueId } from 'lodash'
import React from 'react'

import { UsersTableListBodyProperties } from 'src/components/User/TableList/Body/body'
import { User } from 'src/components/User/types'

import UsersTableListBodyStaticLine from './line'

const UsersTableListBodyStatic = ({ listID, usersIds, ...rest }: UsersTableListBodyProperties) => (
  <>
    {usersIds.map((id: User['id']) => (
      <UsersTableListBodyStaticLine
        key={`${listID ?? uniqueId()}_USERS_TABLE_LIST_BODY_LINE_${id ?? uniqueId()}`}
        usersIds={usersIds}
        userID={id}
        listID={listID}
        {...rest}
      />
    ))}
  </>
)

export default UsersTableListBodyStatic
