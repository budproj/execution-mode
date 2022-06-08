import { uniqueId } from 'lodash'
import React from 'react'

import { CyclesListBodyProperties } from 'src/components/Cycle/List/Body/body'
import { Cycle } from 'src/components/Cycle/types'
import { User } from 'src/components/User/types'

import UsersTableListBodyStaticLine from './line'

export interface UsersTableListBodyProperties extends CyclesListBodyProperties {
  usersIDs: Array<User['id']>
}

const UsersTableListBody = ({ usersIDs, listID, ...rest }: UsersTableListBodyProperties) => (
  <>
    {usersIDs.map((userID: Cycle['id']) => (
      <UsersTableListBodyStaticLine
        key={`${listID ?? uniqueId()}_USERS_TABLE_LIST_BODY_LINE_${userID ?? uniqueId()}`}
        userID={userID}
        usersIDs={usersIDs}
        listID={listID}
        {...rest}
      />
    ))}
  </>
)

export default UsersTableListBody
