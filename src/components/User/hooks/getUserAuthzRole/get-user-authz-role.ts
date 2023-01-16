import { useQuery, OperationVariables, ApolloQueryResult } from '@apollo/client'
import { useState } from 'react'

import { User } from '../../types'

import GET_USER_AUTHZ_ROLE from './get-user-authz-role.gql'

interface GetUserProperties {
  data: User['authzRole']
  loading: boolean
  called: boolean
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

export const useGetUserAuthzRole = (userID: User['id']): GetUserProperties => {
  const [user, setUser] = useState<User['authzRole']>()

  const { loading, called, refetch } = useQuery(GET_USER_AUTHZ_ROLE, {
    fetchPolicy: 'network-only',
    variables: { userID },
    onCompleted: (data) => {
      if (data) setUser(data.user.authzRole)
    },
  })

  return { data: user, loading, refetch, called }
}
