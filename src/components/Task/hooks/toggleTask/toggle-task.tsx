import { useMutation } from '@apollo/client'

import GET_MY_TASKS from '../getTasks/get-tasks.gql'

import TOGGLE_TASK from './toggle-task.gql'

export const useToggleTask = () => {
  const [toggleTask, { loading, data, error }] = useMutation(TOGGLE_TASK, {
    refetchQueries: [{ query: GET_MY_TASKS }],
  })

  return { toggleTask, loading, data, error }
}
