import { useMutation } from '@apollo/client'

import GET_CYCLES from '../getCycles/get-cycles.gql'

import CREATE_CYCLE from './create-cycle.gql'

export const useCreateCycle = () => {
  const query = {}

  const [createCycle, { loading, data, error, called }] = useMutation(CREATE_CYCLE, {
    refetchQueries: [
      {
        query: GET_CYCLES,
        variables: query,
      },
    ],
  })

  return { createCycle, loading, data, error, called }
}
