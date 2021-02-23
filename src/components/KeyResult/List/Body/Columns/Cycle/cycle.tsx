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
      <Skeleton
        isLoaded={isCycleLoaded}
        fadeDuration={0}
        /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        {...buildSkeletonMinSize(isCycleLoaded, 100, 20)}
      >
        <Text color="uniqueGray.300">{cycle?.name}</Text>
      </Skeleton>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnCycle
