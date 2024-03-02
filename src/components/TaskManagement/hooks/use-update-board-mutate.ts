import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { TASK_STATUS } from 'src/services/task-management/task-management.service'

interface updateBoardOrderMutationProperties {
  boardId: string
  column: TASK_STATUS
  order: string[]
}

export function useUpdateBoardMutate() {
  const { servicesPromise } = useContext(ServicesContext)

  const updateBoardMutate = useMutation({
    mutationFn: async ({ boardId, column, order }: updateBoardOrderMutationProperties) => {
      const { taskManagement } = await servicesPromise
      const response = await taskManagement.updateBoardOrder(boardId, column, order)
      return response
    },
  })
  return updateBoardMutate
}
