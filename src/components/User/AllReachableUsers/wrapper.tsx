import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import { useConnectionEdges } from '../../../state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from '../../../state/recoil/hooks'
import { userAtomFamily } from '../../../state/recoil/user'
import { GraphQLConnection } from '../../types'
import { NamedAvatarSubtitleType } from '../NamedAvatar/types'
import { SelectUserFromList } from '../SelectFromList/wrapper'
import { User } from '../types'

import queries from './queries.gql'

interface AllReachableUsersProperties {
  onSelect: (userID: string) => void | Promise<void>
  avatarSubtitleType?: NamedAvatarSubtitleType
}

interface GetUserListQueryResult {
  users: GraphQLConnection<User>
}

export const AllReachableUsers = ({
  onSelect,
  avatarSubtitleType,
}: AllReachableUsersProperties) => {
  const { data } = useQuery<GetUserListQueryResult>(queries.GET_USER_LIST)
  const [users, setUserEdges] = useConnectionEdges<User>()
  const loadUsers = useRecoilFamilyLoader(userAtomFamily)

  const handleSearch = (searchValue: string) => {
    if (!data) return

    if (!searchValue || searchValue === '') setUserEdges(data.users.edges)

    const filteredUserEdges = data.users.edges.filter((edge) =>
      edge.node.fullName.toUpperCase().includes(searchValue.toUpperCase()),
    )
    setUserEdges(filteredUserEdges)
  }

  useEffect(() => {
    if (data) setUserEdges(data.users.edges)
  }, [data, setUserEdges])

  useEffect(() => {
    if (users) loadUsers(users)
  }, [users, loadUsers])

  return (
    <SelectUserFromList
      users={users}
      isLoading={!data}
      avatarSubtitleType={avatarSubtitleType}
      onSearch={handleSearch}
      onSelect={onSelect}
    />
  )
}
