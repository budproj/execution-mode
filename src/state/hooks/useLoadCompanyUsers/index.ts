import {
  OperationVariables,
  ApolloQueryResult,
  useLazyQuery,
  LazyQueryExecFunction,
} from '@apollo/client'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { GetUserPrimaryCompanyQuery } from 'src/components/Report/CompanyProgressOverview/types'
import GET_USERS from 'src/components/User/hooks/getUsers/get-users.gql'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { usersCompany } from 'src/state/recoil/team/users-company'
import { userAtomFamily } from 'src/state/recoil/user'

interface GetUserListProperties {
  loadCompanyUsers: LazyQueryExecFunction<GetUserPrimaryCompanyQuery, OperationVariables>
  loading: boolean
  called: boolean
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

export const useLoadCompanyUsers = (): GetUserListProperties => {
  const [loadUsers] = useRecoilFamilyLoader<User>(userAtomFamily)
  const [users, setUsers] = useConnectionEdges<User>()
  const setUsersCompany = useSetRecoilState(usersCompany)

  const [loadCompanyUsers, { loading, called, refetch }] = useLazyQuery<GetUserPrimaryCompanyQuery>(
    GET_USERS,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        const companies = data.me?.companies?.edges?.map((edge) => edge.node) ?? []

        const users = companies.map((company) => company?.users?.edges ?? []).flat()
        if (users.length > 0) setUsers(users)
      },
    },
  )

  useEffect(() => {
    loadUsers(users)
    setUsersCompany(users)
  }, [users, loadUsers, setUsersCompany])

  return { loadCompanyUsers, loading, refetch, called }
}
