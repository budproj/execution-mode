import { Flex, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag/confidence-tag'
import KeyResultListBodyColumnBase from 'src/components/KeyResult/List/Body/Columns/Base'

import { KeyResultListBodyColumnConfidenceLevelProperties } from './confidence-level'

const KeyResultListBodyColumnConfidenceLevelSkeleton = (
  _properties: KeyResultListBodyColumnConfidenceLevelProperties,
): ReactElement => (
  <KeyResultListBodyColumnBase>
    <Flex gridGap={2} flexDir="column">
      <Skeleton w={40} h={8}>
        <ConfidenceTag showTooltip />
      </Skeleton>
    </Flex>
  </KeyResultListBodyColumnBase>
)

export default KeyResultListBodyColumnConfidenceLevelSkeleton
