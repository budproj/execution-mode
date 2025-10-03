import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useRecoilState } from 'recoil'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Objective } from 'src/services/objective/@types'
import { isReloadNecessary } from 'src/state/recoil/objective'

export function useUpdateObjective() {
  const { servicesPromise } = useContext(ServicesContext)

  const [_, setShouldUpdateObjectives] = useRecoilState(isReloadNecessary)

  const updateObjectiveMutate = useMutation({
    mutationFn: async ({
      objectiveId,
      data,
    }: {
      objectiveId: string
      data: Partial<Objective>
    }) => {
      const { objective } = await servicesPromise
      const response = await objective.patch(objectiveId, data)
      return response
    },
    onSuccess: (_data, _variables) => {
      setShouldUpdateObjectives(true)
    },
  })
  return updateObjectiveMutate
}
