import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import { Cycle } from 'src/components/Cycle/types'
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
  sameTitleCyclesChildren: Array<{
    id: Cycle['id']
    title: Cycle['title']
  }>
}

const CycleFilterQuarterSelector = ({
  onQuarterFilter,
  filteredYearIDs,
}: CycleFilterQuarterSelectorProperties) => {
  const loadCycles = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const [
    fetchCycleOptions,
    { loading, data },
  ] = useLazyQuery<QuarterlyCyclesFromFilteredParentsResult>(
    queries.GET_QUARTERLY_CYCLES_FROM_FILTERED_PARENTS,
    {
      variables: {
        parentIds: filteredYearIDs,
      },
      onCompleted: (data) => {
        loadCycles(data.sameTitleCyclesChildren)
      },
    },
  )

  const hasParentCycles = filteredYearIDs && filteredYearIDs.length > 0

  useEffect(() => {
    if (hasParentCycles) fetchCycleOptions()
  }, [hasParentCycles, fetchCycleOptions])

  return hasParentCycles ? (
    <CycleFilterQuarterSelectorQuarterOptions
      isLoading={loading}
      quarters={data?.sameTitleCyclesChildren}
      onFilter={onQuarterFilter}
    />
  ) : (
    <CycleFilterQuarterSelectorEmptyState />
  )
}

export default CycleFilterQuarterSelector
