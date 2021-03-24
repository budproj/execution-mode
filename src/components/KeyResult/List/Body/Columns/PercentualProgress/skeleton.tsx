import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultListBodyColumnPercentualProgressProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const KeyResultListBodyColumnPercetualProgressSkeleton = (
  _properties: KeyResultListBodyColumnPercentualProgressProperties,
): ReactElement => (
  <KeyResultListBodyColumnBase>
    <Skeleton w={10} h={6} />
  </KeyResultListBodyColumnBase>
)

export default KeyResultListBodyColumnPercetualProgressSkeleton
