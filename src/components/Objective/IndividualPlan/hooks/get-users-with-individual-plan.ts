import { useQuery, OperationVariables, ApolloQueryResult } from '@apollo/client'

import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

import queries from '../queries.gql'

interface GetUserWithIndividualPlanProperties {
  data: User[]
  loading: boolean
  called: boolean
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

export const useGetUsersWithIndividualPlan = (): GetUserWithIndividualPlanProperties => {
  const [users, setUsers] = useConnectionEdges<User>()

  const { loading, called, refetch } = useQuery(queries.LIST_USERS_WITH_INDIVIDUAL_OKR, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const users = data?.users?.edges
      if (users.length > 0) setUsers(users)
    },
  })

  return { data: users, loading, refetch, called }
}
