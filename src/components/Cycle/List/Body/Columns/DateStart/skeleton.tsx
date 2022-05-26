import { Flex, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import CyclesListBodyColumnBase from 'src/components/Cycle/List/Body/Columns/Base'

import { CyclesListBodyColumnDateStartProperties } from './date-start'

const CyclesListBodyColumnDateStartSkeleton = (
  _properties: CyclesListBodyColumnDateStartProperties,
): ReactElement => (
  <CyclesListBodyColumnBase>
    <Flex gridGap={2} flexDir="column">
      <Skeleton w={40} h={8} />
    </Flex>
  </CyclesListBodyColumnBase>
)

export default CyclesListBodyColumnDateStartSkeleton
