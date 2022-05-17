import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import CyclesListBodyColumnBase from 'src/components/Cycle/List/Body/Columns/Base'

import { CyclesListBodyColumnCyclesProperties } from './cycle'

const CyclesListBodyColumnCyclesSkeleton = (
  _properties: CyclesListBodyColumnCyclesProperties,
): ReactElement => (
  <CyclesListBodyColumnBase>
    <Skeleton h={4} w="full" />
  </CyclesListBodyColumnBase>
)

export default CyclesListBodyColumnCyclesSkeleton
