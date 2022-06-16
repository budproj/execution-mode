import { useMutation } from '@apollo/client'

import CHANGE_USER_ROLE from './change-user-role.gql'

export const useChangeUserRole = () => {
  const [updateUserRole, { loading, data, error, called }] = useMutation(CHANGE_USER_ROLE, {})

  return { updateUserRole, loading, data, error, called }
}
