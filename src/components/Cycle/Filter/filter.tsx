import { Stack, StackProps } from '@chakra-ui/react'
import React from 'react'

import { Cycle } from 'src/components/Cycle/types'
import { FilteredCycles } from 'src/state/recoil/cycle/filters'

import CycleFilterQuarterSelector from './QuarterSelector'
import CycleFilterYearSelector from './YearSelector'

export interface CycleFilterProperties {
  onYearFilter: (cycleIDs: Array<Cycle['id']>) => void
  onQuarterFilter: (cycleIDs: Array<Cycle['id']>) => void
  yearOptions?: CycleOption[]
  activeFilters?: FilteredCycles
  flexGrow?: StackProps['flexGrow']
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
  flexGrow,
}: CycleFilterProperties) => {
  return (
    <Stack direction="row" flexGrow={flexGrow} justifyContent="space-evenly">
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
