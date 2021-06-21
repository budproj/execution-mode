import { useLazyQuery } from '@apollo/client'
import groupBy from 'lodash/groupBy'
import React, { useEffect } from 'react'

import { Cycle } from 'src/components/Cycle/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'

import CycleFilterQuarterSelectorEmptyState from './empty-state'
import CycleFilterQuarterSelectorQuarterOptions from './quarter-options'
import queries from './queries.gql'

export interface CycleFilterQuarterSelectorProperties {
  onQuarterFilter: (cycleIDs: Array<Cycle['id']>) => void
  filteredYearIDs?: Array<Cycle['id']>
  filteredQuarterIDs?: Array<Cycle['id']>
}

type QuarterlyCyclesFromFilteredParentsResult = {
  cyclesInSamePeriod: GraphQLConnection<Cycle>
}

const CycleFilterQuarterSelector = ({
  onQuarterFilter,
  filteredYearIDs,
}: CycleFilterQuarterSelectorProperties) => {
  const [loadCycles] = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const [cycles, setCycleEdges] = useConnectionEdges<Cycle>()
  const [fetchCycleOptions, { loading, data }] =
    useLazyQuery<QuarterlyCyclesFromFilteredParentsResult>(
      queries.GET_QUARTERLY_CYCLES_FROM_FILTERED_PARENTS,
      {
        variables: {
          parentIds: filteredYearIDs,
        },
      },
    )

  const hasParentCycles = filteredYearIDs && filteredYearIDs.length > 0
  const quarters = data && groupBy(cycles, (item) => item.period)

  useEffect(() => {
    if (hasParentCycles) fetchCycleOptions()
  }, [hasParentCycles, fetchCycleOptions])

  useEffect(() => {
    if (data) setCycleEdges(data.cyclesInSamePeriod?.edges)
  }, [data, setCycleEdges])

  useEffect(() => {
    if (cycles) loadCycles(cycles)
  }, [cycles, loadCycles])

  return hasParentCycles ? (
    <CycleFilterQuarterSelectorQuarterOptions
      isLoading={loading}
      quarters={quarters}
      onFilter={onQuarterFilter}
    />
  ) : (
    <CycleFilterQuarterSelectorEmptyState />
  )
}

export default CycleFilterQuarterSelector
