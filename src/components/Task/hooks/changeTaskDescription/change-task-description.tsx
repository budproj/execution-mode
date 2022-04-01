import { useMutation } from '@apollo/client'
import { useRecoilValue } from 'recoil'

import { myThingsTasksQuery } from 'src/state/recoil/task'

import { useGetMyTasksProperties } from '../getTasks'
import GET_MY_TASKS from '../getTasks/get-tasks.gql'

import CHANGE_DESCRIPTION from './change-task-description.gql'

export const useChangeTaskDescription = () => {
  const query = useRecoilValue<useGetMyTasksProperties>(myThingsTasksQuery)

  const [changeDescription, { loading, data, error }] = useMutation(CHANGE_DESCRIPTION, {
    refetchQueries: [
      {
        query: GET_MY_TASKS,
        variables: query,
      },
    ],
  })

  return { changeDescription, loading, data, error }
}
