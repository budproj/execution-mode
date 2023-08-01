import { useQuery } from '@apollo/client'
import { useRecoilValue } from 'recoil'

import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { myThingsTasksQuery, taskAtomFamily } from 'src/state/recoil/task'

import { TaskMeQuery, Task } from '../../types'

import GET_MY_TASKS from './get-tasks.gql'

export interface useGetMyTasksProperties {
  onlyUnchecked?: boolean
  limit?: number
}

export const useGetMyTasks = () => {
  const [loadTasks] = useRecoilFamilyLoader<Task>(taskAtomFamily)
  const [tasks, setTasks] = useConnectionEdges<Task>()

  const query = useRecoilValue<useGetMyTasksProperties>(myThingsTasksQuery)
  const { loading, called } = useQuery<TaskMeQuery>(GET_MY_TASKS, {
    fetchPolicy: 'cache-and-network',
    variables: query,
    onCompleted: (data) => {
      setTasks(data.me.tasks.edges)
      loadTasks(tasks)
    },
  })

  return { tasks, loading, called }
}
