import { Stack } from '@chakra-ui/react'
import React from 'react'

import { Cycle } from 'src/components/Cycle/types'
import { KeyResultNotActiveAndOwnedByUserFilter } from 'src/state/recoil/key-result/filters'

import CycleFilterQuarterSelector from './QuarterSelector'
import CycleFilterYearSelector from './YearSelector'

export interface CycleFilterProperties {
  onYearFilter: (cycleIDs: Array<Cycle['id']>) => void
  onQuarterFilter: (cycleIDs: Array<Cycle['id']>) => void
  yearOptions?: CycleOption[]
  activeFilters?: KeyResultNotActiveAndOwnedByUserFilter
}

export type CycleOption = {
  id: Cycle['id']
  period: Cycle['period']
}

const CycleFilter = ({
  onYearFilter,
  onQuarterFilter,
  activeFilters,
  yearOptions,
}: CycleFilterProperties) => {
  return (
    <Stack direction="row">
      <CycleFilterYearSelector
        options={yearOptions}
        filteredYearIDs={activeFilters?.yearCycleIDs}
        onYearFilter={onYearFilter}
      />
      <CycleFilterQuarterSelector
        filteredYearIDs={activeFilters?.yearCycleIDs}
        onQuarterFilter={onQuarterFilter}
      />
    </Stack>
  )
}

export default CycleFilter
