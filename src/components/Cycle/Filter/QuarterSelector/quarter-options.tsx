import { Flex, Spinner } from '@chakra-ui/react'
import flatten from 'lodash/flatten'
import React from 'react'

import { ButtonOptionGroup } from 'src/components/Base'
import { Cycle } from 'src/components/Cycle/types'

import CycleFilterQuarterSelectorButton from './button'

export interface CycleFilterQuarterSelectorQuarterOptionsProperties {
  isLoading: boolean
  onFilter: (cycleIDs: string[]) => void
  quarters?: Record<string, QuarterButtonData[]>
}

type QuarterButtonData = {
  id: Cycle['id']
  period: Cycle['period']
}

const CycleFilterQuarterSelectorQuarterOptions = ({
  quarters,
  onFilter,
  isLoading,
}: CycleFilterQuarterSelectorQuarterOptionsProperties) => {
  const buildQuarterIDs = (quarter: string) =>
    quarters?.[quarter].map((cycle) => cycle.id).join(',')

  const handleChange = (cycleIDs: string[]) => {
    const normalizedCycleIDs = cycleIDs.map((cycleID) => cycleID.split(','))
    const flattenedCycleIDs = flatten(normalizedCycleIDs)

    onFilter(flattenedCycleIDs)
  }

  return isLoading || !quarters ? (
    <Flex alignItems="center">
      <Spinner color="brand.400" />
    </Flex>
  ) : (
    <ButtonOptionGroup onChange={handleChange}>
      {Object.keys(quarters).map((quarter) => (
        <CycleFilterQuarterSelectorButton
          key={buildQuarterIDs(quarter)}
          value={buildQuarterIDs(quarter)}
        >
          {quarter}
        </CycleFilterQuarterSelectorButton>
      ))}
    </ButtonOptionGroup>
  )
}

export default CycleFilterQuarterSelectorQuarterOptions
