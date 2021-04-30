import { useLazyQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { User } from 'src/components/User/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'

import { KeyResultSingleSectionOwnerUpdateProperties } from './interface'
import queries from './queries.gql'
import { KeyResultSingleSectionOwnerUpdateSearch } from './search'
import { KeyResultSingleSectionOwnerUpdateUserList } from './user-list'
import { KeyResultSingleSectionOwnerUpdateUserListSkeleton } from './user-list-skeleton'

interface GetUserListQueryResult {
  users: GraphQLConnection<User>
}

export const KeyResultSingleSectionOwnerUpdateWrapper = ({
  keyResultID,
  isOpen,
}: KeyResultSingleSectionOwnerUpdateProperties) => {
  const [users, setUserEdges] = useConnectionEdges<User>()
  const loadUsers = useRecoilFamilyLoader(userAtomFamily)
  const [fetchUsers, { data }] = useLazyQuery<GetUserListQueryResult>(queries.GET_USER_LIST)

  const handleSearch = (searchValue: string) => {
    console.log(searchValue, 'tag')
  }

  useEffect(() => {
    if (isOpen) fetchUsers()
  }, [isOpen, fetchUsers])

  useEffect(() => {
    if (data) setUserEdges(data.users.edges)
  }, [data, setUserEdges])

  useEffect(() => {
    if (users) loadUsers(users)
  }, [users, loadUsers])

  return (
    <Stack spacing={4}>
      <KeyResultSingleSectionOwnerUpdateSearch onChange={handleSearch} />
      {users ? (
        <KeyResultSingleSectionOwnerUpdateUserList users={users} />
      ) : (
        <KeyResultSingleSectionOwnerUpdateUserListSkeleton />
      )}
    </Stack>
  )
}
