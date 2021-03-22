import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { ButtonOptionGroup } from 'src/components/Base'
import { Cycle } from 'src/components/Cycle/types'
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import selectCyclesFromList from 'src/state/recoil/cycle/select-from-list'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'

import CycleFilterQuarterSelectorEmptyState from './empty-state'
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
  filteredQuarterIDs,
}: CycleFilterQuarterSelectorProperties) => {
  const parentCycles = useRecoilValue(selectCyclesFromList(filteredYearIDs))
  const loadCycles = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const [
    fetchCycleOptions,
    { called, loading, data },
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

  console.log(called, loading, data, 'tag')

  return (
    <ButtonOptionGroup>
      {hasParentCycles ? <p>Ok</p> : <CycleFilterQuarterSelectorEmptyState />}
    </ButtonOptionGroup>
  )
}

export default CycleFilterQuarterSelector
