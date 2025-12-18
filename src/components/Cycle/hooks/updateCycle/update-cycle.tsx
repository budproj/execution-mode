import { useMutation } from '@apollo/client'

import GET_COMPANY_CYCLES from 'src/components/Report/hooks/getCompanyCycles/get-company-cycles.gql'

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
      {
        query: GET_COMPANY_CYCLES,
        variables: query,
      },
    ],
  })

  return { updateCycle, loading, data, error, called }
}
