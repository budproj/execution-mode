import { useMutation } from '@apollo/client'

import GET_MY_TASKS from '../getTasks/get-tasks.gql'

import DELETE_TASK from './delete-task.gql'

export const useDeleteTask = () => {
  const [deleteTask, { loading, data, error, called }] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_MY_TASKS }],
  })

  return { deleteTask, loading, data, error, called }
}
