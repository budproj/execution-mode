import { Flex, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import CyclesListBodyColumnBase from 'src/components/Cycle/List/Body/Columns/Base'

const CyclesListBodyColumnCadenceLevelSkeleton = (): ReactElement => (
  <CyclesListBodyColumnBase>
    <Flex gridGap={2} flexDir="column">
      <Skeleton w="full" h={8} />
    </Flex>
  </CyclesListBodyColumnBase>
)

export default CyclesListBodyColumnCadenceLevelSkeleton
