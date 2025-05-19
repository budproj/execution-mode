import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { TaskCommentInsert } from 'src/services/new-task-management/@types/task-comment.type'

export function useAddTaskComment() {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  const addTaskCommentMutate = useMutation({
    mutationFn: async ({ data }: { data: TaskCommentInsert }) => {
      const { newTaskManagement } = await servicesPromise
      const response = await newTaskManagement.addTaskComment(data)
      return response
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries({
        queryKey: [`taskManager:getTaskComments:${_data.task.id}`],
      })
    },
  })

  return addTaskCommentMutate
}
