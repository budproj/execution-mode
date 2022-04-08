import { useMutation } from '@apollo/client'
import { useRecoilValue } from 'recoil'

import { myThingsTasksQuery } from 'src/state/recoil/task'

import { useGetMyTasksProperties } from '../getTasks'
import GET_MY_TASKS from '../getTasks/get-tasks.gql'

import DELETE_TASK from './delete-task.gql'

export const useDeleteTask = () => {
  const query = useRecoilValue<useGetMyTasksProperties>(myThingsTasksQuery)

  const [deleteTask, { loading, data, error, called }] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_MY_TASKS,
        variables: query,
      },
    ],
  })

  return { deleteTask, loading, data, error, called }
}
