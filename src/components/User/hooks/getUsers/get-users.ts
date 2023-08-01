import { useQuery, OperationVariables, ApolloQueryResult } from '@apollo/client'
import { useEffect } from 'react'

import { GetUserPrimaryCompanyQuery } from 'src/components/Report/CompanyProgressOverview/types'
import GET_USERS from 'src/components/User/hooks/getUsers/get-users.gql'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'

import { User } from '../../types'

interface GetUserListProperties {
  data: User[]
  loading: boolean
  called: boolean
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

export const useGetUsers = (): GetUserListProperties => {
  const [loadUsers] = useRecoilFamilyLoader<User>(userAtomFamily)
  const [users, setUsers] = useConnectionEdges<User>()

  const { loading, called, refetch } = useQuery<GetUserPrimaryCompanyQuery>(GET_USERS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const companies = data.me?.companies?.edges?.map((edge) => edge.node) ?? []

      const users = companies.map((company) => company?.users?.edges ?? []).flat()
      if (users.length > 0) setUsers(users)
    },
  })

  useEffect(() => {
    loadUsers(users)
  }, [users, loadUsers])

  return { data: users, loading, refetch, called }
}
