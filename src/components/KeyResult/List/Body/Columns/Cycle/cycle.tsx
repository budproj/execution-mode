import { Skeleton, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

export interface KeyResultListBodyColumnCycleProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const cycleSelector = buildPartialSelector<KeyResult['objective']['cycle']>('objective.cycle')

const KeyResultListBodyColumnCycle = ({
  id,
}: KeyResultListBodyColumnCycleProperties): ReactElement => {
  const cycle = useRecoilValue(cycleSelector(id))

  const isCycleLoaded = Boolean(cycle)

  return (
    <KeyResultListBodyColumnBase>
      <Skeleton isLoaded={isCycleLoaded} {...buildSkeletonMinSize(isCycleLoaded, 100, 20)}>
        <Text color="gray.300">{cycle?.period}</Text>
      </Skeleton>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnCycle
