import { Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import KeyResultListBodyColumnBase from 'src/components/KeyResult/List/Body/Columns/Base'

import { KeyResultListBodyColumnConfidenceLevelColorProperties } from './confidence-level-color'

const KeyResultListBodyColumnConfidenceLevelColorSkeleton = (
  _properties: KeyResultListBodyColumnConfidenceLevelColorProperties,
): ReactElement => {
  return (
    <KeyResultListBodyColumnBase p={0}>
      <Skeleton borderRadius="full" maxW="5px" minH="60px" />
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnConfidenceLevelColorSkeleton
