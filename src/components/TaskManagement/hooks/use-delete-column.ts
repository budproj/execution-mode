import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import { BOARD_DOMAIN, GET_BOARD_DATA_KEY } from './use-team-tasks-board-data'

interface ArchiveColumnMutationProperties {
  ids: string[]
}

export function useDeleteColumn(domain: BOARD_DOMAIN, identifier: string) {
  const { servicesPromise } = useContext(ServicesContext)
  const { dispatch } = useEvent(EventType.DELETE_COLUMN_TASK)

  const queryClient = useQueryClient()
  const toast = useToast()

  const deleteColumnMutate = useMutation({
    mutationFn: async ({ ids }: ArchiveColumnMutationProperties) => {
      const { taskManagement } = await servicesPromise
      const response = await taskManagement.deleteColumn(ids)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${GET_BOARD_DATA_KEY}:${domain}:${identifier}`] })
      toast({
        status: 'success',
        title: 'Tarefas deletadas com sucesso!',
      })
      dispatch({})
    },
  })
  return deleteColumnMutate
}
