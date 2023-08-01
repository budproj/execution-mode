import { useQuery } from '@apollo/client'
import React, { useEffect, useMemo } from 'react'

import { Team } from 'src/components/Team/types'

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
  listUsersExceptByTeam?: Team['id']
  isSelectingMultiples?: boolean
  avatarSubtitleType?: NamedAvatarSubtitleType
}

export interface GetUserListQueryResult {
  users: GraphQLConnection<User>
}

export const AllReachableUsers = ({
  onSelect,
  listUsersExceptByTeam,
  isSelectingMultiples,
  avatarSubtitleType,
}: AllReachableUsersProperties) => {
  const { data } = useQuery<GetUserListQueryResult>(queries.GET_USER_LIST)
  const [users, setUserEdges] = useConnectionEdges<User>()
  const [loadUsers] = useRecoilFamilyLoader(userAtomFamily)

  const filterUsersExceptByTeam = useMemo(() => {
    const usersToList = users.filter(
      (user) =>
        !user.teams?.edges
          .map((userTeam) => userTeam.node.id !== listUsersExceptByTeam)
          .includes(false),
    )

    return usersToList
  }, [listUsersExceptByTeam, users])

  useEffect(() => {
    if (data) {
      setUserEdges(data.users.edges)
    }
  }, [data, setUserEdges])

  useEffect(() => {
    if (users) loadUsers(users)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])

  return (
    <SelectUserfromList
      users={listUsersExceptByTeam ? filterUsersExceptByTeam : users}
      isLoading={!data}
      isSelectingMultiples={isSelectingMultiples}
      avatarSubtitleType={avatarSubtitleType}
      onSelect={onSelect}
    />
  )
}
