import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import CycleListBodyColumnBase from 'src/components/Cycle/List/Body/Columns/Base'

const CyclesListBodyColumnActionsSkeleton = (): ReactElement => (
  <CycleListBodyColumnBase preventLineClick>
    <Skeleton w={12} h={12} borderRadius={4} />
  </CycleListBodyColumnBase>
)

export default CyclesListBodyColumnActionsSkeleton
