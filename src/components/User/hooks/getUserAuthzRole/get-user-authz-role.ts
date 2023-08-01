import { useQuery, OperationVariables, ApolloQueryResult } from '@apollo/client'
import { useEffect, useState } from 'react'

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

  const { loading, called, refetch, data } = useQuery(GET_USER_AUTHZ_ROLE, {
    fetchPolicy: 'cache-first',
    variables: { userID },
  })

  useEffect(() => {
    if (data) setUser(data.user.authzRole)
  }, [data])

  return { data: user, loading, refetch, called }
}
