import { useMutation } from '@apollo/client'
import { useRecoilValue } from 'recoil'

import { myThingsTasksQuery } from 'src/state/recoil/task'

import { useGetMyTasksProperties } from '../getTasks'
import GET_MY_TASKS from '../getTasks/get-tasks.gql'

import CREATE_TASK from './create-task.gql'

export const useCreateTask = () => {
  const query = useRecoilValue<useGetMyTasksProperties>(myThingsTasksQuery)

  const [createTask, { loading, data, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: GET_MY_TASKS,
        variables: query,
      },
    ],
  })

  return { createTask, loading, data, error }
}
