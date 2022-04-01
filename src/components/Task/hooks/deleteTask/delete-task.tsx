import { useMutation } from '@apollo/client'

import { useGetMyTasksProperties } from '../getTasks'
import GET_MY_TASKS from '../getTasks/get-tasks.gql'

import DELETE_TASK from './delete-task.gql'

export const useDeleteTask = ({ onlyUnchecked = true }: useGetMyTasksProperties) => {
  const [deleteTask, { loading, data, error, called }] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_MY_TASKS,
        variables: { onlyUnchecked },
      },
    ],
  })

  return { deleteTask, loading, data, error, called }
}
