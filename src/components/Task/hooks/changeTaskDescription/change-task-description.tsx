import { useMutation } from '@apollo/client'

import { useGetMyTasksProperties } from '../getTasks'
import GET_MY_TASKS from '../getTasks/get-tasks.gql'

import CHANGE_DESCRIPTION from './change-task-description.gql'

export const useChangeTaskDescription = ({ onlyUnchecked = true }: useGetMyTasksProperties) => {
  const [changeDescription, { loading, data, error }] = useMutation(CHANGE_DESCRIPTION, {
    refetchQueries: [
      {
        query: GET_MY_TASKS,
        variables: { onlyUnchecked },
      },
    ],
  })

  return { changeDescription, loading, data, error }
}
