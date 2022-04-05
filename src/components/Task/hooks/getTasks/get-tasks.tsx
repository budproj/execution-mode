import { useQuery } from '@apollo/client'
import { useRecoilValue } from 'recoil'

import { myThingsTasksQuery } from 'src/state/recoil/task'

import { TaskMeQuery } from '../../types'

import GET_MY_TASKS from './get-tasks.gql'

export interface useGetMyTasksProperties {
  onlyUnchecked?: boolean
  limit?: number
}

export const useGetMyTasks = () => {
  const query = useRecoilValue<useGetMyTasksProperties>(myThingsTasksQuery)
  const { data, loading, called } = useQuery<TaskMeQuery>(GET_MY_TASKS, {
    variables: query,
  })

  const tasks = data?.me?.tasks?.edges?.map(({ node }) => node) ?? []
  return { tasks, loading, called }
}
