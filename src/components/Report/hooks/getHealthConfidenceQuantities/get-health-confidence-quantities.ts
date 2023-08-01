import { useQuery } from '@apollo/client'

import { HealthConfidenceQuantities, Quantities } from 'src/components/Team/types'

import GET_HEALTH_CONFIDENCE_QUANTITIES from './get-health-confidence-quantities.gql'

interface GetHealthConfidencesQuantities {
  data: Quantities
  loading: boolean
}

const emptyQuantities: Quantities = {
  keyResultsQuantity: 0,
  objectivesQuantity: 0,
  high: 0,
  medium: 0,
  low: 0,
  barrier: 0,
  achieved: 0,
  deprioritized: 0,
}

export const useGetHealthConfidenceQuantities = (): GetHealthConfidencesQuantities => {
  const { data, loading } = useQuery<HealthConfidenceQuantities>(GET_HEALTH_CONFIDENCE_QUANTITIES)

  const quantities = data?.me?.companies.quantities ?? emptyQuantities

  return { data: quantities, loading }
}
