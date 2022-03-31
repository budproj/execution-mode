import { useQuery } from '@apollo/client'

import { TaskMeQuery } from '../../types'

import GET_MY_TASKS from './get-tasks.gql'

interface useGetMyTasksProperties {
  onlyUnchecked?: boolean
}

export const useGetMyTasks = ({ onlyUnchecked }: useGetMyTasksProperties) => {
  const { data, loading, called } = useQuery<TaskMeQuery>(GET_MY_TASKS, {
    variables: { onlyUnchecked },
  })

  const tasks = data?.me?.tasks?.edges?.map(({ node }) => node) ?? []
  return { tasks, loading, called }
}
