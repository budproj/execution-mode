import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export const useDeleteTaskComment = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskCommentId }: { taskCommentId: string }) => {
      const { taskManagement } = await servicesPromise
      return taskManagement.removeTaskComments(taskCommentId)
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries({ queryKey: [`taskManager:getTaskComments:${_data.task.id}`] })
    },
  })
}
