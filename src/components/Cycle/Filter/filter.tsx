import { Stack } from '@chakra-ui/react'
import React from 'react'

import { Cycle } from 'src/components/Cycle/types'
import { KeyResultNotActiveAndOwnedByUserFilter } from 'src/state/recoil/key-result/filters'

import CycleFilterYearSelector from './year-selector'

export interface CycleFilterProperties {
  onYearFilter: (cycleIDs: Array<Cycle['id']>) => void
  onQuarterFilter: (cycleIDs: Array<Cycle['id']>) => void
  activeFilters?: KeyResultNotActiveAndOwnedByUserFilter
}

const CycleFilter = ({ onYearFilter, activeFilters }: CycleFilterProperties) => {
  return (
    <Stack direction="row">
      <CycleFilterYearSelector
        filteredYearIDs={activeFilters?.yearCycleIDs}
        onYearFilter={onYearFilter}
      />
    </Stack>
  )
}

export default CycleFilter
