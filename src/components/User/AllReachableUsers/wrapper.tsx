import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { userAtomFamily } from '../../../state/recoil/user'
import { GraphQLConnection } from '../../types'
import { NamedAvatarSubtitleType } from '../NamedAvatar/types'
import { SelectUserfromList } from '../SelectFromList'
import { User } from '../types'

import queries from './queries.gql'

interface AllReachableUsersProperties {
  onSelect: (userID: string) => void | Promise<void>
  avatarSubtitleType?: NamedAvatarSubtitleType
}

export interface GetUserListQueryResult {
  users: GraphQLConnection<User>
}

export const AllReachableUsers = ({
  onSelect,
  avatarSubtitleType,
}: AllReachableUsersProperties) => {
  const { data } = useQuery<GetUserListQueryResult>(queries.GET_USER_LIST)
  const [users, setUserEdges] = useConnectionEdges<User>()
  const [loadUsers] = useRecoilFamilyLoader(userAtomFamily)

  useEffect(() => {
    if (data) setUserEdges(data.users.edges)
  }, [data, setUserEdges])

  useEffect(() => {
    if (users) loadUsers(users)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])

  return (
    <SelectUserfromList
      users={users}
      isLoading={!data}
      avatarSubtitleType={avatarSubtitleType}
      onSelect={onSelect}
    />
  )
}
