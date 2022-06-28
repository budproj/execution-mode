import { useMutation } from '@apollo/client'

import { UserStatus } from '../../types'

import REACTIVATE_USER from './reactivate-user.gql'

type ReactivateUserResult = {
  reactivateUser: {
    status: UserStatus
  }
}

export const useReactivateUser = () => {
  const [reactivateUser, { loading }] = useMutation<ReactivateUserResult>(REACTIVATE_USER, {})

  return { reactivateUser, loading }
}
