import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import React, { useEffect } from 'react'

import { User } from 'src/components/User/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'

import queries from './queries.gql'

interface GetUserListQueryResult {
  users: GraphQLConnection<User>
}

export const KeyResultSingleSectionOwnerUpdateUserList = () => {
  const [users, setUserEdges] = useConnectionEdges<User>()
  const loadUsers = useRecoilFamilyLoader(userAtomFamily)
  const { data } = useQuery<GetUserListQueryResult>(queries.GET_USER_LIST)

  useEffect(() => {
    if (data) setUserEdges(data.users.edges)
  }, [data, setUserEdges])

  useEffect(() => {
    if (users) loadUsers(users)
  }, [users, loadUsers])

  return (
    <Stack>
      <p>Ok</p>
    </Stack>
  )
}
