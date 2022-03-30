import { useMutation } from '@apollo/client'

import GET_MY_TASKS from '../getTasks/get-tasks.gql'

import CREATE_TASK from './create-task.gql'

export const useCreateTask = () => {
  const [createTask, { loading, data, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_MY_TASKS }],
  })

  return { createTask, loading, data, error }
}
