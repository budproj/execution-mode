import { Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import CyclesListBodyColumnBase, {
  CyclesListBodyColumnBaseProperties,
} from 'src/components/Cycle/List/Body/Columns/Base'
import { Cycle } from 'src/components/Cycle/types'
import buildPartialSelector from 'src/state/recoil/cycle/build-partial-selector'

export interface CyclesListBodyColumnCyclesProperties extends CyclesListBodyColumnBaseProperties {
  id?: Cycle['id']
}
const cyclePeriodSelector = buildPartialSelector<Cycle['period']>('period')

const CycleListBodyColumnCycle = ({ id }: CyclesListBodyColumnCyclesProperties): ReactElement => {
  const cyclePeriod = useRecoilValue(cyclePeriodSelector(id))

  const isCyclePeriodLoaded = Boolean(cyclePeriod)

  return (
    <CyclesListBodyColumnBase>
      <Skeleton
        isLoaded={isCyclePeriodLoaded}
        {...buildSkeletonMinSize(isCyclePeriodLoaded, 150, 28)}
      >
        <Text fontWeight={400} color="#525F7F" fontSize="14px">
          {cyclePeriod}
        </Text>
      </Skeleton>
    </CyclesListBodyColumnBase>
  )
}

export default CycleListBodyColumnCycle
