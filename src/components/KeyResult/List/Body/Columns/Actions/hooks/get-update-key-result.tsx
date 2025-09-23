import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { KeyResult } from 'src/services/key-result/@types'

export function useUpdateKeyResult() {
  const { servicesPromise } = useContext(ServicesContext)
  const router = useRouter()

  const updateObjectiveMutate = useMutation({
    mutationFn: async ({
      keyResultId,
      data,
    }: {
      keyResultId: string
      data: Partial<KeyResult>
    }) => {
      const { keyResult } = await servicesPromise
      const response = await keyResult.patch(keyResultId, data)
      return response
    },
    onSuccess: (_data, _variables) => {
      router.reload()
    },
  })
  return updateObjectiveMutate
}
