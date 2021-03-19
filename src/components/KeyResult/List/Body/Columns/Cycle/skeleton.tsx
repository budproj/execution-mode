import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import KeyResultListBodyColumnBase from 'src/components/KeyResult/List/Body/Columns/Base'

import { KeyResultListBodyColumnCycleProperties } from './cycle'

const KeyResultListBodyColumnCycleSkeleton = (
  _properties: KeyResultListBodyColumnCycleProperties,
): ReactElement => (
  <KeyResultListBodyColumnBase>
    <Skeleton h={4} w="full" />
  </KeyResultListBodyColumnBase>
)

export default KeyResultListBodyColumnCycleSkeleton
