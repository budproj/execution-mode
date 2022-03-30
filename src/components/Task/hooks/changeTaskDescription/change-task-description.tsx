import { useMutation } from '@apollo/client'

import GET_MY_TASKS from '../getTasks/get-tasks.gql'

import CHANGE_DESCRIPTION from './change-task-description.gql'

export const useChangeTaskDescription = () => {
  const [changeDescription, { loading, data, error }] = useMutation(CHANGE_DESCRIPTION, {
    refetchQueries: [{ query: GET_MY_TASKS }],
  })

  return { changeDescription, loading, data, error }
}
