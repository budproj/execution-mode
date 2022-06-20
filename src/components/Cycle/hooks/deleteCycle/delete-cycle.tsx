import { useMutation } from '@apollo/client'

import GET_CYCLES from '../getCycles/get-cycles.gql'

import DELETE_CYCLE from './delete-cycle.gql'

export const useDeleteCycle = () => {
  const query = {}

  const [deleteCycle, { loading, data, error, called }] = useMutation(DELETE_CYCLE, {
    refetchQueries: [
      {
        query: GET_CYCLES,
        variables: query,
      },
    ],
  })

  return { deleteCycle, loading, data, error, called }
}
