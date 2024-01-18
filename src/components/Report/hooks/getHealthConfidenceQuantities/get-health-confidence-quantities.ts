import { useQuery } from '@apollo/client'

import { HealthConfidenceQuantities, Quantities, Team } from 'src/components/Team/types'

import queries from './get-health-confidence-quantities.gql'

interface GetHealthConfidencesQuantities {
  data: Quantities
  loading: boolean
}

interface GetHealthConfidencesQuantitiesProperties {
  selectedDashboardTeam?: Partial<Team>
  isCompany: boolean
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

export const useGetHealthConfidenceQuantities = ({
  isCompany,
  selectedDashboardTeam,
}: GetHealthConfidencesQuantitiesProperties): GetHealthConfidencesQuantities => {
  const { data, loading } = useQuery<HealthConfidenceQuantities>(
    isCompany
      ? queries.GET_HEALTH_CONFIDENCE_QUANTITIES
      : queries.GET_HEALTH_CONFIDENCE_QUANTITIES_BY_TEAM,
    { variables: { teamId: selectedDashboardTeam?.id } },
  )

  const quantities = isCompany
    ? data?.me?.companies.quantities ?? emptyQuantities
    : data?.team?.quantities ?? emptyQuantities

  return { data: quantities, loading }
}
