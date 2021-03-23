import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

import { ButtonOptionGroup } from 'src/components/Base'
import { Cycle } from 'src/components/Cycle/types'

import CycleFilterQuarterSelectorButton from './button'

export interface CycleFilterQuarterSelectorQuarterOptionsProperties {
  isLoading: boolean
  onFilter: (cycleIDs: string[]) => void
  quarters?: QuarterButtonData[]
}

type QuarterButtonData = {
  id: Cycle['id']
  period: Cycle['period']
}

const CycleFilterQuarterSelectorQuarterOptions = ({
  quarters,
  onFilter,
  isLoading,
}: CycleFilterQuarterSelectorQuarterOptionsProperties) =>
  isLoading || !quarters ? (
    <Flex alignItems="center">
      <Spinner color="brand.400" />
    </Flex>
  ) : (
    <ButtonOptionGroup onChange={onFilter}>
      {quarters.map((quarter) => (
        <CycleFilterQuarterSelectorButton key={quarter.id} value={quarter.id}>
          {quarter.period}
        </CycleFilterQuarterSelectorButton>
      ))}
    </ButtonOptionGroup>
  )

export default CycleFilterQuarterSelectorQuarterOptions
