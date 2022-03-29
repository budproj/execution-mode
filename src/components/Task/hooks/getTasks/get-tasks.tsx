import { useQuery } from '@apollo/client'

import { TaskMeQuery } from '../../types'

import GET_MY_TASKS from './get-tasks.gql'

export const useGetMyTasks = () => {
  const { data, loading, called } = useQuery<TaskMeQuery>(GET_MY_TASKS)
  const tasks = data?.me?.tasks?.edges?.map(({ node }) => node) ?? []
  return { tasks, loading, called }
}
