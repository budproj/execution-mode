import { useMutation } from '@apollo/client'

import GET_CYCLES from '../getCycles/get-cycles.gql'

import UPDATE_CYCLE from './update-cycle.gql'

export const useUpdateCycle = () => {
  const query = {}

  const [updateCycle, { loading, data, error, called }] = useMutation(UPDATE_CYCLE, {
    refetchQueries: [
      {
        query: GET_CYCLES,
        variables: query,
      },
    ],
  })

  return { updateCycle, loading, data, error, called }
}
