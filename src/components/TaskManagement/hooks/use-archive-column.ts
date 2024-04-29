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

export function useArchiveColumn(domain: BOARD_DOMAIN, identifier: string) {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()
  const toast = useToast()
  const { dispatch } = useEvent(EventType.ARCHIVE_COLUMN_TASK)

  const archiveColumnMutate = useMutation({
    mutationFn: async ({ ids }: ArchiveColumnMutationProperties) => {
      const { taskManagement } = await servicesPromise
      const response = await taskManagement.archiveColumn(ids)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${GET_BOARD_DATA_KEY}:${domain}:${identifier}`] })
      toast({
        status: 'success',
        title: 'Tarefas arquivadas com sucesso!',
      })
      dispatch({})
    },
  })
  return archiveColumnMutate
}
