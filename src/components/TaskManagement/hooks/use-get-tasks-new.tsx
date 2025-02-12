import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export function useGetNewTask(teamID: string, keyResultID: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`get_tasks_by_kr`],
    queryFn: async () => {
      const { newTaskManagement } = await servicesPromise
      const data = await newTaskManagement.getTasksByKr(teamID, keyResultID)
      return data
    },
  })

  return query
}
