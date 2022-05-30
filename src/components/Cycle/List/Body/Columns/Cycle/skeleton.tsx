import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import CyclesListBodyColumnBase from 'src/components/Cycle/List/Body/Columns/Base'

const CyclesListBodyColumnCyclesSkeleton = (): ReactElement => (
  <CyclesListBodyColumnBase>
    <Skeleton h={8} w="full" />
  </CyclesListBodyColumnBase>
)

export default CyclesListBodyColumnCyclesSkeleton
