import { useQuery } from '@apollo/client'

import { User, UserQuery } from '../../types'

import GET_USER_DETAILS from './get-user-details.gql'

export interface useGetMyTasksProperties {
  onlyUnchecked?: boolean
  limit?: number
}

export const useGetUserDetails = (userId: User['id']) => {
  const query = {
    userId,
  }

  const { data, loading, called } = useQuery<UserQuery>(GET_USER_DETAILS, {
    variables: query,
  })

  return { data: data?.user, loading, called }
}
