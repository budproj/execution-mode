import { useMutation } from '@apollo/client'

import RESET_USER_PASSWORD from './reset-user-password.gql'

export const useResetUserPassword = () => {
  const [resetUserPassword, { loading, data, error, called }] = useMutation(RESET_USER_PASSWORD, {})

  return { resetUserPassword, loading, data, error, called }
}
