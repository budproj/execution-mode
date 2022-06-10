import { uniqueId } from 'lodash'
import React from 'react'

import { UsersTableListBodyProperties } from 'src/components/User/TableList/Body/body'

import { userInfo } from '../../list'

import UsersTableListBodyStaticLine from './line'

const UsersTableListBodyStatic = ({ listID, usersInfo, ...rest }: UsersTableListBodyProperties) => (
  <>
    {usersInfo.map((userInfo: userInfo) => (
      <UsersTableListBodyStaticLine
        key={`${listID ?? uniqueId()}_USERS_TABLE_LIST_BODY_LINE_${userInfo.id ?? uniqueId()}`}
        usersInfo={usersInfo}
        userID={userInfo.id}
        isActive={userInfo.isActive}
        listID={listID}
        {...rest}
      />
    ))}
  </>
)

export default UsersTableListBodyStatic
